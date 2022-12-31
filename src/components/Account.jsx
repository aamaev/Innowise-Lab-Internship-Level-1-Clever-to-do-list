import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import Calendar from "./Calendar";
import CreateTodo from "./CreateTodo";
import ShowTodo from "./ShowTodo";
import Data from "./DataContext";
import { signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore'

function Account(){
    const [initializing, setInitializing] = useState('true');
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [date, setDate] = useState('');

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; 
    });

    if (initializing) return null;

    if (!user) {
        return <Navigate replace to='/' />
    }

    const dateSetter = (currentDate) => setDate(currentDate);

    const currentDateValue = {
        date,
        dateSetter
    };

    const logout = () => {
        signOut(auth);
        navigate("/signIn");
    }

    return (
       (user &&
        <div className="m-auto max-w-xl">
            <div className="flex justify-between py-10">
                <div className="text-2xl font-bold self-center">hello, {user.email}</div>
                <button className="rounded border border-orange-200 bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:bg-orange-300"
                    onClick={logout}>
                Logout</button>
            </div>
            <Data.Provider value={currentDateValue}>
                <Calendar /> 
                <ShowTodo /> 
            </Data.Provider>   
            <CreateTodo/>
        </div>
        )
    )
}

export default Account;