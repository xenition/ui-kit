import * as React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { ArticleCardV4 } from './ArticleCardV4';
import type { RelatedArticlesProps } from './RelatedArticles';

export interface RelatedArticlesV4Props extends RelatedArticlesProps {
  /** The next-step sentence under `emptyLabel`. */
  emptyDescription?: string;
  /** Announced while the section loads. Default `'Loading related articles'`. */
  loadingLabel?: string;
}

/**
 * **V4 related articles** — same props as {@link RelatedArticles} plus
 * `emptyDescription` and `loadingLabel`.
 *
 * ## Three changes
 *
 * 1. **The empty state is the shared `EmptyState`.** The web twin composed it
 *    and this one hand-rolled a bordered box with a single muted line in it,
 *    even though `EmptyState` has been in native primitives all along — so on
 *    a phone the section could never have an icon, a description or a "browse
 *    the archive" action, and the two platforms drew a different component for
 *    the same state.
 * 2. **The empty state explains itself.** `emptyDescription` is the next-step
 *    sentence a lone grey line cannot carry.
 * 3. **The loading region says it is loading.** The base showed a silent grid
 *    of skeleton cards.
 */
export function RelatedArticlesV4({
  articles,
  onArticlePress,
  title = 'Related',
  variant = 'list',
  loading = false,
  loadingCount = 3,
  emptyLabel = 'Nothing related yet',
  emptyDescription,
  loadingLabel = 'Loading related articles',
  style,
}: RelatedArticlesV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const grid = variant === 'grid';

  const layout: ViewStyle = grid
    ? { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }
    : { gap: tokens.spacing.md };
  const cell: ViewStyle | undefined = grid ? { flexBasis: '47%', flexGrow: 1 } : undefined;

  const heading =
    title != null ? (
      <TextV4
        accessibilityRole="header"
        size="lg"
        weight="bold"
        tone="onSurface"
        style={{ marginBottom: tokens.spacing.sm }}
      >
        {title}
      </TextV4>
    ) : null;

  if (loading) {
    const placeholders = Array.from({ length: Math.max(1, loadingCount) });
    return (
      <View style={style}>
        {heading}
        {/* One announcement for the section, not one per ghost card. */}
        <View
          accessible
          accessibilityLabel={loadingLabel}
          accessibilityLiveRegion="polite"
          style={layout}
        >
          {placeholders.map((_, i) => (
            <View key={i} style={cell}>
              <ArticleCardV4
                loading
                loadingLabel={loadingLabel}
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
        <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
      </View>
    );
  }

  return (
    <View style={style}>
      {heading}
      <View style={layout}>
        {articles.map((article) => (
          <View key={article.id} style={cell}>
            <ArticleCardV4
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
