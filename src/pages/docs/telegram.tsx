import { DocsLayout } from '../../components/docs';
import { NextPageWithLayout } from '../_app';

const TelegramDocsPage: NextPageWithLayout = () => {
  return null;
};

TelegramDocsPage.getLayout = (page) => <DocsLayout>{page}</DocsLayout>;

export default TelegramDocsPage;
