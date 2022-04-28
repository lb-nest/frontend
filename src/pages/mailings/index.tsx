import React from 'react';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const MailingsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <div>chats</div>
    </GuardWrapper>
  );
};

MailingsPage.getLayout = (page) => <Layout i18n='common:pages.mailings'>{page}</Layout>;

export default MailingsPage;
