import React, { Children, Fragment, ReactNode } from 'react';
import { sectionTextCarouselClass, sectionTextCarouselItemClass } from './styled.js';
import { VRule } from '../../../Rule/index.js';
import { storyListOuterPadding } from '../../storyListOuterPadding.js';

export interface SectionTextCarouselProps {
  children: ReactNode;
}

export const SectionTextCarousel = ({ children }: SectionTextCarouselProps) => (
  <div
    className={sectionTextCarouselClass}
    style={{
      // @ts-expect-error
      '--carousel-item-width': '16.25rem',
    }}
  >
    {Children.map(children, (child, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        {index > 0 && (
          <VRule
            variant="secondary"
            className={storyListOuterPadding({ edges: ['top', 'bottom'], mode: 'margin' })}
          />
        )}
        <div className={sectionTextCarouselItemClass}>{child}</div>
      </Fragment>
    ))}
  </div>
);
