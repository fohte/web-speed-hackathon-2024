import { useSetAtom } from 'jotai';
import React, { useId } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';
import { RemoteText } from './RemoteText';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const setModalContent = async (id: string, title: string, contentUrl: string) => {
    const response = await fetch(contentUrl);
    const text = await response.text();

    updateDialogContent(
      <_Content aria-labelledby={id} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={id} typography={Typography.NORMAL16}>
          {title}
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {text}
        </Text>
      </_Content>,
    );
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" height="45px" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button
            disabled={!isClient}
            onClick={async () => {
              await setModalContent(termDialogA11yId, '利用規約', '/assets/term.txt');
            }}
          >
            利用規約
          </_Button>
          <_Button
            disabled={!isClient}
            onClick={async () => {
              await setModalContent(contactDialogA11yId, 'お問い合わせ', '/assets/contact.txt');
            }}
          >
            お問い合わせ
          </_Button>
          <_Button
            disabled={!isClient}
            onClick={async () => {
              await setModalContent(questionDialogA11yId, 'Q&A', '/assets/question.txt');
            }}
          >
            Q&A
          </_Button>
          <_Button
            disabled={!isClient}
            onClick={async () => {
              await setModalContent(companyDialogA11yId, '運営会社', '/assets/company.txt');
            }}
          >
            運営会社
          </_Button>
          <_Button
            disabled={!isClient}
            onClick={async () => {
              await setModalContent(overviewDialogA11yId, 'Cyber TOONとは', '/assets/overview.txt');
            }}
          >
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </Box>
  );
};
