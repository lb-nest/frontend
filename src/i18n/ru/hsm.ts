import { ResourceLanguage } from 'i18next';
import { HsmButtonType } from '../../core/types';

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
          [HsmButtonType.QuickReply]: 'Быстрый ответ',
          [HsmButtonType.Url]: 'Открыть ссылку',
          [HsmButtonType.Phone]: 'Телефонный звонок',
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
