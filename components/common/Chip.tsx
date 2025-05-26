'use client';

import React from 'react';
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface ChipProps {
  label: string;
  href?: string;
  icon?: React.ReactElement;
  size?: MuiChipProps['size'];
  color?: MuiChipProps['color'];
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  href,
  icon,
  size = 'small',
  color = 'primary',
  onClick,
}) => {
  const chipContent = (
    <MuiChip
      icon={icon || (href ? <OpenInNewIcon fontSize="small" /> : undefined)}
      label={label}
      size={size}
      color={color}
      clickable={!!(href || onClick)}
      onClick={onClick}
      sx={{
        backgroundColor: 'gray',
        fontWeight: 'bold',
        '&:hover': {
          boxShadow: 1,
          backgroundColor: 'background.aws',
        },
        paddingBottom: 0.5,
      }}
    />
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        {chipContent}
      </a>
    );
  }

  return chipContent;
};