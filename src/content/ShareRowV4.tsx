import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { DEFAULT_SHARE_TARGETS } from './ShareRow';
import type { ShareRowProps } from './ShareRow';
import { TONE_INK } from './internal/reading-v4';

export interface ShareRowV4Props extends ShareRowProps {
  /**
   * Rewrite each destination's label — the accessible name in `icons`, the
   * visible pill copy in `labeled`.
   *
   * The four defaults ship as English on screen, and `targets` is the only way
   * to change them today: a caller who wants "Copy link" in French has to
   * restate the glyph and the id as well.
   */
  formatTargetLabel?: (label: string) => string;
}

/**
 * **V4 share row** — the web twin of the native `ShareRowV4`, same props as
 * {@link ShareRow} plus `formatTargetLabel`.
 *
 * ## Three changes
 *
 * 1. **Every share control clears 44.** They were exactly 40 square on web,
 *    with no prop and no class that could raise them.
 * 2. **Press is the state layer.** Web dimmed to `0.8` and native to `0.6` —
 *    and `0.6` is *below* M3's 0.38-to-1 disabled boundary in perceived
 *    weight, so a pressed share button read as an unavailable one.
 * 3. **The destination copy is overridable** without restating the whole
 *    `targets` array, and the heading takes `mutedText` rather than the
 *    `muted` fill.
 */
export const ShareRowV4 = React.forwardRef<HTMLDivElement, ShareRowV4Props>(function ShareRowV4(
  {
    onShare,
    targets = DEFAULT_SHARE_TARGETS,
    variant = 'icons',
    heading = 'Share',
    formatTargetLabel,
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  const labeled = variant === 'labeled';
  const label = (value: string): string => formatTargetLabel?.(value) ?? value;

  return (
    <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
      {heading != null ? (
        <p className={cn('text-xs font-bold uppercase tracking-wide', TONE_INK.muted)}>{heading}</p>
      ) : null}
      <div className="flex flex-wrap gap-sm">
        {targets.map((target) => {
          const text = label(target.label);
          return (
            <button
              key={target.id}
              type="button"
              aria-label={text}
              onClick={() => onShare(target.id)}
              data-xen-v4-state=""
              style={
                stateGroundVars(
                  'var(--xen-surface)',
                  'var(--xen-on-surface)'
                ) as React.CSSProperties
              }
              className={cn(
                'inline-flex items-center justify-center gap-xs border border-border bg-surface',
                // The HIG floor, composed from the spacing scale — not a typed 44.
                MIN_TAP_CLASS,
                labeled
                  ? 'rounded-[var(--xen-radius-md)] px-md'
                  : 'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] rounded-[var(--xen-radius-full)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              <IconV4 glyph={target.glyph} size="base" color="onSurface" />
              {labeled ? (
                <span className="text-sm font-semibold text-on-surface">{text}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
});
