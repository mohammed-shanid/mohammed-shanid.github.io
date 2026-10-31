// Site content. Every claim here must trace to content/Md_Shanid_cv.pdf,
// content/projects.md or a linked repo. Do not add anything that does not.

export const profile = {
  name: "Mohammed Shanid",
  fullName: "Mohammed Shanid K S",
  mark: "M. Shanid",
  role: "DevOps and cloud engineer with a cybersecurity degree",
  lede:
    "I've moved websites and apps for 25+ clients to AWS and Hostinger, and I build CI that fails the build when a change crosses a security or architecture boundary.",
  location: "Bengaluru, India",
  degree: "B.Tech CS + Cybersecurity, 2026",
  status: "Open to DevOps roles",
  email: "shanidshani8861@gmail.com",
  // Target roles, from the project brief (CLAUDE.md).
  roles: ["Junior DevOps Engineer", "Cloud Engineer", "Linux / Infrastructure Engineer", "Platform Engineer, entry level"],
  links: {
    github: "https://github.com/mohammed-shanid",
    linkedin: "https://www.linkedin.com/in/mohammed-shanid-785563262",
  },
};

// Live CI line in the title block. `fallback` is the last result checked by hand
// (2026-10-29) and is shown if the GitHub API can't be reached.
export const liveCi = {
  label: "ContractRail CI",
  repo: "mohammed-shanid/contract-rail",
  branch: "main",
  fallback: { status: "passing", sha: "648295c" },
};

// AWS Deployment Pipeline, drawn in the hero. Source: CV and the repo's CLAUDE.md
// architecture. The project is in progress, and the figure says so.
export const pipeline = {
  caption: "Fig. 1: aws-deploy-pipeline",
  status: "In progress",
  repo: "https://github.com/mohammed-shanid/aws-deploy-pipeline",
  stages: [
    {
      id: "commit",
      label: "Commit",
      detail:
        "GitHub Actions signs in to AWS with OIDC. The IAM role trusts only this repo and the main branch, so no AWS keys are stored anywhere.",
    },
    {
      id: "test",
      label: "Test",
      detail:
        "Application tests run, plus Terraform policy tests that block open SSH, unencrypted volumes and over-broad OIDC trust.",
    },
    {
      id: "build",
      label: "Build",
      detail:
        "A Docker image is built and tagged with the full git SHA, so every release can be traced to one commit and never to a mutable tag.",
    },
    {
      id: "scan",
      label: "Scan",
      detail:
        "Trivy scans the image before it is pushed to ECR. A failed scan stops the run; the check is never switched off to get a green build.",
    },
    {
      id: "deploy",
      label: "Deploy",
      detail:
        "A restricted SSM document deploys to the EC2 host. SSH is closed; access goes through SSM Session Manager. If the health check fails, the previous release restarts.",
    },
  ],
  callouts: {
    commit: "OIDC to AWS, no stored keys",
    scan: "Trivy image scan",
    deploy: "via SSM, SSH closed",
  },
  gates: "Gates: all must pass or nothing ships",
  rollback: "Health check fails, previous release restarts",
} as const;

export type StageId = (typeof pipeline.stages)[number]["id"];

// ---- Projects (Sheet 2) -------------------------------------------------------
// Write-ups follow problem → what I built → stack → outcome → links.

export const projects = [
  {
    id: "aws",
    title: "AWS Deployment Pipeline",
    summary: "A small AWS system one engineer can build, deploy, break, diagnose and recover",
    status: { label: "In progress", variant: "progress" },
    problem:
      "A common shortcut when deploying to the cloud is a long-lived access key stored in CI and SSH open to the internet. Both give an attacker a way in.",
    built: [
      "Terraform for the VPC, EC2 and IAM, with S3 state and native locking, guarded by policy tests that block open SSH, unencrypted volumes and over-broad OIDC trust.",
      "Idempotent Ansible roles that harden the Ubuntu hosts. SSH is closed; access goes through SSM Session Manager.",
      "A GitHub Actions pipeline: test, build, Trivy scan, push to ECR, deploy through a restricted SSM document, with automatic rollback on a failed health check.",
      "CloudWatch alarms for disk, uptime and container restarts, and written failure drills with diagnosis and fix.",
    ],
    stack: ["Terraform", "Ansible", "Docker", "GitHub Actions", "AWS EC2", "IAM", "ECR", "SSM", "CloudWatch", "Trivy"],
    outcome:
      "In progress. The code is being moved into the public repository; the pipeline at the top of this page shows its design.",
    links: [{ label: "Repository on GitHub", href: "https://github.com/mohammed-shanid/aws-deploy-pipeline" }],
  },
  {
    id: "contractrail",
    title: "ContractRail",
    summary: "Build-enforced guardrails for AI coding agents",
    status: { label: "Pre-release v0.1", variant: "done" },
    problem:
      "Instruction files tell an AI coding agent not to cross an architectural boundary, but nothing stops it when it does.",
    built: [
      "A contract template where every boundary rule must name the mechanism that enforces it.",
      "Each rule enforced twice: an ESLint import rule, and an architecture test that walks the import graph and still fails with ESLint disabled.",
      "A SHA-256 lock that fails the build on any silent interface change.",
      "A CI job that applies known-bad patches on every push and fails unless the gates go red.",
    ],
    stack: ["TypeScript", "Node.js 24", "ESLint", "Vitest", "GitHub Actions", "Bash"],
    outcome:
      "On a valid tree, typecheck, lint, 14 tests and the run check pass. Both violation patches turn lint and the architecture test red, checked in CI on every push.",
    links: [
      { label: "Repository on GitHub", href: "https://github.com/mohammed-shanid/contract-rail" },
      { label: "CI runs", href: "https://github.com/mohammed-shanid/contract-rail/actions" },
    ],
  },
  {
    id: "medragshield",
    title: "MedRAGShield",
    summary: "A defense layer that stops poisoned answers in medical RAG systems",
    status: { label: "Published", variant: "done" },
    problem:
      "One poisoned document in a medical RAG knowledge base can produce a confident, cited, dangerous answer that passes confidence-based safety filters.",
    built: [
      "Three-tier middleware between the model's answer and the API response.",
      "Tier 1: a query injection scanner, 13 regex patterns, no LLM call.",
      "Tier 2: confidence and hallucination gates that block or flag weak answers.",
      "Tier 3: 10 drug-interaction rules that catch dangerous claims that a combination is safe.",
      "An evaluation harness: 40 adversarial queries across four attack types, run in three defense modes.",
    ],
    stack: ["Python", "FastAPI", "ChromaDB", "Ollama", "Llama 3.2 3B", "Gradio"],
    outcome:
      "Attack success fell from 13.2% with no defense to 0% in full-defense mode, at about 0.8 s per answer. Best Paper Award, 2026 IEEE Conference on Emerging Science and Technology.",
    links: [
      { label: "Paper on IEEE Xplore", href: "https://ieeexplore.ieee.org/document/11582854" },
      { label: "Repository on GitHub", href: "https://github.com/mohammed-shanid/medical-rag-phase1" },
    ],
  },
] as const;

// MedRAGShield evaluation, from the repo README's headline table.
export const medragModes = [
  { id: "off", label: "No defense", tiers: [] as number[], asr: "13.2%", block: "0.0%", flag: "0.0%" },
  { id: "confidence", label: "Confidence only", tiers: [2], asr: "13.5%", block: "40.0%", flag: "25.0%" },
  { id: "full", label: "Full defense", tiers: [1, 2, 3], asr: "0.0%", block: "62.5%", flag: "25.0%" },
];

// ---- Experience (Sheet 3) -----------------------------------------------------
// Shown as a drawing's revision table, newest first.

// "Now" for the timeline's open-ended current role: the month the site was built.
export const today = new Date().toISOString().slice(0, 7);

export const experience: {
  rev: string;
  dates: string;
  start: string;
  end: string | null;
  short: string;
  role: string;
  org: string;
  tools: string[];
  points: string[];
}[] = [
  {
    rev: "D",
    dates: "Sep 2026 – present",
    start: "2026-09",
    end: null,
    short: "Regency Electricals",
    role: "Software Engineer",
    org: "Regency Electricals Private Limited, Bengaluru",
    tools: ["Node.js", "Express", "Next.js", "Python", "Zoho CRM", "OAuth 2.0", "Gmail API", "Claude API", "SQLite", "WhatsApp Cloud API", "Claude Code"],
    points: [
      "Built a Node.js/Express service that turns website RFQs into Zoho CRM leads (REST API, OAuth 2.0), with sandbox-first writes, a production safety switch and tests.",
      "Building the company's e-commerce platform: Next.js storefront on Zoho Commerce, Node.js backend, catalogue sync from Zoho Books, and a bill-of-materials parser and matcher.",
      "Building a Gmail-to-WhatsApp enquiry tracker: Python, Gmail API, Claude API, SQLite, WhatsApp Cloud API.",
      "Run Claude Code under repo-level rules (no production writes, no secret access, branch per task, tests before commit), keeping ownership of architecture and code review.",
    ],
  },
  {
    rev: "C",
    dates: "Feb 2025 – Mar 2026",
    start: "2025-02",
    end: "2026-03",
    short: "hi-ideal",
    role: "Associate Cloud Engineer",
    org: "hi-ideal (startup), Bidar",
    tools: ["AWS", "Hostinger", "WordPress", "DNS", "SSL/TLS", "Jenkins", "GitHub Actions", "Docker", "Git"],
    points: [
      "Migrated websites and apps for 25+ clients, mainly Indian small businesses, to AWS and Hostinger.",
      "Hosted and maintained client WordPress sites, and set up DNS records and SSL certificates for their domains.",
      "Used Jenkins and GitHub Actions CI/CD pipelines, Docker and Git on client projects.",
    ],
  },
  {
    rev: "B",
    dates: "Oct 2024 – Apr 2025",
    start: "2024-10",
    end: "2025-04",
    short: "InLighnX",
    role: "Offensive Cybersecurity Intern",
    org: "InLighnX, Bengaluru",
    tools: ["Python", "Linux", "Splunk", "REST API", "Penetration testing"],
    points: [
      "Built a multi-threaded Python recon tool that streams Linux enumeration data into Splunk via REST API.",
      "Ran external penetration tests and wrote risk and remediation reports.",
    ],
  },
  {
    rev: "A",
    dates: "Feb 2024 – Jul 2024",
    start: "2024-02",
    end: "2024-07",
    short: "NITK Surathkal",
    role: "Application Security Intern",
    org: "NITK Surathkal",
    tools: ["Python", "SQL"],
    points: ["Built a Python event-logging pipeline that collects and stores browser activity data in SQL."],
  },
];

// ---- Skills (Sheet 4) ---------------------------------------------------------
// A parts list: every group says where it was used.

export const skills = [
  {
    item: 1,
    group: "Cloud and containers",
    parts: ["AWS (EC2, IAM, S3, CloudWatch)", "Docker", "Docker Compose", "Kubernetes", "Render"],
    usedIn: ["hi-ideal", "AWS Deployment Pipeline"],
  },
  {
    item: 2,
    group: "CI/CD and IaC",
    parts: ["GitHub Actions", "Jenkins", "Git", "CI/CD quality gates", "Terraform", "Ansible"],
    usedIn: ["hi-ideal", "AWS Deployment Pipeline", "ContractRail"],
  },
  {
    item: 3,
    group: "Linux and networking",
    parts: ["RHEL/CentOS", "Ubuntu", "Debian", "Fedora", "DNS", "SSL/TLS", "TCP/IP", "SSH"],
    usedIn: ["hi-ideal", "InLighnX"],
  },
  {
    item: 4,
    group: "Monitoring",
    parts: ["AWS CloudWatch", "Splunk"],
    usedIn: ["AWS Deployment Pipeline", "InLighnX"],
  },
  {
    item: 5,
    group: "Security",
    parts: ["SIEM", "Incident response", "MITRE ATT&CK", "Penetration testing", "CVSS scoring"],
    usedIn: ["InLighnX", "MedRAGShield", "B.Tech"],
  },
  {
    item: 6,
    group: "Scripting and backend",
    parts: ["Python", "Bash", "Node.js", "TypeScript", "Express", "FastAPI", "REST APIs", "SQLite", "Next.js"],
    usedIn: ["Regency Electricals", "ContractRail", "MedRAGShield"],
  },
  {
    item: 7,
    group: "Agentic development",
    parts: ["Claude Code", "AGENTS.md", "Agent Skills", "Claude API", "Ollama", "ChromaDB"],
    usedIn: ["Regency Electricals", "ContractRail", "MedRAGShield"],
  },
];

export const credentials = [
  { label: "Degree", value: "B.Tech, Computer Science and Cybersecurity, Srinivas University, Mangalore. CGPA 8.31 / 10, 2022 – 2026" },
  { label: "Award", value: "Best Paper Award, 2026 IEEE Conference on Emerging Science and Technology (MedRAGShield)" },
  { label: "Certifications", value: "CEH v13. Cisco CCST Cybersecurity (2024). AWS Academy Cloud Foundations (2025). Python Programming Specialist (2023)" },
];
