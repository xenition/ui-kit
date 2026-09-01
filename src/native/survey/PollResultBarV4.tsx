import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { PollResultBarProps } from './PollResultBar';

/** Drop-in for {@link PollResultBarProps} — same props, the V4 "focus" design. */
export type PollResultBarV4Props = PollResultBarProps;

/**
 * PollResultBar — **V4** "focus" design. The calm, legible take on a result
 * chart: tall (~44px) rounded rows on a soft-primary track, each filled to its
 * share of the vote in primary and trailed by a big percent numeral. The
 * **leading** option is emphasised (bolder label, solid-primary fill) and the
 * respondent's own pick keeps its primary border + spoken "your choice"; when
 * `showResults` is `false` and `onVote` is set the rows become vote buttons.
 * One accent (primary), no gradients. Same props/behavior as
 * {@link PollResultBarProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. `0` total votes render every bar at 0% safely.
 */
export function PollResultBarV4({
  options,
  selectedId,
  showResults = true,
  onVote,
  accessibilityLabel = 'Poll results',
  style,
}: PollResultBarV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const total = options.reduce((sum, o) => sum + Math.max(0, o.votes), 0);
  const topVotes = options.reduce((m, o) => Math.max(m, o.votes), 0);

  if (options.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ padding: tokens.spacing.lg, alignItems: 'center' }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
          No poll options yet.
        </Text>
      </View>
    );
  }

  return (
    <View accessibilityRole="list" accessibilityLabel={accessibilityLabel} style={[{ gap: tokens.spacing.sm }, style]}>
      {options.map((opt) => {
        const pct = total > 0 ? Math.round((Math.max(0, opt.votes) / total) * 100) : 0;
        const isPick = selectedId === opt.id;
        const isWinner = showResults && total > 0 && opt.votes === topVotes;
        const rowLabel = showResults
          ? `${opt.label}: ${pct}%${isPick ? ', your choice' : ''}`
          : opt.label;

        const Row = (
          <View
            accessibilityLabel={rowLabel}
            style={{
              minHeight: 44,
              justifyContent: 'center',
              borderRadius: tokens.radius.lg,
              borderWidth: 1,
              borderColor: isPick ? colors.primary : colors.border,
              // Soft-primary track in results mode; a plain surface for voting.
              backgroundColor: showResults ? withAlpha(colors.primary, 0.12) : colors.surface,
              overflow: 'hidden',
            }}
          >
            {/* Fill layer — primary width by %. The leader reads solid; the rest
                a calmer 70% so the track stays visible behind the text. */}
            {showResults ? (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${pct}%`,
                  backgroundColor: isWinner ? colors.primary : withAlpha(colors.primary, 0.7),
                }}
              />
            ) : null}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
              }}
            >
              {isPick ? <Icon glyph="✓" size="sm" color="primary" /> : opt.icon ? <Icon glyph={opt.icon} size="base" color="onSurface" /> : null}
              <Text
                style={{
                  flex: 1,
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: isPick || isWinner ? '800' : '600',
                }}
              >
                {opt.label}
              </Text>
              {showResults ? (
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
                  {pct}%
                </Text>
              ) : null}
            </View>
          </View>
        );

        if (!showResults && onVote) {
          return (
            <Pressable
              key={opt.id}
              accessibilityRole="button"
              accessibilityLabel={`Vote for ${opt.label}`}
              onPress={() => onVote(opt.id)}
            >
              {Row}
            </Pressable>
          );
        }
        return <View key={opt.id}>{Row}</View>;
      })}

      {showResults ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {total} {total === 1 ? 'vote' : 'votes'}
        </Text>
      ) : null}
    </View>
  );
}
