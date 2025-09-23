import React from 'react';
import { cx, css } from 'pretty-lights';
import { MarginProps, space, useSystemProps, SystemProp, ReactProps } from '@nyt/foundation';
import { useTypographyCSS } from '../util';
import { typographyFlat, color as hyphenColor } from '../tokens';

type TextColor = keyof typeof hyphenColor.content;
type TextStyle = keyof typeof typographyFlat;
type TextSize<TextSizeStyle extends TextStyle> = keyof (typeof typographyFlat)[TextSizeStyle];

interface TextProps<TextSizeStyle extends TextStyle> extends MarginProps, ReactProps {
  /**
   * The as prop sets the element that the text will be rendered as.
   * For accessibility concerns the default is a paragraph tag.
   */
  as?: keyof React.JSX.IntrinsicElements;
  /**
   * Sets the style of the text element.
   */
  variant: TextSizeStyle;
  /**
   * The size prop sets the font size on a text element.
   * @see {@link https://github.com/nytimes/news/blob/main/projects/tpl/hyphen_archive/src/tokens/typography.ts}
   * for matrix of type variants and supported sizes.
   */
  size: SystemProp<TextSize<TextSizeStyle>>;
  /**
   * The color prop gives you the choice of colors from the Hyphen Content color palette: primary, secondary, tertiary, positive, negative, and accent.
   * By default, the color is set to inherit the color of the parent element or document.
   */
  color?: TextColor;
}

/**
 * Describes the props for a Text component that can only render a single variant, and thus:
 * - Does not have a `variant` prop
 * - `size` prop is:
 *   - Optional
 *   - Only supports values that are defined for the given variant
 *
 * @example
 * ```ts
 * type BodyComponent = (props: VTextProps<'body'>) => JSX.Element;
 * ```
 */
interface VTextProps<TextSizeStyle extends TextStyle>
  extends Partial<Omit<TextProps<TextSizeStyle>, 'variant'>> {}

const textBaseClass = css({
  margin: 0,
});

/**
 * Base text component for consuming text styles and sizes.
 * This generic component is only used internally by the other text components and isn't exported.
 */
const Text = <TextSizeStyle extends TextStyle>({
  as: Component = 'p',
  variant,
  color,
  children,
  className,
  size,
  ...rest
}: TextProps<TextSizeStyle>): JSX.Element => {
  const textClass = css(useTypographyCSS(typographyFlat, variant, size));
  const [systemStyles, pruned] = useSystemProps(rest, space);

  return (
    <Component
      className={cx(textBaseClass, textClass, systemStyles, className)}
      style={color ? { color: hyphenColor.content[color] } : undefined}
      {...pruned}
    >
      {children}
    </Component>
  );
};

export { Text };
export type { TextColor, TextSize, TextStyle, TextProps, VTextProps };
