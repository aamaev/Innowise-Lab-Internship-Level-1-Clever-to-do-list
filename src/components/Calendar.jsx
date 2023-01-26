import React, { useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { ref, onValue} from "firebase/database";
import { db } from '../firebase';
import uuid from "react-uuid";
import moment from "moment";
import CalendarItem from "./CalendarItem";
import { todoStatus } from "../functions/todoStatus";
import { monthSetter } from "../functions/monthSetter";

const Calendar = () => {
    const today = moment();
    const startMonth = [today.format('YYYY-MM-DD')];
    const [user] = useAuthState(auth);
    const [data, setData] = useState('');
    const [days, setDays] = useState(startMonth); 
    const [status, setStatus] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const calendar = useRef();

    monthSetter(startMonth);
 
    const handleScroll = () => {
        if (calendar.current){
            const { scrollWidth, scrollLeft, clientWidth } = calendar.current;
            if (scrollLeft + clientWidth  === scrollWidth) {
                setDays(() => {
                    const newDays = [...days];
                    const index = newDays.length - 1;
                    const temp = moment(newDays[index]);
                    for (let i = 0; i < moment(newDays[index]).add(1, 'month').daysInMonth(); ++i){
                        newDays.push(temp.add(1, 'day').format('YYYY-MM-DD')); 
                    }  
                    return newDays;
                }); 
            }
        }
    }

    useEffect(() => {
        onValue(ref(db, 'users/' + user.uid), (snapshot) => {
            if (loaded) {
                return;
            };
            const data = snapshot.val();
            setData(data);
            setLoaded(true);
        }); 
        const keys = Object.values(data);
        setStatus(todoStatus(keys));   
    }, [user.uid, loaded, data]);


    return (
        <div className="calendar whitespace-nowrap overflow-auto h-28 w-full mb-8" ref={calendar} onScroll={handleScroll}>
            {days.map(day => (
                <CalendarItem 
                    key = { uuid() }
                    date = { day }
                    status = { status[day] }
                />)
            )}
        </div>
    )
}

export default Calendar;