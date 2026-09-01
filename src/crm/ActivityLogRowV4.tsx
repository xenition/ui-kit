import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { ACTIVITY_META_V4, BADGE_V4, metaLine, spokenLine, toneInkClass } from './internal/crm-v4';
import type { ActivityLogRowProps } from './ActivityLogRow';

export interface ActivityLogRowV4Props extends ActivityLogRowProps {
  /** The word a pending activity carries. Default `'Pending'`. */
  pendingLabel?: string;
}

/**
 * **V4 activity log row** — the web twin of the native `ActivityLogRowV4`,
 * same props as {@link ActivityLogRow} plus `pendingLabel`.
 *
 * ## Four changes
 *
 * 1. **A pending activity says so.** The base drew `pending` as
 *    `opacity: 0.6` and nothing else — a screen reader heard no difference at
 *    all, and everyone else read the row as *disabled*, because 0.6 sits inside
 *    the band M3 spends on unavailable. It now carries a word.
 * 2. **An activity kind is identity, not status.** `ACTIVITY_META` typed
 *    `task` and `deal` as `success`, so a log of completed calls came out a
 *    green feed and the tone stopped meaning anything. {@link ACTIVITY_META_V4}
 *    keeps the glyph, which is what actually names the kind, and goes neutral.
 * 3. **One accessible name.** `Call: Rang Ada` replaced the whole subtree, so
 *    the detail, the actor and the timestamp — the three things a feed exists
 *    to show — were never announced. Every part joins the name, comma-joined.
 * 4. **A press is a state layer on a real button**, not a `role="button"` div
 *    with a hand-written Enter/Space handler and no pressed treatment at all.
 *    A non-interactive row stays a plain, readable region rather than a
 *    focusable one.
 */
export const ActivityLogRowV4 = React.forwardRef<HTMLDivElement, ActivityLogRowV4Props>(
  function ActivityLogRowV4(
    {
      kind,
      title,
      detail,
      actor,
      timestamp,
      pending = false,
      pendingLabel = 'Pending',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    // A feed entry with nothing to say is the blank frame the line rules out.
    if (!title) return null;

    const meta = ACTIVITY_META_V4[kind];
    const caption = metaLine([actor, timestamp]);
    const label = spokenLine([
      meta.label,
      title,
      detail,
      actor,
      timestamp,
      pending ? pendingLabel : undefined,
    ]);

    const body = (
      <>
        {/*
          The same chip object on both twins: the compiler's opaque
          `selected` container under the tone's contrast-corrected ink. Web
          painted a flat `bg-neutral-100` — a ramp step, so a pale plate punched
          into a dark page — while native tinted per kind with `withAlpha`,
          which borrows whatever is behind it.
        */}
        <span
          aria-hidden="true"
          className={cn(
            'flex h-xl w-xl shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] bg-selected text-sm',
            toneInkClass(meta.tone)
          )}
        >
          {meta.glyph}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
          <span className="flex items-center gap-xs">
            <span className="min-w-0 truncate text-sm font-semibold text-on-surface">{title}</span>
            {pending ? (
              <BadgeV4 {...BADGE_V4} tone="neutral">
                {pendingLabel}
              </BadgeV4>
            ) : null}
          </span>
          {detail ? <span className="truncate text-xs text-muted-text">{detail}</span> : null}
          {caption ? (
            <span className="truncate text-xs font-medium text-muted-text">{caption}</span>
          ) : null}
        </span>
      </>
    );

    return (
      <div ref={ref} className={cn('flex w-full', className)} {...rest}>
        {onClick ? (
          <button
            type="button"
            aria-label={label}
            onClick={onClick}
            data-xen-v4-state=""
            style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
            className={cn(
              'flex w-full items-start gap-sm rounded-[var(--xen-radius-md)] px-sm py-sm text-left',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              MIN_TAP_CLASS
            )}
          >
            {body}
          </button>
        ) : (
          <div className="flex w-full items-start gap-sm py-sm">{body}</div>
        )}
      </div>
    );
  }
);
