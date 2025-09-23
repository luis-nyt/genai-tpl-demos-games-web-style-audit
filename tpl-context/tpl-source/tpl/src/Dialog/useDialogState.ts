import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface UseDialogStateProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  ref: RefObject<HTMLDialogElement | null>;
}

/**
 * A custom hook used together with {@link Dialog} to configure the initial visibility of the
 * dialog, show the dialog using reactive state and re-render other components when a user
 * interaction closes or cancels it.
 *
 * @group Dialog
 */
export const useDialogState = (initialOpen = false): UseDialogStateProps => {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpenState] = useState(initialOpen);

  const synchronizeDialog = useCallback(
    (nextOpen: boolean | undefined) => {
      if (!!nextOpen && !open) ref.current?.showModal();
      else if (!nextOpen && !!open) ref.current?.close();
    },
    [ref, open]
  );

  useEffect(() => {
    synchronizeDialog(initialOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialOpen]);

  useEffect(() => {
    const dialog = ref.current;

    const updateState = (e: Event) => {
      if (e.currentTarget instanceof HTMLDialogElement) setOpenState(e.currentTarget.open);
    };

    dialog?.addEventListener('close', updateState);

    return () => dialog?.removeEventListener('close', updateState);
  }, [ref]);

  const setOpen: Dispatch<SetStateAction<boolean>> = useCallback(
    nextValueParam => {
      const nextOpen = typeof nextValueParam === 'function' ? nextValueParam(open) : nextValueParam;

      synchronizeDialog(nextOpen);
      setOpenState(nextOpen);
    },
    [open, synchronizeDialog]
  );

  return { open, setOpen, ref };
};
