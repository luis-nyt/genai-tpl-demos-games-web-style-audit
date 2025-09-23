import { createContext } from 'react';

/**
 * The position of a story list item's media view, relative to its text content. Note that some
 * positions also have a `*FullBleed` variation.
 *
 * | Value                                 | Description                                                                              |
 * | ------------------------------------- | ---------------------------------------------------------------------------------------- |
 * | `'top'` or `'topFullBleed'`           | Media appears _above_ text content, full bleed optional.                                 |
 * | `'bottom'` or `'bottomFullBleed'`     | Media appears _below_ text content, full bleed optional.                                 |
 * | `'leading'` or `'leadingFullBleed'`   | Media appears _before_ text content in a side-by-side layout, full bleed optional.       |
 * | `'trailing'` or `'trailingFullBleed'` | Media appears _after_ text content in a side-by-side layout, full bleed optional.        |
 * | `'posterTop'`                         | Text content is overlaid along the top edge of the media, which is always full bleed.    |
 * | `'posterBottom'`                      | Text content is overlaid along the bottom edge of the media, which is always full bleed. |
 *
 * @see {@link StoryListMediaPositionContext}
 *
 * @group Story List
 */
export type StoryListMediaPosition =
  | 'top'
  | 'topFullBleed'
  | 'bottom'
  | 'bottomFullBleed'
  | 'leading'
  | 'leadingFullBleed'
  | 'trailing'
  | 'trailingFullBleed'
  | 'posterTop'
  | 'posterBottom';

/**
 * A React context that sets the default story list media position for all {@link StoryListItem}s
 * within a view hierarchy.
 *
 * @example
 * ```tsx
 * <StoryListMediaPositionContext.Provider value="leading">
 *   // ...
 * </StoryListMediaPositionContext.Provider>
 * ```
 *
 * @see {@link StoryListMediaPosition}
 *
 * @group Story List
 */
export const StoryListMediaPositionContext = createContext<StoryListMediaPosition>('trailing');
