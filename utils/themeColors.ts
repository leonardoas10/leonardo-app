import { PaletteMode, ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
    interface TypeBackground {
        aws?: string;
    }
    
    interface Palette {
        textPrimary?: string;
        textSecondary?: string;
    }
    
    interface PaletteOptions {
        textPrimary?: string;
        textSecondary?: string;
    }
}

export const themeColors = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                  // Light mode colors
                  primary: {
                      main: '#1976d2',
                  },
                  secondary: {
                      main: '#9c27b0',
                  },
                  background: {
                      default: '#f5f5f5',
                      paper: '#ffffff',
                      aws: '#A845E8',
                  },
                  textPrimary: '#1976d2',
                  textSecondary: '#A845E8',
              }
            : {
                  // Dark mode colors
                  primary: {
                      main: '#90caf9',
                  },
                  secondary: {
                      main: '#ce93d8',
                  },
                  background: {
                      default: '#121212',
                      paper: '#1e1e1e',
                      aws: '#FF9900',
                  },
                  textPrimary: '#90caf9',
                  textSecondary: '#FF9900',
              }),
    },
});
