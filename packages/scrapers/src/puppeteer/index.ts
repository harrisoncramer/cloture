import puppeteer from "puppeteer";

// This function sets up a puppeteer browser and returns it
export const setupPuppeteer = async (): Promise<puppeteer.Browser> => {
  const args = ["--no-sandbox", "--unlimited-storage"];

  const browser = await puppeteer.launch({
    headless:
      process.env.NODE_ENV === "production" || process.env.HEADLESS === "true",
    defaultViewport: null,
    devtools: process.env.NODE_ENV !== "production",
    args,
  });

  return browser;
};
