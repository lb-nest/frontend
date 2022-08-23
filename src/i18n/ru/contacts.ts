import { ResourceLanguage } from 'i18next';

export const contacts: ResourceLanguage = {
  list: {
    id: 'Идентификатор',
    telegramId: 'Telegram',
    webchatId: 'Веб-чат',
    whatsappId: 'WhatsApp',
    name: 'Имя',
    controls: 'Действия',
  },
  modal: {
    create: {
      title: 'Добавление контакта',
      description: '',
    },
    update: {
      title: 'Редактирование контакта',
      description: '',
    },
    fields: {
      id: 'Идентификатор',
      telegramId: 'Telegram',
      webchatId: 'Веб-чат',
      whatsappId: 'WhatsApp',
      name: 'Имя',
      notes: 'Заметки',
      tags: 'Теги',
    },
    submit: 'Сохранить',
    cancel: 'Отмена',
  },
};
