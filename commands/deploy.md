Vérifie que le projet est prêt pour un déploiement en production.

## Checklist

### Code
- [ ] Pas de `print()`, `console.log()`, ou `debugger` oubliés
- [ ] Pas de `TODO` ou `FIXME` bloquants
- [ ] Pas de secrets hardcodés dans le code
- [ ] Variables d'environnement documentées dans `.env.example`

### Tests
- [ ] Tests unitaires passent (`pytest tests/unit/ -x` ou `npm run test:run`)
- [ ] Build production passe (`npm run build`)
- [ ] Pas de tests skippés sans raison valable

### Base de données
- [ ] Migrations écrites pour tous les changements de schéma
- [ ] Migrations réversibles (ou rollback documenté)
- [ ] Index ajoutés sur les colonnes filtrées fréquemment

### Sécurité
- [ ] Aucun `detail=str(e)` dans les réponses HTTP
- [ ] Rate limiting sur les nouveaux endpoints publics/auth
- [ ] Secrets GCP créés avec `echo -n` (sans `\n` final)

### Infrastructure
- [ ] Variables d'env mises à jour dans l'environnement cible
- [ ] Nouvelles ressources GCP ajoutées dans Terraform
- [ ] `terraform plan` sans diff inattendu

### Monitoring
- [ ] Logs structurés sur les nouveaux endpoints
- [ ] Alertes configurées si nouveau job critique

## Output attendu

Lister les points **non validés** avec l'action corrective.
Si tout est OK : confirmer que le projet est prêt au déploiement.
