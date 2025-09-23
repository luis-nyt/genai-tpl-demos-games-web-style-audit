import React, { forwardRef } from 'react';
import { cx } from 'pretty-lights';
// eslint-disable-next-line no-restricted-imports
import { ColorBehaviorContext, ColorBehaviorProps, useColorBehaviorContext } from '@nyt/foundation';
import {
  BaseButton,
  BaseButtonOverload,
  BaseButtonProps,
  BaseButtonHeight,
} from '../BaseButton/index.js';
import { textButton } from './styled.js';
import colorBehaviorStyles from './colorBehaviorStyles.js';
import * as heights from './heights.js';
import { dataTplAttr, DataTplValue } from '../util/index.js';

export interface TextButtonStyledProps extends ColorBehaviorProps {
  height?: Exclude<BaseButtonHeight, 'expanded'>;
}

export type TextButtonProps = BaseButtonProps<TextButtonStyledProps>;

export const TextButton: BaseButtonOverload<TextButtonStyledProps> = forwardRef<
  HTMLAnchorElement | HTMLButtonElement
>(
  (
    { className, colorBehavior: colorBehaviorProp, height = 'standard', ...rest }: TextButtonProps,
    ref
  ) => {
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;

    return (
      <ColorBehaviorContext.Provider value={{ colorBehavior }}>
        <BaseButton
          // @ts-expect-error
          ref={ref}
          className={cx(textButton, heights[height], colorBehaviorStyles[colorBehavior], className)}
          height={height}
          {...{ [dataTplAttr]: DataTplValue.TextButton, ...rest }}
        />
      </ColorBehaviorContext.Provider>
    );
  }
);
