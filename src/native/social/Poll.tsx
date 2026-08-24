import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';

export interface PollOption {
  id: string;
  label: string;
  /** Vote tally for this option. */
  votes?: number;
}

export interface PollProps {
  /** The poll question. */
  question: string;
  /** Answer options. */
  options: ReadonlyArray<PollOption>;
  /** The option the viewer voted for (controlled). Presence flips to results. */
  votedOptionId?: string;
  /** Poll is closed — always show results, disable voting. */
  closed?: boolean;
  /** Fires with the option id when the viewer votes. */
  onVote?: (id: string) => void;
  /** Footer meta (e.g. `1,204 votes · 2d left`). Auto-derived if omitted. */
  meta?: string;
  /**
   * Surface treatment for the poll card — fill/border/elevation only;
   * radius/padding are unchanged. Default `'classic'` (the historical look).
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A tap-to-vote poll with three states: open (tappable options), voted, and
 * closed. Once voted or closed each option becomes a labeled percentage bar,
 * the viewer's pick is tinted primary, and the leading option is emphasized.
 * Guards an all-zero tally. Token-only.
 */
export function Poll({
  question,
  options,
  votedOptionId,
  closed = false,
  onVote,
  meta,
  appearance = 'classic',
  style,
}: PollProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const total = options.reduce((sum, o) => sum + (o.votes ?? 0), 0);
  const showResults = closed || votedOptionId != null;
  const leadVotes = options.reduce((max, o) => Math.max(max, o.votes ?? 0), 0);

  const derivedMeta =
    meta ??
    `${total.toLocaleString()} ${total === 1 ? 'vote' : 'votes'}${closed ? ' · Final' : ''}`;

  return (
    <Animated.View
      accessibilityRole="radiogroup"
      style={[
        { opacity: enter.opacity, transform: enter.transform },
        {
          ...appearanceStyle(appearance, colors, tokens),
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {question}
      </Text>

      {options.map((o) => {
        const votes = o.votes ?? 0;
        const pct = total > 0 ? Math.round((votes / total) * 100) : 0;
        const selected = votedOptionId === o.id;
        const leading = showResults && votes === leadVotes && leadVotes > 0;

        if (showResults) {
          return (
            <View
              key={o.id}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`${o.label}, ${pct}%`}
              style={{
                overflow: 'hidden',
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: colors.surface,
              }}
            >
              {/* Filled results bar (token-only tint). */}
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${pct}%`,
                  backgroundColor: selected ? colors.primary : colors.border,
                  opacity: selected ? 0.25 : 0.6,
                }}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }}>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: leading ? '700' : '500' }}>
                  {selected ? `✓ ${o.label}` : o.label}
                </Text>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                  {pct}%
                </Text>
              </View>
            </View>
          );
        }

        return (
          <Pressable
            key={o.id}
            accessibilityRole="radio"
            accessibilityLabel={o.label}
            accessibilityState={{ selected: false }}
            disabled={!onVote}
            onPress={onVote ? () => onVote(o.id) : undefined}
            style={({ pressed }) => ({
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: colors.primary,
              backgroundColor: pressed ? colors.primary : colors.surface,
            })}
          >
            {({ pressed }) => (
              <Text style={{ color: pressed ? colors.onPrimary : colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600', textAlign: 'center' }}>
                {o.label}
              </Text>
            )}
          </Pressable>
        );
      })}

      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{derivedMeta}</Text>
    </Animated.View>
  );
}
