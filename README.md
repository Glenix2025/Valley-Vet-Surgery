# Valley Veterinary Surgery AI Assistant

AI Chatbot Demo & Clinic Information Portal for **Valley Veterinary Surgery** (Mackay, Walkerston, and Marian, Queensland).

## Features
- **Valley Vet AI Assistant**: 22 verified clinic FAQs, strict veterinary safety guardrails, smart dial, and TTS.
- **Frosted Glass UI**: Modern translucent glass aesthetic with brand eucalyptus tones.
- **3 Clinic Hotlines**: Mackay `(07) 4951 3799`, Walkerston `(07) 4959 2099`, Marian `(07) 4914 2404` (24/7 After-Hours Base).
- **Direct Booking**: One-click booking via `http://au.apt.vet/cg?m=g033`.

## Deploying to GitHub Pages (`Glenix2025/Valley-Vet-Surgery`)

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Deploy Valley Vet Surgery Assistant"
   git branch -M main
   git remote add origin https://github.com/Glenix2025/Valley-Vet-Surgery.git
   git push -u origin main --force
   ```

2. In your repository on GitHub:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Source**, select **GitHub Actions**
   - The automated `.github/workflows/deploy.yml` workflow will automatically run under the **Actions** tab and publish your live website to `https://glenix2025.github.io/Valley-Vet-Surgery/`!
