import { DocsLayout } from '../../components/docs';
import { NextPageWithLayout } from '../_app';

const WebchatDocsPage: NextPageWithLayout = () => {
  return null;
};

WebchatDocsPage.getLayout = (page) => <DocsLayout>{page}</DocsLayout>;

export default WebchatDocsPage;
