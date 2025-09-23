import { css } from 'pretty-lights';

export const sectionTextCarouselClass = css`
  overflow-y: scroll;
  scroll-snap-type: x mandatory;
  display: flex;
  scrollbar-width: none;
`;

export const sectionTextCarouselItemClass = css`
  scroll-snap-align: start;
  min-width: var(--carousel-item-width);
`;
