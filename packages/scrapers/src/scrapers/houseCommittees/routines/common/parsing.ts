import puppeteer from "puppeteer";

// Helper functions (for typescript checking...)
import {
  makeArrayFromDocument,
  getFromText,
  getLink,
  getTextFromDocument,
  getNextTextFromDocument,
  getNthInstanceOfText,
  getLinkText,
  clean,
} from "./functions";

//// The main body of the scrapers
import { V1, V2, V3, V5, RowsAndDepth } from "../../jobs";

type StringOrNull = string | null;
export interface Result {
  title: StringOrNull;
  link: StringOrNull;
  date: StringOrNull;
  time?: StringOrNull;
  text?: StringOrNull;
  location?: StringOrNull;
}

interface linkArgs {
  page: puppeteer.Page;
  selectors: RowsAndDepth;
}

// Only return rows with specific text in them
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
    return links.filter((x, i) => i + 1 <= selectors.depth && x);
  }, selectors);

// Return all links in a given row of items with a specified depth
export const getLinks = async ({
  page,
  selectors,
}: linkArgs): Promise<(string | null)[]> =>
  page.evaluate((selectors: RowsAndDepth) => {
    let rows = makeArrayFromDocument(selectors.rows);
    let links = rows.map((x) => getLink(x));
    return links.filter((x, i) => i + 1 <= selectors.depth && x); // Only return pages w/in depth
  }, selectors);

// Get the full text of the page
export const getPageText = async (page: puppeteer.Page): Promise<string> =>
  page.evaluate(() => {
    return document.body.innerText.replace(/[\s,\t\,\n]+/g, " ");
  });

// The main function that runs to scrape data from every subpage
interface GetPageDataParams {
  pages: puppeteer.Page[];
  selectors: V1["layerTwo"];
}

export const getPageData = async ({
  pages,
  selectors,
}: GetPageDataParams): Promise<Result[]> =>
  await Promise.all(
    pages.map(async (page) =>
      page.evaluate((selectors: GetPageDataParams["selectors"]) => {
        let link = document.URL;
        let text = document.body.innerText.replace(/[\s,\t\,\n]+/g, " ");
        let title = getTextFromDocument(selectors.title);
        if (selectors.titleTrimRegex) {
          let titleRegex = new RegExp(selectors.titleTrimRegex, "i");
          title && title.replace(titleRegex, "");
        }

        if (selectors.location) {
          var location = selectors.location.label
            ? getNextTextFromDocument(selectors.location.value)
            : getTextFromDocument(selectors.location.value);
        } else {
          var location: string | null = null;
        }

        // If date is merely "true" then search by Regex
        if (typeof selectors.date === "boolean") {
          let myDateRegex = new RegExp(
            /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)?,? ?(January|February|March|April|May|June|July|August|September|October|November|December) ([0-9][0-9]?),? \d\d\d\d/,
            "gi"
          );
          let isMatch = document.body.innerText.match(myDateRegex);
          var date = isMatch ? isMatch[0] : null;
        } else {
          var date = selectors.date.label
            ? getNextTextFromDocument(selectors.date.value)
            : getTextFromDocument(selectors.date.value);
        }

        // If time is merely "true" then search by Regex. If it's not boolean but exists, use label value
        let time: string | null = null;
        if (typeof selectors.time === "boolean") {
          let myTimeRegex = new RegExp(
            /((1[0-2]|0?[1-9])():([0-5][0-9]) ?([AaPp]\.?[Mm]\.?)?)|((1[0-2]|0?[1-9])().([0-5][0-9]) ([AaPp]\.?[Mm]\.))/
          );
          let isMatch = document.body.innerText.match(myTimeRegex);
          time = isMatch ? isMatch[0] : null;
        } else if (selectors.time) {
          time = selectors.time.label
            ? getNextTextFromDocument(selectors.time.value)
            : getTextFromDocument(selectors.time.value);
        }

        // If data includes split date, reassign time + date
        if (selectors.splitDate) {
          time = date && clean(date.split(selectors.splitDate)[1]);
          date = date && clean(date.split(selectors.splitDate)[0]);
        }

        return {
          title,
          date,
          time,
          location,
          link,
          text,
        };
        //@ts-ignore
      }, selectors)
    )
  );

interface GetPageDataWithJQueryInterface {
  pages: puppeteer.Page[];
  selectors: V5["layerTwo"];
}
export const getPageDataWithJQuery = async ({
  pages,
  selectors,
}: GetPageDataWithJQueryInterface) =>
  Promise.all(
    pages.map(async (page) => {
      return page.evaluate(
        (selectors: GetPageDataWithJQueryInterface["selectors"]) => {
          let title = getTextFromDocument(selectors.title);
          //@ts-ignore
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
        },
        selectors
      );
    })
  );

export const getLinksAndData = async ({
  page,
  selectors,
}: {
  page: puppeteer.Page;
  selectors: V2["layerOne"];
}): Promise<Result[]> =>
  page.evaluate((selectors: V2["layerOne"]) => {
    let rows = makeArrayFromDocument(selectors.rows);
    return rows
      .filter((x, i) => i + 1 <= selectors.depth)
      .map((x) => {
        let link = getLink(x);
        let title = getLinkText(x);
        let location = selectors.location
          ? getFromText(x, selectors.location)
          : null;
        let date = getNthInstanceOfText(
          x,
          selectors.date.selector,
          selectors.date.instance
        );

        let time = selectors.time
          ? getNthInstanceOfText(
              x,
              selectors.time.selector,
              selectors.time.instance
            )
          : null;

        // If data includes split date, reassign time + date
        if (selectors.splitDate) {
          time = date && clean(date.split(selectors.splitDate)[1]);
          date = date && clean(date.split(selectors.splitDate)[0]);
        }
        return { link, title, location, date, time };
      });
    //@ts-ignore
  }, selectors);

export const getLinksAndDatav2 = async ({
  page,
  selectors,
}: {
  page: puppeteer.Page;
  selectors: V3["layerOne"];
}) =>
  page.evaluate((selectors: V2["layerOne"]) => {
    let rows = makeArrayFromDocument(selectors.rows);
    let filteredRows = rows
      .filter((x, i) => i + 1 <= selectors.depth)
      .map((x) => {
        let link = getLink(x);
        let title = getLinkText(x);
        let myTimeRegex = new RegExp(
          /((1[0-2]|0?[1-9])():([0-5][0-9]) ?([AaPp]\.?[Mm]\.?)?)|((1[0-2]|0?[1-9])().([0-5][0-9]) ([AaPp]\.?[Mm]\.))/
        );
        let myDateRegex = new RegExp(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/, "gi");
        let innerText = (x as HTMLElement).innerText.trim();
        let hasDate = innerText.match(myDateRegex);
        let hasTime = innerText.match(myTimeRegex);
        let time = hasTime ? hasTime[0] : null;
        let date = hasDate ? hasDate[0] : null;
        return { link, title, date, time };
      });
    return filteredRows;
  }, selectors);

interface GetLinksAndDataV4Args {
  page: puppeteer.Page;
  selectors: { depth: number };
}
export const getLinksAndDataV4 = async ({
  page,
  selectors,
}: GetLinksAndDataV4Args): Promise<Result[]> =>
  page.evaluate((selectors) => {
    let rows: Element[] = Array.from(
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
          ?.split("-")
          .map((x: string) => x.trim());
        let date = dateAndTimeInfo ? dateAndTimeInfo[0] : null;
        let time = dateAndTimeInfo ? dateAndTimeInfo[1] : null;
        let location = getFromText(x, selectors.location);
        return { link, title, date, time, location };
      });
  }, selectors);
