import { Meta, StoryObj } from '@storybook/react';
import { BodyProps, Body } from '../index.js';
import { bodyParams, createSizeControl, responsiveSize } from './shared.js';

const meta = {
  title: 'Typography/Body',
  component: Body,
  ...bodyParams,
} satisfies Meta<BodyProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 16 },
  argTypes: {
    size: {
      ...createSizeControl('Body'),
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
