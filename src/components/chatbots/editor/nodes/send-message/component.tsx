import React from 'react';
import { NodeProps } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';

export const SendMessage: React.FC<NodeProps<{}>> = React.memo(({ id, data }) => {
  const { t } = useTranslation();

  return <div></div>;
});
