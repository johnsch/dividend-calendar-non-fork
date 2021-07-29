import React, { useReducer, useEffect } from 'react';
import CalendarMonth from './calendarMonth';
import { MonthNames, months, MonthData } from './interfaces';
import { getBearerToken } from './messenger';
import './main.css';

let currentDate = new Date();

const initialState = {
    selectedMonth: currentDate.getMonth() + 1,
    selectedYear: currentDate.getFullYear(),
    bearerToken: ''
};

type ACTIONTYPE =
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'setBearerToken', payload: string };


function reducer(state: typeof initialState, action: ACTIONTYPE) {
    switch(action.type) {
        case 'increment':
            if (state.selectedMonth === 12)
                return ({
                    selectedYear: state.selectedYear + 1,
                    selectedMonth: 1,
                    bearerToken: state.bearerToken
                });
            else
                return ({
                    selectedYear: state.selectedYear,
                    selectedMonth: state.selectedMonth + 1,
                    bearerToken: state.bearerToken
                });

        case 'decrement':
            if (state.selectedMonth === 1)
                return ({
                    selectedYear: state.selectedYear - 1,
                    selectedMonth: 12,
                    bearerToken: state.bearerToken
                });
            else
                return ({
                    selectedYear: state.selectedYear,
                    selectedMonth: state.selectedMonth - 1,
                    bearerToken: state.bearerToken
                });

        case 'setBearerToken':
            return ({
                selectedYear: state.selectedYear,
                selectedMonth: state.selectedMonth,
                bearerToken: action.payload
            });

        default:
            throw new Error();
    }
}


export default function Main() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        getBearerToken().then((token) => {
            if(token)
                dispatch({ type: 'setBearerToken', payload: token });
            console.log(token);
        });
    }, [])

    console.log(state.bearerToken);
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