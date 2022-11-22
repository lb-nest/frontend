export enum WebhookEventType {
  All = 'All',
}

export interface Webhook {
  id: number;
  name: string;
  url: string;
  eventType: WebhookEventType;
}
