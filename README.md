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

## Nouveau projet

```bash
cp -r ~/Documents/my-standards/template/. mon-nouveau-projet/
cd mon-nouveau-projet
# Personnaliser CLAUDE.md avec les spécificités du projet
```

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
