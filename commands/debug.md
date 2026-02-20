Aide au debugging systématique du problème décrit.

## Processus

### 1. Comprendre le problème
- Quel est le comportement attendu ?
- Quel est le comportement observé ?
- Depuis quand ? Après quel changement ?
- Reproductible en local ? En staging ?

### 2. Collecter les indices
- Lire les logs d'erreur complets (stack trace, contexte)
- Identifier le fichier et la ligne exacte si possible
- Chercher dans le code les patterns suspects

### 3. Hypothèses (du plus probable au moins probable)
- Formuler 2-3 hypothèses sur la cause racine
- Identifier comment tester chaque hypothèse rapidement

### 4. Vérifications classiques selon le type d'erreur

**500 Internal Server Error silencieux :**
- `Decimal` non converti en `float()` avant sérialisation Pydantic
- `UUID` non converti en `str()`
- Champ manquant dans le `response_model`

**AttributeError sur un modèle :**
- Lire `app/domain/models/xxx.py` — le champ assumé n'existe peut-être pas (règle B1)

**Erreur DB / FK violation :**
- Vérifier l'ordre de création des objets (parent avant enfant)
- Vérifier que `tenant_id` est bien passé dans les requêtes

**Tests qui passent en local mais échouent en CI :**
- SQLite vs PostgreSQL — fonction SQL dialecte-spécifique ?
- Variable d'environnement manquante en CI ?

**Erreur GCP / Cloud Run au démarrage :**
- Secret avec `\n` final ? (`xxd` pour vérifier)
- Variable d'env manquante ?

### 5. Fix et vérification
- Corriger la cause racine (pas juste le symptôme)
- Ajouter un test qui reproduit le bug pour éviter la régression
- Vérifier que le fix ne casse pas d'autres tests
