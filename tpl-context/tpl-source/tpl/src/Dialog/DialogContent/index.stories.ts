import { Meta, StoryObj } from '@storybook/react';
import { DialogContent, DialogContentProps } from './index.js';

/**
 * A view that renders [Dialog](?path=/docs/dialog--docs)'s title, label and description text in the default layout. Use as the dialog's `children` property.
 */
const meta = {
  component: DialogContent,
  tags: ['autodocs'],
  args: {
    children: 'Title',
    label: 'Label',
    description: 'Description',
  },
} satisfies Meta<DialogContentProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultDialogContent: Story = {
  args: {
    children: 'Introducing Apollo 11: Live',
    label: 'New Feature',
    description: 'Stay notified on our reporting of the historic moon landing.',
  },
};
