# AGENTS.md

> **Référence :** les règles et conventions sont définies dans `CLAUDE.md`.
> Ce fichier (`AGENTS.md`) doit rester aligné. En cas de conflit, **`CLAUDE.md` fait foi**.

Instructions pour OpenAI Codex et autres AI agents.

---

## Démarrage

**Commence par lire `CLAUDE.md`** — c'est la source de vérité pour les règles universelles.

Puis consulte selon le besoin :

| Besoin | Fichier |
|--------|---------|
| Règles sécurité détaillées | `rules/SECURITY.md` |
| Conventions code | `rules/CODING.md` |
| Conventions tests | `rules/TESTING.md` |
| Template nouveau projet | `template/` |

---

## Ce repo

`my-standards` contient des règles universelles et des templates de projet.

- **Ne pas modifier `CLAUDE.md`** sans mettre à jour `AGENTS.md` en conséquence
- **Ne pas dupliquer** les règles entre `CLAUDE.md` et `AGENTS.md`
- **Ne pas ajouter** d'infos projet-spécifiques ici (ce repo est générique)

---

## Règles prioritaires (résumé)

1. Jamais `detail=str(e)` dans les réponses HTTP
2. Lire les modèles/schémas AVANT de coder
3. `float()` sur Decimal, `str()` sur UUID avant sérialisation
4. Base de données réelle dans les tests (pas SQLite si prod = PostgreSQL)
5. Secrets GCP sans `\n` final (`echo -n`)

## Sécurité étendue

`rules/SECURITY.md` couvre 3 couches :
- **S1-S9** : Règles internes (timing attacks, SQL injection, rate limiting, etc.)
- **S10-S19** : OWASP Top 10 2025 (CORS, CSRF, input validation, password hashing, CSP, Next.js CVEs)
- **AG1-AG10** : OWASP Agentic Top 10 2026 (prompt injection, tool misuse, MCP auth, agent audit trail)

Consulter `rules/SECURITY.md` pour le détail de chaque règle.
