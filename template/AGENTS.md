# AGENTS.md

> **Référence :** les règles et conventions sont définies dans `CLAUDE.md`.
> Ce fichier (`AGENTS.md`) doit rester aligné. En cas de conflit, **`CLAUDE.md` fait foi**.

Instructions pour OpenAI Codex et autres AI agents.

---

## Démarrage

**Commence par lire `CLAUDE.md`** — c'est la source de vérité pour :
- Stack technique et architecture
- Règles spécifiques au projet
- Commandes essentielles

Les règles universelles (sécurité, conventions, tests) sont dans `~/.claude/CLAUDE.md`
(chargé automatiquement par Claude Code via symlink).

---

## Contexte projet

**[Nom du projet]** — [Description courte]

| Environnement | Status | URL |
|---------------|--------|-----|
| Staging | 🔜 | - |
| Production | 🔜 | - |

---

## Structure projet

```
app/                   # Backend
├── domain/models/     # Modèles DB — LIRE avant de coder (règle B1)
├── services/          # Business logic
└── interfaces/        # API routes

frontend/              # Frontend
tests/                 # Tests backend
```

---

## Commandes essentielles

```bash
# Backend
uvicorn app.main:app --reload

# Tests (PostgreSQL via Docker obligatoire)
pytest tests/unit/ -v

# Frontend
cd frontend && npm run dev && npm run build
```

---

## Fichiers à consulter selon le besoin

| Besoin | Fichier |
|--------|---------|
| Architecture | `.claude/context/ARCHITECTURE.md` |
| Sécurité | `~/.claude/rules/SECURITY.md` |
| Conventions code | `~/.claude/rules/CODING.md` |
| Conventions tests | `~/.claude/rules/TESTING.md` |
| Ops | `docs/ops/RUNBOOK.md` |

---

## Continuité avec Claude Code

Tu prends potentiellement la suite d'une session Claude Code.
Respecte l'architecture et les conventions définies dans `CLAUDE.md`.
Étendre les services existants plutôt que les recréer.
