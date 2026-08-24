import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Badge, Rating, type BadgeTone } from '../primitives';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';

/** Outcome of a past trip. */
export type TripOutcome = 'completed' | 'cancelled' | 'no-show';
/** Presentation for a {@link TripHistoryRow}. */
export type TripHistoryVariant = 'default' | 'compact';

/** Outcome → tone + spelled-out word (never color alone). */
const OUTCOME: Record<TripOutcome, { tone: keyof SemanticColors; word: string }> = {
  completed: { tone: 'success', word: 'Completed' },
  cancelled: { tone: 'danger', word: 'Cancelled' },
  'no-show': { tone: 'warn', word: 'No-show' },
};

export interface TripHistoryRowProps {
  /** Pickup label / address (short). */
  from: string;
  /** Drop-off label / address (short). */
  to: string;
  /** When the trip happened, pre-formatted (e.g. `'Sep 3, 8:14 AM'`). */
  dateLabel?: string;
  /** Fare charged in integer minor units (cents). */
  fareCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Trip outcome. */
  outcome?: TripOutcome;
  /** Star rating the rider gave (0–5); hidden when omitted. */
  rating?: number;
  /** Presentation variant. */
  variant?: TripHistoryVariant;
  /** Fires when the row is pressed (receipt / detail). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

function formatMoney(cents: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
  } catch {
    return `$${(cents / 100).toFixed(2)}`;
  }
}

/**
 * One past trip in a history list — the from→to route, when it happened, the
 * fare, an outcome (completed/cancelled/no-show, shown as a text-labelled badge
 * so meaning never rests on color), and an optional rider rating. Data +
 * `onPress` only; nothing fetches. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors. `variant="compact"` tightens the row.
 * For an empty history list, render {@link TripHistoryEmpty} instead.
 */
export function TripHistoryRow({
  from,
  to,
  dateLabel,
  fareCents,
  currency = 'USD',
  outcome = 'completed',
  rating,
  variant = 'default',
  onPress,
  style,
}: TripHistoryRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const o = OUTCOME[outcome] ?? OUTCOME.completed;
  const compact = variant === 'compact';

  const a11y = `Trip from ${from} to ${to}${dateLabel ? `, ${dateLabel}` : ''}, ${o.word}${
    typeof fareCents === 'number' ? `, ${formatMoney(fareCents, currency)}` : ''
  }`;

  const body = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {from} → {to}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          {dateLabel ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{dateLabel}</Text>
          ) : null}
          <Badge tone={(o.tone === 'muted' ? 'neutral' : o.tone) as BadgeTone} variant="soft" size="sm">
            {o.word}
          </Badge>
          {typeof rating === 'number' && !compact ? <Rating value={rating} size="sm" /> : null}
        </View>
      </View>
      {typeof fareCents === 'number' ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {formatMoney(fareCents, currency)}
        </Text>
      ) : null}
    </View>
  );

  const containerStyle: ViewStyle = {
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: compact ? tokens.spacing.sm : tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
  };

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={a11y} style={[containerStyle, style]}>
        {body}
      </View>
    );
  }
  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => [containerStyle, style, { opacity: pressed ? 0.9 : 1 }]}
    >
      {body}
    </Pressable>
  );
}

export interface TripHistoryEmptyProps {
  /** Headline for the empty state. */
  title?: string;
  /** Supporting line. */
  message?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The empty-state companion to {@link TripHistoryRow} — shown when a rider or
 * driver has no past trips. Token-only colors; a plain informative panel.
 */
export function TripHistoryEmpty({
  title = 'No trips yet',
  message = 'Completed rides will appear here.',
  style,
}: TripHistoryEmptyProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      accessible
      accessibilityLabel={`${title}. ${message}`}
      style={[
        {
          alignItems: 'center',
          gap: tokens.spacing.xs,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          borderStyle: 'dashed',
          backgroundColor: withAlpha(colors.muted, 0.06),
          paddingVertical: tokens.spacing.xl,
          paddingHorizontal: tokens.spacing.lg,
        },
        style,
      ]}
    >
      <Text style={{ fontSize: tokens.typography.scale['2xl'] }}>🚗</Text>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>{message}</Text>
    </View>
  );
}
