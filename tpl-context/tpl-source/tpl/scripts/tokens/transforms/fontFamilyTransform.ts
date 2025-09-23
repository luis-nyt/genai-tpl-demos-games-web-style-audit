import { Transform } from 'style-dictionary/types';
import { cheltenhamFallback, sansSerifFallback, serifFallback } from '../formats/cssVarFormat.js';

const fontFamilyTransform = {
  name: 'typography/fontFamily',
  type: 'value',
  filter: ({ attributes: { category = '' } = {} }) => category === 'fontFamily',
  transform: ({ 'font-family': fontFamily, serif }) => {
    let fallback: string;
    if (!serif) fallback = sansSerifFallback;
    else if (fontFamily === 'nyt-cheltenham') fallback = cheltenhamFallback;
    else fallback = serifFallback;
    // Transform the `fontFamily` token into a full font family list --- no CSS variables currently
    // TODO: See if we can switch back to using CSS variables in the future
    return `${fontFamily}, ${fallback}`;
  },
} satisfies Transform;

export { fontFamilyTransform };
