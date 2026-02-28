# Règles de Sécurité Universelles

> Règles applicables à tout projet web/API.
> Sources : OWASP Top 10 2025, OWASP Agentic Top 10 2026, MCP Security Best Practices.

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

## S10 : CORS — configuration restrictive obligatoire

Ne jamais utiliser `allow_origins=["*"]` avec `allow_credentials=True`.
Toujours lister les origines autorisées explicitement.

---

## S11 : CSRF — protection sur les mutations

- FastAPI : utiliser bearer tokens (JWT) dans le header `Authorization` plutôt que des cookies de session
- Si cookies utilisés : ajouter un CSRF token (`fastapi-csrf-protect` ou custom)
- Next.js : vérifier l'origin des requêtes dans les Server Actions

---

## S12 : Input validation — Pydantic strict en entrée

Valider toutes les entrées avec des modèles Pydantic stricts (`EmailStr`, `Field(min_length, max_length)`, `conint`, `constr`).
Ne jamais accepter de `dict` brut comme paramètre d'endpoint.

---

## S13 : Password hashing — bcrypt ou Argon2 uniquement

Jamais MD5, SHA-1, SHA-256 seuls pour les mots de passe. Utiliser passlib avec bcrypt ou argon2.

---

## S14 : Supply chain — audit des dépendances

- `npm audit` / `pip audit` avant chaque release
- Dependabot ou Snyk activé sur le repo
- Épingler les versions majeures dans `package.json` / `pyproject.toml`

---

## S15 : Deserialization — jamais pickle sur des données non fiables

`pickle.loads()`, `yaml.load()` (sans SafeLoader), `eval()` sont interdits sur des données utilisateur. Utiliser `json.loads()` ou `yaml.safe_load()`.

---

## S16 : Content-Security-Policy header

Ajouter aux security headers (S3) un CSP adapté au projet.
Minimum : `default-src 'self'`

---

## S17 : Error handling élargi (OWASP A10:2025)

Au-delà de S2, vérifier que :
- Les exceptions ne sont jamais ignorées silencieusement (pas de `except: pass` sur des erreurs critiques)
- Les opérations partiellement complétées sont rollback
- Les erreurs de parsing/validation remontent clairement (pas de fail-open)

---

## S18 : Next.js — Server Components et données sensibles

- Ne jamais passer de secrets, tokens, ou données sensibles dans les props des Client Components
- Utiliser les Server Actions pour les mutations
- Vérifier l'authentification dans chaque Server Action, pas uniquement dans le middleware

---

## S19 : Next.js — Middleware non fiable pour l'auth

- Le header `x-middleware-subrequest` est forgeable (CVE-2025-29927)
- Toujours re-vérifier l'auth dans les API routes et Server Actions
- Mettre à jour Next.js régulièrement (CVE-2025-55182 : RCE via Server Components)

---

# Sécurité Agentic AI & MCP (OWASP Agentic Top 10 2026)

> Règles obligatoires lors du développement d'applications utilisant des agents IA, des LLM, ou le Model Context Protocol.

---

## AG1 : Agent Goal Hijack — tout output d'agent est non fiable

- Ne jamais exécuter directement le résultat d'un agent sans validation
- Valider les outputs avec la même rigueur que les inputs utilisateur
- Séparer les instructions système des données utilisateur dans les prompts
- Guardrails sur les actions critiques (suppression, paiement, envoi de messages)

---

## AG2 : Tool Misuse — moindre privilège sur les outils

- Chaque agent/outil ne reçoit que les permissions minimales nécessaires
- Jamais de `allowed-tools: *` en production
- Lister explicitement les outils autorisés par agent/skill
- Valider les paramètres des appels d'outils avant exécution (schéma JSON strict)

---

## AG3 : Identity & Privilege — pas de credentials partagés entre agents

- Chaque agent utilise ses propres credentials, jamais de token hérité ou partagé
- Token pass-through interdit : ne jamais passer un access token client directement à une API tierce via MCP
- Scopes OAuth granulaires par agent
- Rotation régulière des tokens d'agents

---

## AG4 : Agentic Supply Chain — vérifier les outils MCP

- Ne jamais installer un serveur MCP non vérifié
- Vérifier les descriptions d'outils MCP (risque de tool poisoning : instructions cachées dans les descriptions)
- Utiliser des MCP servers signés et auditables
- Maintenir un inventaire centralisé des serveurs MCP déployés
- SAST + SCA obligatoires sur les serveurs MCP custom

---

## AG5 : Code Execution — sandbox obligatoire

- `eval()`, `exec()` interdits sur du contenu provenant d'un LLM
- Si exécution de code nécessaire : sandbox isolé (container, gVisor, SELinux)
- Bloquer les écritures fichier hors du workspace
- Network egress controls : bloquer les connexions sortantes non autorisées

---

## AG6 : Memory & Context Poisoning — protéger la mémoire persistante

- Valider et sanitiser les données avant de les persister dans la mémoire d'un agent (RAG, vector store)
- Ne jamais laisser un agent modifier ses propres instructions système
- Versionner les contextes persistants pour pouvoir rollback
- Détecter les tentatives d'injection dans les données de contexte

---

## AG7 : Prompt Injection Detection — défense en profondeur

- Détection de prompt injection sur les inputs utilisateur ET les données externes (API, fichiers, emails)
- Ne jamais concaténer directement des données externes dans un prompt système
- Utiliser des délimiteurs clairs entre instructions et données
- Logger les tentatives de prompt injection détectées

---

## AG8 : MCP Authentication — OAuth 2.1 obligatoire

- Authentification MCP via OAuth 2.1, jamais de session IDs
- Resource Indicators (RFC 8707) pour scoper les tokens par serveur MCP
- Dynamic Client Registration (RFC 7591) avec validation
- Pas de secrets MCP dans le code : variables d'environnement ou secret manager

---

## AG9 : MCP Server Isolation — sandboxing obligatoire

- Les serveurs MCP tournent dans des containers isolés
- Pour les données sensibles : gVisor, Kata Containers, ou SELinux en complément
- Bloquer l'accès réseau sortant sauf les endpoints nécessaires
- Bloquer les écritures aux fichiers de configuration (anti-persistence)

---

## AG10 : Agent Audit Trail — tout logger

- Logger toutes les actions d'agents : appels d'outils, prompts, décisions, résultats
- Traçabilité end-to-end avec OpenTelemetry (correlation IDs entre agents)
- Conserver les logs pour investigation post-incident
- Alerter sur les patterns anormaux (volume d'appels, outils inhabituels, erreurs répétées)

---

## Checklist pré-PR

### Web / API
- [ ] Aucune comparaison de secret avec `==` / `!=`
- [ ] Aucun `detail=str(e)` dans les HTTPException
- [ ] Aucune injection SQL via f-string
- [ ] Rate limiting sur les endpoints auth/publics
- [ ] Secrets hors git
- [ ] CORS restrictif (pas de `*` avec credentials)
- [ ] Input validation Pydantic sur tous les endpoints
- [ ] Password hashing bcrypt/Argon2
- [ ] CSP header configuré

### Agentic AI / MCP
- [ ] Outputs d'agents validés avant exécution
- [ ] Moindre privilège sur les outils
- [ ] Pas de token pass-through
- [ ] MCP servers vérifiés et signés
- [ ] Audit trail sur les actions d'agents
