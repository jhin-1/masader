import React from 'react';
import './FinalCta.css';

export default function FinalCta() {
  return (
    <section id="contact" className="mx-cta">
      {/* Background loop vector accents */}
      <div className="mx-cta__bg-artwork" aria-hidden="true">
        <svg
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          <circle cx="1100" cy="200" r="280" stroke="#091D0D" strokeWidth="2" strokeDasharray="8 8" />
          <circle cx="1100" cy="200" r="180" stroke="#091D0D" strokeWidth="1.5" />
          <circle cx="100" cy="350" r="220" stroke="#091D0D" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="mx-cta__container">
        <div className="mx-cta__inner">
          {/* Content: Heading & Lead */}
          <div className="mx-cta__content">
            <h2 className="mx-cta__heading">
              Ready to bring Masader into your supply chain?
            </h2>
            <p className="mx-cta__lead">
              Talk to us about offtake volumes, samples, or feedstock partnerships.
            </p>
          </div>

          {/* Action Buttons: Phone & Contact Us */}
          <div className="mx-cta__actions">
            <a
              href="tel:+20347011465"
              className="mx-btn--phone"
              aria-label="Call +2 03 4701 1465"
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+2 03 4701 1465</span>
            </a>

            <a
              href="https://masaderbio.com/web/contact/"
              className="mx-btn--dark"
            >
              <span>Contact Us</span>
              <svg
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
    </section>
  );
}
