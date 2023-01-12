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

    return (
        pathname === '/signin' ? 
        <div className="m-auto max-w-xl pt-20">
            <div>
                <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
                <p>
                    Don't have an account yet? <Link to='/signup' className='underline'>Sign up</Link>
                </p>
            </div>
            <form onSubmit={signInForm}>
                <div className="flex flex-col py-5">
                    <label>Email</label>
                    <input className="border p-2 focus:outline-none email-input" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />     
                </div>
                <div className="flex flex-col py-5">
                    <label>Password</label>
                    <input className="border p-2 focus:outline-none password-input" 
                        type="password"
                        value={password}
                        autoComplete='on'
                        onChange={(e) => setPassword(e.target.value)}
                        />    
                </div>
                <button className="rounded border border-orange-200 bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:bg-orange-300">Sign in</button>
            </form>
        </div>   
        :
        <div className="m-auto max-w-xl pt-20">
            <div>
                <h1 className='text-2xl font-bold py-2'>Sign up</h1>
                <p>
                    Already have an account yet? <Link to='/signin' className='underline'>Sign in</Link>
                </p>
            </div>
            <form onSubmit={signUpForm}>
                <div className="flex flex-col py-5">
                    <label>Email</label>
                    <input className="border p-2 focus:outline-none" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />     
                </div>
                <div className="flex flex-col py-5 focus:outline-none">
                    <label>Password</label>
                    <input className="border p-2" 
                        type="password" 
                        value={password} 
                        autoComplete='on'
                        onChange={(e) => setPassword(e.target.value)}/>    
                </div>
                <button className="rounded border border-orange-200 bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:bg-orange-300">Sign up</button>
            </form>
        </div>
    )
};

export default AuthPage;