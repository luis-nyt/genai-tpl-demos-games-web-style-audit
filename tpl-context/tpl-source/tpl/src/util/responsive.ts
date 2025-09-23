import { css } from 'pretty-lights';
import {
  responsiveProp,
  SystemProp,
  ResponsivePropTransform,
  useBreakpointContext,
} from '@nyt/foundation';

/**
 * Convert a single prop from a responsive array to responsive CSS
 *
 * @deprecated `useResponsivePropToCSS` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.6vshj89yoqr0 TPL Web 2.0 Release Plan: Remove Breakpoints / Breakpoint Context}
 */
const useResponsivePropToCSS = <Value>(
  propName: string,
  propValue: SystemProp<Value>,
  transform?: ResponsivePropTransform<Value>
): { [p: string]: any } | null => {
  const breakpoints = useBreakpointContext();
  return responsiveProp({}, propName, propValue, breakpoints, transform);
};

/**
 * Convert a single props from a responsive array to a css class with responsive CSS
 *
 * @deprecated `useResponsivePropToClass` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.6vshj89yoqr0 TPL Web 2.0 Release Plan: Remove Breakpoints / Breakpoint Context}
 */
const useResponsivePropToClass = <Value>(
  propName: string,
  propValue: SystemProp<Value>,
  transform?: ResponsivePropTransform<Value>
): string => css(useResponsivePropToCSS(propName, propValue, transform));

export { useResponsivePropToCSS, useResponsivePropToClass };
