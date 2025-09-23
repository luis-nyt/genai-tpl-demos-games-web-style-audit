import React, { forwardRef, type ReactNode } from 'react';
import { Flex } from '../../Flex/index.js';
import { CommonWithAsProps, dataTplAttr, DataTplValue } from '../../util/index.js';
import { StoryListHeader } from '../StoryListHeader/index.js';
import { StoryListDividedLayout } from '../StoryListDividedLayout/index.js';
// Import some additional types to help out VSCode with JSDoc @link
// @see https://stackoverflow.com/a/70996553
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  StoryList,
  StoryListItem,
  StoryListItemContent,
  StoryListMediaPosition,
  storyListOuterPadding,
  storyListStyle,
  createStoryListStyleClass,
} from '../index.js';
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Props for the {@link StoryListSection} component.
 *
 * @group Story List
 */
export interface StoryListSectionProps extends CommonWithAsProps {
  /** The section’s content. */
  children?: ReactNode;
  /** An optional text string or React element to use as the section’s header. */
  header?: ReactNode | string;
}

/**
 * A container component that you can use to create groupings within {@link StoryList}.
 *
 * Use `StoryListSection` to visually separate one or more {@link StoryListItem}s in a
 * {@link StoryList} into separate sections.
 *
 * Each section is rendered with a horizontal rule above its contents. When following other items,
 * it also adds extra spacing between itself and the preceding content.
 *
 * You may also add optional `header` text to the section:
 *
 * @example
 * ```tsx
 * <StoryListSection header="The Latest">
 *   <StoryListItem>
 *     <StoryListItemContent>
 *       How the Impressionists Became the World’s Favorite Painters
 *     </StoryListItemContent>
 *   </StoryListItem>
 *   <StoryListItem>
 *     <StoryListItemContent>
 *       The Last Flight of the Dog Pilot
 *     </StoryListItemContent>
 *   </StoryListItem>
 * </StoryListSection>
 * ```
 *
 * ### Styling
 *
 * Customize the section’s horizontal rule via {@link StoryList}’s {@link StoryListProps#sectionDivider}
 * prop and the spacing between sections with {@link createStoryListStyleClass} and the
 * {@link StoryListStyle#sectionMarginTop} property.
 *
 * ## See Also
 *
 * - {@link StoryListProps#sectionDivider}
 * - {@link StoryListStyle#sectionMarginTop}
 * - {@link StoryListStyle#sectionHeaderPaddingTop}
 * - {@link StoryListStyle#sectionHeaderPaddingBottom}
 *
 * - [Intro to TPL Story List](https://tpl.nyt.net/?path=/docs/tutorials-intro-to-story-list-section-1-create-a-story-list--docs)
 * - [Times Product Language: Story List](https://coda.io/d/_dH9ZFEaJR9I/Story-List_suoUNY5D)
 * - {@link StoryList}
 * - {@link StoryListItem}
 * - {@link StoryListItemContent}
 * - {@link StoryListMediaPosition}
 * - {@link storyListOuterPadding}
 * - {@link storyListStyle}
 * - {@link createStoryListStyleClass}
 *
 * @group Story List
 */
export const StoryListSection = forwardRef<HTMLDivElement, StoryListSectionProps>(
  ({ children, header, ...rest }, ref) => (
    <Flex
      ref={ref}
      flexDirection="column"
      {...{ [dataTplAttr]: DataTplValue.StoryListSection, ...rest }}
    >
      {header && <StoryListHeader>{header}</StoryListHeader>}
      <StoryListDividedLayout sectionComponent={StoryListSection}>
        {children}
      </StoryListDividedLayout>
    </Flex>
  )
);
