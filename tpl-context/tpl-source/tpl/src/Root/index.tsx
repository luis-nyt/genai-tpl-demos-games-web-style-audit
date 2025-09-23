import React from 'react';
import { cx, css } from 'pretty-lights';
import {
  breakpoints,
  Root as FoundationRoot,
  RootProps as FoundationRootProps,
  BreakpointContext,
} from '@nyt/foundation';
import { light as defaultLight, dark as defaultDark } from '../tokens/index.js';
import { DATA_DARK_MODE, rootFocusClass } from '../util/index.js';
import generatedCSS from '../generated/cssVar.js';

/**
 * @deprecated `RootProps` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with Critical Stylesheet and Color Scheme CSS Classes to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.3aaeoyanfs81 TPL Web 2.0 Release Plan: Remove Root Component}
 */
interface RootProps
  extends Omit<FoundationRootProps, 'children' | 'mode' | 'light' | 'dark'>,
    Pick<Partial<FoundationRootProps>, 'light' | 'dark'> {
  children: React.ReactNode;
  id?: string;
  /**
   * Does your app support dark mode?
   */
  darkMode?: boolean;
  /**
   * Container element type (default div)
   */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

/**
 * Universal TPL root styles
 */
const tplRootClass = css(rootFocusClass, generatedCSS);

/**
 * Root of all TPL projects
 * This contains all the css variables and providers the design system needs
 * Breakpoint context is used to override responsive behavior on components outside of TPL
 * (e.g., Piano) that don't have TPL's breakpoints by default
 *
 * @deprecated `Root` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with Critical Stylesheet and Color Scheme CSS Classes to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.3aaeoyanfs81 TPL Web 2.0 Release Plan: Remove Root Component}
 */
const Root = ({
  as: Tag = 'div',
  children,
  darkMode = true,
  id,
  className,
  light = defaultLight,
  dark = defaultDark,
  ...rest
}: RootProps) => {
  const container_attr = {
    /**
     * Add a data attribute to the root element, which can be used
     * in CSS selectors to detect whether Dark Mode support is enabled
     */
    [DATA_DARK_MODE]: darkMode ? true : undefined,
  };
  return (
    <BreakpointContext.Provider value={breakpoints}>
      <FoundationRoot light={light} dark={dark} mode={darkMode ? 'auto' : 'light'} {...rest}>
        {rootStyles => (
          <Tag id={id} className={cx(css(rootStyles), tplRootClass, className)} {...container_attr}>
            {children}
          </Tag>
        )}
      </FoundationRoot>
    </BreakpointContext.Provider>
  );
};

export { Root, RootProps };
