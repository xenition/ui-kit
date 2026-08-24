import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

/** One competitor slot in a bracket match. */
export interface BracketSlot {
  /** Competitor name; `undefined`/empty renders a "TBD" placeholder. */
  name?: string;
  /** Score / result (optional). */
  score?: number;
  /** Marks the advancing side. */
  winner?: boolean;
}

/** A single knockout tie. */
export interface BracketMatch {
  /** Stable key. */
  id: string;
  /** Top slot. */
  top: BracketSlot;
  /** Bottom slot. */
  bottom: BracketSlot;
}

/** A bracket round (e.g. Quarter-finals). */
export interface BracketRound {
  /** Round title. */
  title: string;
  /** Matches in the round. */
  matches: BracketMatch[];
}

export interface BracketViewProps {
  /** Rounds left→right (earliest first). */
  rounds: BracketRound[];
  /** Fires with the tapped match. */
  onSelectMatch?: (match: BracketMatch, roundIndex: number) => void;
  /** Empty-state label. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A knockout tournament bracket — a STATIC, dependency-free layout built from
 * horizontally-scrolling round columns of `View`-based match tiles. No SVG /
 * canvas / native dep; connectors are implied by column layout. Each tie shows
 * both competitors (TBD placeholder when unknown) and marks the winner by
 * weight + a check glyph, not color alone. Tappable via `onSelectMatch`.
 * Token-only colors.
 */
export function BracketView({
  rounds,
  onSelectMatch,
  emptyLabel = 'Bracket not drawn yet',
  style,
}: BracketViewProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (rounds.length === 0) {
    return (
      <View
        style={[
          {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.surface,
            padding: tokens.spacing.xl,
            alignItems: 'center',
            gap: tokens.spacing.xs,
          },
          style,
        ]}
      >
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {emptyLabel}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>
          Rounds appear once the draw is made.
        </Text>
      </View>
    );
  }

  const renderSlot = (slot: BracketSlot): React.ReactElement => {
    const named = slot.name && slot.name.length > 0;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1 }}>
          {slot.winner ? (
            <Text allowFontScaling={false} style={{ color: colors.success, fontSize: tokens.typography.scale.xs }}>
              ✓
            </Text>
          ) : (
            <Text allowFontScaling={false} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              ·
            </Text>
          )}
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              color: named ? colors.onSurface : colors.muted,
              fontSize: tokens.typography.scale.sm,
              fontWeight: slot.winner ? '700' : '500',
              fontStyle: named ? 'normal' : 'italic',
            }}
          >
            {named ? slot.name : 'TBD'}
          </Text>
        </View>
        {slot.score !== undefined ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {slot.score}
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={{ gap: tokens.spacing.lg, padding: tokens.spacing.xs }}
    >
      {rounds.map((round, ri) => (
        <View key={`${round.title}-${ri}`} style={{ width: 176, justifyContent: 'space-around', gap: tokens.spacing.md }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', textAlign: 'center' }}>
            {round.title}
          </Text>
          {round.matches.map((m) => {
            const tile = (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: tokens.radius.md,
                  backgroundColor: colors.surface,
                  padding: tokens.spacing.sm,
                  gap: tokens.spacing.xs,
                }}
              >
                {renderSlot(m.top)}
                <View style={{ height: 1, backgroundColor: colors.border }} />
                {renderSlot(m.bottom)}
              </View>
            );
            const a11y = `${m.top.name ?? 'TBD'} versus ${m.bottom.name ?? 'TBD'}`;
            return onSelectMatch ? (
              <Pressable
                key={m.id}
                accessibilityRole="button"
                accessibilityLabel={a11y}
                onPress={() => onSelectMatch(m, ri)}
                style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              >
                {tile}
              </Pressable>
            ) : (
              <View key={m.id} accessible accessibilityLabel={a11y}>
                {tile}
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}
