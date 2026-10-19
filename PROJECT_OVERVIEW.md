# Ajrak Impex International Website

## Project Overview

This document is a shared reference for the website scope, current implementation, required client inputs, and delivery tracking. Status reflects what is present in the current frontend codebase; it does not represent client approval, production deployment, or backend completion.

**Project:** Ajrak Impex International website  
**Platform:** Responsive React website  
**Last reviewed:** 18 October 2026

## Project Purpose

Present Ajrak Impex International as a Pakistan-based global trade and export business. The site introduces the company and its heritage, showcases products and logistics services, explains international trade coverage, shares educational content, and provides ways for prospective buyers to get in touch.

## Website Scope

| Page / route | Purpose and current features | Status |
|---|---|---|
| Home `/` | Company promise, logistics and supply-chain preview, featured catalog, case studies, and contact call to action | Implemented in frontend |
| About Us `/about` | Company story, history timeline, values, and certifications | Implemented in frontend |
| Services `/services` | Logistics services, supply-chain steps, product catalog, case studies, and quote call to action | Implemented in frontend |
| Global Trade `/global-trade` | Regions and trade lanes served, plus buyer benefits | Implemented in frontend |
| Blog `/blog` | Static article summaries with category filters | Implemented in frontend; article detail pages are not included |
| Contact `/contact` | Contact details, location map, validated inquiry form | Frontend implemented; form delivery requires backend API |
| Log in `/login` | Validated login form and account redirect | Frontend implemented; authentication requires backend API |
| Sign up `/signup` | Registration form, password checks, and terms agreement checkbox | Frontend implemented; registration requires backend API |
| Account `/account` | Protected example page showing the signed-in user's name/email and log-out action | Example only; order or inquiry tracking is not included |
| Not found | Fallback for unknown routes | Implemented in frontend |

The navigation also links to case studies, product catalog, and certifications sections within the Services and About pages.

## Current Project Status

| Workstream | Status | Notes / next action |
|---|---|---|
| React/Vite website foundation and page routing | Implemented in frontend | Built with React 18, Vite, React Router 6, and Tailwind CSS 4 |
| Responsive layouts and shared visual components | Implemented in frontend | Uses shared navigation, footer, form, image, and reveal components |
| Company, service, product, and blog copy | Needs client review | Confirm factual accuracy, wording, and final approved content |
| Images and case-study material | Needs client review | Confirm image rights and replace any sample or missing images |
| Contact form delivery | Backend required | Connect `POST /api/contact` and confirm recipient/notification workflow |
| Registration, login, and session validation | Backend required | Implement the documented authentication API endpoints |
| Account features | Scope decision required | Current page is a profile example; define whether customers need order, shipment, or inquiry tracking |
| Production deployment and domain | Not documented in this repository | Confirm hosting, domain/DNS, SSL, and release owner |
| End-to-end acceptance and launch | Pending | Test approved content, devices, form delivery, authentication, and deployment |

## Client Inputs and Approvals

Please confirm or provide the following before launch:

- Business name, company description, history dates, and any claims about export experience.
- Product list, descriptions, specifications, and final product photography.
- Service descriptions, destinations served, and approved trade-lane percentages or other statistics.
- Case-study facts and permission to publish client, shipment, and outcome details.
- Certification names, current validity, and supporting evidence for publication.
- Official office address, phone numbers, email addresses, map location, and business hours.
- Approved privacy policy and terms of service for the account forms.
- Whether the site should support customer accounts, shipment/order tracking, or only lead generation.
- Backend/API owner, hosting provider, domain access, and production launch contact.

## Integrations and Technical Notes

- Frontend: React 18, Vite 5, React Router 6, and Tailwind CSS 4.
- Development: `npm install`, then `npm run dev` (Vite's default local URL is `http://localhost:5173`).
- Production bundle: `npm run build`; output is generated in `dist/`.
- API configuration: set `VITE_API_URL` for the backend base URL, or use the Vite development proxy configured in `vite.config.js`.
- Expected API endpoints are documented in `src/services/authService.js`: register, login, current-user lookup, and contact submission.
- The frontend currently stores the authentication token in browser `localStorage`. Before production, the backend and security approach should be reviewed; the README notes an httpOnly-cookie approach as a production consideration.
- Some images use files under `src/assests/images/`; other page sections refer to image files under `/images/`. Confirm all assets resolve in the production build and replace placeholders before launch.

## Delivery Tracker

Update the status and owner columns during project reviews. Suggested statuses: **Not started**, **In progress**, **Needs client input**, **Ready for review**, and **Complete**.

| Milestone | Suggested owner | Status | Target / notes |
|---|---|---|---|
| Confirm website scope and account requirements | Client + project team | Needs client input | Confirm whether account-based shipment tracking is required |
| Approve business content, statistics, and legal text | Client | Needs client input | See Client Inputs and Approvals |
| Supply and approve final image assets | Client + project team | Needs client input | Include publication rights/consent where applicable |
| Complete backend and connect forms/authentication | Development team | Not started | Required only for the interactive API-backed features |
| Review responsive website and content | Client + project team | Not started | Review desktop and mobile layouts and all routes |
| Run acceptance checks and resolve launch issues | Development team | Not started | Include contact delivery and account flows if backend is in scope |
| Deploy to approved domain and confirm launch | Project team | Not started | Hosting and domain details to be confirmed |

## Acceptance Checklist

- [ ] Client approves page content, product catalog, case studies, and published business claims.
- [ ] Final images are supplied, approved for use, and display without placeholders.
- [ ] Address, telephone numbers, email addresses, map marker, and business hours are confirmed.
- [ ] Contact inquiry reaches the agreed business inbox or CRM and success/error states are verified.
- [ ] If accounts are in scope, registration, login, session restoration, and logout work against the production API.
- [ ] Client confirms the intended account experience, including whether shipment/order tracking is required.
- [ ] Terms and privacy links lead to approved legal content.
- [ ] Main routes and navigation are checked on desktop and mobile.
- [ ] Production domain, HTTPS, and deployment are confirmed.

## Project Contacts and Review Notes

| Item | Details |
|---|---|
| Client decision-maker | To be confirmed |
| Project contact | To be confirmed |
| Backend/API owner | To be confirmed |
| Hosting/deployment owner | To be confirmed |
| Next review date | To be confirmed |
| Decisions / notes | Add dated decisions and action owners here |
