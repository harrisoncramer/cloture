//@ts-nocheck
import { HouseJobTypes } from "./jobs";
import { setupPuppeteer } from "../../puppeteer";
import { setInitialPage } from "./routines/common";
import {
  puppeteerv1,
  puppeteerv2,
  puppeteerv3,
  puppeteerv4,
  puppeteerv5,
  puppeteerv6,
} from "./routines";

export const houseCommittees = async (data: HouseJobTypes): Promise<void> => {
  const browser = await setupPuppeteer();
  const page = await setInitialPage(browser);
  try {
    switch (data.details.version) {
      case "puppeteerv1":
        await puppeteerv1(browser, page, data);
        break;
      case "puppeteerv2":
        await puppeteerv2(browser, page, data);
        break;
      case "puppeteerv3":
        await puppeteerv3(browser, page, data);
        break;
      case "puppeteerv4":
        await puppeteerv4(browser, page, data);
        break;
      case "puppeteerv5":
        await puppeteerv5(browser, page, data);
        break;
      case "puppeteerv6":
        await puppeteerv6(browser, page, data);
        break;
    }
    console.log("CLOSING BROWSER");
    await browser.close();
  } catch (err) {
    console.error(`Error running job ${data.name}`);
    await browser.close();
    throw new Error(err);
  }
};
