import React, {
  forwardRef,
  ForwardedRef,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useRef,
  SyntheticEvent,
  MouseEventHandler,
} from 'react';
import { cx } from 'pretty-lights';
import { ColorBehaviorContext, useColorBehaviorContext } from '@nyt/foundation';
import { Button } from '../Button/index.js';
import {
  closeBtnClass,
  rootClass,
  rootWithTransitionClass,
  actionSlotClass,
  contentSlotClass,
  closeBtnOnMediaClass,
  containerClass,
  mediaSlotClass,
  contentSlotWithTrailingPaddingClass,
} from './styled.js';
import { CloseIcon } from '../generated/Icons/index.js';
import { Flex } from '../Flex/index.js';
import { IconButton } from '../IconButton/index.js';
import { useTplSxProp } from '../system/index.js';
import colorBehaviorStyles from './colorBehaviorStyles.js';
import { CommonProps, dataTplAttr, DataTplValue } from '../util/index.js';

/**
 * Re: `closedby` and cancellation
 *
 * - https://stackoverflow.com/questions/61021135/prevent-dialog-from-closing-on-keydown-esc-in-chrome#comment139095514_61021326
 * - https://issues.chromium.org/issues/346597066
 * - https://issues.chromium.org/issues/41491338
 * - https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/closedBy#browser_compatibility
 * - https://bugzil.la/1964077
 */

/**
 * @group Dialog
 */
export interface DialogProps<FocusOnCloseElement extends HTMLElement = HTMLElement>
  extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'open' | 'style'>,
    CommonProps {
  /**
   * Represents the action buttons to display within the dialog. Buttons must use an `onClick`
   * event handler to close the dialog.
   */
  actions?: ReactNode;
  /**
   * The text content for the dialog. Use {@link DialogContent} to render label, title and
   * description text with the default layout, or provide your own custom layout.
   */
  children?: ReactNode;
  /**
   * An event handler called when the user clicks the "X" close button. Responsible for closing the
   * dialog.
   */
  closeButtonAction?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Specifies the types of user actions that can be used to close the `<dialog>` element.
   *
   * 🧪 **Experimental. Expect behavior to change in the future.**
   *
   * Possible values are:
   *
   * - `any`: The dialog can be dismissed using any of the three methods.
   * - `closerequest`: The dialog can be dismissed with a platform-specific user action or a developer-specified mechanism.
   * - `none`: The dialog can only be dismissed with a developer-specified mechanism.
   *
   * **Warning:** As of this writing, only Google Chrome has full support for [`closedby`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby).
   * Thus, if your dialog requires a user choice to continue:
   *
   * - Ensure you actually get a response; don't assume the user has made a choice just because the dialog has closed.
   * - Implement some way, user-driven or otherwise, to re-open the dialog.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby
   */
  closedBy?: 'any' | 'closerequest' | 'none';
  /**
   * Handles closing the dialog by any means, such as clicking an action button, pressing the "X"
   * close button or pressing `Esc` on the keyboard.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/returnValue
   */
  onClose?: (e: SyntheticEvent<HTMLDialogElement>) => void;
  /**
   * Reference to an element to return focus to after closing the dialog. Useful for modals that are open by default, where the browser had no chance to store the dialog's invoker.
   */
  focusOnClose?: RefObject<FocusOnCloseElement>;
  /**
   * An event handler fired when closing the dialog when pressing `Esc` on the keyboard.
   *
   * **Note:** Pressing `Esc` on the keyboard also fires the `close` event.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event
   */
  onCancel?: (e: SyntheticEvent<HTMLDialogElement>) => void;
  /**
   * An image, animation or other promotional visual. Appears at the top of the dialog with the "X"
   * close button overlaid in the top right corner.
   */
  media?: ReactNode;
  /**
   * Whether to use an animated transition when showing and closing the dialog. May have visual
   * issues when closing in some browsers as of this writing.
   */
  transition?: boolean;
}

/**
 * Dialog is a messaging tool used to promote or direct users to something new.
 *
 * Dialog is used for a wide variety of editorial and non-editorial product announcements, such as new features and podcast seasons.
 *
 * It may contain `children` (e.g. a title, label and description), `media` (such as an image or animation) and `actions` in the form of buttons (maximum of 2).
 *
 * Use the `children` prop and [DialogContent](?path=/docs/dialog-dialogcontent--docs) to render text with the default layout, or provide your own custom layout.
 *
 * If no `actions` prop is provided, the dialog displays a default 'Got it' button that closes the dialog.
 *
 * You can also style some of the dialog's visual details.
 *
 * ## Managing state
 *
 * Dialog is based on the HTML `<dialog>` element and works in tandem with a React custom hook we
 * provide named `useDialogState`. Use this hook to configure the initial visibility of the dialog,
 * show the dialog using reactive state and re-render other components when a user interaction
 * closes or cancels it.
 *
 * ```tsx
 * const MyComponent = () => {
 *   const { open, setOpen, ref } = useDialogState(false);
 *
 *   return (
 *     <Dialog ref={ref}>
 *       <DialogContent>
 *         This is a very basic dialog with a title, default "Got it" button and default "X" close
 *         button.
 *       </DialogContent>
 *     </Dialog>
 *   );
 * };
 * ```
 *
 * ## Restoring keyboard focus on close
 *
 * We recommend using the `focusOnClose` prop to return keyboard focus to an element of your
 * choosing when the user closes the dialog. For example, if we rendered a button that opens a
 * dialog on click, we can return focus to that button upon close.
 *
 * **Note:** If you restore focus to a form element whose `disabled` attribute is set to `true`
 * while the dialog is open, use `aria-disabled` instead. Disabled form elements _cannot_ be
 * focused, and React may not re-render the element in time for it to receive focus using this
 * technique. Elements with `aria-disabled` retain the ability to receive focus.
 *
 *  ## Accessibility Guidance
 *
 * Buttons shouldn’t have text that reads, “Open Dialog.” Instead, they should have a label with the action we expect (“Subscribe” or “Log in”), and we need to provide tools such as screen readers and other assistive technologies with context that a dialog is going to be opened. This can be achieved by adding ⁠`aria-haspopup=“dialog”` to the dialog trigger.
 * For example, if the button text is “Subscribe to Unlock,” a screen reader would announce something like, “Subscribe to Unlock, dialog popup, button.” This helps the user clearly understand the expectations of pressing this button: that it will open a dialog, they will be focus-trapped in the dialog, and they can use the ⁠`Esc` key to close it.
 *
 *
 * @group Dialog
 *
 * @see {@link useDialogState}
 * @see {@link createDialogStyleClass}
 */
export const Dialog = forwardRef(
  <FocusOnCloseElement extends HTMLElement = HTMLElement>(
    {
      actions,
      children,
      className,
      colorBehavior: colorBehaviorProp,
      focusOnClose,
      closeButtonAction,
      closedBy,
      media,
      onClose,
      sx,
      transition,
      ...rest
    }: DialogProps<FocusOnCloseElement>,
    ref: ForwardedRef<HTMLDialogElement>
  ) => {
    const systemClass = useTplSxProp(sx);
    const innerRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => innerRef.current!);

    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;

    const close = () => innerRef.current?.close();

    /**
     * Hide the "X" close button when the `closedBy` prop is set to 'none', which means:
     * > The dialog can only be dismissed with a developer-specified mechanism.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#:~:text=The%20dialog%20can%20only%20be%20dismissed%20with%20a%20developer%2Dspecified%20mechanism.
     */
    const hasCloseButton = closedBy !== 'none';

    return (
      <ColorBehaviorContext.Provider value={{ colorBehavior }}>
        <dialog
          ref={innerRef}
          className={cx(
            className,
            rootClass,
            { [rootWithTransitionClass]: transition },
            colorBehaviorStyles[colorBehavior],
            systemClass
          )}
          onClose={e => {
            focusOnClose?.current?.focus();
            onClose?.(e);
          }}
          {...{ closedby: closedBy, [dataTplAttr]: DataTplValue.Dialog, ...rest }}
        >
          {hasCloseButton && (
            <IconButton
              onClick={closeButtonAction ?? close}
              value="Close dialog"
              aria-label="Close dialog"
              height="compact"
              icon={CloseIcon}
              weight="light"
              colorBehavior={media ? 'alwaysDark' : undefined}
              className={cx(closeBtnClass, {
                // TODO: Remove after implementing full TPL on-media Button support
                [closeBtnOnMediaClass]: !!media,
              })}
            />
          )}

          {/* TODO: Use `<form method="dialog">` for declarative action buttons in the future */}
          <div className={containerClass}>
            <Flex
              className={cx(contentSlotClass, {
                // TODO: Add support for `style.automaticContentPadding`
                [contentSlotWithTrailingPaddingClass]: !media && hasCloseButton,
              })}
              flexDirection="column"
            >
              {children}
            </Flex>

            {/* Out-of-order to influence keyboard focus order */}
            {media && <div className={mediaSlotClass}>{media}</div>}

            <Flex className={actionSlotClass}>
              {actions || (
                <Button height="compact" onClick={hasCloseButton ? close : undefined}>
                  Got it
                </Button>
              )}
            </Flex>
          </div>
        </dialog>
      </ColorBehaviorContext.Provider>
    );
  }
);
