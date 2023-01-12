import React, { useEffect, useState, useContext } from "react";
import { ref, onValue} from "firebase/database";
import { db } from '../firebase';
import TodoItem from "./TodoItem";
import uuid from "react-uuid";
import Data from "../contexts/DataContext";
import TaskCounterInfo from "./TaskCounterInfo";
import { AuthContext } from "../contexts/AuthContext";

const ShowTodo = () => {
    const [data, setData] = useState('');
    const [keys, setKeys] = useState([]);
    const [taskCounter, setTaskCounter] = useState(0);
    const value = useContext(Data);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        onValue(ref(db, 'users/' + user.uid), (snapshot) => {
            const data = snapshot.val();
            setData(data);
            if (data) {
                const keys = Object.keys(data);
                setKeys(keys);
                const taskCounter = [];
                keys.forEach((key) => {
                    if (value.date === data[key].date){
                        taskCounter.push(data[key]);    
                    }
                });
                setTaskCounter(taskCounter.length);
            }
        }); 
    }, [user.uid, value.date]);
    
    return (
        data &&
            <div>
                <TaskCounterInfo taskCounter = {taskCounter} />
                <div>
                    {keys.map((key) => (
                        (value.date === data[key].date) && <TodoItem key={uuid()} todo={data[key]} todoID={key}/>
                    ))}
                </div>
            </div>
    )  
}

export default ShowTodo;