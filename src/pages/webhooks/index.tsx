import React from 'react';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const WebhooksPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <div>webhooks</div>
    </GuardWrapper>
  );
};

WebhooksPage.getLayout = (page) => <Layout i18n='common:pages.webhooks'>{page}</Layout>;

export default WebhooksPage;
