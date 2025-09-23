import React from 'react';
import { styled } from 'pretty-lights';
import { Flex } from '@nyt/foundation';
import { ColorColumn, ContentIcon, ColorItem, StrokeIcon } from './Color.jsx';
import { light } from '../../index.js';

const stripes = [light.colors.background.tertiary.hsla, light.colors.background.primary.hsla];

const TransparentColorItem = styled(ColorItem)(props => ({
  position: 'relative',
  overflow: 'hidden',
  background: `repeating-linear-gradient(-55deg,${stripes[0]},${stripes[0]} 10px,${stripes[1]} 10px,${stripes[1]} 20px)`,
  backgroundRepeat: 'repeat',
  paddingLeft: '20%',
  '::after': {
    content: "''",
    background: props.bg,
    position: 'absolute',
    zIndex: 1,
    left: '13%',
    right: 0,
    top: 0,
    bottom: 0,
  },
  '> *': {
    zIndex: 2,
  },
}));

const StyledFlex = styled(Flex)(props => ({
  background: props.bg,
  color: props.color,
}));

const onColorMap = {
  content: (children, color) => {
    return <ColorItem icon={<ContentIcon color={color.hsla} />}>{children}</ColorItem>;
  },
  stroke: (children, color) => (
    <ColorItem icon={<StrokeIcon color={color.hsla} height="100%" mx={0.5} />}>
      {children}
    </ColorItem>
  ),
  background: (children, color) => {
    const textColor = [
      'background-accent',
      'background-scrim',
      'background-positive',
      'background-negative',
    ].includes(color.name)
      ? 'white'
      : undefined;
    return (
      <TransparentColorItem bg={color.hsla} color={textColor}>
        {children}
      </TransparentColorItem>
    );
  },
};

const TplThemedPalette = ({ theme, exclude }) => {
  return (
    <StyledFlex
      gap={2}
      p={2}
      maxWidth="46rem"
      bg={theme.colors.background.primary.hsla}
      color={theme.colors.content.primary.hsla}
    >
      {['content', 'background', 'stroke'].map(colorKey => {
        return (
          <ColorColumn
            key={colorKey}
            colorSet={theme.colors[colorKey]}
            exclude={exclude}
            title={colorKey}
            onColor={onColorMap[colorKey]}
          />
        );
      })}
    </StyledFlex>
  );
};

export { TplThemedPalette };
