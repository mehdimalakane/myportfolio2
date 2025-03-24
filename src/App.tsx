import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useLanguageFont } from './hooks/useLanguageFont';
import { 
  Menu, Play, AudioWaveform as Waveform, Mic2, Headphones, Music4, MessageCircle as WhatsappIcon, 
  Youtube, Music2, Radio, Tv, Mail, Phone, MapPin, Instagram, Linkedin, Facebook, Music, 
  ChevronLeft, ChevronRight, Languages, CheckCircle, Clock, Users, Sparkles, Workflow, Settings,
  FileCheck, MessageSquare, HelpCircle, Plus, Minus, Award, Target, Zap, Volume2, VolumeX, Heart,
  Music3 as Spotify, X
} from 'lucide-react';

import LanguageSelector from './components/LanguageSelector';
import VideoModal from './components/VideoModal';
import SocialBar from './components/SocialBar';
import { useImagePreload } from './hooks/useImagePreload';
import { useFontsLoaded } from './hooks/useFontsLoaded';
import LoadingScreen from './components/LoadingScreen';
import { useScrollPosition } from './hooks/useScrollPosition';
import ContactForm from './components/ContactForm';

function App() {
  const { t, i18n } = useTranslation();
  useLanguageFont();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const showSocialBar = useScrollPosition();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    videoId?: string;
    playlistId?: string;
    title: string;
  }>({
    isOpen: false,
    title: ''
  });

  const handleCloseModal = () => {
    setVideoModal({ isOpen: false, title: '' });
  };

  const handleOpenModal = (modalProps: { videoId?: string; playlistId?: string; title: string }) => {
    setVideoModal({ isOpen: true, ...modalProps });
  };

  const isRTL = i18n.dir() === 'rtl';

  const menuItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#services', label: t('nav.servicesAndPortfolio') },
    { href: '#whyChooseUs', label: t('nav.whyChooseUs') },
    { href: '#projectSteps', label: t('nav.projectSteps') },
    { href: '#faq', label: t('nav.faq') },
    { href: '#about', label: t('nav.about') },
    { href: '#contact', label: t('nav.contact') }
  ];

  const services = [
    { 
      icon: <Mic2 className="w-12 h-12" />, 
      title: t('services.voiceOver.title', 'Voice Over: Expressive & Versatile'), 
      description: t('services.voiceOver.description', 'From Moroccan Darija to Classical Arabic, I bring authentic emotion and impact to your words. My versatile voice delivers the perfect tone for your commercials, narrations, and audio productions.'),
      buttonText: t('services.voiceOver.buttonText'),
      playlistId: "PLV4LCpScUQwzGQOxRhmo0Wh_2GQXnXwpV"
    },
    { 
      icon: <Music4 className="w-12 h-12" />, 
      title: t('services.audioProduction.title', 'Sound Mixing & Production: Elevate Your Audio'), 
      description: t('services.audioProduction.description', 'Transform raw recordings into polished soundscapes. I craft immersive audio experiences that capture your message\'s essence and engage listeners on a deeper level.'),
      buttonText: t('services.audioProduction.buttonText'),
      playlistId: "PLV4LCpScUQwxXaZQlYCdmyqQVAuCWXDk1"
    },
    { 
      icon: <Headphones className="w-12 h-12" />, 
      title: t('services.mixingMastering.title', 'Audio Recording: Professional Sound Quality'), 
      description: t('services.mixingMastering.description', 'Capture flawless audio in my acoustically optimized studio. Professional equipment and technical expertise ensure exceptional quality for your music, podcasts, and voice projects.'),
      buttonText: t('services.mixingMastering.buttonText'),
      playlistId: "PLV4LCpScUQwwXzQoBYqF9kzWp_2UUhC8N"
    }
  ];

  const whyChooseMe = [
    {
      icon: <Award className="w-12 h-12 text-purple-500" />,
      title: t('whyChooseMe.items.experience.title'),
      description: t('whyChooseMe.items.experience.description')
    },
    {
      icon: <Target className="w-12 h-12 text-purple-500" />,
      title: t('whyChooseMe.items.quality.title'),
      description: t('whyChooseMe.items.quality.description')
    },
    {
      icon: <Clock className="w-12 h-12 text-purple-500" />,
      title: t('whyChooseMe.items.turnaround.title'),
      description: t('whyChooseMe.items.turnaround.description')
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-500" />,
      title: t('whyChooseMe.items.equipment.title'),
      description: t('whyChooseMe.items.equipment.description')
    }
  ];

  const projectSteps = [
    {
      icon: <MessageSquare className="w-8 h-8 text-purple-500" />,
      title: t('projectSteps.steps.consultation.title'),
      description: t('projectSteps.steps.consultation.description')
    },
    {
      icon: <FileCheck className="w-8 h-8 text-purple-500" />,
      title: t('projectSteps.steps.planning.title'),
      description: t('projectSteps.steps.planning.description')
    },
    {
      icon: <Settings className="w-8 h-8 text-purple-500" />,
      title: t('projectSteps.steps.production.title'),
      description: t('projectSteps.steps.production.description')
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      title: t('projectSteps.steps.delivery.title'),
      description: t('projectSteps.steps.delivery.description')
    }
  ];

  const faqItems = [
    {
      question: t('faq.questions.projects.question'),
      answer: t('faq.questions.projects.answer')
    },
    {
      question: t('faq.questions.timeline.question'),
      answer: t('faq.questions.timeline.answer')
    },
    {
      question: t('faq.questions.rates.question'),
      answer: t('faq.questions.rates.answer')
    },
    {
      question: t('faq.questions.remote.question'),
      answer: t('faq.questions.remote.answer')
    }
  ];

  const socialLinks = [
    { 
      icon: <Instagram className="w-4 h-4" />, 
      url: 'https://instagram.com/audiopro', 
      label: 'Instagram',
      color: 'hover:text-pink-500'
    },
    { 
      icon: <Linkedin className="w-4 h-4" />, 
      url: 'https://linkedin.com/company/audiopro', 
      label: 'LinkedIn',
      color: 'hover:text-blue-500'
    },
    { 
      icon: <X className="w-4 h-4" />, 
      url: 'https://x.com/audiopro', 
      label: 'X',
      color: 'hover:text-gray-400'
    },
    { 
      icon: <Facebook className="w-4 h-4" />, 
      url: 'https://facebook.com/audiopro', 
      label: 'Facebook',
      color: 'hover:text-blue-600'
    },
    { 
      icon: <Youtube className="w-4 h-4" />, 
      url: 'https://youtube.com/@audiopro', 
      label: 'YouTube',
      color: 'hover:text-red-600'
    },
    { 
      icon: <Spotify className="w-4 h-4" />, 
      url: 'https://open.spotify.com/artist/audiopro', 
      label: 'Spotify',
      color: 'hover:text-green-500'
    },
    { 
      icon: <Mail className="w-4 h-4" />, 
      url: 'mailto:contact@audiopro.studio', 
      label: 'Email',
      color: 'hover:text-yellow-500'
    },
    { 
      icon: <Phone className="w-4 h-4" />, 
      url: 'tel:+15551234567', 
      label: 'Phone',
      color: 'hover:text-purple-500'
    },
    { 
      icon: <WhatsappIcon className="w-4 h-4" />, 
      url: 'https://wa.me/15551234567', 
      label: 'WhatsApp',
      color: 'hover:text-green-500'
    }
  ];

  const clientLogos = [
    { name: 'Universal Music', url: 'https://images.unsplash.com/photo-1650374472455-8c1960fc00c4?auto=format&fit=crop&w=200&h=100&q=80' },
    { name: 'Sony Music', url: 'https://images.unsplash.com/photo-1650374472455-8c1960fc00c4?auto=format&fit=crop&w=200&h=100&q=80' },
    { name: 'Warner Music', url: 'https://images.unsplash.com/photo-1650374472455-8c1960fc00c4?auto=format&fit=crop&w=200&h=100&q=80' },
    { name: 'EMI Records', url: 'https://images.unsplash.com/photo-1650374472455-8c1960fc00c4?auto=format&fit=crop&w=200&h=100&q=80' },
    { name: 'Atlantic Records', url: 'https://images.unsplash.com/photo-1650374472455-8c1960fc00c4?auto=format&fit=crop&w=200&h=100&q=80' },
  ];

  const imageUrls = [
    ...clientLogos.map(logo => logo.url),
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80"
  ];

  const { isLoaded: imagesLoaded, progress: imageProgress } = useImagePreload(imageUrls);
  const fontsLoaded = useFontsLoaded();
  
  const progress = ((imageProgress + (fontsLoaded ? 100 : 0)) / 2);

  const nextLogo = () => {
    setCurrentLogoIndex((prevIndex) => 
      prevIndex === clientLogos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevLogo = () => {
    setCurrentLogoIndex((prevIndex) => 
      prevIndex === 0 ? clientLogos.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextLogo, 5000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleLogos = () => {
    const logos = [...clientLogos];
    const start = currentLogoIndex;
    const visibleCount = 3;
    const result = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (start + i) % logos.length;
      result.push(logos[index]);
    }
    
    return result;
  };

  if (!imagesLoaded || !fontsLoaded) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('meta.title', 'AudioPro - Professional Audio Services')}</title>
        <meta name="description" content={t('meta.description', 'Professional audio production, voice-over services, and sound engineering. Transform your sound with AudioPro.')} />
        
        <meta property="og:title" content={t('meta.title', 'AudioPro - Professional Audio Services')} />
        <meta property="og:description" content={t('meta.description', 'Professional audio production, voice-over services, and sound engineering. Transform your sound with AudioPro.')} />
        <link rel="canonical" href={`https://audiopro.studio/${i18n.language === 'en' ? '' : i18n.language + '/'}`} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": t('meta.title', 'AudioPro - Professional Audio Services'),
            "description": t('meta.description', 'Professional audio production, voice-over services, and sound engineering.'),
            "inLanguage": i18n.language,
            "isPartOf": {
              "@type": "WebSite",
              "name": "AudioPro",
              "url": "https://audiopro.studio"
            }
          })}
        </script>
      </Helmet>

      <div className={`min-h-screen bg-gradient-to-b from-gray-900 to-black text-white ${isRTL ? 'rtl' : 'ltr'}`}>
        <SocialBar links={socialLinks} showBar={showSocialBar} isRTL={isRTL} />

        <VideoModal
          isOpen={videoModal.isOpen}
          onClose={handleCloseModal}
          videoId={videoModal.videoId}
          playlistId={videoModal.playlistId}
          title={videoModal.title}
        />

        <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Play className="w-8 h-8 text-purple-500" />
                <span className="ml-2 text-xl font-bold">AudioPro</span>
              </div>
              
              <div className="hidden md:flex md:items-center md:space-x-8">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="hover:text-purple-500 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <LanguageSelector />
              </div>

              <div className="md:hidden flex items-center space-x-4">
                <LanguageSelector />
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-white"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 hover:bg-purple-500/20 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        <section id="home" className="relative pt-32 pb-24 bg-gradient-to-b from-purple-900/20 via-black to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                {t('hero.title')}
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                {t('hero.subtitle')}
              </p>
              <div className="mt-10 flex items-center justify-center space-x-4">
                <button
                  onClick={() => handleOpenModal({
                    videoId: 'ro7yBoCThqg',
                    title: t('hero.demoTitle')
                  })}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base 
                         font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 
                         transition-colors space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>{t('hero.learnMore')}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-12">{t('clients.title')}</h2>
            <div className="relative">
              <div className="flex items-center justify-center">
                <button
                  onClick={prevLogo}
                  className="absolute left-0 z-10 p-2 text-purple-500 hover:text-purple-400 transition-colors"
                  aria-label={t('clients.previous')}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                
                <div className="flex items-center justify-center space-x-8 overflow-hidden px-12">
                  {getVisibleLogos().map((logo, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-48 h-24 bg-gray-800/50 rounded-lg p-4 flex items-center justify-center transition-all duration-300 hover:bg-gray-800/70"
                    >
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={nextLogo}
                  className="absolute right-0 z-10 p-2 text-purple-500 hover:text-purple-400 transition-colors"
                  aria-label={t('clients.next')}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">{t('services.titleWithPortfolio')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-xl bg-gradient-to-b from-purple-900/20 to-transparent 
                         border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500
                         flex flex-col min-h-[400px]"
                >
                  <div className="p-8 flex-grow">
                    <div className="flex justify-center mb-6">
                      <div className="text-purple-500 transform group-hover:scale-110 transition-transform duration-500">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-center mb-4">{service.title}</h3>
                    <p className="text-gray-400 text-center mb-8">{service.description}</p>
                  </div>
                  <div className="p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                    <button
                      onClick={() => handleOpenModal({
                        playlistId: service.playlistId,
                        title: service.title
                      })}
                      className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full 
                             font-semibold tracking-wide transform hover:scale-105 transition-all duration-300
                             flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/25"
                    >
                      <Play className="w-5 h-5" />
                      <span>{service.buttonText}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="whyChooseUs" className="py-20 bg-gradient-to-b from-black/50 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">{t('whyChooseMe.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseMe.map((item, index) => (
                <div key={index} className="bg-gray-800/30 rounded-lg p-6 transform hover:-translate-y-2 transition-all duration-300">
                  <div className="flex justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">{item.title}</h3>
                  <p className="text-gray-400 text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projectSteps" className="py-20 bg-gradient-to-b from-black/50 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">{t('projectSteps.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {projectSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gray-800/30 rounded-lg p-6 h-full">
                    <div className="flex items-center mb-6">
                      <div className="bg-purple-500/20 rounded-full p-3">
                        {step.icon}
                      </div>
                      <div className="ml-4 text-2xl font-bold text-purple-500">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">{t('faq.title')}</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item, index) => (
                <div 
                  key={index} 
                  className="faq-item"
                >
                  <button
                    className="faq-button"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    aria-expanded={activeFaq === index}
                    aria-controls={`faq-content-${index}`}
                  >
                    <span className="faq-button-text">
                      {item.question}
                    </span>
                    <span 
                      className={`faq-icon ${activeFaq === index ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    >
                      {activeFaq === index ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </span>
                  </button>
                  <div
                    id={`faq-content-${index}`}
                    className="faq-content"
                    style={{
                      maxHeight: activeFaq === index ? '1000px' : '0',
                      opacity: activeFaq === index ? 1 : 0,
                      visibility: activeFaq === index ? 'visible' : 'hidden'
                    }}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                  >
                    <div className="faq-answer">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">{t('about.title')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-lg text-gray-300">{t('about.description1')}</p>
                <p className="text-lg text-gray-300">{t('about.description2')}</p>
                <div className="grid grid-cols-2 gap-8 mt-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-500">10+</div>
                    <div className="text-gray-400 mt-2">{t('about.stats.experience')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-500">500+</div>
                    <div className="text-gray-400 mt-2">{t('about.stats.projects')}</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80"
                  alt={t('about.studioImage')}
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">{t('contact.title')}</h2>
            <p className="text-xl text-gray-300 text-center mb-12">{t('contact.subtitle')}</p>
            
            <ContactForm services={services} />
          </div>
        </section>
      </div>
    </>
  );
}

export default App;