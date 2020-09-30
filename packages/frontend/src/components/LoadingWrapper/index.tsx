import React from "react";
import { ApolloError } from "@apollo/client";
import Loading from "../Loading";

import "./styles.scss";

interface LoadingWrapperProps {
  children?: JSX.Element[] | JSX.Element;
  loading?: boolean;
  error?: ApolloError | undefined;
  isDisabled?: boolean;
}

const LoadingWrapper = ({
  children,
  loading,
  error,
  isDisabled,
}: LoadingWrapperProps): React.ReactElement => {
  // If loading message or error message is supplied, provide loading or error screen. Otherwise, send children.
  // Send children right away if wrapper is disabled.
  if (!isDisabled) {
    if (loading)
      return (
        <div className="loadingSpinner">
          <Loading />
        </div>
      );
    if (error) return <p>`Error! ${error.message}`</p>;
    return <>{children}</>;
  } else {
    return <>{children}</>;
  }
};

export default LoadingWrapper;
