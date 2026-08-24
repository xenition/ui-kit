import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Avatar } from '../primitives/Avatar';

export interface TeamMember {
  /** Display name — also the source for the initials-fallback avatar. */
  name: string;
  /** Role / title line. */
  role?: string;
  /** Short bio paragraph. */
  bio?: string;
  /** Avatar image URL; falls back to initials when omitted. */
  avatar?: string;
}

export interface TeamGridProps {
  /** Team / member cards (mirrors the web `members` array). */
  members: TeamMember[];
  /** Max columns; native wraps into rows of this width (default 2 for phones). */
  columns?: 2 | 3 | 4;
  style?: StyleProp<ViewStyle>;
}

/**
 * Responsive grid of team/member cards — the native mirror of the web
 * `TeamGrid`. Cards wrap via flex `basis` rather than CSS grid breakpoints,
 * with an initials-fallback avatar. The web `socials` link row is dropped
 * (no `href` navigation surface on these cards). Token-only.
 */
export function TeamGrid({
  members,
  columns = 2,
  style,
}: TeamGridProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const basis = `${100 / columns}%` as ViewStyle['flexBasis'];

  return (
    <View
      testID="xen-team-grid"
      style={[
        { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg },
        style,
      ]}
    >
      {members.map((member, index) => (
        <View
          key={index}
          style={{ flexGrow: 1, flexBasis: basis, minWidth: 160 }}
        >
          <Card style={{ flex: 1, alignItems: 'center', gap: tokens.spacing.sm }}>
            <Avatar src={member.avatar} name={member.name} size="lg" />
            <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
              <Text
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                {member.name}
              </Text>
              {member.role ? (
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '500',
                    textAlign: 'center',
                  }}
                >
                  {member.role}
                </Text>
              ) : null}
            </View>
            {member.bio ? (
              <Text
                style={{
                  color: colors.muted,
                  fontSize: tokens.typography.scale.sm,
                  textAlign: 'center',
                }}
              >
                {member.bio}
              </Text>
            ) : null}
          </Card>
        </View>
      ))}
    </View>
  );
}
