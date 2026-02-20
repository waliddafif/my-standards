/**
 * Supabase Auth adapter — à compléter si tu utilises Supabase.
 *
 * Installation : npm install @supabase/supabase-js
 *
 * import { createClient } from "@supabase/supabase-js";
 * const supabase = createClient(url, anonKey);
 */

import type { AuthAdapter } from "../auth";

export const supabaseAuthAdapter: AuthAdapter = {
  async getToken() {
    // const { data } = await supabase.auth.getSession();
    // return data.session?.access_token;
    throw new Error("Supabase adapter non configuré — voir lib/auth/supabase.ts");
  },

  getCurrentUser() {
    // const { data } = await supabase.auth.getUser();
    // return data.user ? { id: data.user.id, email: data.user.email, displayName: null } : null;
    throw new Error("Supabase adapter non configuré — voir lib/auth/supabase.ts");
  },

  async signIn(email, password) {
    // const { error } = await supabase.auth.signInWithPassword({ email, password });
    // if (error) throw error;
    throw new Error("Supabase adapter non configuré — voir lib/auth/supabase.ts");
  },

  async signOut() {
    // await supabase.auth.signOut();
    throw new Error("Supabase adapter non configuré — voir lib/auth/supabase.ts");
  },

  onAuthStateChanged(callback) {
    // const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    //   const user = session?.user;
    //   callback(user ? { id: user.id, email: user.email ?? null, displayName: null } : null);
    // });
    // return () => data.subscription.unsubscribe();
    callback(null);
    return () => {};
  },
};
