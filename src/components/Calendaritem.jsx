import React from "react";
import Data from './DataContext';
import moment from "moment";

function CalendarItem({date, status}){ 
    const value = React.useContext(Data);
    const currentDay = moment(date);

    const showTodos = () => {
        value.dateSetter(date)
    }

    return (
        <button className="inline-block mr-8">
            <div className=" border border-gray rounded-2xl w-16 h-20 text-center hover:bg-black hover:border-black hover:text-white" onClick={showTodos}>
                <div className="text-gray-500 mt-2.5" >{currentDay.format('ddd')}</div>
                <div>{currentDay.format('D')}</div>   
            </div>  
            <div className="flex justify-center">
            {
                (status) ?
                (status.true > 0) ? <div className="w-2 h-2 bg-orange-300 rounded mt-1"></div> : null
                : <div className="w-2 h-2 mt-1"></div>
            }
            {
                (status) ?
                (status.false > 0) ? <div className="w-2 h-2 bg-orange-600 rounded mt-1"></div> : null
                : <div className="w-2 h-2 mt-1"></div>
            }
            </div>
        </button>
    )
}

export default CalendarItem;
