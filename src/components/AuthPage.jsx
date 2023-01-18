import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { pathname } = useLocation();
    const {signIn, signUp} = useContext(AuthContext);

    const signInForm = (e) => {
        e.preventDefault();
        signIn(auth, email, password);
    }

    const signUpForm = (e) => {
        e.preventDefault();
        signUp(auth, email, password);
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);    
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);    
    }

    const signHandler = (e) => {
        if (pathname === '/signin') {
            return signInForm(e);
        } else {
            return signUpForm(e);
        }     
    }

    return (
        <div className="m-auto max-w-xl pt-20">
            <div>
                {pathname === '/signin' ? 
                    (<>
                        <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
                        <p>Don't have an account yet? <Link to='/signup' className='underline'>Sign up</Link></p>
                    </>)
                    : 
                    (<>
                        <h1 className='text-2xl font-bold py-2'>Sign up</h1>
                        <p>Already have an account yet? <Link to='/signin' className='underline'>Sign in</Link></p>
                    </>)
                }
            </div>
            <form onSubmit={signHandler}>
                <div className="flex flex-col py-5">
                    <label>Email</label>
                    <input className="border p-2 focus:outline-none email-input" 
                        type="email"
                        value={email}
                        onChange={emailHandler}
                    />     
                </div>
                <div className="flex flex-col py-5">
                    <label>Password</label>
                    <input className="border p-2 focus:outline-none password-input" 
                        type="password"
                        value={password}
                        autoComplete='on'
                        onChange={passwordHandler}
                    />    
                </div>
                <button className="rounded border border-orange-200 bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:bg-orange-300"> { pathname === '/signin' ? <p>Sign in</p> : <p>Sign up</p> } </button>
            </form>
        </div>   
    )
};

export default AuthPage;