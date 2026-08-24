import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Icon, Badge, Button, type BadgeTone } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import type { JobSiteCardProps, JobSiteStatus } from './JobSiteCard';

/**
 * Alternate design (v2) of {@link JobSiteCard} — a drop-in with the **same
 * props**. Where the original is a compact horizontal summary, V2 is a
 * *banner + stats card*: a tinted **site banner** (large glyph, name, address,
 * status pill), a row of **crew / open-order / distance stat tiles**, and a
 * full-width **Directions** action. Status is a text + glyph badge (never color
 * alone). Token-pure: semantic slots, `withAlpha` tints, and `shadow()`.
 */
export type JobSiteCardV2Props = JobSiteCardProps;

interface Desc {
  label: string;
  glyph: string;
  tone: BadgeTone;
}

const STATUS: Record<JobSiteStatus, Desc> = {
  active: { label: 'On site', glyph: '▶', tone: 'success' },
  scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
  completed: { label: 'Completed', glyph: '✓', tone: 'neutral' },
  blocked: { label: 'Blocked', glyph: '⚠', tone: 'danger' },
};

function StatTile({
  value,
  label,
  colors,
  tokens,
}: {
  value: string;
  label: string;
  colors: ReturnType<typeof useXenitionTheme>['colors'];
  tokens: ReturnType<typeof useXenitionTheme>['tokens'];
}): React.ReactElement {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        gap: 2,
        borderRadius: tokens.radius.md,
        paddingVertical: tokens.spacing.sm,
        backgroundColor: withAlpha(colors.muted, 0.08),
      }}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>{value}</Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{label}</Text>
    </View>
  );
}

export function JobSiteCardV2({
  name,
  address,
  status,
  crewCount,
  openOrders,
  distance,
  glyph = '🏗',
  onNavigate,
  onPress,
  style,
}: JobSiteCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const sd = STATUS[status] ?? STATUS.scheduled;

  const surface = {
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.surface,
    overflow: 'hidden' as const,
    ...shadow('md', tokens),
  };

  const hasStats = crewCount != null || openOrders != null || distance != null;

  const inner = (
    <View style={surface}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.lg,
          backgroundColor: withAlpha(colors.accent, 0.12),
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.accent, 0.18),
          }}
        >
          <Icon glyph={glyph} size="2xl" accessibilityLabel="Job site" />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
            {name}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {address}
          </Text>
        </View>
        <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>
      </View>

      {hasStats ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.lg, paddingTop: tokens.spacing.md }}>
          {crewCount != null ? <StatTile value={`${Math.max(0, Math.trunc(crewCount))}`} label="crew" colors={colors} tokens={tokens} /> : null}
          {openOrders != null ? <StatTile value={`${Math.max(0, Math.trunc(openOrders))}`} label="open orders" colors={colors} tokens={tokens} /> : null}
          {distance != null ? <StatTile value={distance} label="away" colors={colors} tokens={tokens} /> : null}
        </View>
      ) : null}

      {onNavigate ? (
        <View style={{ padding: tokens.spacing.lg, paddingTop: tokens.spacing.md }}>
          <Button variant="outline" size="sm" onPress={onNavigate} accessibilityLabel={`Directions to ${name}`}>
            🧭 Directions
          </Button>
        </View>
      ) : (
        <View style={{ height: tokens.spacing.lg }} />
      )}
    </View>
  );

  const a11y = `${name}, ${address}, ${sd.label}`;

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={a11y} style={style}>
        {inner}
      </View>
    );
  }
  return (
    <Animated.View style={[{ transform: [{ scale: press.scale }] }, style]}>
      <Pressable
        accessible
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {inner}
      </Pressable>
    </Animated.View>
  );
}
