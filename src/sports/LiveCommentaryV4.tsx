import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LiveCommentaryProps, CommentaryKind } from './LiveCommentary';

/** Drop-in for {@link LiveCommentaryProps} — same props, the V4 "broadcast" design. */
export type LiveCommentaryV4Props = LiveCommentaryProps;

const KIND_META: Record<
  CommentaryKind,
  { glyph: string; label: string; key: boolean; tint: string; border: string }
> = {
  goal: { glyph: '⚽', label: 'Goal', key: true, tint: 'bg-success/10', border: 'border-success' },
  card: { glyph: '🟨', label: 'Card', key: true, tint: 'bg-warn/10', border: 'border-warn' },
  sub: { glyph: '🔁', label: 'Substitution', key: false, tint: 'bg-primary/10', border: 'border-primary' },
  chance: { glyph: '🎯', label: 'Chance', key: false, tint: 'bg-primary/10', border: 'border-border' },
  var: { glyph: '📺', label: 'VAR', key: false, tint: 'bg-primary/10', border: 'border-primary' },
  whistle: { glyph: '📣', label: 'Whistle', key: false, tint: 'bg-primary/10', border: 'border-border' },
  info: { glyph: '•', label: 'Update', key: false, tint: 'bg-primary/10', border: 'border-border' },
};

/**
 * LiveCommentary — **V4** "broadcast" design (web parity of the native V4). A
 * live text feed on an elevated card: a `live` header carries a pulsing
 * `danger` dot + "LIVE" label (never color alone), and each entry pairs a
 * minute chip with a kind glyph + text. Key events (goal / card) and any
 * `important` entry get a soft-tint accent lane. One accent: `primary`. Same
 * props/behavior as {@link LiveCommentaryProps} (drop-in) — keeps the entry
 * list contract, kinds/minutes, loading and empty states. All colors from
 * `--xen-*` token classes (no literals).
 */
export const LiveCommentaryV4 = React.forwardRef<HTMLDivElement, LiveCommentaryV4Props>(
  function LiveCommentaryV4(
    {
      entries,
      title = 'Live commentary',
      live = false,
      loadingRows,
      emptyLabel = 'No commentary yet',
      className,
      ...rest
    },
    ref
  ) {
    const shell = cn(
      'flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 text-on-surface shadow-sm',
      className
    );

    const header = (
      <div className="flex items-center gap-1.5">
        {live ? (
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-2 py-0.5 text-xs font-extrabold text-danger"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-danger" />
            LIVE
          </span>
        ) : null}
        <span className="flex-1 text-base font-extrabold text-on-surface">{title}</span>
      </div>
    );

    if (loadingRows && loadingRows > 0) {
      return (
        <div ref={ref} aria-busy="true" aria-label="Loading commentary" className={shell} {...rest}>
          {header}
          {Array.from({ length: loadingRows }).map((_, i) => (
            <div key={i} className="h-6 rounded-sm bg-on-surface/10" />
          ))}
        </div>
      );
    }

    return (
      <div ref={ref} role="list" className={shell} {...rest}>
        {header}
        {entries.length === 0 ? (
          <div className="flex flex-col items-center gap-1 py-6 text-center">
            <span className="text-sm font-semibold text-on-surface">{emptyLabel}</span>
            <span className="text-xs text-muted">
              Updates will stream in once the match kicks off.
            </span>
          </div>
        ) : (
          entries.map((e) => {
            const meta = KIND_META[e.kind ?? 'info'] ?? KIND_META.info;
            const accent = meta.key || e.important;
            return (
              <div
                key={e.id}
                role="listitem"
                aria-label={`${e.minute ? e.minute + ', ' : ''}${meta.label}: ${e.text}`}
                className={cn(
                  'flex items-start gap-2 py-1.5',
                  accent
                    ? cn('rounded-sm border-l-[3px] pl-2', meta.border, meta.tint)
                    : ''
                )}
              >
                {e.minute ? (
                  <span className="min-w-[40px] rounded-full bg-on-surface/5 px-1.5 py-0.5 text-center text-xs font-extrabold text-muted">
                    {e.minute}
                  </span>
                ) : null}
                <span aria-hidden="true" className="text-base leading-none">
                  {meta.glyph}
                </span>
                <span
                  className={cn(
                    'flex-1 text-sm text-on-surface',
                    accent ? 'font-semibold' : 'font-normal'
                  )}
                >
                  {e.text}
                </span>
              </div>
            );
          })
        )}
      </div>
    );
  }
);
