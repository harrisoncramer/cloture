import { houseCommittees } from "../../statics";
import { job, sched } from "./types";

export type houseJob = job & {
  committee: houseCommittees;
};

export const house: houseJob[] = [
  //{
  //committee: "hjud",
  //collection: "houseCommittee",
  //name: "House Judiciary Committee Hearings and Markups",
  //link:
  //"https://judiciary.house.gov/calendar/eventslisting.aspx?EventTypeID=0&CategoryID=0&Congress=&Count=10",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "li.calendar-item",
  //},
  //layerTwo: {
  //title: "h3.news-titler",
  //regexTime: true,
  //regexDate: true,
  //location: { label: true, value: "div.events-location strong" },
  //},
  //},
  //},
  //},
  //{
  //committee: "hrle",
  //collection: "houseCommittee",
  //name: "House Rules Committee",
  //link: "https://rules.house.gov/media",
  //details: {
  //version: "puppeteerv6",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //filter: { keyword: "meeting", selector: "h3" },
  //rows: "div.view-content .views-row",
  //},
  //layerTwo: {
  //title: ".title",
  //regexTime: true,
  //regexDate: true,
  //},
  //},
  //},
  //},
  //{
  //committee: "hfac",
  //collection: "houseCommittee",
  //name: "House Foreign Affairs Committee Hearings",
  //link: "https://foreignaffairs.house.gov/hearings",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "table tbody tr",
  //},
  //layerTwo: {
  //date: { label: false, value: "span.date" },
  //time: { label: false, value: "span.time" },
  //title: ".title",
  //location: { label: true, value: "span.location strong" },
  //},
  //},
  //},
  //},
  //{
  //committee: "hfac",
  //collection: "houseCommittee",
  //name: "House Foreign Affairs Committee Markups",
  //link: "https://foreignaffairs.house.gov/markups",
  //details: {
  //version: "puppeteerv1",
  //selectors: {
  //layerOne: {
  //depth: 1,
  //rows: "table tbody tr",
  //},
  //layerTwo: {
  //title: ".title",
  //date: { label: false, value: "span.date" },
  //time: { label: false, value: "span.time" },
  //location: { label: true, value: "span.location strong" },
  ////witnesses: "div.witnesses strong",
  //},
  //},
  //},
  //},
  //{
  //type: "puppeteerv1",
  //committee: "hasc",
  //collection: "houseCommittee",
  //name: "House Armed Services Committee",
  //link: "https://armedservices.house.gov/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "table tbody tr",
  //},
  //layerTwo: {
  //title: ".title",
  //date: { label: false, value: "span.date:first-of-type" },
  //location: { label: false, value: null },
  //regexTime: true,
  //},
  //},
  //},
  //{
  //type: "puppeteerv1",
  //committee: "hvac",
  //collection: "houseCommittee",
  //name: "House Veterans Affairs Committee Hearings",
  //link: "https://veterans.house.gov/events/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: false, value: "p.hearing__date date" },
  //time: { label: true, value: "p.hearing__time time b" },
  //location: { label: false, value: "p.hearing__location b" },
  //},
  //},
  //},
  //{
  //type: "puppeteerv1",
  //committee: "hvac",
  //collection: "houseCommittee",
  //name: "House Veterans Affairs Committee Markups",
  //link: "https://veterans.house.gov/events/markups",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: false, value: "p.hearing__date date" },
  //time: { label: true, value: "p.hearing__time time b" },
  //location: { label: false, value: "p.hearing__location b" },
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "hhsc",
  //collection: "houseCommittee",
  //name: "House Homeland Security Committee Hearings",
  //link: "http://homeland.house.gov/activities/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tr.vevent",
  //date: { selector: "time.dtstart", instance: 0 },
  //time: { selector: "time.dtstart", instance: 1 },
  //location: "span.location",
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "hhsc",
  //collection: "houseCommittee",
  //name: "House Homeland Security Committee Markups",
  //link: "http://homeland.house.gov/activities/markups",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tr.vevent",
  //date: { selector: "time.dtstart", instance: 0 },
  //time: { selector: "time.dtstart", instance: 1 },
  //location: "span.location",
  //},
  //},
  //},
  //{
  //type: "puppeteerv1",
  //committee: "hagc",
  //collection: "houseCommittee",
  //name: "House Agriculture Committee Hearings",
  //link: "https://agriculture.house.gov/calendar/",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "ul.calendar-listing li",
  //},
  //layerTwo: {
  //title: "h3.news-titler",
  //regexTime: true,
  //regexDate: true,
  //},
  //},
  //},
  //{
  //type: "puppeteerv4",
  //committee: "hapc",
  //collection: "houseCommittee",
  //name: "House Appropriations Committee Hearings",
  //link: "https://appropriations.house.gov/events/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //upcomingHearings: ".pane-content",
  //hearings: ".views-row",
  //dateTime: ".views-field-field-congress-meeting-date",
  //time: "div.newsie-details span:nth-child(2)",
  //location: ".views-field-field-congress-meeting-location",
  //},
  //},
  //},
  //{
  //type: "puppeteerv4",
  //committee: "hapc",
  //collection: "houseCommittee",
  //name: "House Appropriations Committee Markups",
  //link: "https://appropriations.house.gov/events/markups",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //upcomingHearings: ".pane-content",
  //hearings: ".views-row",
  //dateTime: ".views-field-field-congress-meeting-date",
  //time: "div.newsie-details span:nth-child(2)",
  //location: ".views-field-field-congress-meeting-location",
  //},
  //},
  //},
  //{
  //type: "puppeteerv4",
  //committee: "hbuc",
  //collection: "houseCommittee",
  //name: "House Budget Committee Hearings",
  //link: "https://budget.house.gov/legislation/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //upcomingHearings: ".pane-content",
  //hearings: ".views-row",
  //dateTime: ".views-field-field-congress-meeting-date",
  //time: "div.newsie-details span:nth-child(2)",
  //},
  //},
  //},
  //{
  //type: "puppeteerv4",
  //committee: "hbuc",
  //collection: "houseCommittee",
  //name: "House Budget Committee Markups",
  //link: "https://budget.house.gov/legislation/markups",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //upcomingHearings: ".pane-content",
  //hearings: ".views-row",
  //dateTime: ".views-field-field-congress-meeting-date",
  //time: "div.newsie-details span:nth-child(2)",
  //},
  //},
  //},
  //{
  //type: "puppeteerv1",
  //committee: "help",
  //collection: "houseCommittee",
  //name: "House Education and Labor Committee Hearings",
  //link: "https://edlabor.house.gov/hearings-and-events",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: true, value: "span.date b" },
  //time: { label: true, value: "span.time b" },
  //location: { label: true, value: "span.location" },
  //},
  //},
  //},
  //{
  //type: "puppeteerv1",
  //committee: "help",
  //collection: "houseCommittee",
  //name: "House Education and Labor Committee Markups",
  //link: "https://edlabor.house.gov/markups",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tr.vevent",
  //},
  //layerTwo: {
  //title: "h1.main_page_title",
  //date: { label: true, value: "span.date b" },
  //time: { label: true, value: "span.time b" },
  //location: { label: true, value: "span.location b" },
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "nrgy",
  //collection: "houseCommittee",
  //name: "House Energy and Commerce Committee Hearings",
  //link: "https://energycommerce.house.gov/committee-activity/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: ".views-row",
  //date: { selector: ".date-display-single", instance: 0 },
  //splitDate: "-",
  //location: ".views-field-field-congress-meeting-location",
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "nrgy",
  //collection: "houseCommittee",
  //name: "House Energy and Commerce Committee Markups",
  //link: "https://energycommerce.house.gov/committee-activity/markups",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: ".views-row",
  //date: { selector: ".date-display-single", instance: 0 },
  //splitDate: "-",
  //location: ".views-field-field-congress-meeting-location",
  //},
  //},
  //},
  //{
  //type: "puppeteerv5",
  //committee: "fisv",
  //collection: "houseCommittee",
  //name: "House Financial Services Committee Hearings",
  //link:
  //"https://financialservices.house.gov/calendar/?EventTypeID=577&Congress=116",
  //selectors: {
  //layerOne: {
  //depth: 8,
  //rows: ".newsie-titler",
  //},
  //layerTwo: {
  //title: "h3.news-titler",
  //jquerySelector: ".topnewstext",
  //locationIndex: 0,
  //dateIndex: 1,
  //timeIndex: 2,
  //},
  //},
  //},
  //{
  //type: "puppeteerv5",
  //committee: "fisv",
  //collection: "houseCommittee",
  //name: "House Financial Services Committee Markups",
  //link:
  //"https://financialservices.house.gov/calendar/?EventTypeID=575&Congress=116",
  //selectors: {
  //layerOne: {
  //depth: 8,
  //rows: ".newsie-titler",
  //},
  //layerTwo: {
  //title: "h3.news-titler",
  //jquerySelector: ".topnewstext",
  //locationIndex: 0,
  //dateIndex: 1,
  //timeIndex: 2,
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "admn",
  //collection: "houseCommittee",
  //name: "House Administration Committee Hearings",
  //link: "https://cha.house.gov/committee-activity/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: ".view-content",
  //date: { selector: ".date-display-single", instance: 0 },
  //splitDate: "-",
  //location: ".views-field-field-congress-meeting-location",
  //},
  //},
  //},
  //// MUST ADD BUSINESS MEETINGS
  //{
  //type: "puppeteerv2",
  //committee: "admn",
  //collection: "houseCommittee",
  //name: "House Administration Committee Markups",
  //link: "https://cha.house.gov/committee-activity/markups",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: ".views-row",
  //date: { selector: ".date-display-single", instance: 0 },
  //splitDate: "-",
  //location: ".views-field-field-congress-meeting-location",
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "ntty",
  //collection: "houseCommittee",
  //name: "House Natural Resources Committee Hearings",
  //link: "https://naturalresources.house.gov/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "tr.vevent",
  //date: { selector: "time.dtstart", instance: 0 },
  //splitDate: " ",
  //location: "span.location",
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "ovst",
  //collection: "houseCommittee",
  //name: "House Oversight Committee Hearings",
  //link: "https://oversight.house.gov/legislation/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: ".views-row",
  //date: { selector: "span.date-display-single", instance: 0 },
  //splitDate: "-",
  //location: ".views-field-field-congress-meeting-location .field-content",
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "ovst",
  //collection: "houseCommittee",
  //name: "House Oversight Committee Markups",
  //link: "https://oversight.house.gov/legislation/business-meetings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows:
  //".pane-cng-meetings-panel-pane-business-meetings-upcoming .views-row",
  //date: "span.date-display-single",
  //splitDate: "-",
  //location: ".views-field-field-congress-meeting-location .field-content",
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "ovst",
  //collection: "houseCommittee",
  //name: "House Oversight Committee Briefings",
  //link: "https://oversight.house.gov/legislation/briefings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: ".views-row",
  //date: { selector: "span.date-display-single", instance: 0 },
  //splitDate: "-",
  //location: null,
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "scnc",
  //collection: "houseCommittee",
  //name: "House Science Committee Hearings",
  //link: "https://science.house.gov/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "#hearings--upcoming div.hearing",
  //date: { selector: ".hearing__date", instance: 0 },
  //time: { selector: ".hearing__time time", instance: 0 },
  //location: ".hearing__location",
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "scnc",
  //collection: "houseCommittee",
  //name: "House Science Committee Markups",
  //link: "https://science.house.gov/markups",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "#hearings--upcoming div.hearing",
  //date: { selector: ".hearing__date", instance: 0 },
  //time: { selector: ".hearing__time time", instance: 0 },
  //location: ".hearing__location",
  //},
  //},
  //},
  //{
  //type: "puppeteerv5",
  //committee: "smbs",
  //collection: "houseCommittee",
  //name: "House Small Business Committee Hearings and Markups",
  //link: "https://smallbusiness.house.gov/activity/",
  //selectors: {
  //layerOne: {
  //depth: 3,
  //rows: "ul.calendar-listing li",
  //},
  //layerTwo: {
  //title: "h3.news-titler",
  //jquerySelector: ".topnewstext",
  //locationIndex: null,
  //dateIndex: 0,
  //timeIndex: 1,
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "trns",
  //collection: "houseCommittee",
  //name: "House Transportation Committee Hearings",
  //link: "https://transportation.house.gov/committee-activity/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "div.hearings-table table tr.vevent",
  //date: { selector: "time.dtstart", instance: 0 },
  //time: { selector: "time.dtstart", instance: 1 }, // Zero indexed, second option
  //location: "span.location",
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "trns",
  //collection: "houseCommittee",
  //name: "House Transportation Committee Markups",
  //link: "https://transportation.house.gov/committee-activity/markups",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: "div.hearings-table table tr.vevent",
  //date: { selector: "time.dtstart", instance: 0 },
  //time: { selector: "time.dtstart", instance: 1 }, // Zero indexed, second option
  //},
  //},
  //},
  //{
  //type: "puppeteerv1",
  //committee: "wymn",
  //collection: "houseCommittee",
  //name: "House Ways and Means Committee Hearings",
  //link: "https://waysandmeans.house.gov/legislation/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: ".pane-congress-hearings-panel-pane-hearings-upcoming .views-row",
  //},
  //layerTwo: {
  //date: { label: false, value: "span.date-display-single" },
  //title: "h1.title",
  //splitDate: "-",
  //location: {
  //label: false,
  //value: ".field-name-field-congress-meeting-location .field-label",
  //},
  //},
  //},
  //},
  //{
  //type: "puppeteerv1",
  //committee: "wymn",
  //collection: "houseCommittee",
  //name: "House Ways and Means Committee Markups",
  //link: "https://waysandmeans.house.gov/legislation/markups",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: ".pane-congress-markups-panel-pane-markups-upcoming .views-row",
  //},
  //layerTwo: {
  //title: "h1.title",
  //date: { label: false, value: "span.date-display-single" },
  //splitDate: "-",
  //location: {
  //label: false,
  //value: ".field-name-field-congress-meeting-location .field-label",
  //},
  //},
  //},
  //},
  //{
  //type: "puppeteerv2",
  //committee: "clmt",
  //collection: "houseCommittee",
  //name: "House Climate Committee Hearings",
  //link: "https://climatecrisis.house.gov/committee-activity/hearings",
  //selectors: {
  //layerOne: {
  //depth: 10,
  //rows: ".views-row",
  //date: { selector: "span.date-display-single", instance: 0 },
  //splitDate: "-",
  //location: null,
  //},
  //},
  //},
];
