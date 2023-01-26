import React, { useState, useContext, useEffect, useCallback } from "react";
import { ref, set, onValue, update } from "firebase/database";
import { db } from '../firebase';
import { useNavigate, Link, Navigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import toast, {Toaster} from 'react-hot-toast';
import { AuthContext } from "../contexts/AuthContext";

const CreateTask = () => {
    const [todoInfo, setTodoInfo] = useState({
        title: '',
        description: '',
        date: ''
    });
    const {title, description, date} = todoInfo;
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const {todoID} = useParams();

    const setTask = useCallback(() => {
        onValue(ref(db, `users/${user.uid}/${todoID}`), (snapshot) => {
            const data = snapshot.val();
            if (loaded) {
                return;
            }
            if (data){
                setTodoInfo({
                    ...todoInfo,
                    title: data.title,
                    description: data.description,
                    date: data.date
                })
                setLoaded(true);
            }
        });   
    }, [loaded, todoID, todoInfo, user.uid]);

    useEffect(() => {
        if (todoID){
            setTask();
        }
    }, [todoID, setTask]);

    if (!user) {
        return <Navigate replace to='/signin' />
    }
    
    const createTask = (e) => {
        if (title && date){
            set(ref(db, `users/${user.uid}/${uuid()}`), {
                title,
                description,
                date,
                status: false
            });
            navigate('/account');    
        } else {
            e.preventDefault();
            toast.error('Please enter task title and date!');
        }
    }

    const updateTask = (e) => {
        const updateTodo = {
            title,
            description,
            date,
            status: false
        }
        const updates = {};
        if (title && date){
            updates[`/users/${user.uid}/${todoID}/`] = updateTodo;
            update(ref(db), updates);
            navigate('/account');    
        } else {
            e.preventDefault();
            toast.error('Please enter task title and date!');
        }
    }

    const updateStateHandler = (e) => {
        if (todoID) {
            return updateTask(e);
        } else {
            return createTask(e);
        }
    }

    const titleHandler = (e) => {
        setTodoInfo({
            ...todoInfo, 
            title: e.target.value
        })
    }

    const descriptionHandler = (e) => {
        setTodoInfo({
            ...todoInfo, 
            description: e.target.value
        })
    }

    const dateHandler = (e) => {
        setTodoInfo({
            ...todoInfo, 
            date: e.target.value
        })
    }

    return (
        <div className="m-auto max-w-xl pt-10">
            <Toaster/>
            <div className="text-xl font-bold mb-3"> <Link to='/account'>&lt; Back </Link></div>
            <form onSubmit={updateStateHandler}>
                <div>
                    <p>Enter task title</p>
                    <input 
                        type="text"
                        value={title}
                        onChange={titleHandler}
                        className="mb-6 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                    </input>
                    <p>Enter task description</p>
                    <textarea
                        placeholder="Your message"
                        value={description}
                        onChange={descriptionHandler}
                        className="mb-6 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                    </textarea>
                    <p>Enter task date to complite</p>
                    <input 
                        type="date" 
                        value={date}
                        onChange={dateHandler}
                        className="mb-6 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">     
                    </input>
                </div>
            <button className="rounded border border-orange-200 bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:bg-orange-300"> { todoID ? <p>Update</p> : <p>Save</p> } </button>
            </form>
        </div>
    ) 
}

export default CreateTask;