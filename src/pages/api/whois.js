// API route to fetch domain WHOIS information using whoiser
// This prevents CORS issues and keeps API keys secure

import { whoisDomain } from 'whoiser';

/** @type {Record<string, string>} WHOIS server overrides for TLDs with stale/broken defaults */
const WHOIS_HOST_OVERRIDES = {
  in: 'whois.nixiregistry.in'
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({ error: 'Domain name is required' });
  }

  try {
    // Get full domain status (accessibility + expiry)
    const status = await getDomainStatus(domain);
    return res.status(200).json(status);
  } catch (error) {
    console.error('WHOIS lookup error for', domain, ':', error);
    return res.status(500).json({
      error: 'Failed to fetch WHOIS data',
      message: error.message,
      domain: domain
    });
  }
}

/**
 * Check if a domain's website is accessible via HTTP HEAD request.
 * @param {string} domain
 * @returns {Promise<{accessible: boolean, statusCode: number | null}>}
 */
async function checkSiteAccessibility(domain) {
  try {
    const response = await fetch(`https://${domain}`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000)
    });
    return { accessible: response.ok, statusCode: response.status };
  } catch {
    return { accessible: false, statusCode: null };
  }
}

/**
 * Look up domain WHOIS data to find the expiry date and registrar.
 * @param {string} domain
 * @returns {Promise<{expiryDate: string | null, registrar: string | null, createdDate: string | null, nameServers: string[], status: string[]}>}
 */
async function getDomainExpiry(domain) {
  try {
    const tld = domain.split('.').pop() || '';
    const host = WHOIS_HOST_OVERRIDES[tld];
    const whoisData = await whoisDomain(domain, { timeout: 10000, ...(host && { host }) });
    const firstKey = Object.keys(whoisData)[0];
    if (!firstKey) return { expiryDate: null, registrar: null, createdDate: null, nameServers: [], status: [] };

    const record = whoisData[firstKey];

    // Extract expiry date
    const expiryFields = [
      'Expiry Date',
      'Registry Expiry Date',
      'Registrar Registration Expiration Date',
      'paid-till',
      'Expiration Date',
      'expires'
    ];

    let expiryDate = null;
    for (const field of expiryFields) {
      if (record[field]) {
        const raw = Array.isArray(record[field]) ? record[field][0] : record[field];
        const parsed = new Date(raw);
        if (!isNaN(parsed.getTime())) {
          expiryDate = parsed.toISOString();
          break;
        }
      }
    }

    // Extract created date
    const createdFields = ['Creation Date', 'Created Date', 'created'];
    let createdDate = null;
    for (const field of createdFields) {
      if (record[field]) {
        const raw = Array.isArray(record[field]) ? record[field][0] : record[field];
        const parsed = new Date(raw);
        if (!isNaN(parsed.getTime())) {
          createdDate = parsed.toISOString();
          break;
        }
      }
    }

    // Extract registrar
    const registrarFields = ['Registrar', 'registrar'];
    let registrar = null;
    for (const field of registrarFields) {
      if (record[field]) {
        registrar = Array.isArray(record[field]) ? record[field][0] : record[field];
        break;
      }
    }

    // Extract name servers
    let nameServers = [];
    if (record['Name Server']) {
      nameServers = Array.isArray(record['Name Server']) ? record['Name Server'] : [record['Name Server']];
    }

    // Extract status
    let status = [];
    if (record['Domain Status']) {
      status = Array.isArray(record['Domain Status']) ? record['Domain Status'] : [record['Domain Status']];
    }

    return {
      expiryDate,
      registrar: registrar || 'Unknown',
      createdDate,
      nameServers,
      status
    };
  } catch (error) {
    console.error('WHOIS error:', error);
    return { expiryDate: null, registrar: null, createdDate: null, nameServers: [], status: [] };
  }
}

/**
 * Get full status for a domain (accessibility + expiry) in parallel.
 * @param {string} domain
 * @returns {Promise<{domain: string, accessible: boolean, statusCode: number | null, expiryDate: string | null, registrar: string, createdDate: string | null, nameServers: string[], domainStatus: string[], errors: string[]}>}
 */
async function getDomainStatus(domain) {
  /** @type {string[]} */
  const errors = [];

  const [accessResult, whoisResult] = await Promise.all([
    checkSiteAccessibility(domain).catch((e) => {
      errors.push(`Accessibility check failed: ${e.message}`);
      return { accessible: false, statusCode: null };
    }),
    getDomainExpiry(domain).catch((e) => {
      errors.push(`WHOIS lookup failed: ${e.message}`);
      return { expiryDate: null, registrar: null, createdDate: null, nameServers: [], status: [] };
    })
  ]);

  return {
    domain,
    accessible: accessResult.accessible,
    statusCode: accessResult.statusCode,
    expiryDate: whoisResult.expiryDate,
    registrar: whoisResult.registrar || 'Unknown',
    createdDate: whoisResult.createdDate,
    nameServers: whoisResult.nameServers,
    domainStatus: whoisResult.status,
    errors
  };
}
