import puppeteer from "puppeteer";

// Import job types
import { HouseJob, V6 } from "../jobs";

import { getPageData, getLinksFiltered, openNewPages } from "./common";

export const puppeteerv6 = async (
  browser: puppeteer.Browser,
  page: puppeteer.Page,
  job: HouseJob<V6>
) => {
  const link = new URL(job.link);
  await page.goto(link.href);
  let links;
  let pages;
  let pageData;

  try {
    links = await getLinksFiltered({
      page,
      selectors: job.details.layerOne,
      origin: link.origin,
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
