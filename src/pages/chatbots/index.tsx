import { useQuery } from '@apollo/client';
import { Box, Container } from '@mui/material';
import { Chatbot, CreateChatbotButton } from '../../components/chatbots';
import { Layout } from '../../components/layout';
import { CHATBOTS } from '../../core/api';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ChatbotsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const chatbots = useQuery(CHATBOTS);

  return (
    <GuardWrapper>
      <Container
        maxWidth='lg'
        sx={{
          height: '100%',
          overflow: 'auto',
        }}>
        <Box display='flex' justifyContent='flex-end' mt={1} mb={1}>
          <CreateChatbotButton
            onCreate={() => {
              chatbots.refetch();
            }}
          />
        </Box>
        <Box>
          {chatbots.data?.chatbots.map((chatbot) => (
            <Chatbot key={chatbot.id} {...chatbot} />
          ))}
        </Box>
      </Container>
    </GuardWrapper>
  );
};

ChatbotsPage.getLayout = (page) => <Layout i18n='common:pages.chatbots'>{page}</Layout>;

export default ChatbotsPage;
