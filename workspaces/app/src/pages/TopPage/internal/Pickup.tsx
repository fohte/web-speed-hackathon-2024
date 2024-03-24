import { useId, useState } from 'react';
import { FeatureCard } from '../../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../../features/feature/hooks/useFeatureList';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

export const Pickup: React.FC = () => {
  const { data: allFeatureList } = useFeatureList({ query: {} });
  const [featureList, setFeatureList] = useState<typeof allFeatureList>(allFeatureList.slice(0, 5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const pickupA11yId = useId();
  const nextFeatures = () => {
    const nextIndex = currentIndex + 5;
    setFeatureList(allFeatureList.slice(nextIndex, nextIndex + 5));
    setCurrentIndex(nextIndex);
  };

  return (
    <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
      <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
        ピックアップ
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
        <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
          {featureList.map((feature) => (
            <FeatureCard key={feature.id} bookId={feature.book.id} />
          ))}
          <button
            onClick={() => {
              nextFeatures();
            }}
          >
            続き
          </button>
        </Flex>
      </Box>
    </Box>
  );
};
