import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Avatar, useXenitionTheme } from '../primitives';
import type { ContentAuthor } from './types';

export type AuthorBylineVariant = 'full' | 'compact';

export interface AuthorBylineProps {
  /** The credited author. */
  author: ContentAuthor;
  /** Human-readable publish date, e.g. `'Aug 24, 2026'`. */
  date?: string;
  /** Human-readable read length, e.g. `'6 min read'`. */
  readingTime?: string;
  /**
   * Layout:
   * - `full`    — avatar + name + role, with date/time on a second line (default).
   * - `compact` — small avatar + name · date · time on one line.
   */
  variant?: AuthorBylineVariant;
  style?: StyleProp<ViewStyle>;
}

/** Joins the non-empty meta fragments with a middot separator. */
function metaLine(parts: Array<string | undefined>): string {
  return parts.filter((p): p is string => !!p && p.length > 0).join('  ·  ');
}

/**
 * The "by {author} · {date} · {read time}" credit line under a headline —
 * the native mirror of a web article byline. Composes the `Avatar` primitive
 * (initials fallback when there's no photo) and reads all colors from the
 * theme's `SemanticColors`. Two variants: a stacked `full` byline for article
 * headers and a single-line `compact` byline for cards. No literal hex.
 */
export function AuthorByline({
  author,
  date,
  readingTime,
  variant = 'full',
  style,
}: AuthorBylineProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = metaLine([date, readingTime]);

  if (variant === 'compact') {
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={`By ${author.name}${meta ? `, ${meta}` : ''}`}
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}
      >
        <Avatar src={author.avatarUrl} name={author.name} size="sm" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }} numberOfLines={1}>
          <Text style={{ color: colors.onSurface, fontWeight: '600' }}>{author.name}</Text>
          {meta ? `  ·  ${meta}` : ''}
        </Text>
      </View>
    );
  }

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`By ${author.name}${author.role ? `, ${author.role}` : ''}${
        meta ? `, ${meta}` : ''
      }`}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style]}
    >
      <Avatar src={author.avatarUrl} name={author.name} size="md" />
      <View style={{ flexShrink: 1 }}>
        <Text
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
          numberOfLines={1}
        >
          {author.name}
        </Text>
        {author.role ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }} numberOfLines={1}>
            {author.role}
          </Text>
        ) : null}
        {meta ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }} numberOfLines={1}>
            {meta}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
