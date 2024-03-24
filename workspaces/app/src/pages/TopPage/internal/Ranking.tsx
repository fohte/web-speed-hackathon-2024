import _ from 'lodash';
import { useId } from 'react';

import { RankingCard } from '../../../features/ranking/components/RankingCard';
import { useRankingList } from '../../../features/ranking/hooks/useRankingList';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

export const Ranking: React.FC = () => {
  const { data: rankingList } = useRankingList({ query: {} });

  const rankingA11yId = useId();

  return (
    <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%">
      <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
        ランキング
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
        <Flex align="center" as="ul" direction="column" justify="center">
          {_.map(rankingList, (ranking) => (
            <RankingCard key={ranking.id} bookId={ranking.book.id} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
