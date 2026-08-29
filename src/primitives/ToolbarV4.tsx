import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { MIN_TAP_CLASS, MIN_TAP_SQUARE_CLASS, NAV_V4_CSS, PANEL_MIN_WIDTH_CLASS } from './internal/nav-v4';
import { panelKind, useDepth } from './internal/surface-v4';
import { useDismiss } from './useDismiss';
import type { ToolbarAction, ToolbarProps } from './Toolbar';

export type { ToolbarProps as ToolbarV4Props, ToolbarAction };

/**
 * **V4 toolbar** — the web twin of the native `ToolbarV4`, same props as
 * {@link Toolbar}, a different design line.
 *
 * ## A toolbar is not a pill
 *
 * §8 lists excessive pill-shaped controls among the tells of generic AI UI. A
 * `Segmented` thumb is a pill because the capsule IS that control; a toolbar is
 * a bar, and it keeps `--xen-radius-md` — the seed's own corner, 0 on a `sharp`
 * brand. Nothing inside it is capsuled either.
 *
 * ## Actions that are legible as actions
 *
 * The base painted every action with `text-primary` — a FILL slot with no
 * contrast promise as text, so on a light-primary seed the toolbar's controls
 * were the least readable thing in it. V4 uses `text-primary-text`, the same
 * hue walked until it clears AA on the surface, and `text-danger-text` for a
 * destructive one. That leaves exactly two colours in the bar: the actions, and
 * the one that will delete something — different, not louder (§32).
 *
 * A disabled action drops to `muted` AND loses half its opacity, so the state
 * survives a reader who cannot separate the two colours. The hover ground is
 * mixed from `--xen-border` instead of `bg-neutral-100`, so it is a hairline's
 * worth of contrast in both schemes rather than a fixed grey that happens to
 * invert.
 *
 * ## Reach
 *
 * Every action and the `⋯` toggle are 44px targets composed from the spacing
 * scale. The base gave them `px-2 py-2` around a 14px label — about 30px, and
 * the `⋯` was the smallest target in the kit (§30).
 *
 * ## The overflow panel is a menu
 *
 * So it is skinned like one: `--xen-elevation-sheet` and the shared panel
 * attribute, the same altitude as `MenuV4` and the V4 sheets, because a kit
 * where an overflow menu and a dropdown menu look different has two answers to
 * one question. Glass applies only at `depth: 'glass'`; elevation is consumed
 * unconditionally, so a flat seed lands flat with no branch here.
 */
export const ToolbarV4 = React.forwardRef<HTMLDivElement, ToolbarProps>(function ToolbarV4(
  { className, title, actions = [], overflowActions = [], ...rest },
  ref
) {
  injectStyleOnce('xen-v4-nav-styles', NAV_V4_CSS);
  const [overflowOpen, setOverflowOpen] = React.useState(false);
  const overflowRef = useDismiss<HTMLDivElement>(overflowOpen, () => setOverflowOpen(false));
  const kind = panelKind(useDepth());

  const actionClass = (action: ToolbarAction, inPanel: boolean): string =>
    cn(
      'inline-flex items-center rounded-[var(--xen-radius-sm)] px-md font-body text-sm font-semibold',
      'focus-visible:outline-none disabled:pointer-events-none disabled:text-muted-text disabled:opacity-[0.38]',
      inPanel ? 'w-full justify-start text-left' : 'justify-center',
      MIN_TAP_CLASS,
      // `primary-text` / `danger-text`, never the FILL slots: these are words on
      // a surface, and only the text forms carry a contrast promise there.
      action.destructive === true ? 'text-danger-text' : 'text-primary-text'
    );

  return (
    <div
      ref={ref}
      role="toolbar"
      className={cn(
        'flex items-center gap-xs rounded-[var(--xen-radius-md)] border border-border',
        'bg-surface px-xs py-xs',
        className
      )}
      {...rest}
    >
      {title != null ? (
        <span className="min-w-0 flex-1 truncate px-sm font-heading text-base font-semibold text-on-surface">
          {title}
        </span>
      ) : (
        <span className="flex-1" />
      )}

      {actions.map((action) => (
        <button
          key={action.key}
          type="button"
          data-xen-v4-nav-item=""
          disabled={action.disabled}
          onClick={() => action.onClick?.()}
          className={actionClass(action, false)}
        >
          {action.label}
        </button>
      ))}

      {overflowActions.length > 0 ? (
        <div ref={overflowRef} className="relative">
          <button
            type="button"
            data-xen-v4-nav-item=""
            aria-label="More actions"
            aria-expanded={overflowOpen}
            aria-haspopup="menu"
            onClick={() => setOverflowOpen((o) => !o)}
            className={cn(
              'inline-flex items-center justify-center rounded-[var(--xen-radius-sm)]',
              'text-lg font-bold leading-none text-on-surface focus-visible:outline-none',
              MIN_TAP_SQUARE_CLASS
            )}
          >
            ⋯
          </button>
          {overflowOpen ? (
            <div
              role="menu"
              data-xen-v4-nav-panel={kind}
              className={cn(
                'absolute right-0 z-50 mt-xs overflow-hidden rounded-[var(--xen-radius-md)] py-xs',
                PANEL_MIN_WIDTH_CLASS
              )}
            >
              {overflowActions.map((action) => (
                <button
                  key={action.key}
                  type="button"
                  role="menuitem"
                  data-xen-v4-nav-item=""
                  disabled={action.disabled}
                  onClick={() => {
                    setOverflowOpen(false);
                    action.onClick?.();
                  }}
                  className={actionClass(action, true)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
