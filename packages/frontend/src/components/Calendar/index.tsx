import React from "react";
import Cal from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.scss";

export interface CalendarProps {
  filter: string;
  minDate: Date;
  maxDate: Date;
  twoMonthsFromToday: Date;
  handleDateRangePick: (dates: Date | Date[]) => void;
}

const Calendar = ({
  minDate,
  maxDate,
  twoMonthsFromToday,
  handleDateRangePick,
}: CalendarProps): React.ReactElement => {
  return (
    <>
      <Cal
        className={"c1"}
        minDetail={"month"}
        minDate={new Date(process.env.REACT_APP_MIN_DATE as string)}
        maxDate={twoMonthsFromToday}
        selectRange={true}
        returnValue={"range"}
        onChange={(dates) => handleDateRangePick(dates)}
        value={[minDate, maxDate]}
      />
    </>
  );
};
export default Calendar;
