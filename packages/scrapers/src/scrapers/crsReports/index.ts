import path from "path";
import { execShellCommand, chunk } from "../../util";
import { Saver } from "../../mongodb/Saver";
import { CrsReport, Report } from "../../types";
import moment from "moment";

export const crsReports = async (): Promise<void> => {
  const res = await execShellCommand(
    "pipenv run python3",
    path.resolve(__dirname, "parser.py")
  );

  let rows: string[][] = chunk(4, res.split("\n"));
  let data: Report[] = rows
    .filter((x) => x.length === 4)
    .map((item) => {
      return {
        title: item[0],
        link: item[1],
        date: moment(item[2]).toDate(),
        id: item[3],
      };
    });

  const saver = new Saver<CrsReport>(CrsReport);
  await saver.saveOrUpdate(data);
};
