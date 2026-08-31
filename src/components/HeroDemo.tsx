"use client";

import { useState } from "react";
import { HERO_JOBS } from "@/data/hero-jobs";

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m4 11.2 16-7-6.8 16-2.1-6.6L4 11.2Zm7.1 2.4L20 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m14.5 6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ComputerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="4"
        y="5"
        width="16"
        height="11"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M9 20h6M12 16v4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="9"
        y="3.5"
        width="6"
        height="11"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v3M9 20h6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function HeroDemo() {
  const [activeId, setActiveId] = useState<string>(HERO_JOBS[0].id);
  const active =
    HERO_JOBS.find((job) => job.id === activeId) ?? HERO_JOBS[0];

  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">A proactive agent fleet for Teradata sellers</p>
        <h1>The agents that work while your sellers sell.</h1>
        <p className="hero-intro">
          A call, question, or account signal starts the work. Each agent has a
          computer. It researches, checks, and drafts while the seller stays
          with the customer.
        </p>
        <div className="hero-phone-jobs" aria-label="Choose an agent">
          {HERO_JOBS.map((job) => {
            const selected = job.id === active.id;
            return (
              <button
                key={job.id}
                className={selected ? "is-active" : undefined}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveId(job.id)}
              >
                {selected ? (
                  <span aria-hidden="true">
                    <SparkIcon />
                  </span>
                ) : null}
                {job.name}
              </button>
            );
          })}
        </div>
      </div>

      <aside className="hero-bot-demo" aria-label="Live Grok Bot phone demo">
        <div className="hero-phone">
          <div className="hero-phone-notch" aria-hidden="true" />
          <header className="hero-phone-header">
            <span className="hero-phone-back" aria-hidden="true">
              <BackIcon />
            </span>
            <span className="hero-phone-agent" aria-hidden="true">
              <SparkIcon />
            </span>
            <p>
              <strong>{active.name} Agent</strong>
              <small>
                <span aria-hidden="true" />
                Working in the cloud
              </small>
            </p>
            <span className="hero-phone-desktop" aria-hidden="true">
              <ComputerIcon />
            </span>
          </header>
          <div className="hero-phone-thread" aria-live="polite">
            <article className="hero-phone-work">
              <p className="hero-phone-work-label">
                <span aria-hidden="true" />
                New work detected
              </p>
              <p className="hero-phone-work-meta">
                <span>Account</span>
                {active.account}
              </p>
              <p className="hero-phone-work-meta">
                <span>Signal</span>
                {active.signal}
              </p>
              <p className="hero-phone-work-copy">{active.work}</p>
              <strong>{active.result}</strong>
            </article>
            <p className="hero-phone-message is-user">{active.user}</p>
            <p className="hero-phone-message is-bot">{active.bot}</p>
          </div>
          <footer className="hero-phone-composer">
            <span aria-hidden="true">
              <PlusIcon />
            </span>
            <p>Message {active.name} Agent</p>
            <span aria-hidden="true">
              <MicIcon />
            </span>
          </footer>
        </div>
      </aside>
    </section>
  );
}
