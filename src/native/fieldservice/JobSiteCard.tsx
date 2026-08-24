import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Card, Icon, Badge, Button, type BadgeTone } from '../primitives';
import { withAlpha } from './internal/format';

/** Site activity state — text + glyph + color (never color-alone). */
export type JobSiteStatus = 'active' | 'scheduled' | 'completed' | 'blocked';

interface StatusDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
}

const JOB_SITE_STATUS: Record<JobSiteStatus, StatusDescriptor> = {
  active: { label: 'On site', glyph: '▶', tone: 'success' },
  scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
  completed: { label: 'Completed', glyph: '✓', tone: 'neutral' },
  blocked: { label: 'Blocked', glyph: '⚠', tone: 'danger' },
};

export interface JobSiteCardProps {
  /** Site / customer name (e.g. "Riverside Plaza"). */
  name: string;
  /** Street address, already formatted by the caller. */
  address: string;
  /** Activity status. */
  status: JobSiteStatus;
  /** Number of crew currently assigned to the site. */
  crewCount?: number;
  /** Count of open work orders at the site. */
  openOrders?: number;
  /** Localized distance string (e.g. "3.2 mi"). */
  distance?: string;
  /** Leading glyph for the site disc (emoji or symbol). */
  glyph?: string;
  /** Fires when the navigate/directions action is pressed. */
  onNavigate?: () => void;
  /** Fires on card press; the card is only a button when supplied. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A summary card for a job site. A tinted leading glyph disc, name/address
 * stack, a status pill (text + glyph + a color that traces to a
 * `SemanticColors` slot — never color alone), crew / open-order / distance
 * meta, and an optional "Directions" action. Becomes a pressable button only
 * when `onPress` is supplied. Every color traces to a token or a tint — no
 * literals.
 */
export function JobSiteCard({
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
}: JobSiteCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = JOB_SITE_STATUS[status] ?? JOB_SITE_STATUS.scheduled;

  const body = (
    <Card variant={onPress ? 'interactive' : 'elevated'} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.accent, 0.14),
          }}
        >
          <Icon glyph={glyph} size="xl" accessibilityLabel="Job site" />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {name}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {address}
          </Text>
        </View>
        <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>
      </View>

      <View
        style={{
          marginTop: tokens.spacing.md,
          paddingTop: tokens.spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
        }}
      >
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
          {crewCount != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              👷 {Math.max(0, Math.trunc(crewCount))} crew
            </Text>
          ) : null}
          {openOrders != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              🗒 {Math.max(0, Math.trunc(openOrders))} open
            </Text>
          ) : null}
          {distance != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {distance}</Text>
          ) : null}
        </View>
        {onNavigate ? (
          <Button variant="outline" size="sm" onPress={onNavigate}>
            Directions
          </Button>
        ) : null}
      </View>
    </Card>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${address}, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}
