import React from 'react';
import { NodeProps } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';

export const Transfer: React.FC<NodeProps<{}>> = React.memo(({ id, data }) => {
  const { t } = useTranslation();

  return <div></div>;
});
