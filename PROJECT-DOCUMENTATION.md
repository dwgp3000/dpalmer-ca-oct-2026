# dpalmer.ca — Project Documentation

**Project:** Dave Palmer Marketing  
**Production website:** https://dpalmer.ca  
**CMS:** Sanity Studio  
**Hosting/build platform:** Cloudflare  
**Website framework:** Astro  
**Last verified:** October 2, 2026

---

## 1. System Overview

dpalmer.ca is a statically generated website built with Astro, with website content managed through Sanity.

The system consists of four primary services:

| System | Purpose |
| --- | --- |
| **Astro** | Builds the website from templates, components and Sanity content |
| **Sanity** | Stores and manages editable website content |
| **GitHub** | Stores the website and Sanity Studio source code |
| **Cloudflare** | Builds, deploys and serves the production website |

The production website is statically generated. Astro retrieves published content from Sanity during a build and generates HTML, CSS, JavaScript and other assets in the `dist/` directory.

Cloudflare then serves those generated files to visitors.

---

# 2. Architecture

## Production architecture

```text
                    CONTENT EDITING

                 Sanity Studio
             dpalmer.sanity.studio
                       │
                    Publish
                       │
                       ▼
                 Sanity Content Lake
                 production dataset
                       │
                       │ Webhook
                       ▼
              Cloudflare Deploy Hook
                       │
                       ▼

                    SITE BUILD

GitHub ─────────► Cloudflare Build
dpalmer-ca             │
                       │ npm run build
                       ▼
                     Astro
                       │
                 Fetches current
                 Sanity content
                       │
                       ▼
                    ./dist
                       │
                       ▼
              Cloudflare Worker
                 dpalmer-ca
                       │
                       ▼
                 dpalmer.ca
```

## Important concept

Publishing content in Sanity does **not** change the GitHub website repository.

Instead:

1. Content is published to the Sanity `production` dataset.
2. A Sanity webhook calls a Cloudflare Deploy Hook.
3. Cloudflare starts a new build of the existing `main` branch.
4. Astro retrieves the latest published Sanity content.
5. Astro generates a new static site.
6. Cloudflare deploys the new build.

This workflow was tested successfully on October 2, 2026.

---

# 3. Repositories and Local Projects

There are two separate repositories.

## Website

**Repository**

`dwgp3000/dpalmer-ca`

**Local project**

`dpalmer-ca`

**Purpose**

Contains the Astro website, components, page templates, CSS, static assets and Cloudflare configuration.

The `main` branch is the production branch.

Cloudflare is connected to this repository.

---

## Sanity Studio

**Repository**

`dwgp3000/dpalmer-studio`

**Local project**

`dpalmer-studio`

**Purpose**

Contains the Sanity Studio configuration and schemas used to manage website content.

Hosted Studio:

`https://dpalmer.sanity.studio`

Sanity project ID:

`f98etxtk`

Dataset:

`production`

---

# 4. Astro Website

## Verified software

- Astro 7.3.4
- Bootstrap 5.3.8
- Node.js 22.12 or newer
- Phosphor Icons
- Sanity Astro integration
- Sanity JavaScript client
- Sanity image URL tools
- Portable Text for Astro
- Astro sitemap integration

The project is configured as an ES module project.

---

## Astro configuration

Production site:

`https://dpalmer.ca`

Sanity configuration:

```text
Project ID: f98etxtk
Dataset: production
API version: 2026-09-28
useCdn: false
```

`useCdn: false` ensures production builds request current published content directly from Sanity rather than relying on cached CDN query results.

The Astro sitemap integration automatically generates the sitemap during production builds.

The site currently uses Astro's **static output** rather than server-side rendering.

---

# 5. Website Structure

## Pages

Verified page files:

```text
src/pages/
├── 404.astro
├── about.astro
├── contact.astro
├── index.astro
└── services/
    ├── index.astro
    ├── marketing-and-branding.astro
    ├── online-advertising.astro
    └── websites.astro
```

These generate eight static pages including the custom 404 page.

---

## Components

```text
src/components/
├── BannerHero.astro
├── CallToAction.astro
├── CardGrid.astro
├── ContactForm.astro
├── ContentSection.astro
├── FeatureGrid.astro
├── Footer.astro
├── Header.astro
├── Hero.astro
├── ServiceCard.astro
├── StructuredData.astro
└── Welcome.astro
```

Reusable site elements should generally be implemented as Astro components rather than duplicated between pages.

---

## Layout

Global page layout:

```text
src/layouts/Layout.astro
```

The layout handles shared page infrastructure including:

- HTML document structure
- page title
- meta description
- canonical URL
- Open Graph metadata
- Twitter/X metadata
- favicon
- structured data
- global header
- global footer

---

## Styles

Global site styles:

```text
src/styles/global.css
```

Bootstrap provides the base responsive grid and common layout utilities.

Custom site design and brand styling are handled through the project's CSS.

---

## Static files

Static assets are stored under:

```text
public/
```

Verified files include:

```text
favicon.png
robots.txt

images/
├── DP-black-sept23-logo.png
├── Dave-Palmer-transparent-650p.png
├── Marketing-page-1200x509-lr.jpg
├── Online-ads-page-1200x509-lr.jpg
├── Services-page-1200x509-lr.jpg
├── about-page-1200x509-lr.jpg
├── contact-page-1200x509-lr.jpg
├── dp-marketing-logo-horz.svg
└── website-page-1200x509-lr.jpg
```

Some current production images are delivered through the Sanity image CDN rather than `/public`.

---

# 6. Sanity CMS

## Verified software

- Sanity Studio 6.17
- React 19.2.4
- React DOM 19.2.4
- TypeScript
- Sanity Vision
- Sanity Structure Tool

Project:

`Dpalmer.ca`

Project ID:

`f98etxtk`

Dataset:

`production`

Hosted Studio:

`https://dpalmer.sanity.studio`

---

## Schemas

Verified schema files:

```text
schemaTypes/
├── aboutPage.ts
├── contactPage.ts
├── contentSection.ts
├── homePage.ts
├── index.ts
├── seo.ts
├── service.ts
├── servicesPage.ts
└── siteSettings.ts
```

### Main content types

**homePage**

Content for the home page.

**aboutPage**

Content for the About page.

**contactPage**

Content for the Contact page.

**servicesPage**

Content for the main Services page.

**service**

Individual service content.

**siteSettings**

Site-wide settings and content shared across pages.

### Supporting schemas

**contentSection**

Reusable content structure.

**seo**

SEO-related page fields.

**index.ts**

Registers schema types with Sanity.

---

# 7. Local Development

## Website

Open the `dpalmer-ca` project.

Install dependencies if necessary:

```bash
npm install
```

Start the Astro development server:

```bash
npm run dev
```

Typical local address:

```text
http://localhost:4321
```

The development site retrieves current Sanity content, making it useful for verifying CMS changes before a production rebuild.

### Production build

```bash
npm run build
```

Astro generates the finished static website in:

```text
dist/
```

### Local production preview

```bash
npm run preview
```

---

## Sanity Studio

Open the `dpalmer-studio` project.

Start the local Studio:

```bash
npm run dev
```

Build the Studio:

```bash
npm run build
```

Deploy the hosted Studio:

```bash
npm run deploy
```

The Sanity deployment is associated with its configured Studio application ID.

Routine content editing does **not** require running Sanity locally. Editors can use the hosted Studio.

---

# 8. Code Deployment

Website code deployment uses:

```text
Local development
      ↓
Git
      ↓
GitHub main branch
      ↓
Cloudflare
      ↓
Production
```

Typical workflow:

```bash
git status
git add .
git commit -m "Describe change"
git push
```

Cloudflare monitors the production repository and branch and automatically creates a deployment from changes to `main`.

Before pushing significant changes:

```bash
npm run build
```

A successful local production build should normally be required before deployment.

---

# 9. Content Publishing

Routine content changes should be made through Sanity Studio.

Workflow:

```text
Edit content
     ↓
Save draft
     ↓
Publish
     ↓
Sanity webhook
     ↓
Cloudflare Deploy Hook
     ↓
Astro rebuild
     ↓
Production deployment
     ↓
Live website
```

Draft changes do **not** trigger the production build.

The Sanity webhook is configured for the `production` dataset and responds to published document changes.

Create, Update and Delete actions can trigger the webhook.

Draft triggering is disabled.

---

## Expected publishing time

A normal Sanity content publication should generally appear on the production site within approximately **1–3 minutes**.

If a change has not appeared after approximately five minutes, check the Cloudflare deployment history.

Do not immediately republish repeatedly. First determine whether the build was triggered and whether it completed successfully.

---

# 10. Cloudflare

Cloudflare performs two distinct roles in this project.

Understanding this distinction is important.

## Domain: `dpalmer.ca`

The Cloudflare **Domain** controls network/domain functions such as:

- DNS
- SSL/TLS
- redirects
- caching
- security
- domain configuration

Think of this as the website's **address and network configuration**.

---

## Worker: `dpalmer-ca`

The Cloudflare **Worker** is the deployed website/application.

For this project, it effectively acts as the website's hosting/server layer.

It handles:

- builds
- deployments
- GitHub integration
- deploy hooks
- serving the generated Astro site

A useful mental model is:

> Domain = address/network  
> Worker = website/server

---

# 11. Cloudflare Build Configuration

Cloudflare Worker name:

```text
dpalmer-ca
```

Wrangler configuration:

```text
wrangler.jsonc
```

Verified settings:

```text
name: dpalmer-ca
compatibility_date: 2026-10-01
assets directory: ./dist
not_found_handling: 404-page
```

Cloudflare therefore serves the static files generated by Astro in `dist/`.

The custom Astro 404 page is used for nonexistent URLs.

---

# 12. Production Configuration Verified

The following were tested successfully during production launch/QA.

## Hosting and routing

- Production domain resolves through Cloudflare
- HTTPS works
- SSL certificate active
- Root domain works
- `www.dpalmer.ca` redirects to `dpalmer.ca`
- Nested URLs retain their paths through the www redirect
- Valid production pages return HTTP 200
- Invalid URLs return HTTP 404

## Search infrastructure

- `robots.txt` returns HTTP 200
- robots.txt allows crawling
- robots.txt references the sitemap
- `sitemap-index.xml` returns HTTP 200
- generated sitemap contains the production pages

## SEO

Verified:

- page titles
- meta descriptions
- canonical URLs
- duplicate canonical tags removed
- structured data
- Open Graph metadata
- Twitter/X card metadata
- 1200 × 630 social image configuration

## Browser/device testing

Production site was manually tested on multiple devices and was functioning correctly.

## CMS publishing

End-to-end CMS publishing was tested successfully:

```text
Sanity Publish
→ webhook
→ Cloudflare Deploy Hook
→ Astro build
→ Cloudflare deployment
→ live content update
```

Multiple consecutive CMS changes were successfully deployed.

---

# 13. Routine Maintenance

The following is the recommended maintenance procedure.

This section describes operating practice rather than a production feature.

## Monthly maintenance

Approximately once per month:

### 1. Check repository status

Website:

```bash
git status
git pull
```

Studio:

```bash
git status
git pull
```

Ensure local repositories are clean and synchronized before maintenance.

### 2. Review dependency status

Review available updates for both projects.

Do not blindly update every dependency across every client site at once.

### 3. Test updates on dpalmer.ca first

dpalmer.ca should serve as the first test site for framework and dependency updates.

Recommended workflow:

```text
Update locally
     ↓
Run local site
     ↓
Build
     ↓
Review key pages
     ↓
Deploy dpalmer.ca
     ↓
Monitor production
     ↓
Only then consider client sites
```

This makes dpalmer.ca the practical test environment for the shared technology stack.

### 4. Production build

Always run:

```bash
npm run build
```

before pushing framework/dependency changes.

### 5. Check production

After deployment, verify at minimum:

- home page
- one internal page
- navigation
- mobile layout
- contact form
- Sanity publishing
- 404 handling

---

# 14. Update Philosophy

Avoid unnecessary updates simply because a package has a newer version.

Priority should be given to:

1. security fixes
2. compatibility fixes
3. significant bug fixes
4. required platform changes
5. useful feature improvements

A stable production site does not need to run the newest possible version of every dependency at all times.

Major-version upgrades should receive more testing than routine patch updates.

---

# 15. Recovery and Rollback

## Failed Cloudflare deployment

If a new deployment fails:

1. Review the Cloudflare build log.
2. Determine whether the failure is a code/build issue or external service issue.
3. Confirm whether the previous production deployment remains active.
4. Correct the problem locally.
5. Run `npm run build`.
6. Commit and redeploy only after the build succeeds.

Do not make random production changes while diagnosing a failed build.

---

## Site works locally but not in production

Check:

1. Has the code been committed?
2. Has it been pushed to GitHub?
3. Did Cloudflare start a deployment?
4. Did the Cloudflare build succeed?
5. Is Cloudflare serving the latest deployment?
6. Is the issue browser/cache related?

---

## Sanity content changed but production did not

Check in this order:

1. Was the document actually **Published**, rather than only saved as a draft?
2. Did the Sanity webhook fire?
3. Did Cloudflare receive the Deploy Hook request?
4. Did a new Cloudflare build start?
5. Did the build succeed?
6. Does the new deployment contain the changed content?
7. Refresh the browser after the deployment is active.

A quick diagnostic is to run the Astro development server locally. If the new Sanity content appears locally but not in production, Sanity itself is probably functioning and the issue is likely in the build/deployment path.

---

## Sanity Studio validation prevents publishing

Sanity may disable Publish when the document contains schema validation errors.

Look for:

- red-highlighted fields
- missing required content
- validation messages
- obsolete content sections that no longer satisfy the current schema

Resolve the validation problem rather than bypassing it.

---

# 16. Backups and Source of Truth

## Website code

GitHub is the primary source of truth for website code.

Repository:

`dwgp3000/dpalmer-ca`

Local files should not be treated as the only copy of production code.

## CMS code

GitHub is the primary source of truth for Sanity Studio code and schemas.

Repository:

`dwgp3000/dpalmer-studio`

## Content

Published website content is stored in the Sanity `production` dataset.

## Production builds

Cloudflare retains deployment/build history that can assist with troubleshooting and rollback.

---

# 17. Security

Never commit the following to GitHub:

- API secrets
- private API tokens
- passwords
- Cloudflare Deploy Hook URLs
- private environment variables
- authentication credentials

The Cloudflare Deploy Hook URL should be treated as a secret because possession of the URL allows a build to be triggered.

Environment files are excluded through `.gitignore`:

```text
.env
.env.production
```

If a secret is accidentally exposed publicly, rotate or regenerate it.

---

# 18. Git Ignore Configuration

The website repository excludes:

```text
dist/
.astro/
node_modules/
.env
.env.production
.DS_Store
.idea/
```

as well as common package-manager log files.

This prevents generated builds, dependencies, environment secrets and common local-system files from entering the repository.

---

# 19. New Client Site Checklist

This architecture can serve as a template for future small-business websites.

## Planning

- define page structure
- define editable vs fixed content
- determine required Sanity schemas
- define SEO requirements
- determine forms/integrations
- determine whether static generation is appropriate

## Astro

- create Astro project
- configure Node requirement
- configure site URL
- add Sanity integration
- add sitemap integration
- add Bootstrap or chosen CSS system
- build shared layout
- build Header/Footer
- build reusable components
- create pages
- configure SEO
- configure structured data
- configure social sharing
- create 404 page
- create robots.txt
- test production build

## Sanity

- create Sanity project
- create production dataset
- create Studio
- create schemas
- configure site settings
- configure SEO fields
- deploy Studio
- verify editing permissions
- test drafts
- test validation
- test publishing

## GitHub

- create website repository
- create Studio repository
- push initial production code
- protect secrets
- confirm `.gitignore`

## Cloudflare

- create Worker/application
- connect website GitHub repository
- configure build
- configure production branch
- configure Wrangler
- attach custom domain
- configure DNS
- configure SSL
- configure www redirect
- create Deploy Hook

## Publishing automation

- create Sanity webhook
- point it to the Cloudflare Deploy Hook
- use production dataset
- disable draft triggers
- test publish
- confirm Cloudflare build
- confirm live change

## Production QA

Test:

- all pages
- navigation
- desktop
- tablet
- mobile
- forms
- HTTPS
- www redirect
- 404
- robots.txt
- sitemap
- favicon
- canonical URLs
- titles/descriptions
- structured data
- Open Graph
- social image
- Sanity publishing

---

# 20. AI / Codex Handoff

AI coding tools working on this project should understand the following before making changes.

## Architecture

This is a **static Astro website backed by Sanity CMS and hosted through Cloudflare**.

Do not convert the site to SSR or introduce another runtime architecture without an explicit project requirement.

## Repositories

Website:

```text
dpalmer-ca
```

Sanity CMS:

```text
dpalmer-studio
```

Do not assume Sanity schemas live inside the Astro repository.

## Content responsibility

Editable website content belongs in Sanity where practical.

Presentation and reusable interface logic belong in Astro.

Avoid hard-coding content that is intentionally CMS-managed.

## Schema contract

Astro templates depend on the existing Sanity schemas.

Before changing a Sanity field name, type or structure:

1. inspect where the field is queried/used by Astro
2. assess existing production content
3. update both sides deliberately
4. test locally
5. verify Sanity validation
6. build before deployment

Do not casually rename or remove production schema fields.

## Deployment

Code changes:

```text
GitHub → Cloudflare
```

Content changes:

```text
Sanity Publish → webhook → Cloudflare rebuild
```

These are separate workflows.

## Required checks

Before committing meaningful website changes:

```bash
npm run build
```

Before deploying meaningful Sanity Studio changes:

```bash
npm run build
```

Do not commit secrets.

Do not modify production DNS, Cloudflare deploy hooks, Sanity project configuration or deployment credentials unless the task specifically requires it.

---

# 21. Current Production Status

As of October 2, 2026:

- Astro production site deployed successfully
- Sanity Studio deployed successfully
- GitHub repositories clean and synchronized
- Cloudflare GitHub deployment working
- custom domain working
- HTTPS working
- www redirect working
- 404 handling working
- sitemap working
- robots.txt working
- favicon working
- canonical metadata working
- Open Graph metadata working
- Twitter/X metadata working
- browser/device QA completed
- Sanity webhook configured
- Cloudflare Deploy Hook configured
- end-to-end CMS publishing tested successfully

The core Phase 1 architecture is operational.

---

# 22. Key Principle

The goal of this architecture is to keep the client editing experience simple while keeping the technical stack lightweight.

For a content editor, the normal workflow should be:

```text
Open Sanity
→ Edit
→ Publish
→ Wait approximately 1–3 minutes
→ Site is live
```

The editor should not need access to Astro, GitHub, VS Code, Terminal or Cloudflare for routine website content changes.