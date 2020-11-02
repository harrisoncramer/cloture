import mongoose from "mongoose";

interface Options {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  keepAlive: boolean;
  user?: string;
  pass?: string;
}

export const connect = async (): Promise<mongoose.Connection> => {
  try {
    // Set password options if in development and mongoose logging
    const options: Options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    };

    // If in development, set username and password and mongoose debugger
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", process.env.MONGOOSE_LOGS === "true");
      options.user = process.env.MONGODB_USER;
      options.pass = process.env.MONGODB_PASS;
    }

    // If in production, just connect to Atlas
    await mongoose.connect(process.env.MONGODB_URI as string, options);
    console.log(`📊 Databases connected`);
  } catch (err) {
    console.log("Could not connect to DB.");
    console.log(err);
    process.exit(1);
  }

  const db: mongoose.Connection = mongoose.connection;

  db.on("error", (err) => {
    console.log("Error occured in MongoDB.", err);
  });

  db.on("disconnected", () => {
    console.log(`📊 Databases disconnected`);
  });

  return db;
};
