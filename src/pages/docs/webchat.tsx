import React from 'react';
import { DocsLayout } from '../../components/docs';
import { NextPageWithLayout } from '../_app';

const WebchatDocsPage: NextPageWithLayout = () => {
  return <div>webchat docs</div>;
};

WebchatDocsPage.getLayout = (page) => <DocsLayout>{page}</DocsLayout>;

export default WebchatDocsPage;
