import * as React from 'react';
import { Modal } from 'react-native';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { AccessibilityInfo } from 'react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { Gallery } from './Gallery';
import { Lightbox } from './Lightbox';
import { MediaFigure } from './MediaFigure';
import type { MediaItem } from '../../media/types';

const items: MediaItem[] = [
  { url: 'https://x/1.jpg', alt: 'Photo one', width: 800, height: 600 },
  { url: 'https://x/2.jpg', alt: 'Photo two', width: 600, height: 800 },
  { url: 'https://x/3.jpg', alt: 'Photo three', caption: 'Third', width: 400, height: 400 },
];

describe('Gallery (native)', () => {
  it('renders N tiles through the FlatList under both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { getByLabelText } = renderThemed(
        <Gallery items={items} onOpen={() => undefined} scrollEnabled={false} />,
        seed
      );
      // Each tile is a labeled button (the item alt).
      expect(getByLabelText('Photo one')).toBeTruthy();
      expect(getByLabelText('Photo two')).toBeTruthy();
      expect(getByLabelText('Photo three')).toBeTruthy();
    });
  });

  it('fires onOpen with the tile index', () => {
    const onOpen = jest.fn();
    const { getByLabelText } = renderThemed(
      <Gallery items={items} onOpen={onOpen} scrollEnabled={false} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Photo two'));
    expect(onOpen).toHaveBeenCalledWith(1);
  });

  it('renders non-interactive tiles when onOpen is omitted', () => {
    const { queryByLabelText } = renderThemed(
      <Gallery items={items} scrollEnabled={false} />,
      SEED_LIGHT
    );
    // Without onOpen there is no per-tile button label ("Open item …").
    expect(queryByLabelText(/^Open item/)).toBeNull();
  });
});

describe('Lightbox (native)', () => {
  it('renders nothing when index is null', () => {
    const { UNSAFE_queryByType } = renderThemed(
      <Lightbox items={items} index={null} onClose={() => undefined} />,
      SEED_LIGHT
    );
    expect(UNSAFE_queryByType(Modal)).toBeNull();
  });

  it('renders nothing when index is out of range', () => {
    const { UNSAFE_queryByType } = renderThemed(
      <Lightbox items={items} index={9} onClose={() => undefined} />,
      SEED_LIGHT
    );
    expect(UNSAFE_queryByType(Modal)).toBeNull();
  });

  it('renders the open item with a counter', () => {
    const { getByTestId } = renderThemed(
      <Lightbox items={items} index={0} onClose={() => undefined} />,
      SEED_DARK
    );
    expect(getByTestId('xen-lightbox-counter')).toBeTruthy();
  });

  it('fires onPrev / onNext from the controls', () => {
    const onPrev = jest.fn();
    const onNext = jest.fn();
    const { getByLabelText } = renderThemed(
      <Lightbox items={items} index={1} onClose={() => undefined} onPrev={onPrev} onNext={onNext} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Previous'));
    fireEvent.press(getByLabelText('Next'));
    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('hides prev at the first item and next at the last (no loop)', () => {
    const first = renderThemed(
      <Lightbox items={items} index={0} onClose={() => undefined} onPrev={() => undefined} onNext={() => undefined} />,
      SEED_LIGHT
    );
    expect(first.queryByLabelText('Previous')).toBeNull();
    expect(first.queryByLabelText('Next')).toBeTruthy();

    const last = renderThemed(
      <Lightbox items={items} index={2} onClose={() => undefined} onPrev={() => undefined} onNext={() => undefined} />,
      SEED_LIGHT
    );
    expect(last.queryByLabelText('Next')).toBeNull();
    expect(last.queryByLabelText('Previous')).toBeTruthy();
  });

  it('shows both controls at the ends when loop is set', () => {
    const { queryByLabelText } = renderThemed(
      <Lightbox items={items} index={0} loop onClose={() => undefined} onPrev={() => undefined} onNext={() => undefined} />,
      SEED_LIGHT
    );
    expect(queryByLabelText('Previous')).toBeTruthy();
    expect(queryByLabelText('Next')).toBeTruthy();
  });

  it('closes via the close button', () => {
    const onClose = jest.fn();
    const { getByLabelText } = renderThemed(
      <Lightbox items={items} index={0} onClose={onClose} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('routes the Android hardware back button to onClose (onRequestClose)', () => {
    const onClose = jest.fn();
    const { UNSAFE_getByType } = renderThemed(
      <Lightbox items={items} index={0} onClose={onClose} />,
      SEED_LIGHT
    );
    // Android back dispatches the Modal's onRequestClose.
    UNSAFE_getByType(Modal).props.onRequestClose();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('animates by default and drops the fade under reduced motion', async () => {
    const on = renderThemed(<Lightbox items={items} index={0} onClose={() => undefined} />, SEED_LIGHT);
    expect(on.UNSAFE_getByType(Modal).props.animationType).toBe('fade');

    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockResolvedValue(true);
    const off = renderThemed(<Lightbox items={items} index={0} onClose={() => undefined} />, SEED_LIGHT);
    await waitFor(() =>
      expect(off.UNSAFE_getByType(Modal).props.animationType).toBe('none')
    );
  });

  it('honors a custom accessible label', () => {
    const { getByLabelText } = renderThemed(
      <Lightbox items={items} index={0} onClose={() => undefined} label="Album viewer" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Album viewer')).toBeTruthy();
  });
});

describe('MediaFigure (native)', () => {
  it('renders the caption and fires onActivate', () => {
    const onActivate = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <MediaFigure item={items[2]!} onActivate={onActivate} />,
      SEED_LIGHT
    );
    expect(getByText('Third')).toBeTruthy();
    fireEvent.press(getByLabelText('Photo three'));
    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  it('renders without a press handler when onActivate is omitted', () => {
    const { queryByText } = renderThemed(<MediaFigure item={items[0]!} />, SEED_DARK);
    // No caption on item 0 → nothing extra rendered, just the image box.
    expect(queryByText('Third')).toBeNull();
  });
});

describe('token purity (native media, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <Gallery items={items} onOpen={() => undefined} scrollEnabled={false} />
          <MediaFigure item={items[2]!} onActivate={() => undefined} />
          <Lightbox items={items} index={0} onClose={() => undefined} onNext={() => undefined} />
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
