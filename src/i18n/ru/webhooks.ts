import { ResourceLanguage } from 'i18next';
import { WebhookEventType } from '../../core/types';

export const webhooks: ResourceLanguage = {
  create: 'Добавить новый вебхук',
  webhook: {
    fields: {
      url: 'URL',
      eventType: 'Тип события',
    },
    update: 'Редактировать',
    delete: 'Удалить',
  },
  modal: {
    create: {
      title: 'Добавление нового вебхука',
      description: '',
    },
    update: {
      title: 'Редактирование вебхука',
      description: '',
    },
    fields: {
      name: 'Название',
      url: 'URL',
      eventType: 'Тип события',
    },
    submit: 'Сохранить',
    cancel: 'Отмена',
  },
  eventType: {
    [WebhookEventType.All]: 'Все',
    [WebhookEventType.IncomingChats]: 'Входящие чаты',
    [WebhookEventType.IncomingMessages]: 'Входящие сообщения',
    [WebhookEventType.OutgoingChats]: 'Исходящие чаты',
    [WebhookEventType.OutgoingMessages]: 'Исходящие сообщения',
  },
};
