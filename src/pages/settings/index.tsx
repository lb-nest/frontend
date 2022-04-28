import React from 'react';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const SettingsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <div>settings</div>
    </GuardWrapper>
  );
};

SettingsPage.getLayout = (page) => <Layout i18n='common:pages.settings'>{page}</Layout>;

export default SettingsPage;
