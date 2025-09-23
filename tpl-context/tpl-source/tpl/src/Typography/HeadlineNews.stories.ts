import { Meta, StoryObj } from '@storybook/react';
import { HeadlineNewsProps, HeadlineNews } from '../index.js';
import { headingParams, createSizeControl, responsiveSize } from './shared.js';

const meta = {
  title: 'Typography/HeadlineNews',
  component: HeadlineNews,
  ...headingParams,
  argTypes: {
    size: createSizeControl('HeadlineNews'),
    italic: {
      control: 'boolean',
    },
  },
} satisfies Meta<HeadlineNewsProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 36, italic: false },
};

/**
 * Text may accept an array of sizes for responsive layouts
 */
export const ResponsiveSizes: Story = {
  args: { size: [22, 28] },
  // @ts-expect-error
  argTypes: { ...responsiveSize },
};
