import { InputType, Field } from "type-graphql";
import { prop } from "@typegoose/typegoose";
import { BaseType } from "./BaseType";

export interface StockDisclosure extends BaseType {
  firstName: string;
  lastName: string;
}

@InputType()
export class SenateStockDisclosure extends BaseType implements StockDisclosure {
  @Field()
  @prop({ required: true })
  firstName: string;

  @Field()
  @prop({ required: true })
  lastName: string;
}
