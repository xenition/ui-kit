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
  ACCENT_TEXT_CLASS,
  ACCENT_BORDER_CLASS,
  ACCENT_BG_CLASS,
  ACCENT_ON_TEXT_CLASS,
  ACCENT_ICON_COLOR,
  ACCENT_SOFT_BG_CLASS,
  ACCENT_STRONG_BG_CLASS,
} from './types';
export type {
  NoteName,
  ChordQuality,
  AccentSlot,
  PadCell,
  MixerChannel,
  Chord,
  SetlistSong,
} from './types';

// ── performance surfaces ──────────────────────────────────────────────
export { TrackPad } from './TrackPad';
export type { TrackPadProps, TrackPadVariant } from './TrackPad';
export { TrackPadV2 } from './TrackPadV2';
export type { TrackPadV2Props } from './TrackPadV2';
export { TrackPadV3 } from './TrackPadV3';
export type { TrackPadV3Props } from './TrackPadV3';
export { SamplePad } from './SamplePad';
export type { SamplePadProps, SamplePadVariant } from './SamplePad';
export { PianoKeys } from './PianoKeys';
export type { PianoKeysProps, PianoKeysVariant } from './PianoKeys';
export { PianoKeysV2 } from './PianoKeysV2';
export type { PianoKeysV2Props } from './PianoKeysV2';
export { PianoKeysV3 } from './PianoKeysV3';
export type { PianoKeysV3Props } from './PianoKeysV3';
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
export { MixerV2 } from './MixerV2';
export type { MixerV2Props } from './MixerV2';
export { MixerV3 } from './MixerV3';
export type { MixerV3Props } from './MixerV3';
export { VolumeFader } from './VolumeFader';
export type { VolumeFaderProps, VolumeFaderVariant } from './VolumeFader';

// ── editing ───────────────────────────────────────────────────────────
export { WaveformEditor } from './WaveformEditor';
export type { WaveformEditorProps, WaveformEditorVariant } from './WaveformEditor';

// ── set management ────────────────────────────────────────────────────
export { SetlistRow } from './SetlistRow';
export type { SetlistRowProps, SetlistRowVariant } from './SetlistRow';
export { SetlistRowV2 } from './SetlistRowV2';
export type { SetlistRowV2Props } from './SetlistRowV2';
export { SetlistRowV3 } from './SetlistRowV3';
export type { SetlistRowV3Props } from './SetlistRowV3';
