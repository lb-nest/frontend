import { gql, TypedDocumentNode } from '@apollo/client';
import { Webhook, WebhookEventType } from '../types/webhook';

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

interface UpdateWebhookResult {
  updateWebhook: Webhook;
}

interface UpdateWebhookVariables {
  id: number;
  name: string;
  url: string;
  eventType: WebhookEventType;
}

export const UPDATE_WEBHOOK: TypedDocumentNode<UpdateWebhookResult, UpdateWebhookVariables> = gql`
  mutation UpdateWebhook($id: Int!, $name: String!, $url: String!, $eventType: WebhookEventType!) {
    updateWebhook(id: $id, name: $name, url: $url, eventType: $eventType) {
      id
      name
      url
      eventType
    }
  }
`;

interface RemoveWebhookResult {
  removeWebhook: Webhook;
}

interface RemoveWebhookVariables {
  id: number;
}

export const REMOVE_WEBHOOK: TypedDocumentNode<RemoveWebhookResult, RemoveWebhookVariables> = gql`
  mutation RemoveWebhook($id: Int!) {
    removeWebhook(id: $id) {
      id
      name
      url
      eventType
    }
  }
`;
