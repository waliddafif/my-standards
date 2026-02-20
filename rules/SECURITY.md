# Règles de Sécurité Universelles

> Règles applicables à tout projet web/API. Extraites de l'audit OWASP pré-production.

---

## S1 : Comparaison de secrets — timing-safe uniquement

```python
# ❌ INTERDIT — vulnérable aux timing attacks
if user_token != expected_token:

# ✅ OBLIGATOIRE
import hmac
if not hmac.compare_digest(user_token, expected_token):
```

Concerne : API keys, tokens, HMAC signatures, tout secret comparé côté serveur.

---

## S2 : Messages d'erreur — jamais `str(e)`

```python
# ❌ INTERDIT — fuite d'info interne (chemins, tables, URLs, stack trace)
raise HTTPException(status_code=500, detail=f"Failed: {e}")
raise HTTPException(status_code=400, detail=str(e))

# ✅ OBLIGATOIRE — message générique + log serveur
except Exception as e:
    logger.error("Operation failed", extra={"error": str(e)}, exc_info=True)
    raise HTTPException(status_code=500, detail="Internal error")
```

---

## S3 : Security headers obligatoires

À ajouter via middleware sur tout backend :

| Header | Valeur |
|--------|--------|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` (prod uniquement) |

---

## S4 : SQL — requêtes paramétrées uniquement

```python
# ❌ INTERDIT — SQL injection
await db.execute(text(f"SELECT * FROM users WHERE id = {user_id}"))

# ✅ OBLIGATOIRE
await db.execute(text("SELECT * FROM users WHERE id = :id"), {"id": user_id})
```

---

## S5 : Rate limiting sur les endpoints auth/publics

Tout endpoint qui accepte un secret (token, code, mot de passe) doit être rate-limité.

Cas typiques : login, reset password, verify OTP, magic link, invitation token.

Pattern recommandé : clé `rl:{action}:{identifier}` avec TTL en base ou Redis.

---

## S6 : Validation MIME — magic bytes obligatoires

```python
import magic

# ❌ INSUFFISANT — extension spoofable
mime = {"pdf": "application/pdf"}.get(filename.split(".")[-1])

# ✅ RECOMMANDÉ — contenu réel du fichier
detected = magic.from_buffer(file_bytes[:2048], mime=True)
```

---

## S7 : Fail-closed en production

```python
# ❌ INTERDIT — bypass silencieux
if not api_key:
    return {"status": "clean"}  # Fail-open !

# ✅ CORRECT
if not api_key:
    if env == "production":
        raise HTTPException(503, "Service unavailable")
    return {"status": "clean"}  # Dev uniquement
```

---

## S8 : Secrets — jamais dans git

- Utiliser `.env` (dans `.gitignore`) + `.env.example` avec valeurs mock
- GCP Secret Manager : toujours `echo -n` (sans `\n` final)
- Si secret commité par erreur : retirer + rotation immédiate côté provider

---

## S9 : Audit trail sur les téléchargements

Tout endpoint générant une URL signée de download doit enregistrer :
`action=DOWNLOAD, resource_type, resource_id, user_id, timestamp`

---

## Checklist pré-PR

- [ ] Aucune comparaison de secret avec `==` / `!=`
- [ ] Aucun `detail=str(e)` dans les HTTPException
- [ ] Aucune injection SQL via f-string
- [ ] Rate limiting sur les endpoints auth/publics
- [ ] Secrets hors git
