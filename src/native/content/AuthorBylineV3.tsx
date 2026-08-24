import * as React from 'react';
import { Text, View } from 'react-native';
import { Avatar, useXenitionTheme } from '../primitives';
import type { AuthorBylineProps } from './AuthorByline';

/** Drop-in replacement for {@link AuthorByline} — identical props. */
export type AuthorBylineV3Props = AuthorBylineProps;

/**
 * AuthorByline — **centered stacked** alternate design.
 *
 * A vertically centered credit: the avatar sits on top, the name below it, then
 * the role, then a middot-joined date/read-time line — the layout you see under
 * a centered article title or at the end of a feature. Same props as
 * {@link AuthorByline}, so it is a drop-in swap.
 *
 * Token-pure: name is `colors.onSurface`, role/meta are `colors.muted`. No
 * literal colors.
 */
export function AuthorBylineV3({
  author,
  date,
  readingTime,
  variant = 'full',
  style,
}: AuthorBylineV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = [date, readingTime]
    .filter((p): p is string => !!p && p.length > 0)
    .join('  ·  ');
  const compact = variant === 'compact';

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`By ${author.name}${author.role ? `, ${author.role}` : ''}${
        meta ? `, ${meta}` : ''
      }`}
      style={[{ alignItems: 'center', gap: tokens.spacing.xs }, style]}
    >
      <Avatar src={author.avatarUrl} name={author.name} size={compact ? 'md' : 'lg'} />
      <Text
        numberOfLines={1}
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        {author.name}
      </Text>
      {author.role ? (
        <Text
          numberOfLines={1}
          style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}
        >
          {author.role}
        </Text>
      ) : null}
      {meta ? (
        <Text
          numberOfLines={1}
          style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}
        >
          {meta}
        </Text>
      ) : null}
    </View>
  );
}
