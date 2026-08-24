import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import type { PollOption } from './types';

/** Token-derived translucent tint (no literal hex; mirrors Button/GlassPanel). */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface PollResultBarProps {
  /** The tallied options. Empty renders the empty state. */
  options: PollOption[];
  /** The id the current user voted for (highlighted + check). */
  selectedId?: string | null;
  /**
   * Reveal percentages + fill bars. When `false` and `onVote` is set, rows are
   * tappable to cast a vote instead. Default `true`.
   */
  showResults?: boolean;
  /** Cast a vote for an option (used when `showResults` is `false`). */
  onVote?: (optionId: string) => void;
  /** Accessible name for the poll. Default `'Poll results'`. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Poll result bars — one row per option with a proportional fill and a percent
 * of the total votes; the winning option and the user's own pick are
 * highlighted with the primary token and a check (the pick is also announced,
 * not color-only). When `showResults` is `false` and `onVote` is supplied the
 * rows become vote buttons. `0` total votes render every bar at 0% safely. No
 * literal colors.
 */
export function PollResultBar({
  options,
  selectedId,
  showResults = true,
  onVote,
  accessibilityLabel = 'Poll results',
  style,
}: PollResultBarProps): React.ReactElement {
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
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: isPick ? colors.primary : colors.border,
              backgroundColor: colors.surface,
              overflow: 'hidden',
            }}
          >
            {/* Fill layer (results mode only). */}
            {showResults ? (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${pct}%`,
                  backgroundColor: isWinner ? withAlpha(colors.primary, 0.22) : withAlpha(colors.primary, 0.1),
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
                  fontWeight: isPick || isWinner ? '700' : '500',
                }}
              >
                {opt.label}
              </Text>
              {showResults ? (
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
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
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {total} {total === 1 ? 'vote' : 'votes'}
        </Text>
      ) : null}
    </View>
  );
}
