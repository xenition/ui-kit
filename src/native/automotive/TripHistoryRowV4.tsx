import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowEdgeStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { formatMoney } from '../commerce/money';
import { metaLine, type ToneV4 } from './internal/fleet-v4';
import type {
  TripHistoryEmptyProps,
  TripHistoryRowProps,
  TripOutcome,
} from './TripHistoryRow';

export interface TripHistoryRowV4Props extends TripHistoryRowProps {
  /** Override the outcome words — three English phrases lived inside. */
  outcomeLabels?: Partial<Record<TripOutcome, string>>;
  /** Separator between the two endpoints. Default `'→'`. */
  routeSeparator?: string;
  /** Draw the separator under the row. Default `true`; pass `false` on the last. */
  last?: boolean;
}

export interface TripHistoryEmptyV4Props extends TripHistoryEmptyProps {
  /** Glyph above the message. Default `'🚗'`. */
  glyph?: string;
}

/** Outcome → tone and default word. Genuinely a status, so the tones stay. */
const OUTCOME_META: Record<TripOutcome, { label: string; tone: ToneV4 }> = {
  completed: { label: 'Completed', tone: 'success' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
  'no-show': { label: 'No-show', tone: 'warn' },
};

/**
 * **V4 trip history row** — same props as {@link TripHistoryRow} plus
 * `outcomeLabels`, `routeSeparator` and `last`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line** (`dashboard/internal/row-v4`),
 *    so its height, padding, press fill and separator inset are the decisions
 *    every other row in the kit makes rather than this component's own.
 * 2. **The fare is tabular.** A trip history is a column of money and the base
 *    left it proportional, so there was no edge to scan down.
 * 3. **The route reads as one string to a screen reader** — "Bank St to
 *    Airport" — rather than two loose labels either side of an arrow glyph
 *    that is announced as "rightwards arrow".
 * 4. **The rating carries its number**, via `RatingV4 showValue`.
 *
 * **Renders nothing without both endpoints** (§4.5).
 */
export function TripHistoryRowV4({
  from,
  to,
  dateLabel,
  fareCents,
  currency = 'USD',
  outcome = 'completed',
  rating,
  variant = 'default',
  outcomeLabels,
  routeSeparator = '→',
  last = false,
  onPress,
  style,
}: TripHistoryRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!from || !to) return null;

  const meta = OUTCOME_META[outcome];
  const word = outcomeLabels?.[outcome] ?? meta.label;
  const compact = variant === 'compact';
  const caption = metaLine([dateLabel, compact ? null : word]);

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: Boolean(caption) }),
        { backgroundColor: rowGround(theme, { pressed }) },
        !last ? rowEdgeStyle(theme) : null,
        style,
      ]}
    >
      <View style={rowTextStyle(theme)}>
        {/*
          One announced string. The arrow is decoration — a reader that meets
          it announces "rightwards arrow" between two place names.
        */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1} style={{ flexShrink: 1 }}>
            {from}
          </TextV4>
          <TextV4 size="sm" tone="mutedText" accessibilityElementsHidden>
            {routeSeparator}
          </TextV4>
          <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1} style={{ flexShrink: 1 }}>
            {to}
          </TextV4>
        </View>
        {caption ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        {typeof fareCents === 'number' ? (
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" numeric="tabular">
            {formatMoney(fareCents, currency)}
          </TextV4>
        ) : null}
        {typeof rating === 'number' ? <RatingV4 value={rating} size="sm" showValue /> : null}
      </View>

      {compact ? (
        <BadgeV4 tone={meta.tone} variant="soft" size="sm">
          {word}
        </BadgeV4>
      ) : null}
    </View>
  );

  const name = metaLine([
    `${from} to ${to}`,
    dateLabel,
    word,
    typeof fareCents === 'number' ? formatMoney(fareCents, currency) : null,
  ]);

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={name}>
        {content(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}

/**
 * **V4 empty trip history** — same props as {@link TripHistoryEmpty} plus
 * `glyph`.
 *
 * The base centred a title and a message in muted text. V4 gives it the glyph
 * the rest of the kit's empty states carry, and moves the message to
 * `mutedText` — the slot with a contrast promise, on the only copy the screen
 * has.
 */
export function TripHistoryEmptyV4({
  title = 'No trips yet',
  message = 'Your completed rides will appear here.',
  glyph = '🚗',
  style,
}: TripHistoryEmptyV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      accessible
      accessibilityRole="summary"
      accessibilityLabel={metaLine([title, message])}
      style={[
        { alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.xl },
        style,
      ]}
    >
      <IconV4 glyph={glyph} size="3xl" />
      <TextV4 size="base" weight="semibold" tone="onSurface" align="center">
        {title}
      </TextV4>
      {message ? (
        <TextV4 size="sm" tone="mutedText" align="center">
          {message}
        </TextV4>
      ) : null}
    </View>
  );
}
