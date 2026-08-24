import * as React from 'react';
import { cn } from '../primitives/cn';

/** Kind of commentary entry — drives the leading glyph + a11y prefix. */
export type CommentaryKind = 'goal' | 'card' | 'sub' | 'chance' | 'var' | 'whistle' | 'info';

/** One commentary feed entry. */
export interface CommentaryEntry {
  /** Stable key. */
  id: string;
  /** Match clock label (e.g. `45+2'`). */
  minute?: string;
  /** Entry kind. Default `info`. */
  kind?: CommentaryKind;
  /** The commentary line. */
  text: string;
  /** Which side the event belongs to (used for subtle alignment accent). */
  side?: 'home' | 'away';
  /** Emphasise (e.g. key moment). */
  important?: boolean;
}

export interface LiveCommentaryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Feed entries — newest first is the convention. */
  entries: CommentaryEntry[];
  /** Header title. Default `Live commentary`. */
  title?: string;
  /** Show a live indicator in the header. */
  live?: boolean;
  /** Loading skeleton row count; when set, entries are ignored. */
  loadingRows?: number;
  /** Empty-state label. */
  emptyLabel?: string;
}

const KIND_META: Record<
  CommentaryKind,
  { glyph: string; label: string; border: string }
> = {
  goal: { glyph: '⚽', label: 'Goal', border: 'border-success' },
  card: { glyph: '🟨', label: 'Card', border: 'border-warn' },
  sub: { glyph: '🔁', label: 'Substitution', border: 'border-primary' },
  chance: { glyph: '🎯', label: 'Chance', border: 'border-border' },
  var: { glyph: '📺', label: 'VAR', border: 'border-primary' },
  whistle: { glyph: '📣', label: 'Whistle', border: 'border-border' },
  info: { glyph: '•', label: 'Update', border: 'border-border' },
};

/**
 * A live text commentary feed — a vertical list of timestamped entries, each
 * with a kind glyph and an accessible kind prefix so meaning survives without
 * color. Handles a `live` header marker, a loading skeleton, and an empty
 * state. Presentational: pass shaped `entries`; nothing polls. Token-only
 * colors.
 */
export const LiveCommentary = React.forwardRef<HTMLDivElement, LiveCommentaryProps>(
  function LiveCommentary(
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
      'flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 text-on-surface',
      className
    );

    const header = (
      <div className="flex items-center gap-1">
        {live ? (
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-danger" />
        ) : null}
        <span className="flex-1 text-base font-bold text-on-surface">{title}</span>
        {live ? <span className="text-xs font-bold text-danger">LIVE</span> : null}
      </div>
    );

    if (loadingRows && loadingRows > 0) {
      return (
        <div ref={ref} aria-busy="true" aria-label="Loading commentary" className={shell} {...rest}>
          {header}
          {Array.from({ length: loadingRows }).map((_, i) => (
            <div key={i} className="h-6 rounded-sm bg-neutral-100" />
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
            return (
              <div
                key={e.id}
                role="listitem"
                aria-label={`${e.minute ? e.minute + ', ' : ''}${meta.label}: ${e.text}`}
                className={cn(
                  'flex gap-2 py-1',
                  e.important
                    ? cn('rounded-sm border-l-[3px] bg-neutral-50 pl-2', meta.border)
                    : ''
                )}
              >
                {e.minute ? (
                  <span className="min-w-[40px] text-xs font-bold text-muted">{e.minute}</span>
                ) : null}
                <span aria-hidden="true" className="text-sm leading-none">
                  {meta.glyph}
                </span>
                <span
                  className={cn(
                    'flex-1 text-sm text-on-surface',
                    e.important ? 'font-semibold' : 'font-normal'
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
