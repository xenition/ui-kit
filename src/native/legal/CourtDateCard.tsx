import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Card } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  COURT_EVENT_META,
  COURT_URGENCY_META,
  toneColor,
  type CourtEventType,
  type CourtUrgency,
} from './internal';

export type CourtDateCardVariant = 'default' | 'compact';

export interface CourtDateCardProps {
  /** Kind of court event — glyph + word chip. */
  type: CourtEventType;
  /** Pre-formatted date label (e.g. "Sep 14, 2026"). */
  date: string;
  /** Pre-formatted time label. */
  time?: string;
  /** Court / venue name. */
  court?: string;
  /** Judge / hearing officer. */
  judge?: string;
  /** Associated case number. */
  caseNumber?: string;
  /** Time-relative urgency — glyph + word pill (today/soon/upcoming/past). */
  urgency?: CourtUrgency;
  /** Optional countdown label (e.g. "in 3 days"). */
  countdown?: string;
  /** Density. */
  variant?: CourtDateCardVariant;
  /** Tap handler. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A court date / filing deadline card: a leading urgency-tinted date block, the
 * event type and urgency pills (each glyph + word so nothing rests on color
 * alone), and venue / judge / case metadata. A `today` or `soon` urgency drives
 * a token-tinted header rail for at-a-glance triage. All colors are theme tokens
 * — no literals.
 */
export function CourtDateCard({
  type,
  date,
  time,
  court,
  judge,
  caseNumber,
  urgency = 'upcoming',
  countdown,
  variant = 'default',
  onPress,
  testID,
  style,
}: CourtDateCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const typeMeta = COURT_EVENT_META[type];
  const urgencyMeta = COURT_URGENCY_META[urgency];
  const urgentTint = toneColor(colors, urgencyMeta.tone);
  const highlighted = urgency === 'today' || urgency === 'soon';

  const body = (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm, opacity: urgency === 'past' ? 0.7 : 1 }, style]}>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'flex-start' }}>
        <View
          style={{
            minWidth: 52,
            alignItems: 'center',
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.xs,
            borderRadius: tokens.radius.sm,
            backgroundColor: highlighted ? withAlpha(urgentTint, 0.16) : withAlpha(toneColor(colors, typeMeta.tone), 0.12),
          }}
        >
          <Text accessibilityElementsHidden importantForAccessibility="no" style={{ fontSize: tokens.typography.scale.lg }}>
            {typeMeta.glyph}
          </Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{date}</Text>
          {time ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{time}</Text> : null}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs, marginTop: 2 }}>
            <StatusPill meta={typeMeta} variant="inline" size="sm" />
            <StatusPill meta={urgencyMeta} size="sm" />
          </View>
        </View>
        {countdown ? (
          <Text style={{ color: highlighted ? urgentTint : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {countdown}
          </Text>
        ) : null}
      </View>

      {!compact && (court || judge || caseNumber) ? (
        <View style={{ gap: 2 }}>
          {court ? <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>🏛 {court}</Text> : null}
          {judge ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Before {judge}</Text> : null}
          {caseNumber ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{caseNumber}</Text> : null}
        </View>
      ) : null}
    </Card>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`${typeMeta.label} on ${date}`} onPress={onPress} testID={testID}>
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
