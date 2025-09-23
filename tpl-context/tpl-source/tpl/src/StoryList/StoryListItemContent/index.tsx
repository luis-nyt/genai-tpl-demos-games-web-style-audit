import React, { forwardRef, ReactNode, useContext } from 'react';
import { cx } from 'pretty-lights';
import { Body, Headline, Label, Title } from '../../Typography/index.js';
import { rootClass, topLabelClass } from './styled.js';
import { StoryListItemOnMediaContext } from '../StoryListItem/StoryListItemOnMediaContext.js';
import { Flex } from '../../Flex/index.js';
// Import some additional types to help out VSCode with JSDoc @link
// @see https://stackoverflow.com/a/70996553
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  StoryList,
  StoryListItem,
  StoryListMediaPosition,
  StoryListSection,
  storyListOuterPadding,
  storyListStyle,
  createStoryListStyleClass,
} from '../index.js';
import { CommonWithAsProps, dataTplAttr, DataTplValue } from '../../util/index.js';
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Props for the {@link StoryListItemContent} component.
 *
 * @group Story List
 */
export interface StoryListItemContentProps extends CommonWithAsProps {
  /** The required headline or title of the story. */
  children?: ReactNode;
  /** Optional top label or "kicker", which appears above the headline. */
  topLabel?: ReactNode;
  /** Optional summary text describing the story. */
  summary?: ReactNode;
  /** Optional text naming the story’s contributors. */
  byline?: ReactNode;
  /** Optional bottom label, used for metadata such as reading time or publication date. */
  bottomLabel?: ReactNode;
  /** An optional view, e.g. a row of action buttons, rendered below all other text content. */
  inlineActions?: ReactNode;
}

/**
 * A text content lockup with a headline, optional summary, byline, top label and more. Typically
 * used within {@link StoryListItem}.
 *
 * ## Overview
 *
 * Story list item content requires a `children` prop, which corresponds to the headline. It may
 * also include other pieces of text, as described in {@link StoryListItemContentProps}.
 *
 * Each parameter has a default typography token and text color applied to it. You can easily
 * override these by passing in your own React element:
 *
 * @example
 * ```tsx
 * <TPLStoryListItemContent>
 *   <HeadlineFeature as="h2" size={28}>
 *     The 100 Best Books of the 21st Century
 *   </HeadlineFeature>
 * </TPLStoryListItemContent>
 * ```
 *
 * ### Inline Actions
 *
 * Use the `inlineActions` parameter to add actions buttons or other views to a story list item.
 *
 * Rendering actions as part of the content lockup ensures the buttons, etc. are always positioned
 * below the text content.
 *
 * If your actions always need to be below both the text _and_ media content, use
 * {@link StoryListItem}’s {@link StoryListItemProps.actions} parameter instead.
 *
 * ### Styling
 *
 * Use the {@link createStoryListStyleClass} function to customize story list item content’s inner
 * spacing between text, alignment and more.
 *
 * ## See Also
 *
 * - [Intro to TPL Story List](https://tpl.nyt.net/?path=/docs/tutorials-intro-to-story-list-section-1-create-a-story-list--docs)
 * - [Times Product Language: Story List](https://coda.io/d/_dH9ZFEaJR9I/Story-List_suoUNY5D)
 * - {@link StoryList}
 * - {@link StoryListItem}
 * - {@link StoryListMediaPosition}
 * - {@link StoryListSection}
 * - {@link storyListOuterPadding}
 * - {@link storyListStyle}
 * - {@link createStoryListStyleClass}
 *
 * @group Story List
 */
export const StoryListItemContent = forwardRef<HTMLDivElement, StoryListItemContentProps>(
  (
    { children, className, topLabel, summary, byline, bottomLabel, inlineActions, ...rest },
    ref
  ) => {
    const onMedia = useContext(StoryListItemOnMediaContext);

    return (
      <Flex
        ref={ref}
        flexDirection="column"
        className={cx(className, rootClass)}
        {...{ [dataTplAttr]: DataTplValue.StoryListItemContent, ...rest }}
      >
        {topLabel && (
          <Label as="div" variant="Regular" className={topLabelClass} color="primary">
            {topLabel}
          </Label>
        )}
        <Headline as="div" size={18} color="primary">
          {children}
        </Headline>
        {summary && (
          <Body as="div" size={16} color={onMedia ? 'primary' : 'secondary'}>
            {summary}
          </Body>
        )}
        {byline && (
          <Title as="div" size={14} color="primary">
            {byline}
          </Title>
        )}
        {bottomLabel && (
          <Label as="div" variant="Regular" color={onMedia ? 'primary' : 'secondary'}>
            {bottomLabel}
          </Label>
        )}
        {inlineActions}
      </Flex>
    );
  }
);
