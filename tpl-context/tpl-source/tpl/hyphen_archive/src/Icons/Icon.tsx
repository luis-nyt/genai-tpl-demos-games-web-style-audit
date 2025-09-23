import React from 'react';
import { cx, css } from 'pretty-lights';
import { color as hyphenColor } from '../tokens';

export const iconSizes = { lg: 24, md: 20, sm: 16 };
export type IconSize = keyof typeof iconSizes;

interface IconProps {
  /**
   * The size prop sets size that the icon is rendered.
   * The default size of the icon is set to lg (large).
   */
  size?: IconSize;
  /**
   * The label prop turns the icon into an image element in assistive technologies and adds an aria-label of the value. This is useful for buttons with icons that don't have a text label.
   */
  label?: string;
  /**
   * The inline prop sets the icon to be inline with the text.
   * By default, this is false and should be used situations where you have a button or link with an icon and text.
   */
  inline?: boolean;
  /**
   * The color prop gives you the choice of colors from the Hyphen Content color palette: primary, secondary, tertiary, positive, negative, and accent.
   * By default, the color is set to currentColor of the color of the parent element or document.
   */
  color?: keyof typeof hyphenColor.content;
  className?: string;
  children?: React.ReactNode;
}

/**
 * margin-top: is needed on when the item is in a flex container (set to center)
 * height and width: are the height needed to match the size of a capital letter in the hyphen fonts based on the current icon geometry.
 * vertical-align: is what's needed for actual inline icons (inside a text element). This pulls the icons down the the baseline.
 */
const inlineClass = css({
  marginTop: '-0.15em',
  height: '0.95em',
  verticalAlign: '-0.09em',
  width: '0.95em',
});

/**
 * The base Icon component for consuming icon sources, labels, and sizes.
 * This generic component is only used internally by the other icon components and isn't exported.
 */
const Icon = ({
  className,
  children,
  color,
  label,
  size = 'lg',
  inline = false,
  ...rest
}: IconProps): JSX.Element => {
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox={`0 0 ${iconSizes[size]} ${iconSizes[size]}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      className={cx({ [inlineClass]: inline }, className)}
      style={{ color: color ? hyphenColor.content[color] : undefined }}
      {...rest}
    >
      {children}
    </svg>
  );
};

export { Icon, IconProps };
