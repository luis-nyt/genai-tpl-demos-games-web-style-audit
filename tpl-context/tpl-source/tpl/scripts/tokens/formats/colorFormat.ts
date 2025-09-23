import { Format } from 'style-dictionary/types';
import { assignToNestedObject } from '@nyt/design-tokens';
import { stringifyJson } from '../util.js';

const hslaRegex = /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/;

/**
 * Extract hsla values into an array
 */
const hslaToArray = (hsla: string): number[] | null => {
  const match = hslaRegex.exec(hsla);
  return match ? match.slice(1).map(Number) : null;
};

const isHSLA = (str: string): boolean => hslaRegex.test(str);

/**
 * Ensure color format conforms to this design system's Color class input
 */
const validateColor = (color: string): string | number[] => {
  let out: string | number[] = color;
  if (isHSLA(color)) {
    const hslaInterim = hslaToArray(color);
    if (!hslaInterim || hslaInterim.length !== 4) {
      throw new Error(`Failed to convert ${color} to hsla array`);
    }
    out = hslaInterim;
  }
  return out;
};

const colorInputFormat = {
  name: 'colorInputFormat',
  format: ({ dictionary }) => {
    const liStr = 'export const lightInput = ';
    const dkStr = 'export const darkInput = ';
    const light = {};
    const dark = {};

    /**
     * loop through all the tokens creating a deeply nested object of values for each theme (dark and light)
     * based on the token path
     */
    dictionary.allTokens.forEach(token => {
      const {
        original: { $value },
        path,
        $darkValue,
        themeable,
      } = token;
      path.shift();
      assignToNestedObject(light, path, validateColor($value));
      if (themeable && $darkValue) {
        assignToNestedObject(dark, path, validateColor($darkValue));
      }
    });
    return `${liStr} ${stringifyJson(light)};\n\n ${dkStr} ${stringifyJson(dark)};\n`;
  },
} satisfies Format;

export { colorInputFormat };
