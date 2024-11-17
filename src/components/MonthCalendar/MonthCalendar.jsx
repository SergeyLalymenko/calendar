import classNames from 'classnames';
import './MonthCalendar.scss';

function MonthCalendar({ monthName, dates, eventTypes }) {

    function renderMonth() {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return (
            <div className="month-calendar">
                <h3 className="month-calendar__title">
                    {monthName}
                </h3>
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
                                <div className="month-calendar__box-item" key={i}>
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
        );
    }

    return (
        <>
            {renderMonth()}
        </>
    )
}

export default MonthCalendar;
