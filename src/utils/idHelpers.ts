import { BigNumber } from "ethers";
import _ from "lodash";

export const decimalId = (hatId: string) => {
  if (!hatId) return null;
  return BigNumber.from(hatId).toString();
};

export function prettyIdToUrlId(id: string) {
  const treeId = decimalId(id.slice(0, 10));
  const children = id.slice(11, 66);

  if (children) {
    const childrenIds = _.split(children, ".");
    const test = _.map(childrenIds, (index) => {
      return BigNumber.from(index).toString();
    });
    const joined = _.join([treeId, ...test], "_");
    return joined;
  }
  return treeId;
}
