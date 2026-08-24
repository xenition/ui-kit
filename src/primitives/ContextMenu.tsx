import * as React from 'react';
import { cn } from './cn';

export interface ContextMenuAction {
  label: string;
  /** Fires on select; the menu closes afterwards. */
  onSelect?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  /** Render in the danger tone (e.g. Delete). */
  danger?: boolean;
}

export interface ContextMenuProps {
  /** Actions shown after a right-click / long-press. */
  actions: ContextMenuAction[];
  /** The element to right-click (or long-press on touch). */
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

/**
 * Right-click / long-press context menu — wraps `children` in a positioned host
 * whose `onContextMenu` (and touch long-press) opens a token-bound action list
 * anchored at the pointer. Distinct from `Menu` (tap-to-open) by the gesture.
 * Selecting an action fires `onSelect` and dismisses; closes on outside click
 * or Escape. Danger actions use the `danger` token. No literal colors.
 */
export function ContextMenu({
  actions,
  children,
  className,
  'aria-label': ariaLabel = 'Context menu',
}: ContextMenuProps): React.ReactElement {
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const longPress = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = pos != null;
  const close = React.useCallback(() => setPos(null), []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open, close]);

  const openAt = (x: number, y: number) => setPos({ x, y });

  return (
    <div
      className={cn('relative inline-block', className)}
      onContextMenu={(e) => {
        e.preventDefault();
        openAt(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (!t) return;
        const { clientX, clientY } = t;
        longPress.current = setTimeout(() => openAt(clientX, clientY), 350);
      }}
      onTouchEnd={() => {
        if (longPress.current) clearTimeout(longPress.current);
      }}
      onTouchMove={() => {
        if (longPress.current) clearTimeout(longPress.current);
      }}
    >
      {children}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label={ariaLabel}
          className={cn(
            'fixed z-50 min-w-[12rem] overflow-hidden rounded-[var(--xen-radius-md)] border border-border',
            'bg-surface py-1 shadow-lg'
          )}
          style={{ top: pos.y, left: pos.x }}
        >
          {actions.map((action, i) => (
            <button
              key={i}
              type="button"
              role="menuitem"
              disabled={action.disabled}
              onClick={() => {
                action.onSelect?.();
                close();
              }}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
                'hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50',
                action.danger ? 'text-danger' : 'text-on-surface'
              )}
            >
              {action.icon != null && <span className="shrink-0">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
