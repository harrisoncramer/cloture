import React from "react";

import ViewWrapper from "../../components/ViewWrapper";
import "./styles.scss";

export const About = () => {
  return (
    <ViewWrapper>
      <div className="about-wrapper menu">
        <h2>Welcome to Cloture!</h2>
        <p className="about-paragraph body">
          This application was designed to help journalists track and research
          congressional committees, and quickly access hearing information. It
          provides a user-friendly wrapper around congressional hearing websites
          to make them easier to navigate.
        </p>
        <p className="about-paragraph body">
          Data on this site updates about every half hour, and is scraped
          directly from the committee websites. As such, there may be instances
          where committee hearings are notified to the clerk and not immediately
          uploaded to this site. If you want to check, congress.gov has a
          repository of upcoming hearings (including those which are not posted
          on committee websites) available{" "}
          <a href="https://www.congress.gov/committee-schedule/weekly/2020/09/21?searchResultViewType=compact">
            here
          </a>
          .
        </p>
        <p className="about-paragraph body">
          The search feature on this site will allow you to search the text of
          committee webpages. However, the search function is <em>not</em> a
          complete search of the committee transcripts. The search feature is
          therefore useful for finding bill names, witnesses, and other
          information about a hearing, but should not be considered a fool-proof
          method for searching through the minutes of a given hearing for a
          specific keyword or phrase.
        </p>
        <p className="about-paragraph body">
          The data on this website is also not a complete index of historical
          hearing data. Most committees go back 5-10 years. This is largely due
          to the fact that the committee websites are constantly changing, and
          old committee hearing information is not always available. I am
          currently working on indexing committee transcripts too, but for now,
          please head to{" "}
          <a href="https://www.govinfo.gov/browse/committee">
            the Government Publishing Office
          </a>{" "}
          website for committee transcripts.
        </p>
        <p className="about-paragraph body">
          Finally, due to the way certain committee websites are structured,
          their full data is not available on this website. First, the House
          Intelligence Committee, which does not appear to post their committee
          hearing information regularly anywhere online other than with the{" "}
          <a href="https://www.congress.gov/committee-schedule/weekly/2020/09/21">
            clerk
          </a>{" "}
          and through irregular press releases. Second, the Senate Indian
          Affairs Committee does not allow for batch downloading of their data,
          so for historical information from those hearings please head to the{" "}
          <a href="https://www.indian.senate.gov">committee website</a>.
        </p>
        <p className="about-paragraph body">
          This project is fully open source and will always be so. If you would
          like to contribute to the code or notice a bug, you can{" "}
          <a href="https://www.twitter.com/harrisoncramer">contact me</a> or
          contribute directly to the{" "}
          <a href="https://github.com/KingOfCramers/ts_cloture.app.frontend">
            frontend
          </a>
          ,{" "}
          <a href="https://github.com/KingOfCramers/ts_cloture.app.backend">
            backend
          </a>
          , or the{" "}
          <a href="https://github.com/KingOfCramers/gql3.0_processors">web</a>{" "}
          <a href="https://github.com/KingOfCramers/gql3.0_schedulers">
            scrapers
          </a>
          . Thanks for your support!
        </p>
      </div>
    </ViewWrapper>
  );
};
