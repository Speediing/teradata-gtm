import Image from "next/image";
import { CompareTable } from "@/components/CompareTable";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-watercolor">
        <Image
          className="hero-watercolor-image"
          src="/brand/teradata-watercolor-header.png"
          alt=""
          width={1536}
          height={864}
          sizes="100vw"
          priority
        />
        <SiteNav />
      </div>

      <div className="report">
        <div className="report-hero">
          <HeroTelemetry />
          <section className="hero">
            <div>
              <p className="eyebrow">An agent fleet for Teradata sellers</p>
              <h1>The agents that work while your sellers sell.</h1>
              <p className="hero-intro">
                A call, question, or account update starts the work. Each agent
                gets a computer to research, check, and draft. Your seller stays
                with the customer.
              </p>
            </div>
          </section>

          <RosterChart />

          <section className="usecase-framing">
            <p className="eyebrow">Three sample use cases</p>
            <h2>
              Give every Teradata seller a fleet of agents for the work around
              each account.
            </h2>
            <p>
              Start with call follow-up, checked answers, and account research.
              The seller reviews every draft.
            </p>
          </section>

          <div className="metric-grid">
            {JOBS.map((job) => (
              <a
                key={job.id}
                className="metric-card"
                href={`#${job.id}`}
              >
                <div className="metric-card-top">
                  <p>Sample {String(job.number).padStart(2, "0")}</p>
                </div>
                <h2>{job.title}</h2>
                <p className="metric-trigger">Starts when {job.trigger.toLowerCase()}</p>
              </a>
            ))}
          </div>
        </div>

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="orbit-break" aria-hidden>
        <Image
          src="/brand/teradata-watercolor-header.png"
          alt=""
          width={1536}
          height={864}
          sizes="100vw"
        />
      </div>

      <div className="report">
        <CompareTable />
      </div>

      <footer className="site-footer">
        <div>
          <p className="footer-title">Cursor for Teradata</p>
          <p>Teradata x SpaceXAI</p>
        </div>
        <address className="footer-contact">
          <p>Teradata&apos;s Cursor contact</p>
          <strong>Mike Kelly</strong>
          <a href="mailto:michael.kelly@cursor.com">
            michael.kelly@cursor.com
          </a>
        </address>
      </footer>
    </main>
  );
}
