import React from "react";

import "./style.scss";

const Footer = (): React.ReactElement => {
  return (
    <div className="footer menu">
      Enjoying this app? Found a bug? Reach me on{" "}
      <a href="https://twitter.com/harrisoncramer">Twitter</a>
    </div>
  );
};

export default Footer;
