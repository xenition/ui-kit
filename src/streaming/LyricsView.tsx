import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatTime } from './types';

/** One line of a lyric sheet. */
export interface LyricLine {
  /** Optional timestamp in **seconds** for this line (enables a synced tap-to-seek). */
  time?: number;
  /** The lyric text for this line. */
  text: string;
}

/**
 * Props for {@link LyricsView} — a scrolling lyric sheet (web). Presentational
 * shell only: it renders shaped lines and reports a tapped index; nothing tracks
 * playback or fetches lyrics.
 */
export interface LyricsViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The lyric lines, in order. */
  lines: readonly LyricLine[];
  /** Index of the currently-active line — emphasized in `on-surface`/bold; others muted. */
  activeIndex?: number;
  /** Fires with the tapped line's index (seek to `lines[index].time`); lines become buttons when set. */
  onLineTap?: (index: number) => void;
}

/**
 * LyricsView — the **V4 "spotlight"** lyric sheet (web). Deliberately calm: a
 * scrollable list on the plain `surface` (NOT the gradient — that's reserved for
 * the hero moments), with the `activeIndex` line emphasized in bold `on-surface`
 * / `primary` and the rest muted. When `onLineTap` is set each line becomes a
 * seek button. The active line auto-scrolls into view. All colors from `--xen-*`
 * token classes — no literal hex; dark-mode safe.
 */
export const LyricsView = React.forwardRef<HTMLDivElement, LyricsViewProps>(function LyricsView(
  { lines, activeIndex, onLineTap, className, ...rest },
  ref
) {
  const activeRef = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-y-auto rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      <ol className="flex flex-col gap-[var(--xen-space-md)]">
        {lines.map((line, i) => {
          const active = i === activeIndex;
          const tappable = !!onLineTap;
          const content = (
            <span
              className={cn(
                'block text-left leading-snug transition-colors',
                active ? 'text-xl font-extrabold text-primary' : 'text-lg font-medium text-muted'
              )}
            >
              {line.text}
            </span>
          );
          return (
            <li key={i} ref={active ? activeRef : undefined} aria-current={active ? 'true' : undefined}>
              {tappable ? (
                <button
                  type="button"
                  onClick={() => onLineTap(i)}
                  aria-label={line.time != null ? `Seek to ${formatTime(line.time)}: ${line.text}` : line.text}
                  className="block w-full min-h-11 rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-left transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                >
                  {content}
                </button>
              ) : (
                <div className="px-[var(--xen-space-sm)]">{content}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
});
