import React, { forwardRef } from 'react';
import { cx, css } from 'pretty-lights';
import type { Property } from 'csstype';
import { Flex, FlexProps } from '../Flex/index.js';
import { dataTplAttr, DataTplValue } from '../util/index.js';

interface SwitcherProps extends FlexProps {
  /**
   * minimum width of the element for child elements to switch layouts.
   * below this width, the child elements will stack vertically; above this width child elements will form a flex row.
   */
  switchWidth?: Property.Width | boolean;
}

const switcherClass = css({
  flexWrap: 'wrap',

  '& > *': {
    flexBasis: 'calc((var(--switch-width) - 100%) * 999)',
  },
});

/**
 * Minimal implementation of Switcher component inspired by _Every Layout_
 *
 * This is a way to achieve container queries in a cross-browser way.
 *
 * Child elements are stacked (wrapped) by default but then switch to a flex row layout if the container exceeds the width
 * specified by the switchWidth prop.
 *
 * @see https://every-layout.dev/layouts/switcher/
 * @see https://every-layout.dev/demos/switcher-basic/
 */
const Switcher = forwardRef<Element, SwitcherProps>(
  ({ className, switchWidth, style: styleProp, ...rest }, ref) => {
    const style = { ...styleProp };
    /** Only set `--switch-width` if the value is truthy; also, use `true` to force "always wrap" */
    if (switchWidth) style['--switch-width'] = switchWidth === true ? '9999px' : switchWidth;

    return (
      <Flex
        ref={ref}
        className={cx({ [switcherClass]: !!switchWidth }, className)}
        style={style}
        {...{ [dataTplAttr]: DataTplValue.Switcher, ...rest }}
      />
    );
  }
);

export { Switcher, SwitcherProps };
