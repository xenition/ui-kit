import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { countdownParts, countdownSentence, onPair, spokenLine, toneFill } from './internal/event-v4';
import type { CountdownBadgeProps } from './CountdownBadge';

export interface CountdownBadgeV4Props extends CountdownBadgeProps {
  /**
   * The singular and plural unit words the countdown is announced with.
   * Default `day` / `days`, `hour` / `hours`, `minute` / `minutes`.
   */
  unitLabels?: {
    day?: string;
    days?: string;
    hour?: string;
    hours?: string;
    minute?: string;
    minutes?: string;
  };
  /** Shown when there is nothing to count down to. Default `'Date to be announced'`. */
  unknownLabel?: string;
}

const pad = (n: number): string => String(n).padStart(2, '0');

/**
 * **V4 countdown badge** — same props as {@link CountdownBadge} plus
 * `unitLabels` and `unknownLabel`.
 *
 * ## Four changes
 *
 * 1. **It stops announcing "Started" when it was given nothing at all.** With
 *    neither `remainingMs` nor `target` the base fell through to `ms = 0`, and
 *    zero reads as elapsed — so a badge on an event with no date confidently
 *    told everyone it had already begun. `countdownParts()` reports
 *    `known: false` for that case and the badge says `unknownLabel` instead.
 * 2. **The announcement is pluralised, and it lands.** It read "1 days 1 hours
 *    1 minutes", on a `View` with no role, where the label is ignored anyway.
 *    `countdownSentence()` supplies the words and the badge is a `timer`.
 * 3. **The elapsed chip stops inking `onSurface` on a `border` fill** — a
 *    hairline token spent as a background, with no contrast promise behind the
 *    text on it. Ground and ink now come from the shared tone pair.
 * 4. **The figures are tabular**, so a countdown ticking from `09` to `10`
 *    does not shuffle the tiles sideways once a minute.
 */
export function CountdownBadgeV4({
  target,
  remainingMs,
  now,
  label,
  elapsedLabel = 'Started',
  unitLabels,
  unknownLabel = 'Date to be announced',
  variant = 'inline',
  tone = 'primary',
  style,
}: CountdownBadgeV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  // `undefined`, not `0`, when the caller supplied neither — that distinction
  // is the whole of change 1.
  const ms =
    typeof remainingMs === 'number'
      ? remainingMs
      : target
        ? target.getTime() - (now ?? new Date()).getTime()
        : undefined;
  const parts = countdownParts(ms);
  const bg = toneFill(theme, tone);
  const fg = onPair(theme, tone);
  const quietBg = toneFill(theme, 'neutral');
  const quietFg = onPair(theme, 'neutral');

  const chip = (text: string, ground: string, ink: string): React.ReactElement => (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={spokenLine([label, text])}
      style={[
        {
          alignSelf: 'flex-start',
          borderRadius: tokens.radius.full,
          backgroundColor: ground,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
      <TextV4 size="sm" weight="bold" style={{ color: ink }}>
        {text}
      </TextV4>
    </View>
  );

  if (!parts.known) return chip(unknownLabel, quietBg, quietFg);
  if (parts.elapsed) return chip(elapsedLabel, quietBg, quietFg);

  const spoken = spokenLine([label, countdownSentence(parts, unitLabels ?? {})]);

  if (variant === 'blocks') {
    const blocks: { value: string; unit: string }[] = [
      { value: pad(parts.days), unit: 'DAY' },
      { value: pad(parts.hours), unit: 'HR' },
      { value: pad(parts.minutes), unit: 'MIN' },
    ];
    return (
      <View
        accessible
        accessibilityRole="timer"
        accessibilityLabel={spoken}
        style={[{ gap: tokens.spacing.xs }, style]}
      >
        {label ? (
          <TextV4 size="xs" weight="semibold" tone="mutedText">
            {label}
          </TextV4>
        ) : null}
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
          {blocks.map((b) => (
            <View
              key={b.unit}
              style={{
                alignItems: 'center',
                // The same scale steps the web twin composes its tile width
                // from, so a tile is one size across the two platforms.
                minWidth: tokens.spacing['2xl'] + tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: bg,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
              }}
            >
              <TextV4 size="lg" weight="bold" numeric="tabular" style={{ color: fg }}>
                {b.value}
              </TextV4>
              <TextV4 size="xs" style={{ color: fg, letterSpacing: tokens.spacing.xs / 4 }}>
                {b.unit}
              </TextV4>
            </View>
          ))}
        </View>
      </View>
    );
  }

  const compact = `${parts.days > 0 ? `${parts.days}d ` : ''}${pad(parts.hours)}h ${pad(parts.minutes)}m`;
  return (
    <View
      accessible
      accessibilityRole="timer"
      accessibilityLabel={spoken}
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          borderRadius: tokens.radius.full,
          backgroundColor: bg,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
      {label ? (
        <TextV4 size="xs" weight="semibold" style={{ color: fg }}>
          {label}
        </TextV4>
      ) : null}
      <TextV4 size="sm" weight="bold" numeric="tabular" style={{ color: fg }}>
        {compact}
      </TextV4>
    </View>
  );
}
