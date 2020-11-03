import { HouseCommittees } from "../../types";

interface Job {
  name: string;
  link: string;
}

export interface HouseJob<Details> extends Job {
  collection: "houseCommittee";
  committee: HouseCommittees;
  name: string;
  link: string;
  origin: string;
  details: Details;
}

export type HouseJobTypes =
  | HouseJob<V1>
  | HouseJob<V2>
  | HouseJob<V3>
  | HouseJob<V4>
  | HouseJob<V5>
  | HouseJob<V6>;

// Reusable types
type LabelSelector = { label: boolean; value: string };
type InstanceSelector = { selector: string; instance: number };

// Used to get links
export type RowsAndDepth = {
  rows: string;
  depth: number;
};

// Details for scrapers
export interface V1 {
  version: "puppeteerv1";
  layerOne: {
    depth: number;
    rows: string;
  };
  layerTwo: {
    title: string;
    titleTrimRegex?: string;
    date: LabelSelector | boolean;
    time?: LabelSelector | boolean;
    splitDate?: string;
    location?: LabelSelector;
  };
}

export interface V2 {
  version: "puppeteerv2";
  layerOne: {
    depth: number;
    rows: string;
    date: InstanceSelector;
    time?: InstanceSelector;
    splitDate?: string;
    location?: string | undefined;
  };
}
export interface V3 {
  version: "puppeteerv3";
  layerOne: {
    depth: number;
    rows: string;
  };
}

export interface V4 {
  version: "puppeteerv4";
  layerOne: {
    depth: number;
    upcomingHearings: string;
    hearings: string;
    dateTime: string;
    time: string;
    location?: string;
  };
}

export interface V5 {
  version: "puppeteerv5";
  layerOne: {
    depth: number;
    rows: string;
  };
  layerTwo: {
    title: string;
    jquerySelector: string;
    locationIndex: number | null;
    dateIndex: number;
    timeIndex: number;
  };
}
export interface V6 {
  version: "puppeteerv6";
  layerOne: {
    depth: number;
    rows: string;
    filter: { keyword: string; selector: string };
  };
  layerTwo: {
    title: string;
    date: LabelSelector | boolean;
    time: LabelSelector | boolean;
    location?: LabelSelector;
  };
}
const jobCreator = <T>(
  committee: HouseCommittees,
  name: string,
  link: string,
  origin: string,
  details: T
): HouseJob<T> => ({
  collection: "houseCommittee",
  origin,
  committee,
  name,
  link,
  details,
});

//const hapc: HouseJob<V4>[] = [
//jobCreator(
//HouseCommittees.HOUSE_APPROPRIATIONS_COMMITTEE,
//"House Appropriations Committee Hearings",
//"https://appropriations.house.gov/events/hearings",
//"https://appropriations.house.gov",
//{
//version: "puppeteerv4",
//layerOne: {
//depth: 10,
//upcomingHearings: ".pane-content",
//hearings: ".views-row",
//dateTime: ".views-field-field-congress-meeting-date",
//time: "div.newsie-details span:nth-child(2)",
//location: ".views-field-field-congress-meeting-location",
//},
//}
//),
//jobCreator(
//HouseCommittees.HOUSE_APPROPRIATIONS_COMMITTEE,
//"House Appropriations Committee Markups",
//"https://appropriations.house.gov/events/markups",
//"https://appropriations.house.gov",
//{
//version: "puppeteerv4",
//layerOne: {
//depth: 10,
//upcomingHearings: ".pane-content",
//hearings: ".views-row",
//dateTime: ".views-field-field-congress-meeting-date",
//time: "div.newsie-details span:nth-child(2)",
//location: ".views-field-field-congress-meeting-location",
//},
//}
//),
//];

//const hbuc: HouseJob<V4>[] = [
//jobCreator(
//HouseCommittees.HOUSE_BUDGET_COMMITTEE,
//"House Budget Committee Hearings",
//"https://budget.house.gov/legislation/hearings",
//"https://budget.house.gov",
//{
//version: "puppeteerv4",
//layerOne: {
//depth: 10,
//upcomingHearings: ".pane-content",
//hearings: ".views-row",
//dateTime: ".views-field-field-congress-meeting-date",
//time: "div.newsie-details span:nth-child(2)",
//},
//}
//),
//jobCreator(
//HouseCommittees.HOUSE_BUDGET_COMMITTEE,
//"House Budget Committee Markups",
//"https://budget.house.gov/legislation/markups",
//"https://budget.house.gov",
//{
//version: "puppeteerv4",
//layerOne: {
//depth: 10,
//upcomingHearings: ".pane-content",
//hearings: ".views-row",
//dateTime: ".views-field-field-congress-meeting-date",
//time: "div.newsie-details span:nth-child(2)",
//},
//}
//),
//];

const hrle: HouseJob<V6> = jobCreator(
  HouseCommittees.HOUSE_RULES_COMMITTEE,
  "House Rules Committee",
  "https://rules.house.gov/media",
  "https://rules.house.gov",
  {
    version: "puppeteerv6",
    layerOne: {
      depth: 10,
      filter: { keyword: "meeting", selector: "h3" },
      rows: "div.view-content .views-row",
    },
    layerTwo: {
      title: ".title",
      time: true,
      date: true,
    },
  }
);

const smbs: HouseJob<V5> = jobCreator(
  HouseCommittees.HOUSE_SMALL_BUSINESS_COMMMITTEE,
  "House Small Business Committee Hearings and Markups",
  "https://smallbusiness.house.gov/activity/",
  "https://smallbusiness.house.gov",
  {
    version: "puppeteerv5",
    layerOne: {
      depth: 3,
      rows: "ul.calendar-listing li",
    },
    layerTwo: {
      title: "h3.news-titler",
      jquerySelector: ".topnewstext",
      locationIndex: null,
      dateIndex: 0,
      timeIndex: 1,
    },
  }
);

const fisv: HouseJob<V5>[] = [
  jobCreator(
    HouseCommittees.HOUSE_FINANCIAL_SERVICES_COMMITTEE,
    "House Financial Services Committee Hearings and Markups",
    "https://financialservices.house.gov/calendar/",
    "https://financialservices.house.gov/calendar/",
    {
      version: "puppeteerv5",
      layerOne: {
        depth: 8,
        rows: ".newsie-titler",
      },
      layerTwo: {
        title: "h3.news-titler",
        jquerySelector: ".topnewstext",
        locationIndex: 0,
        dateIndex: 1,
        timeIndex: 2,
      },
    }
  ),
];

const hjud: HouseJob<V1> = jobCreator(
  HouseCommittees.HOUSE_JUDICIARY_COMMITTEE,
  "House Judicary Committee Hearings and Markups",
  "https://judiciary.house.gov/calendar/eventslisting.aspx?EventTypeID=0&CategoryID=0&Congress=&Count=10",
  "https://judiciary.house.gov/calendar/",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "li.calendar-item",
    },
    layerTwo: {
      title: "h3.news-titler",
      time: true,
      date: true,
      location: { label: true, value: "div.events-location strong" },
    },
  }
);
const hfac: HouseJob<V1>[] = [
  jobCreator(
    HouseCommittees.HOUSE_FOREIGN_AFFAIRS_COMMITTEE,
    "House Foreign Affairs Committee Markups",
    "https://foreignaffairs.house.gov/markups",
    "https://foreignaffairs.house.gov",
    {
      version: "puppeteerv1",
      layerOne: {
        depth: 1,
        rows: "table tbody tr",
      },
      layerTwo: {
        title: ".title",
        date: { label: false, value: "span.date" },
        time: { label: false, value: "span.time" },
        location: { label: true, value: "span.location strong" },
      },
    }
  ),
  jobCreator(
    HouseCommittees.HOUSE_FOREIGN_AFFAIRS_COMMITTEE,
    "House Foreign Affairs Committee Hearings",
    "https://foreignaffairs.house.gov/hearings",
    "https://foreignaffairs.house.gov",
    {
      version: "puppeteerv1",
      layerOne: {
        depth: 1,
        rows: "table tbody tr",
      },
      layerTwo: {
        title: ".title",
        date: { label: false, value: "span.date" },
        time: { label: false, value: "span.time" },
        location: { label: true, value: "span.location strong" },
      },
    }
  ),
];

const hasc: HouseJob<V1> = jobCreator(
  HouseCommittees.HOUSE_ARMED_SERVICES_COMMITTEE,
  "House Armed Services Committee",
  "https://armedservices.house.gov/hearings",
  "https://armedservices.house.gov",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "table tbody tr",
    },
    layerTwo: {
      title: ".title",
      date: { label: false, value: "span.date:first-of-type" },
      time: true,
    },
  }
);

const hvac: HouseJob<V1>[] = [
  jobCreator(
    HouseCommittees.HOUSE_VETERANS_AFFAIRS_COMMITTEE,
    "House Veterans Affairs Committee Hearings",
    "https://veterans.house.gov/events/hearings",
    "https://veterans.house.gov",
    {
      version: "puppeteerv1",
      layerOne: {
        depth: 10,
        rows: "tr.vevent",
      },
      layerTwo: {
        title: "h1.main_page_title",
        date: { label: false, value: "p.hearing__date date" },
        time: { label: true, value: "p.hearing__time time b" },
        location: { label: false, value: "p.hearing__location b" },
      },
    }
  ),
  jobCreator(
    HouseCommittees.HOUSE_VETERANS_AFFAIRS_COMMITTEE,
    "House Veterans Affairs Committee Markups",
    "https://veterans.house.gov/events/markups",
    "https://veterans.house.gov",
    {
      version: "puppeteerv1",
      layerOne: {
        depth: 10,
        rows: "tr.vevent",
      },
      layerTwo: {
        title: "h1.main_page_title",
        date: { label: false, value: "p.hearing__date date" },
        time: { label: true, value: "p.hearing__time time b" },
        location: { label: false, value: "p.hearing__location b" },
      },
    }
  ),
];

const hhsc: HouseJob<V2>[] = [
  jobCreator(
    HouseCommittees.HOUSE_HOMELAND_SECURITY_COMMITTEE,
    "House Homeland Security Committee Hearings",
    "http://homeland.house.gov/activities/hearings",
    "http://homeland.house.gov",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: "tr.vevent",
        date: { selector: "time.dtstart", instance: 0 },
        time: { selector: "time.dtstart", instance: 1 },
        location: "span.location",
      },
    }
  ),
  jobCreator(
    HouseCommittees.HOUSE_HOMELAND_SECURITY_COMMITTEE,
    "House Homeland Security Committee Markups",
    "http://homeland.house.gov/activities/markups",
    "http://homeland.house.gov",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: "tr.vevent",
        date: { selector: "time.dtstart", instance: 0 },
        time: { selector: "time.dtstart", instance: 1 },
        location: "span.location",
      },
    }
  ),
];

const hagc: HouseJob<V1> = jobCreator(
  HouseCommittees.HOUSE_AGRICULTURE_COMMITTEE,
  "House Agriculture Committee Hearings",
  "https://agriculture.house.gov/calendar/",
  "https://agriculture.house.gov/calendar/",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "ul.calendar-listing li",
    },
    layerTwo: {
      title: "h3.news-titler",
      time: true,
      date: true,
    },
  }
);
const help: HouseJob<V1>[] = [
  jobCreator(
    HouseCommittees.HOUSE_EDUCATION_AND_LABOR_COMMITTEE,
    "House Education and Labor Committee Hearings",
    "https://edlabor.house.gov/hearings-and-events",
    "https://edlabor.house.gov/",
    {
      version: "puppeteerv1",
      layerOne: {
        depth: 10,
        rows: "tr.vevent",
      },
      layerTwo: {
        title: "h1.main_page_title",
        date: { label: true, value: "span.date b" },
        time: { label: true, value: "span.time b" },
        location: { label: true, value: "span.location" },
      },
    }
  ),
  jobCreator(
    HouseCommittees.HOUSE_EDUCATION_AND_LABOR_COMMITTEE,
    "House Education and Labor Committee Markups",
    "https://edlabor.house.gov/markups",
    "https://edlabor.house.gov/",
    {
      version: "puppeteerv1",
      layerOne: {
        depth: 10,
        rows: "tr.vevent",
      },
      layerTwo: {
        title: "h1.main_page_title",
        date: { label: true, value: "span.date b" },
        time: { label: true, value: "span.time b" },
        location: { label: true, value: "span.location b" },
      },
    }
  ),
];

const nrgy: HouseJob<V2>[] = [
  jobCreator(
    HouseCommittees.HOUSE_ENERGY_AND_COMMERCE_COMMITTEE,
    "House Energy and Commerce Committee Hearings",
    "https://energycommerce.house.gov/committee-activity/hearings",
    "https://energycommerce.house.gov/",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: ".views-row",
        date: { selector: ".date-display-single", instance: 0 },
        splitDate: "-",
        location: ".views-field-field-congress-meeting-location",
      },
    }
  ),
  jobCreator(
    HouseCommittees.HOUSE_ENERGY_AND_COMMERCE_COMMITTEE,
    "House Energy and Commerce Committee Markups",
    "https://energycommerce.house.gov/committee-activity/markups",
    "https://energycommerce.house.gov/",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: ".views-row",
        date: { selector: ".date-display-single", instance: 0 },
        splitDate: "-",
        location: ".views-field-field-congress-meeting-location",
      },
    }
  ),
];
const admn: HouseJob<V2>[] = [
  jobCreator(
    HouseCommittees.HOUSE_ADMINISTRATION_COMMITTEE,
    "House Administration Committee Hearings",
    "https://cha.house.gov/committee-activity/hearings",
    "https://cha.house.gov/committee-activity/hearings",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: ".views-row",
        date: { selector: ".date-display-single", instance: 0 },
        splitDate: "-",
        location: ".views-field-field-congress-meeting-location",
      },
    }
  ),
  jobCreator(
    HouseCommittees.HOUSE_ADMINISTRATION_COMMITTEE,
    "House Administration Committee Hearings",
    "https://cha.house.gov/committee-activity/business-meetings",
    "https://cha.house.gov/committee-activity/business-meetings",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: ".views-row",
        date: { selector: ".date-display-single", instance: 0 },
        splitDate: "-",
        location: ".views-field-field-congress-meeting-location",
      },
    }
  ),
  jobCreator(
    HouseCommittees.HOUSE_ADMINISTRATION_COMMITTEE,
    "House Administration Committee Markups",
    "https://cha.house.gov/committee-activity/markups",
    "https://cha.house.gov/committee-activity/markups",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: ".views-row",
        date: { selector: ".date-display-single", instance: 0 },
        splitDate: "-",
        location: ".views-field-field-congress-meeting-location",
      },
    }
  ),
];

const ntty: HouseJob<V2> = jobCreator(
  HouseCommittees.HOUSE_NATURAL_RESOURCES_COMMITTEE,
  "House Natural Resources Committee Hearings",
  "https://naturalresources.house.gov/hearings",
  "https://naturalresources.house.gov/",
  {
    version: "puppeteerv2",
    layerOne: {
      depth: 10,
      rows: "tr.vevent",
      date: { selector: "time.dtstart", instance: 0 },
      splitDate: " ",
      location: "span.location",
    },
  }
);

const ovst: HouseJob<V2>[] = [
  jobCreator(
    HouseCommittees.HOUSE_OVERSIGHT_AND_REFORM_COMMITTEE,
    "House Oversight Committee Hearings",
    "https://oversight.house.gov/legislation/hearings",
    "https://oversight.house.gov",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: ".views-row",
        date: { selector: "span.date-display-single", instance: 0 },
        splitDate: "-",
        location: ".views-field-field-congress-meeting-location .field-content",
      },
    }
  ),
  jobCreator(
    HouseCommittees.HOUSE_OVERSIGHT_AND_REFORM_COMMITTEE,
    "House Oversight Committee Markups",
    "https://oversight.house.gov/legislation/business-meetings",
    "https://oversight.house.gov",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows:
          ".pane-cng-meetings-panel-pane-business-meetings-upcoming .views-row",
        date: { selector: "span.date-display-single", instance: 0 },
        splitDate: "-",
        location: ".views-field-field-congress-meeting-location .field-content",
      },
    }
  ),
  jobCreator(
    HouseCommittees.HOUSE_OVERSIGHT_AND_REFORM_COMMITTEE,
    "House Oversight Committee Briefings",
    "https://oversight.house.gov/legislation/briefings",
    "https://oversight.house.gov",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: ".views-row",
        splitDate: "-",
        date: { selector: "span.date-display-single", instance: 0 },
      },
    }
  ),
];

const scnc: HouseJob<V2>[] = [
  jobCreator(
    HouseCommittees.HOUSE_SCIENCE_SPACE_AND_TECHNOLOGY_COMMITTEE,
    "House Science Committee Hearings",
    "https://science.house.gov/hearings",
    "https://science.house.gov",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: "div.hearing",
        date: { selector: ".hearing__date", instance: 0 },
        time: { selector: ".hearing__time time", instance: 0 },
        location: ".hearing__location",
      },
    }
  ),
  jobCreator(
    HouseCommittees.HOUSE_SCIENCE_SPACE_AND_TECHNOLOGY_COMMITTEE,
    "House Science Committee Markups",
    "https://science.house.gov/markups",
    "https://science.house.gov",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: "div.hearing",
        date: { selector: ".hearing__date", instance: 0 },
        time: { selector: ".hearing__time time", instance: 0 },
        location: ".hearing__location",
      },
    }
  ),
];
const trns: HouseJob<V2>[] = [
  jobCreator(
    HouseCommittees.HOUSE_TRANSPORTATION_AND_INFRASTRUCTURE_COMMITTEE,
    "House Transportation Committee Hearings",
    "https://transportation.house.gov/committee-activity/hearings",
    "https://transportation.house.gov",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: "div.hearings-table table tr.vevent",
        date: { selector: "time.dtstart", instance: 0 },
        time: { selector: "time.dtstart", instance: 1 }, // Zero indexed, second option
        location: "span.location",
      },
    }
  ),
  jobCreator(
    HouseCommittees.HOUSE_TRANSPORTATION_AND_INFRASTRUCTURE_COMMITTEE,
    "House Transportation Committee Markups",
    "https://transportation.house.gov/committee-activity/markups",
    "https://transportation.house.gov",
    {
      version: "puppeteerv2",
      layerOne: {
        depth: 10,
        rows: "div.hearings-table table tr.vevent",
        date: { selector: "time.dtstart", instance: 0 },
        time: { selector: "time.dtstart", instance: 1 }, // Zero indexed, second option
      },
    }
  ),
];

const wymn: HouseJob<V1>[] = [
  jobCreator(
    HouseCommittees.HOUSE_WAYS_AND_MEANS_COMMITTEE,
    "House Ways and Means Committee Hearings",
    "https://waysandmeans.house.gov/legislation/hearings",
    "https://waysandmeans.house.gov/",
    {
      version: "puppeteerv1",
      layerOne: {
        depth: 10,
        rows: ".views-row",
      },
      layerTwo: {
        date: { label: false, value: "span.date-display-single" },
        title: "h1.title",
        splitDate: "-",
        location: {
          label: false,
          value: ".field-name-field-congress-meeting-location .field-label",
        },
      },
    }
  ),
  jobCreator(
    HouseCommittees.HOUSE_WAYS_AND_MEANS_COMMITTEE,
    "House Ways and Means Committee Markups",
    "https://waysandmeans.house.gov/legislation/markups",
    "https://waysandmeans.house.gov/",
    {
      version: "puppeteerv1",
      layerOne: {
        depth: 10,
        rows: ".views-row",
      },
      layerTwo: {
        title: "h1.title",
        date: { label: false, value: "span.date-display-single" },
        splitDate: "-",
        location: {
          label: false,
          value: ".field-name-field-congress-meeting-location .field-label",
        },
      },
    }
  ),
];

const clmt: HouseJob<V2> = jobCreator(
  HouseCommittees.HOUSE_CLIMATE_COMMITTEE,
  "House Climate Committee Hearings",
  "https://climatecrisis.house.gov/committee-activity/hearings",
  "https://climatecrisis.house.gov/",
  {
    version: "puppeteerv2",
    layerOne: {
      depth: 10,
      rows: ".views-row",
      date: { selector: "span.date-display-single", instance: 0 },
      splitDate: "-",
    },
  }
);

export const houseJobs: (
  | HouseJob<V1>
  | HouseJob<V2>
  | HouseJob<V4>
  | HouseJob<V5>
  | HouseJob<V6>
)[] = [
  smbs,
  ...fisv,
  hrle,
  ...admn,
  ...hfac,
  hagc,
  hasc,
  clmt,
  ...help,
  ...nrgy,
  hjud,
  ...hhsc,
  ntty,
  ...ovst,
  ...scnc,
  ...trns,
  ...hvac,
  ...wymn,
  //// USE DIFFERENT SCRAPERS
  //...hapc,
  //...hbuc,
];
