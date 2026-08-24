import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarGroup, type AvatarSize } from '../primitives';

export interface Assignee {
  name?: string;
  src?: string;
}

export interface AssigneeGroupProps {
  /** People assigned; an empty array shows the unassigned state. */
  assignees: Assignee[];
  /** Max avatars before collapsing into +N (default 3). */
  max?: number;
  size?: AvatarSize;
  /** Copy for the empty (unassigned) state. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Overlapping avatar stack of task assignees — a thin wrapper over the primitive
 * {@link AvatarGroup} that adds a muted "Unassigned" empty state and guards a
 * missing array. Colors come from the theme tokens. No literal colors.
 */
export function AssigneeGroup({
  assignees,
  max = 3,
  size = 'sm',
  emptyLabel = 'Unassigned',
  style,
}: AssigneeGroupProps): React.ReactElement {
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

  return <AvatarGroup avatars={people} max={max} size={size} style={style} />;
}
