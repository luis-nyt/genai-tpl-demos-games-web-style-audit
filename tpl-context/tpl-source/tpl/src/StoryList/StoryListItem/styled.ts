import { css } from 'pretty-lights';
import { storyListStyle } from '../storyListStyle.js';
import { storyListOuterPadding } from '../storyListOuterPadding.js';

const {
  itemActionsGap,
  itemContentMediaGap,
  itemPosterGradientColor,
  itemPosterOverlayColor,
  itemPosterTextShadowColor,
} = storyListStyle;

export const innerBodyClass = css`
  position: relative;
`;

export const innerBodyWithPosterClass = css`
  ::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${itemPosterOverlayColor};
    mix-blend-mode: darken;
    z-index: 1;
  }
`;

export const contentLockupClass = css`
  ${storyListOuterPadding()};
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: ${itemActionsGap};
`;

export const contentMediaStackClass = css`
  display: flex;
  gap: ${itemContentMediaGap};
`;

export const mediaWrapperClass = css`
  flex-shrink: 0;
`;

const posterOverlayClass = css`
  display: flex;
  flex-direction: column;
  gap: ${itemActionsGap};
  position: absolute;
  inset: 0;
  z-index: 2;
  text-shadow: 0 0 clamp(1px, 0.0625rem, 0.0625rem) ${itemPosterTextShadowColor};
`;

export const posterTopOverlayClass = css`
  ${posterOverlayClass};
  justify-content: flex-start;
  --tpl-story-list-item-overlay-gradient-side: to bottom;
`;

export const posterBottomOverlayClass = css`
  ${posterOverlayClass};
  justify-content: flex-end;
  --tpl-story-list-item-overlay-gradient-side: to top;
`;

export const posterOverlayGradientClass = css`
  background: linear-gradient(
    var(--tpl-story-list-item-overlay-gradient-side),
    color-mix(in srgb, transparent, ${itemPosterGradientColor} 20%),
    color-mix(in srgb, transparent, ${itemPosterGradientColor} 0%)
  );
`;
