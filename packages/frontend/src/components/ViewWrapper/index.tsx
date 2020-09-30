import React from "react";
import Header from "../Header";

interface ViewWrapperProps {
  children: JSX.Element[] | JSX.Element;
}

const ViewWrapper = ({ children }: ViewWrapperProps): React.ReactElement => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ViewWrapper;
