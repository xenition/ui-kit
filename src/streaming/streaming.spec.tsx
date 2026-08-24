/** @jest-environment jsdom */
/**
 * Web streaming shells: render smoke, `--xen-*` token-class presence (and a
 * no-literal-hex sweep), and the behavioral / a11y contracts — play-pause
 * labels reflect `state`, action controls stop propagation from the interactive
 * card body, the `WaveformScrubber` is an ARIA `slider` seekable by keyboard,
 * and an empty `QueueList` renders the `EmptyState` instead of rows.
 */
import { fireEvent, render, within } from '@testing-library/react';
import { VideoPlayer } from './VideoPlayer';
import { AudioPlayer } from './AudioPlayer';
import { MiniPlayer } from './MiniPlayer';
import { NowPlaying } from './NowPlaying';
import { WaveformScrubber } from './WaveformScrubber';
import { PlaylistRow } from './PlaylistRow';
import { QueueList } from './QueueList';
import { PodcastCard } from './PodcastCard';
import { EpisodeRow } from './EpisodeRow';
import { ChannelCard } from './ChannelCard';
import { LiveBadge } from './LiveBadge';
import { CastButton } from './CastButton';
import { formatCount } from './types';
import type { MediaTrack, StreamEpisode, StreamPodcast, StreamChannel } from './types';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

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

/** Every class attribute + inline style in the tree, joined — for a hex sweep. */
const styleAndClassText = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('*'))
    .map((el) => `${el.getAttribute('class') ?? ''} ${el.getAttribute('style') ?? ''}`)
    .join('\n');

describe('VideoPlayer (web)', () => {
  it('renders, toggles play, reflects state, and shows a live badge', () => {
    const onPlayToggle = jest.fn();
    const { getByRole, rerender } = render(
      <VideoPlayer
        title="Trailer"
        posterUrl="https://x/poster.jpg"
        state="paused"
        position={30}
        duration={120}
        onPlayToggle={onPlayToggle}
        onFullscreen={() => undefined}
      />
    );
    const play = getByRole('button', { name: 'Play' });
    // Token class, not a literal color.
    expect(play.className).toContain('bg-primary');
    fireEvent.click(play);
    expect(onPlayToggle).toHaveBeenCalledWith(true);

    rerender(
      <VideoPlayer state="playing" live viewers={999} onPlayToggle={onPlayToggle} />
    );
    expect(getByRole('button', { name: 'Pause' })).toBeTruthy();
  });
});

describe('AudioPlayer (web)', () => {
  it('renders the track + a seek slider and toggles play', () => {
    const onPlayToggle = jest.fn();
    const { getByText, getByRole } = render(
      <AudioPlayer track={tracks[0]!} state="paused" position={20} duration={201} onPlayToggle={onPlayToggle} onSeek={() => undefined} />
    );
    expect(getByText('Aurora')).toBeTruthy();
    // Non-compact renders the linear Slider (an ARIA slider = range input).
    expect(getByRole('slider')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Play' }));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });
});

describe('MiniPlayer (web)', () => {
  it('play control stops propagation from the expand body', () => {
    const onPlayToggle = jest.fn();
    const onClick = jest.fn();
    const { getByRole } = render(
      <MiniPlayer track={tracks[0]!} state="paused" progress={0.5} onPlayToggle={onPlayToggle} onClick={onClick} />
    );
    // Body is a role=button that expands.
    const body = getByRole('button', { name: /Now playing/ });
    expect(body.className).toContain('bg-surface');
    fireEvent.click(getByRole('button', { name: 'Play' }));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
    // stopPropagation → the expand handler did NOT fire.
    expect(onClick).not.toHaveBeenCalled();
    // Direct body activation expands.
    fireEvent.keyDown(body, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledWith(tracks[0]);
  });
});

describe('NowPlaying (web)', () => {
  it('renders a keyboard-seekable WaveformScrubber when peaks are provided', () => {
    const onSeek = jest.fn();
    const { getByRole, getByText } = render(
      <NowPlaying
        track={tracks[0]!}
        state="playing"
        position={60}
        duration={200}
        peaks={[0.2, 0.8, 0.5, 1, 0.3]}
        onPlayToggle={() => undefined}
        onNext={() => undefined}
        onSeek={onSeek}
      />
    );
    expect(getByText('Aurora')).toBeTruthy();
    const scrubber = getByRole('slider', { name: 'Seek' });
    // position/duration = 60/200 → 30%.
    expect(scrubber.getAttribute('aria-valuenow')).toBe('30');
    fireEvent.keyDown(scrubber, { key: 'ArrowRight' });
    expect(onSeek).toHaveBeenCalled();
    // Fraction bumped up (0.3 + step) then scaled by duration → past the start.
    expect(onSeek.mock.calls[0]![0]).toBeGreaterThan(60);
  });

  it('drives the transport (next)', () => {
    const onNext = jest.fn();
    const { getByRole } = render(
      <NowPlaying track={tracks[0]!} state="playing" position={10} duration={100} onPlayToggle={() => undefined} onNext={onNext} />
    );
    expect(getByRole('button', { name: 'Pause' })).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Next' }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});

describe('WaveformScrubber (web)', () => {
  it('is an ARIA slider that seeks by keyboard', () => {
    const onSeek = jest.fn();
    const { getByRole } = render(
      <WaveformScrubber peaks={[0.1, 0.9, 0.4, 0.6]} progress={0.25} onSeek={onSeek} />
    );
    const el = getByRole('slider', { name: 'Seek' });
    expect(el.getAttribute('aria-valuenow')).toBe('25');
    fireEvent.keyDown(el, { key: 'ArrowLeft' });
    expect(onSeek.mock.calls[0]![0]).toBeLessThan(0.25);
  });

  it('renders a flat rail (no crash) when peaks is empty', () => {
    const { getByRole } = render(<WaveformScrubber peaks={[]} progress={0.5} />);
    expect(getByRole('slider')).toBeTruthy();
  });
});

describe('PlaylistRow (web)', () => {
  it('fires onClick with track + index and the play toggle stops propagation', () => {
    const onClick = jest.fn();
    const onPlayToggle = jest.fn();
    const { getByRole } = render(
      <PlaylistRow track={tracks[1]!} index={4} variant="numbered" active state="playing" onClick={onClick} onPlayToggle={onPlayToggle} />
    );
    const row = getByRole('button', { name: 'Ember' });
    expect(row.className).toContain('bg-border');
    fireEvent.click(getByRole('button', { name: 'Pause Ember' }));
    expect(onPlayToggle).toHaveBeenCalledWith(false);
    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(row);
    expect(onClick).toHaveBeenCalledWith(tracks[1], 4);
  });
});

describe('QueueList (web)', () => {
  it('renders the EmptyState when there are no tracks', () => {
    const { getByText, queryByRole } = render(<QueueList tracks={[]} onSelect={() => undefined} />);
    expect(getByText('Your queue is empty')).toBeTruthy();
    // No rows → no track-labeled buttons.
    expect(queryByRole('button', { name: 'Aurora' })).toBeNull();
  });

  it('renders rows and fires onSelect with the tapped index', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(<QueueList tracks={tracks} nowPlayingId="t1" onSelect={onSelect} />);
    fireEvent.click(getByRole('button', { name: 'Tide' }));
    expect(onSelect).toHaveBeenCalledWith(tracks[2], 2);
  });
});

describe('PodcastCard (web)', () => {
  it('renders and toggles subscription without triggering the card open', () => {
    const onSubscribeToggle = jest.fn();
    const onClick = jest.fn();
    const { getByText, getByRole } = render(
      <PodcastCard podcast={podcast} variant="featured" onSubscribeToggle={onSubscribeToggle} onClick={onClick} />
    );
    expect(getByText('Signals')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Subscribe to Signals' }));
    expect(onSubscribeToggle).toHaveBeenCalledWith(true);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('EpisodeRow (web)', () => {
  it('reflects a buffering state via aria-busy and toggles play', () => {
    const onPlayToggle = jest.fn();
    const { getByText, getByRole } = render(
      <EpisodeRow episode={episode} playing state="buffering" onPlayToggle={onPlayToggle} />
    );
    expect(getByText('The Deep Dive')).toBeTruthy();
    const toggle = getByRole('button', { name: 'Play The Deep Dive' });
    expect(toggle.getAttribute('aria-busy')).toBe('true');
    fireEvent.click(toggle);
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });
});

describe('ChannelCard (web)', () => {
  it('renders a live badge and follows', () => {
    const onFollowToggle = jest.fn();
    const { getByText, getByRole } = render(
      <ChannelCard channel={channel} variant="featured" onFollowToggle={onFollowToggle} />
    );
    expect(getByText('Nova Live')).toBeTruthy();
    expect(getByText('LIVE')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Follow Nova Live' }));
    expect(onFollowToggle).toHaveBeenCalledWith(true);
  });
});

describe('LiveBadge (web)', () => {
  it('renders the label + formatted viewer count with a danger token class', () => {
    const { getByText, container } = render(<LiveBadge viewers={1500} />);
    expect(getByText('LIVE')).toBeTruthy();
    expect(getByText(`${formatCount(1500)} watching`)).toBeTruthy();
    expect((container.firstChild as HTMLElement).className).toContain('bg-danger');
  });
});

describe('CastButton (web)', () => {
  it('fires onClick and reflects the connected device in its label + tint', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<CastButton onClick={onClick} />);
    fireEvent.click(getByRole('button', { name: 'Cast to a device' }));
    expect(onClick).toHaveBeenCalledTimes(1);

    const { getByRole: getByRole2 } = render(
      <CastButton connected deviceName="Living Room" onClick={() => undefined} />
    );
    const btn = getByRole2('button', { name: /Casting to Living Room/ });
    expect(btn.className).toContain('text-primary');
  });
});

describe('token purity (web streaming)', () => {
  it('no literal hex color leaks into class or inline style', () => {
    const { container } = render(
      <div>
        <VideoPlayer title="V" posterUrl="https://x/p.jpg" state="playing" position={10} duration={100} live viewers={42} onPlayToggle={() => undefined} onFullscreen={() => undefined} onCast={() => undefined} />
        <AudioPlayer track={tracks[0]!} state="paused" position={20} duration={201} variant="expanded" onPlayToggle={() => undefined} onSeek={() => undefined} onPrev={() => undefined} onNext={() => undefined} />
        <MiniPlayer track={tracks[1]!} state="buffering" progress={0.3} onPlayToggle={() => undefined} onNext={() => undefined} />
        <NowPlaying track={tracks[0]!} state="playing" position={60} duration={201} peaks={[0.3, 0.7, 1, 0.2]} onPlayToggle={() => undefined} onSeek={() => undefined} onPrev={() => undefined} onNext={() => undefined} onCast={() => undefined} />
        <PlaylistRow track={tracks[2]!} index={2} active state="playing" onClick={() => undefined} onPlayToggle={() => undefined} onMore={() => undefined} />
        <QueueList tracks={[]} />
        <PodcastCard podcast={podcast} variant="featured" subscribed onSubscribeToggle={() => undefined} onClick={() => undefined} />
        <EpisodeRow episode={episode} playing state="buffering" onPlayToggle={() => undefined} onClick={() => undefined} onDownload={() => undefined} />
        <ChannelCard channel={channel} variant="featured" following onFollowToggle={() => undefined} onClick={() => undefined} />
        <LiveBadge variant="outline" viewers={12} />
        <CastButton variant="labeled" connected deviceName="TV" onClick={() => undefined} />
      </div>
    );
    expect(styleAndClassText(container as unknown as HTMLElement)).not.toMatch(HEX_LITERAL);
  });
});
