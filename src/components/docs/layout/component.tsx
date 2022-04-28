import React from 'react';

interface DocsLayoutProps {
  children?: React.ReactNode;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({ children }) => {
  return <>{children}</>;
};
