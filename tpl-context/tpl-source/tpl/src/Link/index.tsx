import React from 'react';
import { cx } from 'pretty-lights';
import { ColorBehaviorContext, useColorBehaviorContext } from '@nyt/foundation';
import { colorClass, TextColor, useTplSxProp } from '../system/index.js';
import { CommonProps, dataTplAttr, DataTplValue } from '../util/index.js';
import { linkClass, subtleClass } from './styled.js';

type HTMLAnchorElementProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export interface LinkProps
  extends Omit<HTMLAnchorElementProps, 'ref' | 'target' | 'style'>,
    CommonProps {
  /**
   * The `color` prop gives you the choice of colors from the Content color palette: primary,
   * secondary, tertiary, positive, negative, and accent. By default, the color is set to inherit
   * the color of the parent element or document.
   */
  color?: TextColor;
  /**
   * Removes the Link's underline to reduce visual clutter, e.g. when grouping many links together.
   * @see https://coda.io/d/Times-Product-Language-TPL_dH9ZFEaJR9I/Link-WIP_sublS#_luSLA
   */
  subtle?: boolean;
  /**
   * Where to display the linked URL. For more on `target` in general, please see [MDN's docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).
   *
   * When set to `"_blank"`, i.e. so the link opens in a new tab, the component will speak "opens
   * in new tab" to screen readers. For more on linking to content outside of the Times, please
   * refer to the [TPL Link docs in Coda](https://coda.io/d/Times-Product-Language-TPL_dH9ZFEaJR9I/Link-WIP_sublS#_luKCl).
   */
  target?: HTMLAnchorElementProps['target'];
}

/**
 * Link turns a piece of text into a navigational element that brings readers to a new place. Link
 * is commonly used within a sentence, with an underline beneath it. It can also be used without an
 * underline when grouped together with other links, as in a navigation bar or footer.
 *
 * For more info, please refer to the [TPL Link docs in Coda](https://coda.io/d/Times-Product-Language-TPL_dH9ZFEaJR9I/Link-WIP_sublS).
 */
export const Link = React.forwardRef(
  (
    {
      children,
      className,
      color,
      colorBehavior: colorBehaviorProp,
      href,
      subtle,
      sx,
      ...rest
    }: LinkProps,
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => {
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;
    const colorClassName = color ? colorClass(color, 'content', colorBehavior) : undefined;
    const systemClass = useTplSxProp(sx);

    return (
      <ColorBehaviorContext.Provider value={{ colorBehavior }}>
        <a
          ref={ref}
          className={cx(
            linkClass,
            { [subtleClass]: subtle },
            colorClassName,
            className,
            systemClass
          )}
          href={href}
          {...{ [dataTplAttr]: DataTplValue.Link, ...rest }}
        >
          {children}
        </a>
      </ColorBehaviorContext.Provider>
    );
  }
);
