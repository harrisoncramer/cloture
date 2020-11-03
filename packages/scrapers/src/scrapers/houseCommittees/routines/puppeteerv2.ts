import puppeteer from "puppeteer";

import { getLinksAndData, getPageText, setPageBlockers } from "./common";

// Import job types
import { HouseJob, V2 } from "../jobs";

export const puppeteerv2 = async (
  browser: puppeteer.Browser,
  page: puppeteer.Page,
  job: HouseJob<V2>
) => {
  await page.goto(job.link);

  let dataWithLinks;

  try {
    dataWithLinks = await getLinksAndData({
      page,
      selectors: job.details.layerOne,
      origin: job.origin,
    });
  } catch (err) {
    console.error("Could not get links. ", err);
    throw err;
  }

  try {
    dataWithLinks = await Promise.all(
      dataWithLinks.map(async (datum: any) => {
        const page = await browser.newPage();
        await setPageBlockers(page);
        await page.goto(datum.link);
        const text = await getPageText(page);
        return { ...datum, text };
      })
    );
  } catch (err) {
    console.error("Could not get page text. ", err);
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

  return dataWithLinks;
};
