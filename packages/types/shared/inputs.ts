import { InputType, Field } from "type-graphql";

// Used to query for committees
@InputType()
export class CommitteeInput {
  @Field((type) => [String], { nullable: true })
  committee?: string[];

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  minDate?: Date;

  @Field({ nullable: true })
  maxDate?: Date;

  @Field({ nullable: true })
  minTime?: Date;

  @Field({ nullable: true })
  maxTime?: Date;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: false })
  skip: number;

  @Field({ nullable: false })
  limit: number;
}
