import { Theme, invertColors, createColorBehaviorStyles } from '@nyt/foundation';
import { lightInput, darkInput } from '../generated/color.js';
import { prefersDarkMode } from '../util/prefersDarkMode.js';

/**
 * @deprecated `light` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with CSS custom properties to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.lzd1o6x00ndn TPL Web 2.0 Release Plan: Replace Non-Typography Design Token JavaScript APIs}
 */
const light = new Theme(lightInput, undefined, 'tpl');

/**
 * @deprecated `dark` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with CSS custom properties to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.lzd1o6x00ndn TPL Web 2.0 Release Plan: Replace Non-Typography Design Token JavaScript APIs}
 */
const dark = new Theme(darkInput, undefined, 'tpl');

const color = light.toVar();

/**
 * @deprecated `invertTplColors` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.idkj2loswvck TPL Web 2.0 Release Plan: Remove CSS-in-JS Utilities}
 */
const invertTplColors = invertColors(light.colors, dark.colors);

/**
 * @deprecated `createTplColorBehaviorStyles` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with Color Tokens with Color Behavior, add Color Scheme CSS Classes to parent elements to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.278xvmx0xveq TPL Web 2.0 Release Plan: Remove Color Behavior Context & Props}
 */
const createTplColorBehaviorStyles = createColorBehaviorStyles(
  light.colors,
  dark.colors,
  prefersDarkMode
);

export { color, light, dark, invertTplColors, createTplColorBehaviorStyles };
