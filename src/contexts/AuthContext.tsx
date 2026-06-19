"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { UserProfile } from "@/types";
import {
  getUserProfile,
  ensureUserProfileFromAuthUser,
  profileFromAuthUser,
} from "@/lib/firestore";
import { mockGetSession, mockSignOut } from "@/lib/mockAuth";
import { mergeSubscriptionIntoProfile } from "@/lib/subscriptionCache";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  /** Pass `uid` right after sign-in while React `user` may not have updated yet. */
  refreshProfile: (uid?: string) => Promise<void>;
  setMockProfile: (p: UserProfile | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async (_uid?: string) => {},
  setMockProfile: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const configured = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async (uid?: string) => {
    if (!configured) return;
    const id = uid ?? user?.id;
    if (!id) return;
    try {
      const p = await getUserProfile(id);
      if (p) setProfile(mergeSubscriptionIntoProfile(p));
    } catch {
      // Keep the current profile on transient database errors.
    }
  };

  const setMockProfile = (p: UserProfile | null) => setProfile(p);

  useEffect(() => {
    if (!configured) {
      const session = mockGetSession();
      setProfile(session ? mergeSubscriptionIntoProfile(session) : null);
      setUser(null);
      setLoading(false);
      return;
    }

    const supabase = createClient();
    let cancelled = false;

    const applyUser = (authUser: User | null) => {
      setUser(authUser);
      if (authUser) {
        const base = mergeSubscriptionIntoProfile(profileFromAuthUser(authUser));
        setProfile(base);
        void ensureUserProfileFromAuthUser(authUser);
        void getUserProfile(authUser.id).then((p) => {
          if (!cancelled && p) setProfile(mergeSubscriptionIntoProfile(p));
        });
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (!cancelled) applyUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) applyUser(session?.user ?? null);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [configured]);

  const signOut = async () => {
    if (configured) {
      const supabase = createClient();
      await supabase.auth.signOut();
    } else {
      mockSignOut();
    }
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile, setMockProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
