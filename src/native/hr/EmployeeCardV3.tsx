import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import { EMPLOYEE_STATUS_META, EMPLOYMENT_META, toneColor } from './internal';
import type { EmployeeCardProps } from './EmployeeCard';

/** Drop-in alternate design for {@link EmployeeCard} — identical Props. */
export type EmployeeCardV3Props = EmployeeCardProps;

/**
 * EmployeeCard, design **V3** — a compact directory row. A small avatar, name +
 * title on one line, and the status carried by a leading tone glyph plus a
 * trailing employment word — dense enough to stack many per screen. Same Props
 * as {@link EmployeeCard}; the card chrome is dropped for a hairline divider
 * row. Press-scales on tap; token-pure (no literal colors).
 */
export function EmployeeCardV3({
  name,
  title,
  department,
  avatarUrl,
  employmentType,
  status,
  loading = false,
  onPress,
  testID,
  style,
}: EmployeeCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const statusMeta = status ? EMPLOYEE_STATUS_META[status] : undefined;

  const row = (
    <Animated.View
      style={[
        {
          transform: [{ scale: press.scale }],
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {loading ? (
        <View accessibilityLabel="Loading employee" style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1 }}>
          <View style={{ width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
          <View style={{ height: tokens.typography.scale.sm, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      ) : (
        <>
          <Avatar size="sm" name={name} src={avatarUrl} />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {name}
            </Text>
            {title || department ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {[title, department].filter(Boolean).join(' · ')}
              </Text>
            ) : null}
          </View>

          {employmentType ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{EMPLOYMENT_META[employmentType].label}</Text>
          ) : null}

          {statusMeta ? (
            <View accessibilityLabel={statusMeta.label} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }}>
              <Text style={{ color: toneColor(colors, statusMeta.tone), fontSize: tokens.typography.scale.sm }}>{statusMeta.glyph}</Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{statusMeta.label}</Text>
            </View>
          ) : null}
        </>
      )}
    </Animated.View>
  );

  if (onPress && !loading) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Employee ${name}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        testID={testID}
      >
        {row}
      </Pressable>
    );
  }
  return <View testID={testID}>{row}</View>;
}
