import { ComponentProps, ReactNode } from 'react';

import { AppSwitcher, Footer, MainLayout, widthQuery } from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';
import styled from 'styled-components';
import { DaoHausNavProps } from '@daohaus/connect/components/DaoHausNav/DaoHausNav.types';
import { DaoHausNav, DaoHausNavMenu } from '@daohaus/connect';
import CookieFooter from './CookieFooter';
import { useParams } from 'react-router-dom';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.6rem 3rem;
  width: 100%;
  @media ${widthQuery.sm} {
    padding: 2rem;
  }
  .left-nav {
    @media ${widthQuery.sm} {
      width: 100%;
    }
  }
`;

export const CookieLayout = ({
  navLinks,
  dropdownLinks,
  children,
  appNavLinks,
  leftNav,
  pathname,
}: DaoHausNavProps & {
  children: ReactNode;
  leftNav?: ReactNode;
  appNavLinks?: ComponentProps<typeof AppSwitcher>;
  pathname: string;
}) => {
  const { cookieAddress, cookieChain } = useParams();
  
  return (
    <OuterLayout>
      <Header>
        <div className="left-nav">
          {appNavLinks && <AppSwitcher {...appNavLinks} />}
          {leftNav}
        </div>
        <DaoHausNav />
      </Header>
      {cookieAddress && <DaoHausNavMenu
        navLinks={navLinks}
        dropdownLinks={dropdownLinks}
        pathname={pathname}
      />}
      <MainLayout>{children}</MainLayout>
      <CookieFooter />
    </OuterLayout>
  );
};