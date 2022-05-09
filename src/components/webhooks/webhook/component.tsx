import React from 'react';
import * as types from '../../../core/types';

interface WebhookProps extends types.Webhook {}

export const Webhook: React.FC<WebhookProps> = ({ id, name, url, eventType }) => {
  return <div>{name}</div>;
};
