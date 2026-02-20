# Conventions Code Universelles

---

## Règle B1 : Lire les modèles AVANT de coder

**AVANT d'écrire une query, un accès `.field`, ou un import de modèle :**

1. Lire le fichier du modèle (SQLAlchemy, Prisma, Mongoose, etc.)
2. Vérifier que chaque champ accédé **existe** réellement
3. Ne jamais assumer qu'un modèle a un champ parce qu'un autre modèle similaire l'a

```python
# ❌ INTERDIT — assumer les champs depuis une spec
contact.first_name   # Peut être contact.name dans le vrai modèle
tenant.is_active     # Peut être tenant.status != "cancelled"

# ✅ OBLIGATOIRE — vérifier app/domain/models/contact.py d'abord
```

---

## Règle B2 : Vérifier les signatures avant d'appeler

Vérifier que la méthode **existe**, son **nom exact**, et les **types des paramètres**.

```python
# ❌ INTERDIT — deviner
contact = await service.get(db, contact_id, tenant_id)

# ✅ OBLIGATOIRE — vérifier dans le fichier service
contact = await service.get_contact(db, contact_id, tenant_id)
```

---

## Règle B3 : Un test d'intégration par code path DB

Tout code qui fait un `select()`, `insert()`, ou accède à `.field` sur un modèle doit avoir au minimum un test avec une vraie session DB.

---

## Règle B4 : Pas de duplication de logique métier

Si deux services implémentent la même logique, extraire dans une fonction commune.

---

## Règle B5 : Types stricts dans les requêtes DB

```python
# ❌ INTERDIT
select(Contact).where(Contact.id == contact_id)  # str vs UUID

# ✅ OBLIGATOIRE
from uuid import UUID
select(Contact).where(Contact.id == UUID(contact_id))
```

---

## Pydantic / Sérialisation JSON

Les erreurs de sérialisation sont **silencieuses** (500 sans message clair).

```python
# ❌ Crash silencieux
return {"cost": Decimal("10.50"), "id": uuid.uuid4()}

# ✅ Conversions explicites
return {"cost": float(Decimal("10.50")), "id": str(uuid.uuid4())}
```

| Type Python | Sérialisation JSON/Pydantic |
|-------------|----------------------------|
| `Decimal` | `float(value)` |
| `UUID` | `str(value)` |
| `round(Decimal)` | `float(round(value))` |
| `datetime` | `.isoformat()` si non géré automatiquement |

---

## Logging

```python
# ❌ PII dans les logs
logger.info(f"User {user.email} created contact {contact.name}")

# ✅ IDs uniquement
logger.info("Contact created", extra={"user_id": user.id, "contact_id": contact.id})
```

---

## Tests — Patching

Patcher au **module source**, pas au module qui importe :

```python
# ❌ Patch où c'est importé
@patch("app.services.my_service.send_email")

# ✅ Patch à la source
@patch("app.adapters.email.send_email")
```

---

## SQL — Pas de fonctions dialecte-spécifiques

| Fonction | SQLite | PostgreSQL | Alternative portable |
|----------|--------|-----------|---------------------|
| `func.strftime()` | ✅ | ❌ | Python `.strftime()` |
| `func.group_concat()` | ✅ | ❌ | `func.string_agg()` (PG) |
| `func.to_char()` | ❌ | ✅ | Python `.strftime()` |

**Règle** : Si prod = PostgreSQL, calculer en Python depuis les données déjà récupérées.

---

## SQLAlchemy — Pièges courants

```python
# ❌ String literal pour server_default
id = Column(UUID, server_default="gen_random_uuid()")

# ✅ Fonction SQLAlchemy
id = Column(UUID, server_default=func.gen_random_uuid())

# ❌ Mutable default
data = Column(JSONB, default=[])

# ✅ Server default immuable
data = Column(JSONB, server_default="[]")
```
