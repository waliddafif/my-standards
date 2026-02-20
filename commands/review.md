Effectue une code review des changements récents (depuis la branche main ou le dernier commit).

## Processus

1. Lire le diff : `git diff main...HEAD` ou `git diff HEAD~1`
2. Pour chaque fichier modifié, analyser selon les axes ci-dessous

## Axes de review

### Qualité
- [ ] Les règles B1-B5 sont respectées (`CODING.md`)
- [ ] Pas de duplication de logique métier (B4)
- [ ] Pas de fonctions SQL dialecte-spécifiques (`func.strftime()`, etc.)
- [ ] `Decimal` → `float()`, `UUID` → `str()` avant sérialisation (B5)
- [ ] Logs structurés, pas de PII

### Sécurité
- [ ] Pas de `detail=str(e)` dans les HTTPException (S2)
- [ ] Pas de comparaison de secrets avec `==` (S1)
- [ ] Rate limiting sur les nouveaux endpoints publics (S4)
- [ ] SQL paramétré uniquement (S3)

### Tests
- [ ] Tests ajoutés pour chaque nouvelle fonction DB (T4)
- [ ] Tests avec vraie DB (pas uniquement mocks)
- [ ] Cas d'erreur testés (pas seulement le happy path)

### Performance
- [ ] Index DB sur les colonnes filtrées
- [ ] Pas de N+1 queries (chargement de relations en boucle)
- [ ] Pagination sur les endpoints qui retournent des listes

## Output attendu

Format par fichier :
```
app/services/my_service.py
  ⚠️  Ligne 42 : Decimal non converti → float() manquant
  ✅  Logique métier correcte
  ❌  Pas de test pour le code path DB (règle B3)
```

Terminer par : **Approuvé** / **Approuvé avec réserves** / **Changements requis**.
