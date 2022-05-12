export enum WebhookEventType {
  IncomingChats = 'IncomingChats',
  OutgoingChats = 'OutgoingChats',
  IncomingMessages = 'IncomingMessages',
  OutgoingMessages = 'OutgoingMessages',
  All = 'All',
}

export interface Webhook {
  id: number;
  name: string;
  url: string;
  eventType: WebhookEventType;
}
