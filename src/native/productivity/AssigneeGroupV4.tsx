import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, type AvatarSize } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { AssigneeGroupProps } from './AssigneeGroup';

/** Drop-in for {@link AssigneeGroupProps} — same props, the V4 "flow" design. */
export type AssigneeGroupV4Props = AssigneeGroupProps;

/** +N overflow-chip diameter, mirroring the native `Avatar` size ramp. */
const DIAMETER: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
const FONT: Record<AvatarSize, 'xs' | 'sm' | 'lg' | 'xl'> = { xs: 'xs', sm: 'xs', md: 'sm', lg: 'lg', xl: 'xl' };

/**
 * AssigneeGroup — **V4** "flow" design. The focused-workspace take on assignees:
 * an overlapping stack of **bigger, softly rounded** avatars each carrying a
 * surface ring so they read cleanly against the workspace, capped by a
 * **soft-primary "+N"** overflow chip. Preserves the base `max` / overflow and
 * the muted "Unassigned" empty state. Same props/behavior as
 * {@link AssigneeGroupProps}; token-only colors via `useXenitionTheme()`.
 */
export function AssigneeGroupV4({
  assignees,
  max = 3,
  size = 'sm',
  emptyLabel = 'Unassigned',
  style,
}: AssigneeGroupV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const people = Array.isArray(assignees) ? assignees : [];

  if (people.length === 0) {
    return (
      <View style={[{ alignSelf: 'flex-start' }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontStyle: 'italic' }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  const d = DIAMETER[size];

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      {shown.map((a, i) => (
        <View
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : -8,
            borderRadius: tokens.radius.md + 2,
            borderWidth: 2,
            borderColor: colors.surface,
          }}
        >
          <Avatar name={a.name} src={a.src} size={size} shape="rounded" />
        </View>
      ))}
      {extra > 0 ? (
        <View
          style={{
            marginLeft: -8,
            width: d,
            height: d,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.primary, 0.12),
            borderWidth: 2,
            borderColor: colors.surface,
          }}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontSize: tokens.typography.scale[FONT[size]],
              fontWeight: '600',
            }}
          >
            +{extra}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
