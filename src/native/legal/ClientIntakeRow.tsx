import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  CONFLICT_CHECK_META,
  INTAKE_STATUS_META,
  PRACTICE_AREA_META,
  type ConflictCheck,
  type IntakeStatus,
  type PracticeArea,
} from './internal';

export type ClientIntakeRowVariant = 'default' | 'compact';

export interface ClientIntakeRowProps {
  /** Prospective client name. */
  name: string;
  /** Matter type / practice area of the inquiry. */
  practiceArea?: PracticeArea;
  /** Intake stage — glyph + word pill, never color alone. */
  status?: IntakeStatus;
  /** Conflict-check outcome — glyph + word pill. */
  conflict?: ConflictCheck;
  /** Pre-formatted inquiry date / source label. */
  source?: string;
  /** Short summary of the matter. */
  summary?: string;
  /** Avatar image URL (initials fallback otherwise). */
  avatarUrl?: string;
  /** Density. */
  variant?: ClientIntakeRowVariant;
  /** Render the accept/decline action row. */
  actionable?: boolean;
  /** Accept / retain the prospective client. */
  onAccept?: () => void;
  /** Decline the inquiry. */
  onDecline?: () => void;
  /** Tap handler for the whole row. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A prospective-client intake row: name, matter type, intake stage and
 * conflict-check pills (each a glyph + word so state never rests on color
 * alone). When `actionable` and still open, an accept/decline row is shown. All
 * colors are theme tokens — no literals.
 */
export function ClientIntakeRow({
  name,
  practiceArea,
  status = 'new',
  conflict,
  source,
  summary,
  avatarUrl,
  variant = 'default',
  actionable = false,
  onAccept,
  onDecline,
  onPress,
  testID,
  style,
}: ClientIntakeRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const decided = status === 'retained' || status === 'declined';
  const showActions = actionable && !decided;

  const content = (
    <View
      style={[
        {
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Avatar size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {name}
          </Text>
          {source ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{source}</Text>
          ) : null}
        </View>
        <StatusPill meta={INTAKE_STATUS_META[status]} size="sm" />
      </View>

      {!compact ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }}>
          {practiceArea ? <StatusPill meta={PRACTICE_AREA_META[practiceArea]} variant="soft" size="sm" /> : null}
          {conflict ? <StatusPill meta={CONFLICT_CHECK_META[conflict]} variant="soft" size="sm" /> : null}
        </View>
      ) : null}

      {!compact && summary ? (
        <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{summary}</Text>
      ) : null}

      {showActions ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
          {onAccept ? (
            <Button
              size="sm"
              variant="primary"
              tone="success"
              disabled={conflict === 'conflict'}
              onPress={onAccept}
            >
              Accept
            </Button>
          ) : null}
          {onDecline ? (
            <Button size="sm" variant="outline" tone="danger" onPress={onDecline}>
              Decline
            </Button>
          ) : null}
        </View>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Intake ${name}`} onPress={onPress} testID={testID}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
