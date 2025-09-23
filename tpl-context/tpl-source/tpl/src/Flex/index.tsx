import React, { forwardRef } from 'react';
import { cx } from 'pretty-lights';
import {
  FlexProps as FoundationFlexProps,
  Flex as FoundationFlex,
  useColorBehaviorContext,
  ColorBehaviorContext,
} from '@nyt/foundation';
import { BackgroundColorModifier, colorClass } from '../system/index.js';
import { CommonWithAsProps, dataTplAttr, DataTplValue } from '../util/index.js';

interface FlexProps
  extends Omit<FoundationFlexProps, 'sx'>,
    BackgroundColorModifier,
    CommonWithAsProps {}

/**
 * Simple flexbox layout helper, extending Box
 *
 * @example
 * ```tsx
 * const boxProps = {flex: ['100%', 1]}
 * <Flex marginBottom={4} flexWrap={['wrap', 'nowrap']}>
 *   <Box {...boxProps}>
 *     {content}
 *   </Box>
 *   <Box {...boxProps}>
 *     {moreContent}
 *   </Box>
 * </Flex>
 * ```
 */
const Flex = forwardRef<Element, FlexProps>(
  ({ bg, background, colorBehavior: colorBehaviorProp, className, ...rest }, ref) => {
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;
    const aliasedBg = bg ?? background;
    const colorClassName = aliasedBg
      ? colorClass(aliasedBg, 'background', colorBehavior)
      : undefined;

    return (
      <ColorBehaviorContext.Provider value={{ colorBehavior }}>
        <FoundationFlex
          className={cx(className, colorClassName)}
          ref={ref}
          {...{ [dataTplAttr]: DataTplValue.Flex, ...rest }}
        />
      </ColorBehaviorContext.Provider>
    );
  }
);

export { Flex, FlexProps };
