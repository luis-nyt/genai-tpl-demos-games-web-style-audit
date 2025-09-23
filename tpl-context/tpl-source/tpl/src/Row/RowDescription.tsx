import React, { FC, ReactNode } from 'react';
import { Text } from '../Typography/index.js';
import { descriptionClass } from './styled.js';

export interface RowDescriptionProps {
  children?: ReactNode;
}

export const RowDescription: FC<RowDescriptionProps> = ({ children }) => (
  <Text className={descriptionClass} size={14} color="secondary">
    {children}
  </Text>
);
