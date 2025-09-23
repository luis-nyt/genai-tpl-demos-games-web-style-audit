import { css } from 'pretty-lights';
import { color, fontWeight } from '../../tokens/index.js';
import { storyListStyle } from '../storyListStyle.js';

const { outerPaddingHorizontal, sectionHeaderPaddingBottom, sectionHeaderPaddingTop } =
  storyListStyle;

export const rootClass = css`
  color: ${color.content.primary};
  font:
    ${fontWeight.bold} 1rem/1.3 nyt-franklin,
    helvetica,
    arial,
    sans-serif;
  padding: ${sectionHeaderPaddingTop} ${outerPaddingHorizontal} ${sectionHeaderPaddingBottom};
`;
