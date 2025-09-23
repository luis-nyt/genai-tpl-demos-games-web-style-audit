import { Meta, StoryObj } from '@storybook/react';
import { Spinner, SpinnerProps } from './index.js';
import { createRender } from '../stories/createRender.js';

const meta = {
  title: 'Spinner',
  component: Spinner,
  tags: ['autodocs'],
  render: createRender(Spinner),
} satisfies Meta<SpinnerProps>;
export default meta;

type Story = StoryObj<typeof meta>;

const BaseExample: Story = { args: {} };

export { BaseExample };
