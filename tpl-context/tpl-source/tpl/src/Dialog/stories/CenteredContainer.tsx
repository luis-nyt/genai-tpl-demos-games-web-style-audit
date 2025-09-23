import React from 'react';
import { Flex } from '../../Flex/index.js';

export const CenteredContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={2}
      gap={2}
      style={{ boxSizing: 'border-box' }}
    >
      {children}
    </Flex>
  );
};
