import React from 'react';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const DashboardPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <div>dashboard</div>
    </GuardWrapper>
  );
};

DashboardPage.getLayout = (page) => <Layout i18n='common:pages.dashboard'>{page}</Layout>;

export default DashboardPage;
