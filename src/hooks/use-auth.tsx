
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<any>;
  registerWithEmail: (email: string, pass: string) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  loginWithFacebook: () => Promise<any>;
  logout: () => Promise<any>;
  AuthProvider: ({ children }: { children: ReactNode }) => JSX.Element;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Define a default context value for server-side rendering or when no provider is in the tree
    const defaultContext: AuthContextType = {
        user: null,
        loading: true,
        loginWithEmail: async () => {},
        registerWithEmail: async () => {},
        loginWithGoogle: async () => {},
        loginWithFacebook: async () => {},
        logout: async () => {},
        AuthProvider: ({ children }) => <>{children}</>,
    };
    
    defaultContext.AuthProvider = ({ children }: { children: ReactNode }) => {
        return (
          <AuthContext.Provider value={useAuthProvider()}>
            {children}
          </AuthContext.Provider>
        );
      };
      return defaultContext;
  }
  return context;
}


function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithEmail = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const registerWithEmail = (email: string, pass: string) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  
  const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const AuthProvider = ({ children }: { children: ReactNode }) => {
    return (
      <AuthContext.Provider
        value={{
          user,
          loading,
          loginWithEmail,
          registerWithEmail,
          loginWithGoogle,
          loginWithFacebook,
          logout,
          AuthProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  return {
    user,
    loading,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    AuthProvider,
  };
}
