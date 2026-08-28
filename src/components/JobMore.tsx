"use client";

import { useState } from "react";
import type { CroJob } from "@/data/types";
import { JobDemo } from "./JobDemo";

export function JobMore({ job }: { job: CroJob }) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="job-more"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>Watch the agent work in the background</summary>
      {open ? (
        <div className="job-more-body">
          <JobDemo job={job} />
        </div>
      ) : null}
    </details>
  );
}
