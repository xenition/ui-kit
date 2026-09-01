import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import {
  broadcastGradient,
  broadcastInk,
  broadcastInkSoft,
  broadcastTile,
  broadcastBorder,
} from './internal/broadcast';
import type { MatchScoreTeam, MatchScoreStatus } from './MatchScore';

/** One crest·score·score·crest hero for a live/near-live fixture. Presentational only. */
export interface MatchHeaderProps {
  /** Home side (crest glyph, name, score). */
  home: MatchScoreTeam;
  /** Away side (crest glyph, name, score). */
  away: MatchScoreTeam;
  /** Match lifecycle — drives the live pulse + status label (never color alone). */
  status: MatchScoreStatus;
  /** Live clock label (e.g. `67'`) — surfaced in the frosted pill when `status === 'live'`. */
  minute?: string;
  /** Competition / round caption above the scoreline (e.g. `Premier League · MD 12`). */
  competition?: string;
  /** Stadium / venue line under the competition. */
  venue?: string;
  /** Fires on the optional back affordance; the chevron only renders when set. */
  onBack?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STATUS_META: Record<
  MatchScoreStatus,
  { label: string; glyph: string; live: boolean }
> = {
  live: { label: 'LIVE', glyph: '●', live: true },
  halftime: { label: 'HT', glyph: '●', live: true },
  final: { label: 'FT', glyph: '✓', live: false },
  upcoming: { label: 'Upcoming', glyph: '🕑', live: false },
  postponed: { label: 'Postponed', glyph: '⚠', live: false },
};

/**
 * MatchHeader — the sports module's **live-match peak**. A full brand-gradient
 * hero: the competition + venue read in near-white / frosted ink at the top, a
 * big crest·score·score·crest line dominates the middle, and a live pulse +
 * minute sit in a frosted pill (`broadcastTile`) — the "LIVE" state is announced
 * to assistive tech via `accessibilityLiveRegion` and reinforced by a dot plus
 * text, never color alone. Presentational only: shaped `home`/`away` teams, a
 * `status`, and an optional `onBack`; nothing fetches. Token-only colors via
 * `useXenitionTheme()` + `broadcast*(tokens.ramps)` — no literals, dark-safe.
 */
export function MatchHeader({
  home,
  away,
  status,
  minute,
  competition,
  venue,
  onBack,
  style,
}: MatchHeaderProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = broadcastInk(r);
  const inkSoft = broadcastInkSoft(r);
  const meta = STATUS_META[status] ?? STATUS_META.upcoming;
  const statusRight = status === 'live' && minute ? minute : meta.label;

  const a11y =
    `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
    (status === 'live' && minute ? `, ${minute}` : '');

  const homeWins =
    home.score !== undefined && away.score !== undefined && home.score > away.score;
  const awayWins =
    home.score !== undefined && away.score !== undefined && away.score > home.score;

  const renderCrest = (team: MatchScoreTeam, isWinner: boolean): React.ReactElement => (
    <View style={{ flex: 1, minWidth: 0, alignItems: 'center', gap: tokens.spacing.sm }}>
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
        {team.crest ?? '🛡'}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          color: ink,
          fontSize: tokens.typography.scale.sm,
          fontWeight: isWinner ? '800' : '500',
          textAlign: 'center',
        }}
      >
        {team.name}
      </Text>
    </View>
  );

  const scoreText = (score: number | undefined): React.ReactElement => (
    <Text
      allowFontScaling={false}
      style={{
        color: score === undefined ? inkSoft : ink,
        fontSize: tokens.typography.scale['3xl'] * 1.4,
        fontWeight: '800',
        letterSpacing: -1,
      }}
    >
      {score === undefined ? '–' : score}
    </Text>
  );

  return (
    <View accessible accessibilityLabel={a11y} style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={broadcastGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
          {onBack ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={onBack}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: broadcastTile(r),
                borderWidth: 1,
                borderColor: broadcastBorder(r),
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale.xl }}>
                ‹
              </Text>
            </Pressable>
          ) : null}
          <View style={{ flex: 1, minWidth: 0 }}>
            {competition ? (
              <Text
                numberOfLines={1}
                style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '800', letterSpacing: 0.5 }}
              >
                {competition.toUpperCase()}
              </Text>
            ) : null}
            {venue ? (
              <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, marginTop: 2 }}>
                {venue}
              </Text>
            ) : null}
          </View>
          <View
            accessibilityRole="text"
            accessibilityLiveRegion={meta.live ? 'polite' : 'none'}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.xs,
              borderRadius: tokens.radius.full,
              backgroundColor: broadcastTile(r),
              borderWidth: 1,
              borderColor: broadcastBorder(r),
            }}
          >
            {meta.live ? (
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: ink }} />
            ) : (
              <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale.xs }}>
                {meta.glyph}
              </Text>
            )}
            <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
              {statusRight}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            marginTop: tokens.spacing.lg,
          }}
        >
          {renderCrest(home, homeWins)}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            {scoreText(home.score)}
            <Text
              allowFontScaling={false}
              style={{ color: inkSoft, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}
            >
              :
            </Text>
            {scoreText(away.score)}
          </View>
          {renderCrest(away, awayWins)}
        </View>
      </GradientSurface>
    </View>
  );
}
