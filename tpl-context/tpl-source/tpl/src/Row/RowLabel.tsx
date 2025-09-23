import React, { FC, ReactNode } from 'react';
import { Text } from '../Typography/index.js';
import { labelClass } from './styled.js';

export interface RowLabelProps {
  children?: ReactNode;
}

export const RowLabel: FC<RowLabelProps> = ({ children }) => (
  <Text className={labelClass} size={16} color="primary">
    {children}
  </Text>
);
