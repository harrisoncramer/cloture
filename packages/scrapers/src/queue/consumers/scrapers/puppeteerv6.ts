import puppeteer from "puppeteer";
import randomUser from "random-useragent";

// Import job types
import { HouseJob, SenateJob, V6 } from "../../jobs";

import { getPageData, getLinksFiltered } from "./common";
import {
  setPageScripts,
  setPageBlockers,
  setInitialPage,
  openNewPages,
} from "./navigation";

export const puppeteerv6 = async (
  browser: puppeteer.Browser,
  job: HouseJob<V6> | SenateJob<V6>
) => {
  // Setup puppeteer page for the job
  const page: puppeteer.Page = await setInitialPage(browser, job.link);

  let links;
  let pages;
  let pageData;

  try {
    links = await getLinksFiltered({
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
    pageData = await getPageData({
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
