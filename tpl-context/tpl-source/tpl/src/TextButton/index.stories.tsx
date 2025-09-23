import React, { ReactNode } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import {
  CaretLeftIcon,
  CaretRightIcon,
  Flex,
  PlusIcon,
  Text,
  TextButton,
  TextButtonProps,
} from '../index.js';
import { buttonArgTypes } from '../stories/argTypes.js';
import { createRender } from '../stories/createRender.js';

const meta = {
  title: 'Buttons/Text Button',
  component: TextButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    // layout: 'centered',
  },
  args: {
    children: 'Text button',
  },
  argTypes: {
    ...buttonArgTypes,
    height: {
      control: 'select',
      options: ['standard', 'compact', 'extraCompact'],
      defaultValue: 'standard',
    },
  },
  // @ts-expect-error
  render: createRender(TextButton),
} satisfies Meta<TextButtonProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const Disabled: Story = { args: { 'aria-disabled': true } };
export const IconTrailing: Story = {
  args: { icon: PlusIcon },
  name: 'Icon Trailing (Preferred)',
};
export const IconLeading: Story = {
  args: { icon: PlusIcon, style: { flexDirection: 'row-reverse' } },
};
export const Processing: Story = { args: { processing: true } };
export const WithLinkToNewWindow: Story = {
  args: { href: 'https://www.nytimes.com', target: '_blank', rel: 'noreferrer noopener' },
};
export const WithCompactHeight: Story = { args: { height: 'compact' } };
export const WithExtraCompactHeight: Story = { args: { height: 'extraCompact' } };

// TODO: Make a general-purpose VQAGrid for all Button components

type TextButtonRowProps = TextButtonProps & {
  Component: (args: TextButtonProps) => ReactNode;
};

const TextButtonRow = ({ Component, ...props }: TextButtonRowProps) => (
  <Flex flexDirection="row" gap={2}>
    <Component {...props} />
    <Component {...props} icon={CaretRightIcon} />
    <Component {...props} icon={CaretLeftIcon} style={{ flexDirection: 'row-reverse' }} />
  </Flex>
);

const TextButtonColumn = (args: TextButtonRowProps) => (
  <Flex flexDirection="column" gap={2}>
    <TextButtonRow {...args} />
    <TextButtonRow {...args} aria-disabled />
    <TextButtonRow {...args} processing />
    <Text size={12} color="secondary">
      Height: {args.height ?? 'standard'}
    </Text>
  </Flex>
);

export const VQAGrid: StoryFn<TextButtonRowProps> = args => (
  <Flex flexDirection="row" flexWrap="wrap" gap={4} p={4}>
    <TextButtonColumn {...args} />
    <TextButtonColumn {...args} height="compact" />
    <TextButtonColumn {...args} height="extraCompact" />
  </Flex>
);
VQAGrid.args = {
  // @ts-expect-error
  Component: TextButton,
  children: 'Text button',
};
