'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

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
    // Create regex pattern for all terms to highlight
    const pattern = new RegExp(`\\b(${highlightTerms.join('|')})\\b`, 'gi');

    // Split text by highlight terms
    const parts = text.split(pattern);

    return (
        <Typography
            variant={variant}
            textAlign={textAlign}
            paragraph={paragraph}
        >
            {parts.map((part, i) => {
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
                            transition: 'color 1s ease',
                        }}
                    >
                        {part}
                    </Box>
                ) : (
                    <React.Fragment key={i}>{part}</React.Fragment>
                );
            })}
        </Typography>
    );
};
