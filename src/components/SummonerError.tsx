import {
    Bold,
    Button,
    H1,
    ParLg,
    ParMd,
    Link,
    useBreakpoint,
    widthQuery,
  } from '@daohaus/ui';
  import { ExplorerLink } from '@daohaus/connect';
import { ReactSetter } from '@daohaus/utils';
import { SummonStates } from '../pages/Home';
import { HausAnimated } from './HausAnimated';
  
  
  type ErrorProps = {
    daoAddress: string;
    setSummonState: ReactSetter<SummonStates>;
    errMsg: string;
  };
  
  export const SummonError = ({
    daoAddress,
    setSummonState,
    errMsg,
  }: ErrorProps) => {
    const handleResetSummon = () => {
      setSummonState('idle');
    };
    const isMobile = useBreakpoint(widthQuery.sm);
    return (
      <div>
        <H1 className="title">
          <Bold>Summon Error</Bold>
        </H1>
        <ParMd>
          Learn more about{' '}
          <Link href="https://daohaus.mirror.xyz/U_JQtheSzdpRFqQwf9Ow3LgLNG0WMZ6ibAyrjWDu_fc">
            Moloch v3
          </Link>
        </ParMd>
        <HausAnimated />
        <>
          <ParLg className="info">
            <Bold>Summon Failed:</Bold>
          </ParLg>
          {errMsg && <ParMd>{errMsg}</ParMd>}
          <ExplorerLink address={daoAddress}>View Transaction</ExplorerLink>
        </>
        <Button
          color="secondary"
          onClick={handleResetSummon}
          fullWidth={isMobile}
          // centerAlign={isMobile}
        >
          Summon Another DAO
        </Button>
      </div>
    );
  };