import { Box, ButtonBase, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface SidebarItemProps {
  title: string;
  href: string;
  children?: React.ReactNode;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ title, href, children }) => {
  const router = useRouter();

  return (
    <Tooltip title={title} placement='right'>
      <Box
        sx={{
          height: 50,
          position: 'relative',
          color: '#fff',
          '::before': router.pathname.startsWith(href)
            ? {
                content: '""',
                width: 3,
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                bgcolor: '#fff',
              }
            : undefined,
        }}>
        <Link href={href} passHref>
          <ButtonBase
            sx={{
              width: '100%',
              height: '100%',
            }}>
            {children}
          </ButtonBase>
        </Link>
      </Box>
    </Tooltip>
  );
};
