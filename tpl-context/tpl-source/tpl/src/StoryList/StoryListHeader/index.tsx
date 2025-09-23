import React from 'react';
import { useColorBehaviorContext } from '@nyt/foundation';
import { cx } from 'pretty-lights';
import { Box } from '../../Box/index.js';
import { colorClass } from '../../system/index.js';
import { CommonProps } from '../../util/index.js';
import { rootClass } from './styled.js';

/**
 * Props for the {@link StoryListHeader} component.
 *
 * @group Story List
 */
export interface StoryListHeaderProps extends CommonProps {}

/**
 * A view representing {@link StoryListSection}’s optional header text.
 *
 * Includes built-in padding, but does _not_ include the section’s horizontal rule.
 *
 * ## See Also
 *
 * - {@link StoryListSection}
 *
 * @group Story List
 */
export const StoryListHeader = ({
  children,
  className,
  colorBehavior: colorBehaviorProp,
}: StoryListHeaderProps) => {
  const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
  const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;

  return (
    <Box className={cx(rootClass, colorClass('primary', 'content', colorBehavior), className)}>
      {children}
    </Box>
  );
};
