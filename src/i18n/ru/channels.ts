import { ResourceLanguage } from 'i18next';
import { ChannelType } from '../../core/types';

export const channels: ResourceLanguage = {
  create: 'Добавить канал',
  modal: {
    [ChannelType.Telegram]: {
      title: 'Telegram',
      description: 'Добавление канала Telegram',
      token: 'Токен',
    },
    [ChannelType.Webchat]: {
      title: 'Веб-чат',
      description: 'Добавление канала Веб-чат',
      token: 'URL',
    },
    [ChannelType.Whatsapp]: {
      title: 'Whatsapp',
      description: 'Добавление канала Whatsapp',
      token: 'Название приложения',
      accountId: 'Номер телефона',
    },
    submit: 'Добавить',
    cancel: 'Отмена',
  },
};
