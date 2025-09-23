import { css } from 'pretty-lights';
import { fontSize, fontWeight } from '../../tokens/index.js';
import { storyListStyle } from '../storyListStyle.js';

const { itemContentInnerGap, itemTopLabelMarginBottom } = storyListStyle;

export const rootClass = css`
  gap: ${itemContentInnerGap};
`;

export const topLabelClass = css({
  font: `${fontWeight.semiBold} ${fontSize[0]}/1.25 nyt-franklin, helvetica, arial, sans-serif`,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  margin: `0 0 ${itemTopLabelMarginBottom}`,
});
