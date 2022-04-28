import React from 'react';
import { ChatsLayout } from '../../components/chats';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ChatsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <div>chats</div>
    </GuardWrapper>
  );
};

ChatsPage.getLayout = (page) => <ChatsLayout>{page}</ChatsLayout>;

export default ChatsPage;
