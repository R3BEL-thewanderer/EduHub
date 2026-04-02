import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { User } from '@/types';
import type { Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
  updateSubscription: (subscription: User['subscription']) => void;
  // Real Supabase auth methods
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  initialize: () => void;
}

function mapSupabaseUser(supaUser: any): User {
  return {
    id: supaUser.id,
    email: supaUser.email || '',
    displayName:
      supaUser.user_metadata?.full_name ||
      supaUser.user_metadata?.name ||
      supaUser.email?.split('@')[0] || '',
    photoURL: supaUser.user_metadata?.avatar_url || null,
    college: '',
    subscription: {
      isPaid: false,
      plan: null,
      expiresAt: null,
    },
  };
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({
    user,
    isAuthenticated: !!user,
    isLoading: false,
  }),

  setSession: (session) => set({ session }),

  setLoading: (loading) => set({ isLoading: loading }),

  clearUser: () => set({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: false,
  }),

  updateSubscription: (subscription) => set((state) => ({
    user: state.user ? { ...state.user, subscription } : null,
  })),

  // ──────────────────────────────────────
  // REAL SUPABASE AUTH
  // ──────────────────────────────────────

  signUp: async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) return { error: error.message };

    if (data.user) {
      set({
        user: mapSupabaseUser(data.user),
        session: data.session,
        isAuthenticated: !!data.session,
        isLoading: false,
      });
    }

    return { error: null };
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error: error.message };

    if (data.user) {
      set({
        user: mapSupabaseUser(data.user),
        session: data.session,
        isAuthenticated: true,
        isLoading: false,
      });
    }

    return { error: null };
  },

  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) return { error: error.message };
    return { error: null };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  // Listen for auth state changes (called once on app load)
  initialize: () => {
    try {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          set({
            user: mapSupabaseUser(session.user),
            session,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
        }
      }).catch(() => {
        set({ isLoading: false });
      });

      // Listen for changes (login, logout, token refresh)
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          set({
            user: mapSupabaseUser(session.user),
            session,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      });
    } catch (e) {
      console.error('Auth initialization error:', e);
      set({ isLoading: false });
    }
  },
}));
