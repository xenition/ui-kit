/** @jest-environment jsdom */
/**
 * Media components: render smoke under BOTH compiled seeds, token-purity sweep
 * (inline styles + injected sheets), Gallery grid/masonry + lazy + onOpen,
 * MediaFigure caption + aspect box, and the Lightbox a11y contract (aria-modal,
 * focus trap, Esc/←/→ keyboard, reduced-motion-safe backdrop).
 */
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import { Gallery } from './Gallery';
import { Lightbox } from './Lightbox';
import { MediaFigure } from './MediaFigure';
import type { MediaItem } from './types';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const SEED_LIGHT: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'light',
};
const SEED_DARK: ThemeSeed = {
  primary: '#EA580C',
  accent: '#D4A24E',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'sharp',
  mode: 'dark',
};

const items: MediaItem[] = [
  { url: '/a.jpg', alt: 'Alpha', caption: 'First', width: 800, height: 600 },
  { url: '/b.jpg', alt: 'Beta', width: 600, height: 900 },
  { url: '/c.mp4', kind: 'video', poster: '/c.jpg', caption: 'Clip' },
];

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
const injectedSheets = (): string =>
  Array.from(document.querySelectorAll<HTMLStyleElement>('style[id^="xen-"]'))
    .map((el) => el.textContent ?? '')
    .join('\n');

beforeEach(() => {
  installMatchMedia(false);
});

describe.each([
  ['light seed', SEED_LIGHT, 'light'],
  ['dark seed', SEED_DARK, 'dark'],
])('media under the %s', (_name, seed, mode) => {
  it('renders gallery + figure + open lightbox with the compiled theme', () => {
    const { container } = render(
      <XenitionUIProvider theme={seed}>
        <Gallery items={items} onOpen={() => undefined} />
        <MediaFigure item={items[0]!} />
        <Lightbox items={items} index={0} onClose={() => undefined} />
      </XenitionUIProvider>
    );
    expect(container.querySelector(`[data-theme="${mode}"]`)).not.toBeNull();
    expect(container.querySelector('[data-xen-gallery="grid"]')).not.toBeNull();
    expect(container.querySelector('[data-xen-media-figure]')).not.toBeNull();
    expect(container.querySelector('[data-xen-lightbox]')).not.toBeNull();
  });

  it('stays token-pure: no hex in inline styles or injected sheets', () => {
    const { container } = render(
      <XenitionUIProvider theme={seed}>
        <Gallery items={items} variant="masonry" onOpen={() => undefined} />
        <Lightbox items={items} index={0} onClose={() => undefined} />
      </XenitionUIProvider>
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    const sheets = injectedSheets();
    expect(sheets.length).toBeGreaterThan(0);
    expect(sheets).not.toMatch(HEX_LITERAL);
  });
});

describe('Gallery', () => {
  it('lazy-loads images and fires onOpen(index) on tile activation', () => {
    const onOpen = jest.fn();
    const { container } = render(<Gallery items={items} onOpen={onOpen} />);
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBeGreaterThan(0);
    expect(Array.from(imgs).every((i) => i.getAttribute('loading') === 'lazy')).toBe(true);
    const tiles = container.querySelectorAll('[data-xen-gallery-item] button');
    fireEvent.click(tiles[1]!);
    expect(onOpen).toHaveBeenCalledWith(1);
  });

  it('reserves per-item aspect ratio in the masonry variant', () => {
    const { container } = render(<Gallery items={items} variant="masonry" />);
    expect(container.querySelector('[data-xen-gallery="masonry"]')).not.toBeNull();
    const boxed = Array.from(container.querySelectorAll<HTMLElement>('[style]')).find((el) =>
      (el.getAttribute('style') ?? '').includes('--xen-aspect')
    );
    expect(boxed?.getAttribute('style')).toContain('800 / 600');
  });

  it('renders a video item with a poster', () => {
    const { container } = render(<Gallery items={items} />);
    const video = container.querySelector('video');
    expect(video?.getAttribute('poster')).toBe('/c.jpg');
  });
});

describe('MediaFigure', () => {
  it('renders the caption and reserves the aspect ratio box', () => {
    const { container, getByText } = render(<MediaFigure item={items[0]!} />);
    expect(getByText('First').tagName).toBe('FIGCAPTION');
    const box = container.querySelector<HTMLElement>('[style]');
    expect(box?.getAttribute('style')).toContain('--xen-aspect');
    expect(box?.getAttribute('style')).toContain('800 / 600');
  });

  it('exposes an activate button when onActivate is given', () => {
    const onActivate = jest.fn();
    const { getByRole } = render(<MediaFigure item={items[1]!} onActivate={onActivate} />);
    fireEvent.click(getByRole('button', { name: 'Beta' }));
    expect(onActivate).toHaveBeenCalled();
  });
});

describe('Lightbox', () => {
  it('renders nothing when index is null or out of range', () => {
    const { container, rerender } = render(
      <Lightbox items={items} index={null} onClose={() => undefined} />
    );
    expect(container.querySelector('[data-xen-lightbox]')).toBeNull();
    rerender(<Lightbox items={items} index={9} onClose={() => undefined} />);
    expect(container.querySelector('[data-xen-lightbox]')).toBeNull();
  });

  it('is an aria-modal dialog with a counter and caption', () => {
    const { container, getByText } = render(
      <Lightbox items={items} index={0} onClose={() => undefined} />
    );
    const dialog = container.querySelector('[data-xen-lightbox]')!;
    expect(dialog.getAttribute('role')).toBe('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(container.querySelector('[data-xen-lightbox-counter]')?.textContent).toBe('1 / 3');
    expect(getByText('First')).toBeTruthy();
  });

  it('moves focus into the dialog on open and restores it on close', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    const { rerender, container } = render(
      <Lightbox items={items} index={1} onClose={() => undefined} />
    );
    expect(container.contains(document.activeElement)).toBe(true);

    rerender(<Lightbox items={items} index={null} onClose={() => undefined} />);
    expect(document.activeElement).toBe(trigger);
    document.body.removeChild(trigger);
  });

  it('closes on Escape and navigates with arrow keys', () => {
    const onClose = jest.fn();
    const onPrev = jest.fn();
    const onNext = jest.fn();
    render(
      <Lightbox items={items} index={1} onClose={onClose} onPrev={onPrev} onNext={onNext} />
    );
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(onNext).toHaveBeenCalled();
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(onPrev).toHaveBeenCalled();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('disables navigation past the ends unless looping', () => {
    const onPrev = jest.fn();
    const onNext = jest.fn();
    const { container, rerender } = render(
      <Lightbox items={items} index={0} onClose={() => undefined} onPrev={onPrev} onNext={onNext} />
    );
    // At index 0 there is no prev button and ArrowLeft is a no-op.
    expect(container.querySelector('[aria-label="Previous"]')).toBeNull();
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(onPrev).not.toHaveBeenCalled();

    // At the last index there is no next button.
    rerender(
      <Lightbox items={items} index={2} onClose={() => undefined} onPrev={onPrev} onNext={onNext} />
    );
    expect(container.querySelector('[aria-label="Next"]')).toBeNull();
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(onNext).not.toHaveBeenCalled();
  });

  it('closes when the backdrop itself is clicked', () => {
    const onClose = jest.fn();
    const { container } = render(<Lightbox items={items} index={0} onClose={onClose} />);
    const dialog = container.querySelector<HTMLElement>('[data-xen-lightbox]')!;
    fireEvent.mouseDown(dialog);
    expect(onClose).toHaveBeenCalled();
  });

  it('injects a reduced-motion-safe, token-styled backdrop sheet', () => {
    render(<Lightbox items={items} index={0} onClose={() => undefined} />);
    const sheet = document.getElementById('xen-lightbox-styles')?.textContent ?? '';
    expect(sheet).toContain('color-mix(in srgb, var(--xen-neutral-950)');
    expect(sheet).toContain('@media (prefers-reduced-motion: reduce)');
    expect(sheet).not.toMatch(HEX_LITERAL);
  });
});
