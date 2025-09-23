import React, { FC } from 'react';
import { HRule } from '../Rule/index.js';
import { Title, TitleProps } from '../Typography/index.js';

export interface RowHeaderProps extends TitleProps {
  topRule?: boolean;
}

export const RowHeader: FC<RowHeaderProps> = ({ children, topRule = true, sx, ...rest }) => (
  <>
    {topRule && <HRule variant="primary" />}
    <Title size={20} color="primary" sx={{ py: 2, ...sx }} {...rest}>
      {children}
    </Title>
  </>
);
