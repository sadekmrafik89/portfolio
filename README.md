# Mohamed Rafik Sadek — Portfolio

A static portfolio site. No build step, no dependencies, no monthly cost.
It runs anywhere that serves plain files — which is why it can be hosted free, forever.

## Files

```
portfolio/
├── index.html          Landing page
├── work.html           Professional work (Competitions, Workshops, CLUSTER, ADEC)
├── teaching.html       Teaching philosophy + course list
├── publications.html   Publications list
├── travels.html        Photography gallery
├── contact.html        Contact
├── project.html        Template — duplicate this for each project/course detail page
├── css/style.css       All styling (one file)
├── js/main.js          Menu, scroll reveals
└── images/
    ├── placeholder.svg Grey stand-in used by every image slot
    └── (your images go here)
```

## Preview it locally

Double-click `index.html` to open in a browser, or for a proper local server:

```bash
cd portfolio
python3 -m http.server 8000   # then open http://localhost:8000
```

## Adding your content

**Images.** Drop your files into `images/` (e.g. `cluster-01.jpg`). Then in the
HTML, change the placeholder `src` to point at them:

```html
<!-- before -->
<img src="images/placeholder.svg" alt="Competition project" />
<!-- after -->
<img src="images/cluster-01.jpg" alt="CLUSTER — urban documentation, 2023" />
```

Always write a real `alt` description — good for accessibility and search.
Use wide photos in `frame--169`/`frame--43` slots and portraits in `frame--45`/`frame--11`.

**Text.** Replace the placeholder titles and paragraphs directly in the HTML.
Anything wrapped in `<em>…</em>` inside a headline renders as the italic accent.

**A new project page.** Copy `project.html` to e.g. `cluster.html`, fill it in,
then point the relevant card's link at it (`href="cluster.html"`).

## Publishing for free — GitHub Pages

1. Create a public repo (e.g. `portfolio`) and push these files to it.
2. Repo → **Settings → Pages** → Source: **Deploy from a branch** → `main` / `/root`.
3. Wait ~1 minute. Your site is live at `https://<username>.github.io/portfolio/`.

To get the cleaner root URL `https://<username>.github.io/`, name the repo
exactly `<username>.github.io` instead.

```bash
cd portfolio
git init && git add . && git commit -m "Portfolio v1"
git branch -M main
git remote add origin https://github.com/<username>/portfolio.git
git push -u origin main
```

Alternatives that are also free: **Cloudflare Pages** or **Netlify** — both let
you drag-and-drop this folder, no git required.

## Optional: your own domain

Hosting stays free either way. A custom domain (e.g. `mrafiksadek.com`) is the
only paid part, ~$10–12/year from any registrar. Add it under GitHub Pages →
**Custom domain**, then point a CNAME record at `<username>.github.io`.

## Fonts

Loaded from Google Fonts (Fraunces, Manrope, Space Mono) — free, no account.
The site works without them; it just falls back to system fonts.
