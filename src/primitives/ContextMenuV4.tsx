import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import type { ContextMenuAction, ContextMenuProps } from './ContextMenu';
import { CHROME_V4_CSS, CHROME_V4_STYLE_ID, MIN_TAP_CLASS } from './internal/chrome-v4';
import { NAV_V4_CSS, PANEL_MIN_WIDTH_CLASS } from './internal/nav-v4';
import { panelKind, useDepth } from './internal/surface-v4';

export type { ContextMenuProps as ContextMenuV4Props, ContextMenuAction };

/** The gesture props ContextMenu injects into an element child. */
interface TriggerProps {
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  onTouchStart?: (event: React.TouchEvent<HTMLElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLElement>) => void;
  onTouchMove?: (event: React.TouchEvent<HTMLElement>) => void;
}

/**
 * How long a press has to be held before it counts as a long press.
 *
 * Unchanged from the base at 350ms: a gesture threshold is muscle memory, not
 * styling, and changing it would make every existing app's context menus feel
 * different for no design gain. §31 — use familiar interactions.
 */
const LONG_PRESS_MS = 350;

/**
 * `ContextMenu`, V4 — the same props, and a gesture that reaches the thing you
 * pressed.
 *
 * ## The child is the target
 *
 * The gesture handlers are cloned onto the child element rather than left on a
 * wrapping host, matching `Popconfirm` and `Menu`. This is a real bug on the
 * native twin — the deepest `Pressable` wins the responder there, so a wrapper
 * around anything pressable never fired — and on the web it is the `disabled`
 * asymmetry: a browser suppresses mouse events on a disabled form control, so a
 * host-level handler opens a menu on a control the user was told was dead only
 * when the caller disabled something that is *not* a form control. Cloning
 * gives both platforms one rule: the child is the only thing that handles the
 * gesture, so whatever it says about being disabled is what happens.
 *
 * A child that cannot take the props — a bare string, a fragment — has nothing
 * to clone onto, so the host keeps the handlers it has always had.
 *
 * The host `<div>` stays regardless, because the menu is positioned against the
 * viewport and `className` has to land somewhere.
 *
 * ## What the depth is saying
 *
 * The action list is a floating layer, so it takes the shared V4 panel skin —
 * `--xen-elevation-sheet`, glass only when the seed asked for
 * `depth: 'glass'` — the same skin `MenuV4` and `PopoverV4` wear. The base's
 * `shadow-lg` is a fixed black at a fixed alpha that knows nothing about the
 * scheme it is falling in.
 *
 * ## Reading the list
 *
 * The destructive row is `danger-text`, the compiler's contrast-corrected red,
 * not the `danger` FILL slot used as ink. That makes it the **only** coloured
 * thing in the menu, so it is unmistakable because it is different rather than
 * because it shouts (§32).
 *
 * Rows hover with the M3 state layer instead of `hover:bg-neutral-100` — a
 * LIGHT-oriented ramp step, so the base's hover paints a near-white slab across
 * a dark row. Every row clears 44px, composed from the spacing scale, and a
 * disabled row drops to M3's 0.38 rather than each component's own 0.5.
 */
export function ContextMenuV4({
  actions,
  children,
  className,
  'aria-label': ariaLabel = 'Context menu',
}: ContextMenuProps): React.ReactElement {
  injectStyleOnce('xen-v4-nav-styles', NAV_V4_CSS);
  injectStyleOnce(CHROME_V4_STYLE_ID, CHROME_V4_CSS);

  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const longPress = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const kind = panelKind(useDepth());

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

  // Clear a pending long press on unmount, so the timer never fires into a
  // torn-down tree.
  React.useEffect(
    () => () => {
      if (longPress.current) clearTimeout(longPress.current);
    },
    []
  );

  const gestures: TriggerProps = {
    onContextMenu: (e) => {
      e.preventDefault();
      setPos({ x: e.clientX, y: e.clientY });
    },
    onTouchStart: (e) => {
      const t = e.touches[0];
      if (!t) return;
      const { clientX, clientY } = t;
      longPress.current = setTimeout(() => setPos({ x: clientX, y: clientY }), LONG_PRESS_MS);
    },
    onTouchEnd: () => {
      if (longPress.current) clearTimeout(longPress.current);
    },
    onTouchMove: () => {
      if (longPress.current) clearTimeout(longPress.current);
    },
  };

  const isElement = React.isValidElement<TriggerProps>(children);
  const renderedChild = React.isValidElement<TriggerProps>(children)
    ? React.cloneElement(children, {
        onContextMenu: (e: React.MouseEvent<HTMLElement>) => {
          children.props.onContextMenu?.(e);
          gestures.onContextMenu?.(e);
        },
        onTouchStart: (e: React.TouchEvent<HTMLElement>) => {
          children.props.onTouchStart?.(e);
          gestures.onTouchStart?.(e);
        },
        onTouchEnd: (e: React.TouchEvent<HTMLElement>) => {
          children.props.onTouchEnd?.(e);
          gestures.onTouchEnd?.(e);
        },
        onTouchMove: (e: React.TouchEvent<HTMLElement>) => {
          children.props.onTouchMove?.(e);
          gestures.onTouchMove?.(e);
        },
      })
    : children;

  return (
    <div className={cn('relative inline-block', className)} {...(isElement ? {} : gestures)}>
      {renderedChild}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label={ariaLabel}
          data-xen-v4-nav-panel={kind}
          className={cn(
            'fixed z-50 overflow-hidden rounded-[var(--xen-radius-md)] py-xs',
            PANEL_MIN_WIDTH_CLASS
          )}
          style={{ top: pos.y, left: pos.x }}
        >
          {actions.map((action, i) => (
            <button
              key={i}
              type="button"
              role="menuitem"
              data-xen-v4-chrome={action.danger === true ? 'danger' : 'on-surface'}
              disabled={action.disabled}
              onClick={() => {
                action.onSelect?.();
                close();
              }}
              className={cn(
                'flex w-full items-center gap-sm px-lg py-sm text-left font-body text-base font-medium',
                'focus-visible:outline-none',
                MIN_TAP_CLASS,
                // `danger-text`, not `danger`: the plain slot is a FILL colour
                // and carries no promise as text.
                action.danger === true ? 'text-danger-text' : 'text-on-surface'
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
