import {React, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import toast, {Toaster} from 'react-hot-toast';

function SignUp(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const SignUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                toast.success("Successful");
                navigate('/account')
            })
            .catch((error) => {
                toast.error("Retry, something wrong..")
            });
    }

    return (
        <div className="m-auto max-w-xl pt-20">
            <Toaster/>
            <div>
                <h1 className='text-2xl font-bold py-2'>Sign up</h1>
                <p>
                    Already have an account yet? <Link to='/signIn' className='underline'>Sign in</Link>
                </p>
            </div>
            <form onSubmit={SignUp}>
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
                       onChange={(e) => setPassword(e.target.value)}/>    
            </div>
            <button className="border bg-indigo-500 h-12 w-20">Sign up</button>
            </form>
        </div>
    )
}

export default SignUp;