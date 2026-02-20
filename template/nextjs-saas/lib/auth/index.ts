/**
 * ─── Changer d'implémentation auth ───────────────────────────────────────────
 *
 * Modifier uniquement cet import pour swapper l'auth provider :
 *
 *   Firebase   → import { firebaseAuthAdapter as adapter } from "./firebase";
 *   Supabase   → import { supabaseAuthAdapter as adapter } from "./supabase";
 *   Custom JWT → créer lib/auth/jwt.ts et importer ici
 *
 * Le reste du code (api.ts, AuthContext, composants) ne change pas.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { firebaseAuthAdapter as adapter } from "./firebase";

export { adapter as authAdapter };
