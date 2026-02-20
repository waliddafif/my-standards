Entre en plan mode pour planifier l'implémentation de la feature décrite.

## Processus

1. **Explorer le codebase** — comprendre la structure existante avant de proposer quoi que ce soit
   - Lire les modèles DB concernés (règle B1 : ne jamais assumer les champs)
   - Identifier les services existants à étendre plutôt que recréer
   - Repérer les patterns déjà en place (auth, rate limiting, tenant_id, etc.)

2. **Clarifier si nécessaire** — poser des questions sur les points ambigus AVANT de planifier

3. **Rédiger un plan détaillé** avec :
   - Liste des fichiers à créer / modifier
   - Migrations DB si nécessaire (avec ordre d'exécution)
   - Endpoints API (méthode, route, request/response)
   - Composants frontend impactés
   - Tests à écrire (unit + intégration)
   - Points de vigilance sécurité (S1-S9)

4. **Présenter le plan** pour validation avant d'écrire une seule ligne de code

## Règles à respecter

- Lire `CLAUDE.md` pour les conventions du projet
- Respecter les règles de sécurité (`rules/SECURITY.md`)
- Ne pas dupliquer la logique métier existante (règle B4)
- Prévoir les tests dès la conception (règle B3)
