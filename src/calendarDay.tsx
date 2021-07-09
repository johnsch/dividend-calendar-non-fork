import React from 'react';
import './calendarDay.css';
import { StockValue } from './interfaces';

type CalendarDayProps = {
    day: number,
    stockValues?: StockValue[]
};

export default function CalendaryDay({ day, stockValues }: CalendarDayProps) {
    function generateStockValueElements() {
        let stockValueElements: JSX.Element[] = [];

        if(stockValues)
        stockValues.forEach((stockValue) => {
            let element = <div className='stockValue'>
                <h4>{stockValue.symbol}</h4>
                <p>{stockValue.value}</p>
            </div>;

            stockValueElements.push(element);
        });

        return stockValueElements;
    }

    return (
        <div className='calendarDay'>
            <h3>{day}</h3>
            <div className='stockValueContainer'>
                {generateStockValueElements()}
            </div>
        </div>
    );
};