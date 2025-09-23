import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Box, Flex } from '@nyt/foundation';
import { Body, HeadlineNews, HRule, VRule, VRuleProps } from '../index.js';

/**
 * The `VRule` component wraps an [`<hr>` HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr). It is typically used to visually separate side-by-side content.
 * `HRule` comes in two variants:
 *
 * * primary
 * * secondary
 */
const meta = {
  title: 'Rule/Vertical Rule (VRule)',
  component: VRule,

  args: {
    mx: 1,
  },

  tags: ['autodocs'],

  parameters: {
    controls: {
      sort: 'alpha',
    },
  },
} satisfies Meta<VRuleProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    height: '100px',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    height: '100px',
  },
};

export const FlexColumnExample: StoryFn<VRuleProps> = args => (
  <Flex flexDirection="row" alignItems="stretch" justifyContent="space-between" gap={2}>
    <Box flex="1">
      <HeadlineNews size={32}>Headline</HeadlineNews>
    </Box>
    <VRule {...args} />
    <Box flex="1">
      <Body>Summary</Body>
    </Box>
  </Flex>
);
FlexColumnExample.args = {
  variant: 'secondary',
};

export const ComplexFlexLayoutExample: StoryFn<Exclude<VRuleProps, 'height'>> = args => (
  <Flex p={1} flexDirection="column" alignItems="stretch" gap={2}>
    <Flex flexDirection="row" alignItems="stretch" justifyContent="space-between" gap={2}>
      <Box flex="1">
        <HRule {...args} />
        <HeadlineNews size={32}>Headline 1</HeadlineNews>
        <Body>Summary 1</Body>
      </Box>

      <VRule {...args} />

      <Box flex="1">
        <HRule {...args} />
        <HeadlineNews size={32}>Headline 2</HeadlineNews>
        <Body>Summary 2</Body>
      </Box>
    </Flex>

    <HRule {...args} />
  </Flex>
);
ComplexFlexLayoutExample.args = {
  variant: 'primary',
};
