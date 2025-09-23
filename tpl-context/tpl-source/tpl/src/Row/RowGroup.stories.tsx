/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import * as RS from './Row.stories.js';
import { RowGroup, RowGroupProps } from './RowGroup.js';
import { colorBehaviorArgType } from '../stories/argTypes.js';
import { Flex } from '../Flex/index.js';
import { Row, RowProps } from './Row.js';

// @see https://github.com/storybookjs/storybook/issues/15401
Row.Description.displayName = 'Row.Description';
Row.Group.displayName = 'Row.Group';
Row.Header.displayName = 'Row.Header';
Row.Label.displayName = 'Row.Label';

interface RowGroupStoryProps extends Omit<RowGroupProps, 'children'> {
  children?: (RowProps | undefined)[];
}

const meta = {
  title: 'Row/Row.Group',
  component: RowGroup,
  tags: ['autodocs'],
  args: {
    // @ts-expect-error
    width: 350,
  },
  argTypes: {
    ...colorBehaviorArgType,
    width: { control: { type: 'range', min: 200, max: 1000, step: 1 } },
  },
  render: ({ children, colorBehavior, width, ...rest }) => (
    <Flex
      bg="primary"
      p={2}
      colorBehavior={colorBehavior}
      justifyContent="center"
      alignItems="center"
    >
      <RowGroup width={`calc(${width} / 16 * 1rem)`} {...rest}>
        {children?.map((rowArgs, rowIndex) => <Row key={rowIndex} {...rowArgs} />)}
      </RowGroup>
    </Flex>
  ),
} satisfies Meta<RowGroupStoryProps>;
export default meta;

type Story = StoryObj<RowGroupStoryProps>;

export const TextOnly: Story = {
  args: {
    header: 'Text Only',
    children: [RS.LabelOnly.args, RS.Description.args, RS.LongDescription.args],
  },
};

export const Nav: Story = {
  args: {
    header: 'Nav',
    children: [
      RS.NavWithLabelOnly.args,
      RS.NavWithDescription.args,
      RS.NavWithLongDescription.args,
    ],
  },
};

export const Button: Story = {
  args: {
    header: 'Button',
    children: [RS.Button.args, RS.ButtonAndDescription.args, RS.ButtonAndLongDescription.args],
  },
};

export const StackedButton: Story = {
  args: {
    header: 'Stacked Button',
    children: [
      RS.StackedButton.args,
      RS.StackedButtonAndDescription.args,
      RS.StackedButtonAndLongDescription.args,
    ],
  },
};

export const TextButton: Story = {
  args: {
    header: 'Text Button',
    children: [
      RS.TextButton.args,
      RS.TextButtonAndDescription.args,
      RS.TextButtonAndLongDescription.args,
    ],
  },
};

export const StackedTextButton: Story = {
  args: {
    header: 'Stacked Text Button',
    children: [
      RS.StackedTextButton.args,
      RS.StackedTextButtonAndDescription.args,
      RS.StackedTextButtonAndLongDescription.args,
    ],
  },
};

export const Icon: Story = {
  args: {
    header: 'Icon',
    children: [RS.Icon.args, RS.IconAndDescription.args, RS.IconAndLongDescription.args],
  },
};
export const NavAndIcon: Story = {
  args: {
    header: 'Nav + Icon',
    children: [
      RS.NavWithIcon.args,
      RS.NavWithIconAndDescription.args,
      RS.NavWithIconAndLongDescription.args,
    ],
  },
};
export const IconAndButton: Story = {
  args: {
    header: 'Icon + Button',
    children: [
      RS.IconWithButton.args,
      RS.IconAndDescriptionWithButton.args,
      RS.IconAndLongDescriptionWithButton.args,
    ],
  },
};

export const IconAndStackedButton: Story = {
  args: {
    header: 'Icon + Stacked Button',
    children: [
      RS.IconWithStackedButton.args,
      RS.IconAndDescriptionWithStackedButton.args,
      RS.IconAndLongDescriptionWithStackedButton.args,
    ],
  },
};
export const IconAndTextButton: Story = {
  args: {
    header: 'Icon + Text Button',
    children: [
      RS.IconWithTextButton.args,
      RS.IconAndDescriptionWithTextButton.args,
      RS.IconAndLongDescriptionWithTextButton.args,
    ],
  },
};
export const IconAndStackedTextButton: Story = {
  args: {
    header: 'Icon + Stacked Text Button',
    children: [
      RS.IconWithStackedTextButton.args,
      RS.IconAndDescriptionWithStackedTextButton.args,
      RS.IconAndLongDescriptionWithStackedTextButton.args,
    ],
  },
};

export const Media: Story = {
  args: {
    header: 'Media',
    children: [RS.Media.args, RS.MediaAndDescription.args, RS.MediaAndLongDescription.args],
  },
};
export const NavAndMedia: Story = {
  args: {
    header: 'Nav + Media',
    children: [
      RS.NavWithMedia.args,
      RS.NavWithMediaAndDescription.args,
      RS.NavWithMediaAndLongDescription.args,
    ],
  },
};
export const MediaAndButton: Story = {
  args: {
    header: 'Media + Button',
    children: [
      RS.MediaWithButton.args,
      RS.MediaAndDescriptionWithButton.args,
      RS.MediaAndLongDescriptionWithButton.args,
    ],
  },
};
export const MediaAndStackedButton: Story = {
  args: {
    header: 'Media + Stacked Button',
    children: [
      RS.MediaWithStackedButton.args,
      RS.MediaAndDescriptionWithStackedButton.args,
      RS.MediaAndLongDescriptionWithStackedButton.args,
    ],
  },
};
export const MediaAndTextButton: Story = {
  args: {
    header: 'Media + Text Button',
    children: [
      RS.MediaWithTextButton.args,
      RS.MediaAndDescriptionWithTextButton.args,
      RS.MediaAndLongDescriptionWithTextButton.args,
    ],
  },
};
export const MediaStackedTextButton: Story = {
  args: {
    header: 'Media + Stacked Text Button',
    children: [
      RS.MediaWithStackedTextButton.args,
      RS.MediaAndDescriptionWithStackedTextButton.args,
      RS.MediaAndLongDescriptionWithStackedTextButton.args,
    ],
  },
};

interface VQAGridProps extends Omit<RowGroupProps, 'children'> {
  children?: (RowGroupStoryProps | undefined)[][];
}

export const VQAGrid: StoryFn<VQAGridProps> = ({
  children,
  colorBehavior,
  width,
  ...storyArgs
}) => (
  <Flex
    display="inline-flex"
    flexDirection="column"
    gap={8}
    py={8}
    alignItems="flex-start"
    bg="primary"
    colorBehavior={colorBehavior}
  >
    {children?.map(rowGroups => (
      <Flex flexDirection="row" gap={8}>
        {rowGroups.map((rowGroupArgs, rowGroupIndex) => {
          if (!rowGroupArgs) return undefined;

          const { children: rows, ...restOfRowGroupArgs } = rowGroupArgs;
          return (
            <RowGroup
              key={rowGroupIndex}
              width={`calc(${width} / 16 * 1rem)`}
              {...restOfRowGroupArgs}
              {...storyArgs}
              pl={rowGroupIndex === 0 ? 8 : undefined}
              pr={rowGroupIndex === rowGroups.length - 1 ? 8 : undefined}
            >
              {rows?.map((rowArgs, rowIndex) => <Row key={rowIndex} {...rowArgs} />)}
            </RowGroup>
          );
        })}
      </Flex>
    ))}
  </Flex>
);
VQAGrid.args = {
  children: [
    [
      TextOnly.args,
      Nav.args,
      Button.args,
      StackedButton.args,
      TextButton.args,
      StackedTextButton.args,
    ],
    [
      Icon.args,
      NavAndIcon.args,
      IconAndButton.args,
      IconAndStackedButton.args,
      IconAndTextButton.args,
      IconAndStackedTextButton.args,
    ],
    [
      Media.args,
      NavAndMedia.args,
      MediaAndButton.args,
      MediaAndStackedButton.args,
      MediaAndTextButton.args,
      MediaStackedTextButton.args,
    ],
  ],
};
