import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { ru } from './ru';
import locales from 'date-fns/locale';
import { isDate } from 'date-fns';

const LNG_KEY = 'lng';

const getLng = () => {
  if (typeof window !== 'undefined') {
    if (localStorage) {
      const lng = localStorage.getItem(LNG_KEY);
      if (lng) {
        return lng;
      }

      localStorage.setItem(LNG_KEY, 'ru');
      return 'ru';
    }
  }
};

export function initI18n() {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en,
        ru,
      },
      lng: getLng(),
      interpolation: {
        escapeValue: false,
      },
    })
    .catch(console.error);
}
