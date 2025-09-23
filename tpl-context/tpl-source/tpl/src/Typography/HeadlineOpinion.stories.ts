import { Meta, StoryObj } from '@storybook/react';
import { HeadlineOpinionProps, HeadlineOpinion } from '../index.js';
import { headingParams, createSizeControl, responsiveSize } from './shared.js';

const meta = {
  title: 'Typography/HeadlineOpinion',
  component: HeadlineOpinion,
  ...headingParams,
  argTypes: {
    size: createSizeControl('HeadlineOpinion'),
  },
} satisfies Meta<HeadlineOpinionProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 24 },
};

/**
 * Text may accept an array of sizes for responsive layouts
 */
export const ResponsiveSizes: Story = {
  args: { size: [24, 36] },
  // @ts-expect-error
  argTypes: { ...responsiveSize },
};
