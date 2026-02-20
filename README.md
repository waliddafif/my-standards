# my-standards

Universal coding standards, security rules, and project templates.

Chargé automatiquement dans tous les projets via symlink `~/.claude/CLAUDE.md`.

---

## Structure

```
├── CLAUDE.md              ← Règles globales (source de vérité)
├── AGENTS.md              ← OpenAI Codex (référence CLAUDE.md)
├── GEMINI.md              ← Gemini CLI (référence CLAUDE.md)
├── rules/
│   ├── SECURITY.md        ← S1-S9 : timing-safe, SQL, headers, rate limiting...
│   ├── CODING.md          ← B1-B5 : modèles DB, Pydantic, UUID, patching...
│   └── TESTING.md         ← PostgreSQL réel, build CI, git hooks...
└── template/              ← Boilerplate pour nouveaux projets
    ├── CLAUDE.md           ← Template minimal projet
    ├── AGENTS.md
    ├── GEMINI.md
    ├── python-fastapi/     ← pyproject.toml + conftest.py (testcontainers)
    ├── nextjs/             ← package.json
    └── .github/workflows/  ← CI backend + frontend
```

---

## Installation (nouvelle machine)

```bash
bash <(curl -s https://raw.githubusercontent.com/waliddafif/my-standards/main/setup.sh)
```

Ou manuellement :

```bash
git clone git@github.com:waliddafif/my-standards.git ~/Documents/my-standards
~/Documents/my-standards/setup.sh
```

---

## Nouveau projet SaaS (workflow complet)

Ces deux repos sont complémentaires :

| Repo | Rôle | Quand |
|------|------|-------|
| **`my-standards`** | Règles qualité/sécurité | Toujours actif (symlink automatique) |
| **`saas-template`** | Point de départ visuel | Une fois au démarrage d'un nouveau projet |

### Étape 1 — Créer le projet depuis le template

```bash
# Cloner saas-template comme base du nouveau projet
gh repo create mon-projet --template waliddafif/saas-template --private --clone
cd mon-projet
npm install
```

### Étape 2 — Personnaliser le contenu (< 30 min)

```bash
# 1. Nom du produit : search & replace global
#    Remplacer "YourSaaS" → "MonProduit" dans tout le projet

# 2. Contenu marketing
#    lib/data/features.ts  ← features du produit
#    lib/data/pricing.ts   ← plans et tarifs
#    lib/data/faq.ts       ← questions fréquentes

# 3. Navigation app
#    lib/navigation.ts     ← items de la sidebar

# 4. Auth provider (si pas Firebase)
#    lib/auth/index.ts     ← changer l'import en 1 ligne

# 5. Couleurs
#    app/globals.css       ← tokens HSL (--primary, --accent...)
```

### Étape 3 — Initialiser les règles projet

```bash
# Copier le template CLAUDE.md projet
cp ~/Documents/my-standards/template/CLAUDE.md CLAUDE.md

# Personnaliser avec les spécificités du projet
# (stack, conventions, structure, état actuel...)
```

### Étape 4 — Valider et déployer

```bash
npm run build   # Vérifier avant tout commit
npm run dev     # Développement local

# Deploy (au choix)
vercel --prod                                               # Vercel (recommandé)
gcloud run deploy mon-projet --source . --region europe-west1  # GCP Cloud Run
docker build -t mon-projet . && docker run -p 3000:3000 mon-projet  # Docker
```

### Architecture résultante

```
mon-projet/
├── CLAUDE.md          ← Règles spécifiques au projet
│                         (my-standards s'applique via ~/.claude/CLAUDE.md)
├── app/
│   ├── (landing)/     ← Site marketing (Hero, Features, Pricing, FAQ)
│   ├── (auth)/        ← Connexion
│   └── (app)/         ← Zone protégée
├── lib/
│   ├── data/          ← ✏️ Contenu à personnaliser
│   └── auth/          ← Auth swappable (Firebase / Supabase / JWT)
└── ...
```

> **Règles `my-standards`** actives automatiquement via `~/.claude/CLAUDE.md` —
> sécurité (S1-S9), code (B1-B5), tests, commits, langue UI.

---

## Mettre à jour les règles

```bash
cd ~/Documents/my-standards
# Éditer CLAUDE.md ou rules/*.md
git commit -m "fix(security): ..."
git push
# → Propagé immédiatement à tous les projets via le symlink
```

---

## Principe

```
CLAUDE.md  ←  source de vérité  →  AGENTS.md
                                →  GEMINI.md
                                →  ~/.claude/CLAUDE.md (symlink)
                                       ↓
                              Tous les projets
```

Un seul endroit à maintenir. Propagation automatique.
