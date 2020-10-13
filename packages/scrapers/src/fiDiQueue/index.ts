import Bull from "bull";

import { producers } from "./producers";
import { senateFinancialDisclosure } from "./jobs";

export const setupFiDiQueue = async (): Promise<void> => {
  // Create an instance of the Bull queue: https://github.com/OptimalBits/bull
  try {
    var queue = new Bull("fiDiQueue", {
      redis: {
        port: parseInt(process.env.REDIS_PORT ?? "1000"),
        host: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
      },
    });
  } catch (err) {
    console.error("Could not create FiDi queue.");
    throw err;
  }

  try {
    await producers(queue, [senateFinancialDisclosure]);
  } catch (err) {
    console.error("Could not setup FiDi producers.");
    throw err;
  }
};
