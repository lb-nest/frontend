import { gql, TypedDocumentNode } from '@apollo/client';
import { Webhook, WebhookEventType } from '../types/webhook';

interface WebhooksResult {
  webhooks: Webhook[];
}

export const WEBHOOKS: TypedDocumentNode<WebhooksResult> = gql`
  query Webhooks {
    webhooks {
      id
      name
      url
      eventType
    }
  }
`;

interface CreateWebhookResult {
  createWebhook: Webhook;
}

interface CreateWebhookVariables {
  name: string;
  url: string;
  eventType: WebhookEventType;
}

export const CREATE_WEBHOOK: TypedDocumentNode<CreateWebhookResult, CreateWebhookVariables> = gql`
  mutation CreateWebhook($name: String!, $url: String!, $eventType: WebhookEventType!) {
    createWebhook(name: $name, url: $url, eventType: $eventType) {
      id
      name
      url
      eventType
    }
  }
`;
