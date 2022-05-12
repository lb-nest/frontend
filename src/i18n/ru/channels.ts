import { ResourceLanguage } from 'i18next';
import { ChannelType } from '../../core/types';

export const channels: ResourceLanguage = {
  create: 'Добавить новый канал',
  modal: {
    [ChannelType.Telegram]: 'Telegram',
    [ChannelType.Webchat]: 'Веб-чат',
    [ChannelType.Whatsapp]: 'Whatsapp',
    create: {
      title: 'Добавление нового канала',
      description: '',
    },
    update: {
      title: 'Редактирование канала',
      description: '',
    },
    fields: {
      [ChannelType.Telegram]: {
        name: 'Название',
        token: 'API-токен',
      },
      [ChannelType.Webchat]: {
        name: 'Название',
        token: 'URL',
      },
      [ChannelType.Whatsapp]: {
        name: 'Название',
        accountId: 'Название приложения',
        token: 'API-ключ',
      },
    },
    submit: 'Сохранить',
    cancel: 'Отмена',
  },
};
