import { ResourceLanguage } from 'i18next';

export const tags: ResourceLanguage = {
  create: 'Добавить новый тег',
  tag: {},
  modal: {
    create: {
      title: 'Создание тега',
      description: '',
    },
    update: {
      title: 'Редактирование тега',
      description: '',
    },
    fields: {
      name: 'Название тега',
      description: 'Описание тега',
      parentId: 'Родетельский тег',
      color: 'Цвет тега',
      default: {
        parentId: 'Без родительского тега',
      },
    },
    submit: 'Сохранить',
    cancel: 'Отмена',
  },
};
