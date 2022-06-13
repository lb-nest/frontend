import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ReactFlowProvider } from 'react-flow-renderer';
import { ChatbotEditor } from '../../../components/chatbots';
import { Layout } from '../../../components/layout';
import { CHATBOT_BY_ID } from '../../../core/api';
import { projectGuard, useGuard } from '../../../hooks/use-guard';
import { NextPageWithLayout } from '../../_app';

const ChatbotEditorPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const router = useRouter();
  const result = useQuery(CHATBOT_BY_ID, {
    variables: {
      id: Number(router.query.id),
    },
  });

  return (
    <GuardWrapper>
      <ReactFlowProvider>
        {result.data && <ChatbotEditor {...result.data.chatbotById} />}
      </ReactFlowProvider>
    </GuardWrapper>
  );
};

ChatbotEditorPage.getLayout = (page) => <Layout i18n='common:pages.chatbots'>{page}</Layout>;

export default ChatbotEditorPage;
