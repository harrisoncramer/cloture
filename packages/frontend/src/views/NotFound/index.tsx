import React from "react";

import ViewWrapper from "../../components/ViewWrapper";
interface NotFoundProps {}

export const NotFound = (props: NotFoundProps) => {
  return (
    <ViewWrapper>
      <p>Sorry, that page could not be found.</p>
    </ViewWrapper>
  );
};
