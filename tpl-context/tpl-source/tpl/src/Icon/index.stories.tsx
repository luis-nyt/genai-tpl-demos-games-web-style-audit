import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Flex } from '@nyt/foundation';
import { css } from 'pretty-lights';
import { Body } from '../index.js';
import type * as IconMap from '../generated/Icons/index.js';
import { AlertIcon, PlusIcon } from '../generated/Icons/index.js';
import { Icon as IconComponent, IconProps, iconSizes } from './index.js';
import { argTypes } from '../stories/argTypes.js';
import { boxColorBehaviorStyles } from '../stories/createRender.js';

interface IconStoryProps extends IconProps {
  icon: keyof typeof IconMap;
}

interface IconStoryMappedProps extends IconProps {
  icon: React.FC<IconProps>;
}

export default {
  title: 'Icon',
  component: IconComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, context) => (
      <Box className={boxColorBehaviorStyles[context.args.colorBehavior ?? 'userDefault']} p={1}>
        {Story()}
      </Box>
    ),
  ],
  args: {
    size: 24,
  },
  argTypes: {
    ...argTypes,
    size: {
      control: 'select',
      options: iconSizes,
    },
  },
} satisfies Meta<IconStoryProps>;

type Story = StoryFn<IconStoryMappedProps>;

export const Icon: Story = ({ icon: I, ...rest }) => <I {...rest} />;
Icon.args = { icon: AlertIcon };

export const Sizing: Story = ({ icon: I, ...rest }) => (
  <Flex alignItems="center">
    <I {...rest} size={12} />
    <I {...rest} size={16} />
    <I {...rest} size={20} />
    <I {...rest} size={24} />
  </Flex>
);
Sizing.args = { icon: AlertIcon };

const scaledSize = css({
  height: '48px',
  width: '48px',
});

export const CustomScaling: Story = ({ icon: I, ...rest }) => (
  <I className={scaledSize} {...rest} size={24} />
);
CustomScaling.args = { icon: AlertIcon };

export const InlineProp: Story = ({ color, icon: I, ...rest }) => (
  <>
    <Body color={color}>
      <I size={16} color={color} inline {...rest} />
      Inline Icon with text (text large)
    </Body>
    <Flex alignItems="center" gap={0.5} style={{ color }}>
      <I size={16} color={color} inline {...rest} />
      <Body size={14} color={color}>
        Flex with Icon (text small)
      </Body>
    </Flex>
  </>
);
InlineProp.args = { color: 'primary', icon: PlusIcon };
