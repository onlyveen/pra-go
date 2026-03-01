import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";

const DomainStats = () => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // List of your domains - just add domain names here
  const myDomains = [
    "praveengorakala.com",
    "appupresents.com",
    "gr8appers.com",
    "atojteluguchurch.com",
    "gospelminimelodies.com",
    "seharievents.com",
  ];

  const fetchWhoisData = async () => {
    setLoading(true);
    setError(null);

    try {
      const domainPromises = myDomains.map(async (domainName, index) => {
        try {
          console.log(`Fetching WHOIS data for ${domainName}...`);

          const response = await fetch("/api/whois", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ domain: domainName }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || `Failed to fetch WHOIS data`);
          }

          console.log(`Successfully fetched WHOIS for ${domainName}`, data);

          // Determine site status based on accessibility check
          let siteStatus = "unknown";
          if (data.accessible) {
            siteStatus = "online";
          } else if (data.statusCode !== null) {
            siteStatus = "offline";
          }

          return {
            id: index + 1,
            name: domainName,
            url: `https://${domainName}`,
            registrar: data.registrar || "Unknown",
            expiryDate: data.expiryDate,
            createdDate: data.createdDate,
            status: siteStatus,
            statusCode: data.statusCode,
            nameServers: data.nameServers || [],
            domainStatus: data.domainStatus || [],
            errors: data.errors || [],
            lastChecked: new Date().toISOString(),
            hasData: true,
          };
        } catch (err) {
          console.error(`Error fetching WHOIS for ${domainName}:`, err);
          return {
            id: index + 1,
            name: domainName,
            url: `https://${domainName}`,
            registrar: "Unable to fetch data",
            expiryDate: null,
            status: "error",
            error: err.message,
            lastChecked: new Date().toISOString(),
            hasData: false,
          };
        }
      });

      const results = await Promise.all(domainPromises);
      setDomains(results);
      setLastUpdate(new Date());
    } catch (err) {
      console.error("Error fetching domain data:", err);
      setError("Failed to load domain information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWhoisData();
  }, []);

  const handleRefresh = () => {
    fetchWhoisData();
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (days) => {
    if (days < 0) return "expired";
    if (days < 30) return "critical";
    if (days < 90) return "warning";
    return "good";
  };

  const getProgressPercentage = (days, createdDate, expiryDate) => {
    if (days < 0) return 0;

    // If we have created date, calculate based on total lifespan
    if (createdDate && expiryDate) {
      const created = new Date(createdDate);
      const expiry = new Date(expiryDate);
      const totalDays = Math.ceil((expiry - created) / (1000 * 60 * 60 * 24));
      const percentage = (days / totalDays) * 100;
      return Math.min(100, Math.max(0, percentage));
    }

    // Fallback: assume 1 year registration, calculate from that
    const assumedTotalDays = 365;
    const percentage = (days / assumedTotalDays) * 100;
    return Math.min(100, Math.max(0, percentage));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Head>
        <title>Domain Stats - Praveen Gorakala</title>
        <meta name="description" content="Domain portfolio and statistics" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout page="domainstats">
        <div className="domain-stats-page">
          <div className="container">
            <div className="page-header">
              <div>
                <h1 className="page-title">Domain Statistics</h1>
                <p className="page-subtitle">
                  Monitor domain expiration and status
                </p>
              </div>
              {!loading && (
                <button
                  onClick={handleRefresh}
                  className="refresh-btn"
                  disabled={loading}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C12.0711 2.5 13.9462 3.36656 15.2782 4.75M15.2782 4.75V2M15.2782 4.75H12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Refresh Data
                </button>
              )}
            </div>

            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Fetching WHOIS data for your domains...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <p>❌ {error}</p>
              </div>
            ) : (
              <div className="domains-list">
                {domains.map((domain) => {
                  const hasExpiryDate =
                    domain.expiryDate && domain.expiryDate !== null;
                  const daysUntilExpiry = hasExpiryDate
                    ? getDaysUntilExpiry(domain.expiryDate)
                    : null;
                  const expiryStatus =
                    daysUntilExpiry !== null
                      ? getExpiryStatus(daysUntilExpiry)
                      : "unknown";

                  return (
                    <div
                      key={domain.id}
                      className={`domain-card ${expiryStatus} status-${domain.status}`}
                    >
                      <div className="domain-header">
                        <a
                          href={domain.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="domain-name-link"
                        >
                          <h3 className="domain-name">{domain.name}</h3>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M10 6V10H2V2H6M7 2H10M10 2V5M10 2L5 7"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </a>
                      </div>

                      <div className="domain-details">
                        <div className="detail-row info-grid registrar-status-row">
                          <div className="info-item">
                            <span className="label">Registrar:</span>
                            <span className="value">{domain.registrar}</span>
                          </div>
                          <span className={`status-badge ${domain.status}`}>
                            <span className="status-dot"></span>
                            {domain.status}
                          </span>
                        </div>

                        {(domain.createdDate || hasExpiryDate) && (
                          <div className="detail-row info-grid dates-row">
                            {domain.createdDate && (
                              <div className="info-item">
                                <span className="label">Created:</span>
                                <span className="value">
                                  {formatDate(domain.createdDate)}
                                </span>
                              </div>
                            )}
                            {hasExpiryDate && (
                              <div className="info-item">
                                <span className="label">Expires:</span>
                                <span className="value">
                                  {formatDate(domain.expiryDate)}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {hasExpiryDate ? (
                          <>
                            <div className="detail-row expiry-countdown">
                              <div className="countdown-header">
                                <span className="label">Days remaining:</span>
                                <span
                                  className={`value days-count ${expiryStatus}`}
                                >
                                  {daysUntilExpiry > 0
                                    ? daysUntilExpiry
                                    : "EXPIRED"}
                                  {daysUntilExpiry > 0 && (
                                    <span className="days-text"> days   {expiryStatus === "critical" &&
                                    daysUntilExpiry > 0 && (
                                      <small className="alert-note critical">
                                        (⚠️ Renewal required soon!)
                                      </small>
                                    )}

                                  {expiryStatus === "expired" && (
                                    <small className="alert-note expired">
                                      (❌ Domain has expired!)
                                    </small>
                                  )}</span>
                                  )}
                                
                                </span>
                              </div>
                              <div className="expiry-progress-bar">
                                <div
                                  className={`progress-fill ${expiryStatus}`}
                                  style={{
                                    width: `${getProgressPercentage(daysUntilExpiry, domain.createdDate, domain.expiryDate)}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="detail-row">
                            <span className="label">Status:</span>
                            <span className="value">
                              {domain.error
                                ? `Error: ${domain.error}`
                                : "WHOIS data unavailable"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!loading && !error && lastUpdate && (
              <div className="stats-footer">
                <p className="note">
                  <strong>Note:</strong> Domain information is fetched in
                  real-time using the whoiser library for WHOIS lookups. Site
                  accessibility is checked via HTTP HEAD requests. Click
                  "Refresh Data" to update.
                </p>
                <p className="last-updated">
                  Last checked: {lastUpdate.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DomainStats;
