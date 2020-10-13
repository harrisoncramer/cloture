import puppeteer from "puppeteer";

// These are the helper functions. They are transpiled into javascript (into the build folder) which is then attached to the puppeteer window.
// They are not set in a separate file due to this puppeteer issue.
// The main scraper functions are listed below
const clean = (item: string | undefined | null) =>
  item ? item.replace(/\s\s+/g, " ").trim() : null;

const getLink = (node: Element) => {
  let link = node.querySelector("a");
  return link ? link.href : null;
};

const getLinkText = (node: Element) => {
  const link = node.querySelector("a");
  return link ? clean(link.textContent) : null;
};

const getNodeFromDocument = (query: string) => document.querySelector(query);

const getNextNodeFromDocument = (query: string) => {
  const node = document.querySelector(query);
  return node ? node.nextSibling : null;
};

const getTextFromDocument = (query: string) => {
  const node = document.querySelector(query);
  return node ? clean(node.textContent) : null;
};

const getNextTextFromDocument = (query: string) => {
  const node = document.querySelector(query);
  const nextSibling = node?.nextSibling?.textContent?.trim();
  return clean(nextSibling);
};

const getNextElementSiblingTextFromDocument = (query: string) =>
  clean(document.querySelector(query)?.nextElementSibling?.textContent?.trim());

const makeArrayFromDocument = (query: string) =>
  Array.from(document.querySelectorAll(query));

const makeCleanArrayFromDocument = (query: string) =>
  Array.from(document.querySelectorAll(query)).map((x) =>
    clean(x.textContent ? x.textContent.trim() : null)
  );

const getFromNode = (node: Element, query: string) => node.querySelector(query);

const getFromText = (node: Element, query: string) =>
  clean(node.querySelector(query)?.textContent?.trim());

const getFromLink = (node: Element) => node.querySelector("a")?.href;

const getNextMatch = (node: Element, query: string) =>
  node.querySelector(query)?.nextSibling?.nodeValue;

const getNextElementSiblingText = (query: string) =>
  clean(document.querySelector(query)?.nextElementSibling?.textContent?.trim());

const getNodesFromArray = (arr: Element[], query: string) =>
  arr.map((x) => Array.from(x.querySelectorAll(query)));

const makeTextArray = (node: Element, query: string) =>
  Array.from(node.querySelectorAll(query)).map((x) =>
    clean(x.textContent ? x.textContent.trim() : null)
  );

//
//// The main body of the scrapers
//

const getNthInstanceOfText = (node: Element, query: string, num: number) =>
  node.querySelectorAll(query)[num]?.textContent;

export const getNthInstanceOf = (
  node: Element,
  query: string,
  num: number
): Element | undefined => node.querySelectorAll(query)[num];

import { V1, V2, V3, V4, V5, V6, RowsAndDepth } from "../../../jobs/types";

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
