import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { ShareTarget } from './types';

export type ShareRowVariant = 'icons' | 'labeled';

/** A sensible default set of share destinations (glyphs, no icon font needed). */
export const DEFAULT_SHARE_TARGETS: ShareTarget[] = [
  { id: 'twitter', label: 'Share on X', glyph: '𝕏' },
  { id: 'facebook', label: 'Share on Facebook', glyph: 'f' },
  { id: 'link', label: 'Copy link', glyph: '🔗' },
  { id: 'mail', label: 'Share by email', glyph: '✉' },
];

export interface ShareRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Called with the clicked target's id. */
  onShare: (id: string) => void;
  /** Destinations to render. Defaults to {@link DEFAULT_SHARE_TARGETS}. */
  targets?: ShareTarget[];
  /**
   * - `icons`   — round glyph buttons (default).
   * - `labeled` — glyph + label pills.
   */
  variant?: ShareRowVariant;
  /** Optional leading label, e.g. `'Share'`. Pass `null` to hide. */
  heading?: string | null;
}

/**
 * A row of share actions for an article — X, Facebook, copy-link, email, etc.
 * Web (React DOM) mirror of the native `ShareRow`. Data-driven via `targets`
 * (each supplies a glyph + accessible label) and a single `onShare(id)`
 * callback; the parent decides what each id does. Two variants: round `icons` or
 * `labeled` pills. Colors come only from `--xen-*` token classes.
 */
export const ShareRow = React.forwardRef<HTMLDivElement, ShareRowProps>(function ShareRow(
  { onShare, targets = DEFAULT_SHARE_TARGETS, variant = 'icons', heading = 'Share', className, ...rest },
  ref
) {
  const labeled = variant === 'labeled';
  return (
    <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
      {heading != null ? (
        <p className="text-xs font-bold uppercase tracking-wide text-muted">{heading}</p>
      ) : null}
      <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
        {targets.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-label={t.label}
            onClick={() => onShare(t.id)}
            className={cn(
              'inline-flex h-10 items-center justify-center gap-[var(--xen-space-xs)] border border-border bg-surface transition-opacity hover:opacity-80',
              labeled
                ? 'rounded-[var(--xen-radius-md)] px-[var(--xen-space-md)]'
                : 'w-10 rounded-full'
            )}
          >
            <Icon glyph={t.glyph} size="base" color="onSurface" />
            {labeled ? <span className="text-sm font-semibold text-on-surface">{t.label}</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
});
