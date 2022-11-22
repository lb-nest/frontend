import { ResourceLanguage } from 'i18next';
import { ButtonType } from '../../core/types';

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
      button: {
        type: {
          [ButtonType.QuickReply]: 'Быстрый ответ',
          [ButtonType.Url]: 'Открыть ссылку',
          [ButtonType.Phone]: 'Телефонный звонок',
        },
        tooltip: 'Текст на кнопке',
      },
    },
    default: {
      text: 'Вы можете оставлять места для параметров в формате {{1}}',
      button: 'Новая кнопка',
    },
    submit: 'Сохранить',
    cancel: 'Отмена',
  },
};
