# CG Dirt Work and More — Website

Marketing website for **CG Dirt Work and More**, an owner-operated excavation and
land services company based in Skiatook / Osage County, Oklahoma.

- **Owner/Operator:** Coty Goodwin
- **Domain:** https://cgdirtworkandmore.com
- **Stack:** Static HTML / CSS / vanilla JS

## Services
Retaining walls · Excavation & site preparation · Pond & ditch digging ·
Gravel driveways & pads · Trenching & utility work · Land management & habitat development

## Service area
Skiatook, Owasso, Collinsville, Claremore, and surrounding northeast Oklahoma
(Osage, Tulsa, and Rogers counties).

## Local development
Serve the folder over a local web server and open the printed URL:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure
```
/                     Core pages (index, about, services, service-area, contact, faq, projects, legal)
/services/            Individual service pages
/oklahoma/<city>/     City hubs + city-service pages (local SEO)
/images/              Site images (placeholders until final photos are supplied)
styles.css            Shared design system
sitemap.xml           XML sitemap
```
