import React from 'react';
import { Box, FlexProps, spaceScale } from '@nyt/foundation';
import { cx, css } from 'pretty-lights';
import { HRule } from '../../../src/Rule';
import { Switcher } from '../Switcher';

interface ListItemProps extends Pick<FlexProps, 'flexDirection'> {
  /**
   * Advanced: overwrite the container element (immediate descendent of li)
   */
  Container?: ({ children }) => JSX.Element;
  children: JSX.Element | JSX.Element[];
  /**
   * slot at start of list item. Use for icons and other graphical elements
   */
  start?: JSX.Element;
  /**
   * slot at end of list item. Use for calls to action/interactive elements
   */
  end?: JSX.Element;
  className?: string;
  /**
   * minimum width of the element for child elements to switch layouts.
   * below this width, the child elements will stack vertically; above this width child elements will form a flex row.
   * @see https://foundation.nyt.net/?path=/docs/components-switcher--default-story
   */
  switchWidth?: string;
}

const startClass = css({
  '&:is(div)': {
    flex: '0 0',
  },
});

const endClass = css({
  /* Give this bad boy a tiny flex-grow so it still grows after Switcher gives is a stacked layout but still
   presents as flex-grow: 0 in a row layout. */
  '&:is(div)': {
    flexGrow: '0.01',
  },
});

const liClass = css({
  listStyleType: 'none',
});

const containerProps = {
  gap: spaceScale.get(1.5),
  justifyContent: 'space-between',
};

const ListItem = ({
  Container: ContainerProp,
  children,
  className,
  start,
  end,
  switchWidth,
  flexDirection,
}: ListItemProps) => {
  const Container =
    ContainerProp ??
    (props => (
      <Switcher
        {...containerProps}
        switchWidth={!flexDirection ? switchWidth : undefined}
        flexDirection={flexDirection}
      >
        {props.children}
      </Switcher>
    ));
  return (
    <Box as="li" pb={2} className={cx(liClass, className)}>
      <HRule variant="tertiary" mb={2} />
      <Container>
        {start && <div className={startClass}>{start}</div>}
        <Box>{children}</Box>
        {end && <div className={endClass}>{end}</div>}
      </Container>
    </Box>
  );
};

/**
 * displayName must be assigned using assign method.
 * @ see https://github.com/storybookjs/storybook/issues/15401
 */
Object.assign(ListItem, {
  displayName: 'Link.Item',
});

export { ListItem, ListItemProps };
