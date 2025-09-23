import React, { useContext } from 'react';
import type { Property } from 'csstype';
import { StoryListMediaPositionContext } from '../StoryListMediaPositionContext.js';
import { Flex, FlexProps } from '../../Flex/index.js';

export const PositionAwareMediaPlaceholder = ({ children, style, ...rest }: FlexProps) => {
  const mediaPosition = useContext(StoryListMediaPositionContext);

  let size: string | undefined;
  // eslint-disable-next-line default-case
  switch (mediaPosition) {
    case 'leading':
    case 'leadingFullBleed':
    case 'trailing':
    case 'trailingFullBleed':
      size = '7.5rem';
      break;
    case 'top':
    case 'topFullBleed':
    case 'bottom':
    case 'bottomFullBleed':
    case 'posterTop':
    case 'posterBottom':
      size = '100%';
      break;
  }

  let aspectRatio: Property.AspectRatio;
  // eslint-disable-next-line default-case
  switch (mediaPosition) {
    case 'leading':
    case 'leadingFullBleed':
    case 'trailing':
    case 'trailingFullBleed':
      aspectRatio = '1';
      break;
    case 'top':
    case 'topFullBleed':
    case 'bottom':
    case 'bottomFullBleed':
      aspectRatio = '3 / 2';
      break;
    case 'posterTop':
    case 'posterBottom':
      aspectRatio = '3 / 4';
      break;
  }

  return (
    <Flex
      bg="tertiary"
      alignItems="center"
      justifyContent="center"
      width={size}
      style={{ aspectRatio, ...style }}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export const fullMoonGradient =
  'radial-gradient(circle closest-side, #fff 1%, rgb(230,219,216) 50%, rgb(125,125,136) 63%, rgb(36,52,78) 100%)';

export const FullMoonArtwork = ({ style, ...rest }: FlexProps) => (
  <PositionAwareMediaPlaceholder
    role="img"
    aria-label="A placeholder piece of artwork that displays a radial gradient resembling a full moon."
    style={{ background: fullMoonGradient, ...style }}
    {...rest}
  />
);
