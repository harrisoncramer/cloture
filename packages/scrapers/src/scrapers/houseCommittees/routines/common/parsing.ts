import cheerio from "cheerio";
import puppeteer from "puppeteer";

import { clean, getLink, getLinkText, getFromText } from "../common/functions";

//// The main body of the scrapers
import { V1, V2, V3, V5, V6, RowsAndDepth } from "../../jobs";

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
  origin: string;
}

export const getLinks = async ({
  page,
  selectors,
  origin,
}: linkArgs): Promise<(string | null)[]> => {
  const html = await page.evaluate(() => document.body.innerHTML);
  const $ = cheerio.load(html);
  const rows = $(selectors.rows)
    .toArray()
    .filter((x, i) => i + 1 <= selectors.depth);
  const links = rows.map((x) => {
    const target = $(x);
    const href = target.find("a").attr("href");
    const link = href ? origin.concat(href) : origin;
    return link;
  });
  console.log(`Links are: `, links);
  return links;
};

// Only return links that appear in rows with specific text
export const getLinksFiltered = async ({
  page,
  selectors,
  origin,
}: {
  page: puppeteer.Page;
  selectors: V6["layerOne"];
  origin: string;
}) => {
  const html = await page.evaluate(() => document.body.innerHTML);
  const $ = cheerio.load(html);
  const regexSelector = new RegExp(selectors.filter.keyword, "i");
  const filteredRows = $(selectors.rows)
    .toArray()
    .filter((row) => {
      const target = $(row);
      const hasMatch = target.text().match(regexSelector);
      if (hasMatch) {
        return true;
      } else {
        return false;
      }
    });

  const links = filteredRows
    .map((x) => {
      const target = $(x);
      const href = target.find("a").attr("href");
      const link = href ? origin.concat(href) : origin;
      return link;
    })
    .filter((x, i) => i + 1 <= selectors.depth && x);
  return links;
};

// Get the full text of the page
export const getPageText = async (page: puppeteer.Page): Promise<string> =>
  page.evaluate(() => {
    return document.body.innerText.replace(/[\s,\t,\n]+/g, " ");
  });

export const getLinksAndData = async ({
  page,
  selectors,
  origin,
}: {
  page: puppeteer.Page;
  selectors: V2["layerOne"];
  origin: string;
}): Promise<Result[]> => {
  const html = await page.evaluate(() => document.body.innerHTML);
  const $ = cheerio.load(html);
  const rows = $(selectors.rows)
    .toArray()
    .filter((x, i) => i + 1 <= selectors.depth)
    .map((x, i) => {
      const target = $(x);
      const href = target.find("a").attr("href") || null;
      const link = href ? origin.concat(href) : origin;
      const title = target
        .find("a")
        .first()
        .text()
        .replace(/[\s,\t,\n]+/g, " ");
      const location =
        (selectors.location &&
          target.find(selectors.location).first().text().trim()) ||
        null;
      let date: string | null = $(
        target
          .find(selectors.date.selector)
          .toArray()
          .find((x, i) => i === selectors.date.instance)
      )
        .text()
        .replace(/[\s,\t,\n]+/g, " ");
      let time = selectors.time
        ? $(
            target
              .find(selectors.time.selector)
              .toArray()
              .find((x, i) => i === selectors?.time?.instance)
          )
            .text()
            .replace(/[\s,\t,\n]+/g, " ")
        : null;
      if (selectors.splitDate) {
        time = date && clean(date.split(selectors.splitDate)[1]);
        date = date && clean(date.split(selectors.splitDate)[0]);
      }
      return { link, title, location, date, time };
    });
  console.log(`Rows completed ${rows.length}`);
  return rows;
};

export const getPageData = async ({
  pages,
  selectors,
}: GetPageDataParams): Promise<Result[]> =>
  await Promise.all(
    pages.map(async (page) => {
      const text = await page.evaluate(() =>
        document.body.innerText.replace(/[\s,\t,\n]+/g, " ")
      );
      const link = page.url();
      const html = await page.evaluate(() => document.body.innerHTML);
      const $ = cheerio.load(html);
      const title = $(selectors.title)
        .text()
        .replace(/[\s,\t,\n]+/g, " ");

      // If necessary, delete extra text froim title
      if (selectors.titleTrimRegex) {
        const titleRegex = new RegExp(selectors.titleTrimRegex, "i");
        title && title.replace(titleRegex, "");
      }

      let location: string | null = null;
      if (selectors.location) {
        location = selectors.location.label
          ? $(selectors.location.value)
              .text()
              .replace(/[\s,\t,\n]+/g, " ")
              .trim()
          : $(selectors.location.value)
              .text()
              .replace(/[\s,\t,\n]+/g, " ")
              .trim();
      }

      // If date is merely "true" then search by Regex
      // Otherwise, check if date label exists. If so, get the next match.
      let date: string | null = null;
      if (typeof selectors.date === "boolean") {
        const myDateRegex = new RegExp(
          /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)?,? ?(January|February|March|April|May|June|July|August|September|October|November|December) ([0-9][0-9]?),? \d\d\d\d/,
          "gi"
        );
        const isMatch = text.match(myDateRegex);
        date = isMatch ? isMatch[0] : null;
      } else {
        // Get the next sibling if label
        date = selectors.date.label
          ? $(selectors.date.value)
              .text()
              .replace(/[\s,\t,\n]+/g, " ")
              .trim()
          : $(selectors.date.value)
              .text()
              .replace(/[\s,\t,\n]+/g, " ")
              .trim();
      }

      let time: string | null = null;
      if (typeof selectors.time === "boolean") {
        const myTimeRegex = new RegExp(
          /((1[0-2]|0?[1-9])():([0-5][0-9]) ?([AaPp]\.?[Mm]\.?)?)|((1[0-2]|0?[1-9])().([0-5][0-9]) ([AaPp]\.?[Mm]\.))/
        );
        const isMatch = text.match(myTimeRegex);
        time = isMatch ? isMatch[0] : null;
      } else if (selectors.time) {
        time = selectors.time.label
          ? $(selectors.time.value)
              .text()
              .replace(/[\s,\t,\n]+/g, " ")
              .trim()
          : $(selectors.time.value)
              .text()
              .replace(/[\s,\t,\n]+/g, " ")
              .trim();
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
    })
  );

// The main function that runs to scrape data from every subpage
interface GetPageDataParams {
  pages: puppeteer.Page[];
  selectors: V1["layerTwo"];
}

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
      const html = await page.evaluate(() => document.body.innerHTML);
      const text = await page.evaluate(() =>
        document.body.innerText.replace(/[\s,\t,\n]+/g, " ")
      );
      const link = page.url();
      const $ = cheerio.load(html);
      const title = $(selectors.title).text();
      const info = $(selectors.jquerySelector)
        .text()
        .split("\n")
        .map((x) => x.trim())
        .filter((x) => x !== "" && x !== "@" && x !== "0");

      const location =
        selectors.locationIndex === null ? null : info[selectors.locationIndex];
      const date =
        selectors.dateIndex === null ? null : info[selectors.dateIndex];
      const time =
        selectors.timeIndex === null ? null : info[selectors.timeIndex];
      return { text, link, title, location, date, time };
    })
  );

export const getLinksAndDatav2 = async ({
  page,
  selectors,
}: {
  page: puppeteer.Page;
  selectors: V3["layerOne"];
}) => {
  const html = await page.evaluate(() => document.body.innerHTML);
  const text = await page.evaluate(() =>
    document.body.innerText.replace(/[\s,\t,\n]+/g, " ")
  );
  const $ = cheerio.load(html);
  const rows = $(selectors.rows)
    .toArray()
    .filter((x, i) => i + 1 <= selectors.depth)
    .map((x) => {
      const target = $(x);
      const link = target.find("a").attr("href");
      //// Neesd origin
      const title = target.find("a").first().text();
      const myTimeRegex = new RegExp(
        /((1[0-2]|0?[1-9])():([0-5][0-9]) ?([AaPp]\.?[Mm]\.?)?)|((1[0-2]|0?[1-9])().([0-5][0-9]) ([AaPp]\.?[Mm]\.))/
      );
      const myDateRegex = new RegExp(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/, "gi");
      const hasDate = text.match(myDateRegex);
      const hasTime = text.match(myTimeRegex);
      const time = hasTime ? hasTime[0] : null;
      const date = hasDate ? hasDate[0] : null;
      return { link, title, date, time };
    });
  return rows;
};

interface GetLinksAndDataV4Args {
  page: puppeteer.Page;
  selectors: { depth: number };
  origin: string;
}
export const getLinksAndDataV4 = async ({
  page,
  selectors,
  origin,
}: GetLinksAndDataV4Args): Promise<Result[]> =>
  page.evaluate((selectors) => {
    const rows: Element[] = Array.from(
      document
        .querySelector(selectors.upcomingHearings)
        .querySelectorAll(selectors.hearings)
    );
    return rows
      .filter((x, i) => i + 1 <= selectors.depth)
      .map((x) => {
        const link = getLink(x);
        const title = getLinkText(x);
        const dateAndTimeInfo = getFromText(x, selectors.dateTime)
          ?.split("-")
          .map((x: string) => x.trim());
        const date = dateAndTimeInfo ? dateAndTimeInfo[0] : null;
        const time = dateAndTimeInfo ? dateAndTimeInfo[1] : null;
        const location = getFromText(x, selectors.location);
        return { link, title, date, time, location };
      });
  }, selectors);
