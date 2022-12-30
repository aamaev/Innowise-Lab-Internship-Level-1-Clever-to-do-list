import React  from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db} from "../firebase";
import { ref, update, remove } from "firebase/database";
import { HiOutlineTrash } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';

function TodoItem({todo, todoID}){
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const updateStatus = () => {
        const updates = {};
        updates['/users/' + user.uid + '/' + todoID + '/status'] = !todo.status;
        update(ref(db), updates);
    };

    const deleteTodo = () => {
        remove(ref(db, '/users/' + user.uid + '/' + todoID));
    }

    const editTodo = () => {
        navigate('/createtask', {state: {todoID}});    
    }

    return(
        <div className="bg-indigo-100 border border-indigo-500 rounded-2xl p-3 m-5 flex justify-between">
            <div className="flex">
                <input type='checkbox' className="w-5 h-12" defaultChecked={todo.status} onClick={updateStatus}/> 
                <div className="ml-4">
                    {todo.status ? <div className="text-lg line-through opacity-80">{todo.title}</div> : <div className="font-bold text-lg">{todo.title}</div>}
                    <div className="italic">{todo.description}</div>
                </div>
            </div>
            <div className="flex items-center">
                <button className="mt-px" onClick={editTodo}><TbEdit size={25}/></button>
                <button onClick={deleteTodo}><HiOutlineTrash size={25}/></button> 
            </div>

        </div>
    );
}

export default TodoItem;