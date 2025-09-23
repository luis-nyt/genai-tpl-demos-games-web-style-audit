import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { css, cx } from 'pretty-lights';
import { Button, createToastStyleClass, TextButton } from '../index.js';

import { Toast, ToastProps } from './index.js';
import { useToastState } from './useToastState.js';

const centerToastClass = css`
  top: calc(50% - 28px);
`;

const meta = {
  title: 'Toast',
  tags: ['autodocs'],
  component: Toast,
  parameters: {
    layout: 'padded',
    docs: {
      story: {
        inline: false,
        height: '300px',
      },
    },
  },
  render: args => {
    return (
      <div
        style={{
          height: '100px',
          padding: '1rem',
          margin: '1rem',
          position: 'relative',
        }}
      >
        <Toast className={centerToastClass} {...args} />
      </div>
    );
  },
} satisfies Meta<ToastProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Article saved',
    open: true,
  },
};

export const WithLongText: Story = {
  args: {
    children: "We're having trouble with that. Please try again in a few minutes.",
    open: true,
  },
};

export const WithAction: Story = {
  args: {
    children: 'Article saved',
    action: <TextButton height="compact">Undo</TextButton>,
    open: true,
  },
};

export const WithLongTextAndAction: Story = {
  args: {
    children: "We're having trouble with that. Please try again in a few minutes.",
    action: <TextButton height="compact">Go to saved articles</TextButton>,
    open: true,
  },
};

/**
 * Use classes to change the position of your toast on screen.
 */
export const WithPosition: Story = {
  args: {
    children: 'Article saved',
    className: css`
      bottom: 1rem;
    `,
    open: true,
  },
};

export const WithTimerAndDismiss: StoryFn<ToastProps> = args => {
  const { dismissToast, showToast, shown } = useToastState();

  return (
    <div
      style={{
        padding: '4rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative',
      }}
    >
      <Button
        weight="emphasis"
        style={{
          margin: 'auto',
        }}
      >
        Other Element
      </Button>
      <Button
        weight="emphasis"
        onClick={() => showToast(2000)}
        style={{
          margin: 'auto',
        }}
      >
        Save Article
      </Button>
      <Button
        weight="emphasis"
        style={{
          margin: 'auto',
        }}
      >
        Other Element
      </Button>
      <Toast
        {...args}
        className={css`
          bottom: 1rem;
        `}
        open={shown}
        colorBehavior="userInverse"
        action={
          <TextButton onClick={() => dismissToast()} height="compact">
            Dismiss
          </TextButton>
        }
      >
        Article saved
      </Toast>
    </div>
  );
};

/**
 * You can use `createToastStyleClass` to change Toast's internal style values.
 */
export const WithCustomStyleClass: StoryFn<ToastProps> = args => {
  return (
    <div
      style={{
        padding: '5rem',
        position: 'relative',
      }}
    >
      <Toast
        {...args}
        className={cx(
          centerToastClass,
          createToastStyleClass({
            background: 'red',
            cornerRadius: '32rem',
            padding: '1rem 2rem',
            maxWidth: '20rem',
            minHeight: '1.5rem',
            outerPadding: '3rem',
          })
        )}
        action={<TextButton height="compact">Go to reading list</TextButton>}
        open
      >
        Article saved
      </Toast>
    </div>
  );
};

export const WithReducedWidthAndAlwaysDarkColorBehavior: StoryFn<ToastProps> = args => {
  return (
    <div
      style={{
        padding: '5rem 0',
        position: 'relative',
      }}
    >
      <Toast
        {...args}
        className={cx(
          centerToastClass,
          css`
            width: 6rem;
            text-align: center;
          `
        )}
        colorBehavior="alwaysDark"
        open
      >
        Too Short
      </Toast>
    </div>
  );
};
