import type { AriaRole, CSSProperties, JSX, JSXElementConstructor, ReactNode } from 'react';
// eslint-disable-next-line no-restricted-imports
import type { ColorBehavior, ColorBehaviorProps } from '@nyt/foundation';
import type { TplSx } from '../system/index.js';

/**
 * A modified version of the React type definitions' {@link CSSProperties} object which supports
 * CSS custom properties. This corresponds to a React component's `style` prop.
 */
export interface CSSPropertiesAndCustomProperties extends CSSProperties {
  /**
   * Allow any CSS Custom Properties
   * @see https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
   */
  [index: `--${string}`]: string | undefined;
}

/**
 * An object type containing props that correspond to common features supported by the majority of
 * TPL components.
 *
 * @see The "Common Features" section of [Contributing.md](../../Contributing.md)
 */
export interface CommonProps extends ColorBehaviorProps {
  children?: ReactNode;
  className?: string;
  /**
   * @deprecated `colorBehavior` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with Color Tokens with Color Behavior, add Color Scheme CSS Classes to parent elements to achieve similar results.
   * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.278xvmx0xveq TPL Web 2.0 Release Plan: Remove Color Behavior Context & Props}
   */
  colorBehavior?: ColorBehavior;
  htmlFor?: string;
  id?: string;
  role?: AriaRole;
  style?: CSSPropertiesAndCustomProperties;
  /**
   * @deprecated `sx` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with the `className` or `style` prop to achieve similar results.
   * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.ocen8qix6l00 TPL Web 2.0 Release Plan: Remove sx Prop}
   */
  sx?: TplSx;
  title?: string;
}

/**
 * An object type with all properties of {@link CommonProps}, _plus_ the `as` prop, which lets you
 * change a component's root element (or React component).
 *
 * @see The "Common Features" section of [Contributing.md](../../Contributing.md)
 */
export interface CommonWithAsProps extends CommonProps {
  /**
   * The component or element that this component will render as its root element.
   */
  as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
}
