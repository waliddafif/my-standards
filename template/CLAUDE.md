# CLAUDE.md — [Nom du Projet]

> Les règles globales (sécurité, conventions, tests) sont dans `~/.claude/CLAUDE.md`.
> Ce fichier contient uniquement les règles **spécifiques à ce projet**.

---

## Stack

- **Backend** : Python 3.12, FastAPI, SQLAlchemy async
- **Database** : PostgreSQL
- **Frontend** : Next.js, TypeScript, React
- **Auth** : [à compléter]
- **Deploy** : [à compléter]

---

## Structure projet

```
app/                   # Backend FastAPI
├── domain/models/     # SQLAlchemy models — LIRE avant de coder (règle B1)
├── services/          # Business logic
├── interfaces/http/   # API routes
└── adapters/          # External services (DB, email, storage...)

frontend/              # Next.js
├── app/               # App Router
├── components/
└── lib/

tests/
├── unit/
└── integration/
```

---

## Conventions spécifiques

<!-- Ajouter ici les conventions propres à ce projet -->

---

## Commandes

```bash
# Backend
uvicorn app.main:app --reload

# Tests backend (PostgreSQL via Docker obligatoire)
pytest tests/unit/ -v

# Frontend
cd frontend && npm run dev

# Tests frontend
cd frontend && npm run test:run && npm run build
```

---

## Variables d'environnement

Voir `.env.example` pour la liste complète.
Ne jamais committer de secrets réels.
