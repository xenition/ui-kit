import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { WatchlistRowV4 } from './WatchlistRowV4';

const theme = compileTheme(SEED_LIGHT);
const TWO_LINE = theme.spacing['2xl'] + theme.spacing.lg;
/** The 44 leading slot — `2xl - xs`, the nav line's `minTap`. */
const LEADING = theme.spacing['2xl'] - theme.spacing.xs;
const HEART = resolveIconGlyph('heart');

function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

/** The row's own box — the only node carrying the two-line floor. */
function rowBox(root: ReactTestInstance): Record<string, unknown> {
  return (
    root
      .findAll((n) => typeof n.props?.style === 'object' && n.props?.style !== null)
      .map((n) => flat(n.props.style))
      .find((s) => s.minHeight === TWO_LINE) ?? {}
  );
}

describe('WatchlistRowV4 (native) — props', () => {
  it('keeps every base prop working', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <WatchlistRowV4
        title="Vintage film camera"
        priceCents={12500}
        compareAtCents={15000}
        condition="used"
        imageUrl="https://example.test/a.jpg"
        onPress={onPress}
        onToggleWatch={jest.fn()}
      />,
      SEED_LIGHT
    );
    expect(getByText('Vintage film camera')).toBeTruthy();
    expect(getByText('$125.00')).toBeTruthy();
    // `ConditionBadgeV4` sets its glyph and its word in one run, so the
    // accessible name is the honest assertion here.
    expect(getByLabelText('Used')).toBeTruthy();

    fireEvent.press(getByLabelText('Vintage film camera'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('keeps the watch toggle out of the row press target', () => {
    const onPress = jest.fn();
    const onToggleWatch = jest.fn();
    const { getByTestId } = renderThemed(
      <WatchlistRowV4
        title="Camera"
        priceCents={100}
        onPress={onPress}
        onToggleWatch={onToggleWatch}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByTestId('xen-watch-toggle'));
    expect(onToggleWatch).toHaveBeenCalledWith(false);
    // Un-watching must not also navigate.
    expect(onPress).not.toHaveBeenCalled();
  });

  it('placeholderIcon (new) replaces the "No photo" caption', () => {
    const { queryByText, getByText } = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={100} placeholderIcon="camera" />,
      SEED_LIGHT
    );
    expect(queryByText('No photo')).toBeNull();
    expect(getByText(resolveIconGlyph('camera'), { includeHiddenElements: true })).toBeTruthy();
  });

  it('selected (new) paints the row family selected ground', () => {
    const plain = renderThemed(<WatchlistRowV4 title="Camera" priceCents={100} />, SEED_LIGHT);
    expect(rowBox(plain.UNSAFE_root).backgroundColor).toBe('transparent');

    const chosen = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={100} selected />,
      SEED_LIGHT
    );
    expect(rowBox(chosen.UNSAFE_root).backgroundColor).toBe(theme.light.selected);
  });
});

describe('WatchlistRowV4 (native) — the design line', () => {
  it('takes the row metric and composes PriceTagV4 rather than drawing a price', () => {
    const { UNSAFE_root, getByText, getByLabelText } = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={12500} compareAtCents={15000} />,
      SEED_LIGHT
    );
    expect(rowBox(UNSAFE_root).minHeight).toBe(TWO_LINE);
    expect(rowBox(UNSAFE_root).paddingHorizontal).toBe(theme.spacing.md);
    // PriceTagV4's own tabular figures and its "Was …" announcement.
    expect(flat(getByText('$125.00').props.style).fontVariant).toEqual(['tabular-nums']);
    expect(getByLabelText('Was $150.00')).toBeTruthy();
  });

  it('signals watched by shape, not by the error tone (rules 3 and 6)', () => {
    const watched = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={100} onToggleWatch={jest.fn()} watched />,
      SEED_LIGHT
    );
    const filled = watched.getByText(HEART, { includeHiddenElements: true });
    expect(flat(filled.props.style).color).toBe(theme.light.primary);
    expect(flat(filled.props.style).color).not.toBe(theme.light.danger);

    const unwatched = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={100} onToggleWatch={jest.fn()} watched={false} />,
      SEED_LIGHT
    );
    // A hollow heart, so the state survives without colour.
    expect(unwatched.getByText('♡', { includeHiddenElements: true })).toBeTruthy();
  });

  it('clears the 44 tap floor on the toggle', () => {
    const { getByTestId } = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={100} onToggleWatch={jest.fn()} />,
      SEED_LIGHT
    );
    const style = flat(getByTestId('xen-watch-toggle').props.style);
    expect(style.width).toBe(LEADING);
    expect(style.height).toBe(LEADING);
  });

  it('says "Sold" with a mark and a word, and does not dim the price', () => {
    const { UNSAFE_root, getByText } = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={12500} ended />,
      SEED_LIGHT
    );
    expect(getByText('Sold')).toBeTruthy();
    expect(getByText(resolveIconGlyph('close'), { includeHiddenElements: true })).toBeTruthy();
    expect(rowBox(UNSAFE_root).opacity).toBeUndefined();
    expect(getByText('$125.00')).toBeTruthy();
  });
});

describe('WatchlistRowV4 (native) — the empty case and the label', () => {
  it('renders nothing for an untitled listing', () => {
    const { toJSON } = renderThemed(<WatchlistRowV4 title="  " priceCents={100} />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('survives having no image, no condition, no toggle and no press', () => {
    const { getByText, queryByTestId } = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={100} />,
      SEED_LIGHT
    );
    expect(getByText('Camera')).toBeTruthy();
    expect(queryByTestId('xen-watch-toggle')).toBeNull();
  });

  it('names the row and both directions of the toggle', () => {
    const watched = renderThemed(
      <WatchlistRowV4
        title="Camera"
        priceCents={100}
        onPress={jest.fn()}
        onToggleWatch={jest.fn()}
      />,
      SEED_LIGHT
    );
    expect(watched.getByLabelText('Camera')).toBeTruthy();
    expect(watched.getByLabelText('Remove Camera from watchlist')).toBeTruthy();

    const unwatched = renderThemed(
      <WatchlistRowV4 title="Camera" priceCents={100} watched={false} onToggleWatch={jest.fn()} />,
      SEED_LIGHT
    );
    expect(unwatched.getByLabelText('Add Camera to watchlist')).toBeTruthy();
  });
});
