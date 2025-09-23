import React, { useEffect, useRef, useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import {
  Box,
  Title,
  Button,
  createDialogStyleClass,
  HeadlineNews,
  HeadlineOpinion,
  spaceScale,
  Text,
  TitleKarnak,
  StoryListItemContent,
  HeadlineFeature,
  LinkBox,
  StoryListItem,
  Flex,
} from '../index.js';
import { Dialog, DialogProps } from './Dialog.js';
import { DialogContent } from './DialogContent/index.js';
import * as childrenMapping from './stories/children.js';
import * as mediaMapping from './stories/media.js';
import { continueButtonAction } from './stories/actions.js';
import { useDialogState } from './useDialogState.js';
import { CenteredContainer } from './stories/CenteredContainer.js';
// @ts-expect-error
import bestBooksSquare640 from '../tutorials/intro-to-story-list/images/bestBooksSquare640.jpg';
import { bestBooksAlt, imgStyle } from '../tutorials/intro-to-story-list/content.js';

const meta = {
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  args: {
    children: childrenMapping.Standard,
    media: mediaMapping.FullMoonArtwork,
  },
  argTypes: {
    children: {
      control: 'select',
      options: Object.keys(childrenMapping),
      mapping: childrenMapping,
    },
    media: {
      control: 'select',
      options: Object.keys(mediaMapping),
      mapping: mediaMapping,
    },
  },
  render: args => {
    const { open, setOpen, ref } = useDialogState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <CenteredContainer>
        <Button onClick={() => alert("I'm interactable")}>Other interactable element</Button>
        <Button
          weight="emphasis"
          aria-disabled={open}
          aria-haspopup="dialog"
          ref={buttonRef}
          onClick={() => setOpen(true)}
        >
          Open Dialog
        </Button>
        <Button onClick={() => alert("I'm interactable")}>Other interactable element</Button>
        <Dialog {...args} ref={ref} focusOnClose={buttonRef as React.RefObject<HTMLElement>} />
      </CenteredContainer>
    );
  },
} satisfies Meta<DialogProps>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A dialog with a set media and content.
 */
export const Default: Story = {};

/**
 * 🧪 **Experimental. Expect behavior to change in the future.**
 *
 * Set the `closedBy` prop to `'none'` in dialogs that require a user choice, e.g. for legal
 * reasons. This hides the "X" close button and prevents the user from dismissing the dialog with
 * the Esc key.
 *
 * **Warning:** As of this writing, only Google Chrome has full support for [`closedby`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby).
 * Thus, if your dialog requires a user choice to continue:
 *
 * - Ensure you actually get a response; don't assume the user has made a choice just because the dialog has closed.
 * - Implement some way, user-driven or otherwise, to re-open the dialog.
 */
export const WithRequiredUserChoice: StoryFn<DialogProps> = args => {
  const { open, setOpen, ref } = useDialogState(false);
  const [choice, setChoice] = useState<string | undefined>();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <CenteredContainer>
      <Button onClick={() => alert("I'm interactable")}>Other interactable element</Button>
      <Button
        weight="emphasis"
        aria-disabled={open}
        aria-haspopup="dialog"
        ref={buttonRef}
        onClick={() => setOpen(true)}
      >
        Open Dialog
      </Button>
      <dl>
        <Title as="dt" size={14}>
          Choice:
        </Title>
        <Text as="dd" size={14}>
          {typeof choice === 'string' ? `"${choice}"` : <em>undefined</em>}
        </Text>
      </dl>
      <Button onClick={() => alert("I'm interactable")}>Other interactable element</Button>
      <Dialog
        {...args}
        ref={ref}
        focusOnClose={buttonRef as React.RefObject<HTMLElement>}
        actions={
          <Button
            value="Continue"
            weight="emphasis"
            height="compact"
            onClick={e => {
              setOpen(false);
              setChoice('Continue');
              continueButtonAction(e);
            }}
          >
            Continue
          </Button>
        }
      />
    </CenteredContainer>
  );
};
WithRequiredUserChoice.args = {
  closedBy: 'none',
};
WithRequiredUserChoice.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  actions: {
    table: {
      disable: true,
    },
  },
};

/**
 * A dialog with custom action buttons.
 */
export const TwoActions: StoryFn<DialogProps> = args => {
  const { open, setOpen, ref } = useDialogState(false);
  const [subscribed, setSubscribed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (subscribed) alert('Subscription activated!');
  }, [subscribed]);

  return (
    <Box style={{ position: 'relative' }}>
      <StoryListItem
        mediaPosition="topFullBleed"
        media={
          <img src={bestBooksSquare640} style={{ ...imgStyle, width: '100%' }} alt={bestBooksAlt} />
        }
        style={!subscribed ? { pointerEvents: 'none', filter: 'blur(1.5rem)' } : undefined}
      >
        <StoryListItemContent
          topLabel="Book Review"
          summary="As voted on by 503 book lovers — with a little help from the staff of The New York Times Book Review."
        >
          <HeadlineFeature as="h3" size={28}>
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/interactive/2024/books/best-books-21st-century.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The 100 Best Books of the 21st Century
            </LinkBox.Link>
          </HeadlineFeature>
        </StoryListItemContent>
      </StoryListItem>
      {!subscribed && (
        <Flex
          alignItems="center"
          justifyContent="center"
          style={{ position: 'absolute', inset: 0, margin: 'auto' }}
        >
          <Button
            aria-disabled={open}
            aria-haspopup="dialog"
            ref={buttonRef}
            weight="emphasis"
            onClick={() => setOpen(true)}
          >
            Subscribe to unlock
          </Button>
        </Flex>
      )}
      <Dialog
        {...args}
        ref={ref}
        focusOnClose={buttonRef as React.RefObject<HTMLElement>}
        actions={
          <>
            <Button
              height="compact"
              weight="emphasis"
              onClick={() => {
                setSubscribed(true);
              }}
            >
              Subscribe now
            </Button>
            <Button onClick={() => setOpen(false)} height="compact" value="No thanks">
              No thanks
            </Button>
          </>
        }
      />
    </Box>
  );
};
TwoActions.args = {
  children: childrenMapping.Alert,
  media: undefined,
};

/**
 * A dialog with a set media and content.
 */
export const WithCustomIcon: Story = {
  args: {
    media: mediaMapping.SuperTIcon,
  },
};

/**
 * Basic dialog without any media content.
 */
export const NoMedia: Story = {
  args: {
    media: undefined,
  },
};

/**
 * A dialog with long scrollable content.
 */
export const WithLongContent: Story = {
  args: {
    children: childrenMapping.Long,
  },
};

/**
 * A dialog with non default typography.
 */
export const WithCustomTypography: Story = {
  args: {
    children: (
      <DialogContent
        label={<HeadlineOpinion size={18}>NEW FEATURE</HeadlineOpinion>}
        description={
          <Text size={20}>Stay notified on our reporting of the historic moon landing.</Text>
        }
      >
        <TitleKarnak size={18}>Introducing Apollo 11: Live</TitleKarnak>
      </DialogContent>
    ),
    actions: (
      <Button height="compact" weight="emphasis" onClick={() => alert('opening tab')}>
        <HeadlineNews size={16}>Read more!</HeadlineNews>
      </Button>
    ),
  },
};

export const CustomStyle: Story = {
  args: {
    colorBehavior: 'alwaysDark',
    className: createDialogStyleClass({
      background: 'rgb(11, 132, 255)',
      spacing: spaceScale.get(6),
      padding: '64px',
      cornerRadius: '32px',
      shadowColor: 'rgb(46, 209, 88)',
      shadowRadius: 0,
      shadowX: '8px',
      shadowY: '8px',
    }),
  },
};

/**
 * Note: May have visual issues when closing in some browsers as of this writing.
 */
export const WithTransition: Story = {
  args: {
    transition: true,
  },
};
