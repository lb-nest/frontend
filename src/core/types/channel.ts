export enum ChannelStatus {
  Connected = 'Connected',
  Connecting = 'Connecting',
  Error = 'Error',
}

export enum ChannelType {
  Telegram = 'Telegram',
  Webchat = 'Webchat',
  Whatsapp = 'Whatsapp',
}

export interface Channel {
  id: number;
  name: string;
  status: ChannelStatus;
  type: ChannelType;
}
