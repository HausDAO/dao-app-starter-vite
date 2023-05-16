import { AddressDisplay, Card, Label, ParMd } from "@daohaus/ui";
import cookie from "../assets/cookie.png";
import { TARGET_DAO } from "../targetDao";
import { ZERO_ADDRESS, formatPeriods, fromWei } from "@daohaus/utils";
import { StyledRouterLink } from "./Layout";
import { CookieJarEntry } from "../utils/chainsauce";

interface JarRecord {
  title: string;
  description: string;
  link: string;
  cookieJar: string;
  jarType: string;
  isAllowlist: boolean;
  initParamsObj: {
    safe: string;
    period: number;
    amount: number;
    token: string;
  };
}

/**

 */
export const JarCard = ({
  record,
  user,
}: {
  record: CookieJarEntry;
  user: string | undefined;
}) => {
  // const { isIdle, isLoading, error, data, hasClaimed, canClaim, refetch } =
  //   useCookieJar({
  //     cookieJarAddress: record?.address,
  //     userAddress: user,
  //     chainId: TARGET_DAO.CHAIN_ID,
  //   });

  return (
    <div style={{ marginBottom: "3rem" }}>
      <Card>
        <img src={cookie} alt="cookie" height={"20px"} />
        <ParMd style={{ marginBottom: ".4rem" }}>
          <AddressDisplay
            address={record?.address}
            copy
            explorerNetworkId={TARGET_DAO.CHAIN_ID}
          />
        </ParMd>
        <Label>Safe: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          <AddressDisplay
            address={record?.initializer?.safe}
            copy
            explorerNetworkId={TARGET_DAO.CHAIN_ID}
          />
        </ParMd>
        <Label>Type: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>??</ParMd>
        <Label>Title: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>{record?.type}</ParMd>
        <Label>Description: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>...</ParMd>

        <Label>Period: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          {formatPeriods(record?.initializer?.period.toString())}
        </ParMd>
        <Label>Amount: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          {fromWei(record?.initializer?.amount.toString())}
        </ParMd>
        <Label>Token: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          {record?.initializer?.token == ZERO_ADDRESS
            ? "Native Token"
            : record?.initializer?.token}
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
            to={`/claims/${TARGET_DAO.CHAIN_ID}/${record?.address}`}
          >
            Claim
          </StyledRouterLink>{" "}
          to claim your tokens.
        </ParMd>
      </Card>
    </div>
  );
};
