import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { Badge } from '../primitives/Badge';

export interface CheckInRowProps {
  /** Attendee name. */
  name: string;
  /** Avatar image URL (initials fallback when absent). */
  avatarUrl?: string;
  /** Ticket tier / type label. */
  ticketType?: string;
  /** Pre-formatted check-in time, shown when checked in. */
  checkedInAt?: string;
  /** Current check-in state. */
  checkedIn?: boolean;
  /** Fires with the desired next state when the row's toggle is pressed. */
  onToggle?: (next: boolean) => void;
  /** Disable the toggle. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A staff-facing check-in row: avatar, attendee name, ticket type, and a toggle
 * that flips the checked-in state. The state is shown with a check glyph, a
 * text badge (`Checked in` / `Not in`) and `accessibilityState.checked` — never
 * color alone. Colors come from the compiled theme tokens; no literal colors.
 */
export function CheckInRow({
  name,
  avatarUrl,
  ticketType,
  checkedInAt,
  checkedIn = false,
  onToggle,
  disabled = false,
  style,
}: CheckInRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <Avatar src={avatarUrl} name={name} size="sm" />
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>{name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          {ticketType ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{ticketType}</Text>
          ) : null}
          {checkedIn ? (
            <Badge tone="success">{checkedInAt ? `In · ${checkedInAt}` : 'Checked in'}</Badge>
          ) : (
            <Badge tone="neutral">Not in</Badge>
          )}
        </View>
      </View>

      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: checkedIn, disabled }}
        accessibilityLabel={checkedIn ? `Undo check-in for ${name}` : `Check in ${name}`}
        disabled={disabled}
        onPress={() => onToggle?.(!checkedIn)}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.full,
          backgroundColor: checkedIn ? colors.success : colors.primary,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        })}
      >
        <Text style={{ color: checkedIn ? colors.onSuccess : colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {checkedIn ? '✓' : '+'}
        </Text>
        <Text style={{ color: checkedIn ? colors.onSuccess : colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {checkedIn ? 'In' : 'Check in'}
        </Text>
      </Pressable>
    </View>
  );
}
