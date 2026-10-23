import React from 'react';
import './NewsInsights.css';

export default function NewsInsights() {
  return (
    <section id="news" className="mx-news">
      <div className="mx-news__container">
        <div className="mx-news__card">
          <div className="mx-news__split">
            {/* Left Content: Eyebrow, Heading & Lead */}
            <div className="mx-news__content">
              <div className="mx-news__eyebrow-row">
                <span className="mx-eyebrow">News &amp; Insights</span>
                <span className="mx-news__badge">
                  <span className="mx-news__badge-dot" aria-hidden="true" />
                  <span>Market Intelligence</span>
                </span>
              </div>

              <h2 className="mx-news__heading">
                Updates on our certification programme and the export market
              </h2>

              <p className="mx-news__lead">
                Plant updates, ISCC audit milestones, and export-market notes — coming soon.
              </p>
            </div>

            {/* Right Action: Clean CTA Button Aligned Right on Desktop */}
            <div className="mx-news__action">
              <a
                href="https://masaderbio.com/web/news/"
                className="mx-news__btn"
              >
                <span>Read all news</span>
                <svg
                  className="mx-news__btn-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
