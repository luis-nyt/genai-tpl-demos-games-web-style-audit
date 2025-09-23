import { typography } from '../tokens/index.js';
import { TplSx } from './types.js';

/**
 * Modify an `sx` property to respond to responsive TPL typography values
 */
const tplTypographyModifier = (
  obj: TplSx,
  key: string,
  value,
  breakpoints: string[]
): TplSx | null => {
  if (!['typ', 'typography'].includes(key)) {
    return null;
  }
  /**
   * delete extraneous typ/typography prop
   */
  delete obj[key];

  /**
   * reduce facepaint-style array into target object
   */
  if (Array.isArray(value)) {
    const [init, ...rest] = value;

    return rest.reduce(
      (acc, typName, idx) => {
        const nextBreakpoint = breakpoints[idx];
        if (!typName) {
          return acc;
        }
        acc[nextBreakpoint] = acc[nextBreakpoint] || {};
        acc[nextBreakpoint] = { ...typography[typName], ...acc[nextBreakpoint] };
        return acc;
      },
      { ...typography[init] }
    );
  }
  return { ...typography[value], ...obj };
};

export { tplTypographyModifier };

export type { TplSx };
