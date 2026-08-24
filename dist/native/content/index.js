"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastRowV3 = exports.PodcastRowV2 = exports.PodcastRow = exports.NewsTicker = exports.BookmarkButton = exports.DEFAULT_SHARE_TARGETS = exports.ShareRow = exports.RelatedArticles = exports.CategoryChip = exports.TagList = exports.PullQuote = exports.TableOfContents = exports.AuthorBylineV3 = exports.AuthorBylineV2 = exports.AuthorByline = exports.ReadingProgress = exports.ArticleHeaderV3 = exports.ArticleHeaderV2 = exports.ArticleHeader = exports.ArticleCardV3 = exports.ArticleCardV2 = exports.ArticleCard = void 0;
// ── article surfaces ──────────────────────────────────────────────────
var ArticleCard_1 = require("./ArticleCard");
Object.defineProperty(exports, "ArticleCard", { enumerable: true, get: function () { return ArticleCard_1.ArticleCard; } });
var ArticleCardV2_1 = require("./ArticleCardV2");
Object.defineProperty(exports, "ArticleCardV2", { enumerable: true, get: function () { return ArticleCardV2_1.ArticleCardV2; } });
var ArticleCardV3_1 = require("./ArticleCardV3");
Object.defineProperty(exports, "ArticleCardV3", { enumerable: true, get: function () { return ArticleCardV3_1.ArticleCardV3; } });
var ArticleHeader_1 = require("./ArticleHeader");
Object.defineProperty(exports, "ArticleHeader", { enumerable: true, get: function () { return ArticleHeader_1.ArticleHeader; } });
var ArticleHeaderV2_1 = require("./ArticleHeaderV2");
Object.defineProperty(exports, "ArticleHeaderV2", { enumerable: true, get: function () { return ArticleHeaderV2_1.ArticleHeaderV2; } });
var ArticleHeaderV3_1 = require("./ArticleHeaderV3");
Object.defineProperty(exports, "ArticleHeaderV3", { enumerable: true, get: function () { return ArticleHeaderV3_1.ArticleHeaderV3; } });
// ── reading aids ──────────────────────────────────────────────────────
var ReadingProgress_1 = require("./ReadingProgress");
Object.defineProperty(exports, "ReadingProgress", { enumerable: true, get: function () { return ReadingProgress_1.ReadingProgress; } });
var AuthorByline_1 = require("./AuthorByline");
Object.defineProperty(exports, "AuthorByline", { enumerable: true, get: function () { return AuthorByline_1.AuthorByline; } });
var AuthorBylineV2_1 = require("./AuthorBylineV2");
Object.defineProperty(exports, "AuthorBylineV2", { enumerable: true, get: function () { return AuthorBylineV2_1.AuthorBylineV2; } });
var AuthorBylineV3_1 = require("./AuthorBylineV3");
Object.defineProperty(exports, "AuthorBylineV3", { enumerable: true, get: function () { return AuthorBylineV3_1.AuthorBylineV3; } });
var TableOfContents_1 = require("./TableOfContents");
Object.defineProperty(exports, "TableOfContents", { enumerable: true, get: function () { return TableOfContents_1.TableOfContents; } });
var PullQuote_1 = require("./PullQuote");
Object.defineProperty(exports, "PullQuote", { enumerable: true, get: function () { return PullQuote_1.PullQuote; } });
// ── taxonomy & discovery ──────────────────────────────────────────────
var TagList_1 = require("./TagList");
Object.defineProperty(exports, "TagList", { enumerable: true, get: function () { return TagList_1.TagList; } });
var CategoryChip_1 = require("./CategoryChip");
Object.defineProperty(exports, "CategoryChip", { enumerable: true, get: function () { return CategoryChip_1.CategoryChip; } });
var RelatedArticles_1 = require("./RelatedArticles");
Object.defineProperty(exports, "RelatedArticles", { enumerable: true, get: function () { return RelatedArticles_1.RelatedArticles; } });
// ── actions ───────────────────────────────────────────────────────────
var ShareRow_1 = require("./ShareRow");
Object.defineProperty(exports, "ShareRow", { enumerable: true, get: function () { return ShareRow_1.ShareRow; } });
Object.defineProperty(exports, "DEFAULT_SHARE_TARGETS", { enumerable: true, get: function () { return ShareRow_1.DEFAULT_SHARE_TARGETS; } });
var BookmarkButton_1 = require("./BookmarkButton");
Object.defineProperty(exports, "BookmarkButton", { enumerable: true, get: function () { return BookmarkButton_1.BookmarkButton; } });
// ── feeds & media ─────────────────────────────────────────────────────
var NewsTicker_1 = require("./NewsTicker");
Object.defineProperty(exports, "NewsTicker", { enumerable: true, get: function () { return NewsTicker_1.NewsTicker; } });
var PodcastRow_1 = require("./PodcastRow");
Object.defineProperty(exports, "PodcastRow", { enumerable: true, get: function () { return PodcastRow_1.PodcastRow; } });
var PodcastRowV2_1 = require("./PodcastRowV2");
Object.defineProperty(exports, "PodcastRowV2", { enumerable: true, get: function () { return PodcastRowV2_1.PodcastRowV2; } });
var PodcastRowV3_1 = require("./PodcastRowV3");
Object.defineProperty(exports, "PodcastRowV3", { enumerable: true, get: function () { return PodcastRowV3_1.PodcastRowV3; } });
//# sourceMappingURL=index.js.map