import { useCallback, useEffect, useState } from 'react';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export const useRecaptcha = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load the reCAPTCHA script
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            setIsLoaded(true);

            // Hide the reCAPTCHA badge
            const style = document.createElement('style');
            style.innerHTML =
                '.grecaptcha-badge { visibility: hidden !important; }';
            document.head.appendChild(style);
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const executeRecaptcha = useCallback(
        async (action: string) => {
            if (!window.grecaptcha || !isLoaded) {
                console.error('reCAPTCHA not loaded');
                return null;
            }

            try {
                return await new Promise<string>((resolve) => {
                    window.grecaptcha.ready(() => {
                        window.grecaptcha
                            .execute(RECAPTCHA_SITE_KEY, { action })
                            .then(resolve);
                    });
                });
            } catch (error) {
                console.error('reCAPTCHA execution error:', error);
                return null;
            }
        },
        [isLoaded]
    );

    return { executeRecaptcha, isLoaded };
};
