// DateSelect.js
import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

const DateSelect = ({ availableDates, selectedDate, setSelectedDate }) => {
    return (
        <Select
            label="Select Date"
            placeholder="Select a date"
            className="max-w-xs mb-4"
            onChange={(e) => setSelectedDate(e.target.value)}
            value={selectedDate}
        >
            {availableDates.map((date) => (
                <SelectItem key={date} value={date}>
                    {date}
                </SelectItem>
            ))}
        </Select>
    );
};

export default DateSelect;