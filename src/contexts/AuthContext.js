import React, { useState, createContext, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import toast, {Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase';

export const AuthContext = createContext();

const AuthContextProvider = props => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [initializing, setInitializing] = useState(true);
   
    useEffect(() => {
        const subscriber = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (initializing) {
                setInitializing(false)
            }
        });
        return subscriber; 
    }, [user, initializing]);

    if (initializing) {
        return null
    }
    
    const signIn = async (auth, email, password) => {
        const passwordInput = document.querySelector('.password-input');
        const emailInput = document.querySelector('.email-input');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            toast.success(`${userCredential.user.email}, welcome!`);
            navigate('/account');
        } catch {
            toast.error("Check your login and password");
            passwordInput.style = 'border-color: red';
            emailInput.style = 'border-color: red';
            navigate('/signin');
        }
    }
    
    const signUp = async (auth, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            toast.success(`${userCredential.user.email}, welcome!`);
            navigate('/account')
        } catch {
            toast.error("Retry, something wrong..")
            navigate('/signup'); 
        }
    }

    const logOut = () => {
        signOut(auth);
        navigate("/signin");
    };

    return (
        <AuthContext.Provider value={{user, signIn, signUp, logOut}}>
            <Toaster />
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;








