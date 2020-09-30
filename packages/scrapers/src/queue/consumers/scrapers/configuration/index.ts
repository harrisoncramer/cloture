import path from "path";
import randomUser from "random-useragent";
import puppeteer from "puppeteer";
import fs from "fs";

export const setPageBlockers = async (page: puppeteer.Page) => {
  await page.setRequestInterception(true);
  const blockedResources = [
    "quantserve",
    "adzerk",
    "doubleclick",
    "adition",
    "exelator",
    "sharethrough",
    "twitter",
    "google-analytics",
    "fontawesome",
    "facebook",
    "analytics",
    "optimizely",
    "clicktale",
    "mixpanel",
    "zedo",
    "clicksor",
    "tiqcdn",
    "googlesyndication",
    "youtube",
  ];

  page.on("request", async (request) => {
    const url = request.url().toLowerCase();
    // const headers = request.headers();
    if (
      url.endsWith(".mp4") ||
      url.endsWith(".avi") ||
      url.endsWith(".flv") ||
      url.endsWith(".mov") ||
      url.endsWith(".wmv") ||
      ["image", "stylesheet", "media", "jpg", "png"].includes(
        request.resourceType()
      ) ||
      blockedResources.some((resource) => url.indexOf(resource) !== -1)
    ) {
      try {
        await request.abort();
      } catch (err) {
        if (err.message !== "Request is already handled!") {
          console.error(`Problem blocking resource from ${url}`);
        }
      }
    } else {
      try {
        await request.continue();
      } catch (err) {
        if (err.message !== "Request is already handled!") {
          console.error(`Problem blocking resource from ${url}`);
        }
      }
    }
  });
};

// Add personal functions to the page.
// These are then accessible within puppeteer. Since they're written in typescript
// They are only accessible within the "built" version of the site.
// Thus, check if the site has been built (when in development) and get that version.
// If not, throw an error.
export const setPageScripts = async (page: puppeteer.Page) => {
  let consumerFunctionsPath = path.resolve(__dirname, "./functions.js");
  let consumerFunctionsExist = fs.existsSync(consumerFunctionsPath);
  if (!consumerFunctionsExist) {
    console.error("Utility function files do not exist!");
    process.exit(1);
  } else {
    await page.addScriptTag({ path: consumerFunctionsPath }); // Uses path from CWD
  }
};

export const setInitialPage = async (
  browser: puppeteer.Browser,
  link: string
): Promise<puppeteer.Page> => {
  const page = await browser.newPage();
  let userAgentString = randomUser.getRandom();
  await page.setUserAgent(userAgentString || "");
  await setPageBlockers(page);
  await page.goto(link);
  await setPageScripts(page);
  return page;
};

export const openNewPages = async (browser: puppeteer.Browser, links: any) => {
  let pages: puppeteer.Page[] = await Promise.all(
    links.map(() => browser.newPage())
  );
  let navResults = await Promise.allSettled(
    pages.map(async (page, i) => {
      try {
        await setPageBlockers(page);
        await page.goto(links[i]);
        await setPageScripts(page);
        return Promise.resolve({ page, err: null, link: null });
      } catch (err) {
        return Promise.reject({ page, err, link: links[i] });
      }
    })
  );

  let successfulNavigations = navResults
    .filter((x) => x.status === "fulfilled")
    //@ts-ignore
    .map((x) => x.value);
  let failedNavigations = navResults
    .filter((x) => x.status !== "fulfilled")
    //@ts-ignore
    .map((x) => x.reason);

  if (failedNavigations.length > 0) {
    await Promise.all(
      failedNavigations.map(async (x) => {
        console.error(`Failed to navigate to ${x.link}, skipping: `, x.err);
        return x.page.close();
      })
    );
  }

  return successfulNavigations.map((x) => x.page);
};
