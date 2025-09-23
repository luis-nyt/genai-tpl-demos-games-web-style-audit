import { newSxHookWithCustomModifier } from '@nyt/foundation';
import { tplTypographyModifier } from './typography.js';

/**
 * @deprecated `useTplSxProp` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with the `className` or `style` prop to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.ocen8qix6l00 TPL Web 2.0 Release Plan: Remove sx Prop}
 */
const useTplSxProp = newSxHookWithCustomModifier(tplTypographyModifier);

export { useTplSxProp };
