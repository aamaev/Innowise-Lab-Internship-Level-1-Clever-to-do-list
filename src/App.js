import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Account from './components/Account';
import CreateTask from './components/CreateTask';
import TodoInfo from './components/TodoInfo';

const App = () => { 
    return (
       <Routes>
           <Route path='/' 
                  element={<AuthPage/>} />
           <Route path='/signup' 
                  element={<AuthPage/>} />   
           <Route path='/signin' 
                  element={<AuthPage/>} />      
           <Route path='/account' 
                  element={<Account/>} />
           <Route path='/createtask' 
                  element={<CreateTask/>} />
           <Route path='/todoinfo' 
                  element={<TodoInfo/>} />
       </Routes>
    )  
}

export default App;
