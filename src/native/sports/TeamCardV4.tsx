import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { LeagueBadge } from './LeagueBadge';
import type { TeamCardProps, TeamForm } from './TeamCard';

/** Drop-in for {@link TeamCardProps} — same props, the V4 "broadcast" design. */
export type TeamCardV4Props = TeamCardProps;

const FORM_LABEL: Record<TeamForm, string> = { W: 'win', D: 'draw', L: 'loss' };

/**
 * TeamCard — **V4** "broadcast" design. The matchday take on a team summary: an
 * elevated card with the crest, name, and league; the current rank shown as a big
 * bold numeral in a soft-primary tile; the W/D/L record and a recent-form strip
 * whose results read by letter + a11y label, never color alone. `selected`
 * promotes to an accent border and stays a pressed affordance. Same props/behavior
 * as {@link TeamCardProps}; token-only colors via `useXenitionTheme()`. `loading`
 * swaps in a token skeleton.
 */
export function TeamCardV4({
  name,
  crest,
  league,
  won,
  drawn,
  lost,
  rank,
  form = [],
  variant = 'full',
  selected = false,
  loading = false,
  onPress,
  style,
}: TeamCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const tile = variant === 'tile';

  const container: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: selected ? colors.primary : colors.border,
    borderWidth: selected ? 2 : 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  if (loading) {
    return (
      <View accessibilityState={{ busy: true }} accessibilityLabel="Loading team" style={[container, style]}>
        <View style={{ height: tokens.typography.scale.xl, borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
        <View style={{ height: tokens.typography.scale.base, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
      </View>
    );
  }

  const hasRecord = won !== undefined || drawn !== undefined || lost !== undefined;
  const recordLabel = `${won ?? 0}W · ${drawn ?? 0}D · ${lost ?? 0}L`;

  const body = (
    <View style={[container, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <LeagueBadge name={name} crest={crest} label="" size={tile ? 'sm' : 'lg'} />
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}
          >
            {name}
          </Text>
          {league ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {league}
            </Text>
          ) : null}
        </View>
        {rank !== undefined ? (
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: tokens.spacing.xs,
              borderRadius: tokens.radius.md,
              backgroundColor: withAlpha(colors.primary, 0.12),
            }}
          >
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Rank</Text>
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
              #{rank}
            </Text>
          </View>
        ) : null}
      </View>

      {!tile && hasRecord ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {recordLabel}
        </Text>
      ) : null}

      {!tile && form.length > 0 ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
          {form.slice(-5).map((f, i) => {
            const c = f === 'W' ? colors.success : f === 'L' ? colors.danger : colors.muted;
            return (
              <View
                key={i}
                accessibilityLabel={FORM_LABEL[f]}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: withAlpha(colors.onSurface, 0.05),
                  borderWidth: 1,
                  borderColor: c,
                }}
              >
                <Text style={{ color: c, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{f}</Text>
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );

  const a11y = `${name}${rank !== undefined ? `, rank ${rank}` : ''}${hasRecord ? `, ${recordLabel}` : ''}`;

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={a11y}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {body}
      </Pressable>
    );
  }
  return (
    <View accessible accessibilityLabel={a11y}>
      {body}
    </View>
  );
}
