import puppeteer from "puppeteer";

// Import job types
import { houseJob } from "../../jobs/house";
import { senateJob } from "../../jobs/senate";

import { getLinks, getPageDataWithJQuery } from "./common";
import { openNewPages, setInitialPage } from "./configuration";

export const puppeteerv5 = async (
  browser: puppeteer.Browser,
  job: houseJob | senateJob
) => {
  const page: puppeteer.Page = await setInitialPage(browser, job.link);

  let links;
  let pages;
  let pageData;

  try {
    links = await getLinks({
      page,
      selectors: job.details.selectors.layerOne,
    });
  } catch (err) {
    console.error("Could not get links. ", err);
    throw err;
  }

  try {
    pages = await openNewPages(browser, links);
  } catch (err) {
    console.error("Could not navigate to pages. ", err);
    throw err;
  }

  try {
    pageData = await getPageDataWithJQuery({
      pages,
      selectors: job.details.selectors.layerTwo,
    });
  } catch (err) {
    console.error("Could not get pageData. ", err);
    throw err;
  }

  try {
    const pages = await browser.pages();
    await Promise.all(
      pages.map(async (page, i) => i > 0 && (await page.close()))
    );
  } catch (err) {
    console.error("Could not close pages. ", err);
    throw err;
  }

  return pageData;
};
