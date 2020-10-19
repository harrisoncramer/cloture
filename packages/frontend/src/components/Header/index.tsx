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
        <meta name="title" property="og:title" content="Cloture" />
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
