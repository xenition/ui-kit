"use strict";
/**
 * `@xenition/ui/native/music` — React Native building blocks for
 * music-making, DAW, and production apps. Performance surfaces (`TrackPad`,
 * `SamplePad`, `PianoKeys`, `ChordChip`), transport + timing (`BPMControl`,
 * `MetronomeBar`, `LoopControl`, `RecordButton`), mixing (`Mixer`,
 * `VolumeFader`), editing (`WaveformEditor`), and set management (`SetlistRow`).
 *
 * Every component is a **UI shell with no audio engine**: no Web Audio, no
 * sample buffers, no playback. Playback / record / mute / beat state comes in
 * as props and intents (hit a pad, drag a fader, press a key, toggle record,
 * step the tempo) go out via callbacks, so an app wires its real audio backend
 * behind them. All components compose the `native/primitives` and style
 * exclusively from the compiled theme tokens (`SemanticColors` + `tokens.*`,
 * with token-derived `withAlpha` tints) via `useXenitionTheme()` — no literal
 * colors, no DOM. Native only, mobile-first.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetlistRow = exports.WaveformEditor = exports.VolumeFader = exports.Mixer = exports.RecordButton = exports.LoopControl = exports.MetronomeBar = exports.BPMControl = exports.ChordChip = exports.PianoKeys = exports.SamplePad = exports.TrackPad = exports.withAlpha = exports.formatDuration = exports.formatBpm = exports.clamp = exports.octaveNotes = exports.isBlackKey = exports.padAccentKey = exports.chordLabel = exports.NOTE_NAMES = void 0;
// ── shared data shapes + helpers ──────────────────────────────────────
var types_1 = require("./types");
Object.defineProperty(exports, "NOTE_NAMES", { enumerable: true, get: function () { return types_1.NOTE_NAMES; } });
Object.defineProperty(exports, "chordLabel", { enumerable: true, get: function () { return types_1.chordLabel; } });
Object.defineProperty(exports, "padAccentKey", { enumerable: true, get: function () { return types_1.padAccentKey; } });
Object.defineProperty(exports, "isBlackKey", { enumerable: true, get: function () { return types_1.isBlackKey; } });
Object.defineProperty(exports, "octaveNotes", { enumerable: true, get: function () { return types_1.octaveNotes; } });
Object.defineProperty(exports, "clamp", { enumerable: true, get: function () { return types_1.clamp; } });
Object.defineProperty(exports, "formatBpm", { enumerable: true, get: function () { return types_1.formatBpm; } });
Object.defineProperty(exports, "formatDuration", { enumerable: true, get: function () { return types_1.formatDuration; } });
Object.defineProperty(exports, "withAlpha", { enumerable: true, get: function () { return types_1.withAlpha; } });
// ── performance surfaces ──────────────────────────────────────────────
var TrackPad_1 = require("./TrackPad");
Object.defineProperty(exports, "TrackPad", { enumerable: true, get: function () { return TrackPad_1.TrackPad; } });
var SamplePad_1 = require("./SamplePad");
Object.defineProperty(exports, "SamplePad", { enumerable: true, get: function () { return SamplePad_1.SamplePad; } });
var PianoKeys_1 = require("./PianoKeys");
Object.defineProperty(exports, "PianoKeys", { enumerable: true, get: function () { return PianoKeys_1.PianoKeys; } });
var ChordChip_1 = require("./ChordChip");
Object.defineProperty(exports, "ChordChip", { enumerable: true, get: function () { return ChordChip_1.ChordChip; } });
// ── transport + timing ────────────────────────────────────────────────
var BPMControl_1 = require("./BPMControl");
Object.defineProperty(exports, "BPMControl", { enumerable: true, get: function () { return BPMControl_1.BPMControl; } });
var MetronomeBar_1 = require("./MetronomeBar");
Object.defineProperty(exports, "MetronomeBar", { enumerable: true, get: function () { return MetronomeBar_1.MetronomeBar; } });
var LoopControl_1 = require("./LoopControl");
Object.defineProperty(exports, "LoopControl", { enumerable: true, get: function () { return LoopControl_1.LoopControl; } });
var RecordButton_1 = require("./RecordButton");
Object.defineProperty(exports, "RecordButton", { enumerable: true, get: function () { return RecordButton_1.RecordButton; } });
// ── mixing ────────────────────────────────────────────────────────────
var Mixer_1 = require("./Mixer");
Object.defineProperty(exports, "Mixer", { enumerable: true, get: function () { return Mixer_1.Mixer; } });
var VolumeFader_1 = require("./VolumeFader");
Object.defineProperty(exports, "VolumeFader", { enumerable: true, get: function () { return VolumeFader_1.VolumeFader; } });
// ── editing ───────────────────────────────────────────────────────────
var WaveformEditor_1 = require("./WaveformEditor");
Object.defineProperty(exports, "WaveformEditor", { enumerable: true, get: function () { return WaveformEditor_1.WaveformEditor; } });
// ── set management ────────────────────────────────────────────────────
var SetlistRow_1 = require("./SetlistRow");
Object.defineProperty(exports, "SetlistRow", { enumerable: true, get: function () { return SetlistRow_1.SetlistRow; } });
//# sourceMappingURL=index.js.map