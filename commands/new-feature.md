Entre en plan mode pour planifier l'implémentation de la feature décrite.

## Processus

1. **Explorer le codebase** — comprendre la structure existante avant de proposer quoi que ce soit
   - Lire les modèles DB concernés (rule B1 : ne jamais assumer les champs)
   - Identifier les services existants a etendre plutot que recreer
   - Reperer les patterns deja en place (auth, rate limiting, tenant_id, etc.)

2. **Clarifier si necessaire** — poser des questions sur les points ambigus AVANT de planifier

3. **Rediger un plan detaille** avec :
   - Liste des fichiers a creer / modifier
   - Migrations DB si necessaire (avec ordre d'execution)
   - Endpoints API (methode, route, request/response)
   - Composants frontend impactes
   - Tests a ecrire (unit + integration)
   - Points de vigilance securite (S1-S9)

4. **Presenter le plan** pour validation avant d'ecrire une seule ligne de code

5. **Executer en delegant aux agents specialises** :
   - Schema/migration DB → deleguer a l'agent `db-migration`
   - Endpoints API → deleguer a l'agent `api-endpoint`
   - Composants frontend → deleguer a l'agent `frontend-feature`
   - Lancer les agents en parallele quand il n'y a pas de dependance entre eux

## Regles a respecter

- Lire `CLAUDE.md` pour les conventions du projet
- Respecter les regles de securite (`rules/SECURITY.md`)
- Ne pas dupliquer la logique metier existante (rule B4)
- Prevoir les tests des la conception (rule B3)
- Self-verification : executer les tests apres implementation
