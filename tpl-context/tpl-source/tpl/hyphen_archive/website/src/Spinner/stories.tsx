import React from 'react';
import { Flex } from '@nyt/foundation';
import { Spinner } from '../../../src';

const BaseExample = ({ ...rest }) => (
  <Flex justifyContent="center" padding={3}>
    <Spinner {...rest} />
  </Flex>
);

export { BaseExample };
