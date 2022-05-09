export enum WebhookEventType {}

export interface Webhook {
  id: number;
  name: string;
  url: string;
  eventType: WebhookEventType;
}
