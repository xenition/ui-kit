"use strict";
/**
 * `@xenition/ui/music` — web (React DOM) building blocks for music-making, DAW,
 * and production apps. The DOM parity of `native/music`: performance surfaces
 * (`TrackPad`, `SamplePad`, `PianoKeys`, `ChordChip`), transport + timing
 * (`BPMControl`, `MetronomeBar`, `LoopControl`, `RecordButton`), mixing
 * (`Mixer`, `VolumeFader`), editing (`WaveformEditor`), and set management
 * (`SetlistRow`).
 *
 * Every component is a **UI shell with no audio engine**: no Web Audio, no
 * sample buffers, no playback. Playback / record / mute / beat state comes in as
 * props and intents (hit a pad, drag a fader, press a key, toggle record, step
 * the tempo) go out via callbacks, so an app wires its real audio backend behind
 * them. All components compose the web `primitives` / `commerce` and style
 * exclusively from the `--xen-*` token utility classes — no literal colors. Web
 * only.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveformEditorV4 = exports.VolumeFaderV4 = exports.TrackPadV4 = exports.SetlistRowV4 = exports.SamplePadV4 = exports.RecordButtonV4 = exports.PianoKeysV4 = exports.MixerV4 = exports.MetronomeBarV4 = exports.LoopControlV4 = exports.ChordChipV4 = exports.BPMControlV4 = exports.SetlistRowV3 = exports.SetlistRowV2 = exports.SetlistRow = exports.WaveformEditor = exports.VolumeFader = exports.MixerV3 = exports.MixerV2 = exports.Mixer = exports.RecordButton = exports.LoopControl = exports.MetronomeBar = exports.BPMControl = exports.ChordChip = exports.PianoKeysV3 = exports.PianoKeysV2 = exports.PianoKeys = exports.SamplePad = exports.TrackPadV3 = exports.TrackPadV2 = exports.TrackPad = exports.ACCENT_STRONG_BG_CLASS = exports.ACCENT_SOFT_BG_CLASS = exports.ACCENT_ICON_COLOR = exports.ACCENT_ON_TEXT_CLASS = exports.ACCENT_BG_CLASS = exports.ACCENT_BORDER_CLASS = exports.ACCENT_TEXT_CLASS = exports.formatDuration = exports.formatBpm = exports.clamp = exports.octaveNotes = exports.isBlackKey = exports.padAccentKey = exports.chordLabel = exports.NOTE_NAMES = void 0;
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
Object.defineProperty(exports, "ACCENT_TEXT_CLASS", { enumerable: true, get: function () { return types_1.ACCENT_TEXT_CLASS; } });
Object.defineProperty(exports, "ACCENT_BORDER_CLASS", { enumerable: true, get: function () { return types_1.ACCENT_BORDER_CLASS; } });
Object.defineProperty(exports, "ACCENT_BG_CLASS", { enumerable: true, get: function () { return types_1.ACCENT_BG_CLASS; } });
Object.defineProperty(exports, "ACCENT_ON_TEXT_CLASS", { enumerable: true, get: function () { return types_1.ACCENT_ON_TEXT_CLASS; } });
Object.defineProperty(exports, "ACCENT_ICON_COLOR", { enumerable: true, get: function () { return types_1.ACCENT_ICON_COLOR; } });
Object.defineProperty(exports, "ACCENT_SOFT_BG_CLASS", { enumerable: true, get: function () { return types_1.ACCENT_SOFT_BG_CLASS; } });
Object.defineProperty(exports, "ACCENT_STRONG_BG_CLASS", { enumerable: true, get: function () { return types_1.ACCENT_STRONG_BG_CLASS; } });
// ── performance surfaces ──────────────────────────────────────────────
var TrackPad_1 = require("./TrackPad");
Object.defineProperty(exports, "TrackPad", { enumerable: true, get: function () { return TrackPad_1.TrackPad; } });
var TrackPadV2_1 = require("./TrackPadV2");
Object.defineProperty(exports, "TrackPadV2", { enumerable: true, get: function () { return TrackPadV2_1.TrackPadV2; } });
var TrackPadV3_1 = require("./TrackPadV3");
Object.defineProperty(exports, "TrackPadV3", { enumerable: true, get: function () { return TrackPadV3_1.TrackPadV3; } });
var SamplePad_1 = require("./SamplePad");
Object.defineProperty(exports, "SamplePad", { enumerable: true, get: function () { return SamplePad_1.SamplePad; } });
var PianoKeys_1 = require("./PianoKeys");
Object.defineProperty(exports, "PianoKeys", { enumerable: true, get: function () { return PianoKeys_1.PianoKeys; } });
var PianoKeysV2_1 = require("./PianoKeysV2");
Object.defineProperty(exports, "PianoKeysV2", { enumerable: true, get: function () { return PianoKeysV2_1.PianoKeysV2; } });
var PianoKeysV3_1 = require("./PianoKeysV3");
Object.defineProperty(exports, "PianoKeysV3", { enumerable: true, get: function () { return PianoKeysV3_1.PianoKeysV3; } });
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
var MixerV2_1 = require("./MixerV2");
Object.defineProperty(exports, "MixerV2", { enumerable: true, get: function () { return MixerV2_1.MixerV2; } });
var MixerV3_1 = require("./MixerV3");
Object.defineProperty(exports, "MixerV3", { enumerable: true, get: function () { return MixerV3_1.MixerV3; } });
var VolumeFader_1 = require("./VolumeFader");
Object.defineProperty(exports, "VolumeFader", { enumerable: true, get: function () { return VolumeFader_1.VolumeFader; } });
// ── editing ───────────────────────────────────────────────────────────
var WaveformEditor_1 = require("./WaveformEditor");
Object.defineProperty(exports, "WaveformEditor", { enumerable: true, get: function () { return WaveformEditor_1.WaveformEditor; } });
// ── set management ────────────────────────────────────────────────────
var SetlistRow_1 = require("./SetlistRow");
Object.defineProperty(exports, "SetlistRow", { enumerable: true, get: function () { return SetlistRow_1.SetlistRow; } });
var SetlistRowV2_1 = require("./SetlistRowV2");
Object.defineProperty(exports, "SetlistRowV2", { enumerable: true, get: function () { return SetlistRowV2_1.SetlistRowV2; } });
var SetlistRowV3_1 = require("./SetlistRowV3");
Object.defineProperty(exports, "SetlistRowV3", { enumerable: true, get: function () { return SetlistRowV3_1.SetlistRowV3; } });
/*
 * ── V4 "session" (tactile DAW) design line ──
 * A drop-in V4 variant for each of the 12 originals: tactile control surfaces
 * with satisfying active/armed/playing states (soft-primary or accent fill + a
 * glyph/label marker, never color alone) and bold tabular-nums numerals. Every
 * V4 keeps its base props (all variant/size values honored) and the per-cell
 * accent-slot colors. The brand gradient is reserved for the session moment —
 * the `WaveformEditor` full signal hero. Base/V2/V3 untouched; V4 is additive.
 * Token-driven, dark-mode safe, web + native.
 */
var BPMControlV4_1 = require("./BPMControlV4");
Object.defineProperty(exports, "BPMControlV4", { enumerable: true, get: function () { return BPMControlV4_1.BPMControlV4; } });
var ChordChipV4_1 = require("./ChordChipV4");
Object.defineProperty(exports, "ChordChipV4", { enumerable: true, get: function () { return ChordChipV4_1.ChordChipV4; } });
var LoopControlV4_1 = require("./LoopControlV4");
Object.defineProperty(exports, "LoopControlV4", { enumerable: true, get: function () { return LoopControlV4_1.LoopControlV4; } });
var MetronomeBarV4_1 = require("./MetronomeBarV4");
Object.defineProperty(exports, "MetronomeBarV4", { enumerable: true, get: function () { return MetronomeBarV4_1.MetronomeBarV4; } });
var MixerV4_1 = require("./MixerV4");
Object.defineProperty(exports, "MixerV4", { enumerable: true, get: function () { return MixerV4_1.MixerV4; } });
var PianoKeysV4_1 = require("./PianoKeysV4");
Object.defineProperty(exports, "PianoKeysV4", { enumerable: true, get: function () { return PianoKeysV4_1.PianoKeysV4; } });
var RecordButtonV4_1 = require("./RecordButtonV4");
Object.defineProperty(exports, "RecordButtonV4", { enumerable: true, get: function () { return RecordButtonV4_1.RecordButtonV4; } });
var SamplePadV4_1 = require("./SamplePadV4");
Object.defineProperty(exports, "SamplePadV4", { enumerable: true, get: function () { return SamplePadV4_1.SamplePadV4; } });
var SetlistRowV4_1 = require("./SetlistRowV4");
Object.defineProperty(exports, "SetlistRowV4", { enumerable: true, get: function () { return SetlistRowV4_1.SetlistRowV4; } });
var TrackPadV4_1 = require("./TrackPadV4");
Object.defineProperty(exports, "TrackPadV4", { enumerable: true, get: function () { return TrackPadV4_1.TrackPadV4; } });
var VolumeFaderV4_1 = require("./VolumeFaderV4");
Object.defineProperty(exports, "VolumeFaderV4", { enumerable: true, get: function () { return VolumeFaderV4_1.VolumeFaderV4; } });
var WaveformEditorV4_1 = require("./WaveformEditorV4");
Object.defineProperty(exports, "WaveformEditorV4", { enumerable: true, get: function () { return WaveformEditorV4_1.WaveformEditorV4; } });
//# sourceMappingURL=index.js.map