import { Suspense } from 'react';
import { styled } from 'styled-components';

import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Text } from '../../../foundation/components/Text';
import { useImage } from '../../../foundation/hooks/useImage';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';
import { useBook } from '../../book/hooks/useBook';

const _Wrapper = styled.div`
  flex-shrink: 0;
`;

const _LinkWrapper = styled(Link)`
  display: grid;
  gap: ${Space * 1}px;
  background-color: ${Color.MONO_A};
  padding: ${Space * 1.5}px;
  border-radius: ${Radius.SMALL};
  grid-template-columns: auto 1fr;
  border: 1px solid ${Color.MONO_30};
`;

const _ImgWrapper = styled.div`
  width: 96px;
  height: 96px;
  > img {
    border-radius: ${Radius.SMALL};
  }
`;

const _ContentWrapper = styled.div`
  display: grid;
  gap: ${Space * 1}px;
  max-width: 200px;
  width: 100%;
`;

const _AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;

type Props = {
  bookId: string;
  wrapperRef?: React.ComponentProps<'div'>['ref'];
};

export const FeatureCardView: React.FC<{
  imageUrl?: string | undefined;
  authorImageUrl?: string | undefined;
  book?: ReturnType<typeof useBook>['data'];
  wrapperRef?: React.ComponentProps<'div'>['ref'];
}> = ({ imageUrl, authorImageUrl, book }) => {
  return (
    <>
      <_ImgWrapper>
        {imageUrl != null && book != null && (
          <Image alt={book.image.alt} height={96} objectFit="cover" src={imageUrl} width={96} />
        )}
      </_ImgWrapper>

      <_ContentWrapper>
        <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
          {(book != null && book.name) || 'Loading...'}
        </Text>
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
          {(book != null && book.description) || 'Loading...'}
        </Text>

        <Flex align="center" gap={Space * 1} justify="flex-end">
          <_AvatarWrapper>
            {authorImageUrl != null && book != null && (
              <Image alt={book.author.name} height={32} objectFit="cover" src={authorImageUrl} width={32} />
            )}
          </_AvatarWrapper>
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            {(book != null && book.author.name) || 'Loading...'}
          </Text>
        </Flex>
      </_ContentWrapper>
    </>
  );
};

const FeatureCard: React.FC<Props> = ({ bookId, wrapperRef }) => {
  const { data: book } = useBook({ params: { bookId } });

  const imageUrl = useImage({ height: 96, imageId: book.image.id, width: 96 });
  const authorImageUrl = useImage({ height: 32, imageId: book.author.image.id, width: 32 });

  return <FeatureCardView authorImageUrl={authorImageUrl} book={book} imageUrl={imageUrl} wrapperRef={wrapperRef} />;
};

const FeatureCardWithSuspense: React.FC<Props> = (props) => {
  return (
    <_Wrapper role="link">
      <div ref={props.wrapperRef} style={{ height: '100%', display: 'flex' }}>
        <_LinkWrapper href={`/books/${props.bookId}`}>
          <Suspense fallback={<FeatureCardView />}>
            <FeatureCard {...props} />
          </Suspense>
        </_LinkWrapper>
      </div>
    </_Wrapper>
  );
};

export { FeatureCardWithSuspense as FeatureCard };
