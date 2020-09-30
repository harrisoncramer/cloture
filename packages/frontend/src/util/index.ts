import { houseCommittees, senateCommittees } from "../statics";

export const escapeRegExp = (x: string): string =>
  x.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

export const goToLink = (link: string) => {
  window.open(link, "_blank");
};

export const getCommitteeLabel = (x: string, y: string) => {
  if (y === "HouseCommittee") {
    const temp = houseCommittees.find((a) => a.value === x);
    return temp ? temp.label : "";
  } else {
    const temp = senateCommittees.find((a) => a.value === x);
    return temp ? temp.label : "";
  }
};

export default goToLink;
