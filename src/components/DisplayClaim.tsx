import React from 'react';

import { H2, ParMd, SingleColumnLayout } from '@daohaus/ui';

export const DisplayClaim = ({
  heading,
  description,
  element,
}: {
  heading: string;
  description?: string;
  element?: React.ReactNode;
}) => {
  return (
    <SingleColumnLayout>
      <H2 style={{ marginBottom: '2rem' }}>{heading}</H2>
      <ParMd style={{ marginBottom: '2rem' }}>{description}</ParMd>
      {element}
    </SingleColumnLayout>
  );
};
