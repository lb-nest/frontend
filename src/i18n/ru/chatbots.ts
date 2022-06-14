import { ResourceLanguage } from 'i18next';
import { NodeType } from '../../components/chatbots/editor/types';

export const chatbots: ResourceLanguage = {
  create: 'Создать',
  createFrom: {
    scratch: 'С нуля',
    template: 'Используя шаблон',
  },
  chatbot: {
    update: 'Редактировать',
    delete: 'Удалить',
  },
  modal: {
    update: {
      title: '',
      description: '',
    },
    fields: {
      name: '',
    },
    submit: '',
    cancel: '',
  },
  editor: {
    nodes: {
      [NodeType.Start]: {
        title: 'Начало',
      },
      [NodeType.SendMessage]: {
        title: 'Отправка сообщения',
      },
      [NodeType.CollectInput]: {
        title: 'Сбор входных данных',
      },
      [NodeType.Buttons]: {
        title: 'Кнопки',
      },
      [NodeType.Branch]: {
        title: 'Ветвление',
      },
      [NodeType.ServiceCall]: {
        title: 'Вызов стороннего API',
      },
      [NodeType.Transfer]: {
        title: 'Назначение',
      },
      [NodeType.AssignTag]: {
        title: 'Присвоение тега',
      },
      [NodeType.Close]: {
        title: 'Закрытие обращения',
      },
    },
  },
};
