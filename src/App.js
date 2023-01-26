import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Account from './components/Account';
import CreateTask from './components/CreateTask';
import TodoInfo from './components/TodoInfo';
import { SIGN_IN, SIGN_UP } from './constants/constants';

const App = () => { 
    return (
       <Routes>
           <Route path='/' 
                  element={<AuthPage/>} />
           <Route path='/signup' 
                  element={<AuthPage type={SIGN_UP}/>} />   
           <Route path='/signin' 
                  element={<AuthPage type={SIGN_IN}/>} />      
           <Route path='/account' 
                  element={<Account/>} />
           <Route path='/createtask' 
                  element={<CreateTask/>} />
           <Route path='/updatetask/:todoID' 
                  element={<CreateTask/>} />
           <Route path='/todoinfo/:todoID' 
                  element={<TodoInfo/>} />
       </Routes>
    )  
}

export default App;
