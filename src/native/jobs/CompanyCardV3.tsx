import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge, Button } from '../primitives';
import type { CompanyCardProps } from './CompanyCard';

/** Drop-in alternate: identical props to {@link CompanyCardProps}. */
export type CompanyCardV3Props = CompanyCardProps;

/**
 * CompanyCard — design V3. A compact directory row: a small logo, the name and
 * `industry · location` meta stacked, and a trailing open-roles `Badge` plus a
 * small follow `Button`. Hairline-separated for dense lists. Same props as
 * {@link CompanyCardProps} (drop-in). Token-pure.
 */
export function CompanyCardV3({
  company,
  following,
  onToggleFollow,
  onPress,
  style,
}: CompanyCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const showFollow = following != null || onToggleFollow != null;
  const meta = [company.industry, company.location].filter(Boolean).join(' · ');

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${company.name}${company.industry ? `, ${company.industry}` : ''}`}
      disabled={!onPress}
      onPress={onPress ? () => onPress(company) : undefined}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
        },
        pressed && onPress ? { opacity: 0.9 } : null,
        style,
      ]}
    >
      <Avatar src={company.logoUrl} name={company.name} size="md" shape="rounded" />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {company.name}
        </Text>
        {meta ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {meta}
          </Text>
        ) : null}
      </View>

      {typeof company.openRoles === 'number' && company.openRoles > 0 ? (
        <Badge tone="primary">{`${company.openRoles} open`}</Badge>
      ) : null}

      {showFollow ? (
        <Button
          variant={following ? 'secondary' : 'primary'}
          size="sm"
          onPress={onToggleFollow ? () => onToggleFollow(company) : undefined}
          accessibilityLabel={following ? `Following ${company.name} — tap to unfollow` : `Follow ${company.name}`}
        >
          {following ? 'Following' : 'Follow'}
        </Button>
      ) : null}
    </Pressable>
  );
}
