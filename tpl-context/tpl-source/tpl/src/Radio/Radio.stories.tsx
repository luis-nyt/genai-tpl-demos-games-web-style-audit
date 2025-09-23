import { css } from 'pretty-lights';
import { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioProps } from './index.js';
import { colorBehaviorArgType } from '../stories/argTypes.js';
import { createRender } from '../stories/createRender.js';

const meta = {
  title: 'Radio/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    label: 'Radio label text',
    value: 1,
  },
  argTypes: {
    ...colorBehaviorArgType,
    onChange: {
      action: 'changed',
    },
  },
  parameters: {
    controls: {
      include: ['colorBehavior', 'label', 'description', 'disabled', 'name', 'onChange', 'value'],
    },
  },
  render: createRender(Radio),
} satisfies Meta<RadioProps>;
export default meta;

type Story = StoryObj<RadioProps>;

export const Default: Story = { args: { name: 'story1' } };

export const Disabled: Story = { args: { disabled: true, name: 'story2' } };

export const Selected: Story = {
  args: { checked: true, name: 'story3' },
  name: 'Selected ("Checked")',
};

/**
 * The `Radio` component supports a `description` property.
 * Use it to display more details about a given option.
 */
export const WithDescription: Story = {
  args: {
    description: 'Radio description',
    name: 'story4',
  },
};

const rootClass = css`
  width: 100%;
  background: orange;
`;

const contentClass = css`
  width: 100%;
  background: rgba(0, 0, 255, 0.5);
`;

export const WithClassNameAndContentClassName: Story = {
  args: {
    className: rootClass,
    contentClassName: contentClass,
    label: 'Orange className, semitransparent blue contentClassName',
    name: 'story5',
  },
  name: 'With className and contentClassName',
};
