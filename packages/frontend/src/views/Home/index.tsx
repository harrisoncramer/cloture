import React, { useState, useRef } from "react";
import moment from "moment";

import CollectionSelectors from "../../components/CollectionSelectors";
import MTextBox from "../../components/MTextBox";
import BigCalendar from "../../components/BigCalendar";
import ViewWrapper from "../../components/ViewWrapper";
import {
  useQueryParam,
  StringParam,
  BooleanParam,
  DateParam,
} from "use-query-params";

import "./styles.scss";

export const Home = () => {
  const [filter, setFilter] = useQueryParam("filter", StringParam);
  const [view, setView] = useQueryParam("view", StringParam);
  const today = useRef(moment().startOf("day").toDate()).current;
  const early = useRef(moment("7:30", "h:mm").toDate()).current;
  const [minDate, setMinDate] = useQueryParam("minDate", DateParam);
  const [maxDate, setMaxDate] = useQueryParam("maxDate", DateParam);
  const [senate, setSenateSelected] = useQueryParam("senate", BooleanParam);
  const [house, setHouseSelected] = useQueryParam("house", BooleanParam);
  const setSenate = (e: boolean) => {
    setSenateSelected(e);
  };
  const setHouse = (e: boolean) => setHouseSelected(e);

  const handleSearch = (text: string) => {
    setFilter(text);
  };

  return (
    <ViewWrapper>
      <div className="homeFilters">
        <MTextBox
          filter={filter ?? ""}
          instant={true}
          callBack={handleSearch}
        />
        <CollectionSelectors
          house={house ?? true}
          senate={senate ?? true}
          setHouse={setHouse}
          setSenate={setSenate}
        />
      </div>
      <BigCalendar
        minDate={minDate ?? today}
        setMinDate={setMinDate}
        setMaxDate={setMaxDate}
        maxDate={maxDate ?? today}
        filter={filter ?? ""}
        house={house ?? true}
        senate={senate ?? true}
        early={early}
        view={view ?? "month"}
        setView={setView}
      />
    </ViewWrapper>
  );
};
