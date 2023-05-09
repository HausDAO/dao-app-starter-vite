import {
    Bold,
    Button,
    H1,
    ParMd,
    Link,
    AddressDisplay,
    useBreakpoint,
    widthQuery,
    SingleColumnLayout,
    H2,
  } from '@daohaus/ui';
  

  import { ReactSetter } from '@daohaus/utils';
  import { Keychain } from '@daohaus/keychain-utils';
  

  import styled from 'styled-components';
import { SummonStates } from '../pages/Home';
import { HausAnimated } from './HausAnimated';
import { NavLink } from 'react-router-dom';
import { List } from '@daohaus/ui/components/molecules/NavigationMenu/NavigationMenu.styles';
  
  type SuccessProps = {
    daoAddress: string;
    chainId: string | null | undefined;
    setSummonState: ReactSetter<SummonStates>;
  };
  
  const AddressInfoSection = styled(SingleColumnLayout)`
    p,
    div {
      margin-bottom: 1rem;
    }
  
    a {
      margin-bottom: 1rem;
      align-items: flex-start;
    }
  `;
  
  const ButtonGroup = styled.div`
    display: flex;
    gap: 3rem;
    a {
      button {
        width: 200px;
        justify-content: center;
      }
    }
    @media ${widthQuery.sm} {
      flex-direction: column;
      button {
        margin-bottom: 2rem;
      }
    }
    /* justify-content: flex-start; */
  `;
  
  export const SummonerSuccess = ({
    daoAddress,
    chainId,
    setSummonState,
  }: SuccessProps) => {
    const handleResetSummon = () => {
      setSummonState('idle');
    };
    const isMobile = useBreakpoint(widthQuery.sm);
  
    return (
      <div>
        <H2>{" "}Contrats! Squad Coin Summoned</H2>
        <ParMd>A Squad Coin is a token and a DAO and a part of something larger.</ParMd>
        <ParMd><NavLink to="learn">Learn more about Big Squad DAOs</NavLink></ParMd>
        <AddressInfoSection>
          <ParMd className="info">DAO contract:</ParMd>
          <AddressDisplay
            address={daoAddress}
            copy
            explorerNetworkId={chainId as keyof Keychain}
            truncate={isMobile}
          />
        </AddressInfoSection>
        <ButtonGroup>
          <Button
            color="secondary"
            onClick={handleResetSummon}
            // centerAlign={isMobile}
            fullWidth={isMobile}
          >
            <Bold>Summon Another Token and DAO</Bold>
          </Button>
          <Link
            href={`https://admin.daohaus.fun/#/molochv3/${chainId}/${daoAddress}`}
            showExternalIcon={false}
          >
            <Button
              // centerAlign={isMobile}
              fullWidth={isMobile}
            >
              View DAO
            </Button>
          </Link>
        </ButtonGroup>
      </div>
    );
  };