import { useCurrentDao, useDaoMember } from "@daohaus/moloch-v3-hooks";
import { ParLg, SingleColumnLayout } from "@daohaus/ui";
import { MemberDisplay } from "@daohaus/moloch-v3-macro-ui";

export const Member = () => {
  const { daoChain, daoId } = useCurrentDao();
  const { member } = useDaoMember();

  return (
    <SingleColumnLayout>
      <ParLg>{member?.memberAddress}</ParLg>

      {daoChain && daoId && member && (
        <div>
          <MemberDisplay
            memberAddress={member.memberAddress}
            daoId={daoId}
            daoChain={daoChain}
          />
        </div>
      )}
    </SingleColumnLayout>
  );
};
