import { PaletteMode, ThemeOptions } from '@mui/material';

export const themeColors = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                  // Light mode colors
                  primary: {
                      main: '#1976d2',
                  },
                  // secondary: {
                  //     main: '#9c27b0',
                  // },
                  background: {
                      default: '#f5f5f5',
                      paper: '#ffffff',
                  },
                  textPrimary: '#1976d2',
                  textSecondary: '#9c27b0',
              }
            : {
                  // Dark mode colors
                  primary: {
                      main: '#90caf9',
                  },
                  // secondary: {
                  //     main: '#ce93d8',
                  // },
                  background: {
                      default: '#121212',
                      paper: '#1e1e1e',
                  },
                  textPrimary: '#90caf9',
                  textSecondary: '#ce93d8',
              }),
    },
});
