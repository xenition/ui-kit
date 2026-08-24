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
exports.CastButton = exports.LiveBadge = exports.ChannelCard = exports.EpisodeRowV3 = exports.EpisodeRowV2 = exports.EpisodeRow = exports.PodcastCardV3 = exports.PodcastCardV2 = exports.PodcastCard = exports.QueueList = exports.PlaylistRow = exports.WaveformScrubber = exports.NowPlayingV3 = exports.NowPlayingV2 = exports.NowPlaying = exports.MiniPlayerV3 = exports.MiniPlayerV2 = exports.MiniPlayer = exports.AudioPlayer = exports.VideoPlayer = exports.formatCount = exports.formatTime = void 0;
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
//# sourceMappingURL=index.js.map