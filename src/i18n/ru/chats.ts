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
      return: 'Возврат в очередь',
      close: 'Закрыть',
    },
    message: {
      empty: '<пустое сообщение>',
      defaultFileName: 'Вложение',
      download: 'Скачать',
      unsupportedMediaType: 'Собеседник отправил неподдерживаемое сообщение',
    },
    input: 'Введите сообщение здесь...',
  },
};
