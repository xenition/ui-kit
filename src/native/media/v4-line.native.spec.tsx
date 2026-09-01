/**
 * The **V4 media line** (native) — and the bug it exists for: all three base
 * components rendered `<Image source={{ uri: item.url }} />` unconditionally,
 * so a `kind: 'video'` item rendered its `.mp4` URL as an image.
 *
 * The web twin honoured `kind`/`poster` all along, so these are the specs that
 * close the parity gap; the web file asserts the mirror-image fix.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { MediaFigureV4 } from './MediaFigureV4';
import { GalleryV4 } from './GalleryV4';
import { LightboxV4 } from './LightboxV4';
import type { MediaItem } from '../../media/types';

const IMAGE: MediaItem = { url: '/a.jpg', caption: 'A field', width: 4, height: 3 };
const VIDEO: MediaItem = { url: '/c.mp4', kind: 'video', poster: '/c.jpg', caption: 'Clip' };
/** A video with no still at all — the case that produced the broken tile. */
const VIDEO_NO_POSTER: MediaItem = { url: '/d.mp4', kind: 'video' };

/** `Icon` marks itself decorative, so the play glyph needs the hidden tree. */
const HIDDEN = { includeHiddenElements: true } as const;

/** Every `<Image>` URI in the tree — the assertion the video bug turns on. */
const imageUris = (root: { findAll: (f: (n: any) => boolean) => any[] }): string[] =>
  root
    .findAll((n) => typeof n.type === 'string' && n.props?.source?.uri != null)
    .map((n) => n.props.source.uri as string);

describe('MediaFigureV4', () => {
  it('renders a video s poster, never its media URL', () => {
    const { root } = renderThemed(<MediaFigureV4 item={VIDEO} />, SEED_LIGHT);
    expect(imageUris(root)).toContain('/c.jpg');
    expect(imageUris(root)).not.toContain('/c.mp4');
  });

  it('renders no image at all for a video with no poster', () => {
    // Handing an `.mp4` to `<Image>` is what produced the broken tile; an
    // honest empty ground is better than one that looks broken.
    const { root } = renderThemed(<MediaFigureV4 item={VIDEO_NO_POSTER} />, SEED_LIGHT);
    expect(imageUris(root)).toHaveLength(0);
  });

  it('still renders an image item s own url', () => {
    const { root } = renderThemed(<MediaFigureV4 item={IMAGE} />, SEED_LIGHT);
    expect(imageUris(root)).toContain('/a.jpg');
  });

  it('says a video is a video in the press target s name', () => {
    const { getByLabelText } = renderThemed(
      <MediaFigureV4 item={VIDEO} onActivate={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Clip, video')).toBeTruthy();
  });

  it('draws a play badge over a video', () => {
    const { queryByText } = renderThemed(<MediaFigureV4 item={VIDEO} />, SEED_LIGHT);
    expect(queryByText('▶', HIDDEN)).toBeTruthy();
  });
});

describe('GalleryV4', () => {
  it('shows the empty message for an empty album', () => {
    const { getByText } = renderThemed(
      <GalleryV4 items={[]} emptyMessage="No media yet." />,
      SEED_LIGHT
    );
    expect(getByText('No media yet.')).toBeTruthy();
  });

  it('names a tile with its position in the album', () => {
    const { getByLabelText } = renderThemed(
      <GalleryV4 items={[{ url: '/a.jpg' }, { url: '/b.jpg' }]} onOpen={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Open item 2 of 2')).toBeTruthy();
  });

  it('opens the tile that was pressed', () => {
    const onOpen = jest.fn();
    const { getByLabelText } = renderThemed(
      <GalleryV4 items={[{ url: '/a.jpg' }, { url: '/b.jpg' }]} onOpen={onOpen} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Open item 2 of 2'));
    expect(onOpen).toHaveBeenCalledWith(1);
  });
});

describe('LightboxV4', () => {
  it('renders nothing when closed', () => {
    const { toJSON } = renderThemed(
      <LightboxV4 items={[IMAGE]} index={null} onClose={jest.fn()} />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeNull();
  });

  it('shows the position, and lets the host format it', () => {
    const { getByText } = renderThemed(
      <LightboxV4
        items={[IMAGE, VIDEO]}
        index={1}
        onClose={jest.fn()}
        formatCounter={(n, of) => `${n} von ${of}`}
      />,
      SEED_LIGHT
    );
    expect(getByText('2 von 2')).toBeTruthy();
  });

  it('offers play only when the host can handle it', () => {
    const onPlay = jest.fn();
    const withHandler = renderThemed(
      <LightboxV4 items={[VIDEO]} index={0} onClose={jest.fn()} onPlay={onPlay} />,
      SEED_LIGHT
    );
    fireEvent.press(withHandler.getByLabelText('Play video'));
    expect(onPlay).toHaveBeenCalledWith(0);
    withHandler.unmount();

    // Without `onPlay` the badge would be a picture of a button.
    const without = renderThemed(
      <LightboxV4 items={[VIDEO]} index={0} onClose={jest.fn()} />,
      SEED_LIGHT
    );
    expect(without.queryByLabelText('Play video')).toBeNull();
  });

  it('hides the previous control on the first item unless it loops', () => {
    const first = renderThemed(
      <LightboxV4 items={[IMAGE, VIDEO]} index={0} onClose={jest.fn()} onPrev={jest.fn()} />,
      SEED_LIGHT
    );
    expect(first.queryByLabelText('Previous')).toBeNull();
    first.unmount();

    const looping = renderThemed(
      <LightboxV4 items={[IMAGE, VIDEO]} index={0} onClose={jest.fn()} onPrev={jest.fn()} loop />,
      SEED_LIGHT
    );
    expect(looping.getByLabelText('Previous')).toBeTruthy();
  });
});
