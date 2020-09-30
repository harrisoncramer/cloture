import puppeteer from "puppeteer";

// Import job types
import { houseJob } from "../../jobs/house";
import { senateJob } from "../../jobs/senate";

import { getLinksAndDataV4, getPageText } from "./common";
import {
  setPageScripts,
  setPageBlockers,
  setInitialPage,
} from "./configuration";

export const puppeteerv4 = async (
  browser: puppeteer.Browser,
  job: houseJob | senateJob
) => {
  const page: puppeteer.Page = await setInitialPage(browser, job.link);

  let dataWithLinks;

  try {
    dataWithLinks = await getLinksAndDataV4({
      page,
      selectors: job.details.selectors.layerOne,
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
        await page.goto(job.link);
        await setPageScripts(page);
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
