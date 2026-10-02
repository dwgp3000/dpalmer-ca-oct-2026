# AGENTS.md

## Project Context

This repository contains the production website for **dpalmer.ca**.

Before making substantial changes, read:

`PROJECT-DOCUMENTATION.md`

It contains the verified architecture, deployment workflow, CMS structure, maintenance procedures and troubleshooting information.

## Architecture

The production stack is:

```text
Sanity CMS
    ↓
Astro static build
    ↓
Cloudflare Worker/static assets
    ↓
dpalmer.ca
```

This is a **statically generated Astro website**.

Do not convert the site to SSR, another framework, or another hosting architecture unless explicitly requested.

## Repositories

Website:

`dpalmer-ca`

Sanity Studio:

`dpalmer-studio`

The Sanity schemas are maintained in the separate `dpalmer-studio` repository.

Do not assume schema definitions exist in this repository.

## Content

Editable website content is managed through Sanity where practical.

Presentation, layout, components and website behaviour belong in Astro.

Before hard-coding content, determine whether that content is currently CMS-managed.

## Sanity

Production Sanity configuration:

```text
Project ID: f98etxtk
Dataset: production
API version: 2026-09-28
```

Astro retrieves Sanity content during the static build.

Published Sanity changes trigger a Cloudflare rebuild through the existing webhook/Deploy Hook workflow.

Do not expose or commit webhook URLs, tokens or credentials.

## Schema Changes

Treat the Sanity schema and Astro implementation as a contract.

Before changing a field name, field type or document structure:

1. Inspect how Astro currently consumes the field.
2. Consider existing production content.
3. Make corresponding changes in `dpalmer-studio` where required.
4. Test Sanity validation.
5. Test the Astro site locally.
6. Run a production build before deployment.

Do not casually rename or remove production schema fields.

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Production preview:

```bash
npm run preview
```

## Required Validation

Before committing meaningful website changes:

```bash
npm run build
```

The production build must complete successfully.

For visual or layout changes, also inspect the relevant pages locally at desktop and mobile widths.

For changes affecting Sanity content, verify that current production content still renders correctly.

## Deployment

Code deployment:

```text
Local code
→ Git
→ GitHub main
→ Cloudflare build
→ Production
```

Content deployment:

```text
Sanity Publish
→ Sanity webhook
→ Cloudflare Deploy Hook
→ Astro rebuild
→ Production
```

These are separate workflows.

Do not manually modify production infrastructure unless the task requires it.

## Cloudflare

Cloudflare terminology used by this project:

- **Domain `dpalmer.ca`** — DNS, SSL, redirects, caching and network configuration.
- **Worker `dpalmer-ca`** — build, deployment and hosting/server layer for the Astro site.

Static build output is:

`./dist`

Cloudflare serves this directory.

## Security

Never commit:

- API secrets
- passwords
- private tokens
- Deploy Hook URLs
- `.env` files
- authentication credentials

Do not print secrets into documentation, commits or logs.

## Dependencies

Do not automatically upgrade dependencies merely because newer versions exist.

Prefer:

1. security updates
2. necessary bug fixes
3. compatible patch/minor updates
4. planned and tested major upgrades

Use:

```bash
npm outdated
```

to review available updates.

Test dependency changes on dpalmer.ca before applying equivalent changes to client sites.

## Scope Discipline

Prefer the smallest change that solves the requested problem.

Do not:

- replace working architecture unnecessarily
- add dependencies without a clear need
- refactor unrelated code during small fixes
- change CMS schemas casually
- alter DNS or deployment settings without explicit need
- introduce server-side rendering when static generation is sufficient

Preserve the existing simple, maintainable architecture.