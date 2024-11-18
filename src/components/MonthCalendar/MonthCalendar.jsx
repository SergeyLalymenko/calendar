import { Tooltip } from 'react-tooltip';
import classNames from 'classnames';
import chroma from 'chroma-js';
import Button from '@/UI/Button/Button';
import editIcon from '@/assets/calendar/edit.svg';
import 'react-tooltip/dist/react-tooltip.css';
import './MonthCalendar.scss';

function MonthCalendar({
    monthName,
    dates,
    eventTypes,
    getFormattedDay
}) {
    const daysOfWeek = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];
    const monthes = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    function renderTooltip() {
        return (
            <Tooltip
                id="event-tooltip"
                openOnClick
                clickable
                place="right-start"
                render={({ content }) => {
                    const events = JSON.parse(content) || [];

                    return (
                        <div className="month-calendar__event-tooltip event-tooltip">
                            <h3 className="event-tooltip__title">
                                Events
                            </h3>
                            <div className="event-tooltip__items">
                                {
                                    events.map((event) => {
                                        const [, month, day] = event.date.split('-');
                                        const formattedDay = getFormattedDay(day);
                                        const formattedMonth = monthes[+month - 1].toLowerCase();

                                        const eventType = eventTypes.find(({ id }) => id === event.eventTypeId);
                                        const backgroundColor = chroma(eventType.color).alpha(0.16).css();
                                        const styles = {
                                            color: eventType.color,
                                            backgroundColor
                                        };
                                        
                                        return (
                                            <div className="event-tooltip__item" key={event.id}>
                                                <div className="event-tooltip__item-head">
                                                    <h4 className="event-tooltip__item-title">
                                                        {event.title}
                                                    </h4>
                                                    <img className="event-tooltip__item-edit" src={editIcon} />
                                                </div>
                                                <p className="event-tooltip__item-description">
                                                    {event.description}
                                                </p>
                                                <p className="event-tooltip__item-location">
                                                    {event.location}
                                                </p>
                                                <div className="event-tooltip__item-footer">
                                                    <p className="event-tooltip__item-date" style={{color: eventType.color}}>
                                                        {formattedDay} {formattedMonth}, {event.time}
                                                    </p>
                                                    <p
                                                        className="event-tooltip__item-event-type"
                                                        style={styles}
                                                    >
                                                        {eventType.title}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="event-tooltip__footer">
                                <Button
                                    config={{
                                        visualType: 'primary',
                                        type: 'button',
                                        size: 'md'
                                    }}
                                >
                                    Add event
                                </Button>
                            </div>
                        </div>
                    )
                }}
            />
        )
    }

    return (
        <div className="month-calendar">
            <h3 className="month-calendar__title">
                {monthName}
            </h3>
            {renderTooltip()}
            <div className="month-calendar__box">
                {
                    daysOfWeek.map((dayOfWeek, i) => (
                        <div className="month-calendar__box-item" key={i}>
                            <p className="month-calendar__box-item-text disabled">
                                {dayOfWeek}
                            </p>
                        </div>
                    ))
                }
                {
                    dates.map(({ day, isDisabled, events }, i) => {
                        const eventColors = new Set(events.map(
                            ({ eventTypeId }) => eventTypes.find(({ id }) => id === eventTypeId).color
                        ));

                        return (
                            <div
                                className={classNames({ 'has-events': events.length }, 'month-calendar__box-item')}
                                data-tooltip-id="event-tooltip"
                                data-tooltip-content={JSON.stringify(events)}
                                key={i}
                            >
                                <p className={classNames({ 'disabled': isDisabled }, 'month-calendar__box-item-text')}>
                                    {day}
                                </p>
                                <div className="month-calendar__box-item-events">
                                    {
                                        Array.from(eventColors).map((color, i) => {
                                            const styles = {
                                                backgroundColor: color
                                            };

                                            return (
                                                <div
                                                    className="month-calendar__box-item-event"
                                                    style={styles}
                                                    key={i}
                                                ></div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MonthCalendar;
