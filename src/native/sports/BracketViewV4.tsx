import * as React from 'react';
import { Pressable, ScrollView, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type {
  BracketViewProps,
  BracketSlot,
  BracketMatch,
  BracketRound,
} from './BracketView';

/** Drop-in for {@link BracketViewProps} — same props, the V4 "broadcast" design. */
export type BracketViewV4Props = BracketViewProps;

/**
 * BracketView — **V4** "broadcast" design. The knockout draw as a matchday
 * graphic: horizontally-scrolling round columns of clean, elevated matchup
 * cells, the advancing side bolded and washed in a soft-primary tint with a
 * primary check glyph (never color alone). The implied connective column
 * structure of the base is preserved, as is horizontal scroll. Same
 * props/behavior as {@link BracketViewProps}; token-only colors via
 * `useXenitionTheme()`.
 */
export function BracketViewV4({
  rounds,
  onSelectMatch,
  emptyLabel = 'Bracket not drawn yet',
  style,
}: BracketViewV4Props): React.ReactElement {
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
    const named = Boolean(slot.name && slot.name.length > 0);
    const win = Boolean(slot.winner);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.xs,
          paddingVertical: 2,
          borderRadius: tokens.radius.sm,
          backgroundColor: win ? withAlpha(colors.primary, 0.1) : 'transparent',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1 }}>
          {win ? (
            <Text allowFontScaling={false} style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
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
              color: named ? (win ? colors.primary : colors.onSurface) : colors.muted,
              fontSize: tokens.typography.scale.sm,
              fontWeight: win ? '800' : '500',
              fontStyle: named ? 'normal' : 'italic',
            }}
          >
            {named ? slot.name : 'TBD'}
          </Text>
        </View>
        {slot.score !== undefined ? (
          <Text style={{ color: win ? colors.primary : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
            {slot.score}
          </Text>
        ) : null}
      </View>
    );
  };

  const renderMatch = (m: BracketMatch, ri: number): React.ReactElement => {
    const tileStyle: ViewStyle = {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: tokens.radius.md,
      backgroundColor: colors.surface,
      padding: tokens.spacing.sm,
      gap: tokens.spacing.xs,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    };
    const tile = (
      <View style={tileStyle}>
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
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={{ gap: tokens.spacing.lg, padding: tokens.spacing.xs }}
    >
      {rounds.map((round: BracketRound, ri: number) => (
        <View key={`${round.title}-${ri}`} style={{ width: 176, justifyContent: 'space-around', gap: tokens.spacing.md }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '800', textAlign: 'center', letterSpacing: 0.5 }}>
            {round.title}
          </Text>
          {round.matches.map((m) => renderMatch(m, ri))}
        </View>
      ))}
    </ScrollView>
  );
}

export type { BracketSlot, BracketMatch, BracketRound };
