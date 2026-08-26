import * as React from 'react';
import { createPortal } from 'react-dom';
import { injectStyleOnce } from '../motion/internal/inject';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from './internal/v4-state';
import type { ActionSheetAction, ActionSheetProps } from './ActionSheet';
import { cn } from './cn';
import { SURFACE_V4_CSS, panelKind, useDepth } from './internal/surface-v4';

export type { ActionSheetProps as ActionSheetV4Props, ActionSheetAction };

/**
 * Split the actions into the ordinary ones and the destructive ones, keeping
 * relative order inside each group.
 *
 * The destructive actions become their own card at the bottom of the stack —
 * the "destructive slot". That is not decoration: §25 asks for friction
 * proportional to risk, and physical separation is the cheapest friction there
 * is. A Delete sitting flush against a Rename is one mis-scroll away from being
 * the thing your cursor lands on.
 */
function partition(actions: ActionSheetAction[]): {
  ordinary: ActionSheetAction[];
  destructive: ActionSheetAction[];
} {
  const ordinary: ActionSheetAction[] = [];
  const destructive: ActionSheetAction[] = [];
  for (const action of actions) {
    (action.destructive === true ? destructive : ordinary).push(action);
  }
  return { ordinary, destructive };
}

/**
 * `ActionSheet`, V4 — the same props, grouped, with a destructive slot.
 *
 * ## What the depth is saying
 *
 * The groups are cards over a scrimmed page, all at ONE altitude: each carries
 * `--xen-elevation-sheet`, none is nested inside another. §8's "cards inside
 * cards inside cards" is about hierarchy invented for its own sake; three
 * siblings at the same height are three objects on one table, which is what an
 * action sheet literally is. The rows inside them are flat, and nothing in this
 * component is lifted twice.
 *
 * The scrim is `--xen-elevation-color`, not `bg-neutral-950/50` — which inverts
 * under `[data-theme="dark"]` and paints a near-WHITE veil over a dark page,
 * the bug the base component has. Glass applies only when the seed asked for
 * `depth: 'glass'`; elevation is consumed unconditionally, so `depth: 'flat'`
 * needs no branch and gets a flat sheet for free.
 *
 * ## The destructive slot
 *
 * The base component tints EVERY row with `primary` — the iOS convention — and
 * marks the destructive one by swapping that tint for red. Two problems: the
 * sheet then has no hierarchy at all (§5: one dominant thing), and `primary` is
 * a FILL colour with no contrast guarantee as text.
 *
 * So V4 does the opposite. Ordinary rows are plain `on-surface`, a
 * contrast-guaranteed pair that reads as what it is: a list of choices, not a
 * list of links. The destructive action is then **the only coloured text on the
 * sheet**, in `danger-text` — the compiler's contrast-corrected red — and it
 * sits in its own card. Unmistakable because it is the one thing that looks
 * different, rather than because it shouts.
 */
export function ActionSheetV4({
  open,
  onClose,
  title,
  actions,
  cancelLabel = 'Cancel',
  className,
}: ActionSheetProps): React.ReactElement | null {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const kind = panelKind(useDepth());
  const { ordinary, destructive } = React.useMemo(() => partition(actions), [actions]);

  injectStyleOnce('xen-surface-v4-styles', SURFACE_V4_CSS);
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  const row = (action: ActionSheetAction, index: number, tone: string): React.ReactElement => (
    <button
      key={index}
      type="button"
      role="menuitem"
      disabled={action.disabled}
      onClick={() => {
        action.onSelect?.();
        onClose();
      }}
      data-xen-v4-state=""
      className={cn(
        // A comfortable tap target, from the scale rather than a remembered 44px.
        'min-h-[var(--xen-space-2xl)] w-full px-lg py-md text-center text-base font-medium',
        // The pressed row is the only thing that changes colour, and it does it
        // with M3's state layer rather than a fill of `border` — a hairline
        // colour pressed into service as a surface, which is what it was.
        'disabled:pointer-events-none disabled:opacity-[0.38]',
        index === 0 ? '' : 'border-t border-border',
        tone
      )}
    >
      {action.label}
    </button>
  );

  const card = 'overflow-hidden rounded-[var(--xen-radius-lg)]';

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Actions'}
    >
      <div data-xen-v4-scrim="" className="absolute inset-0" onClick={onClose} />
      <div
        ref={panelRef}
        data-xen-v4-sheet=""
        tabIndex={-1}
        className={cn('relative flex flex-col gap-sm p-md outline-none', className)}
      >
        <div role="menu" data-xen-v4-panel={kind} className={card}>
          {title && (
            /*
              `text-on-surface`, not `text-muted-text`: this card may be glass, and
              `muted` measurably falls below AA there. Size does the
              de-emphasis instead of colour.
            */
            <div className="border-b border-border px-lg py-md text-center text-sm text-on-surface">
              {title}
            </div>
          )}
          {ordinary.map((action, i) => row(action, title ? i + 1 : i, 'text-on-surface'))}
        </div>

        {destructive.length > 0 && (
          <div role="menu" data-xen-v4-panel={kind} className={card}>
            {/*
              `text-danger-text`, not `text-danger`: the plain slot is a FILL
              colour and carries no promise as text. This is the same red,
              walked until it clears AA on the surface.
            */}
            {destructive.map((action, i) => row(action, i, 'text-danger-text'))}
          </div>
        )}

        <button
          type="button"
          data-xen-v4-panel={kind}
          data-xen-v4-state=""
          onClick={onClose}
          className={cn(
            card,
            'min-h-[var(--xen-space-2xl)] w-full px-lg py-md text-base font-semibold text-on-surface'
          )}
        >
          {cancelLabel}
        </button>
      </div>
    </div>,
    document.body
  );
}
