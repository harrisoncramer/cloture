import { InputType, Field } from "type-graphql";
import { BaseType } from "./BaseType";
import { prop } from "@typegoose/typegoose";

export interface Report extends BaseType {
  title: string;
  id: string;
}

@InputType()
export class CrsReport extends BaseType implements Report {
  @Field()
  @prop({ required: true })
  title: string;

  @Field()
  @prop({ required: true })
  id: string;
}
