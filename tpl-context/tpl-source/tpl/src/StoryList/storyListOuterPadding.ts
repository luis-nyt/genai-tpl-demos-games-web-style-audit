import { css } from 'pretty-lights';
import type { Properties } from 'csstype';
import { storyListStyle } from './storyListStyle.js';

const { itemOuterPaddingBottom, itemOuterPaddingTop, outerPaddingHorizontal } = storyListStyle;

/**
 * Options for the {@link storyListOuterPadding} function.
 *
 * @group Story List
 *
 * @deprecated `StoryListOuterPaddingOptions` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export interface StoryListOuterPaddingOptions {
  /** The set of edges to pad or add margin. The default is all four edges. */
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  /**
   * An optional scale factor to apply to each edge's padding value (e.g. use
   * `{ scaleFactor: -1, mode: 'margin' }` to counteract padding added by {@link StoryListItem}).
   */
  scaleFactor?: number;
  /** Whether to use CSS `padding` (default) or `margin` to apply the outer padding. */
  mode?: 'margin' | 'padding';
}

/**
 * A function that creates a Pretty Lights CSS class which applies story list outer padding to
 * specific edges of an element. Options include scaling the padding amount or applying as CSS
 * `margin` properties instead.
 *
 * @returns A Pretty Lights CSS class that applies padding or margins of the specified amount on
 * the specified edges.
 *
 * ## See Also
 *
 * - {@link storyListStyle}
 * - {@link StoryListStyle#itemOuterPaddingTop}
 * - {@link StoryListStyle#outerPaddingHorizontal}
 * - {@link StoryListStyle#itemOuterPaddingBottom}
 *
 * @group Story List
 *
 * @deprecated `storyListOuterPadding` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export function storyListOuterPadding({
  edges: edgeArray = ['top', 'right', 'bottom', 'left'],
  scaleFactor = 1.0,
  mode = 'padding',
}: StoryListOuterPaddingOptions = {}) {
  if (scaleFactor < 0 && mode === 'padding')
    throw new Error(
      `Scale factor is ${scaleFactor}, but CSS doesn't support negative padding! Try setting the \`mode\` parameter to 'margin'.`
    );

  const edges = new Set(edgeArray);
  const styles: Properties = {};
  if (edges.has('top')) styles[`${mode}Top`] = `calc(${itemOuterPaddingTop} * ${scaleFactor})`;

  if (edges.has('right'))
    styles[`${mode}Right`] = `calc(${outerPaddingHorizontal} * ${scaleFactor})`;

  if (edges.has('bottom'))
    styles[`${mode}Bottom`] = `calc(${itemOuterPaddingBottom} * ${scaleFactor})`;

  if (edges.has('left')) styles[`${mode}Left`] = `calc(${outerPaddingHorizontal} * ${scaleFactor})`;

  return css(styles);
}
