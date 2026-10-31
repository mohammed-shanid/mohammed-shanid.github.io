// The eight things on the page that respond when someone uses them. The
// inspection log in the top bar ticks each one off.

export const inspections = [
  { id: "run", label: "Run the pipeline", href: "#top" },
  { id: "rollback", label: "Fail the health check", href: "#top" },
  { id: "attack", label: "Try to break into the AWS design", href: "#aws" },
  { id: "patch", label: "Break ContractRail's architecture rule", href: "#contractrail" },
  { id: "modes", label: "Turn MedRAGShield's defenses off", href: "#medragshield" },
  { id: "timeline", label: "Open a role on the timeline", href: "#experience" },
  { id: "trace", label: "Trace a skill across the page", href: "#skills" },
  { id: "theme", label: "Switch between light and dark", href: "#top" },
] as const;

export type InspectionId = (typeof inspections)[number]["id"];

export const sheets = [
  { id: "top", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
