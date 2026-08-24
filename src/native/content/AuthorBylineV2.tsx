import * as React from 'react';
import { Text, View } from 'react-native';
import { Avatar, useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { AuthorBylineProps } from './AuthorByline';

/** Drop-in replacement for {@link AuthorByline} — identical props. */
export type AuthorBylineV2Props = AuthorBylineProps;

/**
 * AuthorByline — **enclosed author chip** alternate design.
 *
 * The credit sits inside a soft primary-tinted rounded card: avatar, then a
 * "Written by" label over the name, with role and date/read-time on a meta line.
 * A contained attribution block versus the v1 bare row. Same props as
 * {@link AuthorByline}, so it is a drop-in swap.
 *
 * Token-pure: the fill/border are `withAlpha(colors.primary, …)`, the label is
 * `colors.primaryText`. No literal colors.
 */
export function AuthorBylineV2({
  author,
  date,
  readingTime,
  variant = 'full',
  style,
}: AuthorBylineV2Props): React.ReactElement {
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
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: withAlpha(colors.primary, 0.06),
          borderColor: withAlpha(colors.primary, 0.14),
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Avatar src={author.avatarUrl} name={author.name} size={compact ? 'sm' : 'md'} />
      <View style={{ flexShrink: 1, gap: 1 }}>
        {!compact ? (
          <Text
            style={{
              color: colors.primaryText,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '800',
              letterSpacing: 0.6,
              textTransform: 'uppercase',
            }}
          >
            Written by
          </Text>
        ) : null}
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {author.name}
        </Text>
        {(author.role || meta) ? (
          <Text
            numberOfLines={1}
            style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}
          >
            {[author.role, meta].filter(Boolean).join('  ·  ')}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
