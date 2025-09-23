import React, { FC, useContext } from 'react';
import { IconComponentProps, IconProps } from '../../Icon/index.js';
import { StoryListMediaPositionContext } from '../StoryListMediaPositionContext.js';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CaretDownIcon,
  CaretUpIcon,
} from '../../generated/Icons/index.js';

export const PositionAwareIcon = ({ color = 'secondary' }: Pick<IconProps, 'color'>) => {
  const mediaPosition = useContext(StoryListMediaPositionContext);

  let Icon: FC<IconComponentProps>;
  // eslint-disable-next-line default-case
  switch (mediaPosition) {
    case 'leading':
    case 'leadingFullBleed':
      Icon = ArrowRightIcon;
      break;
    case 'trailing':
    case 'trailingFullBleed':
      Icon = ArrowLeftIcon;
      break;
    case 'top':
    case 'topFullBleed':
      Icon = ArrowDownIcon;
      break;
    case 'bottom':
    case 'bottomFullBleed':
      Icon = ArrowUpIcon;
      break;
    case 'posterTop':
      Icon = CaretUpIcon;
      break;
    case 'posterBottom':
      Icon = CaretDownIcon;
      break;
  }

  return <Icon color={color} aria-hidden />;
};
