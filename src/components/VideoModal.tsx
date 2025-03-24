import React, { useEffect, useRef, useCallback, useState } from 'react';
import { X, MessageCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId?: string;
  playlistId?: string;
  title: string;
}

export default function VideoModal({ isOpen, onClose, videoId, playlistId, title }: VideoModalProps) {
  const { t, i18n } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const whatsappNumber = '15551234567';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  }, [onClose]);

  const handleIframeError = () => {
    setError(i18n.language === 'fr' 
      ? 'Une erreur s\'est produite lors du chargement de la vidéo. Veuillez réessayer.'
      : i18n.language === 'ar'
      ? 'حدث خطأ أثناء تحميل الفيديو. يرجى المحاولة مرة أخرى.'
      : 'An error occurred while loading the video. Please try again.');
  };

  useEffect(() => {
    if (isOpen) {
      setError(null);
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape, handleClickOutside]);

  if (!isOpen) return null;

  const embedUrl = playlistId 
    ? `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0&modestbranding=1&hl=${i18n.language}`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&hl=${i18n.language}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="w-full max-w-[70%] bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
        style={{ maxHeight: '70vh' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white truncate pr-4">
            {title}
          </h3>
          
          <div className="flex items-center space-x-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 
                       rounded-full transition-all duration-300 text-sm font-medium shadow-lg 
                       hover:shadow-green-500/25 group"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline group-hover:scale-105 transition-transform">
                {t('contact.whatsapp.cta')}
              </span>
            </a>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full
                       hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative bg-black">
          {error ? (
            <div className="aspect-w-16 aspect-h-9 flex items-center justify-center bg-gray-900">
              <div className="text-center p-8">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-300">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-full
                           text-white text-sm transition-colors"
                >
                  {t('common.tryAgain')}
                </button>
              </div>
            </div>
          ) : (
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                ref={iframeRef}
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="w-full h-full"
                onError={handleIframeError}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}