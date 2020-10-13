import Bull from "bull";
import { pickScraper } from "./util";
import setupPuppeteer from "../../setupPuppeteer";
import { Queue } from "bull";
// EDIT -- This is not the correct type becuase of casting the time/date to strings.
import { Committee } from "../../types/shared";

export interface GoodResult {
  data: Committee[];
  meta: {
    committee: string;
    collection: "houseCommittee" | "senateCommittee";
  };
}

export interface E {
  error: string;
  errMsg: string;
}

// Accept the data from our producer.
// Use that data in the puppeteer instance, and pass the scraped data to the listener with the return statement.
export const consumers = async (queue: Queue): Promise<void> => {
  const browser = await setupPuppeteer();
  queue.process(
    "*",
    async (job: Bull.Job): Promise<GoodResult | E> => {
      try {
        // Pick the instance of the scraper we'd like to use
        const scraper = pickScraper(job.data.details.version);

        // Run the scraper, getting an array of committees
        const data: Committee[] = await scraper(browser, job.data);

        // Return the data from the scraper and the metadata from the job to the listener.  The collection will be used to choose whether to use the senate or house resolver.  The committee will be saved with the document
        return {
          data,
          meta: {
            committee: job.data.committee,
            collection: job.data.collection,
          },
        };
      } catch (err) {
        // If there are any errors, close all the pages from the job and return the error
        const oldPages = await browser.pages();
        await Promise.all(
          oldPages.map(async (page, i) => i > 0 && (await page.close()))
        );
        return {
          error: `${job.id} for ${job.name} errored.`,
          errMsg: err.message,
        };
      }
    }
  );
};
