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


    // (taskCounter === 1) ? <div className="font-bold text-2xl">{`1 task in this day`}</div> : null
    // (taskCounter > 1) ? <div className="font-bold text-2xl">{`${taskCounter.length} tasks in this day`}</div> : null

    if (data) {
        const keys = Object.keys(data);
        const taskCounter = [];
        keys.forEach((key) => {
            if (value.date === data[key].date){
                taskCounter.push(data[key]);
            }
        });
        return (
            <>  
                <div>
                    {
                        (taskCounter.length === 0) ? <div className="font-bold text-2xl">{`empty here..`}</div> : <div></div>
                    }
                    {
                        (taskCounter.length === 1) ? <div className="font-bold text-2xl">{`1 task in this day`}</div> : <div></div>
                    }
                    {
                        (taskCounter.length > 1) ? <div className="font-bold text-2xl">{`${taskCounter.length} tasks in this day`}</div> : null
                    }
                </div>
                <div>
                    {keys.map((key) => (
                        (value.date === data[key].date) ? 
                        <TodoItem key={uuid()} todo={data[key]} todoID={key}/>
                        : 
                        null   
                    ))}
                </div>
            </>
        )
    }
    
}

export default ShowTodo;