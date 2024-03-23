import { Suspense } from 'react';
import useSWR from 'swr';

type Props = {
  url: string;
};

const Fetcher: React.FC<Props> = ({ url }) => {
  const { data } = useSWR(
    url,
    async (url) => {
      const response = await fetch(url);
      console.log(url, response);
      return response.text();
    },
    { suspense: true },
  );

  console.log({ data });

  return <>{data}</>;
};

export const RemoteText: React.FC<Props> = ({ url }) => {
  return (
    <Suspense fallback={<span>loading...</span>}>
      <Fetcher url={url} />
    </Suspense>
  );
};
