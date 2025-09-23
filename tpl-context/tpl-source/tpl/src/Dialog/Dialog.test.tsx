import React, { useRef } from 'react';
import { fireEvent, getByLabelText, getByTestId, render } from '@testing-library/react';
import './__tests__/HTMLDialogElementMocks.js';
import { Dialog, DialogContent } from './index.js';
import { useDialogState } from './useDialogState.js';

const ModalOpener = () => {
  const { open, setOpen, ref } = useDialogState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Dialog ref={ref} focusOnClose={buttonRef as React.RefObject<HTMLElement>}>
        <DialogContent>Test Dialog</DialogContent>
      </Dialog>
      <button
        aria-disabled={open}
        type="button"
        data-testid="opener"
        ref={buttonRef}
        onClick={() => setOpen(true)}
      >
        Open
      </button>
    </>
  );
};

describe('focusOnClose', () => {
  it('focuses the specified element on close', async () => {
    const { container } = render(<ModalOpener />);
    const xCloseButton = getByLabelText(container, 'Close dialog');
    fireEvent.click(xCloseButton);
    const opener = getByTestId(container, 'opener');

    expect(opener).toEqual(document.activeElement);
  });
});
