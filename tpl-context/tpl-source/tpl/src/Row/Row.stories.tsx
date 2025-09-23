import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Flex } from '../Flex/index.js';
import { Row, RowProps } from './index.js';
import { createRender } from '../stories/createRender.js';
import { HelpIcon, SuperTIcon } from '../generated/Icons/index.js';
import { Button as ButtonComponent } from '../Button/index.js';
import { TextButton as TextButtonComponent } from '../TextButton/index.js';
import { Body, HeadlineNews } from '../Typography/index.js';
import { colorBehaviorArgType } from '../stories/argTypes.js';
import { LinkBox } from '../LinkBox/index.js';

// @see https://github.com/storybookjs/storybook/issues/15401
Row.Description.displayName = 'Row.Description';
Row.Group.displayName = 'Row.Group';
Row.Header.displayName = 'Row.Header';
Row.Label.displayName = 'Row.Label';
// @ts-expect-error
LinkBox.Link.displayName = 'LinkBox.Link';

const MediaPlaceholder = () => (
  <Flex bg="tertiary" alignItems="center" justifyContent="center" width="4rem" height="4rem" aria-hidden>
    <HelpIcon color="secondary" aria-hidden />
  </Flex>
);

const leading = {
  none: undefined,
  Icon: <SuperTIcon size={24} aria-hidden />,
  Media: <MediaPlaceholder />,
} satisfies Record<string, RowProps['leading']>;

const label = <Row.Label>A row label</Row.Label>;
const navLabelLink = (
  <Row.Label>
    <LinkBox.Link subtle href="https://www.nytimes.com" target="_blank" rel="noopener noreferrer">
      A navigation row label
    </LinkBox.Link>
  </Row.Label>
);
const description = <Row.Description>This could be the length of some secondary label text.</Row.Description>;
const longDescription = (
  <Row.Description>
    This could be the length of some secondary label text. The length of this placeholder copy is meant to simulate when the description text wraps to multiple
    lines in narrower screens and layouts.
  </Row.Description>
);

const children = {
  none: undefined,
  label,
  labelAndDescription: [label, description],
  labelAndLongDescription: [label, longDescription],
  navLabel: navLabelLink,
  navLabelAndDescription: [navLabelLink, description],
  navLabelAndLongDescription: [navLabelLink, longDescription],
} satisfies Record<string, RowProps['children']>;

const style = {
  none: undefined,
  alignItemsFlexStart: { alignItems: 'flex-start' },
} satisfies Record<string, RowProps['style']>;

const trailing = {
  none: undefined,
  Button: <ButtonComponent onClick={action('button click')}>Connect</ButtonComponent>,
  TextButton: <TextButtonComponent onClick={action('text button click')}>Connect</TextButtonComponent>,
} satisfies Record<string, RowProps['trailing']>;

const meta = {
  title: 'Row/Row',
  component: Row,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: ['background', 'children', 'colorBehavior', 'leading', 'nav', 'stack', 'style', 'trailing', 'topRule'],
    },
  },
  argTypes: {
    ...colorBehaviorArgType,
    leading: {
      options: Object.keys(leading),
      mapping: leading,
      control: 'select',
    },
    children: {
      options: Object.keys(children),
      mapping: children,
      control: {
        type: 'select',
        labels: {
          label: 'Label Only',
          labelAndDescription: 'Label and Description',
          labelAndLongDescription: 'Label and Long Description',
          navLabel: 'Nav Label',
          navLabelAndDescription: 'Nav Label and Description',
          navLabelAndLongDescription: 'Nav Label and Long Description',
        },
      },
    },
    switchWidth: {
      options: [false, '16rem', '50rem', true],
      control: {
        type: 'select',
        labels: {
          false: 'false (never stack)',
          '16rem': '16rem (at 256px width)',
          '50rem': '50rem (at 800px width)',
          true: 'true (always stack)',
        },
      },
    },
    style: {
      options: Object.keys(style),
      mapping: style,
      control: {
        type: 'select',
        labels: {
          none: 'None',
          alignItemsFlexStart: 'align-items: flex-start',
        },
      },
    },
    trailing: {
      options: Object.keys(trailing),
      mapping: trailing,
      control: {
        type: 'select',
        labels: {
          none: 'None',
          NavWithClickEvent: 'Nav with Click Event',
          NavWithHyperlink: 'Nav with Hyperlink (opens in new tab)',
          Button: 'Button',
          TextButton: 'Text Button',
        },
      },
    },
  },
  render: createRender(Row),
} satisfies Meta<typeof Row>;
export default meta;

export type Story = StoryObj<typeof meta>;

const switchWidth: RowProps['switchWidth'] = true;

export const Default: Story = { args: { leading: leading.Media, children: children.labelAndDescription, trailing: trailing.TextButton } };

/* Text Only */
/** Use the `<Row.Label>` subcomponent to render a Row's text label within the center slot (the React-standard `children` prop). */
export const LabelOnly: Story = { args: { children: children.label } };
/** Use `<Row.Description>` to render additional descriptive text in the center slot, underneath the `<Row.Label>`. */
export const Description: Story = { args: { children: children.labelAndDescription } };
export const LongDescription: Story = { args: { children: children.labelAndLongDescription } };

/* Button */
export const Button: Story = { args: { ...LabelOnly.args, trailing: trailing.Button } };
export const ButtonAndDescription: Story = { args: { ...Description.args, trailing: trailing.Button } };
export const ButtonAndLongDescription: Story = { args: { ...LongDescription.args, trailing: trailing.Button } };

/* Text Button */
export const TextButton: Story = { args: { ...LabelOnly.args, trailing: trailing.TextButton } };
/** When using `<Row.Description>`, we automatically align all content to the top edge of the Row. */
export const TextButtonAndDescription: Story = { args: { ...Description.args, trailing: trailing.TextButton } };
/**
 * When using `<Row.Description>`, we automatically align all content to the top edge of the Row.
 * This is especially noticeable when the description text wraps to multiple lines.
 */
export const TextButtonAndLongDescription: Story = { args: { ...LongDescription.args, trailing: trailing.TextButton } };

/* Stacked Button */
/**
 * The `switchWidth` prop controls whether the trailing slot content appears to the right of the center
 * slot, or below it in a vertical stack. Setting the `switchWidth` prop (to `true`) forces the trailing
 * slot to _always_ stack.
 */
export const StackedButton: Story = { args: { ...Button.args, switchWidth } };
export const StackedButtonAndDescription: Story = { args: { ...ButtonAndDescription.args, switchWidth } };
export const StackedButtonAndLongDescription: Story = { args: { ...ButtonAndLongDescription.args, switchWidth } };

/* Stacked Text Button */
/**
 * The `stack` prop controls whether the trailing slot content appears to the right of the center
 * slot, or below it in a vertical stack. Setting the `stack` prop (to `true`) forces the trailing
 * slot to _always_ stack.
 */
export const StackedTextButton: Story = { args: { ...TextButton.args, switchWidth } };
export const StackedTextButtonAndDescription: Story = { args: { ...TextButtonAndDescription.args, switchWidth } };
export const StackedTextButtonAndLongDescription: Story = { args: { ...TextButtonAndLongDescription.args, switchWidth } };

/* Icon */
/** When rendering a TPL Icon component in the leading slot, we recommend using size={24}. */
export const Icon: Story = { args: { ...LabelOnly.args, leading: leading.Icon } };
export const IconAndDescription: Story = { args: { ...Description.args, leading: leading.Icon } };
export const IconAndLongDescription: Story = { args: { ...LongDescription.args, leading: leading.Icon } };

/* Icon + Button */
export const IconWithButton: Story = { args: { ...Button.args, ...Icon.args } };
export const IconAndDescriptionWithButton: Story = { args: { ...Button.args, ...IconAndDescription.args } };
export const IconAndLongDescriptionWithButton: Story = { args: { ...Button.args, ...IconAndLongDescription.args } };

/* Icon + Stacked Button */
export const IconWithStackedButton: Story = { args: { ...StackedButton.args, ...Icon.args } };
export const IconAndDescriptionWithStackedButton: Story = { args: { ...StackedButton.args, ...IconAndDescription.args } };
export const IconAndLongDescriptionWithStackedButton: Story = { args: { ...StackedButton.args, ...IconAndLongDescription.args } };

/* Icon + Text Button */
export const IconWithTextButton: Story = { args: { ...TextButton.args, ...Icon.args } };
export const IconAndDescriptionWithTextButton: Story = { args: { ...TextButton.args, ...IconAndDescription.args } };
export const IconAndLongDescriptionWithTextButton: Story = { args: { ...TextButton.args, ...IconAndLongDescription.args } };

/* Icon + Stacked Text Button */
export const IconWithStackedTextButton: Story = { args: { ...StackedTextButton.args, ...Icon.args } };
export const IconAndDescriptionWithStackedTextButton: Story = { args: { ...StackedTextButton.args, ...IconAndDescription.args } };
export const IconAndLongDescriptionWithStackedTextButton: Story = { args: { ...StackedTextButton.args, ...IconAndLongDescription.args } };

/* Media */
/** For custom media in the `leading` slot, such as a thumbnail, we recommend a 64×64 graphic. */
export const Media: Story = { args: { ...LabelOnly.args, leading: leading.Media } };
export const MediaAndDescription: Story = { args: { ...Description.args, leading: leading.Media } };
export const MediaAndLongDescription: Story = { args: { ...LongDescription.args, leading: leading.Media } };

/* Media + Button */
export const MediaWithButton: Story = { args: { ...Button.args, ...Media.args } };
export const MediaAndDescriptionWithButton: Story = { args: { ...Button.args, ...MediaAndDescription.args } };
export const MediaAndLongDescriptionWithButton: Story = { args: { ...Button.args, ...MediaAndLongDescription.args } };

/* Media + Stacked Button */
export const MediaWithStackedButton: Story = { args: { ...StackedButton.args, ...Media.args } };
export const MediaAndDescriptionWithStackedButton: Story = { args: { ...StackedButton.args, ...MediaAndDescription.args } };
export const MediaAndLongDescriptionWithStackedButton: Story = { args: { ...StackedButton.args, ...MediaAndLongDescription.args } };

/* Media + Text Button */
export const MediaWithTextButton: Story = { args: { ...TextButton.args, ...Media.args } };
export const MediaAndDescriptionWithTextButton: Story = { args: { ...TextButton.args, ...MediaAndDescription.args } };
export const MediaAndLongDescriptionWithTextButton: Story = { args: { ...TextButton.args, ...MediaAndLongDescription.args } };

/* Media + Stacked Text Button */
export const MediaWithStackedTextButton: Story = { args: { ...StackedTextButton.args, ...Media.args } };
export const MediaAndDescriptionWithStackedTextButton: Story = { args: { ...StackedTextButton.args, ...MediaAndDescription.args } };
export const MediaAndLongDescriptionWithStackedTextButton: Story = { args: { ...StackedTextButton.args, ...MediaAndLongDescription.args } };

/* Nav + Link */
export const NavWithLabelOnly: Story = { args: { nav: true, children: children.navLabel } };
export const NavWithDescription: Story = { args: { nav: true, children: children.navLabelAndDescription } };
export const NavWithLongDescription: Story = { args: { nav: true, children: children.navLabelAndLongDescription } };

/* Nav + Icon */
export const NavWithIcon: Story = { args: { ...NavWithLabelOnly.args, leading: leading.Icon } };
export const NavWithIconAndDescription: Story = { args: { ...NavWithDescription.args, leading: leading.Icon } };
export const NavWithIconAndLongDescription: Story = { args: { ...NavWithLongDescription.args, leading: leading.Icon } };

/* Nav + Media */
export const NavWithMedia: Story = { args: { ...NavWithLabelOnly.args, leading: leading.Media } };
export const NavWithMediaAndDescription: Story = { args: { ...NavWithDescription.args, leading: leading.Media } };
export const NavWithMediaAndLongDescription: Story = { args: { ...NavWithLongDescription.args, leading: leading.Media } };

/* Custom Content */
/** Row supports fully custom content within the center slot (the React-standard `children` prop). */
export const CustomContent: Story = {
  args: {
    children: (
      <Flex bg="tertiary" flexDirection="column" gap={1}>
        <HeadlineNews size={22}>Custom Content</HeadlineNews>
        <Body size={14}>
          This child element is entirely custom and has a background to distinguish it from the surrounding Row component. It inherits Row&rsquo;s text color.
        </Body>
      </Flex>
    ),
  },
};
/**
 * Depending on the height of custom center slot content, you may need to add a style override to
 * _manually_ align all slot content to the top edge. Here we've added `align-items: flex-start` to
 * ensure this custom layout matches the automatic alignment we get when using `<Row.Description>`.
 */
export const CustomContentWithMediaAndButton: Story = {
  args: {
    children: (
      <Flex bg="tertiary" flexDirection="column" gap={1}>
        <HeadlineNews size={22}>Custom Content</HeadlineNews>
        <Body size={14}>
          This child element is entirely custom and has a background to distinguish it from the surrounding Row component. It inherits Row&rsquo;s text color.
        </Body>
      </Flex>
    ),
    leading: leading.Media,
    trailing: trailing.Button,
    style: { alignItems: 'flex-start' },
  },
};

export const NavWithCustomContent: Story = {
  args: {
    children: (
      <Flex bg="tertiary" flexDirection="column" gap={1}>
        <HeadlineNews size={22}>
          <LinkBox.Link subtle href="https://www.nytimes.com" target="_blank" rel="noopener noreferrer">
            Custom Content
          </LinkBox.Link>
        </HeadlineNews>
        <Body size={14}>
          This child element is entirely custom and has a background to distinguish it from the surrounding Row component. It inherits Row&rsquo;s text color.
        </Body>
      </Flex>
    ),
    nav: true,
  },
};
