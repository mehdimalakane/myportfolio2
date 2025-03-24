import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' }
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  // Function to update document attributes for language
  const updateDocumentLanguage = React.useCallback((languageCode: string) => {
    const language = languages.find(lang => lang.code === languageCode);
    if (language) {
      document.documentElement.dir = language.dir;
      document.documentElement.lang = language.code;
      
      // Update font family based on language direction
      if (language.dir === 'rtl') {
        document.documentElement.style.setProperty('--font-primary', '"Noto Kufi Arabic", system-ui, -apple-system, sans-serif');
      } else {
        document.documentElement.style.setProperty('--font-primary', '"Outfit", system-ui, -apple-system, sans-serif');
      }
    }
  }, []);

  // Initialize language settings on mount
  React.useEffect(() => {
    updateDocumentLanguage(i18n.language);
  }, [i18n.language, updateDocumentLanguage]);

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    updateDocumentLanguage(languageCode);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen && (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex(0);
      return;
    }

    if (isOpen) {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          setActiveIndex(-1);
          buttonRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setActiveIndex(prev => (prev < languages.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setActiveIndex(prev => (prev > 0 ? prev - 1 : languages.length - 1));
          break;
        case 'Tab':
          if (!event.shiftKey && activeIndex === languages.length - 1) {
            setIsOpen(false);
            setActiveIndex(-1);
          } else if (event.shiftKey && activeIndex === 0) {
            setIsOpen(false);
            setActiveIndex(-1);
          }
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (activeIndex >= 0) {
            changeLanguage(languages[activeIndex].code);
          }
          break;
        case 'Home':
          event.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setActiveIndex(languages.length - 1);
          break;
      }
    }
  };

  // Focus management for dropdown items
  React.useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      const activeItem = document.getElementById(`language-option-${languages[activeIndex].code}`);
      activeItem?.focus();
    }
  }, [activeIndex, isOpen]);

  const currentLanguage = languages.find(lang => lang.code === i18n.language);
  const dropdownId = 'language-selector-dropdown';
  const labelId = 'language-selector-label';

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <span id={labelId} className="sr-only">Select language</span>
      <button
        ref={buttonRef}
        className="flex items-center space-x-2 text-gray-300 hover:text-purple-500 transition-colors"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setActiveIndex(0);
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        aria-controls={dropdownId}
      >
        <Languages className="w-5 h-5" aria-hidden="true" />
        <span className="hidden md:inline">
          {currentLanguage?.name}
        </span>
        <span className="sr-only">
          Current language: {currentLanguage?.name}. Press Enter to change language
        </span>
      </button>
      
      {isOpen && (
        <div
          id={dropdownId}
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
          role="listbox"
          aria-labelledby={labelId}
          tabIndex={-1}
        >
          <div className="py-1">
            {languages.map((language, index) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  i18n.language === language.code 
                    ? 'text-purple-500 bg-gray-700' 
                    : 'text-gray-300 hover:bg-gray-700'
                } ${activeIndex === index ? 'bg-gray-700' : ''}`}
                role="option"
                aria-selected={i18n.language === language.code}
                tabIndex={activeIndex === index ? 0 : -1}
                id={`language-option-${language.code}`}
              >
                <span className="flex items-center justify-between">
                  {language.name}
                  {i18n.language === language.code && (
                    <span className="sr-only">(Selected)</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}