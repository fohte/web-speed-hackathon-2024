import { useId, useState } from 'react';

import { RankingCard } from '../../../features/ranking/components/RankingCard';
import { useRankingList } from '../../../features/ranking/hooks/useRankingList';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

const PAGE_SIZE = 5 as const;

export const Ranking: React.FC = () => {
  const { data: allRankingList } = useRankingList({ query: {} });
  const [rankingList, setRankingList] = useState<typeof allRankingList>(allRankingList.slice(0, PAGE_SIZE));
  const [currentIndex, setCurrentIndex] = useState(0);

  const rankingA11yId = useId();

  const addRankings = () => {
    const nextIndex = currentIndex + PAGE_SIZE;
    const nextRankings = allRankingList.slice(nextIndex, nextIndex + PAGE_SIZE);
    setRankingList((prev) => [...prev, ...nextRankings]);
    setCurrentIndex(nextIndex);
  };

  const hasMore = () => currentIndex < allRankingList.length;

  return (
    <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%">
      <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
        ランキング
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
        <Flex align="center" as="ul" direction="column" justify="center">
          {rankingList.map((ranking) => (
            <RankingCard key={ranking.id} bookId={ranking.book.id} />
          ))}
          {hasMore() && (
            <button onClick={addRankings} type="button">
              もっと見る
            </button>
          )}
        </Flex>
      </Box>
    </Box>
  );
};
