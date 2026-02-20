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

Voir `~/Documents/my-standards/rules/SECURITY.md` pour les règles détaillées.

### Résumé obligatoire

- Comparaison de secrets : `hmac.compare_digest()` uniquement (anti timing-attack)
- Messages d'erreur HTTP : génériques, jamais `detail=str(e)` ou `detail=f"... {e}"`
- SQL : requêtes paramétrées uniquement, jamais de f-string dans du SQL
- Rate limiting sur tout endpoint public/auth sensible
- Validation MIME par magic bytes, pas uniquement l'extension de fichier
- Services de sécurité : fail-closed en production
- Secrets : jamais dans git, jamais de `\n` final dans les secrets GCP
- Audit trail sur les téléchargements de fichiers sensibles

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
