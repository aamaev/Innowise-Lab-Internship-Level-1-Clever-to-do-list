import React, { useState, useContext } from "react";
import { ref, onValue, update, remove } from "firebase/database";
import { db } from '../firebase';
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import { HiOutlineTrash } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';
import { AuthContext } from "../contexts/AuthContext";
import moment from "moment";

const TodoInfo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [loaded, setLoaded] = useState(false);
    const {user} = useContext(AuthContext);

    if (!user) {
        return <Navigate replace to='/signin' />
    }
    
    const setTask = () => {
        onValue(ref(db, `users/${user.uid}/${location.state.todoID}`), (snapshot) => {
            const data = snapshot.val();
            if (loaded) return;
            if (data){
                setTitle(data.title);
                setDescription(data.description);
                setDate(data.date);
                setStatus(data.status);
                setLoaded(true);
            }
        });   
    };

    const deleteTodo = () => {
        remove(ref(db, '/users/' + user.uid + '/' + location.state.todoID));
        navigate('/account');
    }

    const updateStatus = () => {
        const updates = {};
        updates['/users/' + user.uid + '/' + location.state.todoID + '/status'] = !status;
        update(ref(db), updates);
    };

    const updateTodo = () => {
        if (location.state.todoID) {
            const todoID = location.state.todoID;
            navigate('/createTask', {state: {todoID}});
        }
    }

    if (location.state){
        setTask();
    }        

    return (
        location.state ? 
        <div className="m-auto max-w-xl pt-10">
            <div className="text-xl font-bold"> <Link to='/account'>&lt; {moment(date).format('dddd, MMMM Do')} Task </Link></div>
            <div className="my-5">
                <div className="font-bold text-2xl">{title}</div>
                <hr className="my-4"/>
                <div className="text-gray-500">{description}</div>                    
            </div>
            <div className="flex items-center justify-between ">
                <div className="flex">
                    <button onClick={updateTodo} className="mr-2 self-center"><TbEdit size={27}/></button>
                    <button onClick={deleteTodo} className="self-center"><HiOutlineTrash size={25}/></button> 
                </div>
                <div>
                    {status ? <button onClick={updateStatus} className="m-1 border bg-green-300 rounded-2xl h-9 w-32 text-green-700">complite &#10003;</button>
                            : <button onClick={updateStatus} className="m-1 border bg-red-300 rounded-2xl h-9 w-32 text-red-700">uncomplite &#215;</button>
                    }   
                </div>
            </div>
        </div>
        :
        <div className="text-bold">something wrong...</div>
    )
    
}

export default TodoInfo;