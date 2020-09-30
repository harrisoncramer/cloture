import React, { useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment, { unitOfTime } from "moment";
import { useHomeState } from "../../hooks";
import LoadingWrapper from "../LoadingWrapper";
import { goToLink, getCommitteeLabel } from "../../util";
import { isMobile } from "react-device-detect";

import "./styles.scss";
interface BigCalendarProps {
  house: boolean;
  senate: boolean;
  filter: string;
  minDate: Date;
  setMinDate: (date: Date) => void;
  maxDate: Date;
  setMaxDate: (date: Date) => void;
  early: Date;
  view: string;
  setView: (view: string) => void;
}

const getMin = (view: string, date: Date) =>
  moment(date)
    .startOf(view === "work_week" ? "week" : (view as unitOfTime.StartOf))
    .toDate();

const getMax = (view: string, date: Date) =>
  moment(date)
    .endOf(view === "work_week" ? "week" : (view as unitOfTime.StartOf))
    .toDate();

const localizer = momentLocalizer(moment);
const BigCalendar = ({
  house,
  senate,
  minDate,
  setMinDate,
  maxDate,
  setMaxDate,
  view,
  setView,
  filter,
  early,
}: BigCalendarProps): React.ReactElement => {
  // Create reference as current date and use it to set initial parameters for min and max date.
  const today = useRef(moment().startOf("day").toDate()).current;

  interface Datum {
    title: string;
    date: Date;
    link: string;
    text: string | null;
    committee: string;
    time: Date;
    __typename: string;
  }
  interface Event {
    title: string;
    start: Date;
    link: string;
    end: Date;
    allDay?: boolean;
    resource?: any;
    __typename: string;
    committee: string;
  }

  interface HomeState {
    loading: boolean;
    data: Datum[] | null;
  }

  interface onNavigate {
    date: Date;
    view: string;
  }

  const { loading, data }: HomeState = useHomeState({
    minDate: getMin(view || "month", minDate),
    maxDate: getMax(view || "month", maxDate),
    senate,
    house,
  });

  const handleOnNavigate = ({ date, view }: onNavigate): void => {
    setMinDate(getMin(view, date));
    setMaxDate(getMax(view, date));
  };

  const handleSelectEvent = (e: Event) => {
    goToLink(e.link);
  };

  const handleShowMore = (events: Event[]) => {};

  const filterRegex = new RegExp(filter, "gi");
  const events = data
    ? data
        .filter((x) => (x.text ? x.text.match(filterRegex) : true))
        .map((x: Datum) => {
          const theDate = moment(x.date).format("LLLL");
          const theTime = moment(x.time).format("hh:mm a");
          const startTime = moment(`${theDate} ${theTime}`, "LLLL hh:mm a");
          const event: Event = {
            title: x.title,
            committee: x.committee,
            start: startTime.toDate(),
            end: startTime.add(3, "hours").toDate(),
            link: x.link,
            __typename: x.__typename,
          };
          return event;
        })
    : [];

  return (
    <LoadingWrapper loading={loading}>
      <div className="big-calendar-wrapper">
        <Calendar
          min={early}
          className="big-calendar"
          localizer={localizer}
          titleAccessor={(e) =>
            `${getCommitteeLabel(e.committee, e.__typename)}: ${e.title}`
          }
          events={events}
          onShowMore={(events, e) => handleShowMore(events)}
          onView={(view: string) => {
            // Refetching data for the other views when view range broadens
            setMinDate(getMin(view, minDate));
            setMaxDate(getMax(view, maxDate));
            console.log(getMin(view, minDate));
            console.log(getMax(view, maxDate));
            setView(view);
            // Somehow call fetchMore...
            //useHomeState({ minDate, maxDate, house, senate });
          }}
          eventPropGetter={(e) => ({
            className: "collection-" + e.__typename.toLowerCase() + " isMagic",
          })}
          onNavigate={(date, view) => handleOnNavigate({ date, view })}
          onSelectEvent={(event: Event, e: React.SyntheticEvent): any =>
            handleSelectEvent(event)
          }
          popup={true}
          date={minDate || today}
          //@ts-ignore
          defaultView={isMobile ? "day" : view}
          views={isMobile ? ["day"] : ["month", "work_week", "day"]}
          drilldownView="day"
          onDrillDown={(date: Date, view: string) => {
            setMaxDate(date);
            setMinDate(date);
            setView(view);
          }}
        />
      </div>
    </LoadingWrapper>
  );
};

export default BigCalendar;
