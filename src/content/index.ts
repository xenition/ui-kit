/**
 * `@xenition/ui/content` — React DOM (web) building blocks for blog, news, and
 * media-reader apps. Article cards & headers, reading progress, bylines, table
 * of contents, pull quotes, tags, related articles, share/bookmark actions,
 * category chips, a news ticker, and podcast rows.
 *
 * The web parity of `@xenition/ui/native/content`: identical prop contracts with
 * `onPress`-style callbacks renamed to `onClick`/`on*Click`. Every component
 * composes the web `primitives`/`commerce` and styles exclusively via the
 * `--xen-*` token classes (Tailwind preset) — no literal colors.
 */

// ── shared data shapes ────────────────────────────────────────────────
export type {
  ContentAuthor,
  ArticleSummary,
  TocItem,
  ShareTarget,
  PodcastEpisode,
} from './types';

// ── article surfaces ──────────────────────────────────────────────────
export { ArticleCard } from './ArticleCard';
export type { ArticleCardProps, ArticleCardVariant } from './ArticleCard';
export { ArticleHeader } from './ArticleHeader';
export type { ArticleHeaderProps, ArticleHeaderVariant } from './ArticleHeader';

// ── reading aids ──────────────────────────────────────────────────────
export { ReadingProgress } from './ReadingProgress';
export type { ReadingProgressProps, ReadingProgressVariant } from './ReadingProgress';
export { AuthorByline } from './AuthorByline';
export type { AuthorBylineProps, AuthorBylineVariant } from './AuthorByline';
export { TableOfContents } from './TableOfContents';
export type { TableOfContentsProps } from './TableOfContents';
export { PullQuote } from './PullQuote';
export type { PullQuoteProps, PullQuoteVariant } from './PullQuote';

// ── taxonomy & discovery ──────────────────────────────────────────────
export { TagList } from './TagList';
export type { TagListProps } from './TagList';
export { CategoryChip } from './CategoryChip';
export type { CategoryChipProps, CategoryChipVariant } from './CategoryChip';
export { RelatedArticles } from './RelatedArticles';
export type { RelatedArticlesProps, RelatedArticlesVariant } from './RelatedArticles';

// ── actions ───────────────────────────────────────────────────────────
export { ShareRow, DEFAULT_SHARE_TARGETS } from './ShareRow';
export type { ShareRowProps, ShareRowVariant } from './ShareRow';
export { BookmarkButton } from './BookmarkButton';
export type { BookmarkButtonProps, BookmarkButtonVariant } from './BookmarkButton';

// ── feeds & media ─────────────────────────────────────────────────────
export { NewsTicker } from './NewsTicker';
export type { NewsTickerProps, NewsTickerItem, NewsTickerVariant } from './NewsTicker';
export { PodcastRow } from './PodcastRow';
export type { PodcastRowProps, PodcastRowVariant } from './PodcastRow';
