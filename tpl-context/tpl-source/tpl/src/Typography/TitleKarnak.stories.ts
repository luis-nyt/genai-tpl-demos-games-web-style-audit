import { Meta, StoryObj } from '@storybook/react';
import { TitleKarnakProps, TitleKarnak } from '../index.js';
import { headingParams, createSizeControl, responsiveSize } from './shared.js';

const meta = {
  title: 'Typography/TitleKarnak',
  component: TitleKarnak,
  ...headingParams,
} satisfies Meta<TitleKarnakProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 16 },
  argTypes: {
    size: createSizeControl('TitleKarnak'),
  },
};

/**
 * Text may accept an array of sizes for responsive layouts
 */
export const ResponsiveSizes: Story = {
  args: { size: [16, 18] },
  // @ts-expect-error
  argTypes: { ...responsiveSize },
};
