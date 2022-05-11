import { ResourceLanguage } from 'i18next';
import { ChannelType } from '../../core/types';

export const channels: ResourceLanguage = {
  create: 'Добавить канал',
  modal: {
    [ChannelType.Telegram]: {
      title: 'Telegram',
      description: 'Добавление канала Telegram',
      name: 'Название',
      token: 'API-токен',
    },
    [ChannelType.Webchat]: {
      title: 'Веб-чат',
      description: 'Добавление канала Веб-чат',
      name: 'Название',
      token: 'URL',
    },
    [ChannelType.Whatsapp]: {
      title: 'Whatsapp',
      description: 'Добавление канала Whatsapp',
      name: 'Название',
      accountId: 'Название приложения',
      token: 'API-ключ',
    },
    submit: 'Добавить',
    cancel: 'Отмена',
  },
};
