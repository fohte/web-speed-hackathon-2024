import { Suspense } from 'react';

import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Space } from '../../foundation/styles/variables';

import { CoverSection } from './internal/CoverSection';
import { Pickup } from './internal/Pickup';
import { Ranking } from './internal/Ranking';
import { Today } from './internal/Today';

const TopPage: React.FC = () => {
  return (
    <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
      <Box as="header" maxWidth="100%" width="100%">
        <CoverSection />
      </Box>
      <Box as="main" maxWidth="100%" width="100%">
        <Pickup />
        <Spacer height={Space * 2} />
        <Ranking />
        <Spacer height={Space * 2} />
        <Today />
      </Box>
    </Flex>
  );
};

const TopPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <TopPage />
    </Suspense>
  );
};

export { TopPageWithSuspense as TopPage };
