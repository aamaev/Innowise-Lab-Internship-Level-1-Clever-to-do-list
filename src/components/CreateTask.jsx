import React, { useState, useEffect } from "react";
import { ref, set, onValue, update } from "firebase/database";
import { db } from '../firebase';
import { auth } from "../firebase";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import uuid from "react-uuid";
import toast, {Toaster} from 'react-hot-toast';

function CreateTask(){
    const [user, setUser] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const [loaded, setLoaded] = useState(false);

    const [initializing, setInitializing] = useState(true);
    
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
        <Navigate to='/'/>
    }
    
    const createTask = (e) => {
        if (title && date){
            set(ref(db, `users/${user.uid}/${uuid()}`), {
                title: title,
                description: description,
                date: date,
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
            title: title,
            description: description,
            date: date,
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


    if (location.state){
        setTask();
        return (
            <div className="m-auto max-w-xl pt-10">
                <Toaster/>
                <div className="text-xl font-bold mb-3"> <Link to='/account'>&lt; Back </Link></div>
                <form onSubmit={updateTask}>
                    <div>
                        <p>Enter task title</p>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mb-6 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                        </input>
                        <p>Enter task description</p>
                        <textarea
                            placeholder="Your message"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mb-6 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                        </textarea>
                        <p>Enter task date to complite</p>
                        <input 
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="mb-6 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">     
                        </input>
                    </div>
                <button className="rounded border border-orange-200 bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:bg-orange-300">Update</button>
                </form>
            </div>
        )
    } else {
        return (
            <div className="m-auto max-w-xl pt-10">
                <Toaster/>
                <div className="text-xl font-bold mb-3"> <Link to='/account'>&lt; Back </Link></div>
                <form onSubmit={createTask}>
                    <div>
                        <p>Enter task title</p>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mb-6 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                        </input>
                        <p>Enter task description</p>
                        <textarea
                            placeholder="Your message"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mb-6 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                        </textarea>
                        <p>Enter task date to complite</p>
                        <input 
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="mb-6 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">     
                        </input>
                    </div>
                <button className="rounded border border-orange-200 bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:bg-orange-300">Save</button>
                </form>
            </div>
        ) 
    }
}

export default CreateTask;