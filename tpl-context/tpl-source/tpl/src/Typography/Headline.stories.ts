import { Meta, StoryObj } from '@storybook/react';
import { HeadlineProps, Headline } from '../index.js';
import { headingParams, createSizeControl, responsiveSize } from './shared.js';

const meta = {
  title: 'Typography/Headline',
  component: Headline,
  ...headingParams,
} satisfies Meta<HeadlineProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 18 },
  argTypes: {
    size: {
      ...createSizeControl('Headline'),
    },
  },
};

/**
 * Text may accept an array of sizes for responsive layouts
 */
export const ResponsiveSizes: Story = {
  args: { size: [18, 24] },
  // @ts-expect-error
  argTypes: { ...responsiveSize },
};
