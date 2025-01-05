import React, { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut } from 'firebase/auth';
import auth from '../../Firebaseinit/Firebase.init';
import { toast } from 'react-toastify';
import axios from 'axios';
  
export const AuthContext = createContext();
  
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        // console.log('Signed in',currentUser);
        if(currentUser?.email){
            const user={email:currentUser.email};
            axios.post('https://task-hub-server-side.vercel.app/jwt',user,{withCredentials:true})
            .then(res=>{
                
                console.log('logged in',res.data)});
                setLoading(false);
        }
        else{
            axios.post('https://task-hub-server-side.vercel.app/logout',{},{withCredentials:true})
            .then(res=>{
                console.log('logged out',res.data)});
                setLoading(false);
        }

        
    });
    return unsubscribe;
    }, []);



  
  
  // Authentication functions
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

//   google login
const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try{
        await signInWithPopup(auth, provider)
        toast.success('Logged in successfully!');
    } catch (error) {
        toast.error(`Google Login Error: ${error.message}`);
    }
}

// email password login

const emailPasswordLogin = async (email, password ) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Logged in successfully!');
    } catch (error) {
        toast.error(`Login Error: ${error.message}`);
    }
}

// logout 
const logout = async () => {
    try{
        await signOut(auth);
        // toast.info('Logged out successfully!');
    }
    catch (error) {
        toast.error(`Logout Error: ${error.message}`);
      }

}

  return (
    <AuthContext.Provider value={{ user, register, loading, googleLogin, emailPasswordLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
