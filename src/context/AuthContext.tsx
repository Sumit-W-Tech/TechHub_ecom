import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin";
  status: "active" | "blocked" | "pending";
  joinedAt: string;
  avatar?: string;
}

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (name: string, email: string, password: string, role: "buyer" | "seller") => Promise<string | null>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (supaUser: SupabaseUser) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", supaUser.id)
      .maybeSingle();

    if (data) {
      setUser({
        id: supaUser.id,
        name: data.name,
        email: data.email,
        role: data.role as AppUser["role"],
        status: "active",
        joinedAt: data.created_at,
        avatar: data.avatar_url || undefined,
      });
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        await fetchProfile(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);


const login = async (email: string, password: string): Promise<string | null> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      return data.message || "Login failed";
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return null;
  } catch (error) {
    return "Server error";
  }
};


  const signup = async (name: string, email: string, password: string, role: "buyer" | "seller"): Promise<string | null> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) return error.message;

    // Update profile role
    if (data.user) {
      await supabase.from("profiles").update({ role, name }).eq("user_id", data.user.id);
    }
    return null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, login, signup, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
