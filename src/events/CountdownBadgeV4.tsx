import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_BG, TONE_ON } from '../primitives/internal/tone-v4';
import type { CountdownBadgeProps, CountdownTone } from './CountdownBadge';
import { TABULAR_CLASS, countdownParts, countdownSentence, spokenLine } from './internal/event-v4';

/** The words `countdownSentence` pluralises with. */
export interface CountdownUnitLabels {
  day?: string;
  days?: string;
  hour?: string;
  hours?: string;
  minute?: string;
  minutes?: string;
}

export interface CountdownBadgeV4Props extends CountdownBadgeProps {
  /** Singular and plural for each unit of the spoken countdown. */
  unitLabels?: CountdownUnitLabels;
  /** Shown when there is nothing to count down to. Default `'Date to be announced'`. */
  unknownLabel?: string;
}

/**
 * Fill and its guaranteed ink, per tone.
 *
 * `neutral` was `bg-border` with `text-on-surface` on it — a hairline token
 * used as a surface, carrying an ink the compiler never paired it with. Every
 * tone now takes the shared table's fill and the ink that table guarantees
 * against it.
 */
const TONE_CHIP: Record<CountdownTone, string> = {
  primary: `${TONE_BG.primary} ${TONE_ON.primary}`,
  accent: `${TONE_BG.accent} ${TONE_ON.accent}`,
  neutral: `${TONE_BG.neutral} ${TONE_ON.neutral}`,
};

/** The elapsed and unknown chips: the neutral fill and its paired ink. */
const NEUTRAL_CHIP = `${TONE_BG.neutral} ${TONE_ON.neutral}`;

const pad = (n: number): string => String(n).padStart(2, '0');

/**
 * **V4 countdown badge** — the web twin of the native `CountdownBadgeV4`, same
 * props as {@link CountdownBadge} plus `unitLabels` and `unknownLabel`.
 *
 * ## Four changes
 *
 * 1. **It stops announcing "Started" about an event nobody dated.** With
 *    neither `remainingMs` nor `target` the base fell through to `ms = 0`, and
 *    a zero delta reports elapsed — so a badge that had been told nothing
 *    confidently said the event had already begun. `countdownParts` returns
 *    `known: false` for that case and the badge renders `unknownLabel`.
 * 2. **The announcement is pluralised and actually lands.** It said "1 days 1
 *    hours 1 minutes", and it said it through `aria-label` on a role-less
 *    `div`, where a label is ignored outright. `countdownSentence()` fixes the
 *    grammar; `role="timer"` gives the label somewhere to attach.
 * 3. **The elapsed chip stops pairing `on-surface` ink with a `border` fill.**
 *    A hairline colour has no contrast promise as a surface. The elapsed and
 *    unknown chips take the neutral tone's fill and the ink the shared tone
 *    table guarantees against it — a pill, not a tag, so it keeps its radius.
 * 4. **The figures are tabular and the tiles are one token wide**, so a
 *    countdown does not jitter sideways as each digit ticks over, and the two
 *    twins compose the same width instead of `3rem` and `48`. `font-extrabold`
 *    is off the kit's weight scale.
 */
export const CountdownBadgeV4 = React.forwardRef<HTMLDivElement, CountdownBadgeV4Props>(
  function CountdownBadgeV4(
    {
      target,
      remainingMs,
      now,
      label,
      elapsedLabel = 'Started',
      variant = 'inline',
      tone = 'primary',
      unitLabels,
      unknownLabel = 'Date to be announced',
      className,
      ...rest
    },
    ref
  ) {
    // `undefined` where the base wrote `0`: "it has started" and "nobody told
    // me when it starts" are different answers and must not share a value.
    const ms =
      typeof remainingMs === 'number'
        ? remainingMs
        : target
          ? target.getTime() - (now ?? new Date()).getTime()
          : undefined;
    const parts = countdownParts(ms);
    const chip = TONE_CHIP[tone];

    if (!parts.known) {
      return (
        <div
          ref={ref}
          role="timer"
          aria-label={unknownLabel}
          className={cn(
            'inline-flex self-start rounded-full px-md py-xs',
            NEUTRAL_CHIP,
            className
          )}
          {...rest}
        >
          <span className="text-sm font-bold">{unknownLabel}</span>
        </div>
      );
    }

    if (parts.elapsed) {
      return (
        <div
          ref={ref}
          role="timer"
          aria-label={elapsedLabel}
          className={cn(
            'inline-flex self-start rounded-full px-md py-xs',
            NEUTRAL_CHIP,
            className
          )}
          {...rest}
        >
          <span className="text-sm font-bold">{elapsedLabel}</span>
        </div>
      );
    }

    const spoken = spokenLine([label, countdownSentence(parts, unitLabels ?? {})]);

    if (variant === 'blocks') {
      const blocks: { value: string; unit: string }[] = [
        { value: pad(parts.days), unit: 'DAY' },
        { value: pad(parts.hours), unit: 'HR' },
        { value: pad(parts.minutes), unit: 'MIN' },
      ];
      return (
        <div
          ref={ref}
          role="timer"
          aria-label={spoken}
          className={cn('flex flex-col gap-xs', className)}
          {...rest}
        >
          {label ? <span className="text-xs font-semibold text-muted-text">{label}</span> : null}
          <div aria-hidden="true" className="flex flex-row gap-xs">
            {blocks.map((b) => (
              <div
                key={b.unit}
                className={cn(
                  'flex min-w-[var(--xen-space-2xl)] flex-col items-center rounded-[var(--xen-radius-md)] px-sm py-sm',
                  chip
                )}
              >
                <span className={cn('text-lg font-bold', TABULAR_CLASS)}>{b.value}</span>
                <span className="text-xs">{b.unit}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const compact = `${parts.days > 0 ? `${parts.days}d ` : ''}${pad(parts.hours)}h ${pad(parts.minutes)}m`;
    return (
      <div
        ref={ref}
        role="timer"
        aria-label={spoken}
        className={cn(
          'inline-flex flex-row items-center gap-xs self-start rounded-full px-md py-xs',
          chip,
          className
        )}
        {...rest}
      >
        {label ? (
          <span aria-hidden="true" className="text-xs font-semibold">
            {label}
          </span>
        ) : null}
        <span aria-hidden="true" className={cn('text-sm font-bold', TABULAR_CLASS)}>
          {compact}
        </span>
      </div>
    );
  }
);
