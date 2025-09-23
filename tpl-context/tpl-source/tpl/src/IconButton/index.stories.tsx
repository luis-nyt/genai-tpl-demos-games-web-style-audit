import React, { ReactNode } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Flex, CaretRightIcon, IconButton, IconButtonProps, Text } from '../index.js';
import { buttonArgTypes } from '../stories/argTypes.js';
import { createRender } from '../stories/createRender.js';

const meta = {
  title: 'Buttons/Icon Button',
  component: IconButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  args: {
    icon: CaretRightIcon,
    'aria-label': 'Next Image',
  },
  argTypes: {
    ...buttonArgTypes,
    height: {
      control: 'select',
      options: ['standard', 'compact', 'extraCompact', 'expanded'],
      defaultValue: 'standard',
    },
  },
  // @ts-expect-error
  render: createRender(IconButton),
} satisfies Meta<IconButtonProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { 'aria-disabled': true } };
export const Compact: Story = { args: { height: 'compact' } };
export const ExtraCompact: Story = { args: { height: 'extraCompact' } };
export const Expanded: Story = { args: { height: 'expanded' } };
export const Processing: Story = { args: { processing: true } };
export const WithLinkToNewWindow: Story = {
  args: { href: 'https://www.nytimes.com', target: '_blank', rel: 'noreferrer noopener' },
};

// TODO: Make a general-purpose VQAGrid for all Button components

type IconButtonRowProps = IconButtonProps & {
  Component: (args: IconButtonProps) => ReactNode;
};

const IconButtonRow = ({ Component, ...props }: IconButtonRowProps) => (
  <Component {...props} icon={CaretRightIcon} />
);

const IconButtonColumn = (args: IconButtonRowProps) => (
  <Flex flexDirection="column" gap={2}>
    <IconButtonRow {...args} />
    <IconButtonRow {...args} aria-disabled />
    <IconButtonRow {...args} processing />
    <Text size={12} color="secondary">
      Height: {args.height ?? 'standard'}
    </Text>
  </Flex>
);

export const VQAGrid: StoryFn<IconButtonRowProps> = args => (
  <Flex flexDirection="row" flexWrap="wrap" gap={4} p={4}>
    <IconButtonColumn {...args} height="expanded" />
    <IconButtonColumn {...args} />
    <IconButtonColumn {...args} height="compact" />
    <IconButtonColumn {...args} height="extraCompact" />
  </Flex>
);
VQAGrid.args = {
  // @ts-expect-error
  Component: IconButton,
};
