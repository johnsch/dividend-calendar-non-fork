import React from 'react';
import ReactDOM from 'react-dom';
import CalendarDay from './calendarDay';
import CalendarMonth from './calendarMonth';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { StockValue, months } from './interfaces';

let sampleStockValues: StockValue[] = [
    { symbol: 't', value: 55 },
    { symbol: 'mo', value: 20 }
];

ReactDOM.render(
  <React.StrictMode>
        <CalendarMonth month={months.July} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
