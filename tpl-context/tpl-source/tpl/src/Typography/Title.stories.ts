import { Meta, StoryObj } from '@storybook/react';
import { TitleProps, Title } from '../index.js';
import { headingParams, createSizeControl, responsiveSize } from './shared.js';

const meta = {
  title: 'Typography/Title',
  component: Title,
  ...headingParams,
} satisfies Meta<TitleProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 16 },
  argTypes: {
    size: createSizeControl('Title'),
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
