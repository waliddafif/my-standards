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

## Sécurité / Code / Tests

Règles chargées automatiquement via `~/.claude/rules/` :
- **security.md** — S1-S19 (web/API) + AG1-AG10 (agentic)
- **code.md** — B1-B5, sérialisation, logs
- **tests.md** — PostgreSQL, CI, hooks

Référence complète : `~/Documents/my-standards/rules/`

---

## Langue

- Interface utilisateur : **français** obligatoire
- Code, logs, documentation technique : anglais

## Commits

Format : `type(scope): description`
Types : `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

---

## Dépendances & code existant

- **Avant d'installer une lib** : vérifier si Node, React, Next.js ou une lib déjà présente couvre le besoin
- **Avant de créer un fichier/composant/util** : chercher s'il en existe un similaire dans le projet (`Grep` ou `Glob` en premier)

---

## Effort de réflexion (ultrathink)

Avant de commencer une tâche, évalue sa complexité :
- **Tâche complexe** (3+ fichiers, sécurité/auth, migration DB, algorithme non trivial, debug multi-causes, architecture) → signale-le explicitement et demande : *"Cette tâche mérite un effort maximal. Tu veux activer ultrathink ?"*
- **Tâche simple** → procède directement sans demander

---

## Workflow Claude Code

- **Planifier avant de coder** : plan mode obligatoire pour les tâches touchant 3+ fichiers
- **Self-verification** : après avoir écrit du code, exécuter les tests pertinents. Ne pas attendre que l'utilisateur trouve les bugs.
- **Context propre** : limiter les outputs (`| tail -30`), déléguer les recherches exploratoires aux subagents
- **Compact proactif** : ne pas dépasser 50% du contexte. À 50%, recommander `/compact` à l'utilisateur avant de continuer
- **Si corrigé 2 fois sur la même erreur** : recommander `/clear` et reformuler
- **Notes par projet** : utiliser un répertoire `notes/` pour le contexte évolutif, garder CLAUDE.md concis
- **Fin de session** : vérifier l'absence de code dupliqué, TODO oubliés, console.log (`/techdebt`)

---

## Recherche web

- **OBLIGATOIRE : `WebSearch` AVANT toute installation, configuration ou déploiement de service externe** (DB, hosting, CI/CD, API tierce). Vérifier la dernière version stable, les options disponibles, et les breaking changes.
- **Utiliser `WebSearch` quand je ne suis pas certain** d'une API, d'une feature, d'un comportement d'outil, d'une version de librairie, ou d'un écosystème qui évolue vite (ex: Codex, MCP, Next.js, GCP, Railway, Stripe).
- Ne jamais répondre avec confiance sur des sujets potentiellement obsolètes sans vérifier d'abord.
- Ne jamais assumer qu'une version n'existe pas ou qu'un service ne supporte pas une feature sans recherche préalable.
- Exemples de situations qui déclenchent une recherche : "est-ce que X supporte Y ?", "comment configurer Z ?", "quelle est la dernière version de ?", "quel template/image utiliser pour X ?".

---

## Skills disponibles

| Commande | Description |
|----------|-------------|
| `/project-init` | Scaffolder un nouveau projet depuis les templates |
| `/new-feature` | Planifier + implémenter une feature (orchestre les 3 agents) |
| `/new-endpoint` | Créer un endpoint API + migration DB |
| `/new-page` | Créer une page/composant frontend |
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

@RTK.md
