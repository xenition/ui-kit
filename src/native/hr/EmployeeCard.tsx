import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Avatar } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { StatusPill } from './StatusPill';
import {
  EMPLOYEE_STATUS_META,
  EMPLOYMENT_META,
  type EmployeeStatus,
  type EmploymentType,
} from './internal';

export type EmployeeCardVariant = 'default' | 'compact' | 'detailed';

export interface EmployeeContactAction {
  key: string;
  glyph: string;
  label: string;
  onPress: () => void;
}

export interface EmployeeCardProps {
  /** Full name. */
  name: string;
  /** Job title / role. */
  title?: string;
  /** Department or team. */
  department?: string;
  /** Avatar image URL (initials fallback otherwise). */
  avatarUrl?: string;
  /** Employment arrangement — shown as a glyph + word chip. */
  employmentType?: EmploymentType;
  /** Lifecycle state — shown as a glyph + word chip, never color alone. */
  status?: EmployeeStatus;
  /** Location / office (detailed variant). */
  location?: string;
  /** Pre-formatted hire/start date (detailed variant). */
  startDate?: string;
  /** Quick contact affordances (call / email / message). */
  actions?: EmployeeContactAction[];
  /** Visual density / emphasis. */
  variant?: EmployeeCardVariant;
  /** Render a placeholder skeleton instead of content. */
  loading?: boolean;
  /** Tap handler for the whole card. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Profile card for a single employee: avatar, name, title, department, and
 * employment-type / status chips (each a glyph + word so state never rests on
 * color alone). `compact` trims to a single row for lists; `detailed` adds
 * location and start date. Quick contact `actions` render as token-tinted
 * buttons. Renders a `loading` skeleton on demand. All colors are theme tokens
 * — no literals.
 */
export function EmployeeCard({
  name,
  title,
  department,
  avatarUrl,
  employmentType,
  status,
  location,
  startDate,
  actions,
  variant = 'default',
  loading = false,
  onPress,
  testID,
  style,
}: EmployeeCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const detailed = variant === 'detailed';

  const body = (
    <Card
      variant="outlined"
      padding={compact ? 'sm' : 'md'}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      {loading ? (
        <View accessibilityLabel="Loading employee" style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }}>
          <View style={{ width: 40, height: 40, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: tokens.typography.scale.base, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
            <View style={{ height: tokens.typography.scale.sm, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          </View>
        </View>
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <Avatar size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
            <View style={{ flex: 1, gap: 2 }}>
              <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                {name}
              </Text>
              {title ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {title}
                  {department ? ` · ${department}` : ''}
                </Text>
              ) : department ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {department}
                </Text>
              ) : null}
            </View>
            {status ? <StatusPill meta={EMPLOYEE_STATUS_META[status]} size="sm" /> : null}
          </View>

          {!compact && (employmentType || detailed) ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }}>
              {employmentType ? <StatusPill meta={EMPLOYMENT_META[employmentType]} variant="soft" size="sm" /> : null}
              {detailed && location ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {location}</Text>
              ) : null}
              {detailed && startDate ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Since {startDate}</Text>
              ) : null}
            </View>
          ) : null}

          {!compact && actions && actions.length > 0 ? (
            <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
              {actions.map((a) => (
                <Pressable
                  key={a.key}
                  accessibilityRole="button"
                  accessibilityLabel={a.label}
                  onPress={a.onPress}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs / 2,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    backgroundColor: withAlpha(colors.primary, pressed ? 0.2 : 0.1),
                  })}
                >
                  <Text style={{ fontSize: tokens.typography.scale.sm }}>{a.glyph}</Text>
                  <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{a.label}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </>
      )}
    </Card>
  );

  if (onPress && !loading) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Employee ${name}`} onPress={onPress} testID={testID}>
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
