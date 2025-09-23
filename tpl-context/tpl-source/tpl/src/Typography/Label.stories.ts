import { Meta, StoryObj } from '@storybook/react';
import { LabelProps, Label } from '../index.js';
import { createSizeControl, headingParams } from './shared.js';

const meta = {
  title: 'Typography/Label',
  component: Label,
  decorators: headingParams.decorators,
  args: {
    children: 'Lorem ipsum dolor',
  },
  argTypes: {
    variant: createSizeControl('Label'),
  },
} satisfies Meta<LabelProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'Regular' },
};
