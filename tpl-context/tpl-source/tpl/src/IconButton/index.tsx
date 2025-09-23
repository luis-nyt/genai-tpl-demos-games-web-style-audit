import React, { forwardRef } from 'react';
import { cx } from 'pretty-lights';
import { useColorBehaviorContext } from '@nyt/foundation';
import { BaseButtonOverload, BaseButtonHeight, BaseButtonProps } from '../BaseButton/index.js';
import { Button, ButtonStyledProps } from '../Button/index.js';
import colorBehaviorStyles from './colorBehaviorStyles.js';
import { iconButton } from './styled.js';
import * as weights from './weights.js';
import { dataTplAttr, DataTplValue } from '../util/index.js';

export interface IconButtonStyledProps extends Omit<ButtonStyledProps, 'height' | 'weight'> {
  height?: BaseButtonHeight;
  weight?: keyof typeof weights;
}

export type IconButtonProps = BaseButtonProps<IconButtonStyledProps>;

export const IconButton: BaseButtonOverload<IconButtonStyledProps> = forwardRef<
  HTMLAnchorElement | HTMLButtonElement
>(
  (
    {
      className,
      colorBehavior: colorBehaviorProp,
      height = 'standard',
      weight = 'regular',
      ...rest
    }: IconButtonProps,
    ref
  ) => {
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;

    return (
      <Button
        // @ts-expect-error
        ref={ref}
        className={cx(iconButton, colorBehaviorStyles[colorBehavior], weights[weight], className)}
        /** The underlying styles support 'expanded', but Button's type definitions do not */
        height={height as any}
        colorBehavior={colorBehavior}
        {...{ [dataTplAttr]: DataTplValue.IconButton, ...rest }}
      />
    );
  }
);
