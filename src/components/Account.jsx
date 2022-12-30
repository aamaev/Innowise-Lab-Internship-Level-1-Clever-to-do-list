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
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [date, setDate] = useState('');

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    });

    if (initializing) return null;

    if (!user) {
        <Navigate to='/'/>
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
        <div className="m-auto max-w-xl">
            <div className="flex justify-between py-10">
                <div className="text-2xl font-bold">hello, {user.email}</div>
                <button className="rounded border border-indigo-600 bg-indigo-400 h-8 w-16 self-center"
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
}

export default Account;