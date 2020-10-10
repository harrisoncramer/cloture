import { SenateJob, V1, V2, V3 } from "./types";
import { senateCommittees } from "../../statics";

const jobCreator = <T>(
  committee: senateCommittees,
  name: string,
  link: string,
  details: T
): SenateJob<T> => ({
  collection: "senateCommittee",
  committee,
  name,
  link,
  details,
});

const sage: SenateJob<V1> = jobCreator(
  "sage",
  "Senate Aging Committee",
  "https://www.aging.senate.gov/hearings",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "tr.vevent",
    },
    layerTwo: {
      title: "div#content h1",
      time: true,
      date: true,
    },
  }
);

const sfrc: SenateJob<V1> = jobCreator(
  "sfrc",
  "Senate Foreign Relations Committee Hearings",
  "https://www.foreign.senate.gov/hearings",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "div.table-holder div.text-center",
    },
    layerTwo: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  }
);

const sasc: SenateJob<V1> = jobCreator(
  "sasc",
  "Senate Armed Services Committee",
  "https://www.armed-services.senate.gov/hearings?c=all",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "tbody tr.vevent",
    },
    layerTwo: {
      title: "div#main_column h1",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  }
);

const sagc: SenateJob<V1> = jobCreator(
  "sagc",
  "Senate Agriculture Committee",
  "https://www.agriculture.senate.gov/hearings?c=all",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "tbody tr.vevent",
    },
    layerTwo: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  }
);

const sapc: SenateJob<V1> = jobCreator(
  "sapc",
  "Senate Appropriations Committee",
  "https://www.appropriations.senate.gov/hearings?c=all&mode=list",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "tbody tr.vevent",
    },
    layerTwo: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  }
);

const sbnk: SenateJob<V1>[] = [
  jobCreator(
    "sbnk",
    "Senate Banking Committee",
    "https://www.banking.senate.gov/hearings?c=all&mode=list",
    {
      version: "puppeteerv1",
      layerOne: {
        depth: 10,
        rows: "tbody tr.vevent",
      },
      layerTwo: {
        title: "h1.main_page_title",
        date: { label: true, value: "span.col-md-12 span" },
        time: { label: true, value: "span.time span" },
        location: { label: true, value: "span.location span" },
      },
    }
  ),
  jobCreator(
    "sbnk",
    "Senate Banking Committee Markups",
    "https://www.banking.senate.gov/markups?c=all&mode=list",
    {
      version: "puppeteerv1",
      layerOne: {
        depth: 10,
        rows: "tbody tr.vevent",
      },
      layerTwo: {
        title: "h1.main_page_title",
        date: { label: true, value: "span.col-md-12 span" },
        time: { label: true, value: "span.time span" },
        location: { label: true, value: "span.location span" },
      },
    }
  ),
];

const sbdg: SenateJob<V1> = jobCreator(
  "sbdg",
  "Senate Budget Committee",
  "https://www.budget.senate.gov/hearings?c=all&mode=list",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "tbody tr.vevent",
    },
    layerTwo: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  }
);

const sstr: SenateJob<V1>[] = [
  jobCreator(
    "sstr",
    "Senate Transportation Committee Hearings",
    "https://www.commerce.senate.gov/hearings?month=&year=&label_id=",
    {
      version: "puppeteerv1",
      layerOne: {
        depth: 10,
        rows: "div.elements .element",
      },
      layerTwo: {
        title: "h1.element-title",
        time: true,
        date: true,
      },
    }
  ),
  jobCreator(
    "sstr",
    "Senate Transportation Committee Markups",
    "https://www.commerce.senate.gov/markups?month=&year=",
    {
      version: "puppeteerv1",
      layerOne: {
        depth: 10,
        rows: "div.elements .element",
      },
      layerTwo: {
        title: "h1.element-title",
        time: true,
        date: true,
      },
    }
  ),
];

const snat: SenateJob<V2> = jobCreator(
  "snat",
  "Senate Natural Resources",
  "https://www.energy.senate.gov/public/index.cfm/hearings-and-business-meetings?MonthDisplay=0&YearDisplay=0",
  {
    version: "puppeteerv2",
    layerOne: {
      depth: 10,
      rows: "div.recordsContainer tbody tr",
      date: { selector: "td.recordListDate", instance: 0 },
      time: { selector: "td.recordListTime", instance: 0 },
      title: "td.recordListTitle a",
    },
  }
);

const senv: SenateJob<V2> = jobCreator(
  "senv",
  "Senate Environment and Public Works",
  "https://www.epw.senate.gov/public/index.cfm/hearings?MonthDisplay=0&YearDisplay=0&Label_id=&Label_id=",
  {
    version: "puppeteerv2",
    layerOne: {
      depth: 10,
      rows: "div.recordsContainer tbody tr",
      date: { selector: "td.recordListDate", instance: 0 },
      time: { selector: "td.recordListTime", instance: 0 },
      title: "td.recordListTitle a",
    },
  }
);

const sfin: SenateJob<V1> = jobCreator(
  "sfin",
  "Senate Finance Committee",
  "https://www.finance.senate.gov/hearings?c=all&maxrows=15",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "#main_column tbody tr.vevent",
    },
    layerTwo: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  }
);

const shlp: SenateJob<V1> = jobCreator(
  "shlp",
  "Senate Health Education and Labor Committee",
  "https://www.help.senate.gov/hearings?c=all&mode=list",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "div.table-holder tr.vevent",
    },
    layerTwo: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  }
);

const shsc: SenateJob<V1> = jobCreator(
  "shsc",
  "Senate Homeland Security Committee",
  "https://www.hsgac.senate.gov/hearings?c=all",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "table tr.vevent",
    },
    layerTwo: {
      title: "h1.summary",
      time: true,
      date: true,
    },
  }
);

const sind: SenateJob<V2> = jobCreator(
  "sind",
  "Senate Indian Affairs Committee",
  "https://www.indian.senate.gov/hearings",
  {
    version: "puppeteerv2",
    layerOne: {
      depth: 10,
      rows: "table.views-table tbody tr",
      title: "a",
      date: { selector: "td span", instance: 0 },
      time: { selector: "td span", instance: 1 },
      location: "td.views-field-field-hearing-new-office",
    },
  }
);

const sjud: SenateJob<V1> = jobCreator(
  "sjud",
  "Senate Judiciary Committee",
  "https://www.judiciary.senate.gov/hearings?month=0&year=0&mode=list",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "table tr.vevent",
    },
    layerTwo: {
      titleTrimRegex:
        "(Oversight)$|(Full Committee Hearing)$|(Subcommittee Hearing)$|(Business Meeting)$|(Nomination Hearing)$",
      title: "h1.main_page_title",
      location: { value: "tr.location td:nth-of-type(2)", label: false },
      date: { value: "tr.date td:nth-of-type(2)", label: false },
      time: { value: "tr.time td:nth-of-type(2)", label: false },
    },
  }
);

const srle: SenateJob<V1> = jobCreator(
  "srle",
  "Senate Rules Committee",
  "https://www.rules.senate.gov/hearings?c=all&mode=list",
  {
    version: "puppeteerv1",
    layerOne: {
      depth: 10,
      rows: "div.table-holder tr.vevent",
    },
    layerTwo: {
      title: "h1.main_page_title",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  }
);

const ssci: SenateJob<V3> = jobCreator(
  "ssci",
  "Senate Intelligence Committee Hearings",
  "https://www.intelligence.senate.gov/hearings",
  {
    version: "puppeteerv3",
    layerOne: {
      depth: 10,
      rows: "div.view-content div.views-row",
    },
  }
);

const ssbs: SenateJob<V2> = jobCreator(
  "ssbs",
  "Senate Small Business Committee",
  "https://www.sbc.senate.gov/public/index.cfm/hearings?page=1",
  {
    version: "puppeteerv2",
    layerOne: {
      depth: 10,
      rows: "div.recordsContainer tbody tr",
      date: { selector: "td.recordListDate", instance: 0 },
      time: { selector: "td.recordListTime", instance: 0 },
      title: "td.recordListTitle a",
    },
  }
);

const svac: SenateJob<V1> = jobCreator(
  "svac",
  "Senate Veterans Affairs Committee",
  "https://www.veterans.senate.gov/hearings?c=all",
  {
    version: "puppeteerv1",
    layerOne: { depth: 10, rows: "div.table-holder tr.vevent" },
    layerTwo: {
      title: "div.row h1",
      date: { label: true, value: "span.date b" },
      time: { label: true, value: "span.time b" },
      location: { label: true, value: "span.location b" },
    },
  }
);

export const senate: (SenateJob<V1> | SenateJob<V2> | SenateJob<V3>)[] = [
  sagc,
  sage,
  srle,
  sapc,
  sasc,
  ...sbnk,
  sbdg,
  shlp,
  senv,
  sfin,
  sfrc,
  shsc,
  sind,
  sjud,
  snat,
  // seth,
  ssci,
  ssbs,
  ...sstr,
  svac,
];
