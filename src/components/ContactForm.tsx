import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle, AlertCircle, Loader, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

interface ContactFormProps {
  services: Array<{
    title: string;
    description: string;
  }>;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  services: string[];
}

export default function ContactForm({ services }: ContactFormProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    // Handle form submission success from Netlify
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'form-submit-success') {
        setStatus('success');
        reset();
        setTimeout(() => setStatus('idle'), 5000);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [reset]);

  const onSubmit = async (data: FormData) => {
    // If honeypot is filled, silently reject the submission
    if (honeypot) {
      setStatus('success'); // Fake success to avoid spam detection
      return;
    }

    setStatus('loading');
    
    try {
      const formData = new FormData();
      formData.append('form-name', 'contact');
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);
      formData.append('services', data.services.join(', '));
      
      // Additional recipients for form notifications
      formData.append('recipient', 'contact@mehdimalakane.com, mehdimalakane5@gmail.com');

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        setStatus('success');
        reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: t('contact.phone'),
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: t('contact.whatsapp'),
      value: '+1 (555) 123-4567',
      href: 'https://wa.me/15551234567'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: t('contact.email'),
      value: 'contact@mehdimalakane.com',
      href: 'mailto:contact@mehdimalakane.com'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t('contact.address'),
      value: '123 Studio Street, Audio City, AC 12345',
      href: 'https://maps.google.com/?q=123+Studio+Street,+Audio+City,+AC+12345'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Information */}
      <div className="space-y-8">
        <div className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50">
          <h3 className="text-xl font-semibold mb-6">{t('contact.getInTouch')}</h3>
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target={info.icon.type === MapPin ? "_blank" : undefined}
                rel={info.icon.type === MapPin ? "noopener noreferrer" : undefined}
                className="flex items-start space-x-4 group hover:bg-gray-700/30 p-3 rounded-lg transition-all duration-300"
              >
                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-300">
                  {React.cloneElement(info.icon, { className: "w-5 h-5 text-purple-400" })}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">{info.label}</p>
                  <p className="text-white group-hover:text-purple-400 transition-colors duration-300">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        data-netlify="true"
        name="contact"
        netlify-honeypot="bot-field"
      >
        {/* Honeypot field */}
        <p className="hidden">
          <label>
            Don't fill this out if you're human: <input name="bot-field" onChange={e => setHoneypot(e.target.value)} />
          </label>
        </p>

        {/* Hidden fields for Netlify Forms */}
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="recipient" value="contact@mehdimalakane.com, mehdimalakane5@gmail.com" />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            {t('contact.form.name')}
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: true })}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
            placeholder={t('contact.form.namePlaceholder')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{t('contact.form.nameRequired')}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            {t('contact.form.email')}
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
            placeholder={t('contact.form.emailPlaceholder')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{t('contact.form.emailInvalid')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('contact.form.services')}
          </label>
          <div className="space-y-3">
            {services.map((service, index) => (
              <label key={index} className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('services')}
                  value={service.title}
                  className="mt-1 form-checkbox h-4 w-4 text-purple-500 border-gray-700 rounded focus:ring-purple-500 focus:ring-offset-0 bg-gray-800/50 transition-all duration-300"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            {t('contact.form.message')}
          </label>
          <textarea
            id="message"
            {...register('message', { required: true })}
            rows={5}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 resize-none"
            placeholder={t('contact.form.messagePlaceholder')}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-400">{t('contact.form.messageRequired')}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base 
                     font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 
                     transition-all duration-300 space-x-2 disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
          >
            {status === 'loading' ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>{t('contact.form.sending')}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>{t('contact.form.send')}</span>
              </>
            )}
          </button>

          {status === 'success' && (
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>{t('contact.form.success')}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center space-x-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{t('contact.form.error')}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}