import { css } from 'pretty-lights';
import { ColorLike, ColorBehavior } from '@nyt/foundation';
import { color as dsColor, createTplColorBehaviorStyles } from '../tokens/index.js';

/**
 * @deprecated `TextColor` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with CSS custom properties to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.lzd1o6x00ndn TPL Web 2.0 Release Plan: Replace Non-Typography Design Token JavaScript APIs}
 */
export type TextColor = keyof typeof dsColor.content;

export type BackgroundColor = keyof typeof dsColor.background;

export type StrokeColor = keyof typeof dsColor.stroke;

/**
 * store all design system colors on content object as css-wrapped custom variable references on `color`.
 */
const makeColorClasses = (colorType: keyof typeof dsColor, property: string) => {
  return Object.fromEntries(
    Object.entries(dsColor[colorType]).map(([key, value]) => [key, css({ [property]: value })])
  );
};

/**
 * loop through all categories of color creating an object of microclasses for each property of dsColor
 *
 * example:
 * colorCategory.stroke.classes.secondary = css({color: var(--color-stroke-secondary)})
 */
const colorCategory = [
  ['content', 'color'],
  ['background', 'background'],
  ['stroke', 'border-color'],
].reduce((acc, [key, property]) => {
  acc[key] = {
    property,
    /**
     * This property is only used internally; memoizing the creation of the classes object since it is an expensive
     * operation we only want to do once.
     */
    classesMem: null,
    get classes() {
      return this.classesMem
        ? this.classesMem
        : makeColorClasses(key as keyof typeof dsColor, property);
    },
  };
  return acc;
}, {});

/**
 * @deprecated `ColorClassParams` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with CSS custom properties to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.lzd1o6x00ndn TPL Web 2.0 Release Plan: Replace Non-Typography Design Token JavaScript APIs}
 */
type ColorClassParams = {
  (color?: TextColor, colorType?: 'content', colorBehavior?: ColorBehavior): string;
  (color?: BackgroundColor, colorType?: 'background', colorBehavior?: ColorBehavior): string;
  (color?: StrokeColor, colorType?: 'stroke', colorBehavior?: ColorBehavior): string;
};

/**
 * Create color behavior styles for a given color
 * This function will provide color css that responds to supported color behaviors for all color categories assuming:
 *
 * @deprecated `colorClass` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with CSS custom properties to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.lzd1o6x00ndn TPL Web 2.0 Release Plan: Replace Non-Typography Design Token JavaScript APIs}
 */
const colorClass: ColorClassParams = (
  color,
  colorType = 'content',
  colorBehavior = 'userDefault'
) => {
  if (!color) return undefined;
  const { property, classes } = colorCategory[colorType];

  if (colorBehavior === 'userDefault') return classes[color];

  return createTplColorBehaviorStyles(light => {
    return `${property}: ${(light[colorType][color] as ColorLike).hex};`;
  })[colorBehavior];
};

export { ColorClassParams, colorClass };
