import { css } from 'pretty-lights';

export const posterCarouselClass = css`
  overflow-y: scroll;
  scroll-snap-type: x mandatory;
  display: flex;
  gap: 1px;
  scrollbar-width: none;
`;

export const posterCarouselItemClass = css`
  scroll-snap-align: start;
  min-width: var(--carousel-item-width);
`;
