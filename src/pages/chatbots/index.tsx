import { useMutation, useQuery } from '@apollo/client';
import { Box, Container } from '@mui/material';
import { Chatbot, CreateChatbotButton } from '../../components/chatbots';
import { Layout } from '../../components/layout';
import { CHATBOTS, REMOVE_CHATBOT } from '../../core/api';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ChatbotsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const chatbots = useQuery(CHATBOTS);

  const [removeChatbot] = useMutation(REMOVE_CHATBOT);

  const handleDelete = (id: number) => {
    return async () => {
      try {
        await removeChatbot({
          variables: {
            id,
          },
        });

        chatbots.refetch();
      } catch {}
    };
  };

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
            <Chatbot key={chatbot.id} {...chatbot} onDelete={handleDelete(chatbot.id)} />
          ))}
        </Box>
      </Container>
    </GuardWrapper>
  );
};

ChatbotsPage.getLayout = (page) => <Layout i18n='common:pages.chatbots'>{page}</Layout>;

export default ChatbotsPage;
