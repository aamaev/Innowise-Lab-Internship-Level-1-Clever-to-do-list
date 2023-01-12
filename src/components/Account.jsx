import React, { useState, useContext } from "react";
import Calendar from "./Calendar";
import CreateTodo from "./CreateTodo";
import ShowTodo from "./ShowTodo";
import Data from "../contexts/DataContext";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Account = () => {
    const {user, logOut} = useContext(AuthContext);
    const [date, setDate] = useState('');

    if (!user) {
        return <Navigate replace to='/signin' />
    }

    const dateSetter = (currentDate) => {
        setDate(currentDate);
    }
    
    return (
        user ?
        <div className="m-auto max-w-xl">
            <div className="flex justify-between py-10">
                <div className="text-2xl font-bold self-center">hello, {user.email}</div>
                <button className="rounded border border-orange-200 bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:bg-orange-300"
                    onClick={logOut}>
                Logout</button>
            </div>
            <Data.Provider value={ {date, dateSetter} }>
                <Calendar /> 
                <ShowTodo /> 
            </Data.Provider>   
            <CreateTodo/>
        </div>
        :
        <div className="text-xl font-bold">something wrong..</div>
    )
}

export default Account;