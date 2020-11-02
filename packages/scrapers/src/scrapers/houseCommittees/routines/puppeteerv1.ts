import puppeteer from "puppeteer";

// Import common functions for all scrapers and for page-specific logic
import { getPageData, getLinks, setInitialPage, openNewPages } from "./common";

import { HouseJob, V1 } from "../jobs";

export const puppeteerv1 = async (
  browser: puppeteer.Browser,
  job: HouseJob<V1>
) => {
  // Setup puppeteer page for the job
  const page: puppeteer.Page = await setInitialPage(browser, job.link);

  let links: (string | null)[];
  let pages: puppeteer.Page[] | null;
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
