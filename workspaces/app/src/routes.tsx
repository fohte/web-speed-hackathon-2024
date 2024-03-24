import React from 'react';
import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import { ArrowBack } from '@mui/icons-material';

import { SvgIcon } from './features/icons/components/SvgIcon';
import { Link } from './foundation/components/Link';
import { Text } from './foundation/components/Text';
import { ActionLayout } from './foundation/layouts/ActionLayout';
import { CommonLayout } from './foundation/layouts/CommonLayout';
import { Color, Space, Typography } from './foundation/styles/variables';
import { AuthorDetailPage } from './pages/AuthorDetailPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { EpisodeDetailPage } from './pages/EpisodeDetailPage';
import { SearchPage } from './pages/SearchPage';
import { TopPage } from './pages/TopPage';

const _BackToTopButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Space * 1}px;
  border: none;
  background-color: transparent;
`;

class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    // 子コンポーネントで例外が発生すると呼ばれる。
    // 戻り値では、コンポーネントの状態を返す必要がある。
    return { hasError: true };
  }

  override componentDidCatch(error: any, info: any) {
    // 発生したエラーのログを取得する
    console.error('errorboundary', error, info);
  }

  override render() {
    if (this.state['hasError']) {
      // エラーがある場合は、fallbackをレンダリングする
      return this.props['fallback'];
    }
    // エラーがない場合は、childrenをレンダリングする
    return this.props['children'];
  }
}

const withErrorBoundary = (element: any) => {
  return <ErrorBoundary>{element}</ErrorBoundary>;
};

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<CommonLayout />} path={'/'}>
        <Route element={withErrorBoundary(<TopPage />)} path={''} />
      </Route>
      <Route
        element={
          <ActionLayout
            leftContent={
              <_BackToTopButton href={'/'}>
                <SvgIcon color={Color.MONO_100} height={32} icon={ArrowBack} width={32} />
                <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                  トップへ戻る
                </Text>
              </_BackToTopButton>
            }
          />
        }
        path={'/'}
      >
        <Route element={withErrorBoundary(<BookDetailPage />)} path={'books/:bookId'} />
        <Route element={withErrorBoundary(<EpisodeDetailPage />)} path={'books/:bookId/episodes/:episodeId'} />
        <Route element={withErrorBoundary(<AuthorDetailPage />)} path={'authors/:authorId'} />
        <Route element={withErrorBoundary(<SearchPage />)} path={'search'} />
      </Route>
    </Routes>
  );
};
