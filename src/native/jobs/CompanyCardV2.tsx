import * as React from 'react';
import { Animated, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge, Button } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { withAlpha } from '../primitives/internal/color';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { CompanyCardProps } from './CompanyCard';

/** Drop-in alternate: identical props to {@link CompanyCardProps}. */
export type CompanyCardV2Props = CompanyCardProps;

/**
 * CompanyCard — design V2. A profile-style card: a tinted banner strip, a large
 * rounded logo straddling it inside a surface ring, then the name, meta, a
 * headcount/open-roles badge row, and a full-width follow `Button`. Same props
 * as {@link CompanyCardProps} (drop-in). Token-pure — the banner and ring are
 * `withAlpha`/token fills, depth is the shared elevation scale.
 */
export function CompanyCardV2({
  company,
  following,
  onToggleFollow,
  onPress,
  style,
}: CompanyCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const showFollow = following != null || onToggleFollow != null;
  const meta = [company.industry, company.location].filter(Boolean).join(' · ');

  const surface: ViewStyle = {
    ...appearanceStyle('elevated', colors, tokens),
    borderRadius: tokens.radius.lg,
    overflow: 'hidden',
  };

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={`${company.name}${company.industry ? `, ${company.industry}` : ''}`}
        disabled={!onPress}
        onPress={onPress ? () => onPress(company) : undefined}
        onPressIn={onPress ? press.onPressIn : undefined}
        onPressOut={onPress ? press.onPressOut : undefined}
        style={({ pressed }) => [surface, pressed && onPress ? { opacity: 0.95 } : null, style]}
      >
        {/* Banner strip. */}
        <View style={{ height: 56, backgroundColor: withAlpha(colors.primary, 0.14) }} />

        <View style={{ paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, gap: tokens.spacing.md }}>
          {/* Logo straddling the banner inside a surface ring. */}
          <View
            style={{
              alignSelf: 'flex-start',
              marginTop: -36,
              padding: 4,
              borderRadius: tokens.radius.lg,
              backgroundColor: colors.surface,
            }}
          >
            <Avatar src={company.logoUrl} name={company.name} size="xl" shape="rounded" />
          </View>

          <View style={{ gap: 2 }}>
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}
            >
              {company.name}
            </Text>
            {meta ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {meta}
              </Text>
            ) : null}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
            {company.size ? <Badge tone="neutral">{`${company.size} employees`}</Badge> : null}
            {typeof company.openRoles === 'number' ? (
              <Badge tone={company.openRoles > 0 ? 'primary' : 'neutral'}>
                {company.openRoles > 0 ? `${company.openRoles} open roles` : 'No open roles'}
              </Badge>
            ) : null}
          </View>

          {showFollow ? (
            <Button
              variant={following ? 'secondary' : 'primary'}
              size="sm"
              onPress={onToggleFollow ? () => onToggleFollow(company) : undefined}
              accessibilityLabel={following ? `Following ${company.name} — tap to unfollow` : `Follow ${company.name}`}
              style={{ alignSelf: 'stretch' }}
            >
              {following ? 'Following' : 'Follow'}
            </Button>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}
