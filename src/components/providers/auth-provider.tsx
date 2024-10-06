import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential,
  User
} from "firebase/auth";

import appFirebaseConfig from "@/firebase.config";

interface AuthContextProps {
  isLoading: boolean;
  user: User | null;
  createAccount: (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  loginWithEmailPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  logout: () => Promise<void>;
  updateProfileUser: ({
    name,
    photoURL
  }: {
    name: string;
    photoURL?: string;
  }) => Promise<void>;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

interface AuthProviderProps {
  children: React.ReactNode;
}

const auth = getAuth(appFirebaseConfig);

export function AuthProvider({ children }: AuthProviderProps) {
  const [googleProvider] = useState(new GoogleAuthProvider());
  const [user, setUser] = useState<User | null>(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // create an account with email and password
  const createAccount = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login with email and password
  const loginWithEmailPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign in with google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // logout
  const logout = () => {
    return signOut(auth);
  };

  // update profile
  const updateProfileUser = async ({
    name,
    photoURL
  }: {
    name: string;
    photoURL?: string;
  }) => {
    if (!auth.currentUser) return Promise.reject("User not found");
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL
    }).then(() => {
      setUser(
        (currentUser) =>
          ({ ...currentUser, displayName: name, photoURL } as User)
      );
    });
  };

  //   check signed in user
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo: AuthContextProps = {
    user,
    isLoading: loading,
    isOpenModal,
    setIsOpenModal,
    createAccount,
    signInWithGoogle,
    loginWithEmailPassword,
    logout,
    updateProfileUser
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
