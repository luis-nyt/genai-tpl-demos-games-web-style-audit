import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { styled } from 'pretty-lights';
import { Box } from '../Box/index.js';
import { color } from '../tokens/index.js';
import { Switcher, SwitcherProps } from './index.js';

const meta = {
  title: 'Layout/Switcher',
  component: Switcher,
} satisfies Meta<typeof Switcher>;
export default meta;

interface SwitcherStoryProps extends SwitcherProps {
  firstChildMaxWidth: string;
}

type Story = StoryFn<SwitcherStoryProps>;

const Placeholder = styled(Box)({
  background: color.content.secondary,
  height: '10rem',
});

export const Default: Story = ({ firstChildMaxWidth, ...rest }) => (
  <Switcher {...rest}>
    <Placeholder maxWidth={firstChildMaxWidth} />
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Switcher>
);

Default.args = {
  margin: 1,
  gap: 2,
  switchWidth: '30rem',
  firstChildMaxWidth: '40px',
  maxWidth: '40rem',
};
