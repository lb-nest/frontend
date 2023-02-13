import { Box, ButtonBase, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface SidebarItemProps {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ title, href, icon }) => {
  const router = useRouter();

  return (
    <Tooltip title={title} placement='right'>
      <Box
        sx={{
          height: 50,
          position: 'relative',
          color: '#f0f1f3',
          '::before': router.pathname.startsWith(href)
            ? {
                content: '""',
                width: 2,
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                bgcolor: '#f0f1f3',
              }
            : undefined,
        }}>
        <ButtonBase
          href={href}
          component={Link}
          sx={{
            width: '100%',
            height: '100%',
          }}>
          {icon}
        </ButtonBase>
      </Box>
    </Tooltip>
  );
};
