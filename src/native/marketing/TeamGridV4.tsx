import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import type { TeamGridProps } from './TeamGrid';

/** Drop-in for {@link TeamGridProps} — same props, the V4 "showcase" design. */
export type TeamGridV4Props = TeamGridProps;

/**
 * TeamGrid — **V4** "showcase" design (native mirror of the web V4). A wrapping
 * grid of elevated member cards on the page ground (NOT a gradient surface):
 * each card an initials-fallback `avatar`, a bold `name`, a muted `role`, and
 * an optional `bio`. Cards wrap via flex `basis` rather than CSS grid
 * breakpoints (`columns` sets the row width, default 2 for phones). As on the
 * native base `TeamGrid`, the web `socials` link row is dropped — the native
 * base `TeamMember` type exposes no `socials` (no `href` navigation surface on
 * these cards) — so every field the native base carries (`name`, `role`,
 * `avatar`, `bio`) is honored. Same props/behavior as {@link TeamGridProps};
 * token-only colors, no literals.
 */
export function TeamGridV4({
  members,
  columns = 2,
  style,
}: TeamGridV4Props): React.ReactElement {
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
        <View key={index} style={{ flexGrow: 1, flexBasis: basis, minWidth: 160 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              gap: tokens.spacing.sm,
              padding: tokens.spacing.lg,
              borderRadius: tokens.radius.lg,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.card,
              shadowColor: colors.onSurface,
              shadowOpacity: 0.06,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 2,
            }}
          >
            <Avatar src={member.avatar} name={member.name} size="lg" />
            <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
              <Text
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: '800',
                  letterSpacing: -0.3,
                  textAlign: 'center',
                }}
              >
                {member.name}
              </Text>
              {member.role ? (
                <Text
                  style={{
                    color: colors.muted,
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
                  lineHeight: tokens.typography.scale.sm * 1.5,
                  textAlign: 'center',
                }}
              >
                {member.bio}
              </Text>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}
