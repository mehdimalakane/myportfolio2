import { ReactNode } from 'react';

export interface SocialLink {
  icon: ReactNode;
  url: string;
  label: string;
  color: string;
}

export interface Service {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  playlistId: string;
}

export interface MenuItem {
  href: string;
  label: string;
}

export interface ClientLogo {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}