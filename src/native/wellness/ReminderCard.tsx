import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Switch } from '../primitives';
import { Icon } from '../primitives/Icon';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient, calmInk } from './internal/calm';

export interface ReminderCardProps {
  label: string;
  time: string;
  enabled?: boolean;
  onToggle?: (enabled: boolean) => void;
  glyph?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * ReminderCard — a single daily reminder on a clean card: a small gradient clock
 * badge (the one spot of color), the reminder label and its time, and a `Switch`
 * to arm or silence it. The card itself stays calm (surface + border); the
 * badge's gradient and near-white ink both derive from the brand ramp. On/off
 * is carried by the switch's own state, not by color. Token-only colors.
 */
export function ReminderCard({
  label,
  time,
  enabled = false,
  onToggle,
  glyph = '⏰',
  style,
}: ReminderCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <GradientSurface
        colors={calmGradient(r)}
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Icon glyph={glyph} size="lg" style={{ color: calmInk(r) }} />
      </GradientSurface>

      <View style={{ flex: 1, minWidth: 0 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {label}
        </Text>
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>{time}</Text>
      </View>

      <Switch
        checked={enabled}
        onChange={(next) => onToggle?.(next)}
        accessibilityLabel={`${label} reminder at ${time}`}
      />
    </View>
  );
}
