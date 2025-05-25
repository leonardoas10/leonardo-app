import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

interface CustomButtonProps extends Omit<ButtonProps, 'component'> {
    download?: boolean;
    href?: string;
}

export const Button: React.FC<CustomButtonProps> = ({
    children,
    variant = 'contained',
    download,
    href,
    sx,
    ...props
}) => {
    // Use anchor element when href is provided
    const buttonProps: Omit<ButtonProps, 'component'> & {
        component?: React.ElementType;
        download?: boolean;
    } = {
        variant,
        sx: {
            bgcolor: 'background.aws',
            color: 'text.primary',
            boxShadow: '0 6px 14px rgba(255, 255, 255, 0.3)',
            '&:hover': {
                bgcolor: 'background.aws',
                opacity: 0.9,
            },
            ...sx,
        },
        ...props,
    };

    if (href) {
        buttonProps.href = href;
        buttonProps.component = 'a';
        if (download) buttonProps.download = download;
    }

    return <MuiButton {...buttonProps}>{children}</MuiButton>;
};
