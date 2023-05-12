import styled from "styled-components";

import {
  AddressDisplay,
  Avatar,
  Badge,
  Card,
  Label,
  Link,
  ParMd,
} from "@daohaus/ui";
import cookie from "../assets/cookie.png";
import { useProfile } from "@daohaus/moloch-v3-hooks";
import { TARGET_DAO } from "../targetDao";
import { useCookieJar } from "../hooks/useCookieJar";
import { ZERO_ADDRESS, formatPeriods, fromWei } from "@daohaus/utils";
import { StyledRouterLink } from "./Layout";

const DootBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

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
  record: JarRecord;
  user: string | undefined;
}) => {
  const { isIdle, isLoading, error, data, hasClaimed, canClaim, refetch } =
    useCookieJar({
      cookieJarAddress: record?.cookieJar,
      userAddress: user,
      chainId: TARGET_DAO.CHAIN_ID,
    });

  return (
    <div style={{ marginBottom: "3rem" }}>
      <Card>
        <img src={cookie} alt="cookie" height={"20px"} />
        <ParMd style={{ marginBottom: ".4rem" }}>
          <AddressDisplay
            address={record?.cookieJar}
            copy
            explorerNetworkId={TARGET_DAO.CHAIN_ID}
          />
        </ParMd>
        <Label>Safe: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          
          <AddressDisplay
            address={record?.initParamsObj?.safe}
            copy
            explorerNetworkId={TARGET_DAO.CHAIN_ID}
          />
        </ParMd>
        <Label>Type: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>??</ParMd>
        <Label>Title: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>{record?.jarType}</ParMd>
        <Label>Description: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>...</ParMd>

        <Label>Period: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          {formatPeriods(record?.initParamsObj?.period.toString())}
        </ParMd>
        <Label>Amount: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          {fromWei(record?.initParamsObj?.amount.toString())}
        </ParMd>
        <Label>Token: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
          {record?.initParamsObj?.token == ZERO_ADDRESS
            ? "Native Token"
            : record?.initParamsObj?.token}
        </ParMd>
        <Label>on allowlist: </Label>
        <ParMd style={{ marginBottom: ".4rem" }}>
        {
        // data?.isAllowList
        true ? "Yes" : "No"}
        </ParMd>
        <ParMd style={{ marginBottom: ".4rem" }}>
          Go to{" "}
          <StyledRouterLink to={`/claims/${TARGET_DAO.CHAIN_ID}/${record?.cookieJar}`}>
            Claim
          </StyledRouterLink>{" "}
          to claim your tokens.
        </ParMd>
      </Card>
    </div>
  );
};
