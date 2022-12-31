import {React, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import toast, {Toaster} from 'react-hot-toast';


function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const SignIn = (e) => {
        e.preventDefault();
        const passwordInput = document.querySelector('.password-input');
        const emailInput = document.querySelector('.email-input');

        signInWithEmailAndPassword (auth, email, password)
            .then(() => {
                toast.success("Successful authentication");
                setTimeout(() => {
                    navigate('/account');
                }, 500);
            })
            .catch(() => {
                toast.error("Check your login and password");
                passwordInput.style = 'border-color: red';
                emailInput.style = 'border-color: red';
                navigate('/signin'); 
            });
    }

    return (
        <div className="m-auto max-w-xl pt-20">
            <Toaster/>
            <div>
                <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
                <p>
                    Don't have an account yet? <Link to='/signup' className='underline'>Sign up</Link>
                </p>
            </div>
            <form onSubmit={SignIn}>
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
    )
}

export default SignIn;