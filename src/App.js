import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Account from './components/Account';
import CreateTask from './components/CreateTask';

function App() { 
    return (
        <Routes>
            <Route path='/' 
                   element={<SignIn/>} />
            <Route path='/signUp' 
                   element={<SignUp/>} />
            <Route path='/signIn' 
                   element={<SignIn/>} />
            <Route path='/account' 
                   element={<Account/>} />
            <Route path='/createtask' 
                   element={<CreateTask/>} />
        </Routes>
    )  
}

export default App;
