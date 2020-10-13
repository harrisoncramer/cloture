import Bull from "bull";
import { Queue } from "bull";
import { HouseCommitteeModel, SenateCommitteeModel } from "../../types";
import { GoodResult, E } from "../consumers";

// When a job finishes, this data will be obtained from Redis (passed there by the consumer).
// Take the data, parse it, and then check the metadata.
// If the meta.collection is "houseCommittee" then use the houseModel, otherwise use the senateModel.
// Clean the data, then try to save the data to the database.
// The other listeners listen to the queue and log information about the status of jobs
export const listeners = (queue: Queue) => {
  queue.on("completed", (job: Bull.Job) => {
    const value: GoodResult | E = job.returnvalue;
    if ("error" in value) {
      return console.error(value.errMsg);
    }

    const { meta, data } = value;

    const model =
      meta.collection === "houseCommittee"
        ? HouseCommitteeModel
        : SenateCommitteeModel;
    const committee = meta.committee;

    if (!model) {
      return console.error(
        `${job.name} could not find model, tried to find: ${meta.collection}`
      );
    }

    data
      .map((x) => ({ ...x, committee }))
      .map(async (datum) => {
        const doc = await model.findOne({ link: datum.link });
        if (!doc) {
          const newDoc = new model({ ...datum });
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
