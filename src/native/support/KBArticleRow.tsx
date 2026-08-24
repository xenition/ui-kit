import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { withAlpha } from './internal';

/** Publication state of a knowledge-base article. */
export type KBStatus = 'published' | 'draft' | 'archived';

export interface KBArticle {
  /** Stable id, returned to `onPress`. */
  id: string;
  /** Article title. */
  title: string;
  /** Optional category / section label. */
  category?: string;
  /** Optional view count. */
  views?: number;
  /** Optional helpful-vote count. */
  helpful?: number;
  /** Publication status (default treated as `published`). */
  status?: KBStatus;
  /** Optional updated hint (e.g. `"Updated 3d ago"`). */
  updatedLabel?: string;
}

export interface KBArticleRowProps {
  /** The article to render. */
  article: KBArticle;
  /** Fires with the article id when tapped. */
  onPress?: (id: string) => void;
  /** Fires when the "Insert link" affordance is tapped (agent linking a KB doc). */
  onInsertLink?: (article: KBArticle) => void;
  /** Loading placeholder row. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const STATUS_LABEL: Record<KBStatus, string> = {
  published: 'Published',
  draft: 'Draft',
  archived: 'Archived',
};

/**
 * A knowledge-base article row for search results / suggested-answers panels —
 * a leading doc glyph, title, category + status, and view/helpful counts.
 * Tapping fires `onPress(id)`; an optional `onInsertLink` lets an agent drop the
 * article link into a reply. Non-published articles carry a text status chip
 * (never color-only). Handles a `loading` placeholder. Token colors only.
 */
export function KBArticleRow({
  article,
  onPress,
  onInsertLink,
  loading = false,
  style,
}: KBArticleRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading article"
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            padding: tokens.spacing.md,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
          },
          style,
        ]}
      >
        <View style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
        <View style={{ flex: 1, gap: 6 }}>
          <View style={{ height: 12, width: '65%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
          <View style={{ height: 10, width: '35%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.08) }} />
        </View>
      </View>
    );
  }

  const status = article.status ?? 'published';
  const views = typeof article.views === 'number' && article.views >= 0 ? article.views : undefined;
  const helpful = typeof article.helpful === 'number' && article.helpful >= 0 ? article.helpful : undefined;

  const metaParts: string[] = [];
  if (article.category) metaParts.push(article.category);
  if (views !== undefined) metaParts.push(`${views} views`);
  if (helpful !== undefined) metaParts.push(`${helpful} helpful`);
  if (article.updatedLabel) metaParts.push(article.updatedLabel);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Article: ${article.title}${status !== 'published' ? `, ${STATUS_LABEL[status]}` : ''}`}
      onPress={onPress ? () => onPress(article.id) : undefined}
      disabled={!onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          backgroundColor: pressed && onPress ? withAlpha(colors.primary, 0.06) : 'transparent',
        },
        style,
      ]}
    >
      <Icon glyph="📄" size="lg" />
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flexShrink: 1 }}
          >
            {article.title}
          </Text>
          {status !== 'published' ? (
            <View
              style={{
                backgroundColor: withAlpha(colors.muted, 0.16),
                borderRadius: tokens.radius.sm,
                paddingHorizontal: tokens.spacing.xs,
                paddingVertical: 1,
              }}
            >
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {STATUS_LABEL[status]}
              </Text>
            </View>
          ) : null}
        </View>
        {metaParts.length > 0 ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {metaParts.join(' · ')}
          </Text>
        ) : null}
      </View>
      {onInsertLink ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Insert link to ${article.title}`}
          hitSlop={8}
          onPress={() => onInsertLink(article)}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, padding: tokens.spacing.xs })}
        >
          <Icon glyph="🔗" size="sm" color="primary" accessibilityLabel="Insert link" />
        </Pressable>
      ) : null}
    </Pressable>
  );
}
