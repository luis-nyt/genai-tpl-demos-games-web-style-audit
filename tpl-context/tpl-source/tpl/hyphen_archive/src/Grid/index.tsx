import * as React from 'react';
import { css, cx } from 'pretty-lights';
import { ReactProps, spaceScale, Box, BoxProps, useBreakpointContext } from '@nyt/foundation';
import { pageMargin as pageMarginValue } from '../tokens';
import { useResponsivePropToClass } from '../../../src/util';

type ColumnWidth = 1 | 2 | 3 | 4 | 5 | 6;

interface GridProps extends ReactProps {
  /**
   * a 5% margin is expected to be added to all pages using hyphen
   * add this prop to ensure that this enforced when Grid is used as top level page container.
   */
  pageMargin: boolean;
}

interface GridItemProps extends BoxProps {
  /**
   * this sets a span on the grid-column property for the Grid.Item.
   * Hyphen uses a 6-column grid. 1 span unit = 1/6th of the width of the containing Grid.
   * Only applies to medium breakpoint and above.
   * A set of Grid.Items whose cumulative span values exceed 6 will wrap onto a new line. Grid.Items
   * will not grow to fit the Grid width.
   */
  span?: ColumnWidth;
  /**
   * Similar to to the span prop but overrides the span value at the large breakpoint.
   */
  spanLg?: ColumnWidth;
  /**
   * Maps to css grid's order property. This can be an array for responsive values
   */
  order?: number | (number | null)[];
}

const useStyledGridItemClass = ({ span, spanLg }: Pick<GridItemProps, 'span' | 'spanLg'>) => {
  const breakpoints = useBreakpointContext();
  const spanValues = [span, spanLg];

  return css`
    flex: 1;

    ${breakpoints
      .map((bp, index) => spanValues[index] && `${bp} { grid-column: span ${spanValues[index]} }`)
      .join(';')}
  `;
};

const useGridClass = () => {
  const breakpoints = useBreakpointContext();

  return css`
    display: grid;
    margin-left: auto;
    margin-right: auto;

    ${breakpoints[0]} {
      grid-template-columns: repeat(6, 1fr);
      column-gap: ${spaceScale.get(2)};
    }
  `;
};

const pageMarginClass = css`
  padding: 0 ${pageMarginValue};
`;

const Grid = ({ children, className, pageMargin }: GridProps): JSX.Element => {
  const gridClass = useGridClass();

  return (
    <div className={cx(gridClass, { [pageMarginClass]: pageMargin }, className)}>{children}</div>
  );
};

const GridItem = ({
  children,
  span = 6,
  spanLg,
  className,
  order,
  ...rest
}: GridItemProps): JSX.Element => {
  const orderClass = useResponsivePropToClass('order', order);
  const styledGridItemClass = useStyledGridItemClass({ span, spanLg });

  return (
    <Box className={cx(styledGridItemClass, { [orderClass]: !!order }, className)} {...rest}>
      {children}
    </Box>
  );
};

// necessary for Storybook argstable gen
Grid.displayName = 'Grid';

GridItem.displayName = 'Grid.Item';

Grid.Item = GridItem;

export { Grid, GridItem, GridProps, GridItemProps };
