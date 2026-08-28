import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "seller",
    name: "Teradata seller",
    blurb: "The seller stays in control. The fleet handles the work around the account.",
    color: "#F3EADB",
    mark: "You",
    seat: true,
  },
  {
    id: "relay",
    name: "Relay",
    blurb: "Turns call notes into a recap and a follow-up draft.",
    jobId: "standardize-room",
    color: "#FF5F02",
  },
  {
    id: "answer",
    name: "Answer",
    blurb: "Checks approved material and keeps the source beside the reply.",
    jobId: "legal-redlines",
    color: "#C94E1B",
  },
  {
    id: "scout",
    name: "Scout",
    blurb: "Reads public account context and marks every unknown.",
    jobId: "attach-engine",
    color: "#D98A35",
  },
  {
    id: "brief",
    name: "Brief",
    blurb: "Builds the meeting page from checked notes and sources.",
    color: "#2D3436",
  },
  {
    id: "signal",
    name: "Signal",
    blurb: "Watches approved account updates and flags what changed.",
    color: "#717C75",
  },
  {
    id: "map",
    name: "Map",
    blurb: "Organizes known roles and leaves missing roles open.",
    color: "#8C6046",
  },
  {
    id: "desk",
    name: "Desk",
    blurb: "Routes open questions to the right source for review.",
    color: "#4F6673",
  },
];
