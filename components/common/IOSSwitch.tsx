import { Switch, SwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { ReactElement } from 'react';

interface IOSSwitchProps extends SwitchProps {
    checkedIcon?: ReactElement;
    uncheckedIcon?: ReactElement;
    switchBaseMargin?: string | number;
    customSize?: 'small' | 'medium' | 'large';
}

// Get switch styles based on customSize
const getSwitchStyles = (customSize: 'small' | 'medium' | 'large') => {
    if (customSize === 'small') {
        return {
            width: 36,
            height: 20,
            thumbSize: 16,
            transform: 'translateX(16px)',
        };
    } else if (customSize === 'large') {
        return {
            width: 52,
            height: 31,
            thumbSize: 24,
            transform: 'translateX(20px)',
        };
    }
    // Default medium size
    return {
        width: 42,
        height: 26,
        thumbSize: 22,
        transform: 'translateX(16px)',
    };
};

const StyledSwitch = styled(Switch, {
    shouldForwardProp: (prop) => !['switchBaseMargin', 'customSize'].includes(prop as string)
})<{ switchBaseMargin?: string | number; customSize?: 'small' | 'medium' | 'large' }>(({ theme, switchBaseMargin = 2, customSize = 'medium' }) => {
    const styles = getSwitchStyles(customSize);
    
    return {
        width: styles.width,
        height: styles.height,
        padding: 0,
        '&:hover': {
            '& .MuiSwitch-track': {
                filter: 'brightness(1.2)',
            },
            '& .MuiSwitch-thumb': {
                boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: switchBaseMargin,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: styles.transform,
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.background.aws,
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color: theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: styles.thumbSize,
            height: styles.thumbSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: theme.transitions.create(['box-shadow'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: styles.height / 2,
            backgroundColor: theme.palette.background.aws,
            opacity: 1,
            transition: theme.transitions.create(
                ['background-color', 'box-shadow'],
                {
                    duration: 300,
                }
            ),
        },
    };
});

// Basic switch without icons
const BasicSwitch = styled(Switch, {
    shouldForwardProp: (prop) => !['switchBaseMargin', 'customSize'].includes(prop as string)
})<{ switchBaseMargin?: string | number; customSize?: 'small' | 'medium' | 'large' }>(({ theme, switchBaseMargin = 2, customSize = 'medium' }) => {
    const styles = getSwitchStyles(customSize);
    
    return {
        width: styles.width,
        height: styles.height,
        padding: 0,
        '&:hover': {
            '& .MuiSwitch-track': {
                filter: 'brightness(1.2)',
            },
            '& .MuiSwitch-thumb': {
                boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: switchBaseMargin,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: styles.transform,
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.background.aws,
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color: theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: styles.thumbSize,
            height: styles.thumbSize,
            transition: theme.transitions.create(['box-shadow'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: styles.height / 2,
            backgroundColor: theme.palette.background.aws,
            opacity: 1,
            transition: theme.transitions.create(
                ['background-color', 'box-shadow'],
                {
                    duration: 300,
                }
            ),
        },
    };
});

export const IOSSwitch = ({
    checkedIcon,
    uncheckedIcon,
    switchBaseMargin = 2,
    customSize = 'medium',
    ...props
}: IOSSwitchProps) => {
    // If no icons are provided, use the basic switch
    if (!checkedIcon && !uncheckedIcon) {
        return (
            <BasicSwitch
                focusVisibleClassName=".Mui-focusVisible"
                disableRipple
                switchBaseMargin={switchBaseMargin}
                customSize={customSize}
                inputProps={{ 'aria-label': props['aria-label'] || 'switch' }}
                {...props}
            />
        );
    }

    // If only one icon is provided, throw an error
    if ((!checkedIcon && uncheckedIcon) || (checkedIcon && !uncheckedIcon)) {
        throw new Error(
            'IOSSwitch requires both checkedIcon and uncheckedIcon or none'
        );
    }

    // If both icons are provided, use the styled switch with icons
    return (
        <StyledSwitch
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            checkedIcon={checkedIcon}
            icon={uncheckedIcon}
            switchBaseMargin={switchBaseMargin}
            customSize={customSize}
            inputProps={{ 'aria-label': props['aria-label'] || 'switch' }}
            {...props}
        />
    );
};