import { useId, useRef, useState, useCallback } from 'react';
import { FeatureCard } from '../../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../../features/feature/hooks/useFeatureList';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

const PAGE_SIZE = 5 as const;

export const Pickup: React.FC = () => {
  const { data: allFeatureList } = useFeatureList({ query: {} });
  const [featureList, setFeatureList] = useState<typeof allFeatureList>(allFeatureList.slice(0, PAGE_SIZE));
  const [currentIndex, setCurrentIndex] = useState(0);
  const pickupA11yId = useId();
  const observer = useRef<IntersectionObserver | null>(null);

  const addFeatures = () => {
    const nextIndex = currentIndex + PAGE_SIZE;
    const nextFeatures = allFeatureList.slice(nextIndex, nextIndex + PAGE_SIZE);
    setFeatureList((prev) => [...prev, ...nextFeatures]);
    setCurrentIndex(nextIndex);
  };

  const hasMore = () => currentIndex < allFeatureList.length;

  const lastFeatureElementRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0] && entries[0].isIntersecting && hasMore()) {
          addFeatures();
        }
      });
      if (node) observer.current.observe(node);
    },
    [currentIndex, featureList.length],
  );

  return (
    <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
      <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
        ピックアップ
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
        <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
          {featureList.map((feature, i) =>
            featureList.length - PAGE_SIZE === i ? (
              <FeatureCard wrapperRef={lastFeatureElementRef} key={feature.id} bookId={feature.book.id} />
            ) : (
              <FeatureCard key={feature.id} bookId={feature.book.id} />
            ),
          )}
        </Flex>
      </Box>
    </Box>
  );
};
