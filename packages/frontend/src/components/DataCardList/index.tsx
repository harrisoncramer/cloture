import React, { ReactElement } from "react";
import DataCard from "./DataCard";
import { Waypoint } from "react-waypoint";
import LoadingWrapper from "../LoadingWrapper";

import "./style.scss";

// Stolen from backend...
export interface Committee {
  title: string;
  link: string;
  date: Date;
  time: Date;
  text: string;
  location?: string;
  committee?: string;
}

type Data = {
  [key: string]: Committee[];
};

interface Tvars {
  ok: string;
}

export interface DataCardListProps {
  data: Data;
  dataKey: string;
  handleFetchMore: (listLength: number) => void;
  isLoadingMore: boolean;
}

const DataCardList = ({
  data,
  dataKey,
  handleFetchMore,
  isLoadingMore,
}: DataCardListProps): ReactElement => {
  // Get data by value name based on GQL query...
  const dataList = data[dataKey].length > 0 ? data[dataKey] : null;
  return (
    <div className="dataCardList">
      <div className="content">
        {dataList ? (
          dataList.map((val, i) => {
            if (i === dataList.length - 5) {
              return (
                <div key={i}>
                  <Waypoint onEnter={() => handleFetchMore(dataList.length)} />
                  <DataCard key={i} datum={val} />
                </div>
              );
            } else {
              return <DataCard key={i} datum={val} />;
            }
          })
        ) : (
          <p>No data found</p>
        )}
        {isLoadingMore && <LoadingWrapper loading={isLoadingMore} />}
      </div>
    </div>
  );
};
export default DataCardList;
