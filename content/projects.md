# Projects

Source of truth for the portfolio's project section. Every claim here was checked
against the linked repo on 2026-10-29. Items marked **CONFIRM** need Shanid's answer
before they appear on the site.

---

## 1. AWS Deployment Pipeline

- Repo: https://github.com/mohammed-shanid/aws-deploy-pipeline
- Status: **IN PROGRESS — planning stage.** As of 2026-10-29 the public repo contains only
  `CLAUDE.md`, `PROMPTS.md` and `.gitignore` (1 commit, 2026-10-24). Its own audit note says
  "the repository and its remote contain no application code."
- What exists (verifiable): a written architecture and a set of hard engineering rules —
  - GitHub Actions → AWS via OIDC, role scoped to the repo + `main` branch; no long-lived keys
  - build → test → Trivy scan → push to ECR (tag = git SHA) → deploy via SSM Run Command
  - EC2 (Ubuntu LTS, IMDSv2 only), Nginx + Let's Encrypt in front of the app container
  - CloudWatch agent → alarms → SNS email
  - Terraform ≥ 1.10, S3 state with native locking; idempotent Ansible
  - Rules: no wildcard IAM, no SSH from 0.0.0.0/0, never disable a security check to pass CI,
    automatic rollback to the previous tag on a failed health check
- Planned stack: Terraform, Ansible, Docker, GitHub Actions, AWS (EC2, IAM, ECR, SSM, CloudWatch)
- Outcome: none yet — must NOT be presented as built or deployed.
- Confirmed by Shanid 2026-10-29: local work exists and will be pushed. Write this project up
  only from the pushed repo; until then keep it marked in progress.

## 2. ContractRail — build-enforced guardrails for AI coding agents

- Repo: https://github.com/mohammed-shanid/contract-rail
- Status: **Pre-release v0.1** (per README). CI runs on every push.
- Problem: agent instruction files *tell* an agent not to cross an architectural boundary;
  nothing stops it when it does.
- What I built:
  - A contract template where every boundary rule must name the mechanism that enforces it
  - A TypeScript reference example: each rule enforced twice — ESLint `no-restricted-imports`
    and an architecture test (~60 lines, walks the import graph) that survives `eslint-disable`
  - A SHA-256 `CONTRACT_LOCK` that fails the build on a silent interface change
  - GitHub Actions, three jobs per push: example gates (typecheck · lint · tests · `npm start`),
    `prove-gates-fail` (applies committed violation patches and requires red), claim audit
- Stack: TypeScript, Node.js 24, ESLint, Vitest, GitHub Actions, Bash
- Outcome: 14 tests across 4 files pass on a valid tree; both violation patches turn lint and
  the architecture test red, checked in CI on every push.
- Honest scope (from README): one agent in sequential roles + one human reviewer; TypeScript only.

## 3. MedRAGShield — defense layer for medical RAG systems

- Repo: https://github.com/mohammed-shanid/medical-rag-phase1
- Paper: https://ieeexplore.ieee.org/document/11582854
- Status: Research project, complete for phase 1 (README lists phase 2 as future work).
- Problem: a single poisoned document in a medical RAG knowledge base can produce a confident,
  cited, dangerous answer that passes confidence-based safety filters.
- What I built: three-tier middleware between generation and the API response —
  1. Query injection scanner (13 regex patterns, no LLM call)
  2. Confidence + hallucination gate
  3. Domain-aware sanity check: 10 drug-interaction rules that catch dangerous "safe" claims
- Stack: Python, FastAPI, ChromaDB, Ollama (Llama 3.2 3B), all-MiniLM-L6-v2, Gradio
- Outcome (README evaluation, 40 adversarial queries, 4 attack categories): attack success
  rate 13.2% with no defense → 0% in full-defense mode; ~0.8s average latency. Corpus 1,005 docs.
- Award (from CV): Best Paper Award, 2026 IEEE Conference on Emerging Science and Technology.
- Confirmed by Shanid 2026-10-29: the conference paper (IEEE Xplore) and Best Paper Award are
  current; the README's "submitted to IEEE Access" line is outdated.
