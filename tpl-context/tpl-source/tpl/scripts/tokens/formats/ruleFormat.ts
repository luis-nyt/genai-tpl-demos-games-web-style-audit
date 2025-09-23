import { Format } from 'style-dictionary/types';
import { assignToNestedObject } from '@nyt/design-tokens';
import { stringifyJson } from '../util.js';
import { getDeprecationMessage } from './utils/deprecationUtils.js';

const ruleFormat = {
  name: 'web/rules',
  format: ({ dictionary }) => {
    const variants = {
      horizontal: {},
      vertical: {},
    };
    dictionary.allTokens.forEach(token => {
      const { $value, attributes } = token;
      const type = attributes?.['type'];
      const item = attributes?.['item'];
      if (typeof type !== 'string' || typeof item !== 'string')
        throw new Error(
          `Could not read either the 'attributes.type' or 'attributes.item' properties from the token:\n${JSON.stringify(token, null, 2)}`
        );

      assignToNestedObject(
        variants,
        [type, item],
        `${$value.width} ${$value.style} ${$value.color}`
      );
    });
    return `${getDeprecationMessage('horizontalRuleVariants')}export const horizontalRuleVariants = ${stringifyJson(variants.horizontal)} as const;
${getDeprecationMessage('horizontalRuleVariants')}export const verticalRuleVariants = ${stringifyJson(variants.vertical)} as const;\n`;
  },
} satisfies Format;

export { ruleFormat };
