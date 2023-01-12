import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { ref, onValue} from "firebase/database";
import { db } from '../firebase';
import uuid from "react-uuid";
import moment from "moment";
import CalendarItem from "./CalendarItem";

const Calendar = () => {
    const today = moment();
    const todayTemp = moment();
    const startMonth = [today.format('YYYY-MM-DD')];
    if (startMonth.length === 1){
        for (let i = 0; i < today.daysInMonth(); i++){
            startMonth.push(todayTemp.add(1, 'day').format('YYYY-MM-DD'));
        }
    }

    const [days, setDays] = useState(startMonth); 
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

    const [user] = useAuthState(auth);
    const [data, setData] = useState('');
    useEffect(() => {
        onValue(ref(db, 'users/' + user.uid), (snapshot) => {
            const data = snapshot.val();
            setData(data);
        }); 
    }, [user.uid]);


    const todoStatus = {};
    if (data){
        const keys = Object.values(data);
        keys.forEach(key => {
            if (todoStatus[key.date]){ 
                if (key.status === true){
                    todoStatus[key.date].true = 1; 
                }
                if (key.status === false){
                    todoStatus[key.date].false = 1; 
                }
            } else {
                todoStatus[key.date] = {};
                if (key.status === true){
                    todoStatus[key.date].true = 1; 
                }
                if (key.status === false){
                    todoStatus[key.date].false = 1; 
                }
            }

        });
    }

    return (
        <div className="calendar whitespace-nowrap overflow-auto h-28 w-full mb-8">
        {days.map(day => (
            <CalendarItem 
                key = { uuid() }
                date = { day }
                status = { todoStatus[day] }
            />)
        )}
        </div>
    )
}

export default Calendar;