import { useQuery } from '@apollo/client';
import {
  ChatOutlined,
  CodeOutlined,
  ContactMailOutlined,
  ContactPhoneOutlined,
  IntegrationInstructionsOutlined,
  SettingsOutlined,
  SmartToyOutlined,
  SyncAltOutlined,
  TagOutlined,
  WebhookOutlined,
} from '@mui/icons-material';
import { Avatar, Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { USER } from '../../../core/api';
import { SidebarItem } from './item';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  const user = useQuery(USER);

  return (
    <Box
      component='aside'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      width={80}
      height='calc(100vh - 50px)'
      bgcolor='#2d3e4f'>
      <Box
        display='flex'
        flexDirection='column'
        padding='50px 0'
        overflow='auto'
        flexShrink={1}
        sx={{
          overflow: 'hidden auto',
        }}>
        <Box display='flex' flexDirection='column' width={80}>
          <SidebarItem title={t('common:pages.chats')} href='/chats'>
            <ChatOutlined />
          </SidebarItem>
          <SidebarItem title={t('common:pages.contacts')} href='/contacts'>
            <ContactPhoneOutlined />
          </SidebarItem>
          <SidebarItem title={t('common:pages.mailings')} href='/mailings'>
            <ContactMailOutlined />
          </SidebarItem>
          <SidebarItem title={t('common:pages.channels')} href='/channels'>
            <SyncAltOutlined />
          </SidebarItem>
          <SidebarItem title={t('common:pages.chatbots')} href='/chatbots'>
            <SmartToyOutlined />
          </SidebarItem>
          <SidebarItem title={t('common:pages.webhooks')} href='/webhooks'>
            <WebhookOutlined />
          </SidebarItem>
          <SidebarItem title={t('common:pages.integrations')} href='/integrations'>
            <IntegrationInstructionsOutlined />
          </SidebarItem>
          <SidebarItem title={t('common:pages.tags')} href='/tags'>
            <TagOutlined />
          </SidebarItem>
          <SidebarItem title={t('common:pages.hsm')} href='/hsm'>
            <CodeOutlined />
          </SidebarItem>
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        padding='25px 0 50px'
        overflow='auto'
        flexShrink={0}>
        <SidebarItem title={t('common:pages.settings')} href='/settings'>
          <SettingsOutlined />
        </SidebarItem>
        <Box display='flex' flexDirection='column' alignItems='center' mt='30px'>
          <Avatar src={user.data?.user.avatarUrl} />
        </Box>
      </Box>
    </Box>
  );
};
