
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

  return {
    user,
    loading,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginWithFacebook,
    logout,
  };
}


const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthProvider();
  return (
    <AuthContext.Provider
      value={{ ...auth, AuthProvider: ({children}) => <>{children}</> }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // This is a dummy AuthProvider that will be used when `useAuth` is called
  // outside of a real AuthProvider. This is useful for storybook or other
  // scenarios where you don't want to wrap your component in an AuthProvider.
  const AuthProviderWrapper = ({ children }: { children: ReactNode }) => {
    return (
      <AuthProvider>
        {children}
      </AuthProvider>
    );
  };


  return { ...context, AuthProvider: AuthProviderWrapper };
}
