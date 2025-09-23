import { Format } from 'style-dictionary/types';
import { TypeStyle } from '../../../src/index.js';
import { stringifyJson } from '../util.js';
import { getDeprecationMessage } from './utils/deprecationUtils.js';

const typographyFormat = {
  name: 'typographyFormat',
  format: ({ dictionary }) => {
    const fontWeightObj: { [key: string]: number } = {};
    const fontSizes = new Map();
    const typographyStyles: { [key: string]: TypeStyle } = {};
    dictionary.allTokens.forEach(
      // TODO: does `type` need to be replaced with `$type`?
      token => {
        const { name, $value, attributes: { css, category, type, item } = {} } = token;
        if (typeof category !== 'string' || typeof type !== 'string') {
          throw new Error(
            `${name} is missing one or more required attributes of "category" and "type".
        Ensure you are running the built-in "attributeCti" transform first. Token:\n${JSON.stringify(token, null, 2)}`
          );
        }

        if (category === 'fontWeight') {
          fontWeightObj[type] = $value;
        }
        if (type === 'font') {
          if (typeof item !== 'string') {
            throw new Error(
              `${name} is missing required attribute of "item".
        Ensure you are running the built-in "attributeCti" transform first. Token:\n${JSON.stringify(token, null, 2)}`
            );
          }
          fontSizes.set(Number(item), $value);
        }
        if (category === 'typography' && typeof css === 'object' && css !== null) {
          typographyStyles[type] = css as TypeStyle;
        }
      }
    );

    /**
     * Create an array of values sorted by numberified item name from the `fontSizes` map
     */
    const sortedFontSizes = [...fontSizes.entries()]
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([, val]) => val);

    return `${getDeprecationMessage('fontWeight')}export const fontWeight = ${stringifyJson(fontWeightObj)};
${getDeprecationMessage('fontSize')}export const fontSize = ${stringifyJson(sortedFontSizes)};
${getDeprecationMessage('typography')}export const typography = ${stringifyJson(typographyStyles)}
    `;
  },
} satisfies Format;

export { typographyFormat };
