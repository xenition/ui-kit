import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** The kind of match event carried by an {@link EventFeedItem}. */
export type EventFeedKind =
  | 'goal'
  | 'own-goal'
  | 'yellow'
  | 'red'
  | 'sub'
  | 'var'
  | 'penalty';

/** One entry in the {@link EventFeed} — a single match moment. */
export interface EventFeedItem {
  /** Match minute label as text (e.g. `"45+2'"`, `"78'"`). */
  minute: string;
  /** The kind of event — selects the glyph and semantic tint. */
  kind: EventFeedKind;
  /** Human-readable description (e.g. `"Haaland (assist: De Bruyne)"`). */
  text: string;
  /**
   * Which team the event belongs to. When set the row aligns to that side
   * (home→left, away→right); when omitted the row is left-aligned.
   */
  side?: 'home' | 'away';
}

/** Glyph + accessible label + semantic color slot per kind (color reinforces the glyph, never alone). */
const KIND_META: Record<EventFeedKind, { glyph: string; label: string; slot: keyof SemanticColors }> = {
  goal: { glyph: '⚽', label: 'Goal', slot: 'primary' },
  'own-goal': { glyph: '🥅', label: 'Own goal', slot: 'warn' },
  penalty: { glyph: '🅿', label: 'Penalty', slot: 'primary' },
  yellow: { glyph: '🟨', label: 'Yellow card', slot: 'warn' },
  red: { glyph: '🟥', label: 'Red card', slot: 'danger' },
  sub: { glyph: '🔁', label: 'Substitution', slot: 'success' },
  var: { glyph: '📺', label: 'VAR', slot: 'muted' },
};

export interface EventFeedProps {
  /**
   * The match events, in the order they should appear (typically newest-first
   * or chronological — the caller controls it). Each renders as a row with a
   * minute chip, a kind glyph and its text.
   */
  events: readonly EventFeedItem[];
  /** Optional card heading (e.g. `"Key events"`). Omit for the list alone. */
  title?: string;
  /** Text shown when {@link events} is empty. Default `"No events yet"`. */
  emptyLabel?: string;
  /** Optional style override merged onto the card container. */
  style?: ViewStyle;
}

/**
 * EventFeed — **V4** "broadcast" design. A vertical feed of match moments on an
 * elevated card: each row pairs a bold minute chip with a round glyph node
 * (goal ⚽ / card 🟨·🟥 / sub 🔁 / VAR 📺) tinted from its semantic token and the
 * event text. Goals are emphasized (heavier text); rows with a `side` align
 * home→left / away→right. Kind is always legible from glyph + shape, not color
 * alone. Token-only colors via `useXenitionTheme()`; dark-mode safe.
 */
export function EventFeed({
  events,
  title,
  emptyLabel = 'No events yet',
  style,
}: EventFeedProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  const header = title ? (
    <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
      {title}
    </Text>
  ) : null;

  if (events.length === 0) {
    return (
      <View style={[container, style]}>
        {header}
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center', paddingVertical: tokens.spacing.sm }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  return (
    <View style={[container, style]}>
      {header}
      <View accessibilityRole="list" style={{ gap: 6 }}>
        {events.map((e, i) => {
          const meta = KIND_META[e.kind] ?? KIND_META.goal;
          const tint = colors[meta.slot];
          const isGoal = e.kind === 'goal' || e.kind === 'own-goal' || e.kind === 'penalty';
          const away = e.side === 'away';
          const a11y = `${e.minute}, ${meta.label}${e.side ? `, ${away ? 'away' : 'home'}` : ''}: ${e.text}`;

          const chip = (
            <View style={{ minWidth: 44, alignItems: 'center' }}>
              <View
                style={{
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: tokens.radius.full,
                  backgroundColor: colors.surface,
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: 1,
                }}
              >
                <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
                  {e.minute}
                </Text>
              </View>
            </View>
          );

          const node = (
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: withAlpha(tint, 0.12),
              }}
            >
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
                {meta.glyph}
              </Text>
            </View>
          );

          const label = (
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                color: colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: isGoal ? '800' : '500',
                textAlign: away ? 'right' : 'left',
              }}
            >
              {e.text}
            </Text>
          );

          return (
            <View
              key={i}
              accessible
              accessibilityRole="text"
              accessibilityLabel={a11y}
              style={{
                flexDirection: away ? 'row-reverse' : 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: 2,
              }}
            >
              {chip}
              {node}
              {label}
            </View>
          );
        })}
      </View>
    </View>
  );
}
