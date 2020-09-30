import { Queue } from "bull";
import { HouseCommitteeModel, SenateCommitteeModel } from "types";
import { Result } from "../consumers";

// When a job finishes, this data will be obtained from Redis (passed there by the consumer).
// Take the data, parse it, and then check the metadata.
// If the meta.collection is "houseCommittee" then use the houseModel, otherwise use the senateModel.
// Clean the data, then try to save the data to the database.
// The other listeners listen to the queue and log information about the status of jobs
export const listeners = (queue: Queue): void => {
  //@ts-ignore
  queue.on("global:completed", async (id: string, result: string) => {
    const { data, meta }: Result = JSON.parse(result);
    const model =
      meta.collection === "houseCommittee"
        ? HouseCommitteeModel
        : SenateCommitteeModel;
    const committee = meta.committee;

    if (!model) {
      console.error(
        `${id} could not find model, tried to find: ${meta.collection}`
      );
    }

    // EDIT -- Fix "any" typing
    try {
      const promisedInsertsAndUpdates = data
        .map((x: any) => ({ ...x, committee }))
        .map(async (datum: any) => {
          const doc = await model.findOne({ link: datum.link });
          if (!doc) {
            const newDoc = new model({ ...datum });
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
      console.error(`${id} could not insert data. `, err);
    }
  });

  queue.on("global:active", (id) => {
    console.log(`${id} has started`);
  });

  queue.on("global:stalled", (id) => {
    console.error(`${id} has stalled`);
  });

  queue.on("global:failed", (id, err) => {
    console.error(`${id} failed. `, err);
  });

  queue.on("global:error", (err) => {
    console.error("The queue experienced an error. ", err);
  });
};
