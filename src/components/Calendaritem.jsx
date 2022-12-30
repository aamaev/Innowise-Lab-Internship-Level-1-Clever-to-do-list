import React from "react";
import Data from './DataContext';
import moment from "moment";

function CalendarItem({date, status}){ 
    const value = React.useContext(Data);
    const currentDay = moment(date);

    const showDate = () => {
        value.dateSetter(date);
        // const items = document.querySelectorAll('.calendar-item');
        // items.forEach(item => {
        //     item.addEventListener('click', () =>{
        //         item.classList.remove('bg-red-200');
        //         item.classList.add('bg-red-200');  
        //     });
        //     item.classList.remove('bg-red-200');
            
        // });

    }

    return (
        <div className="inline-block mr-8">
            <div className="calendar-item border border-gray rounded-2xl w-16 h-20 text-center" onClick={showDate}>
                <div className="mt-2.5 text-gray-500" >{currentDay.format('ddd')}</div>
                <div>{currentDay.format('D')}</div>   
            </div>  
            <div className="flex justify-center">
            {
                (status) ?
                (status.true > 0) ? <div className="w-2 h-2 bg-green-500 rounded mt-1"></div> : null
                : <div className="w-2 h-2 mt-1"></div>
            }
            {
                (status) ?
                (status.false > 0) ? <div className="w-2 h-2 bg-red-500 rounded mt-1"></div> : null
                : <div className="w-2 h-2 mt-1"></div>
            }
            </div>

        </div>
    )
}

export default CalendarItem;
