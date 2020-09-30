import { Resolver, Query, Arg } from "type-graphql";

// Import GQL and Mongoose types...
import { SenateCommittee, SenateCommitteeModel } from "types";
import { CommitteeInput } from "types/shared";

@Resolver()
export class SenateCommitteeResolver {
  @Query(() => [SenateCommittee]) // Cannot return null will return array of HouseCommittee
  async allSenateCommittees(
    @Arg("input") { minDate, maxDate, skip, limit }: CommitteeInput
  ): Promise<SenateCommittee[]> {
    const query = SenateCommitteeModel.find({});
    minDate && query.where("date").gte(minDate);
    maxDate && query.where("date").lte(maxDate);
    const res = await query.skip(skip).limit(limit).exec();
    return res;
  }

  @Query(() => [SenateCommittee], { nullable: true }) // Can return empty array
  async senateCommittees(
    @Arg("input")
    {
      title,
      committee,
      minDate,
      maxDate,
      link,
      text,
      location,
      skip,
      limit,
    }: CommitteeInput
  ): Promise<SenateCommittee[]> {
    const query = SenateCommitteeModel.find({});
    // Conditionally build up query...
    title && query.where("title").equals(new RegExp(title, "gi"));
    minDate && query.where("date").gte(minDate);
    maxDate && query.where("date").lte(maxDate);
    link && query.where("link").equals(link);
    text && query.where("text").equals(new RegExp(text, "gi"));
    location && query.where("location").equals(new RegExp(location, "gi"));
    committee && query.where("committee").in(committee);
    const res = await query.sort({ date: 1 }).skip(skip).limit(limit).exec();
    return res;
  }

  @Query(() => SenateCommittee, { nullable: true })
  async senateCommittee(
    @Arg("input")
    args: CommitteeInput
  ): Promise<SenateCommittee | null> {
    if (Object.values(args).some((x) => x !== null)) {
      const { title, committee } = args;
      const query = SenateCommitteeModel.findOne({});
      title && query.where("title").equals(new RegExp(title, "gi"));
      committee && query.where("committee").equals(committee);
      const res = await query.exec();
      return res ? res.toObject() : null;
    } else {
      return null;
    }
  }
}
