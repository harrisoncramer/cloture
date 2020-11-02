import { InputType, Field } from "type-graphql";
import { prop } from "@typegoose/typegoose";
import { BaseType } from "./BaseType";

export interface PressRelease extends BaseType {
  title: string;
  authorBureau: string;
  kind: string;
  text: string;
  tags: string[];
}

// Used to query for committees
@InputType()
export class StatePressRelease extends BaseType implements PressRelease {
  @Field()
  @prop({ required: true })
  title: string;

  @Field()
  @prop({ required: true })
  authorBureau: string;

  @Field()
  @prop({ required: true })
  kind: string;

  @Field()
  @prop({ required: true })
  text: string;

  @Field((type) => [String])
  @prop({ type: String })
  tags: string[];
}
