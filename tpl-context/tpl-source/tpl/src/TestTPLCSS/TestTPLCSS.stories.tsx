import { Meta, StoryObj } from '@storybook/react';
import { TestTPLCSS } from './index.js';
import { createRender } from '../stories/createRender.js';

const meta = {
  title: 'TestTPLCSS',
  component: TestTPLCSS,
  tags: ['autodocs'],
  args: {
    label: 'Testing CSS Modules',
    value: 1,
  },
  render: createRender(TestTPLCSS),
} satisfies Meta<any>;
export default meta;

interface Props {}

type Story = StoryObj<Props>;

export const Default: Story = { args: { name: 'test1' } };
