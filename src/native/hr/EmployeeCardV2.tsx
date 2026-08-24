import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import { StatusPill } from './StatusPill';
import {
  EMPLOYEE_STATUS_META,
  EMPLOYMENT_META,
  toneColor,
} from './internal';
import type { EmployeeCardProps } from './EmployeeCard';

/** Drop-in alternate design for {@link EmployeeCard} — identical Props. */
export type EmployeeCardV2Props = EmployeeCardProps;

/**
 * EmployeeCard, design **V2** — a banner-header profile card. A tone-tinted
 * banner (derived from the employee's status, never color alone) sits above an
 * overlapping avatar; name, title and department stack below, followed by
 * employment / status word-pills and a full row of tappable contact actions.
 * Same Props as {@link EmployeeCard}, so it swaps in with no call-site change.
 * Elevated + mount-fade; token-pure (no literal colors).
 */
export function EmployeeCardV2({
  name,
  title,
  department,
  avatarUrl,
  employmentType,
  status,
  location,
  startDate,
  actions,
  loading = false,
  onPress,
  testID,
  style,
}: EmployeeCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });
  const bannerTone = status ? toneColor(colors, EMPLOYEE_STATUS_META[status].tone) : colors.primary;

  const card = (
    <Animated.View
      style={[
        {
          opacity: enter.opacity,
          transform: enter.transform,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          overflow: 'hidden',
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      {loading ? (
        <View accessibilityLabel="Loading employee" style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          <View style={{ height: 48, borderRadius: tokens.radius.md, backgroundColor: colors.border }} />
          <View style={{ height: tokens.typography.scale.base, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: tokens.typography.scale.sm, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      ) : (
        <>
          {/* Tone banner — meaning also carried by the status pill below. */}
          <View style={{ height: 52, backgroundColor: withAlpha(bannerTone, 0.16) }} />
          <View style={{ paddingHorizontal: tokens.spacing.md, paddingBottom: tokens.spacing.md, gap: tokens.spacing.sm }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: -26, gap: tokens.spacing.sm }}>
              <Avatar size="xl" name={name} src={avatarUrl} ring style={{ borderWidth: 3, borderColor: colors.surface }} />
              {status ? <StatusPill meta={EMPLOYEE_STATUS_META[status]} size="sm" style={{ marginBottom: tokens.spacing.xs }} /> : null}
            </View>

            <View style={{ gap: 2 }}>
              <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
                {name}
              </Text>
              {title || department ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {[title, department].filter(Boolean).join(' · ')}
                </Text>
              ) : null}
            </View>

            {employmentType || location || startDate ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }}>
                {employmentType ? <StatusPill meta={EMPLOYMENT_META[employmentType]} variant="soft" size="sm" /> : null}
                {location ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {location}</Text>
                ) : null}
                {startDate ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Since {startDate}</Text>
                ) : null}
              </View>
            ) : null}

            {actions && actions.length > 0 ? (
              <View style={{ flexDirection: 'row', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs / 2 }}>
                {actions.map((a) => (
                  <Pressable
                    key={a.key}
                    accessibilityRole="button"
                    accessibilityLabel={a.label}
                    onPress={a.onPress}
                    style={({ pressed }) => ({
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: tokens.spacing.xs / 2,
                      paddingVertical: tokens.spacing.xs,
                      borderRadius: tokens.radius.md,
                      backgroundColor: withAlpha(colors.primary, pressed ? 0.2 : 0.1),
                    })}
                  >
                    <Text style={{ fontSize: tokens.typography.scale.sm }}>{a.glyph}</Text>
                    <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{a.label}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
        </>
      )}
    </Animated.View>
  );

  if (onPress && !loading) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Employee ${name}`} onPress={onPress} testID={testID}>
        {card}
      </Pressable>
    );
  }
  return <View testID={testID}>{card}</View>;
}
