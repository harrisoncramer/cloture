import { getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { AnyParamConstructor } from "@typegoose/typegoose/lib/types";

interface DataType {
  link: string;
}

interface GenericObject<T> {
  [key: string]: T;
}

// Accepts class, creates model, allows for saving data
// Data not passed upon initialization, pass into saveOrUpdate
export class Saver<T extends DataType> {
  model: ReturnModelType<AnyParamConstructor<any>, {}>;
  constructor(public dataClass: any) {
    const model = getModelForClass(dataClass);
    this.model = model;
  }
  async saveOrUpdate(data: T[]): Promise<void> {
    const savedDocuments = data.map((datum) => {
      return this.model.findOneAndUpdate({ link: datum.link }, datum, {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
        useFindAndModify: false,
      });
    });

    await Promise.all(savedDocuments);
  }

  async findOne(query: GenericObject<string>): Promise<boolean> {
    const doc = await this.model.findOne(query);
    if (!doc) {
      return false;
    } else {
      return true;
    }
  }
}
