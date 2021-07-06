import React from 'react';
import { render, screen } from '@testing-library/react';
import CalendarDay from './calendarDay';

test('sees if component renders', () => {
    render(<CalendarDay />);
});

test('displays the proper date', () => {
    render(<CalendarDay day={15} />);
    expect(screen.getByText('15')).toBeDefined();
});