import { RuleTokens } from '@nyt/foundation';
import { horizontalRuleVariants, verticalRuleVariants } from '../generated/rule.js';

/**
 * @deprecated `ruleTokens` will be replaced in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with CSS custom properties to achieve similar results.
 * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.lzd1o6x00ndn TPL Web 2.0 Release Plan: Replace Non-Typography Design Token JavaScript APIs}
 */
const ruleTokens: RuleTokens = {
  horizontal: horizontalRuleVariants,
  vertical: verticalRuleVariants,
};

export { horizontalRuleVariants, verticalRuleVariants, ruleTokens };
