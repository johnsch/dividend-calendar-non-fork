import React, { useState } from 'react';
import CalendarMonth from './calendarMonth';
import { MonthNames, months, MonthData } from './interfaces';


export default function Main() {
    const [selectedMonth, changeMonth] = useState(1);

    let dateObject = new Date();
    let monthObject = Object.values(months).find(monthObject => monthObject.monthNumber === selectedMonth);
    
    dateObject.setMonth(selectedMonth - 1);
    dateObject.setDate(1);

    let monthData: MonthData = Object.assign({ startingDay: dateObject.getDay() }, monthObject);

    return (
        <div>
            <div onClick={() => changeMonth(selectedMonth - 1)}>&lt;</div>
            <div onClick={() => changeMonth(selectedMonth + 1)}>&gt;</div>
            <CalendarMonth month={monthData} />
        </div>
    );    
}