const borderRadiusEntries = [
  [0, '0'],
  [1, '0.0625rem'],
  [3, '0.1875rem'],
] as const;

/**
 * @deprecated `BorderRadius` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with CSS custom properties to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.lzd1o6x00ndn TPL Web 2.0 Release Plan: Replace Non-Typography Design Token JavaScript APIs} */
type BorderRadius = (typeof borderRadiusEntries)[number][0];

/**
 * @deprecated `borderRadius` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with CSS custom properties to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.lzd1o6x00ndn TPL Web 2.0 Release Plan: Replace Non-Typography Design Token JavaScript APIs}
 */
const borderRadius = new Map<BorderRadius, string>(borderRadiusEntries);

export { BorderRadius, borderRadius };
