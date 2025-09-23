import React, { forwardRef, ReactNode, useContext } from 'react';
import { cx } from 'pretty-lights';
import { ColorBehaviorContext, useColorBehaviorContext } from '@nyt/foundation';
import { Property } from 'csstype';
import { useTplSxProp } from '../../system/index.js';
import { CommonProps, dataTplAttr, DataTplValue } from '../../util/index.js';
import {
  StoryListMediaPosition,
  StoryListMediaPositionContext,
} from '../StoryListMediaPositionContext.js';
import {
  contentLockupClass,
  contentMediaStackClass,
  innerBodyClass,
  innerBodyWithPosterClass,
  mediaWrapperClass,
  posterBottomOverlayClass,
  posterOverlayGradientClass,
  posterTopOverlayClass,
} from './styled.js';
import colorBehaviorStyles from './colorBehaviorStyles.js';
import { StoryListItemOnMediaContext } from './StoryListItemOnMediaContext.js';
import { storyListOuterPadding, StoryListOuterPaddingOptions } from '../storyListOuterPadding.js';
// Import some additional types to help out VSCode with JSDoc @link
// @see https://stackoverflow.com/a/70996553
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  StoryList,
  StoryListItemContent,
  StoryListSection,
  storyListStyle,
  createStoryListStyleClass,
} from '../index.js';

/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Props for the {@link StoryListItem} component.
 *
 * @group Story List
 */
export interface StoryListItemProps extends CommonProps {
  /**
   * The position of the media content relative to the text content.
   * Note that some positions include a `FullBleed` variant.
   */
  mediaPosition?: StoryListMediaPosition;
  /**
   * Optional image or other visual content associated with the story. Resize the media view
   * appropriately to achieve the desired dimensions or aspect ratio.
   */
  media?: ReactNode;
  /** An optional view, e.g. a row of action buttons, typically rendered below media and text content. */
  actions?: ReactNode;
}

const useDerivedMediaPosition = ({
  mediaPosition,
}: Pick<StoryListItemProps, 'mediaPosition'>): StoryListMediaPosition => {
  const mediaPositionContext = useContext(StoryListMediaPositionContext);
  return mediaPosition ?? mediaPositionContext;
};

const useMediaFullBleedEdges = ({
  mediaPosition,
}: Pick<StoryListItemProps, 'mediaPosition'>): StoryListOuterPaddingOptions['edges'] => {
  const derivedMediaPosition = useDerivedMediaPosition({ mediaPosition });

  switch (derivedMediaPosition) {
    case 'topFullBleed':
      return ['top', 'right', 'left'];
    case 'bottomFullBleed':
      return ['right', 'bottom', 'left'];
    case 'leadingFullBleed':
      return ['top', 'bottom', 'left'];
    case 'trailingFullBleed':
      return ['top', 'right', 'bottom'];
    case 'posterTop':
    case 'posterBottom':
      return ['top', 'right', 'bottom', 'left'];
    default:
      return [];
  }
};

/**
 * A view representing a single story list item within a {@link StoryList} or {@link StoryListSection}.
 *
 * Use `StoryListItem` to show a single story’s promotional text content, along with optional media and optional action buttons.
 *
 * The `children` prop accepts any view to be laid out along with the optional `media` and `actions` props. Use
 * {@link StoryListItemContent} to render story list’s recommended text content lockup:
 *
 * @example
 * ```tsx
 * <StoryListItem>
 *   <StoryListItemContent topLabel="Book Review">
 *     The 100 Best Books of the 21st Century
 *   </StoryListItemContent>
 * </StoryListItem>
 * ```
 *
 * ### Media and Positioning
 *
 * In addition to text content, story list item supports optional `media`, such as an image, with a number of available
 * {@link StoryListItemProps.mediaPosition} options. Most offer full bleed support as well, e.g. `'topFullBleed'`.
 *
 * Story list item has no explicit opinion about media sizing. Thus, for `'leading'` or
 * `'trailing'` media, you may need to add a `width` to achieve the desired thumbnail size:
 *
 * @example
 * ```tsx
 * <StoryListItem media={<img alt="" src="./bestBooksSquare640.jpg" width="95px" />}>
 *   <StoryListItemContent topLabel="Book Review">
 *     The 100 Best Books of the 21st Century
 *   </StoryListItemContent>
 * </StoryListItem>
 * ```
 *
 * ### Context Based Media Positioning
 *
 * You can also _omit_ the `mediaPosition` prop and use {@link StoryListMediaPositionContext}
 * to set the media position for one or more story list items:
 *
 * @example
 * ```tsx
 * // Use "leading" media positioning for both story list items below
 * <StoryListMediaPositionContext.Provider value="leading">
 *   <StoryList>
 *     <StoryListItem media={<img src="./impressionistsSquare640.jpg" width="95" />}>
 *       <StoryListItemContent>
 *         How the Impressionists Became the World’s Favorite Painters
 *       </StoryListItemContent>
 *     </StoryListItem>
 *     <StoryListItem media={<img src="./dogPilotSquare640.jpg" width="95" />}>
 *       <StoryListItemContent>
 *         The Last Flight of the Dog Pilot
 *       </StoryListItemContent>
 *     </StoryListItem>
 *   </StoryList>
 * </StoryListMediaPositionContext.Provider>
 * ```
 *
 * ### Actions
 *
 * The `actions` prop can be used to add a row of action buttons or other views.
 *
 * Actions generally appear below the text _and_ media content. However, when using the
 * `'posterTop'` and `'posterBottom'` media positions, actions appear below the text content and
 * _on top of_ the media.
 *
 * For `'leading'` or `'trailing'` media that is taller than the text content, you may see a large
 * vertical gap between the text content and actions. Use `StoryListItemContent`’s {@link StoryListItemContentProps#inlineActions}
 * if you prefer to always render actions nearby the text content.
 *
 * ### Styling
 *
 * Use the {@link createStoryListStyleClass} function to customize story list item’s outer padding, alignment and more.
 *
 * ## See Also
 *
 * - [Intro to TPL Story List](https://tpl.nyt.net/?path=/docs/tutorials-intro-to-story-list-section-1-create-a-story-list--docs)
 * - [Times Product Language: Story List](https://coda.io/d/_dH9ZFEaJR9I/Story-List_suoUNY5D)
 * - {@link StoryList}
 * - {@link StoryListItemContent}
 * - {@link StoryListMediaPosition}
 * - {@link StoryListSection}
 * - {@link storyListOuterPadding}
 * - {@link storyListStyle}
 * - {@link createStoryListStyleClass}
 *
 * @group Story List
 */
export const StoryListItem = forwardRef<HTMLDivElement, StoryListItemProps>(
  (
    {
      className,
      colorBehavior: colorBehaviorProp,
      mediaPosition,
      media,
      children,
      actions,
      sx,
      ...rest
    },
    ref
  ) => {
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;
    const systemClass = useTplSxProp(sx);
    const mediaFullBleedEdges = useMediaFullBleedEdges({ mediaPosition });

    const derivedMediaPosition = useDerivedMediaPosition({ mediaPosition });

    let contentMediaStackFlexDirection: Property.FlexDirection;
    // eslint-disable-next-line default-case
    switch (derivedMediaPosition) {
      case 'leading':
      case 'leadingFullBleed':
        contentMediaStackFlexDirection = 'row';
        break;
      case 'trailing':
      case 'trailingFullBleed':
        contentMediaStackFlexDirection = 'row-reverse';
        break;
      case 'top':
      case 'topFullBleed':
      case 'posterTop':
      case 'posterBottom':
        contentMediaStackFlexDirection = 'column';
        break;
      case 'bottom':
      case 'bottomFullBleed':
        contentMediaStackFlexDirection = 'column-reverse';
        break;
    }

    const isPoster =
      derivedMediaPosition === 'posterTop' || derivedMediaPosition === 'posterBottom';

    // We always render `contentLockup`, but in posters, it's nested and no longer the root element
    const contentLockup = (
      <div
        ref={isPoster ? undefined : ref}
        className={
          isPoster
            ? contentLockupClass
            : // Apply additional classes since this is the root element in non-poster mode
              cx(
                contentLockupClass,
                colorBehaviorStyles[colorBehavior],
                { [innerBodyWithPosterClass]: isPoster },
                className,
                systemClass
              )
        }
        {
          // Spread other props since this is the root element in non-poster mode
          ...(isPoster ? {} : { ...rest, [dataTplAttr]: DataTplValue.StoryListItem })
        }
      >
        <div
          className={contentMediaStackClass}
          style={{ flexDirection: contentMediaStackFlexDirection }}
        >
          {!isPoster && media && (
            <div
              className={cx(
                mediaWrapperClass,
                storyListOuterPadding({
                  edges: mediaFullBleedEdges,
                  scaleFactor: -1,
                  mode: 'margin',
                })
              )}
            >
              {media}
            </div>
          )}
          <div style={{ flexGrow: 1 }}>{children}</div>
        </div>
        {actions}
      </div>
    );

    const innerBody = isPoster ? (
      <div
        ref={ref}
        className={cx(
          innerBodyClass,
          colorBehaviorStyles[colorBehavior],
          { [innerBodyWithPosterClass]: isPoster },
          className,
          systemClass
        )}
        {...{ [dataTplAttr]: DataTplValue.StoryListItem, ...rest }}
      >
        {media}
        <StoryListItemOnMediaContext.Provider value>
          {/* TODO: Set ButtonOnMediaContext.Provider whenever we implement that */}
          <div
            className={
              derivedMediaPosition === 'posterTop'
                ? posterTopOverlayClass
                : posterBottomOverlayClass
            }
          >
            <div className={posterOverlayGradientClass}>{contentLockup}</div>
          </div>
        </StoryListItemOnMediaContext.Provider>
      </div>
    ) : (
      contentLockup
    );

    return (
      <ColorBehaviorContext.Provider value={{ colorBehavior }}>
        <StoryListMediaPositionContext.Provider value={derivedMediaPosition}>
          {innerBody}
        </StoryListMediaPositionContext.Provider>
      </ColorBehaviorContext.Provider>
    );
  }
);
