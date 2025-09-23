import React, { forwardRef } from 'react';
import { css, cx } from 'pretty-lights';
import { RowHeader } from './RowHeader.js';
import { Box, BoxProps } from '../Box/index.js';

interface RowGroupProps extends BoxProps {
  /** Optional header text to render above all Rows in the group. */
  header?: React.ReactNode;
  /** Optionally change which HTML element we render the `Row.Header` as. */
  headerAs?: keyof React.JSX.IntrinsicElements;
  /** Whether to show or hide the rule that appears above the header text (if provided). */
  headerTopRule?: boolean;
}

const listClass = css({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

/**
 * `Row.Group` is a subcomponent of `Row`, used to display a collection of `Row` components.
 */
const RowGroup = forwardRef<Element, RowGroupProps>(
  (
    { as: asProp, children: childrenProp, className, header, headerAs, headerTopRule, ...rest },
    ref
  ) => {
    const as = asProp ?? (header ? 'dl' : 'ul');

    /** When `label` is set, we render a `<dl>` and thus, wrap `children` in a `<dd>` and `<ul>` */
    const children =
      as === 'dl' ? (
        <dd className={listClass}>
          <ul className={listClass}>{childrenProp}</ul>
        </dd>
      ) : (
        childrenProp
      );

    return (
      <Box as={as} className={cx(listClass, className)} ref={ref} {...rest}>
        {header && (
          <dt>
            <RowHeader as={headerAs} topRule={headerTopRule}>
              {header}
            </RowHeader>
          </dt>
        )}
        {children}
      </Box>
    );
  }
);

export { RowGroup, RowGroupProps };
