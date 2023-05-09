import { H2, Link, ParMd, ParSm, SingleColumnLayout } from "@daohaus/ui";
import styled from "styled-components";
import { TARGET_DAO } from "../targetDao";
import { formatPeriods, formatValueTo, toWholeUnits } from "@daohaus/utils";

const LinkBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

export const Learn = () => {
  return (
    <div>
      <SingleColumnLayout
        title="Squad Coins"
        subtitle="How does a Squad Coin work?"
        description="A Squad Coin is a standard ERC20. When you summon the coin the majority will be in your account. You can allocate it how you wan't, do a preallocation, set up a liquidity pool, buy and sell through an AMM."
      >
        <ParSm>
          A Squad Coin is also a part of the Big Squad DAO, a DAO aligned around
          all squad coins. A small portion of the total supply is held by the
          Big Squad.
        </ParSm>
      </SingleColumnLayout>
      <SingleColumnLayout
        title="How does a DAO work?"
        subtitle="The squad coin is also a fully on chain Arbitrum DAO"
        description="Holders are members and can make proposals and vote. You can even have a shared treasury and autonmous execution."
      >
        <ParSm>
          But a DAO of 1 is not much of a DAO is it? you must get the coin out
          to members. You can do this by airdrop, or by sale or auction. You can
          also use the DAO to distribute the coin.
        </ParSm>
      </SingleColumnLayout>
      <SingleColumnLayout title="The new DAOs initial settings:">
        <div>
          <ParMd>
            <strong>Sponsor Threshold </strong>
            {formatValueTo({
              value: toWholeUnits(TARGET_DAO.SPONSOR_THRESHOLD, 18),
              decimals: 0,
              format: "numberShort",
              unit: "tokens",
            })}
          </ParMd>
          <ParSm>
            Sponsor Threshold is the amount of tokens that a member must have to
            take a proposal from staging to actual voting.
          </ParSm>
          <ParMd>
            <strong>
              Voting period {formatPeriods(TARGET_DAO.VOTING_PERIOD.toString())}
            </strong>
          </ParMd>
          <ParSm>
            Voting period is the time when members can vote yes or no to a
            proposal.
          </ParSm>
          <ParMd>
            <strong>
              Grace period {formatPeriods(TARGET_DAO.GRACE_PERIOD.toString())}
            </strong>
          </ParMd>
          <ParSm>
            Grace period is a lock up time between a proposal finishing and
            being executed. (individual ragequits)
          </ParSm>
          <ParMd>
            <strong>Yes Vote Quorum {TARGET_DAO.QUORUM}%</strong>
          </ParMd>
          <ParSm>
            Quorum is the percentage of coins that must participate and vote yes
            for a proposal to pass.
          </ParSm>
          <ParSm>
            Learn more about{" "}
            <Link href="https://daohaus.mirror.xyz/U_JQtheSzdpRFqQwf9Ow3LgLNG0WMZ6ibAyrjWDu_fc">
              Moloch v3, Proposal life cycles and ragequits
            </Link>
          </ParSm>
        </div>
      </SingleColumnLayout>
      <SingleColumnLayout
        title="How do I join The Big Squad DAO?"
        subtitle="Big Squad is a DAO"
      >
        <div>
          <ParMd>
            The Big Squad DAO is to alighn all Squads with a shared but initialy
            non ragequitable treasury. Tokens are initialy non transferable and
            members make proposals to manage the mission, roadmap and treasury.
          </ParMd>
          <ParMd>
            <strong>There are two ways to join the DAO.</strong>
          </ParMd>
          <ParSm>1. You can join Big Squad DAO by staking ETH.
          </ParSm>
          <ParSm>
            2. You can get a Big Squad Coin from the DAO (for being a good
            squad).
          </ParSm>
          <ParSm>
            Stake and join here{" "}
            <Link href="https://join-big-squad.netlify.app/">
              Big Squad Onboarder
            </Link>
          </ParSm>
          <ParMd>
            <strong>The Big Squad proposals will include</strong>
          </ParMd>
          <ParSm>1. Providing or pulling liquidity from a SC.</ParSm>
          <ParSm>2. Enabling ragequit</ParSm>
          <ParSm>3. Enabling transferability of shares</ParSm>
          <ParSm>4. Rewarding SC with shares</ParSm>
          <ParSm>5. Selling or burning SC</ParSm>
        </div>
      </SingleColumnLayout>
      <ParSm style={{ marginTop: "2em" }}>
        If you summoned a squad coin but can't remember the DAO{" "}
        <Link href="https://admin.daohaus.club/">
          DAOhaus HUB demo
        </Link>
      </ParSm>
      <ParSm style={{ marginTop: "2em" }}>
        If you're not interested in a squad coin you can still summon a DAO{" "}
        <Link href="https://summon.daohaus.club/">
          with the Advanced Summoner
        </Link>
      </ParSm>
    </div>
  );
};
