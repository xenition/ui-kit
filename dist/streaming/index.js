"use strict";
/**
 * `@xenition/ui/streaming` — web (React DOM) building blocks for video, audio,
 * podcast, and music apps. The DOM parity of `native/streaming`: player shells
 * (`VideoPlayer`, `AudioPlayer`, `MiniPlayer`, `NowPlaying`), library rows &
 * cards (`PlaylistRow`, `PodcastCard`, `EpisodeRow`, `ChannelCard`), a
 * click/keyboard-to-seek `WaveformScrubber`, a `QueueList`, and live/cast
 * affordances (`LiveBadge`, `CastButton`).
 *
 * Every player is a **UI shell with no playback dependency**: position/duration
 * come in as props and seek/toggle/skip intents go out via callbacks, so an app
 * wires a real engine (an `<audio>`/`<video>` element) behind them. All
 * components compose the web `primitives` (+ `EmptyState` from `commerce`,
 * `MediaFigure` from `media`) and style exclusively from the `--xen-*` theme
 * tokens via Tailwind token classes — no literal colors. `forwardRef` is
 * exposed wherever a DOM root exists.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepTimer = exports.CategoryRail = exports.UpNext = exports.LyricsView = exports.AlbumHeader = exports.FullScreenPlayer = exports.CastButtonV4 = exports.LiveBadgeV4 = exports.ChannelCardV4 = exports.PlaylistRowV4 = exports.QueueListV4 = exports.WaveformScrubberV4 = exports.VideoPlayerV4 = exports.AudioPlayerV4 = exports.PodcastCardV4 = exports.EpisodeRowV4 = exports.MiniPlayerV4 = exports.NowPlayingV4 = exports.CastButton = exports.LiveBadge = exports.ChannelCard = exports.EpisodeRowV3 = exports.EpisodeRowV2 = exports.EpisodeRow = exports.PodcastCardV3 = exports.PodcastCardV2 = exports.PodcastCard = exports.QueueList = exports.PlaylistRow = exports.WaveformScrubber = exports.NowPlayingV3 = exports.NowPlayingV2 = exports.NowPlaying = exports.MiniPlayerV3 = exports.MiniPlayerV2 = exports.MiniPlayer = exports.AudioPlayer = exports.VideoPlayer = exports.formatCount = exports.formatTime = void 0;
var types_1 = require("./types");
Object.defineProperty(exports, "formatTime", { enumerable: true, get: function () { return types_1.formatTime; } });
Object.defineProperty(exports, "formatCount", { enumerable: true, get: function () { return types_1.formatCount; } });
// ── player shells ─────────────────────────────────────────────────────
var VideoPlayer_1 = require("./VideoPlayer");
Object.defineProperty(exports, "VideoPlayer", { enumerable: true, get: function () { return VideoPlayer_1.VideoPlayer; } });
var AudioPlayer_1 = require("./AudioPlayer");
Object.defineProperty(exports, "AudioPlayer", { enumerable: true, get: function () { return AudioPlayer_1.AudioPlayer; } });
var MiniPlayer_1 = require("./MiniPlayer");
Object.defineProperty(exports, "MiniPlayer", { enumerable: true, get: function () { return MiniPlayer_1.MiniPlayer; } });
var MiniPlayerV2_1 = require("./MiniPlayerV2");
Object.defineProperty(exports, "MiniPlayerV2", { enumerable: true, get: function () { return MiniPlayerV2_1.MiniPlayerV2; } });
var MiniPlayerV3_1 = require("./MiniPlayerV3");
Object.defineProperty(exports, "MiniPlayerV3", { enumerable: true, get: function () { return MiniPlayerV3_1.MiniPlayerV3; } });
var NowPlaying_1 = require("./NowPlaying");
Object.defineProperty(exports, "NowPlaying", { enumerable: true, get: function () { return NowPlaying_1.NowPlaying; } });
var NowPlayingV2_1 = require("./NowPlayingV2");
Object.defineProperty(exports, "NowPlayingV2", { enumerable: true, get: function () { return NowPlayingV2_1.NowPlayingV2; } });
var NowPlayingV3_1 = require("./NowPlayingV3");
Object.defineProperty(exports, "NowPlayingV3", { enumerable: true, get: function () { return NowPlayingV3_1.NowPlayingV3; } });
// ── scrubbing ─────────────────────────────────────────────────────────
var WaveformScrubber_1 = require("./WaveformScrubber");
Object.defineProperty(exports, "WaveformScrubber", { enumerable: true, get: function () { return WaveformScrubber_1.WaveformScrubber; } });
// ── library rows & cards ──────────────────────────────────────────────
var PlaylistRow_1 = require("./PlaylistRow");
Object.defineProperty(exports, "PlaylistRow", { enumerable: true, get: function () { return PlaylistRow_1.PlaylistRow; } });
var QueueList_1 = require("./QueueList");
Object.defineProperty(exports, "QueueList", { enumerable: true, get: function () { return QueueList_1.QueueList; } });
var PodcastCard_1 = require("./PodcastCard");
Object.defineProperty(exports, "PodcastCard", { enumerable: true, get: function () { return PodcastCard_1.PodcastCard; } });
var PodcastCardV2_1 = require("./PodcastCardV2");
Object.defineProperty(exports, "PodcastCardV2", { enumerable: true, get: function () { return PodcastCardV2_1.PodcastCardV2; } });
var PodcastCardV3_1 = require("./PodcastCardV3");
Object.defineProperty(exports, "PodcastCardV3", { enumerable: true, get: function () { return PodcastCardV3_1.PodcastCardV3; } });
var EpisodeRow_1 = require("./EpisodeRow");
Object.defineProperty(exports, "EpisodeRow", { enumerable: true, get: function () { return EpisodeRow_1.EpisodeRow; } });
var EpisodeRowV2_1 = require("./EpisodeRowV2");
Object.defineProperty(exports, "EpisodeRowV2", { enumerable: true, get: function () { return EpisodeRowV2_1.EpisodeRowV2; } });
var EpisodeRowV3_1 = require("./EpisodeRowV3");
Object.defineProperty(exports, "EpisodeRowV3", { enumerable: true, get: function () { return EpisodeRowV3_1.EpisodeRowV3; } });
var ChannelCard_1 = require("./ChannelCard");
Object.defineProperty(exports, "ChannelCard", { enumerable: true, get: function () { return ChannelCard_1.ChannelCard; } });
// ── live & cast affordances ───────────────────────────────────────────
var LiveBadge_1 = require("./LiveBadge");
Object.defineProperty(exports, "LiveBadge", { enumerable: true, get: function () { return LiveBadge_1.LiveBadge; } });
var CastButton_1 = require("./CastButton");
Object.defineProperty(exports, "CastButton", { enumerable: true, get: function () { return CastButton_1.CastButton; } });
/*
 * ── V4 "spotlight" (artwork-forward) design line ──
 * A drop-in V4 variant for each of the 12 originals: artwork-forward cards, a
 * gradient glow behind the big covers, large round primary transport controls,
 * and a full brand gradient reserved for the immersive moments (full-screen
 * player, album hero). Base/V2/V3 untouched; V4 is additive. Token-driven,
 * dark-mode safe, web + native.
 */
var NowPlayingV4_1 = require("./NowPlayingV4");
Object.defineProperty(exports, "NowPlayingV4", { enumerable: true, get: function () { return NowPlayingV4_1.NowPlayingV4; } });
var MiniPlayerV4_1 = require("./MiniPlayerV4");
Object.defineProperty(exports, "MiniPlayerV4", { enumerable: true, get: function () { return MiniPlayerV4_1.MiniPlayerV4; } });
var EpisodeRowV4_1 = require("./EpisodeRowV4");
Object.defineProperty(exports, "EpisodeRowV4", { enumerable: true, get: function () { return EpisodeRowV4_1.EpisodeRowV4; } });
var PodcastCardV4_1 = require("./PodcastCardV4");
Object.defineProperty(exports, "PodcastCardV4", { enumerable: true, get: function () { return PodcastCardV4_1.PodcastCardV4; } });
var AudioPlayerV4_1 = require("./AudioPlayerV4");
Object.defineProperty(exports, "AudioPlayerV4", { enumerable: true, get: function () { return AudioPlayerV4_1.AudioPlayerV4; } });
var VideoPlayerV4_1 = require("./VideoPlayerV4");
Object.defineProperty(exports, "VideoPlayerV4", { enumerable: true, get: function () { return VideoPlayerV4_1.VideoPlayerV4; } });
var WaveformScrubberV4_1 = require("./WaveformScrubberV4");
Object.defineProperty(exports, "WaveformScrubberV4", { enumerable: true, get: function () { return WaveformScrubberV4_1.WaveformScrubberV4; } });
var QueueListV4_1 = require("./QueueListV4");
Object.defineProperty(exports, "QueueListV4", { enumerable: true, get: function () { return QueueListV4_1.QueueListV4; } });
var PlaylistRowV4_1 = require("./PlaylistRowV4");
Object.defineProperty(exports, "PlaylistRowV4", { enumerable: true, get: function () { return PlaylistRowV4_1.PlaylistRowV4; } });
var ChannelCardV4_1 = require("./ChannelCardV4");
Object.defineProperty(exports, "ChannelCardV4", { enumerable: true, get: function () { return ChannelCardV4_1.ChannelCardV4; } });
var LiveBadgeV4_1 = require("./LiveBadgeV4");
Object.defineProperty(exports, "LiveBadgeV4", { enumerable: true, get: function () { return LiveBadgeV4_1.LiveBadgeV4; } });
var CastButtonV4_1 = require("./CastButtonV4");
Object.defineProperty(exports, "CastButtonV4", { enumerable: true, get: function () { return CastButtonV4_1.CastButtonV4; } });
/* ── New components (V4 spotlight line) ── */
var FullScreenPlayer_1 = require("./FullScreenPlayer");
Object.defineProperty(exports, "FullScreenPlayer", { enumerable: true, get: function () { return FullScreenPlayer_1.FullScreenPlayer; } });
var AlbumHeader_1 = require("./AlbumHeader");
Object.defineProperty(exports, "AlbumHeader", { enumerable: true, get: function () { return AlbumHeader_1.AlbumHeader; } });
var LyricsView_1 = require("./LyricsView");
Object.defineProperty(exports, "LyricsView", { enumerable: true, get: function () { return LyricsView_1.LyricsView; } });
var UpNext_1 = require("./UpNext");
Object.defineProperty(exports, "UpNext", { enumerable: true, get: function () { return UpNext_1.UpNext; } });
var CategoryRail_1 = require("./CategoryRail");
Object.defineProperty(exports, "CategoryRail", { enumerable: true, get: function () { return CategoryRail_1.CategoryRail; } });
var SleepTimer_1 = require("./SleepTimer");
Object.defineProperty(exports, "SleepTimer", { enumerable: true, get: function () { return SleepTimer_1.SleepTimer; } });
//# sourceMappingURL=index.js.map