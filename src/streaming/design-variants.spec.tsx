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
import {
  NowPlayingV4,
  MiniPlayerV4,
  EpisodeRowV4,
  PodcastCardV4,
  AudioPlayerV4,
  VideoPlayerV4,
  WaveformScrubberV4,
  QueueListV4,
  PlaylistRowV4,
  ChannelCardV4,
  LiveBadgeV4,
  CastButtonV4,
  FullScreenPlayer,
  AlbumHeader,
  LyricsView,
  UpNext,
  CategoryRail,
  SleepTimer,
} from './index';
import type { MediaTrack, StreamEpisode, StreamPodcast, StreamChannel } from './types';
import type { LyricLine } from './LyricsView';
import type { CategoryRailItem } from './CategoryRail';

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

// ─────────────────────────────────────────────────────────────────────────
// V4 "spotlight" line — the drop-in redesign for the original 12 components.
// Each V4 variant keeps its base props (`<Name>V4Props = <Name>Props`), so we
// feed the same shapes and re-assert (a) mount, (b) token purity, (c) a key
// interaction.
// ─────────────────────────────────────────────────────────────────────────
const V4_TRACK: MediaTrack = { id: 't1', title: 'Nightfall', artist: 'Aria', album: 'Dusk', duration: 200, artworkUrl: 'https://x/1.jpg' };
const V4_EPISODE: StreamEpisode = { id: 'e1', title: 'Deep Dive', show: 'Tech Talk', date: 'Aug 24', duration: '42 min', progress: 0.3, artworkUrl: 'https://x/ep.jpg' };
const V4_PODCAST: StreamPodcast = { id: 'p1', title: 'The Show', publisher: 'Acme', episodeCount: 120, description: 'A great show', artworkUrl: 'https://x/pod.jpg' };
const V4_CHANNEL: StreamChannel = { id: 'c1', name: 'Nova Live', category: 'Music', live: true, viewers: 1234, avatarUrl: 'https://x/av.jpg' };
const V4_QUEUE: MediaTrack[] = [V4_TRACK, { id: 't2', title: 'Sunrise', artist: 'Aria', duration: 180 }];

describe('streaming V4 "spotlight" line (web)', () => {
  it('mounts all 12 V4 variants token-pure', () => {
    const { container } = render(
      <>
        <NowPlayingV4 track={V4_TRACK} state="playing" position={60} duration={200} onPlayToggle={jest.fn()} onSeek={jest.fn()} onPrev={jest.fn()} onNext={jest.fn()} onCast={jest.fn()} />
        <MiniPlayerV4 track={V4_TRACK} state="paused" progress={0.5} onPlayToggle={jest.fn()} onNext={jest.fn()} />
        <EpisodeRowV4 episode={V4_EPISODE} playing state="playing" onPlayToggle={jest.fn()} onDownload={jest.fn()} />
        <PodcastCardV4 podcast={V4_PODCAST} variant="featured" subscribed onSubscribeToggle={jest.fn()} />
        <AudioPlayerV4 track={V4_TRACK} state="playing" position={30} duration={200} onPlayToggle={jest.fn()} onSeek={jest.fn()} />
        <VideoPlayerV4 title="Clip" posterUrl="https://x/p.jpg" state="paused" position={10} duration={120} live viewers={2000} onPlayToggle={jest.fn()} onFullscreen={jest.fn()} />
        <WaveformScrubberV4 peaks={[0.2, 0.8, 0.5, 1, 0.3]} progress={0.4} onSeek={jest.fn()} />
        <QueueListV4 tracks={V4_QUEUE} nowPlayingId="t1" state="playing" onSelect={jest.fn()} onRemove={jest.fn()} />
        <PlaylistRowV4 track={V4_TRACK} index={0} active state="playing" onClick={jest.fn()} onPlayToggle={jest.fn()} onMore={jest.fn()} />
        <ChannelCardV4 channel={V4_CHANNEL} variant="featured" following onFollowToggle={jest.fn()} onClick={jest.fn()} />
        <LiveBadgeV4 label="LIVE" viewers={1234} />
        <CastButtonV4 variant="labeled" connected deviceName="Living Room" />
      </>
    );
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });

  it('NowPlayingV4 toggles play', () => {
    const onPlayToggle = jest.fn();
    const { getByLabelText, container } = render(
      <NowPlayingV4 track={V4_TRACK} state="paused" position={0} duration={200} onPlayToggle={onPlayToggle} />
    );
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Play'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });

  it('PlaylistRowV4 selects a row', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <PlaylistRowV4 track={V4_TRACK} index={0} onClick={onClick} />
    );
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Nightfall'));
    expect(onClick).toHaveBeenCalledWith(V4_TRACK, 0);
  });
});

// ─────────────────────────────────────────────────────────────────────────
// V4 new blocks — the six brand-new components in the spotlight line.
// ─────────────────────────────────────────────────────────────────────────
const LYRICS: LyricLine[] = [
  { time: 0, text: 'When the night falls' },
  { time: 12, text: 'And the city glows' },
  { time: 24, text: 'We keep moving on' },
];
const CATEGORIES: CategoryRailItem[] = [
  { id: 'pop', label: 'Pop', glyph: '🎵' },
  { id: 'jazz', label: 'Jazz', glyph: '🎷' },
  { id: 'focus', label: 'Focus', artworkUrl: 'https://x/focus.jpg' },
];

describe('streaming V4 new blocks (web)', () => {
  it('mounts all 6 new blocks token-pure', () => {
    const { container } = render(
      <>
        <FullScreenPlayer track={V4_TRACK} state="playing" position={60} duration={200} peaks={[0.2, 0.9, 0.4, 1]} favorite onFavorite={jest.fn()} onPlayToggle={jest.fn()} onSeek={jest.fn()} onPrev={jest.fn()} onNext={jest.fn()} onClose={jest.fn()} onQueue={jest.fn()} onCast={jest.fn()} />
        <AlbumHeader title="Dusk" subtitle="Aria" artworkUrl="https://x/album.jpg" meta={['2024', '12 songs', '48 min']} onPlay={jest.fn()} onShuffle={jest.fn()} />
        <LyricsView lines={LYRICS} onLineTap={jest.fn()} />
        <UpNext tracks={V4_QUEUE} onSelect={jest.fn()} onClear={jest.fn()} />
        <CategoryRail title="Browse" categories={CATEGORIES} onSelect={jest.fn()} />
        <SleepTimer value={15} onChange={jest.fn()} endOfEpisode onEndOfEpisode={jest.fn()} />
      </>
    );
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });

  it('SleepTimer onChange fires when a preset is picked', () => {
    const onChange = jest.fn();
    const { getByText, container } = render(<SleepTimer value={null} onChange={onChange} presets={[5, 15, 30]} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('30m'));
    expect(onChange).toHaveBeenCalledWith(30);
  });

  it('FullScreenPlayer onPlayToggle fires', () => {
    const onPlayToggle = jest.fn();
    const { getByLabelText, container } = render(
      <FullScreenPlayer track={V4_TRACK} state="paused" position={0} duration={200} onPlayToggle={onPlayToggle} />
    );
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Play'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });

  it('UpNext onSelect fires with the track id', () => {
    const onSelect = jest.fn();
    const { getByText, container } = render(<UpNext tracks={V4_QUEUE} onSelect={onSelect} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Sunrise'));
    expect(onSelect).toHaveBeenCalledWith('t2');
  });

  it('LyricsView taps a line (active line scrolls into view)', () => {
    // jsdom has no layout engine; the active-line auto-scroll needs a stub.
    const orig = (Element.prototype as unknown as { scrollIntoView?: () => void }).scrollIntoView;
    (Element.prototype as unknown as { scrollIntoView: () => void }).scrollIntoView = jest.fn();
    try {
      const onLineTap = jest.fn();
      const { getByText, container } = render(<LyricsView lines={LYRICS} activeIndex={1} onLineTap={onLineTap} />);
      expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
      fireEvent.click(getByText('We keep moving on'));
      expect(onLineTap).toHaveBeenCalledWith(2);
    } finally {
      (Element.prototype as unknown as { scrollIntoView?: () => void }).scrollIntoView = orig;
    }
  });
});
