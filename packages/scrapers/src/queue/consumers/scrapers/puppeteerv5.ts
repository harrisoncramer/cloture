import puppeteer from "puppeteer";
import randomUser from "random-useragent";

// Import job types
import { HouseJob, SenateJob, V5 } from "../../jobs";

import { getLinks, getPageDataWithJQuery, getPageText } from "./common";
import {
  setPageScripts,
  openNewPages,
  setPageBlockers,
  setInitialPage,
} from "./navigation";

export const puppeteerv5 = async (
  browser: puppeteer.Browser,
  job: HouseJob<V5> | SenateJob<V5>
) => {
  const page: puppeteer.Page = await setInitialPage(browser, job.link);

  let links;
  let pages;
  let pageData;

  try {
    links = await getLinks({
      page,
      selectors: job.details.layerOne,
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
      selectors: job.details.layerTwo,
    });
  } catch (err) {
    console.error("Could not get pageData. ", err);
    throw err;
  }

  try {
    let pages = await browser.pages();
    await Promise.all(
      pages.map(async (page, i) => i > 0 && (await page.close()))
    );
  } catch (err) {
    console.error("Could not close pages. ", err);
    throw err;
  }

  return pageData;
};
