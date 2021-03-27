import I18n from 'i18n-js';

import en from './en.json';
import ru from './ru.json';

I18n.fallbacks = true;

I18n.translations = {
  en,
  ru,
};

I18n.defaultLocale = 'ru';

export default I18n;
