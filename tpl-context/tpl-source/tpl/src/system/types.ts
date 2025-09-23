// eslint-disable-next-line no-restricted-imports
import { Sx, SystemProp } from '@nyt/foundation';
import type { BackgroundColor } from './colorClass.js';
import { TypographyKey } from '../tokens/index.js';

/**
 * @deprecated `ResponsiveTypography` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.6vshj89yoqr0 TPL Web 2.0 Release Plan: Remove Breakpoints / Breakpoint Context}
 */
type ResponsiveTypography = SystemProp<TypographyKey>;

/**
 * @deprecated `TplSx` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with the `className` or `style` prop to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.ocen8qix6l00 TPL Web 2.0 Release Plan: Remove sx Prop}
 */
type TplSx = Sx & {
  typography?: ResponsiveTypography;
  typ?: ResponsiveTypography;
};

interface BackgroundColorModifier {
  bg?: BackgroundColor;
  background?: BackgroundColor;
}

export type { BackgroundColorModifier, TplSx, ResponsiveTypography };
