import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from './internal/v4-state';
import { cn } from './cn';
import { useDismiss } from './useDismiss';
import { resolveIconGlyph } from './icon-names';
import { shadowCss, useOptionalCompiledTheme } from './internal/v4-depth';
import type { SplitButtonAction, SplitButtonProps, SplitButtonVariant } from './SplitButton';
import { transitionCss, V4_MOTION } from './internal/v4-motion';

export type { SplitButtonProps as SplitButtonV4Props, SplitButtonAction, SplitButtonVariant };

/**
 * The seam has to be an opaque composite rather than a floated alpha, the menu
 * needs the seed's own elevation per scheme, and a disabled row needs a `muted`
 * that was actually measured. None of the three is a utility class bound to a
 * token; every colour here is a `--xen-*` custom property.
 *
 * §36.2 puts a micro-feedback at 100–180ms, and a caret turning is the small
 * end of that.
 */
const SPLIT_BUTTON_V4_CSS = `
[data-xen-v4-split-seam] { background-color: var(--xen-v4-seam); }
[data-xen-v4-split-caret] { transition: ${transitionCss(['transform'], V4_MOTION.quick)}; }
[data-xen-v4-split-caret][data-open="true"] { transform: rotate(180deg); }
[data-xen-v4-split-menu] { box-shadow: var(--xen-v4-shadow-l, none); }
[data-theme="dark"] [data-xen-v4-split-menu] { box-shadow: var(--xen-v4-shadow-d, none); }
[data-xen-v4-split-item]:disabled { color: var(--xen-muted-text); }
[data-xen-v4-split-face]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: -2px;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-split-caret] { transition: none; }
}
`;

/**
 * **V4 split button** — the web twin of the native `SplitButtonV4`, same props
 * as {@link SplitButton}, a different design line.
 *
 * A split button is two click targets fused into one shape, and both of them
 * were too small to hit.
 *
 * 1. **Both halves are real targets.** `py-2` around a 16px label is roughly
 *    40px and the caret's `px-2` made it about 28px wide — both under the 44 a
 *    finger needs, on the control a screen puts its *primary* action in. Both
 *    now have a 44px floor in both axes, and so does every row of the menu.
 * 2. **The colours are measured.** `secondary` labelled itself `text-primary`
 *    — the FILL slot, guaranteed against `on-primary` and against nothing else
 *    — and a destructive menu row took `text-danger` the same way. Both move to
 *    the compiler's `-text` forms, and a disabled row's `muted` is walked to AA
 *    per scheme, because none of the three carried a promise about the page.
 *    The outlined face also paints `surface` rather than `transparent`, so the
 *    ground its label was measured against is the ground it is printed on.
 * 3. **The seam is an opaque colour.** It was the face colour at 40% *opacity*,
 *    so on the outlined variant it was 40% of `primary` over whatever happened
 *    to be behind the button. `color-mix` composites the same 40% once, into
 *    the face, so the seam is a colour the control owns.
 * 4. **The menu floats on the seed's own shadow.** `shadow-lg` is a fixed
 *    utility that cannot know a shadow on a dark page needs MORE opacity;
 *    `elevation.card` does, and a `depth: 'flat'` seed zeroes it with no branch
 *    in this file.
 * 5. **The caret turns, and stops turning when asked.** Its
 *    `transition-transform` had no duration, no curve and no reduced-motion
 *    guard. It now runs on §36.2's micro-feedback clock and an ease-out, and
 *    drops the transition entirely under `prefers-reduced-motion` (§36.10).
 * 6. **The focus ring is the brand.** `ring-primary-300` is a pale tint nobody
 *    measured against the face it sits on.
 *
 * The caret glyph comes from the kit's named icon set rather than a `▾` typed
 * into this file, and the menu's minimum width and padding come from the
 * spacing scale rather than `10rem` and `px-3 py-2`.
 */
export function SplitButtonV4({
  label,
  onClick,
  actions,
  variant = 'primary',
  disabled = false,
  className,
}: SplitButtonProps): React.ReactElement {
  injectStyleOnce('xen-v4-split-button-styles', SPLIT_BUTTON_V4_CSS);
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  const theme = useOptionalCompiledTheme();
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  const filled = variant === 'primary';
  // `primary` is a fill slot: the compiler guarantees `on-primary` against it,
  // and nothing about it as ink on the page.
  const faceClass = filled ? 'bg-primary text-on-primary' : 'bg-surface text-primary-text';
  const faceVar = filled ? 'var(--xen-primary)' : 'var(--xen-surface)';
  const inkVar = filled ? 'var(--xen-on-primary)' : 'var(--xen-primary-text)';

  const vars: Record<string, string> = {
    // Composited once, into the face — not floated at 40% over whatever is
    // behind the button.
    '--xen-v4-seam': `color-mix(in srgb, ${inkVar} 40%, ${faceVar})`,
  };
  if (theme !== null) {
    vars['--xen-v4-shadow-l'] = shadowCss(theme.lightElevation.card);
    vars['--xen-v4-shadow-d'] = shadowCss(theme.darkElevation.card);
  }

  return (
    <div
      ref={ref}
      data-xen-v4-split=""
      className={cn('relative inline-block', className)}
      style={vars as React.CSSProperties}
    >
      <div
        className={cn(
          'inline-flex items-stretch overflow-hidden rounded-[var(--xen-radius-md)]',
          !filled && 'border border-primary',
          disabled && 'pointer-events-none opacity-[0.38]'
        )}
      >
        <button
          type="button"
          data-xen-v4-split-face=""
          disabled={disabled}
          onClick={() => onClick?.()}
          className={cn(
            // Fusing two buttons into one shape does not shrink a finger.
            'min-h-[44px] px-lg py-sm font-body text-base font-semibold',
            'focus-visible:outline-none',
            faceClass
          )}
        >
          {label}
        </button>
        <span aria-hidden data-xen-v4-split-seam="" className="w-px self-stretch" />
        <button
          type="button"
          data-xen-v4-split-face=""
          aria-label="More actions"
          aria-expanded={open}
          aria-haspopup="menu"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            // A caret is half a control, not half a target.
            'flex min-h-[44px] min-w-[44px] items-center justify-center',
            'focus-visible:outline-none',
            faceClass
          )}
        >
          <span aria-hidden data-xen-v4-split-caret="" data-open={open ? 'true' : 'false'} className="text-xs">
            {resolveIconGlyph('chevron-down')}
          </span>
        </button>
      </div>

      {open ? (
        <div
          role="menu"
          data-xen-v4-split-menu=""
          className={cn(
            'absolute left-0 z-50 mt-xs py-xs',
            'min-w-[calc(var(--xen-space-2xl)_*_3_+_var(--xen-space-md))]',
            'rounded-[var(--xen-radius-md)] border border-border bg-surface'
          )}
        >
          {actions.map((action) => (
            <button
              key={action.key}
              type="button"
              role="menuitem"
              data-xen-v4-split-item=""
              disabled={action.disabled}
              onClick={() => {
                setOpen(false);
                action.onClick?.();
              }}
              data-xen-v4-state=""
              className={cn(
                'flex min-h-[44px] w-full items-center px-md py-sm text-left',
                'font-body text-sm',
                'disabled:pointer-events-none',
                action.destructive ? 'text-danger-text' : 'text-on-surface'
              )}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
