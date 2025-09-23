import { Meta, StoryObj } from '@storybook/react';
import { HeadlineFeatureProps, HeadlineFeature } from '../index.js';
import { headingParams, createSizeControl, responsiveSize } from './shared.js';

const meta = {
  title: 'Typography/HeadlineFeature',
  component: HeadlineFeature,
  ...headingParams,
} satisfies Meta<HeadlineFeatureProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 32 },
  argTypes: {
    size: {
      ...createSizeControl('HeadlineFeature'),
    },
  },
};

/**
 * Text may accept an array of sizes for responsive layouts
 */
export const ResponsiveSizes: Story = {
  args: { size: [32, 48] },
  // @ts-expect-error
  argTypes: { ...responsiveSize },
};
