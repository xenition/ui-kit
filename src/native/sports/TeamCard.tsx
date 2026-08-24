import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { LeagueBadge } from './LeagueBadge';

/** Recent result token for the mini form strip. */
export type TeamForm = 'W' | 'D' | 'L';

export interface TeamCardProps {
  /** Team display name. */
  name: string;
  /** Crest glyph or emoji. */
  crest?: string;
  /** Competition / division caption. */
  league?: string;
  /** Wins. */
  won?: number;
  /** Draws. */
  drawn?: number;
  /** Losses. */
  lost?: number;
  /** Current table position (1-based). */
  rank?: number;
  /** Recent form oldest→newest (max 5 shown). */
  form?: TeamForm[];
  /** Layout: `full` card, or a slim `tile`. Default `full`. */
  variant?: 'full' | 'tile';
  /** Marks the card as selected (accent border). */
  selected?: boolean;
  /** Loading skeleton. */
  loading?: boolean;
  /** Fires on tap. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const FORM_LABEL: Record<TeamForm, string> = { W: 'win', D: 'draw', L: 'loss' };

/**
 * A team summary card — crest, name, league, W/D/L record, rank, and a recent
 * form strip whose results read by letter + a11y label, not color alone.
 * Presentational: shaped props plus an optional `onPress`. `tile` is a slim
 * pickable variant. Reuses `LeagueBadge` for the crest. Token-only colors.
 */
export function TeamCard({
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
}: TeamCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const tile = variant === 'tile';

  const container: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: selected ? colors.primary : colors.border,
    borderWidth: selected ? 2 : 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
  };

  if (loading) {
    return (
      <View accessibilityState={{ busy: true }} accessibilityLabel="Loading team" style={[container, style]}>
        <View style={{ height: tokens.typography.scale.xl, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ height: tokens.typography.scale.base, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
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
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
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
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Rank</Text>
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
              #{rank}
            </Text>
          </View>
        ) : null}
      </View>

      {!tile && hasRecord ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
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
                  backgroundColor: tokens.ramps.neutral[100],
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
