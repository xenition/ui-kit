import * as React from 'react';
import { cn } from './cn';
import { useDismiss } from './useDismiss';

export interface ToolbarAction {
  key: string;
  label: React.ReactNode;
  /** Click handler (web parity of the native `onPress`). */
  onClick?: () => void;
  disabled?: boolean;
  /** Tint the label with the `danger` token (destructive). */
  destructive?: boolean;
}

export interface ToolbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional leading title. */
  title?: React.ReactNode;
  /** Inline action buttons (left→right). */
  actions?: ToolbarAction[];
  /** Actions collapsed behind a `⋯` overflow toggle. */
  overflowActions?: ToolbarAction[];
}

/**
 * Web parity of the native `Toolbar`: a horizontal action bar — an optional
 * title, a row of inline action buttons, and an optional `⋯` overflow that
 * reveals extra actions in a dropdown panel. Uses the ARIA `toolbar` role. All
 * colors/radii/spacing come from the `--xen-*` tokens via Tailwind classes — no
 * literal colors.
 */
export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { className, title, actions = [], overflowActions = [], ...rest },
  ref
) {
  const [overflowOpen, setOverflowOpen] = React.useState(false);
  const overflowRef = useDismiss<HTMLDivElement>(overflowOpen, () => setOverflowOpen(false));

  const actionClass = (action: ToolbarAction): string =>
    cn(
      'rounded-[var(--xen-radius-sm)] px-2 py-2 text-sm font-semibold transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
      'disabled:pointer-events-none disabled:text-muted',
      action.destructive ? 'text-danger hover:bg-neutral-100' : 'text-primary hover:bg-neutral-100'
    );

  return (
    <div
      ref={ref}
      role="toolbar"
      className={cn(
        'bg-surface flex items-center gap-1 rounded-[var(--xen-radius-md)] border border-border px-2 py-1',
        className
      )}
      {...rest}
    >
      {title != null ? (
        <span className="min-w-0 flex-1 truncate text-base font-bold text-on-surface">{title}</span>
      ) : (
        <span className="flex-1" />
      )}

      {actions.map((a) => (
        <button
          key={a.key}
          type="button"
          disabled={a.disabled}
          onClick={() => a.onClick?.()}
          className={actionClass(a)}
        >
          {a.label}
        </button>
      ))}

      {overflowActions.length > 0 ? (
        <div ref={overflowRef} className="relative">
          <button
            type="button"
            aria-label="More actions"
            aria-expanded={overflowOpen}
            aria-haspopup="menu"
            onClick={() => setOverflowOpen((o) => !o)}
            className="rounded-[var(--xen-radius-sm)] px-2 py-2 text-lg font-bold leading-none text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            ⋯
          </button>
          {overflowOpen ? (
            <div
              role="menu"
              className="bg-surface absolute right-0 z-50 mt-1 min-w-[10rem] rounded-[var(--xen-radius-md)] border border-border py-1 shadow-lg"
            >
              {overflowActions.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  role="menuitem"
                  disabled={a.disabled}
                  onClick={() => {
                    setOverflowOpen(false);
                    a.onClick?.();
                  }}
                  className={cn(
                    'flex w-full items-center px-3 py-1.5 text-left text-sm transition-colors',
                    'hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50',
                    a.destructive ? 'text-danger' : 'text-on-surface'
                  )}
                >
                  {a.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
