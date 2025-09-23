import React, { Children, isValidElement, useContext, type ReactNode } from 'react';
import { cx } from 'pretty-lights';
import { StoryListDividersContext } from '../StoryList/StoryListDividersContext.js';
import { HRule, HRuleProps } from '../../Rule/index.js';
import { childDividerClass, withSectionSpacingClass } from './styled.js';
import type { StoryListSectionProps } from '../StoryListSection/index.js';

export interface StoryListDividedLayoutProps {
  children?: ReactNode;
  sectionComponent: (props: StoryListSectionProps) => ReactNode;
}

type StoryListSectionType = 'section' | 'sectionWithHeader' | 'nonSection';

const getStoryListSectionType = (
  element: unknown,
  sectionComponent: StoryListDividedLayoutProps['sectionComponent']
): StoryListSectionType => {
  if (isValidElement(element) && element.type === sectionComponent) {
    if ((element.props as StoryListSectionProps).header) return 'sectionWithHeader';
    return 'section';
  }
  return 'nonSection';
};

export const StoryListDividedLayout = ({
  children,
  sectionComponent,
}: StoryListDividedLayoutProps) => {
  const { sectionDivider, itemDivider } = useContext(StoryListDividersContext);

  const childrenArray = Children.toArray(children);

  return (
    <>
      {Children.map(childrenArray, (child, index) => {
        const childSectionType = getStoryListSectionType(child, sectionComponent);
        const previousChildSectionType =
          index > 0
            ? getStoryListSectionType(childrenArray[index - 1], sectionComponent)
            : undefined;

        const isFollowingSection =
          index > 0 && (childSectionType === 'section' || childSectionType === 'sectionWithHeader');
        const isImplicitFollowingSection =
          (previousChildSectionType === 'section' ||
            previousChildSectionType === 'sectionWithHeader') &&
          childSectionType === 'nonSection';

        let childDivider: HRuleProps['variant'];
        if (
          (sectionDivider && childSectionType === 'sectionWithHeader') ||
          isFollowingSection ||
          isImplicitFollowingSection
        ) {
          childDivider = sectionDivider;
        } else if (itemDivider && index > 0 && childSectionType === 'nonSection') {
          childDivider = itemDivider;
        } else {
          childDivider = undefined;
        }

        return (
          <div>
            {childDivider && (
              <HRule
                className={cx(childDividerClass, {
                  [withSectionSpacingClass]: isFollowingSection || isImplicitFollowingSection,
                })}
                variant={childDivider}
              />
            )}
            {child}
          </div>
        );
      })}
    </>
  );
};
