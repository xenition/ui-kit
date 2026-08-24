import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Icon, Badge, type BadgeTone } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { JobSiteCardProps, JobSiteStatus } from './JobSiteCard';

/**
 * Alternate design (v3) of {@link JobSiteCard} — a drop-in with the **same
 * props**. The *compact row*: a small glyph, the site name over its address on
 * one line each, a status badge, and an optional trailing **Directions**
 * icon-tap. Status is a text + glyph badge (never color alone). Token-pure.
 */
export type JobSiteCardV3Props = JobSiteCardProps;

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

export function JobSiteCardV3({
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
}: JobSiteCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = STATUS[status] ?? STATUS.scheduled;

  const rowStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
  };

  const meta = [
    crewCount != null ? `👷 ${Math.max(0, Math.trunc(crewCount))}` : null,
    openOrders != null ? `🗒 ${Math.max(0, Math.trunc(openOrders))}` : null,
    distance != null ? `📍 ${distance}` : null,
  ]
    .filter(Boolean)
    .join('   ');

  const a11y = `${name}, ${address}, ${sd.label}`;
  const Container: React.ElementType = onPress ? Pressable : View;

  return (
    <Container
      accessible
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={a11y}
      onPress={onPress}
      style={onPress ? ({ pressed }: { pressed: boolean }) => [rowStyle, style, { opacity: pressed ? 0.85 : 1 }] : [rowStyle, style]}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.accent, 0.14),
        }}
      >
        <Icon glyph={glyph} size="base" accessibilityLabel="Job site" />
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {meta ? `${address}   ·   ${meta}` : address}
        </Text>
      </View>
      <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
      {onNavigate ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Directions to ${name}`}
          onPress={onNavigate}
          style={({ pressed }) => ({
            width: 32,
            height: 32,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.14),
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Icon glyph="🧭" size="sm" />
        </Pressable>
      ) : null}
    </Container>
  );
}
