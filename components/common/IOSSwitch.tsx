import React, { ReactElement } from 'react';
import { Switch, SwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IOSSwitchProps extends SwitchProps {
    checkedIcon?: ReactElement;
    uncheckedIcon?: ReactElement;
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 26,
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
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
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
        width: 22,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: theme.transitions.create(['box-shadow'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.background.aws,
        opacity: 1,
        transition: theme.transitions.create(
            ['background-color', 'box-shadow'],
            {
                duration: 300,
            }
        ),
    },
}));

// Basic switch without icons
const BasicSwitch = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 26,
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
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
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
        width: 22,
        height: 22,
        transition: theme.transitions.create(['box-shadow'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.background.aws,
        opacity: 1,
        transition: theme.transitions.create(
            ['background-color', 'box-shadow'],
            {
                duration: 300,
            }
        ),
    },
}));

export const IOSSwitch = ({
    checkedIcon,
    uncheckedIcon,
    ...props
}: IOSSwitchProps) => {
    // If no icons are provided, use the basic switch
    if (!checkedIcon && !uncheckedIcon) {
        return (
            <BasicSwitch
                focusVisibleClassName=".Mui-focusVisible"
                disableRipple
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
            {...props}
        />
    );
};
