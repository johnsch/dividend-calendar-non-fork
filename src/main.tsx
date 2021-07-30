import React, { useReducer, useEffect } from 'react';
import CalendarMonth from './calendarMonth';
import { MonthNames, months, MonthData, StockPosition, DividendPayment, MainState } from './interfaces';
import { getBearerToken, getDividendPayments } from './messenger';
import { testStockPositions, testDividendData } from './testing/testData';
import './main.css';

let currentDate = new Date();

const initialState: MainState = {
    selectedMonth: currentDate.getMonth() + 1,
    selectedYear: currentDate.getFullYear(),
    bearerToken: '',
    dividendPayments: []
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
                    bearerToken: state.bearerToken,
                    dividendPayments: state.dividendPayments
                });
            else
                return ({
                    selectedYear: state.selectedYear,
                    selectedMonth: state.selectedMonth + 1,
                    bearerToken: state.bearerToken,
                    dividendPayments: state.dividendPayments
                });

        case 'decrement':
            if (state.selectedMonth === 1)
                return ({
                    selectedYear: state.selectedYear - 1,
                    selectedMonth: 12,
                    bearerToken: state.bearerToken,
                    dividendPayments: state.dividendPayments
                });
            else
                return ({
                    selectedYear: state.selectedYear,
                    selectedMonth: state.selectedMonth - 1,
                    bearerToken: state.bearerToken,
                    dividendPayments: state.dividendPayments
                });

        case 'setBearerToken':
            return ({
                selectedYear: state.selectedYear,
                selectedMonth: state.selectedMonth,
                bearerToken: action.payload,
                dividendPayments: state.dividendPayments
            });

        default:
            throw new Error();
    }
}

function parseDividendPaymentData(data) {

}

export default function Main() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        getBearerToken().then((token) => {
            getDividendPayments(testStockPositions, token).then((data) => {
                console.log(data);
                dispatch({ type: 'setBearerToken', payload: token });
            });
        });
    }, [])

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