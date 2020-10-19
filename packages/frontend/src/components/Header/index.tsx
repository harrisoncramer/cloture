import React, { useState } from "react";
import { Drawer, IconButton } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import Menu from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import Links from "./links";
import { Helmet } from "react-helmet";

import "./style.scss";

const Header = (): React.ReactElement => {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <header className="header">
      <Helmet>
        <title>Cloture</title>
        <meta
          name="description"
          content="The webscraper for busy people on Capitol Hill."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open-graph Tags */}
        <meta name="title" property="og:title" content="Cloture" />
        <meta
          name="image"
          property="og:image"
          content="https://storage.googleapis.com/cloture/Cloture_Social.png"
        />
        <meta
          name="description"
          property="og:description"
          content="The webscraper for busy people on Capitol Hill."
        />
        <meta name="url" property="og:url" content="https://www.cloture.app" />
        {/* Social Tags for Twitter */}
        <meta
          name="twitter:card"
          content="The webscraper for busy people on Capitol Hill."
        />
        <meta name="twitter:site" content="@ClotureApp" />
        <meta
          name="twitter:title"
          content="The webscraper for busy people on Capitol Hill."
        />
        <meta
          name="twitter:description"
          content="Cloture lets you stay up-to-date on Capitol Hill."
        />
        <meta
          name="twitter:image"
          content="https://storage.googleapis.com/cloture/Cloture_Social.png"
        />
        <meta name="twitter:site" content="@ClotureApp" />
        <meta name="twitter:creator" content="@harrisoncramer" />
        {/* Other tags (location) */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Washington D.C." />
        <meta name="geo.position" content="38.889803;-77.009418" />
        <meta name="ICBM" content="38.889803, -77.009418" />
      </Helmet>
      <nav>
        <IconButton
          data-testid="menuButton"
          onClick={handleDrawerToggle}
          className="menuButton pointer"
        >
          <Menu />
        </IconButton>
        <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
          <h1 className="mainTitle pointer">Cloture</h1>
        </Link>
        <Drawer
          className="drawer"
          data-testid="drawer"
          anchor={"left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <IconButton
            data-testid="closeButton"
            className="close"
            onClick={handleDrawerToggle}
          >
            <Close />
          </IconButton>
          <Links
            setMobileOpen={setMobileOpen}
            links={[
              { label: "Calendar", link: "/" },
              { label: "House Data", link: "/dashboard/houseCommittees" },
              {
                label: "Senate Data",
                link: "/dashboard/senateCommittees",
              },
              { label: "About", link: "/about" },
            ]}
          />
        </Drawer>
      </nav>
    </header>
  );
};

export default Header;
