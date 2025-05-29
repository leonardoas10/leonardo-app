'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ImageProps } from 'next/image';

interface TransitionImageProps extends Omit<ImageProps, 'src'> {
    darkSrc: string;
    lightSrc: string;
    isDarkMode: boolean;
}

export function TransitionImage({
    darkSrc,
    lightSrc,
    isDarkMode,
    alt,
    ...props
}: TransitionImageProps) {
    const [opacity, setOpacity] = useState(1);
    const [currentSrc, setCurrentSrc] = useState(
        isDarkMode ? darkSrc : lightSrc
    );

    useEffect(() => {
        // Start fade out
        setOpacity(0);

        // After fade out completes, change image and fade in
        const timer = setTimeout(() => {
            setCurrentSrc(isDarkMode ? darkSrc : lightSrc);
            setOpacity(1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [isDarkMode, darkSrc, lightSrc]);

    return (
        <Image
            src={currentSrc}
            alt={alt}
            style={{
                ...props.style,
                opacity,
                transition: 'opacity 2s ease',
            }}
            {...props}
        />
    );
}
