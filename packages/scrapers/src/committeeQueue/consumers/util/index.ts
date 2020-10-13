// Import the routines
import {
  puppeteerv1,
  puppeteerv2,
  puppeteerv3,
  puppeteerv4,
  puppeteerv5,
  puppeteerv6,
} from "../scrapers";

// This function accepts the string value from the job
// and returns the correct scraping routine.
export const pickScraper = (kind: string) =>
  ((kind) => {
    switch (kind) {
      case "puppeteerv1":
        return puppeteerv1;
      case "puppeteerv2":
        return puppeteerv2;
      case "puppeteerv3":
        return puppeteerv3;
      case "puppeteerv4":
        return puppeteerv4;
      case "puppeteerv5":
        return puppeteerv5;
      case "puppeteerv6":
        return puppeteerv6;
      default:
        throw new Error("That routine doesn't exist!");
    }
  })(kind);
