import { Transform } from 'style-dictionary/types';

/**
 * Change color values to reference their CSS variable
 * Allows for references to colors to be themeable by default
 */
const colorToCSSReferenceTransform = {
  name: 'web/colorToCSSReferenceTransform',
  type: 'value',
  filter: token => token.$type === 'color',
  transform: ({ attributes: { category, type, item } = {}, $value, name }) => {
    if (typeof category !== 'string' || typeof type !== 'string' || typeof item !== 'string') {
      throw new Error(
        `${name} is missing one or more required attributes of "category", "type", and "item."
        Ensure you are running the built-in "attributeCti" transform first`
      );
    }
    return `var(--${category}-${type}-${item}, ${$value})`;
  },
} satisfies Transform;

export { colorToCSSReferenceTransform };
