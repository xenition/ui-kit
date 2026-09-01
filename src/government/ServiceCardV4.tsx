import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { ServiceCardProps, ServiceCategory, ServiceChannel } from './ServiceCard';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  spokenLine,
  tintGround,
  tintInkClass,
  type ToneV4,
} from './internal/civic-v4';

export interface ServiceCardV4Props extends ServiceCardProps {
  /** Override the eight category words — `'Licensing'`, `'Permits'`, … */
  categoryLabels?: Partial<Record<ServiceCategory, string>>;
  /** Override the four channel words — `'Online'`, `'Unavailable'`, … */
  channelLabels?: Partial<Record<ServiceChannel, string>>;
}

const CATEGORY_V4: Record<ServiceCategory, { label: string; glyph: string }> = {
  license: { label: 'Licensing', glyph: '🪪' },
  permit: { label: 'Permits', glyph: '📋' },
  tax: { label: 'Tax', glyph: '🧾' },
  records: { label: 'Records', glyph: '🗂️' },
  benefit: { label: 'Benefits', glyph: '🤝' },
  health: { label: 'Public health', glyph: '⚕️' },
  utility: { label: 'Utilities', glyph: '💧' },
  other: { label: 'Service', glyph: '🏛️' },
};

const CHANNEL_V4: Record<ServiceChannel, { label: string; glyph: string; tone: ToneV4 }> = {
  online: { label: 'Online', glyph: '🌐', tone: 'success' },
  'in-person': { label: 'In person', glyph: '🏢', tone: 'warn' },
  phone: { label: 'By phone', glyph: '☎️', tone: 'neutral' },
  unavailable: { label: 'Unavailable', glyph: '⛔', tone: 'danger' },
};

/**
 * **V4 service card** — the web twin of the native `ServiceCardV4`, same props
 * as {@link ServiceCard} plus `categoryLabels` and `channelLabels`.
 *
 * ## Four changes
 *
 * 1. **Space on "Start" starts the service.** Today it starts nothing and
 *    navigates away. The Start button guarded only the *click* path with
 *    `e.stopPropagation()`; the card is a `div` with `role="button"` and a
 *    hand-written key handler, which catches the keydown bubbling out of the
 *    button and runs `e.preventDefault(); onClick()` — cancelling the button's
 *    own activation (Space fires on keyup, already cancelled) and firing the
 *    card. Enter fires *both*. The fix is structural and is the house rule:
 *    the card container is a plain `div`, the activation is a real `<button>`
 *    around the heading and description, and **Start is that button's
 *    sibling**. Nesting a control inside `role="button"` was invalid ARIA
 *    regardless of the propagation.
 * 2. **An unavailable service says so.** The name was a fixed
 *    `` `${title}, ${category}` ``, which omits the one field that decides
 *    whether the service can be used at all — so an unavailable service
 *    announced as an ordinary, startable one. Channel, description and
 *    turnaround join the name.
 * 3. **A category is identity, not status.** The leading disc was
 *    `bg-primary-50` — a ramp step, which mirrors under `[data-theme="dark"]`
 *    and paints a near-white plate on a dark card — and a category has no
 *    status to report. It takes the neutral identity tint, and the glyph takes
 *    the contrast-corrected ink rather than the `primary` fill.
 * 4. **Both controls clear 44 and press is a state layer.**
 *    `hover:opacity-90` dims the card's own content, which is M3's *disabled*
 *    signal, and `ring-primary-300` is a ramp step where the preset ships a
 *    dedicated `ring` colour that tracks the seed.
 */
export const ServiceCardV4 = React.forwardRef<HTMLDivElement, ServiceCardV4Props>(
  function ServiceCardV4(
    {
      category,
      title,
      description,
      channel,
      estimatedTime,
      actionLabel = 'Start',
      onStart,
      onClick,
      categoryLabels,
      channelLabels,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!title) return null;

    const cat = CATEGORY_V4[category] ?? CATEGORY_V4.other;
    const catWord = categoryLabels?.[category] ?? cat.label;
    const ch = channel ? (CHANNEL_V4[channel] ?? CHANNEL_V4.online) : undefined;
    const chWord = channel ? (channelLabels?.[channel] ?? ch?.label) : undefined;

    const body = (
      <>
        <span className="flex items-center gap-md">
          <span
            aria-hidden
            className="flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]"
            style={{ background: tintGround(IDENTITY_TONE) }}
          >
            <IconV4 glyph={cat.glyph} size="xl" className={tintInkClass(IDENTITY_TONE)} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-xs">
            <span className="truncate text-lg font-bold text-on-surface">{title}</span>
            <span className="truncate text-xs text-muted-text">{catWord}</span>
          </span>
          {ch != null && chWord != null ? (
            <BadgeV4 tone={ch.tone} {...BADGE_V4}>
              {`${ch.glyph} ${chWord}`}
            </BadgeV4>
          ) : null}
        </span>
        {description != null ? (
          <span className="mt-sm block text-sm text-on-surface">{description}</span>
        ) : null}
      </>
    );

    return (
      <CardV4
        ref={ref}
        variant={CARD_V4}
        className={cn('flex flex-col', className)}
        {...rest}
      >
        {onClick != null ? (
          <button
            type="button"
            onClick={onClick}
            aria-label={spokenLine([title, catWord, chWord, description, estimatedTime])}
            data-xen-v4-state=""
            style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
            className={cn(
              'flex w-full flex-col rounded-[var(--xen-radius-md)] text-left',
              MIN_TAP_CLASS,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {body}
          </button>
        ) : (
          <div className="flex w-full flex-col">{body}</div>
        )}

        {/*
          Start is a SIBLING of the card's activation, never a descendant.
          There is no ancestor key handler left to cancel it, so it needs
          neither `stopPropagation` nor a key guard to do exactly one thing.
        */}
        {estimatedTime != null || onStart != null ? (
          <div className="mt-md flex items-center justify-between gap-sm">
            {estimatedTime != null ? (
              <span className="text-xs text-muted-text">
                <span aria-hidden="true">⏱</span> {estimatedTime}
              </span>
            ) : (
              <span />
            )}
            {onStart != null ? (
              <ButtonV4 size="md" aria-label={spokenLine([actionLabel, title])} onClick={onStart}>
                {actionLabel}
              </ButtonV4>
            ) : null}
          </div>
        ) : null}
      </CardV4>
    );
  }
);
