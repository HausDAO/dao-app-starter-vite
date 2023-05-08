import { Bold, H1, ParMd, Link } from '@daohaus/ui';
import { ExplorerLink } from '@daohaus/connect';
import { HausAnimated } from './HausAnimated';


type LoadingProps = {
  txHash: string;
};

export const SummonerLoading = ({ txHash }: LoadingProps) => {
  return (
    <div>
      <H1 className="title">
        <Bold>Summon a DAO</Bold>
      </H1>
      <ParMd>
        Learn more about{' '}
        <Link href="https://daohaus.mirror.xyz/U_JQtheSzdpRFqQwf9Ow3LgLNG0WMZ6ibAyrjWDu_fc">
          Moloch v3
        </Link>
      </ParMd>
      <HausAnimated />
      <>
        <ParMd className="info">DAO contract deployment in progress.</ParMd>
        <ExplorerLink address={txHash} type="tx">
          Watch Transaction
        </ExplorerLink>
      </>
    </div>
  );
};