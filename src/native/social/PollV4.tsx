import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import type { PollProps } from './Poll';

/** Drop-in for {@link PollProps} — same props, the V4 "feed" design. */
export type PollV4Props = PollProps;

/**
 * Poll — **V4** "feed" design. Clean and airy with a single primary accent:
 * before voting, big (≥44px) tappable option rows; after voting or when
 * `closed`, each row becomes a soft-primary fill bar showing the `%`, with the
 * viewer's pick and the leading option emphasized in primary. Keeps the
 * total-votes + expiry caption and guards an all-zero tally. Same props/behavior
 * as {@link PollProps}; token-only colors via `useXenitionTheme()` + `withAlpha`,
 * `radiogroup`/`radio` a11y.
 */
export function PollV4({
  question,
  options,
  votedOptionId,
  closed = false,
  onVote,
  meta,
  style,
}: PollV4Props): React.ReactElement {
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
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
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
        const emphasize = selected || leading;

        if (showResults) {
          return (
            <View
              key={o.id}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`${o.label}, ${pct}%`}
              style={{
                overflow: 'hidden',
                minHeight: 44,
                justifyContent: 'center',
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: emphasize ? colors.primary : colors.border,
                backgroundColor: colors.surface,
              }}
            >
              {/* Soft-primary results fill (token-only tint). */}
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${pct}%`,
                  backgroundColor: withAlpha(colors.primary, emphasize ? 0.2 : 0.1),
                }}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }}>
                <Text style={{ color: emphasize ? colors.primaryText : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: emphasize ? '700' : '500' }}>
                  {selected ? `✓ ${o.label}` : o.label}
                </Text>
                <Text style={{ color: emphasize ? colors.primaryText : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
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
              minHeight: 44,
              justifyContent: 'center',
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              borderRadius: tokens.radius.full,
              backgroundColor: pressed ? colors.primary : withAlpha(colors.primary, 0.1),
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
