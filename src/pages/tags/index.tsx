import React from 'react';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const TagsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <div>tags</div>
    </GuardWrapper>
  );
};

TagsPage.getLayout = (page) => <Layout i18n='common:pages.tags'>{page}</Layout>;

export default TagsPage;
