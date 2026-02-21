# Soumya Dahal - Portfolio

A minimalist single-page portfolio built with React and TailwindCSS, deployed on GitHub Pages.

## 🏗️ Tech Stack

- **Vite** + **React** + **JavaScript**
- **TailwindCSS** for styling
- **GitHub Pages** for hosting
- **GitHub Actions** for CI/CD

## 🚀 Quick Start

### Local Development

```bash
cd frontend
npm install
npm run dev
```

Visit: **http://localhost:3000**

### Build for Production

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`

## 🌐 Deployment

This portfolio is automatically deployed to GitHub Pages via GitHub Actions.

### Setup

1. **Enable GitHub Pages** in your repository:
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Your site will be live at**:
   - `https://yourusername.github.io/soumya-dahal-portfolio/`
   - Or your custom domain if configured

### Custom Domain

The project is configured for custom domain `soumyadahal.com.np`.

**To set up your custom domain:**

1. **Configure DNS** (add these A records):
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

2. **Add domain in GitHub**:
   - Go to Settings → Pages
   - Enter your domain: `soumyadahal.com.np`
   - Check "Enforce HTTPS"

3. **Wait for DNS propagation** (can take up to 48 hours)

## 📝 Update Content

Edit these files to customize your portfolio:

- `frontend/src/components/Hero.jsx` - Name, title, introduction
- `frontend/src/components/About.jsx` - Bio and description
- `frontend/src/components/Projects.jsx` - Your projects
- `frontend/src/components/Skills.jsx` - Technical skills
- `frontend/src/components/Education.jsx` - Education details
- `frontend/src/components/Certifications.jsx` - Certifications
- `frontend/src/components/ContactForm.jsx` - Contact information

## 🔐 Login & Downloads (Supabase)

The site supports sign up (email + verification code) and login. Logged-in users can download PDFs from the **Downloads** page.

### Setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the frontend, copy `.env.example` to `.env` and set:
   - `VITE_SUPABASE_URL` – your project URL (Settings → API)
   - `VITE_SUPABASE_ANON_KEY` – the anon public key
3. In Supabase: **Authentication → URL Configuration** – set **Site URL** and add your app URL to **Redirect URLs**.
4. **Storage**: Create a **private** bucket named `pdfs`. Add a policy so authenticated users can read (e.g. allow `SELECT` for `auth.role() = 'authenticated'`). Upload PDFs via Storage in the dashboard.
5. **Production (GitHub Pages):** In your repo go to **Settings → Secrets and variables → Actions**. Add repository secrets:
   - `VITE_SUPABASE_URL` – your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` – your anon public key  
   The CI workflow uses these when building so login and downloads work on the live site.

## 📧 Contact Form

The contact form uses a `mailto:` link to open the user's email client. No backend required!

If you want to add a backend API later, set the `VITE_API_URL` environment variable and the form will automatically use it.

## 🔄 Workflow

The GitHub Actions workflow:
1. Runs on every push to `main`
2. Lints the code
3. Builds the frontend
4. Deploys to GitHub Pages

## 📄 License

© 2025 Soumya Dahal. All rights reserved.

## 📧 Contact

- **Email**: dahalsoumya@gmail.com
- **GitHub**: https://github.com/soumyadahal
- **LinkedIn**: https://www.linkedin.com/in/soumya-dahal-ab749b365

---

**Minimal code. Maximum impact.**
