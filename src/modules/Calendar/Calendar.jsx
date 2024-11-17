import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '@/store/eventsSlice';
import { fetchEventTypes } from '@/store/eventTypesSlice';
import chroma from 'chroma-js';
import MonthCalendar from '@/components/MonthCalendar/MonthCalendar';
import './Calendar.scss';

function Calendar() {
    const dispatch = useDispatch();
    const eventTypes = useSelector((state) => state.eventTypes.data);
    const events = useSelector((state) => state.events.data);
    const [calendarData, setCalendarData] = useState([]);
    const [eventFilters, setEventFilters] = useState([]);

    const filteredEvents = useMemo(() => {
        const isFilter = !!eventFilters.length;

        return isFilter ? (
            events.filter(({ eventTypeId }) => eventFilters.includes(eventTypeId))
        ) : events;
    }, [events, eventFilters]);

    const actualCalendarData = useMemo(() => {
        const monthes = 6;
        const currentDate = new Date();
        const datesData = [];

        for (let i = 0; i < monthes; i++) {
            const dates = {
                year: currentDate.getFullYear(),
                month: currentDate.getMonth(),
                monthName: currentDate.toLocaleString('en-US', { month: 'long' })
            };

            currentDate.setMonth(currentDate.getMonth() + 1);
            datesData.push(dates);
        }

        return datesData.reduce((acc, { year, month, monthName }) => {
            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0);
            const firstDayOfWeek = firstDayOfMonth.getDay();
            const lastDayOfWeek = lastDayOfMonth.getDay();
    
            const firstDayOfMonthCopy = new Date(firstDayOfMonth);
            const lastDayOfMonthCopy = new Date(lastDayOfMonth);
            const fromDay = new Date(firstDayOfMonthCopy.setDate(-firstDayOfWeek + 1));
            const toDay = new Date(lastDayOfMonthCopy.setDate(lastDayOfMonthCopy.getDate() - lastDayOfWeek + 7));

            const dates = [];

            for (let currentDate = new Date(fromDay); !isSameDay(currentDate, toDay); currentDate = getNextDay(currentDate)) {
                const timezoneOffset = -currentDate.getTimezoneOffset();
                const preparedDate = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
                const formattedDate = preparedDate.toISOString().split('T')[0];
                const [currentYear, currentMonth, currentDay] = formattedDate.split('-');
                const day = getFormattedDay(currentDay);
                const isDisabled = +currentYear !== year || +currentMonth - 1 !== month;
                const currentEvents = isDisabled ? [] : filteredEvents.filter((event) => event?.date === formattedDate);
                
                const item = {
                    day,
                    date: formattedDate,
                    isDisabled,
                    events: currentEvents
                };

                dates.push(item);
            }
            
            return [
                ...acc,
                {
                    monthName,
                    dates
                }
            ];
        }, []);
    }, [filteredEvents]);

    const updateCalendarData = useCallback(() => {
        const data = actualCalendarData;
        setCalendarData(data);
    }, [actualCalendarData]);

    useEffect(() => {
        dispatch(fetchEventTypes());
        dispatch(fetchEvents());
    }, [dispatch]);

    useEffect(updateCalendarData, [updateCalendarData]);

    function getFormattedDay(day) {
        const [firstNumber] = day;
        return firstNumber === '0' ? day.replaceAll('0', '') : day;
    }

    function isSameDay(date1, date2) {
        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);
    
        return date1.getTime() === date2.getTime();
    }

    function getNextDay(date) {
        const dateCopy = new Date(date);
        dateCopy.setDate(dateCopy.getDate() + 1);

        return dateCopy;
    }

    function onFilterClick(eventId) {
        const newEventFilters = eventFilters.includes(eventId) ? (
            eventFilters.filter((id) => id !== eventId)
        ) : [...eventFilters, eventId];

        setEventFilters(newEventFilters);
    }

    return (
        <div className="calendar">
            <h1 className="calendar__title">
                Calendar
            </h1>
            <div className="calendar__events">
                {
                    eventTypes.map(({ title, color, id }) => {
                        const isActive = !!eventFilters.length && eventFilters.includes(id);

                        const backgroundColor = isActive ? color : chroma(color).alpha(0.16).css();
                        const currentColor = isActive ? '#131315' : color;

                        const styles = {
                            color: currentColor,
                            backgroundColor
                        };

                        return (
                            <p
                                className="calendar__events-item"
                                style={styles}
                                key={id}
                                onClick={() => onFilterClick(id)}
                            >
                                {title}
                            </p>
                        )
                    })
                }
            </div>
            <div className="calendar__monthes">
                {
                    calendarData.length ? (
                        calendarData.map(({ monthName, dates }, i) => (
                            <MonthCalendar
                                monthName={monthName}
                                dates={dates}
                                eventTypes={eventTypes}
                                key={i}
                            />
                        ))
                    ) : 'Loading...'
                }
            </div>
        </div>
    )
}

export default Calendar;
