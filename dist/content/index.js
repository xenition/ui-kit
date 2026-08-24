"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastRow = exports.NewsTicker = exports.BookmarkButton = exports.DEFAULT_SHARE_TARGETS = exports.ShareRow = exports.RelatedArticles = exports.CategoryChip = exports.TagList = exports.PullQuote = exports.TableOfContents = exports.AuthorByline = exports.ReadingProgress = exports.ArticleHeader = exports.ArticleCard = void 0;
// ── article surfaces ──────────────────────────────────────────────────
var ArticleCard_1 = require("./ArticleCard");
Object.defineProperty(exports, "ArticleCard", { enumerable: true, get: function () { return ArticleCard_1.ArticleCard; } });
var ArticleHeader_1 = require("./ArticleHeader");
Object.defineProperty(exports, "ArticleHeader", { enumerable: true, get: function () { return ArticleHeader_1.ArticleHeader; } });
// ── reading aids ──────────────────────────────────────────────────────
var ReadingProgress_1 = require("./ReadingProgress");
Object.defineProperty(exports, "ReadingProgress", { enumerable: true, get: function () { return ReadingProgress_1.ReadingProgress; } });
var AuthorByline_1 = require("./AuthorByline");
Object.defineProperty(exports, "AuthorByline", { enumerable: true, get: function () { return AuthorByline_1.AuthorByline; } });
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
//# sourceMappingURL=index.js.map