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
                className="rounded border border-indigo-600 bg-indigo-400 w-36 h-12 mt-4"
                onClick={createTodo}>
                Add a new task
            </button>
        </div>
    )
}

export default CreateTodo;