import { DocsLayout } from '../../components/docs';
import { NextPageWithLayout } from '../_app';

const WhatsappDocsPage: NextPageWithLayout = () => {
  return null;
};

WhatsappDocsPage.getLayout = (page) => <DocsLayout>{page}</DocsLayout>;

export default WhatsappDocsPage;
