import Bull from "bull";
import { Queue } from "bull";
import { FinancialDisclosureModel } from "../../types";
import { FinancialDisclosure, E } from "../../types/shared";

export const listeners = (queue: Queue) => {
  queue.on("completed", (job: Bull.Job): void => {
    const value: FinancialDisclosure | E = job.returnvalue;
    if ("error" in value) {
      return console.error(value.errorMsg);
    }

    const { meta, data } = value;

    data.map(async (datum) => {
      const doc = await FinancialDisclosureModel.findOne({
        link: datum.link,
      });
      if (!doc) {
        const newDoc = new FinancialDisclosureModel({ ...datum });
        await newDoc.save();
      } else {
        doc.set({ ...datum });
        await doc.save();
      }
    });
  });

  queue.on("active", (job) => {
    console.log(`${job.name} has started`);
  });

  queue.on("stalled", (job) => {
    console.error(`${job.name} has stalled`);
  });

  queue.on("failed", (job, err) => {
    console.error(`${job.name} failed. `, err);
  });

  queue.on("error", (err) => {
    console.error("The queue experienced an error. ", err);
  });
};
