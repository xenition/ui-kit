/** @jest-environment jsdom */
/**
 * Alternate music designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of Mixer, PianoKeys, SetlistRow, TrackPad. Each variant keeps the base props,
 * so these specs prove they (a) mount, (b) stay token-pure (no literal hex in any
 * inline style beyond geometric left/width positioning), and (c) honor a key
 * interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { MixerV2 } from './MixerV2';
import { MixerV3 } from './MixerV3';
import { PianoKeysV2 } from './PianoKeysV2';
import { PianoKeysV3 } from './PianoKeysV3';
import { SetlistRowV2 } from './SetlistRowV2';
import { SetlistRowV3 } from './SetlistRowV3';
import { TrackPadV2 } from './TrackPadV2';
import { TrackPadV3 } from './TrackPadV3';
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

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const CHANNELS = [
  { id: 'd', name: 'Drums', volume: 80 },
  { id: 'b', name: 'Bass', volume: 60, muted: true },
];
const SONG = { id: 's1', title: 'Nightfall', artist: 'Aria', key: 'A min', bpm: 120, durationSec: 200 };
const PADS = [
  { id: 'p1', label: 'Kick', glyph: '🥁' },
  { id: 'p2', label: 'Snare', glyph: '🥁' },
];

describe('Mixer alternates (web)', () => {
  it('V2 toggles mute', () => {
    const onToggleMute = jest.fn();
    const { getByLabelText, container } = render(<MixerV2 channels={CHANNELS} onToggleMute={onToggleMute} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Mute Drums'));
    expect(onToggleMute).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact list', () => {
    const { getByText, container } = render(<MixerV3 channels={CHANNELS} title="Mix" />);
    expect(getByText('Drums')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('PianoKeys alternates (web)', () => {
  it('V2 fires onKeyPress', () => {
    const onKeyPress = jest.fn();
    const { getByLabelText, container } = render(<PianoKeysV2 onKeyPress={onKeyPress} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Key C4'));
    expect(onKeyPress).toHaveBeenCalledWith('C4');
  });
  it('V3 fires onKeyPress', () => {
    const onKeyPress = jest.fn();
    const { getByLabelText, container } = render(<PianoKeysV3 onKeyPress={onKeyPress} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Key E4'));
    expect(onKeyPress).toHaveBeenCalledWith('E4');
  });
});

describe('SetlistRow alternates (web)', () => {
  it('V2 fires onPlay', () => {
    const onPlay = jest.fn();
    const { getByLabelText, container } = render(<SetlistRowV2 song={SONG} index={1} onPlay={onPlay} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Play Nightfall'));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense line', () => {
    const { getByText, container } = render(<SetlistRowV3 song={SONG} index={2} playing />);
    expect(getByText(/Nightfall/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('TrackPad alternates (web)', () => {
  it('V2 fires onPadPress', () => {
    const onPadPress = jest.fn();
    const { getByLabelText, container } = render(<TrackPadV2 pads={PADS} onPadPress={onPadPress} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Kick'));
    expect(onPadPress).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact strip', () => {
    const { getAllByText, container } = render(<TrackPadV3 pads={PADS} activePadIds={['p1']} />);
    expect(getAllByText('Kick').length).toBeGreaterThan(0);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('music V4 "session" line (web)', () => {
  it('mounts all 12 V4 components token-pure and renders their content', () => {
    const { getByText, getByLabelText, container } = render(
      <div>
        <BPMControlV4 value={128} variant="tap" playing onChange={() => {}} onTap={() => {}} />
        <ChordChipV4 chord={{ root: 'C', quality: 'min7' }} variant="solid" size="lg" selected />
        <LoopControlV4 enabled start={2} end={5} totalBars={8} onToggle={() => {}} onRegionChange={() => {}} />
        <MetronomeBarV4 beatsPerBar={4} currentBeat={2} playing bpm={128} variant="bars" onToggle={() => {}} />
        <MixerV4 channels={CHANNELS} title="Console" variant="full" onVolumeChange={() => {}} onToggleMute={() => {}} onToggleSolo={() => {}} />
        <PianoKeysV4 startOctave={4} highlightedNotes={['C4', 'E4']} variant="full" onKeyPress={() => {}} />
        <RecordButtonV4 recording variant="labeled" elapsedSeconds={12} onToggle={() => {}} />
        <SamplePadV4 name="Kick" detail="Vinyl" glyph="🥁" variant="row" playing onClick={() => {}} />
        <SetlistRowV4 song={SONG} index={1} playing variant="full" onClick={() => {}} onPlay={() => {}} />
        <TrackPadV4 pads={PADS} label="Kit" activePadIds={['p1']} onPadPress={() => {}} />
        <VolumeFaderV4 value={70} label="Master" unit="dB" variant="labeled" onChange={() => {}} />
        <WaveformEditorV4 peaks={[0.2, 0.6, 0.9, 0.4]} progress={0.5} variant="full" onSeek={() => {}} />
      </div>
    );

    // A few content assertions across the line.
    expect(getByText('Cm7')).toBeTruthy();
    expect(getByText('Console')).toBeTruthy();
    expect(getByLabelText('Increase tempo')).toBeTruthy();
    // The row is `playing`, so its play control reads "Pause".
    expect(getByLabelText('Pause Nightfall')).toBeTruthy();
    expect(getByLabelText('Stop recording')).toBeTruthy();

    // Token purity: no literal color hex in any inline style (only geometric
    // left/width/height positioning is allowed inline).
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('SamplePadV4 fires onClick with the sample name', () => {
    const onClick = jest.fn();
    const { getByLabelText, container } = render(
      <SamplePadV4 name="Snare" glyph="🥁" variant="tile" onClick={onClick} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Snare'));
    expect(onClick).toHaveBeenCalledWith('Snare');
  });

  it('SetlistRowV4 fires onClick (row) and onPlay (play button)', () => {
    const onClick = jest.fn();
    const onPlay = jest.fn();
    const { getByLabelText, container } = render(
      <SetlistRowV4 song={SONG} index={1} onClick={onClick} onPlay={onPlay} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText(/Position 1, Nightfall/));
    expect(onClick).toHaveBeenCalledTimes(1);
    fireEvent.click(getByLabelText('Play Nightfall'));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });

  it('BPMControlV4 stepper fires onChange and TrackPadV4 fires onPadPress', () => {
    const onChange = jest.fn();
    const onPadPress = jest.fn();
    const { getByLabelText, container } = render(
      <div>
        <BPMControlV4 value={120} variant="stepper" onChange={onChange} />
        <TrackPadV4 pads={PADS} onPadPress={onPadPress} />
      </div>
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Increase tempo'));
    expect(onChange).toHaveBeenCalledWith(121);
    fireEvent.click(getByLabelText('Kick'));
    expect(onPadPress).toHaveBeenCalledTimes(1);
  });
});
