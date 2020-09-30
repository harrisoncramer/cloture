//@ts-nocheck
import puppeteer from "puppeteer";
import { setPageBlockers, setPageScripts } from "../configuration";

// EDIT Need to refactor and make selectors type more specific
interface linkArgs {
  page: puppeteer.Page;
  selectors: any;
}

// EDIT Need to refactor and make selectors type more specific
interface linkArgsMultiPages {
  pages: puppeteer.Page[];
  selectors: any;
}

// EDIT NEED TO CHANGE FUNCTIONS THAT BREAK OR RELY ON JQUERY

// These functions are passed into the page context.
export const getLinksFiltered = async ({ page, selectors }: linkArgs) =>
  page.evaluate((selectors) => {
    let rows = makeArrayFromDocument(selectors.rows);
    const regexSelector = new RegExp(selectors.filter.keyword, "i");
    let filteredRows = rows.filter((row) => {
      let text = getFromText(row, selectors.filter.selector);
      if (text) {
        return !!text.match(regexSelector);
      }
      return false;
    });
    let links = filteredRows.map((x) => getLink(x));
    return links.filter((x, i) => i + 1 <= selectors.depth && x); // Only return pages w/in depth range, prevents overfetching w/ puppeteer (and where x !== null)
  }, selectors);

export const getLinks = async ({ page, selectors }: linkArgs) =>
  page.evaluate((selectors) => {
    let rows = makeArrayFromDocument(selectors.rows);
    let links = rows.map((x) => getLink(x));
    return links.filter((x, i) => i + 1 <= selectors.depth && x); // Only return pages w/in depth range, prevents overfetching w/ puppeteer (and where x !== null)
  }, selectors);

export const getPageText = async (page: puppeteer.Page) =>
  page.evaluate(() => {
    return document.body.innerText.replace(/[\s,\t\,\n]+/g, " ");
  });

export const getLinksAndDatav2 = async ({ page, selectors }: linkArgs) =>
  page.evaluate((selectors) => {
    let rows = makeArrayFromDocument(selectors.rows);
    return rows
      .filter((x, i) => i + 1 <= selectors.depth)
      .map((x) => {
        let link = getLink(x);
        let title = getLinkText(x);
        let date;
        let time;
        let innerText = (x as HTMLElement).innerText.trim();
        let myTimeRegex = new RegExp(
          /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp]\.?[Mm]\.?)?)/
        );
        let myDateRegex = new RegExp(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/, "gi");
        let isDate = innerText.match(myDateRegex);
        let isTime = innerText.match(myTimeRegex);
        if (isDate) {
          date = isDate[0];
        }

        if (isTime) {
          time = isTime[0];
        }

        return { link, title, date, time };
      });
  }, selectors);

export const getPageData = async ({ pages, selectors }: linkArgsMultiPages) =>
  await Promise.all(
    pages.map(async (page) =>
      page.evaluate((selectors) => {
        let title = getTextFromDocument(selectors.title);
        if (selectors.titleTrimRegex) {
          let titleRegex = new RegExp(selectors.titleTrimRegex, "i");
          title && title.replace(titleRegex, "");
        }
        let date = null;
        let time = null;
        let location = null;

        if (selectors.date) {
          date = selectors.date.label
            ? getNextTextFromDocument(selectors.date.value)
            : getTextFromDocument(selectors.date.value);
        }
        if (selectors.location) {
          location = selectors.location.label
            ? getNextTextFromDocument(selectors.location.value)
            : getTextFromDocument(selectors.location.value);
        }
        if (selectors.time) {
          time = selectors.time.label
            ? getNextTextFromDocument(selectors.time.value)
            : getTextFromDocument(selectors.time.value);
        }
        if (selectors.regexTime) {
          let myTimeRegex = new RegExp(
            /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp]\.?[Mm]\.?)?)/
          );
          let isMatch = document.body.innerText.match(myTimeRegex);
          if (!isMatch) {
            time = null;
          } else {
            time = isMatch[0];
          }
        }
        if (selectors.regexDate) {
          let myDateRegex = new RegExp(
            /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)?,? ?(January|February|March|April|May|June|July|August|September|October|November|December) ([0-9][0-9]?),? \d\d\d\d/,
            "gi"
          );
          let isMatch = document.body.innerText.match(myDateRegex);
          if (!isMatch) {
            date = null;
          } else {
            date = isMatch[0];
          }
        }

        if (selectors.splitDate) {
          // If data includes splitDate...
          time = date ? date.split(selectors.splitDate)[1] : null; // If date isn't found...
          date = date ? date.split(selectors.splitDate)[0] : null;
        }
        let link = document.URL;
        let text = document.body.innerText.replace(/[\s,\t\,\n]+/g, " ");

        return {
          title,
          date,
          time,
          location,
          link,
          text,
        };
      }, selectors)
    )
  );

export const getPageDataWithJQuery = async ({
  pages,
  selectors,
}: linkArgsMultiPages) =>
  Promise.all(
    pages.map(async (page) => {
      return page.evaluate((selectors) => {
        let title = getTextFromDocument(selectors.title);
        // This complicated function turns the location, date, and time into an array
        let info = $(selectors.jquerySelector)
          .contents()[1]
          .textContent.split("\n")
          .map((x: string) => x.trim())
          .filter((x: string) => x !== "" && x !== "@" && x !== "0");
        let location =
          selectors.locationIndex === null
            ? null
            : info[selectors.locationIndex];
        let date =
          selectors.dateIndex === null ? null : info[selectors.dateIndex];
        let time =
          selectors.timeIndex === null ? null : info[selectors.timeIndex];
        let link = document.URL;
        let text = document.body.innerText.replace(/[\s,\t\,\n]+/g, " ");
        return {
          title,
          date,
          time,
          location,
          link,
          text,
        };
      }, selectors);
    })
  );

export const getLinksAndData = async ({ page, selectors }: linkArgs) =>
  page.evaluate((selectors) => {
    let rows = makeArrayFromDocument(selectors.rows);
    return rows
      .filter((x, i) => i + 1 <= selectors.depth)
      .map((x) => {
        let link = getLink(x);
        let title = getLinkText(x);
        let location = getFromText(x, selectors.location);
        let date;
        let time;
        if (selectors.time) {
          time = getNthInstanceOfText(
            x,
            selectors.time.selector,
            selectors.time.instance
          );
        }
        if (selectors.date) {
          date = getNthInstanceOfText(
            x,
            selectors.date.selector,
            selectors.date.instance
          );
        }
        if (selectors.splitDate) {
          // If data includes splitDate...
          time = date && date.split(selectors.splitDate)[1];
          date = date && date.split(selectors.splitDate)[0];
        }
        return { link, title, location, date, time };
      });
  }, selectors);

export const getLinksAndDataV4 = async ({ page, selectors }: linkArgs) =>
  page.evaluate((selectors) => {
    let rows = Array.from(
      document
        .querySelector(selectors.upcomingHearings)
        .querySelectorAll(selectors.hearings)
    );
    return rows
      .filter((x, i) => i + 1 <= selectors.depth)
      .map((x) => {
        let link = getLink(x);
        let title = getLinkText(x);
        let dateAndTimeInfo = getFromText(x, selectors.dateTime)
          .split("-")
          .map((x: string) => x.trim());
        let date = dateAndTimeInfo[0];
        let time = dateAndTimeInfo[1];
        let location = getFromText(x, selectors.location);
        return { link, title, date, time, location };
      });
  }, selectors);
