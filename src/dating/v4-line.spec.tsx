/** @jest-environment jsdom */
/**
 * The **V4 dating line** (web) — the scrim pass, the deck position, and the
 * finding this module exists for: pass was irreversible.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import {
  PHOTO_INK,
  PHOTO_SCRIM,
  PHOTO_SCRIM_STRONG,
  canRewind,
  deckPosition,
} from './deck-v4';
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

describe('SwipeDeckV4', () => {
  it('emits a decision once, not twice', () => {
    // The base fired its callbacks from inside a `setIndex` updater. Updaters
    // must be pure and StrictMode invokes them twice, so every like and pass
    // was emitted twice.
    const onSwipe = jest.fn();
    const { getByLabelText } = render(
      <React.StrictMode>
        <SwipeDeckV4 profiles={PROFILES} onSwipe={onSwipe} />
      </React.StrictMode>
    );
    // Exact: 'Super like' also matches a loose /like/i.
    fireEvent.click(getByLabelText('Like'));
    expect(onSwipe).toHaveBeenCalledTimes(1);
  });

  it('offers an undo when one has been given', () => {
    const onRewind = jest.fn();
    const { getByLabelText } = render(
      <SwipeDeckV4 profiles={PROFILES} onRewind={onRewind} actions={['rewind', 'pass', 'like']} />
    );
    expect(getByLabelText(/undo/i)).toBeTruthy();
  });
});

describe('PhotoCarouselV4', () => {
  it('draws next and previous controls a user can actually see', () => {
    // Both twins shipped two <button>s with no children — invisible halves of
    // the frame, with no focus ring.
    const { getByLabelText } = render(
      <PhotoCarouselV4 photos={[{ uri: 'a.jpg', alt: 'One' }, { uri: 'b.jpg', alt: 'Two' }]} />
    );
    expect(getByLabelText('Next photo')).toBeTruthy();
    expect(getByLabelText('Previous photo')).toBeTruthy();
  });
});
