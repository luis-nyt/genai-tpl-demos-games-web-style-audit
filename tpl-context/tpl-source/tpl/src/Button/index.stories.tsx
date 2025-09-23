import React, { ReactNode, useEffect, useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import {
  Box,
  Button,
  ButtonProps,
  CaretLeftIcon,
  CaretRightIcon,
  Flex,
  PlusIcon,
  Text,
  color,
  spaceScale,
} from '../index.js';
import { buttonArgTypes } from '../stories/argTypes.js';
import { createRender } from '../stories/createRender.js';

const meta = {
  title: 'Buttons/Button',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    // layout: 'centered',
  },
  args: {
    children: 'Great button',
  },
  argTypes: {
    ...buttonArgTypes,
    height: {
      control: 'select',
      options: ['standard', 'compact'],
      defaultValue: 'standard',
    },
    weight: {
      control: { type: 'select' },
      options: ['standard', 'emphasis'],
      defaultValue: 'standard',
    },
  },
  // @ts-expect-error
  render: createRender(Button),
} satisfies Meta<ButtonProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const EmphasisDisabled: Story = { args: { weight: 'emphasis', 'aria-disabled': true } };
export const EmphasisIconLeading: Story = {
  args: { weight: 'emphasis', icon: PlusIcon, style: { flexDirection: 'row-reverse' } },
};
export const EmphasisIconTrailing: Story = {
  args: { weight: 'emphasis', icon: PlusIcon },
  name: 'Emphasis Icon Trailing (Preferred)',
};
export const EmphasisProcessing: Story = { args: { weight: 'emphasis', processing: true } };
export const EmphasisWithCompactHeight: Story = { args: { weight: 'emphasis', height: 'compact' } };
export const EmphasisWithLinkToNewWindow: Story = {
  args: {
    weight: 'emphasis',
    href: 'https://www.nytimes.com',
    target: '_blank',
    rel: 'noreferrer noopener',
  },
};

export const Standard: Story = { args: { weight: 'standard' } };
export const StandardDisabled: Story = { args: { weight: 'standard', 'aria-disabled': true } };
export const StandardIconLeading: Story = {
  args: { weight: 'standard', icon: PlusIcon, style: { flexDirection: 'row-reverse' } },
};
export const StandardIconTrailing: Story = {
  args: { weight: 'standard', icon: PlusIcon },
  name: 'Standard Icon Trailing (Preferred)',
};
export const StandardProcessing: Story = { args: { weight: 'standard', processing: true } };
export const StandardWithCompactHeight: Story = { args: { weight: 'standard', height: 'compact' } };

/**
 * Use [CSS Flexible Box Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout), or the `Flex` [component](https://foundation.nyt.net/?path=/docs/layout-flex--basic) to achieve [alignment](https://coda.io/d/Times-Product-Language-TPL_dH9ZFEaJR9I/Buttons_suquf#_luiFF).
 *
 * Here, we demonstrate setting `Button`'s `width` and using flexbox layout on a parent element to
 * make it fill a wider space.
 */
export const RecipeLayout: StoryFn<typeof meta> = args => (
  <Box p={1}>
    <Flex justifyContent="end" mb={2} gap={2}>
      <Button {...args}>Cancel</Button>
      <Button {...args} weight="emphasis">
        Next
      </Button>
    </Flex>
    <Flex justifyContent="center">
      <Button {...args} weight="emphasis" sx={{ maxWidth: ['100%', '200px'] }}>
        Get Started
      </Button>
    </Flex>
    <Box width="18rem">
      <Button
        {...args}
        weight="emphasis"
        sx={{ maxWidth: '100%', display: 'flex', marginBottom: 1, marginTop: 1 }}
      >
        Confirm changes
      </Button>
      <Button {...args} sx={{ maxWidth: '100%', display: 'flex' }}>
        Discard changes
      </Button>
    </Box>
  </Box>
);

/**
 * The `processing` prop announces to screen readers when the Button changes state.
 */
export const RecipeProcessing: StoryFn<Omit<ButtonProps, 'onClick' | 'processing'>> = args => {
  type Status = 'normal' | 'success' | 'failure';

  const statusText: Record<Status, string> = {
    normal: 'This action has a 50% chance of failing.',
    success: 'Successfully signed up.',
    failure: 'A server error has occurred.',
  };

  const statusColor: Record<Status, keyof typeof color.content> = {
    normal: 'secondary',
    success: 'positive',
    failure: 'negative',
  };

  const [status, setStatus] = useState<Status>('normal');
  const [processing, setProcessing] = useState<string | boolean>(false);

  useEffect(() => {
    if (processing) {
      setTimeout(() => {
        setProcessing(false);
        setStatus(Math.random() < 0.5 ? 'success' : 'failure');
      }, 2000);
    }
  }, [processing]);

  const onClick = e => {
    e.preventDefault();
    setStatus('normal');
    setProcessing('Adding to cart...');
  };

  return (
    <Flex flexDirection="column" alignItems="flex-start" width="280px" p={1} gap={1}>
      {/* @ts-expect-error */}
      <Button {...args} onClick={onClick} processing={processing} />
      <Text
        size={14}
        aria-atomic
        aria-live={processing ? undefined : 'assertive'}
        color={statusColor[status]}
      >
        {statusText[status]}
      </Text>
    </Flex>
  );
};
RecipeProcessing.args = {
  icon: PlusIcon,
  children: 'Sign up',
  weight: 'emphasis',
};

/**
 * Button's `max-width` is set to `fit-content` by default. You can override this with the `sx`
 * prop, either with a single value or an array of responsive values. Here we use `max-width: 100%`
 * to have the Button fill the width of the layout.
 */
export const RecipeMaxWidth100Percent: Story = {
  args: {
    children: 'Listen to the podcast',
    sx: { maxWidth: '100%' },
  },
};
RecipeMaxWidth100Percent.storyName = 'Recipe max-width: 100%';
export const RecipeAVsButtonComparison = (args: ButtonProps) => (
  <Box p={1} pb={4}>
    {/* @ts-expect-error */}
    <Button {...args} href="https://www.nytimes.com" target="_blank" rel="noreferrer noopener" />
    <div style={{ height: spaceScale.get(1) }} />
    {/* @ts-expect-error */}
    <Button {...args} />
  </Box>
);
RecipeAVsButtonComparison.args = {
  children: 'Learn more',
};

// TODO: Make a general-purpose VQAGrid for all Button components

type ButtonRowProps = ButtonProps & {
  Component: (props: ButtonProps) => ReactNode;
};

const ButtonRow = ({ Component, ...props }: ButtonRowProps) => (
  <Flex flexDirection="row" gap={2}>
    <Component {...props} />
    <Component {...props} icon={CaretRightIcon} />
    <Component {...props} icon={CaretLeftIcon} style={{ flexDirection: 'row-reverse' }} />
  </Flex>
);

const ButtonColumn = (args: ButtonRowProps) => (
  <Flex flexDirection="column" gap={2}>
    <ButtonRow {...args} />
    <ButtonRow {...args} aria-disabled />
    <ButtonRow {...args} processing />
    <Text size={12} color="secondary">
      Weight: {args.weight ?? 'standard'}, Height: {args.height ?? 'standard'}
    </Text>
  </Flex>
);

export const VQAGrid: StoryFn<ButtonRowProps> = args => (
  <Flex flexDirection="row" flexWrap="wrap" gap={4} p={4}>
    <ButtonColumn {...args} />
    <ButtonColumn {...args} height="compact" />
    <ButtonColumn {...args} weight="emphasis" />
    <ButtonColumn {...args} weight="emphasis" height="compact" />
  </Flex>
);
VQAGrid.args = {
  // @ts-expect-error
  Component: Button,
  children: 'Button',
};
