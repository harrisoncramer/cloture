import puppeteer from "puppeteer";

// Import job types
import { HouseJob, V5 } from "../jobs";

import { getLinks, getPageDataWithJQuery, openNewPages } from "./common";

export const puppeteerv5 = async (
  browser: puppeteer.Browser,
  page: puppeteer.Page,
  job: HouseJob<V5>
) => {
  const link = new URL(job.link);
  await page.goto(link.href);

  let links;
  let pages;
  let pageData;

  try {
    links = await getLinks({
      page,
      selectors: job.details.layerOne,
      origin: job.link,
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
