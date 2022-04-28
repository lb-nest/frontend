import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const IndexPage: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.replace('/chats');
  }, []);

  return null;
};

export default IndexPage;
