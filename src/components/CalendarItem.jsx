import React, { useContext } from "react";
import Data from '../contexts/DataContext';
import moment from "moment";

const CalendarItem = ({date, status}) => { 
    const value = useContext(Data);
    const currentDay = moment(date);

    const showTodos = () => {
        value.dateSetter(date)
    }

    return (
        <button className="inline-block mr-8">
            <div className="transition border border-gray rounded-2xl w-16 h-20 text-center hover:bg-black hover:border-black hover:text-white" onClick={showTodos}>
                <div className="text-gray-500 mt-2.5" >{currentDay.format('ddd')}</div>
                <div>{currentDay.format('D')}</div>   
            </div>  
            <div className="flex justify-center">
            {(status) ?
                (status.isDone) ? 
                <div className="w-2 h-2 bg-orange-600 rounded mt-1"></div> : null
                : 
                <div className="w-2 h-2 mt-1"></div>
            }
            {(status) ?
                (status.isNotDone) ? 
                <div className="w-2 h-2 bg-orange-300 rounded mt-1"></div> : null
                : 
                <div className="w-2 h-2 mt-1"></div>
            }
            </div>
        </button>
    )
}

export default CalendarItem;
