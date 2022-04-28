import React from 'react';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const IntegrationsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <div>integrations</div>
    </GuardWrapper>
  );
};

IntegrationsPage.getLayout = (page) => <Layout i18n='common:pages.integrations'>{page}</Layout>;

export default IntegrationsPage;
