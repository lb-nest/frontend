import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../redux';
import { selectChatList } from '../../../redux/features/chat-list';
import { ChatListHeader } from './header';
import { ChatListItem } from './item';
import { ChatListMenu } from './menu';

interface ChatListProps {}

export const ChatList: React.FC<ChatListProps> = () => {
  const { t } = useTranslation();

  const [expand, setExpand] = React.useState(true);
  const chatList = useAppSelector(selectChatList);

  const title = React.useMemo(() => t<string>(`chats:${chatList.type}`), [t, chatList.type]);

  const handleExpand = () => {
    setExpand((prev) => !prev);
  };

  const handleSearch = () => {};

  return (
    <Box display='flex' flexDirection='column' flexGrow={1} overflow='hidden'>
      {expand && <ChatListMenu />}
      <ChatListHeader title={title} onSearch={handleSearch} onExpand={handleExpand} />
      <Box flexGrow={1} overflow='auto'>
        {chatList.items.length === 0 ? (
          <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
            <Typography color='#858585'>{t<string>('chats:noData')}</Typography>
          </Box>
        ) : (
          chatList.items.map((item) => <ChatListItem key={item.id} {...item} />)
        )}
      </Box>
    </Box>
  );
};
