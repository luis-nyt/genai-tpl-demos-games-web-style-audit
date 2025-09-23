import { Meta, StoryObj } from '@storybook/react';
import { TextProps, Text } from '../index.js';
import { bodyParams, createSizeControl, responsiveSize } from './shared.js';

const meta = {
  title: 'Typography/Text',
  component: Text,
  ...bodyParams,
} satisfies Meta<TextProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 16 },
  argTypes: {
    size: {
      ...createSizeControl('Text'),
    },
  },
};

/**
 * Text may accept an array of sizes for responsive layouts
 */
export const ResponsiveSizes: Story = {
  args: { size: [14, 16] },
  // @ts-expect-error
  argTypes: { ...responsiveSize },
};
