import "./styles.scss";

import React, { ReactElement, MouseEvent } from "react";

import { RouteComponentProps } from "react-router";

import { useDashboardState } from "../../hooks";
import Calendar from "../../components/Calendar";
import DataCardList from "../../components/DataCardList";
import LoadingWrapper from "../../components/LoadingWrapper";
import ReactSelectMulti from "../../components/ReactSelectMulti";
import MTextBox from "../../components/MTextBox";
import ViewWrapper from "../../components/ViewWrapper";

interface TParams {
  collection: string;
}

export const Dashboard = ({
  match,
}: RouteComponentProps<TParams>): ReactElement | null => {
  // Get current match from router, use it to get the correct GQL query
  const collection = match.params.collection;

  const {
    loading,
    error,
    data,
    fetchMore,
    filter,
    today,
    twoMonthsFromToday,
    setFilter,
    subcollections,
    setSubcollections,
    selectOptions,
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
  } = useDashboardState(collection);

  const handleDateRangePick = (dates: Date | Date[]): void => {
    // Take both dates and pass them into queryString, causing re-render
    if (Array.isArray(dates)) {
      setMinDate(dates[0]);
      setMaxDate(dates[1]);
    } else {
      // If something is broken, eliminate both dates.
      setMinDate(null);
      setMaxDate(null);
    }
  };

  const handleSetToday = (e: MouseEvent): void => {
    e.preventDefault();
    setMinDate(null);
    setMaxDate(null);
  };

  const handleSetWeek = (e: MouseEvent): void => {
    e.preventDefault();
    const inSevenDays = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    setMinDate(today);
    setMaxDate(inSevenDays);
  };

  const handleClearDates = (e: MouseEvent): void => {
    e.preventDefault();
    setMinDate(new Date(process.env.REACT_APP_MIN_DATE as string));
    setMaxDate(twoMonthsFromToday);
  };

  const handleFetchMore = (listLength: number) => {
    fetchMore({
      variables: {
        skip: listLength,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        // Assign new data to an object with the correct collection name
        // This is required because the name of our query
        const res = {
          [collection]: [...prev[collection], ...fetchMoreResult[collection]],
        };
        return res;
      },
    });
  };

  return (
    <ViewWrapper>
      <div className="colWrapper">
        <div className="col left">
          <div className="col-header">
            <h3 className="menu">Filters</h3>
          </div>
          <div className="filter">
            <ReactSelectMulti
              callBack={setSubcollections}
              option={subcollections}
              options={selectOptions}
            />
          </div>
          <div className="filter">
            <MTextBox filter={filter} callBack={setFilter} />
          </div>
          <div className="filter">
            <Calendar
              handleDateRangePick={handleDateRangePick}
              minDate={minDate ?? today}
              maxDate={maxDate ?? today}
              filter={filter || ""}
              twoMonthsFromToday={twoMonthsFromToday}
            />
            <div className="buttons">
              <button className="btn pointer" onClick={handleSetToday}>
                Today
              </button>
              <button className="btn pointer" onClick={handleSetWeek}>
                Next week
              </button>
              <button className="btn pointer" onClick={handleClearDates}>
                All Time
              </button>
            </div>
          </div>
        </div>
        <div className="col right">
          <div className="col-header">
            <h3>Records</h3>
          </div>
          <LoadingWrapper // Disable wrapper after initial fetch (data is not null)
            isDisabled={!!data}
            loading={loading}
            error={error}
          >
            <DataCardList
              data={data}
              dataKey={collection}
              handleFetchMore={handleFetchMore}
              isLoadingMore={loading}
            />
          </LoadingWrapper>
        </div>
      </div>
    </ViewWrapper>
  );
};
