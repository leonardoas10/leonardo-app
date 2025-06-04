'use client';

import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';

interface HighlightedTextProps {
    text: string;
    highlightTerms: string[];
    variant?: 'body1' | 'body2' | 'h4' | 'h5' | 'h6';
    textAlign?: 'justify' | 'left' | 'center' | 'right';
    paragraph?: boolean;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
    text,
    highlightTerms,
    variant = 'body1',
    textAlign = 'justify',
    paragraph = false,
}) => {
    // Memoize the text parts to prevent recalculation on theme changes
    const renderedParts = useMemo(() => {
        // Skip processing if no highlight terms
        if (!highlightTerms.length) return text;

        // Create regex pattern for all terms to highlight
        const pattern = new RegExp(`\\b(${highlightTerms.join('|')})\\b`, 'gi');

        // Split text by highlight terms
        const parts = text.split(pattern);

        return parts.map((part, i) => {
            // Check if this part matches any highlight term (case insensitive)
            const isHighlighted = highlightTerms.some(
                (term) => part.toLowerCase() === term.toLowerCase()
            );

            return isHighlighted ? (
                <Box
                    component="span"
                    key={i}
                    sx={{
                        color: 'background.aws',
                        fontWeight: 'medium',
                    }}
                >
                    {part}
                </Box>
            ) : (
                <React.Fragment key={i}>{part}</React.Fragment>
            );
        });
    }, [text, highlightTerms]);

    return (
        <Typography
            variant={variant}
            textAlign={textAlign}
            paragraph={paragraph}
        >
            {renderedParts}
        </Typography>
    );
};
