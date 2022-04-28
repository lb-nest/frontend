import React from 'react';
import { Layout } from '../../layout';

interface ChatsLayoutProps {
  children?: React.ReactNode;
}

export const ChatsLayout: React.FC<ChatsLayoutProps> = ({ children }) => {
  return <Layout i18n='common:pages.chats'>{children}</Layout>;
};
