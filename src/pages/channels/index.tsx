import React from 'react';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ChannelsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <div>channels</div>
    </GuardWrapper>
  );
};

ChannelsPage.getLayout = (page) => <Layout i18n='common:pages.channels'>{page}</Layout>;

export default ChannelsPage;
