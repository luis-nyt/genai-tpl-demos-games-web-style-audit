import { Transform } from 'style-dictionary/types';
import { TypeStyle } from '../../../src/index.js';

/**
 * Convert a percent value to a 1-based number
 */

const typographyTransform = {
  name: 'web/typography',
  /**
   * I would have liked this to be a value transform but this is not working, I suspect because of this issue:
   * https://github.com/amzn/style-dictionary/issues/836
   */
  type: 'attribute',
  filter: token => token.attributes?.['category'] === 'typography',
  transform: ({
    $value: { letterSpacing, textTransform, fontWeight, fontSize, lineHeight, fontFamily } = {},
  }) => {
    const css: TypeStyle = {
      font: `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`,
      ...(letterSpacing && { letterSpacing: `${letterSpacing}em` }),
      ...(textTransform && { textTransform }),
    };

    return {
      css,
    };
  },
} satisfies Transform;

export { typographyTransform };
