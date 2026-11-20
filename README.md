# CommerceIQ — React/Vite Demo

A self-contained commerce analytics dashboard with interactive tabs, search, filters, and a **simulated** assistant. All numbers are fake demo data. No AI API, API key, backend, database, or token usage.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Deploy to GitHub Pages

This project is preconfigured for a repository called `my-react-app`.

1. Upload **all repository contents, including `.github/workflows/deploy.yml`** to your GitHub repository's `main` branch. If using GitHub's browser uploader, note that hidden folders may be skipped; you can create the workflow file manually in GitHub instead.
2. Under **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
3. Check the **Actions** tab for a successful deployment.
4. Visit `https://YOUR_USERNAME.github.io/my-react-app/`.

If your repository has a different name, change `base` in `vite.config.js` to `'/YOUR_REPOSITORY_NAME/'`.

The `.github/workflows/deploy.yml` workflow will automatically publish new commits. No credentials needed.
