import React, { forwardRef } from 'react';
import { cx } from 'pretty-lights';
import {
  Box as FoundationBox,
  BoxProps as FoundationBoxProps,
  ColorBehaviorContext,
  useColorBehaviorContext,
} from '@nyt/foundation';
import { BackgroundColorModifier, colorClass, useTplSxProp } from '../system/index.js';
import { CommonWithAsProps, dataTplAttr, DataTplValue } from '../util/index.js';

interface BoxProps
  extends Omit<FoundationBoxProps, 'sx'>,
    BackgroundColorModifier,
    CommonWithAsProps {}

/**
 * Simple layout helper. Use with Flex to manage a responsive layout
 *
 * @example
 * ```tsx
 * <Box marginRight={3}>{children}</Box>
 * ```
 * ☝️ container with a margin bottom with the third index of the space scale
 *
 * @example
 * ```tsx
 * <Box marginY={[0, 3]} marginLeft={[0, '25px']}>{children}</Box>
 * ```
 * ☝️ Responsively sets the top and bottom margin with marginY and marginLeft
 * marginLeft takes a non-space value after the first breakpoint
 *
 * @example
 * ```tsx
 * <Box bg="secondary">{children}</Box>
 * ```
 * ☝️ Sets the background color to background.secondary
 */
const Box = forwardRef<Element, BoxProps>(
  ({ bg, background, colorBehavior: colorBehaviorProp, className, sx, ...rest }: BoxProps, ref) => {
    const systemClass = useTplSxProp(sx);
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;
    const aliasedBg = bg ?? background;
    const colorClassName = aliasedBg
      ? colorClass(aliasedBg, 'background', colorBehavior)
      : undefined;
    return (
      <ColorBehaviorContext.Provider value={{ colorBehavior }}>
        <FoundationBox
          className={cx(className, colorClassName, systemClass)}
          ref={ref}
          {...{ [dataTplAttr]: DataTplValue.Box, ...rest }}
        />
      </ColorBehaviorContext.Provider>
    );
  }
);

export { Box, BoxProps };
