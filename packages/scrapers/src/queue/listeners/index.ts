import Bull from "bull";
import { Queue, JobOptions } from "bull";
import { HouseCommitteeModel, SenateCommitteeModel } from "../../types";
import { GoodResult, E } from "../consumers";

// When a job finishes, this data will be obtained from Redis (passed there by the consumer).
// Take the data, parse it, and then check the metadata.
// If the meta.collection is "houseCommittee" then use the houseModel, otherwise use the senateModel.
// Clean the data, then try to save the data to the database.
// The other listeners listen to the queue and log information about the status of jobs
export const listeners = async (queue: Queue) => {
  queue.on(
    "completed",
    async (job: Bull.Job): Promise<void> => {
      const value: GoodResult | E = job.returnvalue;
      if ("error" in value) {
        return console.error(value.errMsg);
      }

      const { meta, data } = value;

      let model =
        meta.collection === "houseCommittee"
          ? HouseCommitteeModel
          : SenateCommitteeModel;
      let committee = meta.committee;

      if (!model) {
        return console.error(
          `${job.name} could not find model, tried to find: ${meta.collection}`
        );
      }

      try {
        let promisedInsertsAndUpdates = data
          .map((x) => ({ ...x, committee }))
          .map(async (datum) => {
            let doc = await model.findOne({ link: datum.link });
            if (!doc) {
              let newDoc = new model({ ...datum });
              return await newDoc.save();
            } else {
              doc.set({ ...datum });
              return await doc.save();
            }
          });

        // Once all promises have resolved (if data was new or not) then finish.
        // EDIT -- Change this to Promise.allSettled and log the errored values, such as when data does not match the schema
        // Also, must reattach the pre/post save hooks to the schemas! See the cloture.app.backend repository
        await Promise.all(promisedInsertsAndUpdates);
      } catch (err) {
        console.error(`${job.name} could not insert data.`);
      }
    }
  );

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
