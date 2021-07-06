import React from 'react';

type CalendarDayProps = {
    day: number
}

export default function ({ day }: CalendarDayProps) {
    return (
        <div className='calendarDay'>
            <h3>{day}</h3>
        </div>
    );
};