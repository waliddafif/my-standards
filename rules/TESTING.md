# Conventions Tests Universelles

---

## Règle T1 : Base de données réelle dans les tests

Si prod = PostgreSQL, utiliser PostgreSQL dans les tests (testcontainers ou DB de test dédiée).

**Pourquoi SQLite masque des bugs réels :**
- Ignore les FK constraints
- Accepte les types laxistes (str au lieu de UUID)
- `func.strftime()` marche sur SQLite, crash sur PostgreSQL
- ENUM non validés

```bash
# ✅ PostgreSQL via testcontainers (Python)
pip install testcontainers[postgresql]

# ✅ PostgreSQL via Docker Compose (CI)
services:
  postgres:
    image: postgres:16
    env:
      POSTGRES_DB: test_db
```

---

## Règle T2 : `npm run build` obligatoire en CI

Le mode dev cache des erreurs que le build production révèle (routes dynamiques, SSR, exports statiques).

```yaml
# .github/workflows/frontend.yml
- run: npm run build  # OBLIGATOIRE, pas uniquement les tests
```

---

## Règle T3 : Git hooks automatiques

```bash
# Pre-commit : lint + format
# Pre-push : tests unitaires + build

# Python (pre-commit framework)
pip install pre-commit
# Node (Husky)
npm install --save-dev husky
```

---

## Règle T4 : Un test d'intégration par code path DB

Tout `select()`, `insert()`, ou accès à `.field` sur un modèle doit avoir au minimum un test avec une vraie session DB.

```python
# ✅ Test avec vraie DB
@pytest.mark.asyncio
async def test_create_contact(db_session, test_tenant):
    contact = Contact(tenant_id=test_tenant.id, name="Test")
    db_session.add(contact)
    await db_session.commit()

    result = await contact_service.get(db_session, str(test_tenant.id), str(contact.id))
    assert result is not None
```

---

## Conventions de nommage

```python
# Backend (pytest)
def test_<action>_<scenario>_<expected>():
    def test_create_contact_success(): ...
    def test_create_contact_duplicate_raises(): ...
    def test_get_contact_not_found_returns_none(): ...
```

```typescript
// Frontend (Vitest/Jest)
test('<action> <expected>', () => { ... })
test('renders button with correct label', () => { ... })
test('calls onClick when clicked', () => { ... })
```

---

## Structure recommandée

```
tests/
├── conftest.py          # Fixtures partagées (DB session, tenant de test)
├── unit/                # Tests isolés, pas d'I/O
├── integration/         # Tests avec DB/services externes
└── e2e/                 # Tests end-to-end

# Frontend
tests/                   # Vitest (composants, hooks, utils)
e2e/
├── pages/               # Page Object Model
├── journeys/            # User journeys
└── fixtures/            # Auth fixtures
```

---

## Test Data Factories

```python
# ✅ Factory function pour des données de test cohérentes
def make_contact(**overrides) -> dict:
    defaults = {
        "name": "Jean Dupont",
        "email": "jean@example.com",
        "tenant_id": str(uuid4()),
    }
    return {**defaults, **overrides}
```

---

## Checklist pré-PR

- [ ] Tests avec vraie DB (pas uniquement mocks)
- [ ] `npm run build` passe localement
- [ ] Nouveaux endpoints ont des tests de sécurité (rate limiting, auth)
- [ ] Pas de `print()` ou `console.log()` de debug laissés
