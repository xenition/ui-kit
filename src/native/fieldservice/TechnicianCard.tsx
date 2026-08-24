import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  useXenitionTheme,
  Card,
  Avatar,
  Badge,
  Button,
  type BadgeTone,
  type AvatarStatus,
} from '../primitives';
import { withAlpha } from './internal/format';

/** Technician availability — text + glyph + color (never color-alone). */
export type TechnicianStatus = 'available' | 'on-job' | 'en-route' | 'offline';

interface StatusDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
  /** Presence dot slot on the avatar. */
  presence: AvatarStatus;
}

const TECHNICIAN_STATUS: Record<TechnicianStatus, StatusDescriptor> = {
  available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online' },
  'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy' },
  'en-route': { label: 'En route', glyph: '→', tone: 'warn', presence: 'away' },
  offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline' },
};

export interface TechnicianCardProps {
  /** Technician name (e.g. "Marcus Reyes"). */
  name: string;
  /** Role / trade line (e.g. "HVAC Lead"). */
  role?: string;
  /** Availability status — text + glyph + color. */
  status: TechnicianStatus;
  /** Avatar image URL; falls back to initials from `name`. */
  avatarUrl?: string;
  /** Skill / certification chips. */
  skills?: string[];
  /** Count of jobs assigned today, shown as a meta line. */
  jobsToday?: number;
  /** Phone number; when set with `onCall`, renders a Call action. */
  phone?: string;
  /** Fires when the Call action is pressed. */
  onCall?: () => void;
  /** Fires when the Assign action is pressed. */
  onAssign?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A roster card for a field technician: avatar with a presence dot, name/role
 * stack, an availability pill (text + glyph + a color that traces to a
 * `SemanticColors` slot — never color alone), skill chips, and Call / Assign
 * actions. Skills are guarded against a missing array. No literal colors.
 */
export function TechnicianCard({
  name,
  role,
  status,
  avatarUrl,
  skills,
  jobsToday,
  phone,
  onCall,
  onAssign,
  style,
}: TechnicianCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = TECHNICIAN_STATUS[status] ?? TECHNICIAN_STATUS.offline;
  const skillList = Array.isArray(skills) ? skills : [];

  return (
    <Card variant="elevated" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Avatar src={avatarUrl} name={name} size="lg" status={sd.presence} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {name}
          </Text>
          {role != null ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {role}
            </Text>
          ) : null}
          {jobsToday != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              🗒 {Math.max(0, Math.trunc(jobsToday))} jobs today
            </Text>
          ) : null}
        </View>
        <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>
      </View>

      {skillList.length > 0 ? (
        <View style={{ marginTop: tokens.spacing.md, flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {skillList.map((skill, i) => (
            <View
              key={`${skill}-${i}`}
              style={{
                borderRadius: tokens.radius.full,
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.sm,
                backgroundColor: withAlpha(colors.primary, 0.1),
              }}
            >
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
                {skill}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {(phone != null && onCall) || onAssign ? (
        <View style={{ marginTop: tokens.spacing.md, flexDirection: 'row', gap: tokens.spacing.sm }}>
          {phone != null && onCall ? (
            <Button variant="outline" size="sm" onPress={onCall} style={{ flex: 1 }}>
              Call
            </Button>
          ) : null}
          {onAssign ? (
            <Button variant="primary" size="sm" onPress={onAssign} style={{ flex: 1 }}>
              Assign
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
