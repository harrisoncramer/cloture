import gql from "graphql-tag";

export const ALL_HOUSE_COMMITTEES = gql`
  query data(
    $minDate: DateTime!
    $maxDate: DateTime!
    $skip: Float!
    $limit: Float!
  ) {
    allHouseCommittees(
      input: {
        minDate: $minDate
        maxDate: $maxDate
        skip: $skip
        limit: $limit
      }
    ) {
      title
      link
      date
      time
      text
      committee
      __typename
    }
  }
`;

export const ALL_SENATE_COMMITTEES = gql`
  query data(
    $minDate: DateTime!
    $maxDate: DateTime!
    $skip: Float!
    $limit: Float!
  ) {
    allSenateCommittees(
      input: {
        minDate: $minDate
        maxDate: $maxDate
        skip: $skip
        limit: $limit
      }
    ) {
      title
      link
      date
      time
      text
      committee
      __typename
    }
  }
`;

export const HOUSE_COMMITTEES = gql`
  query data(
    $committee: [String!]
    $title: String
    $link: String
    $minDate: DateTime
    $maxDate: DateTime
    $minTime: DateTime
    $maxTime: DateTime
    $text: String
    $location: String
    $skip: Float!
    $limit: Float!
  ) {
    houseCommittees(
      input: {
        committee: $committee
        title: $title
        link: $link
        minDate: $minDate
        maxDate: $maxDate
        minTime: $minTime
        maxTime: $maxTime
        text: $text
        location: $location
        skip: $skip
        limit: $limit
      }
    ) {
      title
      link
      date
      time
      text
      location
      committee
    }
  }
`;

export const SENATE_COMMITTEES = gql`
  query data(
    $committee: [String!]
    $title: String
    $link: String
    $minDate: DateTime
    $maxDate: DateTime
    $minTime: DateTime
    $maxTime: DateTime
    $text: String
    $location: String
    $skip: Float!
    $limit: Float!
  ) {
    senateCommittees(
      input: {
        committee: $committee
        title: $title
        link: $link
        minDate: $minDate
        maxDate: $maxDate
        minTime: $minTime
        maxTime: $maxTime
        text: $text
        location: $location
        skip: $skip
        limit: $limit
      }
    ) {
      title
      link
      date
      time
      text
      location
      committee
    }
  }
`;

export const SENATE_COMMITTEE = gql`
  query data($committee: String, $title: String) {
    houseCommittee(committee: $committee, title: $title) {
      title
      link
      date
      time
      text
      location
    }
  }
`;

export const HOUSE_COMMITTEE = gql`
  query data($committee: String, $title: String) {
    senateCommittee(committee: $committee, title: $title) {
      title
      link
      date
      time
      text
      location
    }
  }
`;

//export const HOMEQUERY = gql`
//query data(
//$minDate: DateTime
//$maxDate: DateTime){
//houseCommittees(
//input: {
//committee: $committee
//title: $title
//link: $link
//minDate: $minDate
//maxDate: $maxDate
//minTime: $minTime
//maxTime: $maxTime
//text: $text
//location: $location
//skip: $skip
//limit: $limit
//}
//) {
//title
//link
//date
//time
//text
//location
//committee
//}
//}
//`;
