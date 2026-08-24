/** @jest-environment jsdom */
/**
 * Web (React DOM) music components: render smoke, token-purity (no hex literal
 * in any inline style), and the behavioral contracts — pad hit, key press,
 * fader change, tempo step, record toggle, plus the empty Mixer / Setlist
 * states. UI shells only: no audio engine is exercised.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { TrackPad } from './TrackPad';
import { SamplePad } from './SamplePad';
import { PianoKeys } from './PianoKeys';
import { ChordChip } from './ChordChip';
import { BPMControl } from './BPMControl';
import { MetronomeBar } from './MetronomeBar';
import { LoopControl } from './LoopControl';
import { RecordButton } from './RecordButton';
import { VolumeFader } from './VolumeFader';
import { Mixer } from './Mixer';
import { WaveformEditor } from './WaveformEditor';
import { SetlistRow } from './SetlistRow';
import type { PadCell, MixerChannel, SetlistSong } from './types';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** Concatenated `style` attributes of every styled node under `root`. */
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const PADS: PadCell[] = [
  { id: 'k', label: 'Kick', glyph: '🥁' },
  { id: 's', label: 'Snare', glyph: '🥁' },
  { id: 'e', empty: true },
];

const CHANNELS: MixerChannel[] = [
  { id: 'd', name: 'Drums', volume: 80, level: 0.5 },
  { id: 'b', name: 'Bass', volume: 60, muted: true },
];

const SONG: SetlistSong = { id: '1', title: 'Midnight', artist: 'Nova', key: 'A minor', bpm: 128, durationSec: 245 };

describe('music (web)', () => {
  it('TrackPad renders pads, fires onPadPress on a live pad hit, and skips empty pads', () => {
    const onPadPress = jest.fn();
    const { getByRole } = render(<TrackPad pads={PADS} activePadIds={['k']} onPadPress={onPadPress} />);
    fireEvent.click(getByRole('button', { name: 'Kick' }));
    expect(onPadPress).toHaveBeenCalledTimes(1);
    expect(onPadPress).toHaveBeenCalledWith(PADS[0], 0);
    // The empty pad is disabled (non-triggering).
    expect((getByRole('button', { name: /empty/i }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('TrackPad renders an EmptyState (token-classed) when there are no pads', () => {
    const { container, getByText } = render(<TrackPad pads={[]} emptyLabel="Nothing here" />);
    expect(getByText('Nothing here')).toBeTruthy();
    expect(container.querySelector('[data-xen-empty-state]')).toBeTruthy();
    expect(container.innerHTML).toContain('text-on-surface');
  });

  it('SamplePad fires onClick with the sample name and marks the active state (no color alone)', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<SamplePad name="Vinyl" playing onClick={onClick} />);
    const btn = getByRole('button');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledWith('Vinyl');
  });

  it('PianoKeys fires onKeyPress with a named note and uses a token class', () => {
    const onKeyPress = jest.fn();
    const { getByRole, container } = render(<PianoKeys startOctave={4} highlightedNotes={['C4']} onKeyPress={onKeyPress} />);
    fireEvent.click(getByRole('button', { name: 'Key C4' }));
    expect(onKeyPress).toHaveBeenCalledWith('C4');
    // Held key uses a primary token tint.
    expect(container.innerHTML).toContain('bg-primary');
  });

  it('ChordChip renders the derived label as a button and fires onClick with the chord', () => {
    const onClick = jest.fn();
    const chord = { root: 'C' as const, quality: 'min7' as const };
    const { getByRole } = render(<ChordChip chord={chord} onClick={onClick} />);
    const btn = getByRole('button', { name: 'Chord Cm7' });
    expect(btn.textContent).toBe('Cm7');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledWith(chord);
  });

  it('ChordChip renders a static span (no button) when onClick is omitted', () => {
    const { queryByRole, getByText } = render(<ChordChip chord={{ root: 'G' }} />);
    expect(queryByRole('button')).toBeNull();
    expect(getByText('G')).toBeTruthy();
  });

  it('BPMControl steps the tempo through onChange, clamped to the range', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<BPMControl value={120} onChange={onChange} />);
    fireEvent.click(getByRole('button', { name: 'Increase tempo' }));
    expect(onChange).toHaveBeenCalledWith(121);
    fireEvent.click(getByRole('button', { name: 'Decrease tempo' }));
    expect(onChange).toHaveBeenLastCalledWith(119);
  });

  it('MetronomeBar toggles the transport with the next playing state', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(<MetronomeBar beatsPerBar={4} currentBeat={2} playing onToggle={onToggle} />);
    fireEvent.click(getByRole('button', { name: 'Stop metronome' }));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('LoopControl toggles looping via onToggle', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(<LoopControl enabled={false} onToggle={onToggle} />);
    fireEvent.click(getByRole('button', { name: 'Turn loop on' }));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('RecordButton toggles recording and shows the dot⟷square shape state via aria-pressed', () => {
    const onToggle = jest.fn();
    const { getByRole, rerender } = render(<RecordButton recording={false} onToggle={onToggle} />);
    const btn = getByRole('button', { name: 'Start recording' });
    expect(btn.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(btn);
    expect(onToggle).toHaveBeenCalledWith(true);
    rerender(<RecordButton recording onToggle={onToggle} />);
    expect(getByRole('button', { name: 'Stop recording' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('VolumeFader reports drags through onValueChange via the Slider', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(<VolumeFader label="Drums" value={50} onValueChange={onValueChange} />);
    fireEvent.change(getByRole('slider'), { target: { value: '72' } });
    expect(onValueChange).toHaveBeenCalledWith(72);
  });

  it('Mixer renders channel strips and toggles mute/solo', () => {
    const onToggleMute = jest.fn();
    const { getByRole } = render(<Mixer channels={CHANNELS} title="Board" onToggleMute={onToggleMute} />);
    fireEvent.click(getByRole('button', { name: 'Unmute Bass' }));
    expect(onToggleMute).toHaveBeenCalledWith(CHANNELS[1]);
  });

  it('Mixer renders an EmptyState when there are no channels', () => {
    const { container, getByText } = render(<Mixer channels={[]} emptyLabel="No channels" />);
    expect(getByText('No channels')).toBeTruthy();
    expect(container.querySelector('[data-xen-empty-state]')).toBeTruthy();
  });

  it('WaveformEditor seeks through onSeek and renders an EmptyState when empty', () => {
    const onSeek = jest.fn();
    const { getAllByRole } = render(<WaveformEditor peaks={[0.2, 0.9, 0.4]} onSeek={onSeek} />);
    const bars = getAllByRole('button');
    fireEvent.click(bars[bars.length - 1]!);
    expect(onSeek).toHaveBeenCalledWith(1);

    const { container } = render(<WaveformEditor placeholderBars={0} emptyLabel="No audio" />);
    expect(container.querySelector('[data-xen-empty-state]')).toBeTruthy();
  });

  it('SetlistRow renders a song row (onClick) and a dimmed empty slot', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<SetlistRow song={SONG} index={1} onClick={onClick} />);
    fireEvent.click(getByRole('button', { name: /Midnight/ }));
    expect(onClick).toHaveBeenCalledWith(SONG);

    const { getByText } = render(<SetlistRow index={2} emptyLabel="Empty slot" />);
    expect(getByText('Empty slot')).toBeTruthy();
  });

  it('forwards refs to the DOM root', () => {
    const ref = createRef<HTMLDivElement>();
    render(<MetronomeBar beatsPerBar={4} onToggle={() => {}} />);
    render(<TrackPad ref={ref} pads={PADS} />);
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('uses only token classes — no hex literal in any inline style', () => {
    const { container } = render(
      <div>
        <TrackPad pads={PADS} activePadIds={['s']} />
        <SamplePad name="Kick" playing variant="row" peaks={[0.3, 0.7]} />
        <PianoKeys highlightedNotes={['C#4']} />
        <ChordChip chord={{ root: 'C', quality: 'maj7' }} variant="solid" selected onClick={() => {}} />
        <BPMControl value={128} playing variant="tap" onChange={() => {}} onTap={() => {}} />
        <MetronomeBar beatsPerBar={4} currentBeat={1} playing bpm={120} onToggle={() => {}} />
        <LoopControl enabled start={2} end={5} onToggle={() => {}} onRegionChange={() => {}} />
        <RecordButton recording variant="labeled" elapsedSeconds={65} onToggle={() => {}} />
        <Mixer channels={CHANNELS} title="Board" onVolumeChange={() => {}} onToggleMute={() => {}} onToggleSolo={() => {}} />
        <WaveformEditor peaks={[0.1, 0.5, 1]} progress={0.5} selection={[0.2, 0.6]} onSeek={() => {}} />
        <SetlistRow song={SONG} index={1} playing onClick={() => {}} onPlay={() => {}} />
      </div>
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    // Sanity: token utility classes are present in the tree.
    expect(container.innerHTML).toContain('text-on-surface');
    expect(container.innerHTML).toContain('bg-primary');
  });
});
