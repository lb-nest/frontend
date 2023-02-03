import { ResourceLanguage } from 'i18next';
import { ChannelType } from '../../core/types';

export const channels: ResourceLanguage = {
  create: 'Добавить новый канал',
  channel: {
    update: 'Редактировать',
    delete: 'Удалить',
  },
  modal: {
    [ChannelType.Instagram]: 'Instagram',
    [ChannelType.Telegram]: 'Telegram',
    [ChannelType.Vkontakte]: 'VK',
    [ChannelType.Webchat]: 'Чат на сайт',
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
      [ChannelType.Instagram]: {
        name: 'Название',
      },
      [ChannelType.Telegram]: {
        name: 'Название',
        token: 'API-токен',
      },
      [ChannelType.Vkontakte]: {
        name: 'Название',
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
