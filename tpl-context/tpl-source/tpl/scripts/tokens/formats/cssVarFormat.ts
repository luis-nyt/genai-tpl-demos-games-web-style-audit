import { Format } from 'style-dictionary/types';
import { stringifyJson } from '../util.js';

export const serifFallback = "georgia, 'times new roman', times, serif";
/**
 * A special Cheltenham-specific fallback font stack.
 * @see https://github.com/nytimes/web-fonts/pull/86
 * @see https://github.com/nytimes/news/pull/10344
 */
export const cheltenhamFallback = `cheltenham-fallback-georgia, cheltenham-fallback-noto, ${serifFallback}`;
export const sansSerifFallback = 'helvetica, arial, sans-serif';
const serifVar = '--serif';
const sansSerifVar = '--sans-serif';

const initial = {
  [serifVar]: serifFallback,
  [sansSerifVar]: sansSerifFallback,
};

const cssVarFormat = {
  name: 'cssVarFormat',
  format: ({ dictionary }) => {
    /**
     * Create an object of all font family tokens where keys are css variable names and values are
     * font face references with fallbacks
     */
    const fontFamilyVars = dictionary.allTokens.reduce(
      (
        acc: { [key: string]: string },
        { serif, original: { 'css-custom-var': customVar }, 'font-family': fontFamily }
      ) => {
        acc[customVar] = `"${fontFamily}",var(${serif ? serifVar : sansSerifVar})`;
        return acc;
      },
      initial
    );

    return `export default ${stringifyJson(fontFamilyVars)};\n`;
  },
} satisfies Format;

export { cssVarFormat };
