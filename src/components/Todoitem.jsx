import React from "react";
import { useNavigate } from "react-router-dom";
import { MdRadioButtonUnchecked } from 'react-icons/md';
import { MdCheckCircle } from 'react-icons/md';

const TodoItem = ( {todo, todoID} ) => {
    const navigate = useNavigate();

    const showTodoInfo = () => {
        navigate('/todoinfo', {state: { todoID }});
    }

    return(
        <div className="border border-orange-100 rounded-2xl p-3 m-5 flex justify-between hover:bg-orange-100" onClick={showTodoInfo}>
            <div className="flex my-2">   
                {todo.status ? <MdCheckCircle size={25} color="orange" className="mt-px"/> : <MdRadioButtonUnchecked size={25} color="orange" className="mt-px"/>}
                <div className="text-xl ml-2 text-gray-600">{todo.title}</div>
            </div>
        </div>
    );
}

export default TodoItem;