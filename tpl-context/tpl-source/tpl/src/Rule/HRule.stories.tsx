import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Box, HRule, HRuleProps } from '../index.js';

/**
 * The `HRule` component wraps an [`<hr>` HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr). It is typically used to visually separate stacked content.
 * `HRule` comes in three variants:
 *
 * * primary
 * * secondary
 * * tertiary
 */
const meta = {
  title: 'Rule/Horizontal Rule (HRule)',
  component: HRule,

  tags: ['autodocs'],

  parameters: {
    controls: {
      sort: 'alpha',
    },
  },

  render: args => (
    <Box py={1}>
      <HRule {...args} />
    </Box>
  ),
} satisfies Meta<HRuleProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
};
