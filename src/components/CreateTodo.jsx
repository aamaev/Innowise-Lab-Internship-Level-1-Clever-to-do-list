import React from "react";
import { useNavigate } from "react-router-dom";

function CreateTodo(){
    const navigate = useNavigate(); 

    function createTodo(){
        return navigate('/createtask');
    } 
    
    return (
        <div className="text-center">
            <button 
                className="rounded-xl border border-orange-200 bg-orange-500 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:bg-orange-300"
                onClick={createTodo}>
                + Add a new task
            </button>
        </div>
    )
}

export default CreateTodo;