import React from 'react';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="mx-footer">
      <div className="mx-footer__container">
        {/* Main 4-Column Grid */}
        <div className="mx-footer__grid">
          {/* Column 1: Brand & Location (.mx-footer__brand, 4 cols) */}
          <div className="mx-footer__brand">
            <div className="mx-footer__logo-wrap">
              <img
                src="https://masaderbio.com/web/wp-content/uploads/2026/10/masader-logo.png"
                alt="Masader"
                width={1200}
                height={402}
                className="mx-footer__logo"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/web/masader-logo.png';
                }}
              />
            </div>

            <address className="mx-footer__address">
              Km 26 Alexandria–Cairo Desert Road,<br />
              Alexandria, Egypt
            </address>

            <p className="mx-footer__tagline">
              ISCC EU mass-balance certified closed-loop biofuel refining.
            </p>
          </div>

          {/* Column 2: Company (.mx-footer__col, 2 cols) */}
          <div className="mx-footer__col mx-footer__col--company">
            <h4 className="mx-footer__title">Company</h4>
            <ul className="mx-footer__list">
              <li>
                <a href="#" className="mx-footer__link">About Us</a>
              </li>
              <li>
                <a href="#" className="mx-footer__link">Facilities &amp; Process</a>
              </li>
              <li>
                <a href="#" className="mx-footer__link">Markets &amp; Trading</a>
              </li>
              <li>
                <a href="#" className="mx-footer__link">Careers</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Products (.mx-footer__col, 3 cols) */}
          <div className="mx-footer__col mx-footer__col--products">
            <h4 className="mx-footer__title">Products</h4>
            <ul className="mx-footer__list">
              <li>
                <a href="#" className="mx-footer__link">Biodiesel — PURE &amp; PUREMAX</a>
              </li>
              <li>
                <a href="#" className="mx-footer__link">Technical Glycerine</a>
              </li>
              <li>
                <a href="#" className="mx-footer__link">Soap-Stock Derivatives</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Useful Links & Working Hours (.mx-footer__col, 3 cols) */}
          <div className="mx-footer__col mx-footer__col--useful">
            <h4 className="mx-footer__title">Useful Links</h4>
            <ul className="mx-footer__list">
              <li>
                <a href="#" className="mx-footer__link">ISCC EU Certificate</a>
              </li>
              <li>
                <a href="#" className="mx-footer__link">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#" className="mx-footer__link">Privacy Policy</a>
              </li>
            </ul>

            {/* Working Hours Sub-group */}
            <div className="mx-footer__hours-wrap">
              <h4 className="mx-footer__title">Working Hours</h4>
              <p className="mx-footer__hours-text">
                Sun–Sat 09:00–23:00<br />
                Phone support 24/7
              </p>
              <a
                href="tel:+20347011465"
                className="mx-footer__phone-link"
                aria-label="Phone: +2 03 4701 1465"
              >
                <svg
                  className="mx-footer__phone-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+2 03 4701 1465</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mx-footer__bottom">
          <p className="mx-footer__copyright">
            © 2026 MASADER for Industry &amp; Investment. All rights reserved.
          </p>

          <div className="mx-footer__bottom-right">
            <span className="mx-footer__cert-note">
              Closed-Loop Biofuel Refining · EN 14214
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="mx-footer__scroll-top"
              title="Back to top"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
