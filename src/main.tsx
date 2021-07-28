import React, { useReducer } from 'react';
import CalendarMonth from './calendarMonth';
import { MonthNames, months, MonthData } from './interfaces';
import './main.css';

let currentDate = new Date();

const initialState = {
    selectedMonth: currentDate.getMonth() + 1,
    selectedYear: currentDate.getFullYear()
};

type ACTIONTYPE =
    | { type: 'increment' }
    | { type: 'decrement' };


function reducer(state: typeof initialState, action: ACTIONTYPE) {
    switch(action.type) {
        case 'increment':
            if (state.selectedMonth === 12)
                return ({
                    selectedYear: state.selectedYear + 1,
                    selectedMonth: 1
                });
            else
                return ({
                    selectedYear: state.selectedYear,
                    selectedMonth: state.selectedMonth + 1
                });

        case 'decrement':
            if (state.selectedMonth === 1)
                return ({
                    selectedYear: state.selectedYear - 1,
                    selectedMonth: 12
                });
            else
                return ({
                    selectedYear: state.selectedYear,
                    selectedMonth: state.selectedMonth - 1
                });
    }
}


export default function Main() {
    const [state, dispatch] = useReducer(reducer, initialState);

    let dateObject = new Date();
    let monthObject = Object.values(months).find(monthObject => monthObject.monthNumber === state.selectedMonth);
    
    dateObject.setMonth(state.selectedMonth - 1);
    dateObject.setFullYear(state.selectedYear);
    dateObject.setDate(1);

    let monthData: MonthData = Object.assign({ startingDay: dateObject.getDay() }, monthObject);

    return (
        <div>
            <div id='calendar'>
                <div id='cycleMonthButtonContainer'>
                    <div className='cycleMonthButton' onClick={() => dispatch({ type: 'decrement' })}>&lt;</div>
                    {state.selectedYear}
                    <div className='cycleMonthButton' onClick={() => dispatch({ type: 'increment' })}>&gt;</div>
                </div>
                <CalendarMonth month={monthData} />
            </div>
        </div>
    );    
}