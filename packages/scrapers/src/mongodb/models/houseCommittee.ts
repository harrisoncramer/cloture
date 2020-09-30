import mongoose, { Schema } from "mongoose";
import moment from "moment";

let houseCommitteeSchema = new Schema({
  committee: {
    type: String,
    required: [true, "A valid house committee is required."],
    enum: [
      "hrle",
      "hjud",
      "hasc",
      "hfac",
      "hvac",
      "hhsc",
      "hagc",
      "hapc",
      "hbuc",
      "help",
      "nrgy",
      "fisv",
      "admn",
      "ntty",
      "ovst",
      "scnc",
      "smbs",
      "trns",
      "wymn",
      "clmt",
    ],
  },
  title: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
    unique: true,
  },
  location: {
    type: String,
    required: false,
  },
  time: {
    type: Date,
    require: false,
    set: (time: string) => {
      let momentified = moment(time);
      if (momentified.isValid()) {
        let hours = momentified.hours();
        if (hours < 6) {
          // If the time is between 12 and 6am, it should be flipped to pm
          time = momentified.add(12, "hours").toISOString();
        }
      }
      return time;
    },
  },
  date: {
    type: Date,
    require: false,
  },
  text: {
    type: String,
    require: false,
  },
});

houseCommitteeSchema.pre("save", function (next) {
  // Reassign to document to allow for "wasNew" property
  const document: mongoose.Document & any = this;
  document.wasNew = document.isNew; // Pass "newness" as new property for post-save hook
  if (!document.isNew) {
    // If it's not new, then log the updates here.
    let modifiedPaths = document.modifiedPaths();
    if (modifiedPaths.length > 0) {
      modifiedPaths.forEach((path: string) => {
        console.log(
          `${document.id} ${path} ––> ${JSON.stringify(document[path])}`
        );
      });
    }
  }
  next();
});

houseCommitteeSchema.post("save", function (
  doc: mongoose.Document & any,
  next
) {
  if (doc.wasNew) {
    console.log(`Document saved with id ${doc._id}`);
  }
});

// Convert dates + times upon fetch
houseCommitteeSchema
  .path("date")
  .get((v: string) => (moment(v).isValid() ? moment(v).format("LL") : null));
houseCommitteeSchema
  .path("time")
  .get((v: string) => (moment(v).isValid() ? moment(v).format("LT") : null));

// Make model and export
const houseCommittee = mongoose.model("houseCommittee", houseCommitteeSchema);
export { houseCommittee };
