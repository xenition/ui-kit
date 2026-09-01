import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { PodcastCardV2 } from './PodcastCardV2';
import { PodcastCardV3 } from './PodcastCardV3';
import { EpisodeRowV2 } from './EpisodeRowV2';
import { EpisodeRowV3 } from './EpisodeRowV3';
import { NowPlayingV2 } from './NowPlayingV2';
import { NowPlayingV3 } from './NowPlayingV3';
import { MiniPlayerV2 } from './MiniPlayerV2';
import { MiniPlayerV3 } from './MiniPlayerV3';
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

const track: MediaTrack = {
  id: 't1',
  title: 'Aurora',
  artist: 'Nova',
  album: 'Skies',
  duration: 201,
  artworkUrl: 'https://x/1.jpg',
};

const episode: StreamEpisode = {
  id: 'e1',
  title: 'The Deep Dive',
  show: 'Signals',
  date: 'Aug 24',
  duration: '42 min',
  progress: 0.4,
  artworkUrl: 'https://x/ep.jpg',
};

const podcast: StreamPodcast = {
  id: 'p1',
  title: 'Signals',
  publisher: 'Xenition Media',
  episodeCount: 128,
  description: 'A show about systems.',
  artworkUrl: 'https://x/pod.jpg',
};

const bothSeeds = [SEED_LIGHT, SEED_DARK] as const;

// ── PodcastCard V2 / V3 ────────────────────────────────────────────────
describe('PodcastCardV2 / V3 (native design variants)', () => {
  it('V2 mounts and toggles subscription', () => {
    const onSubscribeToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PodcastCardV2 podcast={podcast} variant="featured" onSubscribeToggle={onSubscribeToggle} onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(getByText('Signals')).toBeTruthy();
    fireEvent.press(getByLabelText('Subscribe to Signals'));
    expect(onSubscribeToggle).toHaveBeenCalledWith(true);
  });

  it('V3 mounts and toggles subscription', () => {
    const onSubscribeToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PodcastCardV3 podcast={podcast} variant="featured" subscribed onSubscribeToggle={onSubscribeToggle} />,
      SEED_DARK
    );
    expect(getByText('Signals')).toBeTruthy();
    fireEvent.press(getByLabelText('Unsubscribe from Signals'));
    expect(onSubscribeToggle).toHaveBeenCalledWith(false);
  });

  it('both render with no artwork / no callbacks (empty + no-op guards)', () => {
    bothSeeds.forEach((seed) => {
      const bare: StreamPodcast = { id: 'p0', title: 'Bare Show' };
      expect(renderThemed(<PodcastCardV2 podcast={bare} />, seed).getByText('Bare Show')).toBeTruthy();
      expect(renderThemed(<PodcastCardV3 podcast={bare} />, seed).getByText('Bare Show')).toBeTruthy();
    });
  });
});

// ── EpisodeRow V2 / V3 ─────────────────────────────────────────────────
describe('EpisodeRowV2 / V3 (native design variants)', () => {
  it('V2 mounts and toggles play with the next state', () => {
    const onPlayToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <EpisodeRowV2 episode={episode} state="paused" onPlayToggle={onPlayToggle} onDownload={() => undefined} />,
      SEED_LIGHT
    );
    expect(getByText('The Deep Dive')).toBeTruthy();
    fireEvent.press(getByLabelText('Play The Deep Dive'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });

  it('V3 mounts and toggles play with the next state', () => {
    const onPlayToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <EpisodeRowV3 episode={episode} state="paused" onPlayToggle={onPlayToggle} />,
      SEED_DARK
    );
    expect(getByText('The Deep Dive')).toBeTruthy();
    fireEvent.press(getByLabelText('Play The Deep Dive'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });

  it('V2 shows a Spinner (not a play button) while buffering', () => {
    const { queryByLabelText } = renderThemed(
      <EpisodeRowV2 episode={episode} playing state="buffering" onPlayToggle={() => undefined} />,
      SEED_LIGHT
    );
    // While buffering the control is a spinner, so no Pause/Play button is present.
    expect(queryByLabelText(/Pause|Play/)).toBeNull();
  });
});

// ── NowPlaying V2 / V3 ─────────────────────────────────────────────────
describe('NowPlayingV2 / V3 (native design variants)', () => {
  it('V2 mounts, reflects playing state, and scrubs via the waveform', () => {
    const onSeek = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <NowPlayingV2
        track={track}
        state="playing"
        position={0}
        duration={200}
        peaks={[0.2, 0.8, 0.5, 1, 0.3]}
        onPlayToggle={() => undefined}
        onSeek={onSeek}
        onCast={() => undefined}
      />,
      SEED_LIGHT
    );
    expect(getByText('Aurora')).toBeTruthy();
    expect(getByLabelText('Pause')).toBeTruthy();
    const scrubber = getByLabelText('Seek');
    expect(scrubber.props.accessibilityRole).toBe('adjustable');
    fireEvent(scrubber, 'layout', { nativeEvent: { layout: { width: 200, height: 40, x: 0, y: 0 } } });
    fireEvent.press(scrubber, { nativeEvent: { locationX: 100 } });
    expect(onSeek).toHaveBeenCalledWith(100);
  });

  it('V3 mounts and toggles play (paused → play intent)', () => {
    const onPlayToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <NowPlayingV3 track={track} state="paused" position={60} duration={201} onPlayToggle={onPlayToggle} onSeek={() => undefined} onPrev={() => undefined} onNext={() => undefined} />,
      SEED_DARK
    );
    expect(getByText('Aurora')).toBeTruthy();
    fireEvent.press(getByLabelText('Play'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });

  it('both render with no artwork and zero duration (guarded scrub math)', () => {
    bothSeeds.forEach((seed) => {
      const bare: MediaTrack = { id: 't0', title: 'No Art' };
      expect(renderThemed(<NowPlayingV2 track={bare} />, seed).getByText('No Art')).toBeTruthy();
      expect(renderThemed(<NowPlayingV3 track={bare} />, seed).getByText('No Art')).toBeTruthy();
    });
  });
});

// ── MiniPlayer V2 / V3 ─────────────────────────────────────────────────
describe('MiniPlayerV2 / V3 (native design variants)', () => {
  it('V2 mounts, toggles play, and expands via body press', () => {
    const onPlayToggle = jest.fn();
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <MiniPlayerV2 track={track} state="paused" progress={0.5} onPlayToggle={onPlayToggle} onNext={() => undefined} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Play'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
    fireEvent.press(getByLabelText(/Now playing/));
    expect(onPress).toHaveBeenCalledWith(track);
  });

  it('V3 mounts and toggles play', () => {
    const onPlayToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <MiniPlayerV3 track={track} state="paused" progress={0.5} onPlayToggle={onPlayToggle} onNext={() => undefined} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Play'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });

  it('both show a Spinner while buffering', () => {
    bothSeeds.forEach((seed) => {
      expect(
        renderThemed(<MiniPlayerV2 track={track} state="buffering" progress={0.3} />, seed).queryByLabelText(/Pause|Play/)
      ).toBeNull();
      expect(
        renderThemed(<MiniPlayerV3 track={track} state="buffering" progress={0.3} />, seed).queryByLabelText(/Pause|Play/)
      ).toBeNull();
    });
  });
});

// ── token purity (all variants, both seeds) ────────────────────────────
describe('token purity (native streaming design variants, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    bothSeeds.forEach((seed) => {
      const { root } = renderThemed(
        <>
          <PodcastCardV2 podcast={podcast} variant="featured" subscribed onSubscribeToggle={() => undefined} onPress={() => undefined} />
          <PodcastCardV3 podcast={podcast} variant="featured" onSubscribeToggle={() => undefined} onPress={() => undefined} />
          <EpisodeRowV2 episode={episode} playing state="buffering" onPlayToggle={() => undefined} onPress={() => undefined} onDownload={() => undefined} />
          <EpisodeRowV3 episode={episode} playing state="playing" onPlayToggle={() => undefined} onPress={() => undefined} onDownload={() => undefined} />
          <NowPlayingV2 track={track} state="playing" position={60} duration={201} peaks={[0.3, 0.7, 1, 0.2]} onPlayToggle={() => undefined} onSeek={() => undefined} onPrev={() => undefined} onNext={() => undefined} onCast={() => undefined} casting />
          <NowPlayingV3 track={track} state="paused" position={60} duration={201} onPlayToggle={() => undefined} onSeek={() => undefined} onPrev={() => undefined} onNext={() => undefined} onCast={() => undefined} />
          <MiniPlayerV2 track={track} state="buffering" progress={0.3} onPlayToggle={() => undefined} onNext={() => undefined} onPress={() => undefined} />
          <MiniPlayerV3 track={track} state="playing" progress={0.6} onPlayToggle={() => undefined} onNext={() => undefined} onPress={() => undefined} />
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

// ── V4 "spotlight" line — the 12 drop-in variants ──────────────────────
// Each V4 keeps its base props (`<Name>V4Props = <Name>Props`); we feed the
// same shapes, prove they mount + honor a key interaction, and fold every
// gradient piece into the both-seeds token-purity aggregate below.
const v4Channel: StreamChannel = {
  id: 'c1',
  name: 'Nova Live',
  category: 'Music',
  live: true,
  viewers: 1234,
  avatarUrl: 'https://x/av.jpg',
};

const v4Queue: MediaTrack[] = [track, { id: 't2', title: 'Sunrise', artist: 'Nova', duration: 180 }];

describe('streaming V4 "spotlight" line (native design variants)', () => {
  it('NowPlayingV4 mounts and toggles play', () => {
    const onPlayToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <NowPlayingV4 track={track} state="paused" position={60} duration={201} onPlayToggle={onPlayToggle} onSeek={() => undefined} onPrev={() => undefined} onNext={() => undefined} />,
      SEED_LIGHT
    );
    expect(getByText('Aurora')).toBeTruthy();
    fireEvent.press(getByLabelText('Play'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });

  it('PlaylistRowV4 mounts and reports selection', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PlaylistRowV4 track={track} index={0} onPress={onPress} onPlayToggle={() => undefined} onMore={() => undefined} />,
      SEED_DARK
    );
    expect(getByText('Aurora')).toBeTruthy();
    fireEvent.press(getByLabelText('Aurora'));
    expect(onPress).toHaveBeenCalledWith(track, 0);
  });

  it('the artwork-forward / non-gradient V4 variants mount across both seeds', () => {
    bothSeeds.forEach((seed) => {
      expect(
        renderThemed(<MiniPlayerV4 track={track} state="paused" progress={0.5} onPlayToggle={() => undefined} onNext={() => undefined} onPress={() => undefined} />, seed).getByLabelText('Play')
      ).toBeTruthy();
      expect(
        renderThemed(<EpisodeRowV4 episode={episode} playing state="playing" onPlayToggle={() => undefined} onPress={() => undefined} onDownload={() => undefined} />, seed).getByText('The Deep Dive')
      ).toBeTruthy();
      expect(
        renderThemed(<WaveformScrubberV4 peaks={[0.2, 0.8, 0.5, 1, 0.3]} progress={0.4} onSeek={() => undefined} />, seed).getByLabelText('Seek')
      ).toBeTruthy();
      expect(
        renderThemed(<QueueListV4 tracks={v4Queue} nowPlayingId="t1" state="playing" onSelect={() => undefined} onRemove={() => undefined} />, seed).getByText('Sunrise')
      ).toBeTruthy();
      expect(
        renderThemed(<LiveBadgeV4 label="LIVE" viewers={1234} />, seed).getByText('LIVE')
      ).toBeTruthy();
      expect(
        renderThemed(<CastButtonV4 variant="labeled" connected deviceName="Living Room" onPress={() => undefined} />, seed).getByLabelText(/Casting/)
      ).toBeTruthy();
    });
  });
});

// ── V4 new blocks ──────────────────────────────────────────────────────
const lyrics: LyricLine[] = [
  { time: 0, text: 'When the night falls' },
  { time: 12, text: 'And the city glows' },
  { time: 24, text: 'We keep moving on' },
];

const categories: CategoryRailItem[] = [
  { id: 'pop', label: 'Pop', glyph: '♪' },
  { id: 'jazz', label: 'Jazz', glyph: '♫' },
  { id: 'focus', label: 'Focus', artworkUrl: 'https://x/focus.jpg' },
];

describe('streaming V4 new blocks (native design variants)', () => {
  it('SleepTimer mounts and reports the chosen preset', () => {
    const onChange = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SleepTimer value={null} onChange={onChange} presets={[5, 15, 30]} endOfEpisode={false} onEndOfEpisode={() => undefined} />,
      SEED_LIGHT
    );
    expect(getByText('Off')).toBeTruthy();
    fireEvent.press(getByLabelText('30 minutes'));
    expect(onChange).toHaveBeenCalledWith(30);
  });

  it('FullScreenPlayer mounts and toggles play', () => {
    const onPlayToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <FullScreenPlayer track={track} state="paused" position={60} duration={201} favorite onFavorite={() => undefined} onPlayToggle={onPlayToggle} onSeek={() => undefined} onPrev={() => undefined} onNext={() => undefined} onClose={() => undefined} onQueue={() => undefined} />,
      SEED_DARK
    );
    expect(getByText('Aurora')).toBeTruthy();
    fireEvent.press(getByLabelText('Play'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });

  it('UpNext mounts and reports the tapped track id', () => {
    const onSelect = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <UpNext tracks={v4Queue} onSelect={onSelect} onClear={() => undefined} />,
      SEED_LIGHT
    );
    expect(getByText('Sunrise')).toBeTruthy();
    fireEvent.press(getByLabelText('Sunrise — Nova'));
    expect(onSelect).toHaveBeenCalledWith('t2');
  });

  it('AlbumHeader / LyricsView / CategoryRail mount and fire their interactions', () => {
    const onPlay = jest.fn();
    const { getByLabelText } = renderThemed(
      <AlbumHeader title="Skies" subtitle="Nova" artworkUrl="https://x/album.jpg" meta={['2024', '12 songs', '48 min']} onPlay={onPlay} onShuffle={() => undefined} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Play'));
    expect(onPlay).toHaveBeenCalledTimes(1);

    const onLineTap = jest.fn();
    const { getByText } = renderThemed(
      <LyricsView lines={lyrics} activeIndex={1} onLineTap={onLineTap} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('We keep moving on'));
    expect(onLineTap).toHaveBeenCalledWith(2);

    const onSelect = jest.fn();
    const rail = renderThemed(
      <CategoryRail title="Browse" categories={categories} onSelect={onSelect} />,
      SEED_DARK
    );
    fireEvent.press(rail.getByLabelText('Jazz'));
    expect(onSelect).toHaveBeenCalledWith('jazz');
  });
});

// ── token purity: V4 line + new blocks (all gradient pieces, both seeds) ─
describe('token purity (native streaming V4 line + new blocks, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    bothSeeds.forEach((seed) => {
      const { root } = renderThemed(
        <>
          {/* gradient pieces — the V4 spotlight signature (must be here). */}
          <NowPlayingV4 track={track} state="playing" position={60} duration={201} peaks={[0.3, 0.7, 1, 0.2]} onPlayToggle={() => undefined} onSeek={() => undefined} onPrev={() => undefined} onNext={() => undefined} onCast={() => undefined} casting />
          <PodcastCardV4 podcast={podcast} variant="featured" subscribed onSubscribeToggle={() => undefined} onPress={() => undefined} />
          <AudioPlayerV4 track={track} state="playing" position={30} duration={201} onPlayToggle={() => undefined} onSeek={() => undefined} onPrev={() => undefined} onNext={() => undefined} />
          <VideoPlayerV4 title="Clip" posterUrl="https://x/p.jpg" state="paused" position={10} duration={120} live viewers={2000} onPlayToggle={() => undefined} onFullscreen={() => undefined} onCast={() => undefined} />
          <ChannelCardV4 channel={v4Channel} variant="featured" following onFollowToggle={() => undefined} onPress={() => undefined} />
          <FullScreenPlayer track={track} state="playing" position={60} duration={201} peaks={[0.2, 0.9, 0.4, 1]} favorite onFavorite={() => undefined} onPlayToggle={() => undefined} onSeek={() => undefined} onPrev={() => undefined} onNext={() => undefined} onClose={() => undefined} onQueue={() => undefined} onCast={() => undefined} casting />
          <AlbumHeader title="Skies" subtitle="Nova" artworkUrl="https://x/album.jpg" meta={['2024', '12 songs']} onPlay={() => undefined} onShuffle={() => undefined} />
          <CategoryRail title="Browse" categories={categories} onSelect={() => undefined} />
          {/* clean-surface pieces. */}
          <MiniPlayerV4 track={track} state="playing" progress={0.6} onPlayToggle={() => undefined} onNext={() => undefined} onPress={() => undefined} />
          <EpisodeRowV4 episode={episode} playing state="playing" onPlayToggle={() => undefined} onPress={() => undefined} onDownload={() => undefined} />
          <WaveformScrubberV4 peaks={[0.2, 0.8, 0.5, 1, 0.3]} progress={0.4} onSeek={() => undefined} />
          <QueueListV4 tracks={v4Queue} nowPlayingId="t1" state="playing" onSelect={() => undefined} onRemove={() => undefined} />
          <PlaylistRowV4 track={track} index={0} active state="playing" onPress={() => undefined} onPlayToggle={() => undefined} onMore={() => undefined} />
          <LiveBadgeV4 label="LIVE" viewers={1234} />
          <CastButtonV4 variant="labeled" connected deviceName="Living Room" onPress={() => undefined} />
          <LyricsView lines={lyrics} activeIndex={1} onLineTap={() => undefined} />
          <UpNext tracks={v4Queue} onSelect={() => undefined} onClear={() => undefined} />
          <SleepTimer value={15} onChange={() => undefined} endOfEpisode onEndOfEpisode={() => undefined} />
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
