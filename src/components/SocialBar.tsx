import React from 'react';
import { useTranslation } from 'react-i18next';
import { SocialLink } from '../types';

interface SocialBarProps {
  links: SocialLink[];
  showBar: boolean;
  isRTL: boolean;
}

export default function SocialBar({ links, showBar, isRTL }: SocialBarProps) {
  const { t } = useTranslation();
  
  return (
    <div 
      className={`fixed z-40 transition-all duration-500 ease-in-out ${
        showBar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      } ${isRTL ? 'right-6' : 'left-6'} top-1/3 -translate-y-1/2`}
      aria-hidden={!showBar}
    >
      <div className="flex flex-col space-y-2">
        <div className="bg-gradient-to-b from-gray-900/40 to-gray-900/20 backdrop-blur-md 
                    rounded-full p-2 shadow-lg hover:shadow-xl
                    border border-white/5 transition-all duration-300">
          <div className="flex flex-col space-y-2">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                aria-label={t(`social.${link.label.toLowerCase()}`)}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                  bg-gray-800/40 text-gray-400 ${link.color}
                  transform hover:scale-110 transition-all duration-300
                  group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]
                  group-hover:bg-gray-700/40 group-hover:-translate-y-1
                  relative overflow-hidden`}
                >
                  <div className="relative z-10 transform transition-transform duration-300 group-hover:scale-110">
                    {link.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className={`absolute ${isRTL ? 'right-12' : 'left-12'} top-1/2 -translate-y-1/2 
                  bg-gradient-to-r from-gray-900/80 to-gray-800/80 text-white px-2.5 py-1 
                  rounded-full text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 
                  transition-all duration-300 scale-95 group-hover:scale-100
                  ${isRTL ? 'translate-x-2 group-hover:translate-x-0' : '-translate-x-2 group-hover:translate-x-0'}
                  shadow-lg border border-white/10 backdrop-blur-sm`}
                >
                  <span className="relative z-10 font-medium tracking-wide">{link.label}</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/40 to-gray-800/40 
                               opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}