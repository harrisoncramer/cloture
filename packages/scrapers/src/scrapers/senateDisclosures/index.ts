import cheerio from "cheerio";
import puppeteer from "puppeteer";
import { capitalize, clean, wait } from "../../util";
import {
  SenateStockDisclosure,
  StockDisclosure,
} from "../../types/SenateStockDisclosure";
import { Saver } from "../../mongodb/Saver";
import { setupPuppeteer } from "../../puppeteer";

const fetchContracts = async (
  url: string,
  page: puppeteer.Page
): Promise<string> => {
  await page.goto(url, { waitUntil: "networkidle2" }); // Ensure no network requests are happening (in last 500ms).
  await Promise.all([page.click("#agree_statement"), page.waitForNavigation()]);

  await page.click(".form-check-input");

  await Promise.all([page.click(".btn-primary"), page.waitForNavigation()]);

  await Promise.all([
    page.click("#filedReports th:nth-child(5)"),
    page.waitForResponse("https://efdsearch.senate.gov/search/report/data/"),
  ]);

  await Promise.all([
    page.click("#filedReports th:nth-child(5)"),
    page.waitForResponse("https://efdsearch.senate.gov/search/report/data/"),
  ]);

  await wait(1000);

  let html = await page.content();
  return html;
};

const parseData = ($: cheerio.Root): StockDisclosure[] => {
  const trs = $(".table-striped tr[role='row']");
  const trsWithoutHeader = Array.from(trs.slice(1, trs.length));
  const linkBase = "https://efdsearch.senate.gov";
  const data: StockDisclosure[] = trsWithoutHeader.map((x) => {
    // EDIT -- This shouldn't return an empty string
    const link = $(x).find("a").attr("href")
      ? linkBase + $(x).find("a").attr("href")
      : "";
    const title = $(x).find("a").text();
    const firstName = clean(capitalize($(x).find("td").first().text(), true));
    const lastName = clean(
      capitalize($(x).find("td:nth-child(2)").text(), true)
    );
    const date = new Date($(x).find("td").last().text());
    return { link, title, firstName, lastName, date };
  });
  return data;
};

export const senateDisclosures = async (): Promise<void> => {
  const browser = await setupPuppeteer();
  try {
    const saver = new Saver<StockDisclosure>(SenateStockDisclosure);
    const page = await browser.newPage();
    const html = await fetchContracts(
      "https://efdsearch.senate.gov/search/",
      page
    );
    const pages = await browser.pages();
    await Promise.all(
      pages.map(async (page, i) => i > 0 && (await page.close()))
    );

    const $ = cheerio.load(html);
    const data = parseData($);
    await saver.saveOrUpdate(data);
    await browser.close();
  } catch (err) {
    await browser.close();
  }
};
