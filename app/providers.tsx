'use client';

import React from 'react';
import { ThemeRegistry } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeRegistry>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeRegistry>
  );
}