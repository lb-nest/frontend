import { ResourceLanguage } from 'i18next';
import { NodeType, TriggerType, ValidationType } from '../../components/chatbots/editor/types';

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
      [NodeType.AssignTag]: {
        title: 'Присвоение тега',
        fields: {
          name: 'Название ноды',
          tagId: 'Тег',
        },
        noTag: 'Не выбрано',
      },
      [NodeType.Branch]: {
        title: 'Ветвление',
        fields: {
          name: 'Название ноды',
        },
      },
      [NodeType.Buttons]: {
        title: 'Кнопки',
        fields: {
          name: 'Название ноды',
          text: 'Сообщение',
        },
      },
      [NodeType.Close]: {
        title: 'Закрытие обращения',
        fields: {
          name: 'Название ноды',
        },
      },
      [NodeType.CollectInput]: {
        title: 'Сбор входных данных',
        fields: {
          name: 'Название ноды',
          text: 'Сообщение',
          validation: 'Валидация',
          regexp: 'Регулярное выражение',
          variable: 'Переменная для сохранения',
        },
        validationType: {
          [ValidationType.Boolean]: 'Логический тип',
          [ValidationType.Email]: 'E-mail',
          [ValidationType.Number]: 'Число',
          [ValidationType.Phone]: 'Мобильный телефон',
          [ValidationType.RegExp]: 'Регулярное выражение',
          [ValidationType.String]: 'Строка',
        },
        noVariable: 'Не выбрано',
      },
      [NodeType.SendMessage]: {
        title: 'Отправка сообщения',
        fields: {
          name: 'Название ноды',
          text: 'Сообщение',
          attachments: 'Вложения',
        },
      },
      [NodeType.ServiceCall]: {
        title: 'Вызов стороннего API',
        fields: {
          name: 'Название ноды',
          url: 'URL',
          headers: 'Заголовки запроса',
          body: 'Тело запроса',
          variable: 'Переменная для сохранения',
        },
        noVariable: 'Не выбрано',
      },
      [NodeType.Start]: {
        title: 'Бот запускается, если…',
        tooltip: 'Начните здесь',
        fields: {
          name: 'Название ноды',
          trigger: 'Триггер',
        },
        triggerType: {
          [TriggerType.NewChat]: 'Новый чат',
          [TriggerType.Webhook]: 'Вебхук',
        },
      },
      [NodeType.Transfer]: {
        title: 'Назначение ответственного',
        fields: {
          name: 'Название ноды',
          assignedTo: 'Назначаемый пользователь',
        },
        noAssignedTo: 'Не выбрано',
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
