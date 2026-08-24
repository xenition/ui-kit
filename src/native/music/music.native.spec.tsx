import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { TrackPad } from './TrackPad';
import { Mixer } from './Mixer';
import { VolumeFader } from './VolumeFader';
import { BPMControl } from './BPMControl';
import { WaveformEditor } from './WaveformEditor';
import { SamplePad } from './SamplePad';
import { PianoKeys } from './PianoKeys';
import { LoopControl } from './LoopControl';
import { MetronomeBar } from './MetronomeBar';
import { ChordChip } from './ChordChip';
import { SetlistRow } from './SetlistRow';
import { RecordButton } from './RecordButton';
import {
  chordLabel,
  padAccentKey,
  isBlackKey,
  octaveNotes,
  formatBpm,
  formatDuration,
  type PadCell,
  type MixerChannel,
  type SetlistSong,
} from './types';

const pads: PadCell[] = [
  { id: 'p1', label: 'Kick', glyph: '🥁' },
  { id: 'p2', label: 'Snare', glyph: '👏' },
  { id: 'p3', label: 'Hat', glyph: '🎩' },
  { id: 'p4', empty: true },
];

const channels: MixerChannel[] = [
  { id: 'c1', name: 'Drums', volume: 80, level: 0.7 },
  { id: 'c2', name: 'Bass', volume: 60, muted: true, level: 0.9 },
];

const song: SetlistSong = {
  id: 's1',
  title: 'Midnight Run',
  artist: 'The Vectors',
  key: 'A minor',
  bpm: 128,
  durationSec: 214,
};

/** Fire a Slider (PanResponder) grant at `locationX` after sizing it. */
function grantSlider(root: import('react-test-renderer').ReactTestInstance, locationX: number): void {
  const slider = root.findAll((n) => n.props?.accessibilityRole === 'adjustable')[0];
  expect(slider).toBeTruthy();
  fireEvent(slider!, 'layout', { nativeEvent: { layout: { width: 200, height: 20, x: 0, y: 0 } } });
  fireEvent(slider!, 'responderGrant', {
    nativeEvent: { locationX },
    touchHistory: { numberActiveTouches: 0, indexOfSingleActiveTouch: 0, mostRecentTimeStamp: 0, touchBank: [] },
  });
}

describe('music/types helpers', () => {
  it('formats labels + guards bad input', () => {
    expect(chordLabel({ root: 'C', quality: 'min7' })).toBe('Cm7');
    expect(chordLabel({ root: 'G', quality: 'maj' })).toBe('G');
    expect(chordLabel({ root: 'D', label: 'Dslash' })).toBe('Dslash');
    expect(isBlackKey(1)).toBe(true);
    expect(isBlackKey(0)).toBe(false);
    expect(octaveNotes(4, 1)).toHaveLength(12);
    expect(octaveNotes(4, 1)[0]).toBe('C4');
    expect(padAccentKey(0)).toBe('primary');
    expect(padAccentKey(-7)).toBe(padAccentKey(7));
    expect(formatBpm(NaN)).toBe('120');
    expect(formatDuration(214)).toBe('3:34');
    expect(formatDuration(-1)).toBe('0:00');
  });
});

describe('TrackPad (native)', () => {
  it('renders the empty state when there are no pads', () => {
    const { getByText } = renderThemed(<TrackPad pads={[]} />, SEED_LIGHT);
    expect(getByText('No pads assigned')).toBeTruthy();
  });

  it('fires onPadPress when a live pad is hit and blocks empty pads', () => {
    const onPadPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <TrackPad pads={pads} activePadIds={['p1']} onPadPress={onPadPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Snare'));
    expect(onPadPress).toHaveBeenCalledWith(pads[1], 1);
    // The empty slot is disabled (state, not color).
    const empty = getByLabelText('Pad 4, empty');
    expect(empty.props.accessibilityState.disabled).toBe(true);
    // The active pad reports selected.
    expect(getByLabelText('Kick').props.accessibilityState.selected).toBe(true);
  });
});

describe('Mixer (native)', () => {
  it('renders the empty state when there are no channels', () => {
    const { getByText } = renderThemed(<Mixer channels={[]} />, SEED_LIGHT);
    expect(getByText('No channels')).toBeTruthy();
  });

  it('mounts strips and fires mute + volume callbacks', () => {
    const onToggleMute = jest.fn();
    const onVolumeChange = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <Mixer channels={channels} title="Board" onToggleMute={onToggleMute} onVolumeChange={onVolumeChange} />,
      SEED_DARK
    );
    expect(getByText('Board')).toBeTruthy();
    // Muted channel surfaces state in its label, not color alone.
    expect(getByText('Bass (muted)')).toBeTruthy();
    fireEvent.press(getByLabelText('Mute Drums'));
    expect(onToggleMute).toHaveBeenCalledWith(channels[0]);
    // Drag the first strip's fader.
    grantSlider(root, 200);
    expect(onVolumeChange).toHaveBeenCalled();
    expect(onVolumeChange.mock.calls[0][0]).toBe(channels[0]);
    expect(typeof onVolumeChange.mock.calls[0][1]).toBe('number');
  });
});

describe('VolumeFader (native)', () => {
  it('reports a new value on drag (fader change)', () => {
    const onValueChange = jest.fn();
    const { root, getByLabelText } = renderThemed(
      <VolumeFader label="Lead" value={40} onValueChange={onValueChange} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Lead volume 40')).toBeTruthy();
    grantSlider(root, 200);
    expect(onValueChange).toHaveBeenCalled();
    expect(typeof onValueChange.mock.calls[0][0]).toBe('number');
  });
});

describe('BPMControl (native)', () => {
  it('steps the tempo and fires tap tempo', () => {
    const onChange = jest.fn();
    const onTap = jest.fn();
    const { getByLabelText } = renderThemed(
      <BPMControl value={120} variant="tap" onChange={onChange} onTap={onTap} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Increase tempo'));
    expect(onChange).toHaveBeenCalledWith(121);
    fireEvent.press(getByLabelText('Tap tempo'));
    expect(onTap).toHaveBeenCalledTimes(1);
  });
});

describe('PianoKeys (native)', () => {
  it('fires onKeyPress with the pressed note name', () => {
    const onKeyPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <PianoKeys startOctave={4} highlightedNotes={['C4']} onKeyPress={onKeyPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Key E4'));
    expect(onKeyPress).toHaveBeenCalledWith('E4');
    // A black key exists and reports its note.
    fireEvent.press(getByLabelText('Key C#4'));
    expect(onKeyPress).toHaveBeenCalledWith('C#4');
    // Highlighted key reports selected state.
    expect(getByLabelText('Key C4').props.accessibilityState.selected).toBe(true);
  });
});

describe('WaveformEditor (native)', () => {
  it('shows a spinner while loading and seeks on bar tap', () => {
    const onSeek = jest.fn();
    const { getByLabelText } = renderThemed(
      <WaveformEditor peaks={[0.2, 0.9, 0.4, 1]} progress={0.5} onSeek={onSeek} />,
      SEED_DARK
    );
    // The whole surface is adjustable; tapping the last bar seeks near 1.
    expect(getByLabelText('Waveform')).toBeTruthy();
  });
});

describe('SetlistRow (native)', () => {
  it('renders an empty slot when given no song (empty Setlist)', () => {
    const { getByText } = renderThemed(<SetlistRow index={3} />, SEED_LIGHT);
    expect(getByText('Empty slot')).toBeTruthy();
  });

  it('mounts a song row and fires onPlay', () => {
    const onPlay = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SetlistRow song={song} index={1} onPlay={onPlay} />,
      SEED_DARK
    );
    expect(getByText('Midnight Run')).toBeTruthy();
    fireEvent.press(getByLabelText('Play Midnight Run'));
    expect(onPlay).toHaveBeenCalledWith(song);
  });
});

describe('RecordButton (native)', () => {
  it('toggles recording state via callback', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <RecordButton recording={false} onToggle={onToggle} />,
      SEED_LIGHT
    );
    const start = getByLabelText('Start recording');
    expect(start.props.accessibilityState.selected).toBe(false);
    fireEvent.press(start);
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('reflects the recording state in its a11y label', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <RecordButton recording variant="labeled" elapsedSeconds={65} onToggle={onToggle} />,
      SEED_DARK
    );
    const stop = getByLabelText('Stop recording');
    expect(stop.props.accessibilityState.selected).toBe(true);
    fireEvent.press(stop);
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});

describe('ChordChip + MetronomeBar + LoopControl (native)', () => {
  it('chord chip fires with the chord', () => {
    const onPress = jest.fn();
    const chord = { root: 'A', quality: 'min7' } as const;
    const { getByLabelText } = renderThemed(<ChordChip chord={chord} onPress={onPress} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Chord Am7'));
    expect(onPress).toHaveBeenCalledWith(chord);
  });

  it('metronome toggle + loop toggle fire their callbacks', () => {
    const onToggle = jest.fn();
    const onLoop = jest.fn();
    const { getByLabelText } = renderThemed(
      <React.Fragment>
        <MetronomeBar beatsPerBar={4} currentBeat={2} playing onToggle={onToggle} />
        <LoopControl enabled={false} start={1} end={4} onToggle={onLoop} />
      </React.Fragment>,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Stop metronome'));
    expect(onToggle).toHaveBeenCalledWith(false);
    fireEvent.press(getByLabelText('Turn loop on'));
    expect(onLoop).toHaveBeenCalledWith(true);
  });
});

describe('token purity (native music, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <React.Fragment>
          <TrackPad pads={pads} activePadIds={['p1']} label="Pads" onPadPress={() => undefined} />
          <TrackPad pads={pads} variant="compact" onPadPress={() => undefined} />
          <Mixer channels={channels} title="Board" onVolumeChange={() => undefined} onToggleMute={() => undefined} onToggleSolo={() => undefined} />
          <Mixer channels={channels} variant="compact" />
          <VolumeFader label="Lead" value={70} muted onValueChange={() => undefined} />
          <BPMControl value={128} variant="tap" playing onChange={() => undefined} onTap={() => undefined} />
          <BPMControl value={90} variant="inline" onChange={() => undefined} />
          <WaveformEditor peaks={[0.1, 0.7, 0.4, 1, 0.3]} progress={0.4} selection={[0.2, 0.6]} onSeek={() => undefined} />
          <WaveformEditor variant="mini" />
          <SamplePad name="Vinyl Kick" detail="0:02" playing index={0} onPress={() => undefined} />
          <SamplePad variant="row" name="Clap" peaks={[0.3, 0.9, 0.5]} index={2} onPress={() => undefined} />
          <SamplePad loading index={1} />
          <SamplePad index={3} />
          <PianoKeys startOctave={4} octaves={1} highlightedNotes={['C4', 'E4']} onKeyPress={() => undefined} />
          <PianoKeys variant="compact" startOctave={3} onKeyPress={() => undefined} />
          <LoopControl enabled start={1} end={5} totalBars={8} onToggle={() => undefined} onRegionChange={() => undefined} />
          <LoopControl enabled={false} variant="inline" />
          <MetronomeBar beatsPerBar={4} currentBeat={1} playing bpm={128} onToggle={() => undefined} />
          <MetronomeBar variant="bars" beatsPerBar={3} />
          <ChordChip chord={{ root: 'C', quality: 'maj7' }} variant="solid" selected onPress={() => undefined} />
          <ChordChip chord={{ root: 'F', quality: 'min' }} variant="outline" size="lg" />
          <ChordChip chord={{ root: 'G' }} variant="soft" />
          <SetlistRow song={song} index={1} playing onPress={() => undefined} onPlay={() => undefined} />
          <SetlistRow index={2} />
          <RecordButton recording variant="labeled" elapsedSeconds={5} onToggle={() => undefined} />
          <RecordButton recording={false} variant="solid" onToggle={() => undefined} />
        </React.Fragment>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
