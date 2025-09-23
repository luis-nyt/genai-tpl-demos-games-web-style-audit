import React, { forwardRef } from 'react';
import { cx } from 'pretty-lights';
import { BaseButtonOverload, BaseButtonProps, BaseButtonHeight } from '../BaseButton/index.js';
import { TextButton, TextButtonStyledProps } from '../TextButton/index.js';
import { button } from './styled.js';
import * as heights from './heights.js';
import * as weights from './weights.js';
import { dataTplAttr, DataTplValue } from '../util/index.js';

export type ButtonWeight = keyof typeof weights;

export interface ButtonStyledProps extends Omit<TextButtonStyledProps, 'height'> {
  height?: Exclude<BaseButtonHeight, 'extraCompact' | 'expanded'>;
  weight?: ButtonWeight;
}

export type ButtonProps = BaseButtonProps<ButtonStyledProps>;

/**
 * @see BaseButton
 * @see TextButton
 */
export const Button: BaseButtonOverload<ButtonStyledProps> = forwardRef<
  HTMLAnchorElement | HTMLButtonElement
>(({ className, height = 'standard', weight = 'standard', ...rest }: ButtonProps, ref) => (
  <TextButton
    // @ts-expect-error
    ref={ref}
    className={cx(button, heights[height], weights[weight], className)}
    height={height}
    {...{ [dataTplAttr]: DataTplValue.Button, ...rest }}
  />
));
