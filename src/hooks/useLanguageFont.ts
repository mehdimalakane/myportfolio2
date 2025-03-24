import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguageFont() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const html = document.documentElement;
    const isRTL = i18n.dir() === 'rtl';
    
    // Set direction and language
    html.dir = isRTL ? 'rtl' : 'ltr';
    html.lang = i18n.language;

    // Remove all language classes first
    html.classList.remove('lang-ar', 'lang-en', 'lang-fr');

    // Apply language-specific font class
    if (isRTL) {
      html.classList.add('lang-ar');
    } else if (i18n.language === 'fr') {
      html.classList.add('lang-fr');
    } else {
      html.classList.add('lang-en');
    }

    // Force font refresh
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';

  }, [i18n.language]);
}