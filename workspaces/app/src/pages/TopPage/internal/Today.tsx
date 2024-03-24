import _ from 'lodash';
import moment from 'moment-timezone';
import { useId } from 'react';

import { BookCard } from '../../../features/book/components/BookCard';
import { useRelease } from '../../../features/release/hooks/useRelease';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Space, Typography } from '../../../foundation/styles/variables';
import { getDayOfWeekStr } from '../../../lib/date/getDayOfWeekStr';

export const Today: React.FC = () => {
  const todayStr = getDayOfWeekStr(moment());
  const { data: release } = useRelease({ params: { dayOfWeek: todayStr } });

  const todayA11yId = useId();

  return (
    <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
      <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
        本日更新
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
        <Flex align="stretch" gap={Space * 2} justify="flex-start">
          {_.map(release.books, (book) => (
            <BookCard key={book.id} bookId={book.id} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
