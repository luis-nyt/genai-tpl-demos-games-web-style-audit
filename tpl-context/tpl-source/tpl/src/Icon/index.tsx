import React, { forwardRef, SVGProps } from 'react';
import { ColorBehaviorContext, useColorBehaviorContext } from '@nyt/foundation';
import { css, cx } from 'pretty-lights';
import { color as tplColor } from '../tokens/index.js';
import { colorClass, useTplSxProp } from '../system/index.js';
import { CommonProps, dataTplAttr, DataTplValue } from '../util/index.js';
import { themedIconArtworkClasses } from './styled.js';

export const iconSizes = [24, 20, 16, 12] as const;
export type IconSize = (typeof iconSizes)[number];

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref' | 'style'>, CommonProps {
  /** The size at which the icon is rendered. */
  size?: IconSize;
  /**
   * The inline prop sets the icon to be inline with the text.
   * Set this prop to `true` when rendering Icon within a button or link with an icon and text.
   */
  inline?: boolean;
  /**
   * The color prop gives you the choice of colors from the TPL Foundations Content color palette.
   * By default, `color` is unset, so most icons will take on the `color` of the parent element or document.
   */
  color?: keyof typeof tplColor.content;
}

export interface IconComponentProps extends Omit<IconProps, 'children'> {}

/**
 * margin-top: is needed on when the item is in a flex container (set to center)
 * height and width: are the height needed to match the size of a capital letter in the TPL fonts based on the current icon geometry.
 * vertical-align: is what's needed for actual inline icons (inside a text element). This pulls the icons down the baseline.
 */
const inlineClass = css({
  display: 'inline',
  marginTop: '-0.15em',
  height: '0.95em',
  verticalAlign: '-0.09em',
  width: '0.95em',
});

const blockClass = css({
  display: 'block',
});

/**
 * The base Icon component for consuming icon sources, labels, and sizes.
 * This component is only used internally by the other icon components and isn't exported.
 */
const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      'aria-hidden': ariaHiddenProp,
      'aria-label': ariaLabel,
      className,
      children,
      color,
      colorBehavior: colorBehaviorProp,
      role: roleProp,
      size = 24,
      inline = false,
      sx,
      ...rest
    },
    ref
  ) => {
    const systemClass = useTplSxProp(sx);
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;

    let role = roleProp;
    if (ariaLabel && !role) role = 'img';

    /** Set `aria-hidden={true}` when `aria-label` is nullish and `aria-hidden` is nullish */
    const ariaHidden = ariaLabel == null && ariaHiddenProp == null ? true : ariaHiddenProp;

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        role={role}
        className={cx(
          colorClass(color, 'content', colorBehavior),
          themedIconArtworkClasses[colorBehavior],
          inline ? inlineClass : blockClass,
          className,
          systemClass
        )}
        {...{ [dataTplAttr]: DataTplValue.Icon, ...rest }}
      >
        <ColorBehaviorContext.Provider value={{ colorBehavior }}>
          {children}
        </ColorBehaviorContext.Provider>
      </svg>
    );
  }
);

export { Icon };
export { lightIconArtworkClass, darkIconArtworkClass } from './styled.js';
export type { IconProps };
