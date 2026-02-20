Effectue un audit de sécurité du code actuel en vérifiant les règles OWASP définies dans `rules/SECURITY.md`.

## Checks obligatoires

### S1 — Timing attacks
- [ ] Rechercher les comparaisons de secrets avec `==` ou `!=`
- [ ] Vérifier que `hmac.compare_digest()` est utilisé pour tokens, API keys, HMAC

### S2 — Information disclosure
- [ ] Rechercher les `detail=str(e)` ou `detail=f"... {e}"` dans les HTTPException
- [ ] Vérifier que les messages d'erreur sont génériques

### S3 — SQL injection
- [ ] Rechercher les f-strings dans les requêtes SQL
- [ ] Vérifier que tous les paramètres sont liés (bind parameters)

### S4 — Rate limiting
- [ ] Identifier les endpoints publics/auth sans rate limiting
- [ ] Vérifier : login, reset password, OTP, magic link, invitations

### S5 — Validation MIME
- [ ] Vérifier que les uploads valident par magic bytes (pas seulement l'extension)

### S6 — Secrets
- [ ] Rechercher des secrets hardcodés dans le code
- [ ] Vérifier `.gitignore` couvre `.env`, `*.key`, `*.pem`

### S7 — Audit trail
- [ ] Vérifier que les téléchargements de fichiers sensibles sont loggés

## Output attendu

Pour chaque problème trouvé :
- **Fichier + ligne**
- **Règle violée** (S1-S7)
- **Sévérité** : Critique / Haute / Moyenne
- **Correction recommandée** avec exemple de code

Terminer par un résumé : X problèmes trouvés (Y critiques, Z hauts, W moyens).
