import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { goalPct } from './internal';

export interface VolunteerShiftProps {
  /** Role / task name, e.g. `Food Bank Sorter`. */
  role: string;
  /** Pre-formatted date label, e.g. `Sat, Aug 24`. */
  date?: string;
  /** Pre-formatted time window, e.g. `9:00 AM – 12:00 PM`. */
  time?: string;
  /** Location line. */
  location?: string;
  /** Number of slots already filled. */
  filled?: number;
  /** Total slots available (a zero/negative capacity is guarded). */
  capacity?: number;
  /** Whether the viewer is already signed up for this shift. */
  signedUp?: boolean;
  /** Fires when the viewer taps to sign up (never fires when full). */
  onSignUp?: () => void;
  /** Fires when a signed-up viewer taps to cancel. */
  onCancel?: () => void;
  /** Block the action button. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A volunteer-shift row: role, date/time/location meta, a slots-filled meter,
 * and a sign-up / cancel action. Capacity fill is guarded against a zero
 * capacity and clamped. Full shifts are badged and the action is disabled;
 * signed-up state is announced via `accessibilityState.selected` on the button —
 * not color alone. All colors come from the compiled theme tokens — no literal
 * colors.
 */
export function VolunteerShift({
  role,
  date,
  time,
  location,
  filled = 0,
  capacity = 0,
  signedUp = false,
  onSignUp,
  onCancel,
  loading = false,
  style,
}: VolunteerShiftProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasCapacity = capacity > 0;
  const isFull = hasCapacity && filled >= capacity && !signedUp;
  const pct = goalPct(filled, capacity);

  const metaLine = [date, time].filter(Boolean).join(' · ');

  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{role}</Text>
        {signedUp ? <Badge tone="success">Signed up</Badge> : isFull ? <Badge tone="danger">Full</Badge> : null}
      </View>

      {metaLine ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="🗓️" size="sm" color="muted" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{metaLine}</Text>
        </View>
      ) : null}
      {location ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="📍" size="sm" color="muted" />
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{location}</Text>
        </View>
      ) : null}

      {hasCapacity ? (
        <View style={{ gap: tokens.spacing.xs }}>
          <View
            accessibilityRole="progressbar"
            accessibilityValue={{ min: 0, max: capacity, now: Math.min(filled, capacity) }}
            accessibilityLabel={`${filled} of ${capacity} volunteers`}
            style={{ width: '100%', height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }}
          >
            <View style={{ height: '100%', width: `${pct}%`, backgroundColor: isFull ? colors.danger : colors.primary, borderRadius: tokens.radius.full }} />
          </View>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{`${filled} of ${capacity} spots filled`}</Text>
        </View>
      ) : null}

      {signedUp ? (
        <Button variant="outline" tone="danger" loading={loading} accessibilityState={{ selected: true }} onPress={onCancel}>
          Cancel shift
        </Button>
      ) : (
        <Button variant="primary" disabled={isFull} loading={loading} accessibilityState={{ selected: false }} onPress={onSignUp}>
          {isFull ? 'Shift full' : 'Sign up'}
        </Button>
      )}
    </View>
  );
}
