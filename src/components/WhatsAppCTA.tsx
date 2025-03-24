import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function WhatsAppCTA() {
  const { t } = useTranslation();
  const whatsappNumber = '15551234567';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-fade-in">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center space-x-3 bg-gradient-to-r from-green-600 to-green-500 
                 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-green-500/20 
                 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
        <span className="font-medium hidden md:inline">{t('contact.whatsapp.cta')}</span>
        <ArrowRight className="w-5 h-5 hidden md:block opacity-0 group-hover:opacity-100 
                            transform translate-x-[-10px] group-hover:translate-x-0 
                            transition-all duration-300" />
      </a>
    </div>
  );
}