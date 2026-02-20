/**
 * Auth interface — swap the implementation without touching the rest du code.
 *
 * Implémentations disponibles :
 *   - lib/auth/firebase.ts  (Firebase Authentication)
 *   - lib/auth/supabase.ts  (Supabase Auth) — à compléter
 *   - lib/auth/nextauth.ts  (NextAuth.js)   — à compléter
 *
 * Changer d'implémentation : modifier l'import dans lib/auth/index.ts
 */

export interface AuthUser {
  id:          string;
  email:       string | null;
  displayName: string | null;
  photoURL?:   string | null;
}

export interface AuthAdapter {
  /** Récupère le token Bearer à injecter dans les requêtes API */
  getToken(): Promise<string | undefined>;

  /** Utilisateur actuellement connecté (null si non authentifié) */
  getCurrentUser(): AuthUser | null;

  /** Connexion email/password */
  signIn(email: string, password: string): Promise<void>;

  /** Connexion OAuth (Google, GitHub, etc.) */
  signInWithProvider?(provider: string): Promise<void>;

  /** Déconnexion */
  signOut(): Promise<void>;

  /** Écouter les changements d'état d'authentification */
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void;
}
