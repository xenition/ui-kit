import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { ArticleCard } from './ArticleCard';
import type { ArticleSummary } from './types';

export type RelatedArticlesVariant = 'list' | 'grid';

export interface RelatedArticlesProps {
  /** The related / recommended articles. May be empty. */
  articles: ArticleSummary[];
  /** Called when a related article is tapped. */
  onArticlePress?: (article: ArticleSummary) => void;
  /** Section heading. Pass `null` to hide. */
  title?: string | null;
  /**
   * - `list` — full-width `compact` rows (default).
   * - `grid` — two-column standard cards.
   */
  variant?: RelatedArticlesVariant;
  /** Show N skeleton placeholders instead of content. */
  loading?: boolean;
  /** How many skeletons to show when `loading`. Default 3. */
  loadingCount?: number;
  /** Message shown when `articles` is empty and not loading. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A "Related / Read next" section that renders a set of {@link ArticleCard}s.
 * Handles the three real-world states: `loading` (skeleton cards), empty (a
 * muted `emptyLabel`), and populated. Two layouts — a vertical `list` of
 * compact rows or a two-column `grid`. Colors come from `SemanticColors` (via
 * the composed cards); no literal hex.
 */
export function RelatedArticles({
  articles,
  onArticlePress,
  title = 'Related',
  variant = 'list',
  loading = false,
  loadingCount = 3,
  emptyLabel = 'Nothing related yet',
  style,
}: RelatedArticlesProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const grid = variant === 'grid';

  const heading =
    title != null ? (
      <Text
        accessibilityRole="header"
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.lg,
          fontWeight: '800',
          marginBottom: tokens.spacing.sm,
        }}
      >
        {title}
      </Text>
    ) : null;

  if (loading) {
    const placeholders = Array.from({ length: Math.max(1, loadingCount) });
    return (
      <View style={style}>
        {heading}
        <View style={grid ? { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md } : { gap: tokens.spacing.md }}>
          {placeholders.map((_, i) => (
            <View key={i} style={grid ? { flexBasis: '47%', flexGrow: 1 } : undefined}>
              <ArticleCard
                loading
                variant={grid ? 'standard' : 'compact'}
                article={{ id: `skeleton-${i}`, title: '' }}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (articles.length === 0) {
    return (
      <View style={style}>
        {heading}
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={style}>
      {heading}
      <View style={grid ? { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md } : { gap: tokens.spacing.md }}>
        {articles.map((article) => (
          <View key={article.id} style={grid ? { flexBasis: '47%', flexGrow: 1 } : undefined}>
            <ArticleCard
              article={article}
              onPress={onArticlePress}
              variant={grid ? 'standard' : 'compact'}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
