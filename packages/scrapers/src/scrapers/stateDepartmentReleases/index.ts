import cheerio from "cheerio";
import moment from "moment";
import axios from "axios";
import { wait } from "../../util";
import { StatePressRelease } from "../../types";
import { Saver } from "../../mongodb/Saver";

const parseData = (link: string, $: cheerio.Root): StatePressRelease => {
  const title = $(".featured-content__headline")
    .text()
    .trim()
    .replace(/\s\s+/g, " ");
  const kind = $(".doctype-meta").text();
  const authorBureau = $(".article-meta__author-bureau")
    .text()
    .replace(/\s\s+/g, " ");
  const dateString = $(".article-meta__publish-date")
    .text()
    .replace(/\s\s+/g, " ");
  const date = moment(dateString).toDate();
  const text = $("div.entry-content").text().replace(/\s\s+/g, " ");
  const tags = $("div.related-tags__pills a")
    .toArray()
    .map((x, i) => $(x).text().replace(/\s\s+/g, " "));

  return { title, kind, authorBureau, date, text, tags, link };
};

const parseReleaseStrings = ($: cheerio.Root): string[] => {
  const links = $("div.collection-list li a")
    .toArray()
    .reduce((agg, element, i) => {
      const link = $(element).attr("href");
      if (link) {
        agg.push(link);
      }
      return agg;
    }, [] as string[]);

  return links;
};

const pageNumbers = Array.from({ length: 693 }, (x, i) => i);

export const statePressReleases = async () => {
  const saver = new Saver<StatePressRelease>(StatePressRelease);
  for (const pageNumber of pageNumbers) {
    const link = `https://www.state.gov/press-releases/page/${pageNumber}/`;
    try {
      const response = await axios.get(link);
      const $ = cheerio.load(response.data);
      const links = parseReleaseStrings($);
      for (const sublink of links) {
        await wait(500);
        try {
          const response = await axios.get(sublink);
          const $ = cheerio.load(response.data);
          const data = parseData(sublink, $);
          saver.saveOrUpdate([data]);
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
};

export const getNewStatePressReleases = async () => {
  const saver = new Saver<StatePressRelease>(StatePressRelease);
  const link = `https://www.state.gov/press-releases/`;
  const response = await axios.get(link);
  const $ = cheerio.load(response.data);
  const links = parseReleaseStrings($);
  for (const sublink of links) {
    const exists = await saver.findOne({ link: sublink });
    if (!exists) {
      const response = await axios.get(sublink);
      const $ = cheerio.load(response.data);
      const data = parseData(sublink, $);
      await saver.saveOrUpdate([data]);
    }
  }
};
