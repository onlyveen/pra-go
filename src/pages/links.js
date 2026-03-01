import { useState } from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';
import { FaLinkedin, FaGithub, FaInstagram, FaBehance, FaProductHunt, FaYoutube } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

import { SiPexels, SiPeerlist } from 'react-icons/si';
import { HiOutlineDocumentDuplicate, HiCheck } from 'react-icons/hi';

const Links = () => {
  const [copiedId, setCopiedId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [copiedLinkName, setCopiedLinkName] = useState('');

  const socialLinks = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/onlyveen/',
      username: '@onlyveen',
      icon: <FaLinkedin />
    },
    {
      id: 'twitter',
      name: 'Twitter',
      url: 'https://x.com/onlyveen',
      username: '@onlyveen',
      icon: <RiTwitterXFill />
    },
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/onlyveen',
      username: '@onlyveen',
      icon: <FaGithub />
    },
    {
      id: 'peerlist',
      name: 'Peerlist',
      url: 'https://peerlist.io/onlyveen',
      username: '@onlyveen',
      icon: <SiPeerlist />
    },
    {
      id: 'pexels',
      name: 'Pexels',
      url: 'https://www.pexels.com/@onlyveen/',
      username: '@onlyveen',
      icon: <SiPexels />
    },
    {
      id: 'instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/onlyveen_/',
      username: '@onlyveen_',
      icon: <FaInstagram />
    },
    {
      id: 'behance',
      name: 'Behance',
      url: 'https://www.behance.net/onlyveen',
      username: '@onlyveen',
      icon: <FaBehance />
    },
    {
      id: 'producthunt',
      name: 'Product Hunt',
      url: 'https://www.producthunt.com/@onlyveen',
      username: '@onlyveen',
      icon: <FaProductHunt />
    },
    {
      id: 'youtube',
      name: 'YouTube',
      url: 'https://www.youtube.com/@praveengorakala',
      username: '@praveengorakala',
      icon: <FaYoutube />
    }
  ];

  const handleCopy = async (link) => {
    try {
      await navigator.clipboard.writeText(link.url);
      setCopiedId(link.id);
      setCopiedLinkName(link.name);
      setShowToast(true);

      setTimeout(() => {
        setCopiedId(null);
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = link.url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedId(link.id);
        setCopiedLinkName(link.name);
        setShowToast(true);
        setTimeout(() => {
          setCopiedId(null);
          setShowToast(false);
        }, 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <>
      <Head>
        <title>Social Links - Praveen Gorakala</title>
        <meta name="description" content="Connect with me on social media" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout page="links">
        <div className="links-page">
          <div className="container">
            <div className="links-header">
              <h1 className="page-title">Links</h1>
            </div>

            <div className="links-grid">
              {socialLinks.map((link) => (
                <div key={link.id} className="link-card">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-content"
                  >
                    <div className="link-icon">
                      {link.icon}
                    </div>
                    <div className="link-info">
                      <h3 className="link-name">{link.name}</h3>
                      <p className="link-username">{link.username}</p>
                    </div>
                  </a>

                  <button
                    className={`copy-btn ${copiedId === link.id ? 'copied' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCopy(link);
                    }}
                    title={copiedId === link.id ? 'Copied!' : 'Copy link'}
                    aria-label={copiedId === link.id ? 'Link copied' : 'Copy link to clipboard'}
                  >
                    {copiedId === link.id ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.667 5.5L7.5 14.667L3.333 10.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M12.5 7.5V5.5C12.5 4.39543 11.6046 3.5 10.5 3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V10.5C3.5 11.6046 4.39543 12.5 5.5 12.5H7.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="links-footer">
              <p>Click to visit • Copy button to share</p>
            </div>
          </div>

          {showToast && (
            <div className="copy-toast">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 5.5L7.5 14.667L3.333 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{copiedLinkName} link copied!</span>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Links;
