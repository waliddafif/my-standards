# Global Standards

> Règles universelles chargées dans tous les projets via symlink `~/.claude/CLAUDE.md`.
> Chaque projet garde son propre `CLAUDE.md` pour les règles spécifiques.

---

## Règles prioritaires (ROI maximal)

1. **Jamais `detail=str(e)` dans les réponses HTTP** — fuite d'info interne
2. **Lire les modèles/schémas AVANT de coder** — ne jamais assumer les champs
3. **`float()` sur Decimal, `str()` sur UUID** avant toute sérialisation JSON
4. **Base de données réelle dans les tests** — pas SQLite si prod = PostgreSQL
5. **Secrets sans `\n` final dans GCP** — `echo -n` obligatoire

---

## Sécurité

Voir `~/Documents/my-standards/rules/SECURITY.md` pour les 3 couches de règles (S1-S19, AG1-AG10).

### Web/API (S1-S19)

- `hmac.compare_digest()` pour comparer les secrets
- Jamais `detail=str(e)` — messages d'erreur génériques
- SQL paramétré uniquement, jamais de f-string
- Rate limiting sur tout endpoint public/auth sensible
- Validation MIME par magic bytes
- Fail-closed en production
- Secrets jamais dans git, `echo -n` pour GCP
- CORS restrictif, CSRF protection, input validation Pydantic strict
- Passwords : bcrypt/Argon2, jamais MD5/SHA
- Next.js : pas de secrets dans les Client Components, re-vérifier l'auth hors middleware

### Agentic AI/MCP (AG1-AG10)

- Outputs d'agents = non fiables, valider avant d'exécuter
- Moindre privilège sur les outils
- Pas de credentials partagés entre agents, token pass-through interdit
- Vérifier les MCP servers (tool poisoning)
- Jamais `eval()`/`exec()` sur du contenu LLM
- Détection prompt injection, MCP auth via OAuth 2.1
- Logger toutes les actions d'agents

---

## Code

Voir `~/Documents/my-standards/rules/CODING.md` pour les règles détaillées.

### Résumé obligatoire

- Lire les modèles DB/schémas avant d'écrire du code (règle B1)
- Vérifier les signatures de service avant d'appeler (règle B2)
- `float()` sur `Decimal`, `str()` sur `UUID` avant sérialisation Pydantic/JSON
- Pas de PII dans les logs (IDs uniquement)
- Patcher au module source dans les tests, pas au module qui importe
- Pas de fonctions SQL dialecte-spécifiques (`func.strftime()` = SQLite only)

---

## Tests

Voir `~/Documents/my-standards/rules/TESTING.md` pour les règles détaillées.

### Résumé obligatoire

- PostgreSQL via Docker (testcontainers) si prod = PostgreSQL
- `npm run build` obligatoire en CI (le mode dev cache les erreurs)
- Git hooks : pre-commit (lint/format), pre-push (tests)
- Un test d'intégration par code path DB (pas uniquement des mocks)

---

## Langue

- Interface utilisateur : **français** obligatoire
- Code, logs, documentation technique : anglais

## Commits

Format : `type(scope): description`
Types : `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

---

## Workflow Claude Code

- **Planifier avant de coder** : plan mode obligatoire pour les tâches touchant 3+ fichiers
- **Self-verification** : après avoir écrit du code, exécuter les tests pertinents. Ne pas attendre que l'utilisateur trouve les bugs.
- **Context propre** : limiter les outputs (`| tail -30`), déléguer les recherches exploratoires aux subagents
- **Si corrigé 2 fois sur la même erreur** : recommander `/clear` et reformuler
- **Notes par projet** : utiliser un répertoire `notes/` pour le contexte évolutif, garder CLAUDE.md concis
- **Fin de session** : vérifier l'absence de code dupliqué, TODO oubliés, console.log (`/techdebt`)

---

## Recherche web

- **Utiliser `WebSearch` quand je ne suis pas certain** d'une API, d'une feature, d'un comportement d'outil, d'une version de librairie, ou d'un écosystème qui évolue vite (ex: Codex, MCP, Next.js, GCP).
- Ne jamais répondre avec confiance sur des sujets potentiellement obsolètes sans vérifier d'abord.
- Exemples de situations qui déclenchent une recherche : "est-ce que X supporte Y ?", "comment configurer Z ?", "quelle est la dernière version de ?".

---

## Skills disponibles

| Commande | Description |
|----------|-------------|
| `/project-init` | Scaffolder un nouveau projet depuis les templates |
| `/security-audit` | Audit de sécurité OWASP avec scoring |
| `/pr-ready` | Vérification complète avant PR (review + sécu + tests + deploy) |
| `/techdebt` | Nettoyage dette technique en fin de session |
| `/update-standards` | Vérifier les dernières best practices (mensuel) |
| *(auto)* `standards-enforcer` | Règles de code chargées automatiquement |
| *(auto)* `dev-workflow` | Best practices de workflow chargées automatiquement |

---

## MCP Playwright

- **Ne JAMAIS appeler `browser_take_screenshot`** sauf si l'utilisateur le demande explicitement.
- Préférer `browser_snapshot` (accessibility tree) pour inspecter une page sans générer de fichier image.
