import { useCallback, useState } from 'react';
import { EnviromentVariables } from '@/utils/constants';

export const useRecaptcha = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    // Function to load the reCAPTCHA script on demand
    const loadRecaptchaScript = useCallback(() => {
        if (scriptLoaded) return Promise.resolve();

        return new Promise<void>((resolve) => {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${EnviromentVariables.RECAPTCHA_SITE_KEY}`;
            script.async = true;
            script.defer = true;

            script.onload = () => {
                setScriptLoaded(true);
                setIsLoaded(true);

                // Hide the reCAPTCHA badge
                const style = document.createElement('style');
                style.innerHTML =
                    '.grecaptcha-badge { visibility: hidden !important; }';
                document.head.appendChild(style);

                resolve();
            };

            document.head.appendChild(script);
        });
    }, [scriptLoaded]);

    const executeRecaptcha = useCallback(
        async (action: string) => {
            // Load the script on demand if not already loaded
            if (!scriptLoaded) {
                await loadRecaptchaScript();
            }

            if (!window.grecaptcha) {
                console.error('reCAPTCHA not loaded');
                return null;
            }

            try {
                return await new Promise<string>((resolve) => {
                    window.grecaptcha.ready(() => {
                        window.grecaptcha
                            .execute(EnviromentVariables.RECAPTCHA_SITE_KEY, {
                                action,
                            })
                            .then(resolve);
                    });
                });
            } catch (error) {
                console.error('reCAPTCHA execution error:', error);
                return null;
            }
        },
        [scriptLoaded, loadRecaptchaScript]
    );

    return { executeRecaptcha, isLoaded, loadRecaptchaScript };
};
