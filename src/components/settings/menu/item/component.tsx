import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface MenuItemProps {
  href: string;
  children: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = ({ href, children }) => {
  const router = useRouter();

  return (
    <Button
      href={href}
      component={Link}
      size='large'
      sx={{
        justifyContent: 'flex-start',
        bgcolor: router.pathname === href ? 'rgba(61, 90, 254, 0.04)' : undefined,
        textTransform: 'none',
      }}>
      {children}
    </Button>
  );
};
