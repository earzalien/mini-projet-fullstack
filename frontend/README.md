# Frontend - Mini projet fullstack

Application frontend en React + Vite (TypeScript), utilisée comme partie cliente du mini projet fullstack.

## Stack technique

- React 18 + TypeScript
- Vite
- Biome pour le lint/format
- Déploiement sur GitHub Pages via GitHub Actions

## Scripts disponibles

Dans le dossier `frontend/` :

```bash
npm install       # installation des dépendances
npm run dev       # lancement du serveur de dev Vite
npm run build     # build de production
npm run preview   # prévisualisation du build localement
npm run lint      # vérification Biome
npm run lint:fix  # formatage + fix automatique Biome
```

## Structure principale

- `src/main.tsx` : point d'entrée React
- `src/App.tsx` : composant principal
- `src/styles/` (si présent) : styles globaux
- `index.html` : template HTML Vite
- `vite.config.ts` : configuration Vite (dont `base` pour GitHub Pages)

## Variables d'environnement

Le frontend utilise une variable d'environnement pour connaître l'URL de l'API backend :

- `VITE_API_URL`

Exemple d'utilisation dans le code :

```ts
const API_URL = import.meta.env.VITE_API_URL;

const response = await fetch(`${API_URL}/api/message`);
```

### En développement

Créer un fichier `frontend/.env.development.local` :

```env
VITE_API_URL=http://localhost:4000
```

- Backend local sur `http://localhost:4000`
- Frontend dev sur `http://localhost:5173`

### En production (GitHub Pages)

En production, `VITE_API_URL` est injecté au moment du build par GitHub Actions, dans le workflow `.github/workflows/deploy-frontend.yml` :

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

Adapter `VITE_API_URL` si l'URL du backend change.

## Configuration Vite pour GitHub Pages

Dans `vite.config.ts`, la propriété `base` doit être configurée avec le nom du dépôt GitHub pour que les chemins statiques fonctionnent correctement sur GitHub Pages :

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/mini-projet-fullstack/",
  plugins: [react()],
});
```

Si le dépôt est renommé, il faut mettre à jour cette valeur.

## Déploiement

Le déploiement est géré par GitHub Actions via le workflow `deploy-frontend.yml`.

Résumé du process :

1. Push sur la branche `main`
2. GitHub Actions :
   - installe les dépendances dans `frontend/`
   - lance `npm run build`
   - publie le contenu de `dist/` sur GitHub Pages
3. Le site est accessible à l'URL configurée dans les paramètres GitHub Pages (par exemple :
   `https://earzalien.github.io/mini-projet-fullstack/`).

## Linting et formatage

Biome est configuré pour le projet frontend.

Commandes :

```bash
npm run lint
npm run lint:fix
```

- Vérifie le style et certains problèmes courants
- Formate le code selon la configuration du projet

## Comportement de base de l'app

Le composant `App.tsx` :

- lit `VITE_API_URL`
- effectue un appel `GET /api/message` sur le backend
- affiche soit le message retourné, soit un message d'erreur si l'appel échoue

Cela sert de base pour étendre l'application avec de nouvelles routes et fonctionnalités.
