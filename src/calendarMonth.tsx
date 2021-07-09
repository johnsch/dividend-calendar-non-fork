import React from 'react';
import { months, StockValue } from './interfaces';
import CalendarDay from './calendarDay';
import './calendarMonth.css';

type CalendarMonthProps = {
    month: {
        name: string,
        days: number
    }
}

let sampleStockValues: StockValue[] = [
    { symbol: 't', value: 55 },
    { symbol: 'mo', value: 20 }
];

export default function CalendarMonth({ month }: CalendarMonthProps) {
    let { name, days } = month;
    let calendarDays: JSX.Element[] = [];

    for (let i = 1; i <= days; i++) {
        calendarDays.push(<CalendarDay day={i} stockValues={sampleStockValues}/>);
    }

    return ( 
        <div className='calendar'>
            <div id='monthLabel'><h2>{name}</h2></div>
            <div id='dayLabelContainer'>
                <div className='dayLabel'>Sunday</div>
                <div className='dayLabel'>Monday</div>
                <div className='dayLabel'>Tuesday</div>
                <div className='dayLabel'>Wednesday</div>
                <div className='dayLabel'>Thursday</div>
                <div className='dayLabel'>Friday</div>
                <div className='dayLabel'>Saturday</div>
            </div>
            <div className='calendarDaysContainer'>
                {calendarDays}
            </div>
        </div>


    );

}