/** @jest-environment jsdom */
/**
 * The **V4 media line** (web) — the twin of
 * `native/media/v4-line.native.spec.tsx`.
 *
 * The web twin already honoured `kind`/`poster`, so its defect was the
 * mirror image: with `onActivate` set, a video figure put a `<video controls>`
 * inside a `<button>`. That is nested interactive content — invalid HTML, and
 * in practice clicking play also fired `onActivate`.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MediaFigureV4 } from './MediaFigureV4';
import { GalleryV4 } from './GalleryV4';
import { LightboxV4 } from './LightboxV4';
import type { MediaItem } from './types';

const IMAGE: MediaItem = { url: '/a.jpg', caption: 'A field', width: 4, height: 3 };
const VIDEO: MediaItem = { url: '/c.mp4', kind: 'video', poster: '/c.jpg', caption: 'Clip' };

describe('MediaFigureV4', () => {
  it('is the player when nothing else will handle the press', () => {
    const { container } = render(<MediaFigureV4 item={VIDEO} />);
    const video = container.querySelector('video');
    expect(video).toBeTruthy();
    expect(video?.getAttribute('poster')).toBe('/c.jpg');
  });

  it('is a poster and a button when the press opens something else', () => {
    // No `<video>` inside the `<button>`: nested interactive content is
    // invalid, and clicking play used to fire `onActivate` instead.
    const { container, getByRole } = render(
      <MediaFigureV4 item={VIDEO} onActivate={jest.fn()} />
    );
    expect(container.querySelector('button video')).toBeNull();
    expect(container.querySelector('img')?.getAttribute('src')).toBe('/c.jpg');
    expect(getByRole('button', { name: 'Clip, video' })).toBeTruthy();
  });

  it('still renders an image item normally', () => {
    const { container } = render(<MediaFigureV4 item={IMAGE} />);
    expect(container.querySelector('img')?.getAttribute('src')).toBe('/a.jpg');
  });
});

describe('GalleryV4', () => {
  it('shows the empty message for an empty album', () => {
    const { getByText } = render(<GalleryV4 items={[]} emptyMessage="No media yet." />);
    expect(getByText('No media yet.')).toBeTruthy();
  });

  it('names a tile with its position in the album', () => {
    const { getByLabelText } = render(
      <GalleryV4 items={[{ url: '/a.jpg' }, { url: '/b.jpg' }]} onOpen={jest.fn()} />
    );
    expect(getByLabelText('Open item 2 of 2')).toBeTruthy();
  });

  it('never puts a video element in a tile', () => {
    // A grid of `<video>` is a grid of nested interactive controls; a tile's
    // job is to open the thing, and the lightbox is where it plays.
    const { container } = render(<GalleryV4 items={[VIDEO]} onOpen={jest.fn()} />);
    expect(container.querySelector('video')).toBeNull();
    expect(container.querySelector('img')?.getAttribute('src')).toBe('/c.jpg');
  });

  it('opens the tile that was clicked', () => {
    const onOpen = jest.fn();
    const { getByLabelText } = render(
      <GalleryV4 items={[{ url: '/a.jpg' }, { url: '/b.jpg' }]} onOpen={onOpen} />
    );
    fireEvent.click(getByLabelText('Open item 2 of 2'));
    expect(onOpen).toHaveBeenCalledWith(1);
  });
});

describe('LightboxV4', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <LightboxV4 items={[IMAGE]} index={null} onClose={jest.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows the position, and lets the host format it', () => {
    const { getByText } = render(
      <LightboxV4
        items={[IMAGE, VIDEO]}
        index={1}
        onClose={jest.fn()}
        formatCounter={(n, of) => `${n} von ${of}`}
      />
    );
    expect(getByText('2 von 2')).toBeTruthy();
  });

  it('plays inline by default, and hands over when onPlay is given', () => {
    const inline = render(<LightboxV4 items={[VIDEO]} index={0} onClose={jest.fn()} />);
    expect(inline.container.querySelector('video')).toBeTruthy();
    inline.unmount();

    const onPlay = jest.fn();
    const handed = render(
      <LightboxV4 items={[VIDEO]} index={0} onClose={jest.fn()} onPlay={onPlay} />
    );
    expect(handed.container.querySelector('video')).toBeNull();
    fireEvent.click(handed.getByLabelText('Play video'));
    expect(onPlay).toHaveBeenCalledWith(0);
  });

  it('closes on Escape', () => {
    const onClose = jest.fn();
    render(<LightboxV4 items={[IMAGE]} index={0} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('hides the previous control on the first item unless it loops', () => {
    const first = render(
      <LightboxV4 items={[IMAGE, VIDEO]} index={0} onClose={jest.fn()} onPrev={jest.fn()} />
    );
    expect(first.queryByLabelText('Previous')).toBeNull();
    first.unmount();

    const looping = render(
      <LightboxV4 items={[IMAGE, VIDEO]} index={0} onClose={jest.fn()} onPrev={jest.fn()} loop />
    );
    expect(looping.getByLabelText('Previous')).toBeTruthy();
  });
});
