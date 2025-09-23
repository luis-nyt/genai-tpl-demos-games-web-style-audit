import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BoxProps, Box as BoxComponent, Typography } from '../../index.js';
import { argTypes } from './shared.js';

const meta = {
  title: 'Layout/Box',
  component: BoxComponent,
  argTypes,
  tags: ['autodocs'],
} satisfies Meta<BoxProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Box: Story = {
  args: {
    padding: 2,
    margin: 3,
    bg: 'secondary',
    maxWidth: '12rem',
    children: (
      <Typography color="primary" variant="Title/22">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    ),
  },
};
