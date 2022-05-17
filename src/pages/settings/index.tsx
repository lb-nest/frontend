import React from 'react';
import { SettingsLayout } from '../../components/settings';
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

SettingsPage.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default SettingsPage;
