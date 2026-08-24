import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge, Button } from '../primitives';
import type { Company } from './types';

export interface CompanyCardProps {
  /** The company to render. */
  company: Company;
  /** Follow state; when set (or `onToggleFollow` given) a follow button shows. */
  following?: boolean;
  /** Fired when the follow toggle is pressed. */
  onToggleFollow?: (company: Company) => void;
  /** Fired when the card body is pressed (open company page). */
  onPress?: (company: Company) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * An employer summary card — logo (`Avatar`), name, industry / location, a
 * headcount `Badge`, an open-roles count, and an optional follow `Button`.
 * Data + callbacks only; the follow button flips between primary "Follow" and
 * secondary "Following" while keeping an explicit accessible label. Tokens only.
 */
export function CompanyCard({
  company,
  following,
  onToggleFollow,
  onPress,
  style,
}: CompanyCardProps): React.ReactElement {
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
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        pressed && onPress ? { opacity: 0.9 } : null,
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
        <Avatar src={company.logoUrl} name={company.name} size="lg" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '600' }}
          >
            {company.name}
          </Text>
          {meta ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {meta}
            </Text>
          ) : null}
        </View>
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
        >
          {following ? 'Following' : 'Follow'}
        </Button>
      ) : null}
    </Pressable>
  );
}
