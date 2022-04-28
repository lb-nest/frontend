import React from 'react';
import { DocsLayout } from '../../components/docs';
import { NextPageWithLayout } from '../_app';

const DocsPage: NextPageWithLayout = () => {
  return <div>docs</div>;
};

DocsPage.getLayout = (page) => <DocsLayout>{page}</DocsLayout>;

export default DocsPage;
