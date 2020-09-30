import { useRef, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  useQueryParam,
  StringParam,
  ArrayParam,
  DateParam,
} from "use-query-params";
import {
  HOUSE_COMMITTEES,
  SENATE_COMMITTEES,
  ALL_HOUSE_COMMITTEES,
  ALL_SENATE_COMMITTEES,
} from "../graphql/queries";
import { houseCommittees, senateCommittees } from "../statics";

//type collectionTypes = "houseCommittees" | "senateCommittees";
const getCollectionOptions = (collection: string) => {
  if (collection === "houseCommittees") {
    return { gqlQuery: HOUSE_COMMITTEES, selectOptions: houseCommittees };
  }
  if (collection === "senateCommittees") {
    return { gqlQuery: SENATE_COMMITTEES, selectOptions: senateCommittees };
  } else {
    return { gqlQuery: SENATE_COMMITTEES, selectOptions: senateCommittees };
  }
};

// The GQL Query...
export const useDashboardState = (collection: string) => {
  // Get various parameters from query string
  const [filter, setFilter] = useQueryParam("filter", StringParam);
  const [minDate, setMinDate] = useQueryParam("minDate", DateParam);
  const [maxDate, setMaxDate] = useQueryParam("maxDate", DateParam);
  const [subcollections, setSubcollections] = useQueryParam(
    "subcollections",
    ArrayParam
  );

  const { gqlQuery, selectOptions } = getCollectionOptions(collection);

  // Get the query string and parse it, passing back the value as an array
  const handleSetSubcollections = (subcollections: string[]) => {
    setSubcollections(subcollections);
  };

  // Set skip and limit as state inside hook.
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  // If no dates are defined in URL (e.g. on first load), pass in current date.
  const today = useRef(new Date()).current;

  // Set future date limit based on today
  const twoMonthsFromToday = useRef(
    new Date(new Date().setMonth(today.getMonth() + 2))
  ).current;

  // Conduct Apollo query
  const { loading, error, data, fetchMore } = useQuery(gqlQuery, {
    variables: {
      committee: subcollections,
      minDate: minDate || today.toISOString(),
      maxDate: maxDate || today.toISOString(),
      text: filter,
      skip: skip,
      limit: limit,
    },
    notifyOnNetworkStatusChange: true,
  });

  // Return the results of the query
  // Return all setters + values for use inside the component
  return {
    loading,
    error,
    data,
    fetchMore,
    today,
    twoMonthsFromToday,
    filter,
    setFilter,
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
    subcollections,
    selectOptions,
    setSubcollections: handleSetSubcollections,
    setSkip,
    setLimit,
  };
};

export interface homeStateProps {
  minDate: Date;
  maxDate: Date;
  house: boolean;
  senate: boolean;
}

export const useHomeState = ({
  minDate,
  maxDate,
  house,
  senate,
}: homeStateProps) => {
  const {
    fetchMore: fetchMoreHouse,
    loading: houseCommitteesLoading,
    data: houseCommitteesData,
  } = useQuery(ALL_HOUSE_COMMITTEES, {
    variables: {
      minDate,
      maxDate,
      skip: house ? 0 : 1000,
      limit: 1000,
    },
  });

  const {
    fetchMore: fetchMoreSenate,
    loading: senateCommitteesLoading,
    data: senateCommitteesData,
  } = useQuery(ALL_SENATE_COMMITTEES, {
    variables: {
      minDate,
      maxDate,
      skip: senate ? 0 : 1000,
      limit: 1000,
    },
  });

  // Pull off the data inside if the result is returned.
  const houseCommittees = houseCommitteesData
    ? houseCommitteesData["allHouseCommittees"]
    : null;
  const senateCommittees = senateCommitteesData
    ? senateCommitteesData["allSenateCommittees"]
    : null;

  return {
    // If either result is still loading, return loading
    loading: senateCommitteesLoading || houseCommitteesLoading,
    // Once both data are non-null, concatenate them and return
    data:
      houseCommittees && senateCommittees
        ? [...houseCommittees, ...senateCommittees]
        : null,
    // How can we implement a re-run of this complicated hook that makes multiple queries?
    //fetchMoreHouse,
    //fetchMoreSenate,
  };
};
