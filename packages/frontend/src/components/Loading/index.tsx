import React, { ReactElement } from "react";
import { CircularProgress } from "@material-ui/core";

const Loading = (): ReactElement => {
  return <CircularProgress className="loader" />;
};

export default Loading;
