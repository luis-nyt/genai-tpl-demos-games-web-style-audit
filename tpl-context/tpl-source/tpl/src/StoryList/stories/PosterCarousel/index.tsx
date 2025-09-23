import React, { Children, ReactNode } from 'react';
import { posterCarouselClass, posterCarouselItemClass } from './styled.js';

export interface PosterCarouselProps {
  children: ReactNode;
  horizontalSizeClass?: 'regular' | 'compact';
}

export const PosterCarousel = ({
  children,
  horizontalSizeClass = 'compact',
}: PosterCarouselProps) => (
  <div
    className={posterCarouselClass}
    style={{
      // @ts-expect-error
      '--carousel-item-width': horizontalSizeClass === 'regular' ? '20rem' : '11.25rem',
    }}
  >
    {Children.map(children, (child, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={index} className={posterCarouselItemClass}>
        {child}
      </div>
    ))}
  </div>
);
