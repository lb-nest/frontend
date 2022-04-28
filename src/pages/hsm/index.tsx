import React from 'react';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const HsmPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <div>hsm</div>
    </GuardWrapper>
  );
};

HsmPage.getLayout = (page) => <Layout i18n='common:pages.hsm'>{page}</Layout>;

export default HsmPage;
