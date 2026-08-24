import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { VideoPlayer } from './VideoPlayer';
import { AudioPlayer } from './AudioPlayer';
import { MiniPlayer } from './MiniPlayer';
import { NowPlaying } from './NowPlaying';
import { PlaylistRow } from './PlaylistRow';
import { QueueList } from './QueueList';
import { PodcastCard } from './PodcastCard';
import { EpisodeRow } from './EpisodeRow';
import { ChannelCard } from './ChannelCard';
import { WaveformScrubber } from './WaveformScrubber';
import { LiveBadge } from './LiveBadge';
import { CastButton } from './CastButton';
import { formatTime, formatCount } from './types';
import type { MediaTrack, StreamEpisode, StreamPodcast, StreamChannel } from './types';

const tracks: MediaTrack[] = [
  { id: 't1', title: 'Aurora', artist: 'Nova', album: 'Skies', duration: 201, artworkUrl: 'https://x/1.jpg' },
  { id: 't2', title: 'Ember', artist: 'Coil', duration: 158 },
  { id: 't3', title: 'Tide', artist: 'Marlow', duration: 245 },
];

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

const channel: StreamChannel = {
  id: 'c1',
  name: 'Nova Live',
  category: 'Music',
  live: true,
  viewers: 1234,
};

describe('VideoPlayer (native)', () => {
  it('mounts and toggles play via the center control under both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const onPlayToggle = jest.fn();
      const { getByLabelText } = renderThemed(
        <VideoPlayer
          title="Trailer"
          posterUrl="https://x/poster.jpg"
          state="paused"
          position={30}
          duration={120}
          onPlayToggle={onPlayToggle}
          onFullscreen={() => undefined}
        />,
        seed
      );
      fireEvent.press(getByLabelText('Play'));
      expect(onPlayToggle).toHaveBeenCalledWith(true);
    });
  });

  it('reflects the playing state in the control label and shows a live badge', () => {
    const { getByLabelText, queryByLabelText } = renderThemed(
      <VideoPlayer state="playing" live viewers={999} onPlayToggle={() => undefined} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Pause')).toBeTruthy();
    // Live streams hide the seek control; the badge is announced.
    expect(queryByLabelText(/watching/)).toBeTruthy();
  });
});

describe('MiniPlayer (native)', () => {
  it('mounts and toggles play, and expands via body press', () => {
    const onPlayToggle = jest.fn();
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <MiniPlayer track={tracks[0]!} state="paused" progress={0.5} onPlayToggle={onPlayToggle} onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Play'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
    fireEvent.press(getByLabelText(/Now playing/));
    expect(onPress).toHaveBeenCalledWith(tracks[0]);
  });
});

describe('NowPlaying (native)', () => {
  it('mounts with title/time labels and drives the transport', () => {
    const onNext = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <NowPlaying
        track={tracks[0]!}
        state="playing"
        position={60}
        duration={201}
        onPlayToggle={() => undefined}
        onNext={onNext}
        onSeek={() => undefined}
      />,
      SEED_LIGHT
    );
    expect(getByText('Aurora')).toBeTruthy();
    expect(getByText(formatTime(201))).toBeTruthy();
    expect(getByLabelText('Pause')).toBeTruthy();
    fireEvent.press(getByLabelText('Next'));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('renders a WaveformScrubber when peaks are provided and seeks by tap', () => {
    const onSeek = jest.fn();
    const { getByLabelText } = renderThemed(
      <NowPlaying
        track={tracks[0]!}
        position={0}
        duration={200}
        peaks={[0.2, 0.8, 0.5, 1, 0.3]}
        onSeek={onSeek}
      />,
      SEED_DARK
    );
    const scrubber = getByLabelText('Seek');
    fireEvent(scrubber, 'layout', { nativeEvent: { layout: { width: 200, height: 40, x: 0, y: 0 } } });
    fireEvent.press(scrubber, { nativeEvent: { locationX: 100 } });
    // Half-way tap → fraction 0.5 → 0.5 * 200s = 100s.
    expect(onSeek).toHaveBeenCalledWith(100);
  });
});

describe('WaveformScrubber (native)', () => {
  it('is an adjustable control that seeks by tap fraction', () => {
    const onSeek = jest.fn();
    const { getByLabelText } = renderThemed(
      <WaveformScrubber peaks={[0.1, 0.9, 0.4, 0.6]} progress={0.25} onSeek={onSeek} />,
      SEED_LIGHT
    );
    const el = getByLabelText('Seek');
    expect(el.props.accessibilityRole).toBe('adjustable');
    fireEvent(el, 'layout', { nativeEvent: { layout: { width: 100, height: 40, x: 0, y: 0 } } });
    fireEvent.press(el, { nativeEvent: { locationX: 25 } });
    expect(onSeek).toHaveBeenCalledWith(0.25);
  });

  it('renders a flat rail (no crash) when peaks is empty', () => {
    const { getByLabelText } = renderThemed(<WaveformScrubber peaks={[]} progress={0.5} />, SEED_DARK);
    expect(getByLabelText('Seek')).toBeTruthy();
  });
});

describe('EpisodeRow (native)', () => {
  it('mounts with meta and toggles play with the next state', () => {
    const onPlayToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <EpisodeRow episode={episode} playing state="paused" onPlayToggle={onPlayToggle} />,
      SEED_LIGHT
    );
    expect(getByText('The Deep Dive')).toBeTruthy();
    fireEvent.press(getByLabelText('Play The Deep Dive'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });
});

describe('PlaylistRow (native)', () => {
  it('fires onPress with the track and index', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <PlaylistRow track={tracks[1]!} index={4} variant="numbered" onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Ember'));
    expect(onPress).toHaveBeenCalledWith(tracks[1], 4);
  });
});

describe('QueueList (native)', () => {
  it('renders the empty state when there are no tracks', () => {
    const { getByText, queryByLabelText } = renderThemed(
      <QueueList tracks={[]} onSelect={() => undefined} />,
      SEED_LIGHT
    );
    expect(getByText('Your queue is empty')).toBeTruthy();
    // No rows → no track-labeled buttons.
    expect(queryByLabelText('Aurora')).toBeNull();
  });

  it('renders rows and fires onSelect with the tapped index', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <QueueList tracks={tracks} nowPlayingId="t1" onSelect={onSelect} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Tide'));
    expect(onSelect).toHaveBeenCalledWith(tracks[2], 2);
  });
});

describe('PodcastCard (native)', () => {
  it('mounts and toggles subscription', () => {
    const onSubscribeToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PodcastCard podcast={podcast} variant="featured" onSubscribeToggle={onSubscribeToggle} />,
      SEED_LIGHT
    );
    expect(getByText('Signals')).toBeTruthy();
    fireEvent.press(getByLabelText('Subscribe to Signals'));
    expect(onSubscribeToggle).toHaveBeenCalledWith(true);
  });
});

describe('ChannelCard (native)', () => {
  it('mounts with a live badge and follows', () => {
    const onFollowToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ChannelCard channel={channel} variant="featured" onFollowToggle={onFollowToggle} />,
      SEED_DARK
    );
    expect(getByText('Nova Live')).toBeTruthy();
    fireEvent.press(getByLabelText('Follow Nova Live'));
    expect(onFollowToggle).toHaveBeenCalledWith(true);
  });
});

describe('CastButton (native)', () => {
  it('fires onPress and reflects the disconnected state in its label', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(<CastButton onPress={onPress} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Cast to a device'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('reflects the connected device name in its accessible label', () => {
    const { getByLabelText } = renderThemed(
      <CastButton connected deviceName="Living Room" onPress={() => undefined} />,
      SEED_DARK
    );
    expect(getByLabelText(/Casting to Living Room/)).toBeTruthy();
  });
});

describe('LiveBadge (native)', () => {
  it('renders the label and formats the viewer count', () => {
    const { getByText } = renderThemed(<LiveBadge viewers={1500} />, SEED_LIGHT);
    expect(getByText('LIVE')).toBeTruthy();
    expect(getByText(`${formatCount(1500)} watching`)).toBeTruthy();
  });
});

describe('token purity (native streaming, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <VideoPlayer title="V" posterUrl="https://x/p.jpg" state="playing" position={10} duration={100} live viewers={42} onPlayToggle={() => undefined} onFullscreen={() => undefined} onCast={() => undefined} />
          <AudioPlayer track={tracks[0]!} state="paused" position={20} duration={201} variant="expanded" onPlayToggle={() => undefined} onSeek={() => undefined} onPrev={() => undefined} onNext={() => undefined} />
          <MiniPlayer track={tracks[1]!} state="buffering" progress={0.3} onPlayToggle={() => undefined} onNext={() => undefined} />
          <NowPlaying track={tracks[0]!} state="playing" position={60} duration={201} peaks={[0.3, 0.7, 1, 0.2]} onPlayToggle={() => undefined} onSeek={() => undefined} onPrev={() => undefined} onNext={() => undefined} onCast={() => undefined} />
          <PlaylistRow track={tracks[2]!} index={2} active state="playing" onPress={() => undefined} onPlayToggle={() => undefined} onMore={() => undefined} />
          <QueueList tracks={[]} />
          <PodcastCard podcast={podcast} variant="featured" subscribed onSubscribeToggle={() => undefined} onPress={() => undefined} />
          <EpisodeRow episode={episode} playing state="buffering" onPlayToggle={() => undefined} onPress={() => undefined} onDownload={() => undefined} />
          <ChannelCard channel={channel} variant="featured" following onFollowToggle={() => undefined} onPress={() => undefined} />
          <LiveBadge variant="outline" viewers={12} />
          <CastButton variant="labeled" connected deviceName="TV" onPress={() => undefined} />
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
