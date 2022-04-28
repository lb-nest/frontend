import React from 'react';
import { DocsLayout } from '../../components/docs';
import { NextPageWithLayout } from '../_app';

const TelegramDocsPage: NextPageWithLayout = () => {
  return <div>telegram docs</div>;
};

TelegramDocsPage.getLayout = (page) => <DocsLayout>{page}</DocsLayout>;

export default TelegramDocsPage;
