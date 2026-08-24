/** @jest-environment jsdom */
/**
 * Alternate streaming designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of EpisodeRow, MiniPlayer, NowPlaying, PodcastCard. Each variant
 * keeps the base props; these specs prove they (a) mount, (b) stay token-pure (no
 * literal hex in inline styles beyond geometric widths), and (c) honor a key
 * interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { EpisodeRowV2 } from './EpisodeRowV2';
import { EpisodeRowV3 } from './EpisodeRowV3';
import { MiniPlayerV2 } from './MiniPlayerV2';
import { MiniPlayerV3 } from './MiniPlayerV3';
import { NowPlayingV2 } from './NowPlayingV2';
import { NowPlayingV3 } from './NowPlayingV3';
import { PodcastCardV2 } from './PodcastCardV2';
import { PodcastCardV3 } from './PodcastCardV3';

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
const COLOR_HEX = /(?:color|background|border|fill|stroke)[^;]*#[0-9a-fA-F]{3,8}/;

const EPISODE = { id: 'e1', title: 'Deep Dive', show: 'Tech Talk', date: 'Aug 24', duration: '42 min', progress: 0.3 };
const TRACK = { id: 't1', title: 'Nightfall', artist: 'Aria', album: 'Dusk', duration: 200 };
const PODCAST = { id: 'p1', title: 'The Show', publisher: 'Acme', episodeCount: 120, description: 'A great show' };

describe('EpisodeRow alternates (web)', () => {
  it('V2 toggles play', () => {
    const onPlayToggle = jest.fn();
    const { getByLabelText, container } = render(<EpisodeRowV2 episode={EPISODE} onPlayToggle={onPlayToggle} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Play'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });
  it('V3 opens details', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<EpisodeRowV3 episode={EPISODE} onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Deep Dive'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('MiniPlayer alternates (web)', () => {
  it('V2 toggles play', () => {
    const onPlayToggle = jest.fn();
    const { getByLabelText, container } = render(<MiniPlayerV2 track={TRACK} state="playing" progress={0.5} onPlayToggle={onPlayToggle} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Pause'));
    expect(onPlayToggle).toHaveBeenCalledWith(false);
  });
  it('V3 renders a slim strip', () => {
    const { getByLabelText, container } = render(<MiniPlayerV3 track={TRACK} progress={0.2} onPlayToggle={jest.fn()} />);
    expect(getByLabelText('Play')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('NowPlaying alternates (web)', () => {
  it('V2 toggles play', () => {
    const onPlayToggle = jest.fn();
    const { getByLabelText, container } = render(<NowPlayingV2 track={TRACK} position={30} duration={200} onPlayToggle={onPlayToggle} onPrev={jest.fn()} onNext={jest.fn()} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Play'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });
  it('V3 renders a compact bar', () => {
    const { getByText, container } = render(<NowPlayingV3 track={TRACK} position={10} duration={200} onPlayToggle={jest.fn()} />);
    expect(getByText('Nightfall')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('PodcastCard alternates (web)', () => {
  it('V2 toggles subscribe', () => {
    const onSubscribeToggle = jest.fn();
    const { getByText, container } = render(<PodcastCardV2 podcast={PODCAST} onSubscribeToggle={onSubscribeToggle} />);
    expect(getByText('The Show')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Subscribe'));
    expect(onSubscribeToggle).toHaveBeenCalledWith(true);
  });
  it('V3 opens the show', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<PodcastCardV3 podcast={PODCAST} onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('The Show'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
