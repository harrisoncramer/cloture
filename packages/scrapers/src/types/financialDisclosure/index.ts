import { Field, ObjectType } from "type-graphql";
import { FinancialDisclosure } from "../shared/types";
import { getModelForClass, prop } from "@typegoose/typegoose";

@ObjectType()
export class SenateFinancialDisclosure extends FinancialDisclosure {
  @Field()
  @prop()
  link: string;

  @Field()
  @prop()
  firstName: string;

  @Field()
  @prop()
  lastName: string;

  @Field()
  @prop()
  date: Date;
}

export const FinancialDisclosureModel = getModelForClass(
  SenateFinancialDisclosure
);
