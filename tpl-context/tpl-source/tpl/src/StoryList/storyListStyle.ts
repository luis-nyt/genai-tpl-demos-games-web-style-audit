import { css } from 'pretty-lights';
import type { Properties, Property } from 'csstype';
import { spaceScale } from '../generated/spacing.js';
// Import some additional types to help out VSCode with JSDoc @link
// @see https://stackoverflow.com/a/70996553
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  StoryListItem,
  StoryListItemContent,
  StoryListSection,
  storyListOuterPadding,
} from '../index.js';
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Available properties for {@link storyListStyle} and {@link createStoryListStyleClass}.
 *
 * @group Story List
 *
 * @deprecated `StoryListStyle` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export interface StoryListStyle {
  /** The horizontal and vertical alignment of story list views. */
  alignItems: Property.AlignItems;
  /** The text alignment of story list views. */
  textAlign: Property.TextAlign;
  /**
   * The leading and trailing padding around {@link StoryListItem}s, dividers and
   * {@link StoryListSection} headers. Expands tap target.
   */
  outerPaddingHorizontal: Property.PaddingLeft;

  /** The space above section header. */
  sectionHeaderPaddingTop: Property.PaddingTop;
  /** The space above section header. */
  sectionHeaderPaddingBottom: Property.PaddingBottom;
  /** The space in between sections. */
  sectionMarginTop: Property.MarginTop;

  /** The padding above {@link StoryListItem}. Expands tap target. */
  itemOuterPaddingTop: Property.PaddingTop;
  /** The padding below {@link StoryListItem}. Expands tap target. */
  itemOuterPaddingBottom: Property.PaddingBottom;
  /** The inner space between media and text content in {@link StoryListItem}. */
  itemContentMediaGap: Property.Gap;
  /** The space between actions and text content in {@link StoryListItem}. */
  itemActionsGap: Property.Gap;

  /** The space between every text element in {@link StoryListItemContent}. */
  itemContentInnerGap: Property.Gap;
  /** The space below the top label in {@link StoryListItemContent}. */
  itemTopLabelMarginBottom: Property.MarginBottom;

  // Intentionally lacks a fallback value
  itemPosterOverlayColor: string | undefined;
  // Intentionally lacks a fallback value
  itemPosterTextShadowColor: string | undefined;
  // Intentionally lacks a fallback value
  itemPosterGradientColor: string | undefined;
}

/**
 * @deprecated `StoryListStyleCssInJsProperties` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export type StoryListStyleCssInJsProperties = {
  [P in keyof StoryListStyle]: `var(--${string}, ${string})`;
};

/**
 * The default values used for {@link StoryListStyle}. We use this in {@link storyListStyle}
 * (the object) to provide CSS `var()` fallback values. This is by design, since we reference
 * `storyListStyle` properties across multiple components, and we cannot assume a common parent
 * element has already declared all of {@link storyListStyle}’s underlying CSS custom properties.
 * (For example, {@link StoryListItem} can be used on its own.)
 */
const storyListStyleFallbackValues = {
  // TODO
  alignItems: 'flex-start',
  // TODO
  textAlign: 'start' as Property.TextAlign,
  outerPaddingHorizontal: spaceScale.get(2.5)!,
  sectionHeaderPaddingTop: spaceScale.get(1)!,
  sectionHeaderPaddingBottom: '0',
  sectionMarginTop: spaceScale.get(2)!,
  itemOuterPaddingTop: spaceScale.get(1.5)!,
  itemOuterPaddingBottom: spaceScale.get(3)!,
  itemContentMediaGap: spaceScale.get(2)!,
  itemActionsGap: spaceScale.get(1)!,
  itemContentInnerGap: spaceScale.get(1)!,
  itemTopLabelMarginBottom: `-${spaceScale.get(0.5)!}`,
  // Intentionally lacks a (fallback) value
  itemPosterOverlayColor: undefined,
  // Intentionally lacks a (fallback) value
  itemPosterTextShadowColor: undefined,
  // Intentionally lacks a (fallback) value
  itemPosterGradientColor: undefined,
} as const satisfies StoryListStyle;

const getCssCustomPropertyName = (property: string, prefix = 'tpl-story-list'): `--${string}` =>
  `--${prefix ? `${prefix}-` : ''}${property}`;

/**
 * An object containing [CSS custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)
 * _references_, used to customize the appearance of {@link StoryList} and related views within a view hierarchy.
 *
 * ## Overview
 *
 * Story list is a family of related views, some of which are rather complex, so this is a way
 * to "reach in" and configure some of their layout properties, without having to start from scratch.
 *
 * Multiple story list views use these properties to establish consistent spacing and visual consistency.
 * For example, {@link StoryListStyle#outerPaddingHorizontal} defines the leading and trailing
 * padding used for {@link StoryList} dividers, {@link StoryListItem} and {@link StoryListHeader}.
 *
 * Please refer to in-editor autocomplete or the {@link StoryListStyle} type definition for a
 * full description of each available property.
 *
 * ## Usage
 *
 * Access _this object_'s properties in custom styles designed to integrate and match the appearance
 * of other built-in story list views:
 *
 * @example
 * ```tsx
 * export const newsletterPromoClass = css`
 *   text-align: ${storyListStyle.textAlign};
 *   ${storyListOuterPadding()};
 * `;
 * ```
 *
 * To _override_ property values, use {@link createStoryListStyleClass}:
 *
 * @example
 * ```tsx
 * export const myListClass = createStoryListStyleClass({
 *   textAlign: 'center'
 * });
 * ```
 *
 * ## See Also
 *
 * - {@link StoryListStyle}
 * - {@link createStoryListStyleClass}
 * - {@link storyListOuterPadding}
 *
 * @group Story List
 *
 * @deprecated `storyListStyle` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export const storyListStyle = Object.fromEntries(
  Object.entries(storyListStyleFallbackValues).map(([property, value]) => [
    property,
    `var(${getCssCustomPropertyName(property)}${
      // Only output a fallback value if necessary
      typeof value !== 'undefined' ? `, ${value}` : ''
    })`,
  ])
) as StoryListStyleCssInJsProperties;

/**
 * Creates a "CSS object" with [CSS custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)
 * _declarations_ that override the default {@link storyListStyle} values.
 *
 * To _access_ story list style properties, use {@link storyListStyle}.
 *
 * ## See Also
 *
 * - {@link storyListStyle}
 * - {@link createStoryListStyleClass}
 *
 * @group Story List
 *
 * @deprecated `createStoryListStylePropertyDeclarations` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export const createStoryListStylePropertyDeclarations = (
  customStyleProperties: Partial<StoryListStyle>
): Properties =>
  Object.fromEntries(
    Object.entries(customStyleProperties).map(([property, value]) => [
      getCssCustomPropertyName(property),
      value,
    ])
  );

/**
 * Creates a Pretty Lights CSS class with [CSS custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)
 * _declarations_ that override the default {@link storyListStyle} values.
 *
 * To _access_ story list style properties, use {@link storyListStyle}.
 *
 * @example
 * ```tsx
 * export const myListClass = createStoryListStyleClass({
 *   textAlign: 'center'
 * });
 * ```
 *
 * ## See Also
 *
 * - {@link storyListStyle}
 * - {@link createStoryListStylePropertyDeclarations}
 *
 * @group Story List
 *
 * @deprecated `createStoryListStyleClass` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.em4jzdqfw15r TPL Web 2.0 Release Plan: Replace Component Style CSS-in-JS Helpers with SCSS Mixins}
 */
export const createStoryListStyleClass = (properties: Partial<StoryListStyle>): string =>
  css(createStoryListStylePropertyDeclarations(properties));
