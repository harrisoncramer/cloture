// Reusable types
type labelSelector = { label: boolean; value: string };
type dateAndTime = { date: labelSelector; time: labelSelector };
type dateAndTimeRegex = { regexDate: boolean; regexTime: boolean };
type dates = dateAndTime | dateAndTimeRegex;

// Base interface for scraper selectors
export interface selectors {
  layerOne: {
    depth: number;
    rows: string;
  };
  layerTwo: {
    title: string;
    date?: labelSelector;
    time?: labelSelector;
  };
}

export type v1Selectors = selectors & {
  layerTwo: dates & {
    location?: labelSelector;
  };
};

export type v6Selectors = selectors & {
  layerOne: {
    filter: { keyword: string; selector: string };
  };
  layerTwo: {
    regexTime: boolean;
    regexDate: boolean;
  };
};

export interface puppeteerv1 {
  version: "puppeteerv1";
  selectors: v1Selectors;
}

//interface puppeteerv2 {
//version: "puppeteerv2";
//selectors: v2Selectors;
//}

//interface puppeteerv3 {
//version: "puppeteerv3";
//selectors: v3Selectors;
//}

//interface puppeteerv4 {
//version: "puppeteerv4";
//selectors: v4Selectors;
//}

//interface puppeteerv5 {
//version: "puppeteerv5";
//selectors: v5Selectors;
//}

export interface puppeteerv6 {
  version: "puppeteerv6";
  selectors: v6Selectors;
}

export type sched = { kind: "cron"; value: string };

export interface job {
  collection: "senateCommittee" | "houseCommittee";
  name: string;
  link: string;
  details: puppeteerv1 | puppeteerv6;
  //| puppeteerv2
  //| puppeteerv3
  //| puppeteerv4
  //| puppeteerv5
}

