import { ResourceLanguage } from 'i18next';

export const hsm: ResourceLanguage = {
  create: 'Добавить новое шаблонное сообщение',
  hsm: {
    fields: {
      text: 'Текст сообщения',
    },
    update: 'Редактировать',
    delete: 'Удалить',
  },
  modal: {
    create: {
      title: 'Добавление нового шаблонного сообщения',
      description: '',
    },
    update: {
      title: 'Редактирование шаблонного сообщения',
      description: '',
    },
    fields: {
      code: 'Идентификатор шаблона',
      text: 'Сообщение',
      button: 'Новая кнопка',
    },
    default: {
      text: 'Вы можете оставлять места для параметров в формате {{param_name}}',
    },
    submit: 'Сохранить',
    cancel: 'Отмена',
  },
};
