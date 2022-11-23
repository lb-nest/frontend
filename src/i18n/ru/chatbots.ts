import { ResourceLanguage } from 'i18next';
import { NodeType } from '../../components/chatbots/editor/types';

export const chatbots: ResourceLanguage = {
  create: 'Создать',
  createFrom: {
    scratch: 'С нуля',
    template: 'Используя шаблон',
  },
  defaultName: 'Новый чат-бот',
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
        title: 'Бот запускается, если…',
        tooltip: 'Начните здесь',
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
        title: 'Назначение ответственного',
      },
      [NodeType.AssignTag]: {
        title: 'Присвоение тега',
      },
      [NodeType.Close]: {
        title: 'Закрытие обращения',
      },
    },
    sidebar: {
      nodeEditor: {
        title: 'Редактирование {{data.name}}',
      },
      nodeList: {
        title: 'Перетяните блок на диаграмму',
      },
    },
  },
};
