import { Field, ObjectType } from "type-graphql";
import { Committee } from "../shared/types";
import { getModelForClass, prop } from "@typegoose/typegoose";

enum HouseCommittees {
  HOUSE_ARMED_SERVICES_COMMITTEE = "hasc",
  HOUSE_FOREIGN_RELATIONS_COMMITTEE = "hfac",
  HOUSE_JUDICIARY_COMMITTEE = "hjud",
  HOUSE_RULES_COMMITTEE = "hrle",
  HOUSE_VETERANS_AFFAIRS_COMMITTEE = "hvac",
  HOUSE_HOMELAND_SECURITY_COMMITTEE = "hhsc",
  HOUSE_AGRICULTURE_COMMITTEE = "hagc",
  HOUSE_APPROPRIATIONS_COMMITTEE = "hapc",
  HOUSE_BUDGET_COMMITTEE = "hbuc",
  HOUSE_EDUCATION_AND_LABOR_COMMITTEE = "help",
  HOUSE_ENERGY_AND_COMMERCE_COMMITTEE = "nrgy",
  HOUSE_FINANCIAL_SERVICES_COMMITTEE = "fisv",
  HOUSE_ADMINISTRATION_COMMITTEE = "admn",
  HOUSE_NATURAL_RESOURCES_COMMITTEE = "ntty",
  HOUSE_OVERSIGHT_AND_REFORM_COMMITTEE = "ovst",
  HOUSE_SCIENCE_SPACE_AND_TECHNOLOGY_COMMITTEE = "scnc",
  HOUSE_SMALL_BUSINESS_COMMMITTEE = "smbs",
  HOUSE_TRANSPORTATION_AND_INFRASTRUCTURE_COMMITTEE = "trns",
  HOUSE_WAYS_AND_MEANS_COMMITTEE = "wymn",
  HOUSE_CLIMATE_COMMITTEE = "clmt",
}

@ObjectType()
export class HouseCommittee extends Committee {
  @Field()
  @prop({ required: true, enum: HouseCommittees })
  committee: string;
}

export const HouseCommitteeModel = getModelForClass(HouseCommittee);
