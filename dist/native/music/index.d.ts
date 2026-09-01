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
export { NOTE_NAMES, chordLabel, padAccentKey, isBlackKey, octaveNotes, clamp, formatBpm, formatDuration, withAlpha, } from './types';
export type { NoteName, ChordQuality, PadCell, MixerChannel, Chord, SetlistSong, } from './types';
export { TrackPad } from './TrackPad';
export type { TrackPadProps, TrackPadVariant } from './TrackPad';
export { SamplePad } from './SamplePad';
export type { SamplePadProps, SamplePadVariant } from './SamplePad';
export { PianoKeys } from './PianoKeys';
export type { PianoKeysProps, PianoKeysVariant } from './PianoKeys';
export { ChordChip } from './ChordChip';
export type { ChordChipProps, ChordChipVariant, ChordChipSize } from './ChordChip';
export { BPMControl } from './BPMControl';
export type { BPMControlProps, BPMControlVariant } from './BPMControl';
export { MetronomeBar } from './MetronomeBar';
export type { MetronomeBarProps, MetronomeBarVariant } from './MetronomeBar';
export { LoopControl } from './LoopControl';
export type { LoopControlProps, LoopControlVariant } from './LoopControl';
export { RecordButton } from './RecordButton';
export type { RecordButtonProps, RecordButtonVariant, RecordButtonSize } from './RecordButton';
export { Mixer } from './Mixer';
export type { MixerProps, MixerVariant } from './Mixer';
export { VolumeFader } from './VolumeFader';
export type { VolumeFaderProps, VolumeFaderVariant } from './VolumeFader';
export { WaveformEditor } from './WaveformEditor';
export type { WaveformEditorProps, WaveformEditorVariant } from './WaveformEditor';
export { SetlistRow } from './SetlistRow';
export type { SetlistRowProps, SetlistRowVariant } from './SetlistRow';
export { TrackPadV2 } from './TrackPadV2';
export type { TrackPadV2Props } from './TrackPadV2';
export { TrackPadV3 } from './TrackPadV3';
export type { TrackPadV3Props } from './TrackPadV3';
export { MixerV2 } from './MixerV2';
export type { MixerV2Props } from './MixerV2';
export { MixerV3 } from './MixerV3';
export type { MixerV3Props } from './MixerV3';
export { PianoKeysV2 } from './PianoKeysV2';
export type { PianoKeysV2Props } from './PianoKeysV2';
export { PianoKeysV3 } from './PianoKeysV3';
export type { PianoKeysV3Props } from './PianoKeysV3';
export { SetlistRowV2 } from './SetlistRowV2';
export type { SetlistRowV2Props } from './SetlistRowV2';
export { SetlistRowV3 } from './SetlistRowV3';
export type { SetlistRowV3Props } from './SetlistRowV3';
export { BPMControlV4, type BPMControlV4Props } from './BPMControlV4';
export { ChordChipV4, type ChordChipV4Props } from './ChordChipV4';
export { LoopControlV4, type LoopControlV4Props } from './LoopControlV4';
export { MetronomeBarV4, type MetronomeBarV4Props } from './MetronomeBarV4';
export { MixerV4, type MixerV4Props } from './MixerV4';
export { PianoKeysV4, type PianoKeysV4Props } from './PianoKeysV4';
export { RecordButtonV4, type RecordButtonV4Props } from './RecordButtonV4';
export { SamplePadV4, type SamplePadV4Props } from './SamplePadV4';
export { SetlistRowV4, type SetlistRowV4Props } from './SetlistRowV4';
export { TrackPadV4, type TrackPadV4Props } from './TrackPadV4';
export { VolumeFaderV4, type VolumeFaderV4Props } from './VolumeFaderV4';
export { WaveformEditorV4, type WaveformEditorV4Props } from './WaveformEditorV4';
//# sourceMappingURL=index.d.ts.map