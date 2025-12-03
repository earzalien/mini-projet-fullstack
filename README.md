# Mini projet fullstack (template)

Template fullstack TypeScript avec :

- Frontend : React + Vite (TS), déployé sur GitHub Pages
- Backend : Express (TS), déployé sur Vercel
- Monorepo (frontend + backend)
- Dev global avec `npm run dev`
- Qualité : Biome, Husky, lint-staged
- Config d'environnements (Vite + GitHub Actions)

## Structure du projet

- `frontend/` : app React + Vite (TypeScript)
- `backend/` : API Express (TypeScript)
- `.github/workflows/deploy-frontend.yml` : déploiement auto du front sur GitHub Pages
- `package.json` (racine) : scripts globaux (dev backend + frontend, Husky, etc.)

## Installation

```bash
# Cloner le repo
git clone git@github.com:earzalien/mini-projet-fullstack.git
cd mini-projet-fullstack

# Installer les deps racine (concurrently, husky, etc.)
npm install

# Installer les deps backend
cd backend
npm install

# Installer les deps frontend
cd ../frontend
npm install
```

## Développement local

Depuis la racine :

```bash
npm run dev
```

- Backend : http://localhost:4000
- Frontend : http://localhost:5173

### Variables d'environnement (dev)

Dans `frontend/.env.development.local` :

```env
VITE_API_URL=http://localhost:4000
```

Le frontend appelle l'API via `import.meta.env.VITE_API_URL` → `http://localhost:4000/api/...` en dev.

## Qualité de code

### Backend (Biome + Husky + lint-staged)

Dans `backend/` :

- Linter :

```bash
npm run lint
```

- Format + fix :

```bash
npm run lint:fix
```

Biome est configuré pour :

- indentation 4 espaces
- LF
- règles recommandées
- interdiction de `console` (configurable dans `backend/biome.json`)

Husky + lint-staged :

- Hook pre-commit à la racine (`.husky/pre-commit`) :
  - se place dans `backend/`
  - lance `npx lint-staged`
- `lint-staged` (dans `backend/package.json`) :
  - applique `biome check --write` sur les fichiers `src/**/*`

Résultat : impossible de committer du code backend non formaté / non linté.

### Frontend (Biome)

Dans `frontend/` :

- Linter :

```bash
npm run lint
```

- Format + fix :

```bash
npm run lint:fix
```

Biome est configuré de la même manière, avec interdiction de `console`.

## Backend : Express + Vercel

### Dev

Dans `backend/` :

- Dev :

```bash
npm run dev
```

- Build :

```bash
npm run build
```

Entrée principale : `src/server.ts`

Routes :

- `GET /` → texte simple ("Hello from backend 🎉")
- `GET /api/message` → JSON `{ "message": "Hello from API 🎯" }`

### Prod (Vercel)

- Projet Vercel avec :
  - Root Directory : `backend`
  - Framework : "Other"
  - Build Command : `npm run build`
  - Install Command : `npm install`
- URL backend (prod) : `https://mini-projet-fullstack.vercel.app` (exemple actuel)

## Frontend : React + Vite + GitHub Pages

### Dev

Dans `frontend/` :

```bash
npm run dev
```

- URL dev : http://localhost:5173

### VITE_API_URL

Le frontend lit l'URL de l'API via :

```ts
const API_URL = import.meta.env.VITE_API_URL;
```

Les appels se font par exemple ainsi :

```ts
const response = await fetch(`${API_URL}/api/message`);
```

- En dev : `VITE_API_URL` vient de `.env.development.local`
- En prod : `VITE_API_URL` est fourni par GitHub Actions (env du job de build) et pointe vers Vercel

### Base Vite pour GitHub Pages

Dans `frontend/vite.config.ts` :

- `base` est configuré sur `"/mini-projet-fullstack/"` pour GitHub Pages, par exemple :

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/mini-projet-fullstack/",
    plugins: [react()],
});
```

## Déploiement GitHub Pages

Workflow : `.github/workflows/deploy-frontend.yml`

- Déclenché sur `push` sur `main`
- Étapes :
  - `working-directory: ./frontend`
  - `npm ci`
  - `npm run build`
  - `upload-pages-artifact` de `frontend/dist`
  - `deploy-pages`

Injection de `VITE_API_URL` pour le build (exemple actuel) :

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend
    env:
      VITE_API_URL: https://mini-projet-fullstack.vercel.app
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: frontend/package-lock.json
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./frontend/dist
```

Sur GitHub :

- Settings → Pages → Source : **GitHub Actions**

## URLs actuelles

- Frontend : https://earzalien.github.io/mini-projet-fullstack/
- Backend : https://mini-projet-fullstack.vercel.app

---

## Prochaines étapes

À intégrer ultérieurement :

- Supabase (database + auth)
- Routes API supplémentaires
- Typage avancé (Zod pour validation, etc.)
