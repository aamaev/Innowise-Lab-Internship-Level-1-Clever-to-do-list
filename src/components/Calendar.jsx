import React, { useEffect, useState } from "react";
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
    let status = {};

    monthSetter(startMonth);

    useEffect(() => {
        const calendar = document.querySelector('.calendar');
        calendar.addEventListener('scroll', () => {
            if (calendar.scrollLeft + calendar.clientWidth  === calendar.scrollWidth) {
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
        });
    }, [days]);

    useEffect(() => {
        onValue(ref(db, 'users/' + user.uid), (snapshot) => {
            const data = snapshot.val();
            setData(data);
        }); 
    }, [user.uid]);

    if (data){
        const keys = Object.values(data);
        status = todoStatus(keys);
    }

    return (
        <div className="calendar whitespace-nowrap overflow-auto h-28 w-full mb-8">
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