'use client';

import { Button as MuiButton, ButtonProps, Typography } from '@mui/material';
import React, { useMemo } from 'react';

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
    const buttonProps = useMemo(() => {
        const baseProps: Omit<ButtonProps, 'component'> & {
            component?: React.ElementType;
            download?: boolean;
            'aria-label'?: string;
        } = {
            variant,
            size,
            disableRipple: true,
            'aria-label': typeof children === 'string' ? children : undefined,
            sx: {
                bgcolor: 'background.aws',
                boxShadow: '0 6px 14px rgba(255, 255, 255, 0.3)',
                '&:hover': {
                    bgcolor: 'background.aws',
                    opacity: 0.9,
                },
                height:
                    size === 'small'
                        ? '26px'
                        : size === 'large'
                          ? '38px'
                          : '32px',
                minWidth: size === 'small' ? '64px' : '80px',
                padding: size === 'small' ? '0px 8px' : '0px 16px',
                ...sx,
            },
            ...props,
        };

        if (href) {
            baseProps.href = href;
            baseProps.component = 'a';
            if (download) baseProps.download = download;
        }

        return baseProps;
    }, [children, variant, size, sx, href, download, props]);

    return (
        <MuiButton {...buttonProps}>
            <Typography
                component="span"
                sx={{
                    transition: 'color 1s ease',
                    color: '#FFFFFF',
                    fontWeight: 500,
                }}
            >
                {children}
            </Typography>
        </MuiButton>
    );
};
