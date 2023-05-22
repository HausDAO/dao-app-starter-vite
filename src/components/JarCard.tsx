import { AddressDisplay, Card, Label, ParMd } from "@daohaus/ui";
import cookie from "../assets/cookie.png";
import { TARGET_DAO } from "../targetDao";
import { ZERO_ADDRESS, formatPeriods, fromWei } from "@daohaus/utils";
import { StyledRouterLink } from "./Layout";
import { CookieJarEntry } from "../hooks/useIndexer";
import { BigNumber } from "ethers";
/**

 */
export const JarCard = ({
  record,
  user,
}: {
  record: CookieJarEntry;
  user: string | undefined;
}) => {
  console.log("Record: ", record);
  console.log(record.initializer.periodLength);
  return (
    <div style={{ marginBottom: "3rem" }}>
      <Card>
        <img src={cookie} alt="cookie" height={"20px"} />
        <ParMd style={{ marginBottom: ".4rem" }}>
          <AddressDisplay
            address={record.address}
            copy
            explorerNetworkId={TARGET_DAO.CHAIN_ID}
          />
        </ParMd>
        <Label>Safe: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          <AddressDisplay
            address={record.initializer.safeTarget}
            copy
            explorerNetworkId={TARGET_DAO.CHAIN_ID}
          />
        </ParMd>
        <Label>Type: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>{record.type}</ParMd>
        <Label>Title: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>{record.type}</ParMd>
        <Label>Description: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>...</ParMd>

        <Label>Period: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          {`${formatPeriods(
            BigNumber.from(record.initializer.periodLength).toString()
          )}`}
        </ParMd>
        <Label>Amount: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          {BigNumber.from(record.initializer.cookieAmount).toString()}
        </ParMd>
        <Label>Token: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          {record.initializer?.cookieToken == ZERO_ADDRESS
            ? "Native Token"
            : record?.initializer?.cookieToken}
        </ParMd>
        <Label>on allowlist: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          {
            // data?.isAllowList
            true ? "Yes" : "No"
          }
        </ParMd>
        <ParMd style={{ marginBottom: ".4rem" }}>
          Go to{" "}
          <StyledRouterLink
            to={`/claims/${TARGET_DAO.CHAIN_ID}/${record.address}`}
          >
            Claim
          </StyledRouterLink>{" "}
          to claim your tokens.
        </ParMd>
      </Card>
    </div>
  );
};
