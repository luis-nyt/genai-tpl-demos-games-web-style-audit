import React, { ForwardedRef, forwardRef } from 'react';
import { cx } from 'pretty-lights';
import {
  ColorBehaviorContext,
  ColorBehavior,
  spaceScale,
  useColorBehaviorContext,
} from '@nyt/foundation';

import { Flex } from '../Flex/index.js';
import { Text } from '../Typography/index.js';
import { useTplSxProp } from '../system/index.js';
import { visuallyHidden, dataTplAttr, DataTplValue, CommonProps } from '../util/index.js';
import colorBehaviorStyles from './colorBehaviorStyles.js';
import { contentClass, dialogBodyClass, dialogClass } from './styled.js';

export * from './toastStyle.js';

/**
 * @Group Toast
 */
export interface ToastProps
  extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'style' | 'title'>,
    CommonProps {
  /**
   * Represents an optional action button to display in your toast for convenience.
   * Ensure the action can also be performed elsewhere and keep the label short.
   */
  action?: React.ReactNode;
  /**
   * The text displayed by the Toast. It also acts as the announcement for screen reader users.
   */
  children?: React.ReactNode;
  /**
   * The text that will be announced by the screen reader when the toast is announced. Defaults to children if the content is a string.
   */
  toastVisibilityAnnouncement?: string;
}

/**
 * Toast is a messaging component that announces a change of status. It is often used to acknowledge or confirm an action.
 *
 * Toast is based on the HTML `<dialog>` element and provides a custom hook, named `useToastState`, to show the toast non-modally on a timer that will auto close it.
 *
 * For example, this is how you'd display a given toast for 1 second:
 *
 * ```tsx
 *  const { showToast, shown } = useToastState();
 *
 *  return (
 *    <>
 *      <Button onClick={() => showToast()}>
 *        Show Toast
 *      </Button>
 *      <Toast open={shown}>
 *        Lorem ipsum
 *      </Toast>
 *    </>
 *  );
 * ```
 *
 * @Group Toast
 */
export const Toast = forwardRef(
  (
    {
      action,
      className,
      children,
      colorBehavior: colorBehaviorProp,
      sx,
      toastVisibilityAnnouncement,
      ...rest
    }: ToastProps,
    ref: ForwardedRef<HTMLDialogElement>
  ) => {
    const systemClass = useTplSxProp(sx);

    /** Either directly use the `colorBehavior` prop, or use the inverse of `colorBehaviorContext` */
    let colorBehavior: ColorBehavior;
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    if (colorBehaviorProp) colorBehavior = colorBehaviorProp;
    else if (colorBehaviorContext === 'userDefault') colorBehavior = 'userInverse';
    else if (colorBehaviorContext === 'alwaysLight') colorBehavior = 'alwaysDark';
    else if (colorBehaviorContext === 'alwaysDark') colorBehavior = 'alwaysLight';
    else colorBehavior = 'userDefault';

    const contentA11yAnnouncement = typeof children === 'string' ? children : 'Toast alert';

    return (
      <ColorBehaviorContext.Provider value={{ colorBehavior }}>
        <dialog
          role="alert"
          aria-live="polite"
          ref={ref}
          className={cx(dialogClass, className, systemClass)}
          {...{ [dataTplAttr]: DataTplValue.Toast, ...rest }}
          {...rest}
        >
          <Flex
            alignItems="center"
            gap={spaceScale.get(2)}
            className={cx(dialogBodyClass, colorBehaviorStyles[colorBehavior])}
            aria-hidden
          >
            <Text className={contentClass} size={14} color="primary">
              {children}
            </Text>
            {action}
          </Flex>
          <span className={visuallyHidden}>
            {toastVisibilityAnnouncement ?? contentA11yAnnouncement}
          </span>
        </dialog>
      </ColorBehaviorContext.Provider>
    );
  }
);
