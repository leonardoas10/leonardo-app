'use client';

import React from 'react';

import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeRegistry } from '@/contexts/ThemeContext';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeRegistry>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeRegistry>
  );
}