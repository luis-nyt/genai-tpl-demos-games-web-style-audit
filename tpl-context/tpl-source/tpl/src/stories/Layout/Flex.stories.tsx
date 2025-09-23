import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Flex as FlexComponent, FlexProps, Box } from '../../index.js';
import { argTypes, spaceScaleSelect } from './shared.js';

const meta = {
  title: 'Layout/Flex',
  component: FlexComponent,
  argTypes: {
    ...argTypes,
    gap: spaceScaleSelect,
  },
  tags: ['autodocs'],
} satisfies Meta<FlexProps>;
export default meta;

const boxProps = {
  flex: '1',
  height: '3rem',
};

export const Flex: StoryFn<FlexProps> = ({ colorBehavior, ...args }) => (
  <FlexComponent colorBehavior={colorBehavior} {...args}>
    <Box colorBehavior={colorBehavior} {...boxProps} bg="primary" />
    <Box colorBehavior={colorBehavior} {...boxProps} bg="primary" />
    <Box colorBehavior={colorBehavior} {...boxProps} bg="primary" />
  </FlexComponent>
);
Flex.args = {
  padding: 2,
  margin: 3,
  gap: 3,
  bg: 'tertiary',
  maxWidth: '18rem',
};
