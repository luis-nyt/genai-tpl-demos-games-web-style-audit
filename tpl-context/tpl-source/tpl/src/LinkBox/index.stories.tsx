import React, { ReactNode } from 'react';
import { css } from 'pretty-lights';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  LinkBox,
  Typography,
  Button,
  color,
  HomeIcon,
  ButtonProps,
  Link,
  IconButton,
  StoryListItem,
  StoryListItemContent,
  HeadlineNews,
  PlayIcon,
  HeadlineOpinion,
} from '../index.js';
import { LinkBoxLinkProps } from './LinkBoxLink.js';
import { SectionTextCarousel } from '../StoryList/stories/SectionTextCarousel/index.js';

const meta = {
  title: 'LinkBox',
  /** We're documenting LinkBox, but writing stories with `LinkBox.Link`'s props */
  component: LinkBox,
  tags: ['autodocs'],
  args: {
    href: 'https://nytimes.com',
    children: 'Click me',
  },
  parameters: {
    controls: {
      include: ['children', 'href'],
    },
    layout: 'centered',
  },
} satisfies Meta<LinkBoxLinkProps>;

export default meta;

const basicLinkClass = css({
  color: 'inherit',
  textDecoration: 'underline',
  '&:hover': {
    color: color.content.secondary,
  },
});

type Story = StoryFn<LinkBoxLinkProps>;

/**
 * Basic implementation of LinkBox. `className` can be overridden with styles from your project.
 */
export const Default: Story = args => (
  <LinkBox maxWidth="16em">
    <Typography variant="Title/20">
      <LinkBox.Link {...args} className={basicLinkClass} />
    </Typography>
    <Typography variant="Body/18">This text becomes clickable</Typography>
  </LinkBox>
);

Default.args = {
  children: 'This text acts as the link',
};

/**
 * The Component prop on `LinkBox.Link` will allow you to swap out the generic
 * `LinkBox.Link` link with your own custom component. For this example, we're using `Button`,
 *  but you can use any component.
 */
export const WithACustomComponent: Story = args => (
  <LinkBox maxWidth="16em">
    <Typography variant="Title/20">This text becomes clickable</Typography>
    <Typography variant="Body/18">This text becomes clickable</Typography>
    <LinkBox.Link {...args} as={Button as (props: ButtonProps) => ReactNode} />
  </LinkBox>
);

/**
 * `LinkBox.Link` passes its own props thru to your custom component. It will also type-check these
 * additional props to ensure they are valid according to the custom component's type definitions.
 *
 * Here we render a TPL Button and pass it additional `height`, `icon`, `target` and `weight` props.
 */
export const WithCustomPropsPassedToTheCustomComponent: Story = () => (
  <LinkBox maxWidth="16em">
    <Typography variant="Title/20">This text becomes clickable</Typography>
    <Typography variant="Body/18">This text becomes clickable</Typography>
    <LinkBox.Link
      href="https://nytimes.com"
      as={Button as (props: ButtonProps) => ReactNode}
      height="compact"
      icon={HomeIcon}
      target="_blank"
      weight="emphasis"
    >
      Click me
    </LinkBox.Link>
  </LinkBox>
);

interface NonLinkComponentProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const NonLinkComponent = (props: NonLinkComponentProps) => <button type="button" {...props} />;

export const WithANonLinkComponent: StoryFn<NonLinkComponentProps> = ({ children, onClick }) => (
  <LinkBox maxWidth="16em">
    <Typography variant="Title/20">This text becomes clickable</Typography>
    <Typography variant="Body/18">This text becomes clickable</Typography>
    <LinkBox.Link as={NonLinkComponent} onClick={onClick}>
      {children}
    </LinkBox.Link>
  </LinkBox>
);
WithANonLinkComponent.args = {
  children: 'Click me',
  // TODO: Figure out why I couldn't get Storybook Actions to work? Sigh
  onClick: () => {
    window.alert('Clicked!');
  },
};

/**
 * Other Links should be set outside `LinkBox.Link` and can be clicked as normal without conflicting with the extended Link clickable area.
 */
export const WithSecondaryLinks: Story = args => (
  <LinkBox maxWidth="16em">
    <Typography variant="Title/20">
      <LinkBox.Link {...args} className={basicLinkClass} />
    </Typography>
    <Typography variant="Body/18">
      This text contains{' '}
      <a href="https://nytimes.com/opinion" className={basicLinkClass}>
        another link
      </a>{' '}
      which is also clickable
    </Typography>
  </LinkBox>
);
WithSecondaryLinks.args = {
  children: 'This text becomes clickable',
};

/**
 * Other Links should be set outside `LinkBox.Link` and can be clicked as normal without conflicting with the extended Link clickable area.
 */
export const WithSecondaryPrecedingLinks: Story = args => (
  <LinkBox maxWidth="16em">
    <Typography variant="Label/Regular">
      <Link href="https://nytimes.com/opinion">Opinion</Link>
    </Typography>
    <Typography variant="Title/20">
      <LinkBox.Link {...args} className={basicLinkClass} />
    </Typography>
    <Typography variant="Body/18">
      This text contains{' '}
      <a href="https://nytimes.com/opinion" className={basicLinkClass}>
        another link
      </a>{' '}
      which is also clickable
    </Typography>
  </LinkBox>
);
WithSecondaryPrecedingLinks.args = {
  children: 'This text becomes clickable',
};

/**
 * **Don't render interactive media within a LinkBox.** The LinkBox Link's `::before`
 * pseudo-element may cover up and **block interaction** with the interactive.
 */
export const WithInteractiveMediaAndAbsolutelyPositionedChildTabbables: StoryFn = () => (
  <LinkBox maxWidth="16em">
    <StoryListItem
      mediaPosition="top"
      media={
        <div style={{ position: 'relative' }}>
          <SectionTextCarousel>
            {Array.from({ length: 6 }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <StoryListItem key={i}>
                <StoryListItemContent
                  topLabel="Top Label"
                  summary="The biggest most powerful and impactful story of our time"
                  bottomLabel="Bottom Label"
                >
                  <HeadlineOpinion size={20} as="h1">
                    Basic story list headline
                  </HeadlineOpinion>
                </StoryListItemContent>
              </StoryListItem>
            ))}
          </SectionTextCarousel>
          <IconButton
            icon={PlayIcon}
            className={css({ position: 'absolute', bottom: 0, right: 0 })}
            onClick={action('Clicked: Menu Button')}
          />
        </div>
      }
    >
      <StoryListItemContent
        style={{ maxWidth: '460px' }}
        topLabel={
          <Link subtle href="https://www.nytimes.com/spotlight/the-great-read">
            The Great Read
          </Link>
        }
        summary="This is how Mongolia provides basic medical services to its far-flung, semi-nomadic populations."
      >
        <HeadlineNews as="h1" size={32} color="negative">
          <LinkBox.Link
            subtle
            href="https://www.nytimes.com/card/2024/08/09/world/asia/mongolia-herders"
          >
            Demonstration Only. Don’t Do This!!!
          </LinkBox.Link>
        </HeadlineNews>
      </StoryListItemContent>
    </StoryListItem>
  </LinkBox>
);

/**
 * Instead, render the LinkBox around the adjoining text content only, so that the LinkBox Link's
 * `::before` pseudo-element no longer covers up the interactive media.
 */
export const WithInteractiveMediaAndLinkBoxAroundTextContentOnly: StoryFn = () => (
  <div style={{ maxWidth: '16em' }}>
    <StoryListItem
      mediaPosition="top"
      media={
        <div style={{ position: 'relative' }}>
          <SectionTextCarousel>
            {Array.from({ length: 6 }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <StoryListItem key={i}>
                <StoryListItemContent
                  topLabel="Top Label"
                  summary="The biggest most powerful and impactful story of our time"
                  bottomLabel="Bottom Label"
                >
                  <HeadlineOpinion size={20} as="h1">
                    Basic story list headline
                  </HeadlineOpinion>
                </StoryListItemContent>
              </StoryListItem>
            ))}
          </SectionTextCarousel>
          <IconButton
            icon={PlayIcon}
            className={css({ position: 'absolute', bottom: 0, right: 0 })}
            onClick={action('Clicked: Menu Button')}
          />
        </div>
      }
    >
      <LinkBox>
        <StoryListItemContent
          style={{ maxWidth: '460px' }}
          topLabel={
            <Link subtle href="https://www.nytimes.com/spotlight/the-great-read">
              The Great Read
            </Link>
          }
          summary="This is how Mongolia provides basic medical services to its far-flung, semi-nomadic populations."
        >
          <HeadlineNews as="h1" size={32}>
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/card/2024/08/09/world/asia/mongolia-herders"
            >
              Making House Calls to Mongolia’s Herders
            </LinkBox.Link>
          </HeadlineNews>
        </StoryListItemContent>
      </LinkBox>
    </StoryListItem>
  </div>
);
