# soumyadahal.com.np — Article Site

Personal technical writing site hosted on GitHub Pages at [soumyadahal.com.np](https://soumyadahal.com.np).

## Structure

```
.
├── index.html                  # Homepage — article listing
├── assets/
│   └── style.css               # All shared styles
├── images/                     # Article images go here
├── active-directory/
│   └── index.html              # → soumyadahal.com.np/active-directory/
├── cron-job/
│   └── index.html              # → soumyadahal.com.np/cron-job/
├── bash-scripting/
│   └── index.html              # → soumyadahal.com.np/bash-scripting/
├── wazuh/
│   └── index.html              # → soumyadahal.com.np/wazuh/
├── CNAME                       # Custom domain config
└── .github/workflows/
    └── deploy.yml              # Auto-deploy on push to main
```

## Adding a New Article

1. Create a new folder: `mkdir my-topic`
2. Copy an existing article as a template: `cp wazuh/index.html my-topic/index.html`
3. Edit the title, tags, TOC, and section headings in `my-topic/index.html`
4. Add a card for it in `index.html` (the homepage article list)
5. Push to `main` — GitHub Actions deploys automatically

## Adding Images

Drop images into the `images/` folder, then reference them in your article:

```html
<img src="../images/my-diagram.png" alt="Description" class="article-img" />
<p class="img-caption">Figure 1 — My diagram caption</p>
```

## Writing Content

Replace each `<div class="content-placeholder">` block with your actual content.

**HTML elements available:**

```html
<!-- Paragraph -->
<p>Your text here</p>

<!-- Code block -->
<pre><code>your code here</code></pre>

<!-- Inline code -->
<code>inline</code>

<!-- Callout / note box -->
<div class="callout">
  <p class="callout-label">Note</p>
  <p>Your note here</p>
</div>

<!-- Warning callout -->
<div class="callout callout-warn">
  <p class="callout-label">Warning</p>
  <p>Your warning here</p>
</div>

<!-- Blockquote -->
<blockquote>A quoted passage</blockquote>

<!-- List -->
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>
```

## Deployment

Every push to `main` triggers GitHub Actions which deploys the site.

**GitHub Pages settings required:**
- Settings → Pages → Source: **GitHub Actions**

The custom domain (`soumyadahal.com.np`) is configured via the `CNAME` file.
DNS A records should point to GitHub Pages IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## Tech

Pure HTML + CSS. No build step. No frameworks. No dependencies.
