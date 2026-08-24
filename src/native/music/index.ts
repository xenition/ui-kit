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

// ── shared data shapes + helpers ──────────────────────────────────────
export {
  NOTE_NAMES,
  chordLabel,
  padAccentKey,
  isBlackKey,
  octaveNotes,
  clamp,
  formatBpm,
  formatDuration,
  withAlpha,
} from './types';
export type {
  NoteName,
  ChordQuality,
  PadCell,
  MixerChannel,
  Chord,
  SetlistSong,
} from './types';

// ── performance surfaces ──────────────────────────────────────────────
export { TrackPad } from './TrackPad';
export type { TrackPadProps, TrackPadVariant } from './TrackPad';
export { SamplePad } from './SamplePad';
export type { SamplePadProps, SamplePadVariant } from './SamplePad';
export { PianoKeys } from './PianoKeys';
export type { PianoKeysProps, PianoKeysVariant } from './PianoKeys';
export { ChordChip } from './ChordChip';
export type { ChordChipProps, ChordChipVariant, ChordChipSize } from './ChordChip';

// ── transport + timing ────────────────────────────────────────────────
export { BPMControl } from './BPMControl';
export type { BPMControlProps, BPMControlVariant } from './BPMControl';
export { MetronomeBar } from './MetronomeBar';
export type { MetronomeBarProps, MetronomeBarVariant } from './MetronomeBar';
export { LoopControl } from './LoopControl';
export type { LoopControlProps, LoopControlVariant } from './LoopControl';
export { RecordButton } from './RecordButton';
export type { RecordButtonProps, RecordButtonVariant, RecordButtonSize } from './RecordButton';

// ── mixing ────────────────────────────────────────────────────────────
export { Mixer } from './Mixer';
export type { MixerProps, MixerVariant } from './Mixer';
export { VolumeFader } from './VolumeFader';
export type { VolumeFaderProps, VolumeFaderVariant } from './VolumeFader';

// ── editing ───────────────────────────────────────────────────────────
export { WaveformEditor } from './WaveformEditor';
export type { WaveformEditorProps, WaveformEditorVariant } from './WaveformEditor';

// ── set management ────────────────────────────────────────────────────
export { SetlistRow } from './SetlistRow';
export type { SetlistRowProps, SetlistRowVariant } from './SetlistRow';
