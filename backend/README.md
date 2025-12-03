# Backend - Mini projet fullstack

API backend en Express + TypeScript, déployée sur Vercel, utilisée par le frontend du mini projet fullstack.

## Stack technique

- Node.js + Express
- TypeScript
- Biome pour le lint/format
- Déploiement sur Vercel

## Scripts disponibles

Dans le dossier `backend/` :

```bash
npm install       # installation des dépendances
npm run dev       # lancement du serveur en mode développement (ts-node / nodemon)
npm run build     # build TypeScript vers JavaScript
npm start         # lancement du serveur à partir du build
npm run lint      # vérification Biome
npm run lint:fix  # formatage + fix automatique Biome
```

## Structure principale

- `src/server.ts` : point d'entrée de l'application Express
- `src/routes/` (si présent) : routes organisées par fichier
- `dist/` : code compilé en JavaScript après build
- `biome.json` : configuration Biome

## Endpoints exposés

Endpoints de base fournis par le template :

- `GET /` : retourne un simple message texte pour tester que le backend répond
- `GET /api/message` : retourne un JSON du type :

```json
{
  "message": "Hello from API 🎯"
}
```

Ces routes servent de base pour ajouter d'autres endpoints (CRUD, etc.).

## Développement local

### Lancer le backend seul

Dans `backend/` :

```bash
npm install
npm run dev
```

Par défaut, le serveur écoute sur :

- `http://localhost:4000`

L'URL peut être centralisée dans une variable d'environnement ou une constante de configuration si besoin.

### Lancer tout le projet (frontend + backend)

Depuis la racine du monorepo, un script global peut lancer serveur backend + frontend en parallèle (via `concurrently`) par exemple :

```bash
npm run dev
```

- Backend : `http://localhost:4000`
- Frontend : `http://localhost:5173`

Dans cette configuration, le frontend parle au backend via `VITE_API_URL=http://localhost:4000`.

## Variables d'environnement

Selon la configuration, le backend peut utiliser des variables d'environnement pour :

- le port d'écoute (ex : `PORT=4000`)
- des URLs ou clés externes (DB, services tiers, etc.)

Dans ce template minimal, il fonctionne avec des valeurs par défaut (ex : `PORT = 4000` si non défini).

Pour la suite (intégration d'une base de données ou de Supabase), des fichiers `.env` pourront être ajoutés avec par exemple :

```env
PORT=4000
DATABASE_URL=...
```

Veiller à ne **jamais** committer de secrets dans le dépôt git (utiliser `.env` en local et les secrets Vercel en production).

## Déploiement sur Vercel

Le backend est déployé come une app Node.js/Express classique.

### Configuration du projet Vercel

- Root Directory : `backend`
- Framework Preset : `Other` (ou Node.js simple)
- Build Command :

```bash
npm run build
```

- Install Command :

```bash
npm install
```

- Output : Vercel lance le serveur produit par le build (selon la configuration du projet, par exemple en pointant vers `dist/server.js`).

Une fois déployé, Vercel fournit une URL publique, par exemple :

- `https://mini-projet-fullstack.vercel.app`

Le frontend utilise cette URL comme `VITE_API_URL` en production.

### Variables d'environnement sur Vercel

Pour les prochaines évolutions (DB, Supabase, etc.), les variables d'environnement du backend devront être définies dans :

- Vercel → Settings → Environment Variables

Exemples futurs :

- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Ces valeurs ne doivent jamais être ajoutées en clair dans le code ou dans le repo.

## Linting et formatage

Biome est configuré pour le backend.

Dans `backend/` :

```bash
npm run lint
npm run lint:fix
```

- Vérifie le style de code et certains problèmes courants
- Formate automatiquement selon la configuration (`biome.json`)

Un hook `pre-commit` avec Husky + lint-staged peut être configuré au niveau du repo pour empêcher les commits qui ne passent pas le lint.

## Extension du backend

Ce template sert de base pour :

- ajouter de nouvelles routes Express (`/api/...`)
- brancher une base de données (PostgreSQL via Supabase, par exemple)
- gérer l'authentification (JWT, Supabase Auth, etc.)

L'objectif est de garder une structure simple, lisible et facilement extensible pour des petits projets fullstack.
