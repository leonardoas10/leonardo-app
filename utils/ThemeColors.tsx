import { PaletteMode } from '@mui/material';

export const themeColors = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'dark'
            ? {
                  primary: {
                      main: process.env.NEXT_PUBLIC_COLOR_BLACK!,
                      button: process.env.NEXT_PUBLIC_COLOR_BLACK!,
                  },
                  background: {
                      paper: process.env.NEXT_PUBLIC_COLOR_BLACK!,
                      default: '#222222',
                      withoutBlack: process.env.NEXT_PUBLIC_COLOR_TRANSPARENT!,
                      withoutBlackAndWithClearGray:
                          process.env.NEXT_PUBLIC_COLOR_TRANSPARENT!,
                      reverse: process.env.NEXT_PUBLIC_COLOR_WHITE!,
                  },
                  text: {
                      primary: process.env.NEXT_PUBLIC_COLOR_WHITE!,
                  },
                  border: {
                      primary: process.env.NEXT_PUBLIC_COLOR_CLEAR_GRAY!,
                  },
              }
            : {
                  primary: {
                      main: process.env.NEXT_PUBLIC_COLOR_WHITE!,
                      button: process.env.NEXT_PUBLIC_COLOR_GRAY!,
                  },
                  background: {
                      paper: process.env.NEXT_PUBLIC_COLOR_WHITE!,
                      default: process.env.NEXT_PUBLIC_COLOR_GRAY!,
                      withoutBlackAndWithClearGray:
                          process.env.NEXT_PUBLIC_COLOR_CLEAR_GRAY!,
                      withoutBlack: process.env.NEXT_PUBLIC_COLOR_WHITE!,
                      reverse: process.env.NEXT_PUBLIC_COLOR_BLACK!,
                  },
                  border: {
                      primary: process.env.NEXT_PUBLIC_COLOR_MEDIUM_GRAY!,
                  },
                  text: {
                      primary: process.env.NEXT_PUBLIC_COLOR_BLACK!,
                      secondary: process.env.NEXT_PUBLIC_COLOR_BLACK!,
                  },
              }),
    },
    typography: {
        fontFamily: `"Segoe UI", "Helvetica Neue", Arial, sans-serif`,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    },
});
