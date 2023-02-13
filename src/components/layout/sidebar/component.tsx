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
import { Avatar, Box, Button, IconButton, Popover, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PROJECT, USER } from '../../../core/api';
import { GuardContext } from '../../guard-context';
import { SidebarItem } from './item';

export const Sidebar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement>();

  const { t } = useTranslation();

  const project = useQuery(PROJECT);
  const user = useQuery(USER);

  const guard = React.useContext(GuardContext);

  return (
    <Box
      component='aside'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      width={86}
      height='calc(100vh - 50px)'
      bgcolor='#2d3e4f'>
      <Box
        display='flex'
        flexDirection='column'
        pt={7}
        pb={7}
        overflow='hidden auto'
        flexShrink={1}>
        <Box display='flex' flexDirection='column' width={86}>
          <SidebarItem href='/chats' title={t('common:pages.chats')} icon={<ChatOutlined />} />
          <SidebarItem
            href='/contacts'
            title={t('common:pages.contacts')}
            icon={<ContactPhoneOutlined />}
          />
          <SidebarItem
            href='/mailings'
            title={t('common:pages.mailings')}
            icon={<ContactMailOutlined />}
          />
          <SidebarItem
            href='/channels'
            title={t('common:pages.channels')}
            icon={<SyncAltOutlined />}
          />
          <SidebarItem
            href='/chatbots'
            title={t('common:pages.chatbots')}
            icon={<SmartToyOutlined />}
          />
          <SidebarItem
            href='/webhooks'
            title={t('common:pages.webhooks')}
            icon={<WebhookOutlined />}
          />
          <SidebarItem
            href='/integrations'
            title={t('common:pages.integrations')}
            icon={<IntegrationInstructionsOutlined />}
          />
          <SidebarItem href='/tags' title={t('common:pages.tags')} icon={<TagOutlined />} />
          <SidebarItem href='/hsm' title={t('common:pages.hsm')} icon={<CodeOutlined />} />
        </Box>
      </Box>
      <Box display='flex' flexDirection='column' pb={7} overflow='auto' flexShrink={0}>
        <SidebarItem
          href='/settings/project'
          title={t('common:pages.settings')}
          icon={<SettingsOutlined />}
        />
        <Box display='flex' flexDirection='column' alignItems='center' mt={5}>
          <IconButton
            disableRipple
            sx={{
              p: 0,
            }}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}>
            <Avatar src={user.data?.user.avatarUrl} alt={user.data?.user.name} />
          </IconButton>
          <Popover
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(undefined);
            }}>
            <Box display='flex' flexDirection='column' alignItems='flex-start' width={240} p={2}>
              <Typography variant='subtitle1'>{user.data?.user.name}</Typography>
              <Typography variant='subtitle1'>
                {t<string>('sidebar:popover.project', project.data?.project)}
              </Typography>
              <Button
                href='/settings/profile'
                component={Link}
                disableRipple
                color='inherit'
                sx={{
                  textTransform: 'none',
                  ':hover': {
                    bgcolor: 'transparent',
                  },
                }}
                startIcon={<AccountBoxOutlined />}>
                {t<string>('sidebar:popover.profile')}
              </Button>
              <Button
                disableRipple
                color='error'
                sx={{
                  textTransform: 'none',
                  ':hover': {
                    bgcolor: 'transparent',
                  },
                }}
                startIcon={<LogoutOutlined />}
                onClick={() => {
                  guard?.signOut();
                }}>
                {t<string>('sidebar:popover.logout')}
              </Button>
            </Box>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
};
