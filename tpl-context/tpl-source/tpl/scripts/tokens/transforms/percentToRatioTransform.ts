import { Transform } from 'style-dictionary/types';

/**
 * Transform a %-type string value to a 1-based number
 */
const percentToRatioTransform = {
  name: 'percentToNumberTransform',
  type: 'value',
  filter: ({ $value }) => typeof $value === 'string' && $value.endsWith('%'),
  transform: ({ $value }) => {
    const out = parseFloat($value);
    if (Number.isNaN(out)) {
      throw new Error(`could not convert ${$value} to number`);
    }

    return out / 100;
  },
} satisfies Transform;

export { percentToRatioTransform };
