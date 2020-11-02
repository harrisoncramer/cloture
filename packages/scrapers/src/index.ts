// Configure environment
import { resolve } from "path";
import dotenv from "dotenv";
const environment = process.env.NODE_ENV;
dotenv.config({ path: resolve(__dirname, `../.${environment}.env`) });

import { connect } from "./mongodb/connect";
import { configureRedis } from "./redis";
import { QueueHandler } from "./queue";

// Processes to run
import {
  senateDisclosures,
  getNewStatePressReleases,
  crsReports,
  houseCommittees,
} from "./scrapers";

// Types of return data
import { Report, StockDisclosure, PressRelease, Committee } from "./types";

// Jobs + Types
import { HouseJobTypes, houseJobs } from "./scrapers/houseCommittees/jobs";

const runProgram = async () => {
  await connect();
  await configureRedis();

  // Accepts return type and an optional shape for the data passed into each job.
  const crsQueue = new QueueHandler<Report>(
    "congressionalResearchReports",
    crsReports
  );

  const senateDisclosureQueue = new QueueHandler<StockDisclosure>(
    "senateDisclosures",
    senateDisclosures
  );

  const statePressReleasesQueue = new QueueHandler<PressRelease>(
    "statePressReleases",
    getNewStatePressReleases
  );

  const houseCommitteeQueue = new QueueHandler<Committee, HouseJobTypes>(
    "houseCommittees",
    houseCommittees
  );

  // Create more jobs every half hour...
  setInterval(async () => {
    await senateDisclosureQueue.createJobs({ retries: 1, timeout: 10000 });
    await statePressReleasesQueue.createJobs({ retries: 1, timeout: 10000 });
    await crsQueue.createJobs({ retries: 1, timeout: 10000 });
    await houseCommitteeQueue.createJobs({ retries: 1, timeout: 20000 }, [
      ...houseJobs,
    ]);
  }, 1800000);

  crsQueue.process();
  statePressReleasesQueue.process();
  senateDisclosureQueue.process();
  houseCommitteeQueue.process();
};

runProgram();
