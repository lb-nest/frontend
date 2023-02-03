export enum ChannelStatus {
  Connected = 'Connected',
  Failed = 'Failed',
}

export enum ChannelType {
  Instagram = 'Instagram',
  Telegram = 'Telegram',
  Vkontakte = 'Vkontakte',
  Webchat = 'Webchat',
  Whatsapp = 'Whatsapp',
}

export interface Channel {
  id: number;
  name: string;
  type: ChannelType;
  status: ChannelStatus;
}
