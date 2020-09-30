import React, { ReactElement } from "react";
import { Paper } from "@material-ui/core";
import { Committee } from "./index";
import { goToLink } from "../../util/index";
import moment from "moment";

import { houseCommittees } from "../../statics";

export interface DataCardProps {
  datum: Committee;
}

const DataCard = ({ datum }: DataCardProps): ReactElement => {
  const title =
    datum.title.slice(0, 250) + (datum.title.length > 250 ? "..." : "");
  const committee = houseCommittees.find((x) => x.value === datum.committee);

  return (
    <Paper className="card pointer" onClick={() => goToLink(datum.link)}>
      <div className="title menu">{title}</div>
      <div className="content-container">
        <p>
          <span>Date:</span> {moment(datum.date).format("MMMM DD, YYYY")}
        </p>
        <p>
          <span>Time:</span> {moment(datum.time).format("h:mm a")}
        </p>
        {datum.location && (
          <p>
            <span>Location:</span> {datum.location}
          </p>
        )}
        {committee && <p>{committee.label}</p>}
      </div>
    </Paper>
  );
};
export default DataCard;
