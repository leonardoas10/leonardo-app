import { Switch, SwitchProps } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

import styles from './IOSSwitch.module.css';

interface IOSSwitchProps extends SwitchProps {
    checkedIcon?: ReactElement;
    uncheckedIcon?: ReactElement;
    customSize?: 'small' | 'medium' | 'large';
}

type SwitchSize = NonNullable<IOSSwitchProps['customSize']>;

const SIZE_CLASS: Record<SwitchSize, string> = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
};

const THUMB_SIZE_CLASS: Record<SwitchSize, string> = {
    small: styles.thumbSmall,
    medium: styles.thumbMedium,
    large: styles.thumbLarge,
};

export function SwitchThumbContent({
    customSize = 'medium',
    children,
}: {
    customSize?: SwitchSize;
    children: ReactNode;
}) {
    return (
        <span className={`${styles.thumb} ${THUMB_SIZE_CLASS[customSize]}`}>
            {children}
        </span>
    );
}

export const IOSSwitch = ({
    checkedIcon,
    uncheckedIcon,
    customSize = 'medium',
    className,
    ...props
}: IOSSwitchProps) => {
    if ((!checkedIcon && uncheckedIcon) || (checkedIcon && !uncheckedIcon)) {
        throw new Error(
            'IOSSwitch requires both checkedIcon and uncheckedIcon or none'
        );
    }

    const switchClassName = [
        styles.switch,
        styles.switch,
        SIZE_CLASS[customSize],
        checkedIcon && uncheckedIcon ? styles.withIcons : null,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Switch
            className={switchClassName}
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            checkedIcon={checkedIcon}
            icon={uncheckedIcon}
            inputProps={{ 'aria-label': props['aria-label'] || 'switch' }}
            {...props}
        />
    );
};
