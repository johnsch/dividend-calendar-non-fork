import React from 'react';
import ReactDOM from 'react-dom';
import CalendarDay from './calendarDay';
import CalendarMonth from './calendarMonth';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { StockValue, months } from './interfaces';

let sampleStockValues: StockValue[] = [
    { symbol: 't', value: 55 },
    //{ symbol: 'mo', value: 20 }
];

interface MonthObject {
    name: string,
    days: number,
    startingDay: number
}

let monthObject: MonthObject = Object.assign({startingDay: 0}, months.July);
let dateObject = new Date();
dateObject.setMonth(6);
dateObject.setDate(1);

monthObject.startingDay = dateObject.getDay();

ReactDOM.render(
  <React.StrictMode>
        <CalendarMonth month={monthObject} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
