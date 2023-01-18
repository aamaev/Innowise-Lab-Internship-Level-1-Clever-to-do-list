import React, { useState, useContext } from "react";
import { ref, set, onValue, update } from "firebase/database";
import { db } from '../firebase';
import { useNavigate, useLocation, Link, Navigate} from "react-router-dom";
import uuid from "react-uuid";
import toast, {Toaster} from 'react-hot-toast';
import { AuthContext } from "../contexts/AuthContext";

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useContext(AuthContext);

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

    const setTask = () => {
        onValue(ref(db, `users/${user.uid}/${location.state.todoID}`), (snapshot) => {
            const data = snapshot.val();
            if (loaded) return;
            if (data){
                setTitle(data.title);
                setDescription(data.description);
                setDate(data.date);
                setLoaded(true);
            }
        });   
    };

    const updateTask = (e) => {
        const updateTodo = {
            title,
            description,
            date,
            status: false
        }
        const updates = {};
        if (title && date){
            updates[`/users/${user.uid}/${location.state.todoID}/`] = updateTodo;
            update(ref(db), updates);
            navigate('/account');    
        } else {
            e.preventDefault();
            toast.error('Please enter task title and date!');
        }
    }

    const locationStateHandler = (e) => {
        if (location.state) {
            return updateTask(e);
        } else {
            return createTask(e);
        }
    }

    const titleHandler = (e) => {
        setTitle(e.target.value); 
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value)
    }

    const dateHandler = (e) => {
        setDate(e.target.value);
    }

    if (location.state){
        setTask();
    }

    return (
        <div className="m-auto max-w-xl pt-10">
            <Toaster/>
            <div className="text-xl font-bold mb-3"> <Link to='/account'>&lt; Back </Link></div>
            <form onSubmit={locationStateHandler}>
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
            <button className="rounded border border-orange-200 bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:bg-orange-300"> { location.state ? <p>Update</p> : <p>Save</p> } </button>
            </form>
        </div>
    ) 
}

export default CreateTask;