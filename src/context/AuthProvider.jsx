import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { email, displayName } = currentUser;
        setUser({ email, displayName });
      } else setUser(false);

      setLoad(true);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {load && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
