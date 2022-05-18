import { ResourceLanguage } from 'i18next';

export const settings: ResourceLanguage = {
  project: 'Проект',
  team: 'Команда',
  profile: 'Профиль',
  system: 'Система',
  pages: {
    profile: {
      avatar: {
        title: 'Аватар',
        description: 'Картинка в формате JPG, PNG или GIF',
        upload: 'Загрузить',
      },
      email: 'Электронная почта',
      confirmed: {
        title: 'Почта подтверждена?',
        true: 'Да',
        false: 'Нет',
      },
      name: 'Имя',
      submit: 'Сохранить',
    },
    team: {
      invite: 'Пригласить сотрудника',
    },
  },
};
