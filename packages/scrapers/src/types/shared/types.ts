import { Field, ObjectType } from "type-graphql";
import { prop, pre, post } from "@typegoose/typegoose";
import mongoose from "mongoose";
import moment from "moment";

const validFormats = {
  date: [
    "MMM D, YYYY",
    "MM.DD.YY",
    "MMM D YYYY",
    "MMM D",
    "MMM DD YYYY",
    "MMMM DD, YYYY",
    "MMMM D, YYYY",
    "MM/DD/YYYY",
    "MM/DD/YY",
    "M/DD/YY",
    "M/D/YY",
    "ddd, MM/DD/YYYY",
    "dddd, MMMM DD, YYYY",
    "dddd, MMMM D, YYYY",
  ],
  time: [
    "LT",
    "hh:mm A",
    "h:mm A",
    "hh:mm a",
    "h:mm a",
    "hh:mmA",
    "h:mmA",
    "hh:mma",
    "h:mma",
    "hh:mm",
    "h:mm [p.m.]",
    "h:mm [a.m.]",
    "h:mm [A.M.]",
    "h:mm [P.M.]",
    "h.mm [p.m.]",
    "h.mm [a.m.]",
    "h.mm [A.M.]",
    "h.mm [P.M.]",
  ],
};

const handleSetTime = (time: string) => {
  const validFormat = validFormats.time.find((format) =>
    moment(time, format, true).isValid()
  );
  return moment(time, validFormat).toDate();
};

const handleSetDate = (date: string) => {
  const validFormat = validFormats.date.find((format) =>
    moment(date, format, true).isValid()
  );
  return moment(date, validFormat).toDate();
};

@ObjectType({ description: "The base class for Senate and House committees." })
// The pre-save logger. Logs out modified paths.
@pre<Committee>("save", function (next) {
  const document: mongoose.Document & any = this;
  document.wasNew = document.isNew; // Pass "newness" as new property for post-save
  if (!document.isNew) {
    let modifiedPaths = document.modifiedPaths();
    if (modifiedPaths.length > 0) {
      modifiedPaths.forEach((path: string) => {
        console.log(`${document.id} ${path} modified.`);
      });
    }
  }
  next();
})
// The post-save logger. Logs out id of new documents.
@post<Committee>("save", function (doc: mongoose.Document & any, next) {
  if (doc.wasNew) {
    console.log(`Document saved with id ${doc._id}`);
  }
})
@post<Committee>("save", function (
  err: mongoose.Error,
  doc: mongoose.Document,
  next: any
) {
  console.log("Document could not save: ", err.message);
  next();
})
export class Committee {
  @Field()
  @prop({ required: true })
  title: string;

  @Field()
  @prop({ required: true, unique: true })
  link: string;

  @Field()
  @prop({
    required: true,
    get: (date) => date,
    set: (date: string) => handleSetDate(date),
  })
  date: Date;

  @Field({ nullable: true })
  @prop({ get: (date) => date, set: (time: string) => handleSetTime(time) })
  time?: Date;

  @Field({ nullable: true })
  @prop()
  text?: string;

  @Field({ nullable: true })
  @prop()
  location?: string;
}

export type CommitteeDocument = Committee & {
  committee: string;
};
