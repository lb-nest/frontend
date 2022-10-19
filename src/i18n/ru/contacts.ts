import { ResourceLanguage } from 'i18next';

export const contacts: ResourceLanguage = {
  list: {
    id: 'Идентификатор',
    name: 'Имя',
    telegramId: 'Telegram',
    whatsappId: 'WhatsApp',
    controls: 'Действия',
  },
  create: 'Добавление контактов',
  modal: {
    create: {
      title: 'Добавление контакта',
      description: '',
    },
    import: {
      title: 'Импорт контактов',
      description: '',
      fields: {
        examples: {
          csv: 'csv пример',
          xls: 'xls/xlsx пример',
        },
        file: 'Выбрать файл',
      },
      submit: 'Импортировать',
      cancel: 'Отмена',
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
