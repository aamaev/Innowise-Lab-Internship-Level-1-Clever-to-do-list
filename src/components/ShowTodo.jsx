import React, { useEffect, useState, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { ref, onValue} from "firebase/database";
import { db } from '../firebase';
import TodoItem from "./Todoitem";
import uuid from "react-uuid";
import Data from "./DataContext";


function ShowTodo(){
    const [user] = useAuthState(auth);
    const [data, setData] = useState('');
    const value = useContext(Data);

    useEffect(() => {
        onValue(ref(db, 'users/' + user.uid), (snapshot) => {
            const data = snapshot.val();
            setData(data);
        }); 
    }, [user.uid]);

    if (data) {
        const keys = Object.keys(data);
        return (
            <div>
                {keys.map((key) => (
                    (value.date === data[key].date) ? 
                    <TodoItem key={uuid()} todo={data[key]} todoID={key}/>
                    : 
                    null   
                ))}
            </div>
        )
    }
    
}

export default ShowTodo;