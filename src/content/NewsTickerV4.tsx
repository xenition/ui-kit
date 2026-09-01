import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TagV4, type TagTone } from '../primitives/TagV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { NewsTickerItem, NewsTickerProps } from './NewsTicker';
import { TONE_INK, type ToneV4 } from './internal/reading-v4';

export interface NewsTickerV4Props extends NewsTickerProps {
  /** The busy name while headlines load. Default `'Loading headlines…'`. */
  loadingLabel?: string;
  /** The region's accessible name. Default `'Latest headlines'`. */
  regionLabel?: string;
  /**
   * The tone of the leading `label` chip. Default `'neutral'`.
   *
   * A caller who genuinely means an emergency passes `labelTone="danger"`.
   */
  labelTone?: ToneV4;
}

/** How many placeholder headlines a loading ticker draws. */
const SKELETON_ITEMS = 3;

/**
 * The eyebrow's tone, as a `Tag` tone.
 *
 * `Tag` resolves every tone to a fill and the ink the compiler guaranteed
 * *against that fill*, so the chip is never a hand-paired background and
 * foreground — which is how the native twin draws it too. `ToneV4` carries a
 * `muted` that `Tag` does not; both mean "no status", and the shared tone
 * table already resolves the pair to the same ink.
 */
const CHIP_TONE: Record<ToneV4, TagTone> = {
  muted: 'neutral',
  neutral: 'neutral',
  primary: 'primary',
  accent: 'accent',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

/**
 * One headline. A `<button>` on both twins when there is a handler, plain text
 * when there is not — the base said `button` on web and `link` on native for
 * the same prop.
 */
function HeadlineV4({
  item,
  onItemClick,
  clamp,
}: {
  item: NewsTickerItem;
  onItemClick?: (id: string) => void;
  clamp: string;
}): React.ReactElement {
  const text = <span className={cn('text-sm font-semibold text-on-surface', clamp)}>{item.text}</span>;

  if (!onItemClick) return text;

  return (
    <button
      type="button"
      onClick={() => onItemClick(item.id)}
      data-xen-v4-state=""
      style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
      className={cn(
        'flex min-w-0 shrink items-center rounded-[var(--xen-radius-sm)] px-xs text-left',
        // The HIG floor, composed from the spacing scale — not a typed 44.
        MIN_TAP_CLASS,
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      )}
    >
      {text}
    </button>
  );
}

/**
 * **V4 news ticker** — the web twin of the native `NewsTickerV4`, same props as
 * {@link NewsTicker} plus `loadingLabel`, `regionLabel` and `labelTone`.
 *
 * ## Six changes
 *
 * 1. **The eyebrow stops being `danger`.** `label` is caller copy, documented
 *    as "`LIVE`" or "`BREAKING`" — so a section name, an editorial rubric or a
 *    sponsor tag came out in the colour that means *something has gone wrong*.
 *    It defaults to `neutral` now; red is a decision a caller makes.
 * 2. **Loading draws the ticker's skeleton.** The base parameterised
 *    `emptyLabel` and then hard-coded `'Loading headlines…'` two lines later,
 *    collapsing the strip to one text line that then reflowed to N headlines.
 *    The string survives as the busy region's name.
 * 3. **The region is named on both twins**, with the same role — native had no
 *    label at all.
 * 4. **A headline is the same control on both twins** (web said `button`,
 *    native said `link`) and clears 44.
 * 5. **The scroller is keyboard reachable.** A horizontally scrolling strip
 *    that only a pointer can move is unreachable content.
 * 6. **Press is the state layer**, not `hover:opacity-70`.
 */
export const NewsTickerV4 = React.forwardRef<HTMLDivElement, NewsTickerV4Props>(
  function NewsTickerV4(
    {
      items,
      label = 'LIVE',
      onItemClick,
      variant = 'scroll',
      loading = false,
      emptyLabel = 'No headlines',
      loadingLabel = 'Loading headlines…',
      regionLabel = 'Latest headlines',
      labelTone = 'neutral',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const scroll = variant === 'scroll';

    const shell = (children: React.ReactNode, busy: boolean): React.ReactElement => (
      <div
        ref={ref}
        role="region"
        aria-label={busy ? loadingLabel : regionLabel}
        aria-busy={busy || undefined}
        className={cn(
          'gap-sm rounded-[var(--xen-radius-md)] border border-border bg-surface px-md py-sm',
          scroll ? 'flex items-center' : 'flex flex-col items-stretch',
          className
        )}
        {...rest}
      >
        {label != null ? (
          <TagV4
            tone={CHIP_TONE[labelTone]}
            variant="solid"
            size="sm"
            className="shrink-0 self-center font-bold tracking-wide"
          >
            {label}
          </TagV4>
        ) : null}
        {children}
      </div>
    );

    if (loading) {
      return shell(
        // The shape it is about to be, so the strip does not jump when the
        // headlines land.
        <div
          className={cn(
            'flex flex-1 gap-sm',
            scroll ? 'items-center' : 'flex-col items-stretch'
          )}
        >
          {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
            <SkeletonV4
              key={index}
              variant="rect"
              className={cn('h-[var(--xen-text-sm)]', scroll ? 'w-1/3' : 'w-full')}
            />
          ))}
        </div>,
        true
      );
    }

    if (items.length === 0) {
      return shell(<span className={cn('text-sm', TONE_INK.muted)}>{emptyLabel}</span>, false);
    }

    if (!scroll) {
      return shell(
        <div className="flex flex-1 flex-col gap-xs">
          {items.map((item) => (
            <HeadlineV4 key={item.id} item={item} onItemClick={onItemClick} clamp="line-clamp-2" />
          ))}
        </div>,
        false
      );
    }

    return shell(
      <div
        // A strip that overflows and cannot be scrolled from the keyboard is
        // content nobody without a pointer can reach.
        tabIndex={0}
        className={cn(
          'flex flex-1 items-center gap-sm overflow-x-auto',
          'rounded-[var(--xen-radius-sm)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
      >
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-sm">
            {index > 0 ? (
              <span aria-hidden className={TONE_INK.muted}>
                ·
              </span>
            ) : null}
            <HeadlineV4 item={item} onItemClick={onItemClick} clamp="whitespace-nowrap" />
          </div>
        ))}
      </div>,
      false
    );
  }
);
