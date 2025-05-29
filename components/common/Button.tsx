'use client';

import React from 'react';
import { Button as MuiButton, ButtonProps, Typography } from '@mui/material';

interface CustomButtonProps extends Omit<ButtonProps, 'component'> {
    download?: boolean;
    href?: string;
    size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<CustomButtonProps> = ({
    children,
    variant = 'contained',
    download,
    href,
    size = 'medium',
    sx,
    ...props
}) => {
    // Use anchor element when href is provided
    const buttonProps: Omit<ButtonProps, 'component'> & {
        component?: React.ElementType;
        download?: boolean;
    } = {
        variant,
        size,
        disableRipple: true,
        sx: {
            bgcolor: 'background.aws',
            boxShadow: '0 6px 14px rgba(255, 255, 255, 0.3)',
            '&:hover': {
                bgcolor: 'background.aws',
                opacity: 0.9,
            },
            height:
                size === 'small' ? '26px' : size === 'large' ? '38px' : '32px',
            minWidth: size === 'small' ? '64px' : '80px',
            padding: size === 'small' ? '0px 8px' : '0px 16px',
            ...sx,
        },
        ...props,
    };

    if (href) {
        buttonProps.href = href;
        buttonProps.component = 'a';
        if (download) buttonProps.download = download;
    }

    return (
        <MuiButton {...buttonProps}>
            <Typography
                component="span"
                color="textPrimary"
                sx={{ transition: 'color 1s ease' }}
            >
                {children}
            </Typography>
        </MuiButton>
    );
};
