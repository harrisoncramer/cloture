import puppeteer from "puppeteer";
import randomUser from "random-useragent";

// Import job types
import { HouseJob, SenateJob, V4 } from "../../jobs";

import { getLinksAndDataV4, getPageText } from "./common";
import { setPageScripts, setPageBlockers, setInitialPage } from "./navigation";

export const puppeteerv4 = async (
  browser: puppeteer.Browser,
  job: HouseJob<V4> | SenateJob<V4>
) => {
  const page: puppeteer.Page = await setInitialPage(browser, job.link);

  let dataWithLinks;

  try {
    dataWithLinks = await getLinksAndDataV4({
      page,
      selectors: job.details.layerOne,
    });
  } catch (err) {
    console.error("Could not get links. ", err);
    throw err;
  }

  try {
    dataWithLinks = await Promise.all(
      dataWithLinks.map(async (datum: any) => {
        let page = await browser.newPage();
        await setPageBlockers(page);
        await page.goto(job.link);
        await setPageScripts(page);
        let text = await getPageText(page);
        return { ...datum, text };
      })
    );
  } catch (err) {
    console.error("Could not get page text. ", err);
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

  return dataWithLinks;
};
