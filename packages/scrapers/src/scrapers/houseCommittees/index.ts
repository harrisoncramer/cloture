//@ts-nocheck
import { HouseJobTypes } from "./jobs";
import { setupPuppeteer } from "../../puppeteer";
import { Result } from "./routines/common";
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
  let res: Result[] = [];
  switch (data.details.version) {
    case "puppeteerv1":
      res = await puppeteerv1(browser, data);
    case "puppeteerv2":
      res = await puppeteerv2(browser, data);
    case "puppeteerv3":
      res = await puppeteerv3(browser, data);
    case "puppeteerv4":
      res = await puppeteerv4(browser, data);
    case "puppeteerv5":
      res = await puppeteerv5(browser, data);
    case "puppeteerv6":
      res = await puppeteerv6(browser, data);
  }

  console.log(res);
};
