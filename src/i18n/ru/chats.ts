import { ResourceLanguage } from 'i18next';

export const chats: ResourceLanguage = {
  open: 'Открытые',
  assigned: 'Мои',
  unassigned: 'Неназначенные',
  closed: 'Закрытые',
  types: {
    0: 'Мои',
    1: 'Неназначенные',
    2: 'Закрытые',
  },
  noChat: 'Выберите чат',
  noData: 'Нет данных',
  chat: {
    header: {
      assignedTo: 'Назначен на',
    },
    list: {
      accept: 'Принять',
      reopen: 'Открыть заново',
      view: 'Посмотреть контакт',
      return: 'Вернуть в очередь',
      close: 'Закрыть',
      sendHsm: 'Шабонное сообщение',
    },
    message: {
      empty: 'Пустое сообщение',
      defaultFileName: 'Вложение',
      download: 'Скачать',
      unsupportedMediaType: 'Собеседник отправил неподдерживаемое сообщение',
    },
    system: {
      today: 'Сегодня',
      yesterday: 'Вчера',
    },
    input: 'Введите сообщение здесь...',
    sendHsmModal: {
      title: 'Отправка сообщения контакту {{name}}',
      description: '',
      submit: 'Отправить',
      cancel: 'Отмена',
    },
  },
};
