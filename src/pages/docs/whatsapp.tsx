import React from 'react';
import { DocsLayout } from '../../components/docs';
import { NextPageWithLayout } from '../_app';

const WhatsappDocsPage: NextPageWithLayout = () => {
  return <div>whatsapp docs</div>;
};

WhatsappDocsPage.getLayout = (page) => <DocsLayout>{page}</DocsLayout>;

export default WhatsappDocsPage;
