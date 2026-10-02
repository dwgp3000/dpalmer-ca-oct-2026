# dpalmer.ca

Website for Dave Palmer Marketing.

This is a statically generated website built with **Astro**, using **Sanity** as the headless CMS and **Cloudflare** for building, deployment and hosting.

## Architecture

```text
Sanity CMS
    ↓
Astro
    ↓
Cloudflare
    ↓
dpalmer.ca
```

Published Sanity content automatically triggers a Cloudflare rebuild through a webhook and Deploy Hook.

## Projects

The system uses two repositories:

- **dpalmer-ca** — Astro website
- **dpalmer-studio** — Sanity Studio and schemas

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Production

Production site:

`https://dpalmer.ca`

Production branch:

`main`

Cloudflare automatically deploys code changes pushed to `main`.

Content changes are published through Sanity Studio and automatically trigger a Cloudflare rebuild.

## Documentation

See:

**[PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md)**

for the complete architecture, development, deployment, CMS, maintenance, recovery and troubleshooting documentation.

## Security

Do not commit API secrets, tokens, passwords, environment files or Cloudflare Deploy Hook URLs to this repository.