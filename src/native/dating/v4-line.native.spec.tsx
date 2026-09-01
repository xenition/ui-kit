/**
 * The **V4 dating line** (native) — the twin of `dating/v4-line.spec.tsx`. The
 * scrim and the deck position are the same pure module, so both are pinned
 * once and hold on both sides.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import {
  PHOTO_INK,
  PHOTO_SCRIM,
  PHOTO_SCRIM_STRONG,
  canRewind,
  deckPosition,
} from '../../dating/deck-v4';
import { PhotoCarouselV4 } from './PhotoCarouselV4';
import { SwipeDeckV4 } from './SwipeDeckV4';

describe('deck-v4', () => {
  it('pins a photo scrim that does not follow the theme', () => {
    // The finding. Eight sites built a scrim over a *photograph* out of theme
    // slots, and both the web ramp and `onSurface` invert in dark mode — so
    // the bottom of every profile photo washed near-white, taking the white
    // text on it with it. A photo does not follow the scheme.
    expect(PHOTO_SCRIM).toContain('rgba(0, 0, 0');
    expect(PHOTO_SCRIM_STRONG).toContain('rgba(0, 0, 0');
    expect(PHOTO_INK).toBe('#ffffff');
    // Deliberately not tokens: nothing here may resolve through a CSS var.
    expect(PHOTO_SCRIM).not.toContain('var(');
    expect(PHOTO_INK).not.toContain('var(');
  });

  it('speaks the deck position, and clamps a bad index', () => {
    expect(deckPosition(2, 12)).toBe('Profile 3 of 12');
    expect(deckPosition(99, 12)).toBe('Profile 12 of 12');
    expect(deckPosition(-4, 12)).toBe('Profile 1 of 12');
    expect(deckPosition(0, 3, (i, n) => `${i + 1}/${n}`)).toBe('1/3');
  });

  it('knows when there is something to undo', () => {
    // `rewind` was defined by the button row and dropped on the floor by the
    // deck, so pass was irreversible with no way for a caller to fix it.
    expect(canRewind([])).toBe(false);
    expect(canRewind(['a'])).toBe(true);
  });
});

const PROFILES = [
  { id: 'p1', name: 'Ada', age: 34 },
  { id: 'p2', name: 'Priya', age: 31 },
];

describe('SwipeDeckV4 / PhotoCarouselV4', () => {
  it('offers an undo when one has been given', () => {
    const { getByLabelText } = renderThemed(
      <SwipeDeckV4 profiles={PROFILES} onRewind={jest.fn()} actions={['rewind', 'pass', 'like']} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/undo/i)).toBeTruthy();
  });

  it('names every photo, where the base left the native image silent', () => {
    const { getByLabelText } = renderThemed(
      <PhotoCarouselV4 photos={[{ uri: 'a.jpg', alt: 'A portrait' }]} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/A portrait/)).toBeTruthy();
  });
});
