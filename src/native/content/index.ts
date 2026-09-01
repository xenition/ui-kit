/**
 * `@xenition/ui/native/content` — React Native building blocks for blog, news,
 * and media-reader apps. Article cards & headers, reading progress, bylines,
 * table of contents, pull quotes, tags, related articles, share/bookmark
 * actions, category chips, a news ticker, and podcast rows.
 *
 * Every component composes the `native/primitives` and styles exclusively from
 * the compiled theme tokens (`SemanticColors` + `tokens.*`) via
 * `useXenitionTheme()` — no literal colors, no DOM. Native only, mobile-first.
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
export { ArticleCardV2 } from './ArticleCardV2';
export type { ArticleCardV2Props } from './ArticleCardV2';
export { ArticleCardV3 } from './ArticleCardV3';
export type { ArticleCardV3Props } from './ArticleCardV3';
export { ArticleHeader } from './ArticleHeader';
export type { ArticleHeaderProps, ArticleHeaderVariant } from './ArticleHeader';
export { ArticleHeaderV2 } from './ArticleHeaderV2';
export type { ArticleHeaderV2Props } from './ArticleHeaderV2';
export { ArticleHeaderV3 } from './ArticleHeaderV3';
export type { ArticleHeaderV3Props } from './ArticleHeaderV3';

// ── reading aids ──────────────────────────────────────────────────────
export { ReadingProgress } from './ReadingProgress';
export type { ReadingProgressProps, ReadingProgressVariant } from './ReadingProgress';
export { AuthorByline } from './AuthorByline';
export type { AuthorBylineProps, AuthorBylineVariant } from './AuthorByline';
export { AuthorBylineV2 } from './AuthorBylineV2';
export type { AuthorBylineV2Props } from './AuthorBylineV2';
export { AuthorBylineV3 } from './AuthorBylineV3';
export type { AuthorBylineV3Props } from './AuthorBylineV3';
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
export { PodcastRowV2 } from './PodcastRowV2';
export type { PodcastRowV2Props } from './PodcastRowV2';
export { PodcastRowV3 } from './PodcastRowV3';
export type { PodcastRowV3Props } from './PodcastRowV3';

// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `CONTENT-CRM-V4-BRIEF.md`. Each
// is a drop-in for its base — same props plus optional additions.
export { ArticleCardV4 } from './ArticleCardV4';
export type { ArticleCardV4Props } from './ArticleCardV4';
export { ArticleHeaderV4 } from './ArticleHeaderV4';
export type { ArticleHeaderV4Props } from './ArticleHeaderV4';
export { AuthorBylineV4 } from './AuthorBylineV4';
export type { AuthorBylineV4Props } from './AuthorBylineV4';
export { BookmarkButtonV4 } from './BookmarkButtonV4';
export type { BookmarkButtonV4Props } from './BookmarkButtonV4';
export { CategoryChipV4 } from './CategoryChipV4';
export type { CategoryChipV4Props } from './CategoryChipV4';
export { NewsTickerV4 } from './NewsTickerV4';
export type { NewsTickerV4Props } from './NewsTickerV4';
export { PodcastRowV4 } from './PodcastRowV4';
export type { PodcastRowV4Props } from './PodcastRowV4';
export { PullQuoteV4 } from './PullQuoteV4';
export type { PullQuoteV4Props } from './PullQuoteV4';
export { ReadingProgressV4 } from './ReadingProgressV4';
export type { ReadingProgressV4Props } from './ReadingProgressV4';
export { RelatedArticlesV4 } from './RelatedArticlesV4';
export type { RelatedArticlesV4Props } from './RelatedArticlesV4';
export { ShareRowV4 } from './ShareRowV4';
export type { ShareRowV4Props } from './ShareRowV4';
export { TableOfContentsV4 } from './TableOfContentsV4';
export type { TableOfContentsV4Props } from './TableOfContentsV4';
export { TagListV4 } from './TagListV4';
export type { TagListV4Props } from './TagListV4';
