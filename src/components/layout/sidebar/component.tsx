import { useQuery } from '@apollo/client';
import {
  AccountBoxOutlined,
  ChatOutlined,
  CodeOutlined,
  ContactMailOutlined,
  ContactPhoneOutlined,
  IntegrationInstructionsOutlined,
  LogoutOutlined,
  SettingsOutlined,
  SmartToyOutlined,
  SyncAltOutlined,
  TagOutlined,
  WebhookOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Menu, Popover, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { USER } from '../../../core/api';
import { SidebarItem } from './item';

export const Sidebar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement>();

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
          <IconButton
            disableRipple
            sx={{
              padding: 0,
            }}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}>
            <Avatar src={user.data?.user.avatarUrl} />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            onClose={() => {
              setAnchorEl(undefined);
            }}>
            <Box
              display='flex'
              flexDirection='column'
              alignItems='flex-start'
              minWidth={150}
              maxWidth={300}
              padding='15px'>
              <Typography fontSize={22} fontWeight={700}>
                {user.data?.user.name}
              </Typography>
              <Link href='/settings/profile' passHref>
                <Button
                  disableRipple
                  sx={{
                    color: 'inherit',
                    textTransform: 'none',
                    fontSize: 12,
                    fontWeight: 500,
                    ':hover': {
                      bgcolor: 'transparent',
                    },
                  }}
                  startIcon={<AccountBoxOutlined />}>
                  {t<string>('sidebar:popover.profile')}
                </Button>
              </Link>
              <Button
                disableRipple
                sx={{
                  color: 'inherit',
                  textTransform: 'none',
                  fontSize: 12,
                  fontWeight: 500,
                  ':hover': {
                    bgcolor: 'transparent',
                  },
                }}
                startIcon={<LogoutOutlined />}>
                {t<string>('sidebar:popover.logout')}
              </Button>
            </Box>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
};
