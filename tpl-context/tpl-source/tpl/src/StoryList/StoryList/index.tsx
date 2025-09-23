import React, { forwardRef } from 'react';
import { useColorBehaviorContext } from '@nyt/foundation';
import { Flex } from '../../Flex/index.js';
import type { HRuleProps } from '../../Rule/index.js';
import { StoryListDividersContext } from './StoryListDividersContext.js';
import { StoryListDividedLayout } from '../StoryListDividedLayout/index.js';
import { StoryListSection } from '../StoryListSection/index.js';
// Import some additional types to help out VSCode with JSDoc @link
// @see https://stackoverflow.com/a/70996553
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  StoryListItem,
  StoryListItemContent,
  StoryListMediaPosition,
  storyListOuterPadding,
  storyListStyle,
  createStoryListStyleClass,
} from '../index.js';
import { CommonWithAsProps, dataTplAttr, DataTplValue } from '../../util/index.js';
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Props for the {@link StoryList} component.
 *
 * @group Story List
 */
export interface StoryListProps extends CommonWithAsProps {
  /** The divider (or rule) between sections in {@link StoryList}. Setting to `undefined` disables section dividers. */
  sectionDivider?: HRuleProps['variant'] | undefined;
  /** The divider (or rule) between {@link StoryListItem}s.  Setting to `undefined` disables item dividers. */
  itemDivider?: HRuleProps['variant'] | undefined;
}

/**
 * A collection view used to create lists of `StoryListItem`s.
 *
 * ## Overview
 *
 * Story lists are made up of multiple composed views that work together:
 * - **Collection:** `StoryList`
 * - **Item:** {@link StoryListItem}
 * - **Item Content:** {@link StoryListItemContent}
 * - **Sections:** {@link StoryListSection}
 *
 * See [Intro to TPL Story List](https://tpl.nyt.net/?path=/docs/tutorials-intro-to-story-list-section-1-create-a-story-list--docs) for a full demonstration of story list and its related views.
 *
 * ### Styling
 *
 * Story list automatically inserts dividers between items and sections. Use `StoryList`’s props,
 * such as {@link StoryListProps#itemDivider} and {@link StoryListProps#sectionDivider}, and
 * the {@link createStoryListStyleClass} function to customize its look.
 *
 * ## See Also
 *
 * - [Intro to TPL Story List](https://tpl.nyt.net/?path=/docs/tutorials-intro-to-story-list-section-1-create-a-story-list--docs)
 * - [Times Product Language: Story List](https://coda.io/d/_dH9ZFEaJR9I/Story-List_suoUNY5D)
 * - {@link StoryListItem}
 * - {@link StoryListItemContent}
 * - {@link StoryListMediaPosition}
 * - {@link StoryListSection}
 * - {@link storyListOuterPadding}
 * - {@link storyListStyle}
 * - {@link createStoryListStyleClass}
 *
 * @group Story List
 */
export const StoryList = forwardRef<HTMLDivElement, StoryListProps>(
  (
    {
      children,
      colorBehavior: colorBehaviorProp,
      itemDivider = 'tertiary',
      sectionDivider = 'primary',
      ...rest
    },
    ref
  ) => {
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;

    return (
      <Flex
        ref={ref}
        colorBehavior={colorBehavior}
        flexDirection="column"
        {...{ [dataTplAttr]: DataTplValue.StoryList, ...rest }}
      >
        <StoryListDividersContext.Provider value={{ itemDivider, sectionDivider }}>
          <StoryListDividedLayout sectionComponent={StoryListSection}>
            {children}
          </StoryListDividedLayout>
        </StoryListDividersContext.Provider>
      </Flex>
    );
  }
);
