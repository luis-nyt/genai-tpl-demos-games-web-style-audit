import React, { Children, forwardRef, isValidElement } from 'react';
import { cx } from 'pretty-lights';
import { ColorBehaviorContext, useColorBehaviorContext } from '@nyt/foundation';
import { CaretRightIcon } from '../generated/Icons/index.js';
import { IconButton } from '../IconButton/index.js';
import { LinkBox } from '../LinkBox/index.js';
import { HRule } from '../Rule/index.js';
import { Switcher, SwitcherProps } from '../Switcher/index.js';
import { rowColorBehaviorStyles, ruleColorBehaviorStyles } from './colorBehaviorStyles.js';
import { RowDescription } from './RowDescription.js';
import { RowGroup } from './RowGroup.js';
import { RowHeader } from './RowHeader.js';
import { RowLabel } from './RowLabel.js';
import {
  contentAndSwitcherClass,
  leadingClass,
  navIconButtonClass,
  rowClass,
  trailingClass,
} from './styled.js';
import { Box, BoxProps } from '../Box/index.js';

interface RowProps extends BoxProps {
  /**
   * Slot at the center of the Row. Use for main content; specifically, use Row's subcomponents
   * `Row.Label` and `Row.Description`, along with other arbitrary React elements.
   */
  children?: React.ReactNode;
  /**
   * Slot at the start of the Row. Use for icons and other graphical elements.
   */
  leading?: React.ReactNode;
  /**
   * Enable "nav" mode on the Row component, which automatically renders a right-facing caret icon
   * in the trailing slot. Use `LinkBox.Link` within the center slot to designate the link content.
   */
  nav?: boolean;
  /**
   * Whether to vertically stack the trailing slot content below the center slot. Can be set to
   * `true` (always stack), `false` (never stack), or any CSS length (e.g. `'30rem'`) to "auto"
   * stack once the Row layout reaches a certain minimum width.
   *
   * Note: When the `nav` prop is `true`, we ignore the `switchWidth` and `trailing` props.
   */
  switchWidth?: SwitcherProps['switchWidth'];
  /** Whether to show or hide the horizontal rule that appears above the Row. */
  topRule?: boolean;
  /**
   * Slot at the end of the Row. Use for calls to action/interactive elements.
   *
   * Note: When the `nav` prop is `true`, we ignore the `switchWidth` and `trailing` props.
   */
  trailing?: React.ReactNode;
}

/**
 * Determines if the `children` prop contains a React element rendered by the `Row.Description`
 * component. We use this to automatically adjust Row's flexbox `align-items` property.
 */
const hasDescription = (children: React.ReactNode): boolean =>
  !!Children.toArray(children).find(
    child =>
      isValidElement(child) &&
      /** @see https://stackoverflow.com/a/55729636 */
      child.type === RowDescription
  );

const RowComponent = forwardRef<Element, RowProps>(
  (
    {
      as = 'li',
      children,
      className,
      colorBehavior: colorBehaviorProp,
      leading,
      nav,
      switchWidth: switchWidthProp = '16rem', // 256px
      style,
      sx,
      topRule = true,
      trailing: trailingProp,
      ...rest
    },
    ref
  ) => {
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;

    let Component: typeof Box | typeof LinkBox;
    let switchWidth: SwitcherProps['switchWidth'];
    let trailing: React.ReactNode | null | undefined;

    if (nav) {
      Component = LinkBox;
      /** In "nav" mode, disable the Switcher's behavior (and ignore the `switchWidth` prop) */
      switchWidth = false;
      /**
       * "Nav" trailing slot: render an `IconButton` with right-facing caret icon as a signifier,
       * (and ignore the `trailing` prop)
       */
      trailing = (
        <IconButton
          className={navIconButtonClass}
          height="compact"
          icon={CaretRightIcon}
          aria-hidden
          tabIndex={-1}
        />
      );
    } else {
      Component = Box;
      switchWidth = switchWidthProp;
      trailing = trailingProp;
    }

    /**
     * Set Row's flexbox `align-items` property based on whether `children` contains a
     * `Row.Description` element.
     */
    const alignItems = hasDescription(children) ? 'flex-start' : 'center';

    return (
      <ColorBehaviorContext.Provider value={{ colorBehavior }}>
        {topRule && <HRule className={ruleColorBehaviorStyles[colorBehavior]} variant="tertiary" />}

        <Component
          as={as}
          className={cx(rowClass, rowColorBehaviorStyles[colorBehavior], className)}
          style={{ alignItems, ...style }}
          ref={ref}
          {...rest}
        >
          {leading && <div className={leadingClass}>{leading}</div>}

          <Switcher className={contentAndSwitcherClass} switchWidth={switchWidth}>
            <div className={contentAndSwitcherClass}>{children}</div>
            {trailing && <div className={trailingClass}>{trailing}</div>}
          </Switcher>
        </Component>
      </ColorBehaviorContext.Provider>
    );
  }
);

/**
 * The Row component is used to clearly display information in single-column lists. They can
 * optionally include Buttons, description text, icons and media by using the `leading`, `trailing`
 * and React-standard `children` props as "slots".
 *
 * See also: [TPL's Row docs in Coda](https://coda.io/d/Times-Product-Language-TPL_dH9ZFEaJR9I/Row-WIP_sukOv#_luxzx).
 *
 * ## Subcomponents
 *
 * - `Row.Label`* renders the Row's primary text content
 * - `Row.Description`* renders secondary description text
 * - `Row.Group` displays a collection of `Row` components with optional heading
 * - `Row.Header` renders the group heading on its own, for cases where you need to customize group rendering
 *
 * \* Render these subcomponents as child elements of Row itself (via the React `children` prop).
 *
 * ## "Nav" Mode
 * Set the `nav` prop to `true` and use `LinkBox.Link` within the center slot to render a Row
 * component in "nav" mode. Use this configuration when a Row links to a different web page.
 *
 * When rendered in "nav" mode:
 *
 * - The text within the `LinkBox.Link` component is read to screen readers
 * - The entire Row is focusable and clickable
 * - We ignore the `switchWidth` and `trailing` props
 * - We automatically add a right-facing caret icon to the trailing slot
 *
 * ## Icon and Media Size Guidelines
 * When rendering a TPL Icon component in the `leading` slot, we recommend using `size={24}`.
 *
 * For custom media in the `leading` slot, such as a thumbnail, we recommend a 64×64 graphic.
 */
// @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-894053907
const Row = Object.assign(RowComponent, {
  Description: RowDescription,
  Group: RowGroup,
  Header: RowHeader,
  Label: RowLabel,
});

export { Row, RowProps };
