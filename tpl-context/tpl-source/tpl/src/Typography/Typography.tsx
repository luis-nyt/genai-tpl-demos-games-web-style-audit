import React, { forwardRef } from 'react';
import { css, cx } from 'pretty-lights';
import { ColorBehaviorContext, useColorBehaviorContext } from '@nyt/foundation';
import { colorClass, TextColor, ResponsiveTypography, useTplSxProp } from '../system/index.js';
import { typography, TypographyKey } from '../tokens/index.js';
import { CommonWithAsProps, dataTplAttr, DataTplValue } from '../util/index.js';

interface TypographyProps extends CommonWithAsProps {
  /**
   * The as prop sets the element that the text will be rendered as.
   * For accessibility concerns the default is a paragraph tag.
   */
  as?: CommonWithAsProps['as'];
  /**
   * Accepts keys on the `typography` object.
   * keys are a slash-separated string that refer to a typographic style.
   * May take an array for a responsive value
   */
  variant?: ResponsiveTypography;

  /**
   * The color prop gives you the choice of colors from the Content color palette: primary, secondary, tertiary, positive, negative, and accent.
   * By default, the color is set to inherit the color of the parent element or document.
   */
  color?: TextColor;
}

/**
 * @deprecated `textBaseClass` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
const textBaseClass = css({
  margin: 0,
});

/**
 * Create an object of css classes from typographyData
 */
const typographyClasses = Object.fromEntries(
  Object.entries(typography).map(([key, value]) => [key, css(value)])
) as { [P in TypographyKey]: string };

/**
 * Base text component for consuming common text styles
 *
 * Takes a `variant` property which represents any valid text token combination
 * See the [TPL Typography docs](https://coda.io/d/Times-Product-Language-TPL_dH9ZFEaJR9I/Typography_suKq-#_lu4hX).
 * `variant` property may take a facepaint-style array for responsive values.
 */
const Typography = forwardRef<Element, TypographyProps>(
  (
    {
      as: Component = 'p',
      variant,
      color,
      children,
      className,
      colorBehavior: colorBehaviorProp,
      sx,
      ...rest
    },
    ref
  ) => {
    let textClass: string | undefined;
    let decoratedSx = sx;

    if (Array.isArray(variant)) {
      decoratedSx = { typ: variant, ...sx };
    } else if (variant) {
      textClass = typographyClasses[variant];
    }

    const systemClass = useTplSxProp(decoratedSx);

    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;

    return (
      <ColorBehaviorContext.Provider value={{ colorBehavior }}>
        <Component
          className={cx(
            textBaseClass,
            colorClass(color, 'content', colorBehavior),
            textClass,
            className,
            systemClass
          )}
          ref={ref}
          {...{ [dataTplAttr]: DataTplValue.Typography, ...rest }}
        >
          {children}
        </Component>
      </ColorBehaviorContext.Provider>
    );
  }
);

export { Typography, textBaseClass };
export type { TypographyProps };
