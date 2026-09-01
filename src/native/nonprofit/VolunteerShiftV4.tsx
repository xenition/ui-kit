import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { withAlpha } from '../primitives/internal/color';
import { goalPct } from './internal';
import type { VolunteerShiftProps } from './VolunteerShift';

/** Drop-in for {@link VolunteerShiftProps} — same props, the V4 "rally" design. */
export type VolunteerShiftV4Props = VolunteerShiftProps;

/**
 * VolunteerShift — **V4** "rally" design. The warm, mission-driven take on a
 * volunteer-shift row: an elevated rounded row (soft shadow, clean surface — no
 * gradient) with a leading calendar glyph in a soft-primary well, a bold role
 * title, muted date/time/location meta, a slots-filled meter, and a primary
 * sign-up / outline cancel CTA. Status is read via a glyph + a labelled Badge +
 * token color (never color alone): a signed-up viewer gets a success "Signed
 * up" badge, a full shift a danger "Full" badge with the action disabled; the
 * signed-up state is also announced via `accessibilityState.selected` on the
 * button. Honors every prop of {@link VolunteerShiftProps}; capacity fill is
 * guarded and clamped. Token-only colors via `useXenitionTheme()`.
 */
export function VolunteerShiftV4({
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
}: VolunteerShiftV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasCapacity = capacity > 0;
  const isFull = hasCapacity && filled >= capacity && !signedUp;
  const pct = goalPct(filled, capacity);

  const metaLine = [date, time].filter(Boolean).join(' · ');

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: tokens.spacing.md,
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  return (
    <View style={containerStyle}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(colors.primary, 0.1),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon glyph="🙌" size="lg" />
      </View>

      <View style={{ flex: 1, gap: tokens.spacing.sm }}>
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
              style={{ width: '100%', height: 6, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.primary, 0.15), overflow: 'hidden' }}
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
    </View>
  );
}
