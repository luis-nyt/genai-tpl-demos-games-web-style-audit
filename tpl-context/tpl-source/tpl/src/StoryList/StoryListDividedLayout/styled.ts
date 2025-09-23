import { css } from 'pretty-lights';
import { storyListStyle } from '../storyListStyle.js';
import { storyListOuterPadding } from '../storyListOuterPadding.js';

const { sectionMarginTop } = storyListStyle;

export const childDividerClass = css`
  ${storyListOuterPadding({ edges: ['right', 'left'], mode: 'margin' })};
  width: auto;
`;

export const withSectionSpacingClass = css`
  margin-top: ${sectionMarginTop};
`;
