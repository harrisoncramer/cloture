import { Field, ObjectType } from "type-graphql";
import { Committee } from "../shared/types";
import { getModelForClass, prop } from "@typegoose/typegoose";

enum SenateCommittees {
  SENATE_FOREIGN_RELATIONS_COMMITTEE = "sfrc",
  SENATE_ARMED_SERVICES_COMMITTEE = "sasc",
  SENATE_AGRICULTURE_COMMITTEE = "sagc",
  SENATE_APPROPRIATIONS_COMMITTEE = "sapc",
  SENATE_BANKING_COMMITTEE = "sbnk",
  SENATE_BUDGET_COMMITTEE = "sbdg",
  SENATE_TRASPORTATION_COMMITTEE = "sstr",
  SENATE_NATURAL_RESOURCES_COMMITTEE = "snat",
  SENATE_ENVIRONMENT_AND_PUBLIC_WORKS_COMMITTEE = "senv",
  SENATE_FINANCE_COMMITTEE = "sfin",
  SENATE_HEALTH_EDUCATION_AND_LABOR_COMMITTEE = "shlp",
  SENATE_HOMELAND_SECURITY_COMMITTEE = "shsc",
  SENATE_INDIAN_AFFAIRS_COMMITTEE = "sind",
  SENATE_JUDICIARY_COMMITTEE = "sjud",
  SENATE_RULES_COMMITTEE = "srle",
  SENATE_ETHICS_COMMITTEE = "seth",
  SENATE_INTELLIGENCE_COMMITTEE = "ssci",
  SENATE_SMALL_BUSINESS_COMMITEE = "ssbs",
  SENATE_VETERANS_AFFAIRS_COMMITTEE = "svac",
}

@ObjectType()
export class SenateCommittee extends Committee {
  @Field()
  @prop({ required: true, enum: SenateCommittees })
  committee: string;
}

export const SenateCommitteeModel = getModelForClass(SenateCommittee);
