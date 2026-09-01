/**
 * Alternate music designs (v2 / v3) — the drop-in redesigns of four
 * frequently-used native music blocks (TrackPad, Mixer, PianoKeys, SetlistRow).
 * Each variant keeps the base component's exact props, so these specs prove they
 * (a) mount (including empty Mixer / SetlistRow), (b) stay token-pure under BOTH
 * seeds (every color traces to a compiled token — no hardcoded hex), and (c)
 * remain interactive where the base was (pad hit / fader drag).
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { TrackPadV2 } from './TrackPadV2';
import { TrackPadV3 } from './TrackPadV3';
import { MixerV2 } from './MixerV2';
import { MixerV3 } from './MixerV3';
import { PianoKeysV2 } from './PianoKeysV2';
import { PianoKeysV3 } from './PianoKeysV3';
import { SetlistRowV2 } from './SetlistRowV2';
import { SetlistRowV3 } from './SetlistRowV3';
import {
  BPMControlV4,
  ChordChipV4,
  LoopControlV4,
  MetronomeBarV4,
  MixerV4,
  PianoKeysV4,
  RecordButtonV4,
  SamplePadV4,
  SetlistRowV4,
  TrackPadV4,
  VolumeFaderV4,
  WaveformEditorV4,
} from './index';
import type { PadCell, MixerChannel, SetlistSong, Chord } from './types';

const PADS: PadCell[] = [
  { id: 'p1', label: 'Kick', glyph: '🥁' },
  { id: 'p2', label: 'Snare', glyph: '🥁' },
  { id: 'p3', label: 'Hat', glyph: '🎩' },
  { id: 'p4', empty: true },
];

const CHANNELS: MixerChannel[] = [
  { id: 'c1', name: 'Drums', volume: 80, level: 0.7 },
  { id: 'c2', name: 'Bass', volume: 55, muted: true, level: 0.4 },
  { id: 'c3', name: 'Lead', volume: 40, soloed: true, level: 0.9 },
];

const SONG: SetlistSong = {
  id: 's1',
  title: 'Midnight Run',
  artist: 'The Aviators',
  key: 'A minor',
  bpm: 128,
  durationSec: 214,
};

/** Fire a grant on the first `adjustable` node at `locationX` after sizing it. */
function grantSlider(root: ReactTestInstance, locationX: number): void {
  const slider = root.findAll((n) => n.props?.accessibilityRole === 'adjustable')[0];
  expect(slider).toBeTruthy();
  fireEvent(slider!, 'layout', { nativeEvent: { layout: { width: 200, height: 20, x: 0, y: 0 } } });
  fireEvent(slider!, 'responderGrant', {
    nativeEvent: { locationX },
    touchHistory: { numberActiveTouches: 0, indexOfSingleActiveTouch: 0, mostRecentTimeStamp: 0, touchBank: [] },
  });
}

/** Fire a grant on the first `adjustable` node at `locationY` after sizing it. */
function grantVFader(root: ReactTestInstance, locationY: number): void {
  const fader = root.findAll((n) => n.props?.accessibilityRole === 'adjustable')[0];
  expect(fader).toBeTruthy();
  fireEvent(fader!, 'layout', { nativeEvent: { layout: { width: 14, height: 100, x: 0, y: 0 } } });
  fireEvent(fader!, 'responderGrant', {
    nativeEvent: { locationX: 0, locationY },
    touchHistory: { numberActiveTouches: 0, indexOfSingleActiveTouch: 0, mostRecentTimeStamp: 0, touchBank: [] },
  });
}

describe('TrackPad alternates (native)', () => {
  it('V2 renders a glowing grid, lights active pads, fires a hit and blocks empty', () => {
    const onPadPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TrackPadV2 pads={PADS} label="Kit" activePadIds={['p1']} onPadPress={onPadPress} />,
      SEED_LIGHT
    );
    expect(getByText('Kit')).toBeTruthy();
    expect(getByLabelText('Kick, live').props.accessibilityState.selected).toBe(true);
    fireEvent.press(getByLabelText('Snare'));
    expect(onPadPress).toHaveBeenCalledWith(PADS[1], 1);
    expect(getByLabelText('Pad 4, empty').props.accessibilityState.disabled).toBe(true);
  });

  it('V3 renders a compact grid and fires a pad hit', () => {
    const onPadPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <TrackPadV3 pads={PADS} activePadIds={['p2']} onPadPress={onPadPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Kick'));
    expect(onPadPress).toHaveBeenCalledWith(PADS[0], 0);
    expect(getByLabelText('Snare, live').props.accessibilityState.selected).toBe(true);
  });
});

describe('Mixer alternates (native)', () => {
  it('V2 renders vertical strips, fires the vertical fader and toggles mute', () => {
    const onVolumeChange = jest.fn();
    const onToggleMute = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <MixerV2 channels={CHANNELS} title="Console" onVolumeChange={onVolumeChange} onToggleMute={onToggleMute} />,
      SEED_LIGHT
    );
    expect(getByText('Console')).toBeTruthy();
    fireEvent.press(getByLabelText('Mute Drums'));
    expect(onToggleMute).toHaveBeenCalledWith(CHANNELS[0]);

    grantVFader(root, 10); // near the top → high value
    expect(onVolumeChange).toHaveBeenCalled();
    expect(onVolumeChange.mock.calls[0][0]).toBe(CHANNELS[0]);
    expect(typeof onVolumeChange.mock.calls[0][1]).toBe('number');
  });

  it('V3 renders compact fader rows and fires the horizontal fader', () => {
    const onVolumeChange = jest.fn();
    const { getByText, root } = renderThemed(
      <MixerV3 channels={CHANNELS} title="Board" onVolumeChange={onVolumeChange} />,
      SEED_DARK
    );
    expect(getByText('Board')).toBeTruthy();
    grantSlider(root, 200);
    expect(onVolumeChange).toHaveBeenCalled();
    expect(onVolumeChange.mock.calls[0][0]).toBe(CHANNELS[0]);
    expect(typeof onVolumeChange.mock.calls[0][1]).toBe('number');
  });

  it('both render an EmptyState when there are no channels', () => {
    expect(renderThemed(<MixerV2 channels={[]} />, SEED_LIGHT).getByText('No channels')).toBeTruthy();
    expect(renderThemed(<MixerV3 channels={[]} />, SEED_DARK).getByText('No channels')).toBeTruthy();
  });
});

describe('PianoKeys alternates (native)', () => {
  it('V2 renders labelled raised keys, lights held notes and fires a press', () => {
    const onKeyPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <PianoKeysV2 startOctave={4} highlightedNotes={['C4']} onKeyPress={onKeyPress} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Key C4').props.accessibilityState.selected).toBe(true);
    fireEvent.press(getByLabelText('Key E4'));
    expect(onKeyPress).toHaveBeenCalledWith('E4');
    fireEvent.press(getByLabelText('Key C#4'));
    expect(onKeyPress).toHaveBeenCalledWith('C#4');
  });

  it('V3 renders slim keys and fires a press', () => {
    const onKeyPress = jest.fn();
    const { getByLabelText } = renderThemed(<PianoKeysV3 startOctave={3} onKeyPress={onKeyPress} />, SEED_DARK);
    fireEvent.press(getByLabelText('Key G3'));
    expect(onKeyPress).toHaveBeenCalledWith('G3');
  });
});

describe('SetlistRow alternates (native)', () => {
  it('V2 renders an artwork card with duration and fires play', () => {
    const onPlay = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SetlistRowV2 song={SONG} index={1} onPlay={onPlay} />,
      SEED_LIGHT
    );
    expect(getByText('Midnight Run')).toBeTruthy();
    expect(getByText('3:34')).toBeTruthy();
    fireEvent.press(getByLabelText('Play Midnight Run'));
    expect(onPlay).toHaveBeenCalledWith(SONG);
  });

  it('V3 renders a dense line, marks playing and fires press', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <SetlistRowV3 song={SONG} index={2} playing onPress={onPress} />,
      SEED_DARK
    );
    expect(getByLabelText(/Midnight Run/)).toBeTruthy();
    fireEvent.press(getByLabelText(/Midnight Run/));
    expect(onPress).toHaveBeenCalledWith(SONG);
  });

  it('both render an empty slot when no song is supplied', () => {
    expect(renderThemed(<SetlistRowV2 index={3} />, SEED_LIGHT).getByText('Empty slot')).toBeTruthy();
    expect(renderThemed(<SetlistRowV3 index={3} />, SEED_DARK).getByText('Empty slot')).toBeTruthy();
  });
});

describe('token purity — music alternates (both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <TrackPadV2 pads={PADS} label="Kit" activePadIds={['p1']} onPadPress={() => {}} />
          <TrackPadV3 pads={PADS} activePadIds={['p2']} onPadPress={() => {}} />
          <MixerV2 channels={CHANNELS} title="Console" onVolumeChange={() => {}} onToggleMute={() => {}} onToggleSolo={() => {}} />
          <MixerV2 channels={[]} />
          <MixerV3 channels={CHANNELS} title="Board" onVolumeChange={() => {}} onToggleMute={() => {}} />
          <PianoKeysV2 startOctave={4} highlightedNotes={['C4', 'E4']} onKeyPress={() => {}} />
          <PianoKeysV3 startOctave={3} highlightedNotes={['F#3']} onKeyPress={() => {}} />
          <SetlistRowV2 song={SONG} index={1} playing onPlay={() => {}} onPress={() => {}} />
          <SetlistRowV2 index={2} />
          <SetlistRowV3 song={SONG} index={3} onPress={() => {}} onPlay={() => {}} />
          <SetlistRowV3 index={4} />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});

const CHORD: Chord = { root: 'C', quality: 'min7' };

describe('music V4 "session" line (native)', () => {
  it('mounts all 12 V4 under the light seed and renders content', () => {
    const { getByText, getByLabelText } = renderThemed(
      <>
        <BPMControlV4 value={128} variant="tap" playing onChange={() => {}} onTap={() => {}} />
        <ChordChipV4 chord={CHORD} variant="solid" size="lg" selected onPress={() => {}} />
        <LoopControlV4 enabled start={2} end={5} totalBars={8} onToggle={() => {}} onRegionChange={() => {}} />
        <MetronomeBarV4 beatsPerBar={4} currentBeat={2} playing bpm={128} variant="bars" onToggle={() => {}} />
        <MixerV4 channels={CHANNELS} title="Console" variant="full" onVolumeChange={() => {}} onToggleMute={() => {}} onToggleSolo={() => {}} />
        <PianoKeysV4 startOctave={4} highlightedNotes={['C4', 'E4']} variant="full" onKeyPress={() => {}} />
        <RecordButtonV4 recording variant="labeled" elapsedSeconds={12} onToggle={() => {}} />
        <SamplePadV4 name="Kick" detail="Vinyl" glyph="🥁" variant="row" playing onPress={() => {}} />
        <SetlistRowV4 song={SONG} index={1} playing variant="full" onPress={() => {}} onPlay={() => {}} />
        <TrackPadV4 pads={PADS} label="Kit" activePadIds={['p1']} onPadPress={() => {}} />
        <VolumeFaderV4 value={70} label="Master" unit="dB" variant="labeled" onValueChange={() => {}} />
        <WaveformEditorV4 peaks={[0.2, 0.6, 0.9, 0.4]} progress={0.5} variant="full" onSeek={() => {}} />
      </>,
      SEED_LIGHT
    );
    expect(getByText('Console')).toBeTruthy();
    expect(getByText('Cm7')).toBeTruthy();
    expect(getByLabelText('Chord Cm7')).toBeTruthy();
    // TrackPadV4's `label` renders as a header Text node.
    expect(getByText('Kit')).toBeTruthy();
  });

  it('SamplePadV4 fires onPress with the sample name', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <SamplePadV4 name="Snare" glyph="🥁" variant="tile" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Snare'));
    expect(onPress).toHaveBeenCalledWith('Snare');
  });

  it('SetlistRowV4 fires onPress (row) and onPlay (play button)', () => {
    const onPress = jest.fn();
    const onPlay = jest.fn();
    const { getByLabelText } = renderThemed(
      <SetlistRowV4 song={SONG} index={1} onPress={onPress} onPlay={onPlay} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText(/Position 1, Midnight Run/));
    expect(onPress).toHaveBeenCalledWith(SONG);
    fireEvent.press(getByLabelText('Play Midnight Run'));
    expect(onPlay).toHaveBeenCalledWith(SONG);
  });

  it('BPMControlV4 stepper fires onChange and TrackPadV4 fires a pad hit', () => {
    const onChange = jest.fn();
    const onPadPress = jest.fn();
    const bpm = renderThemed(
      <BPMControlV4 value={120} variant="stepper" onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(bpm.getByLabelText('Increase tempo'));
    expect(onChange).toHaveBeenCalledWith(121);

    const track = renderThemed(<TrackPadV4 pads={PADS} onPadPress={onPadPress} />, SEED_DARK);
    fireEvent.press(track.getByLabelText('Kick'));
    expect(onPadPress).toHaveBeenCalledWith(PADS[0], 0);
  });
});

describe('token purity — music V4 "session" line (both seeds)', () => {
  // The WaveformEditorV4 `full` hero is the ONE reserved gradient moment; it MUST
  // be in the aggregate for BOTH seeds. TrackPadV4 (active pads), SamplePadV4 and
  // ChordChipV4 contribute the accent-slot colors to validate too.
  it.each([SEED_LIGHT, SEED_DARK])('every rendered style hex traces to a compiled token', (seed) => {
    const { root } = renderThemed(
      <>
        <WaveformEditorV4 peaks={[0.2, 0.6, 0.9, 0.4, 0.7]} progress={0.5} selection={[0.2, 0.6]} variant="full" onSeek={() => {}} />
        <WaveformEditorV4 peaks={[0.3, 0.5]} variant="mini" />
        <TrackPadV4 pads={PADS} label="Kit" activePadIds={['p1', 'p2']} onPadPress={() => {}} />
        <SamplePadV4 name="Kick" glyph="🥁" variant="row" playing onPress={() => {}} />
        <SamplePadV4 name="Snare" glyph="🥁" variant="tile" index={2} onPress={() => {}} />
        <ChordChipV4 chord={CHORD} variant="solid" color="accent" selected onPress={() => {}} />
        <ChordChipV4 chord={{ root: 'G' }} variant="soft" color="success" />
        <ChordChipV4 chord={{ root: 'A', quality: 'min' }} variant="outline" color="warn" />
        <BPMControlV4 value={128} variant="tap" playing onChange={() => {}} onTap={() => {}} />
        <LoopControlV4 enabled start={2} end={5} totalBars={8} onToggle={() => {}} onRegionChange={() => {}} />
        <MetronomeBarV4 beatsPerBar={4} currentBeat={1} playing bpm={128} variant="bars" onToggle={() => {}} />
        <MixerV4 channels={CHANNELS} title="Console" variant="full" onVolumeChange={() => {}} onToggleMute={() => {}} onToggleSolo={() => {}} />
        <PianoKeysV4 startOctave={4} highlightedNotes={['C4', 'F#4']} variant="full" onKeyPress={() => {}} />
        <RecordButtonV4 recording variant="labeled" elapsedSeconds={12} onToggle={() => {}} />
        <SetlistRowV4 song={SONG} index={1} playing onPress={() => {}} onPlay={() => {}} />
        <VolumeFaderV4 value={70} label="Master" unit="dB" onValueChange={() => {}} />
      </>,
      seed
    );
    const allowed = tokenHexSet(seed);
    const found = renderedStyleHexes(root);
    expect(found.length).toBeGreaterThan(0);
    found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
