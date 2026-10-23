import React from 'react';
import './WhereItGoes.css';

export default function WhereItGoes() {
  return (
    <section id="where-it-goes" className="mx-where">
      {/* Background Architectural Vector Lines & Centered Radial Aura */}
      <div className="mx-where__bg" aria-hidden="true">
        <div className="mx-where__glow" />
        <svg
          className="mx-where__arc-svg"
          viewBox="0 0 1000 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 100 300 Q 500 60 900 300"
            stroke="url(#mxwh-arc-grad)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          <circle cx="500" cy="180" r="4" fill="var(--mxwh-leaf)" />
          <circle cx="500" cy="180" r="14" stroke="var(--mxwh-leaf)" strokeWidth="1" strokeOpacity="0.35" />
          <circle cx="760" cy="245" r="3.5" fill="var(--mxwh-gold)" />
          <circle cx="240" cy="245" r="3.5" fill="var(--mxwh-gold)" />

          <defs>
            <linearGradient id="mxwh-arc-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--mxwh-gold)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="var(--mxwh-leaf)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--mxwh-gold)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mx-where__container">
        {/* Centered Eyebrow with Symmetrical Gold Accent Line */}
        <div className="mx-where__eyebrow-wrap">
          <span className="mx-eyebrow">Where it goes</span>
          <span className="mx-where__accent-line" aria-hidden="true" />
        </div>

        {/* Strictly Centered Monumental Editorial Statement */}
        <h2 className="mx-where__statement">
          Exporting across{' '}
          <span className="mx-where__anchor mx-where__anchor--gold">
            Europe and Africa
          </span>
          ,{' '}
          <span className="mx-where__anchor mx-where__anchor--leaf">
            Ex-Works Alexandria
          </span>
          {' '}— and supplying Egypt's own{' '}
          <span className="mx-where__anchor mx-where__anchor--gold">
            Suez Canal Authority
          </span>
          .
        </h2>

        {/* Centered Supporting Routes Bar */}
        <div className="mx-where__routes">
          <div className="mx-where__route-item">
            <span className="mx-where__route-dot mx-where__route-dot--leaf" aria-hidden="true" />
            <span>Alexandria Hub: 31.2001° N, 29.9187° E</span>
          </div>
          <div className="mx-where__route-item">
            <span className="mx-where__route-dot mx-where__route-dot--gold" aria-hidden="true" />
            <span>Direct Maritime &amp; Overland Logistical Access</span>
          </div>
          <div className="mx-where__route-item">
            <span className="mx-where__route-dot mx-where__route-dot--leaf" aria-hidden="true" />
            <span>ISCC EU Certified Chain of Custody to Exit</span>
          </div>
        </div>
      </div>
    </section>
  );
}
