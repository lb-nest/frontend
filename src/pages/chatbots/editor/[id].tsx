import React from 'react';
import { Layout } from '../../../components/layout';
import { projectGuard, useGuard } from '../../../hooks/use-guard';
import { NextPageWithLayout } from '../../_app';

const ChatbotEditorPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <div>chatbot editor</div>
    </GuardWrapper>
  );
};

ChatbotEditorPage.getLayout = (page) => <Layout i18n='common:pages.chatbots'>{page}</Layout>;

export default ChatbotEditorPage;
