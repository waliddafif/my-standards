Cree un nouvel endpoint API avec migration DB si necessaire.

## Processus

1. **Explorer** — lire les modeles DB et routes existantes avant de coder
2. **Clarifier** — poser des questions si le besoin est ambigu
3. **Planifier** — lister les fichiers a creer/modifier, presenter pour validation

4. **Executer en delegant aux agents** :
   - Si changement de schema DB → deleguer a l'agent `db-migration`
   - Implementation endpoint → deleguer a l'agent `api-endpoint`
   - Lancer migration avant endpoint (dependance sequentielle)

5. **Verifier** — executer les tests lies a l'endpoint

## Regles

- Jamais `detail=str(e)` dans les reponses HTTP
- SQL parametre uniquement
- Rate limiting sur endpoints publics/auth
- Validation input stricte (Pydantic/Zod)
- Un test d'integration minimum par endpoint
