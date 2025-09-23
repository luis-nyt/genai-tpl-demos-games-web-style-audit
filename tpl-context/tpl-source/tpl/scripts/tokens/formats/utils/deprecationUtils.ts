const getDeprecationMessage = (key: string) => {
  switch (key) {
    case 'borderWidth':
    case 'BorderWidth':
    case 'fontSize':
    case 'fontWeight':
    case 'horizontalRuleVariants':
    case 'verticalRuleVariants':
      return `/**\n * @deprecated \`${key}\` will be replaced in the next major version of \`@nyt/tpl\`, which will switch to CSS Modules with Sass. Replace with CSS custom properties to achieve similar results.\n * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.lzd1o6x00ndn TPL Web 2.0 Release Plan: Replace Non-Typography Design Token JavaScript APIs}\n*/\n`;
    case 'typography':
      return `/**\n * @deprecated \`${key}\` will be replaced in the next major version of \`@nyt/tpl\`, which will switch to CSS Modules with Sass. Replace with SCSS Mixins to achieve similar results\n * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?tab=t.2tb2mnrxg2u6#heading=h.8uioulaf6w8l TPL Web 2.0 Release Plan: Remove Typography CSS-in-JS Objects}\n*/\n`;

    default:
      return '';
  }
};

export { getDeprecationMessage };
