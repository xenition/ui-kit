import * as React from 'react';

/**
 * Shared dismiss behavior for click-outside overlays (Popover, Menu, Popconfirm).
 * Attach the returned ref to the overlay container; when `open`, an outside
 * mousedown or the Escape key calls `onDismiss`.
 */
export function useDismiss<T extends HTMLElement = HTMLDivElement>(
  open: boolean,
  onDismiss: () => void
): React.RefObject<T> {
  const ref = React.useRef<T>(null);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onDismiss();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, onDismiss]);
  return ref;
}
