import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { ListingCardV4 } from './ListingCardV4';
import { BadgeV4 } from '../primitives/BadgeV4';

const LIGHT = compileTheme(SEED_LIGHT).light;
const SPACING = compileTheme(SEED_LIGHT).spacing;

/** Flatten a possibly-nested RN `style` into one object. */
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

const fillsOf = (root: ReactTestInstance): unknown[] =>
  root.findAll((n) => n.props?.style !== undefined).map((n) => flat(n.props.style).backgroundColor);

describe('ListingCardV4 (native)', () => {
  // ── §4.2 + the ProductCardV4 anatomy ───────────────────────────────

  it('paints `card`, not the page colour', () => {
    const { UNSAFE_root } = renderThemed(
      <ListingCardV4 title="Vintage film camera" priceCents={12500} />,
      SEED_LIGHT
    );
    expect(fillsOf(UNSAFE_root)).toContain(LIGHT.card);
    expect(fillsOf(UNSAFE_root)).not.toContain(LIGHT.surface);
  });

  it('leads with the title and puts the price beneath it, as `ProductCardV4` does', () => {
    const { UNSAFE_root } = renderThemed(
      <ListingCardV4 title="Vintage film camera" priceCents={12500} />,
      SEED_LIGHT
    );
    const strings = UNSAFE_root
      .findAllByType(Text)
      .map((n) => (typeof n.props.children === 'string' ? n.props.children : ''))
      .filter(Boolean);
    expect(strings.indexOf('Vintage film camera')).toBeLessThan(strings.indexOf('$125.00'));
  });

  it('caps the title at two lines', () => {
    const { getByText } = renderThemed(
      <ListingCardV4 title="A very long listing title" priceCents={1} />,
      SEED_LIGHT
    );
    expect(getByText('A very long listing title').props.numberOfLines).toBe(2);
  });

  it('draws the price through `PriceTagV4` — nothing here formats a number', () => {
    const { getByText, getByLabelText } = renderThemed(
      <ListingCardV4 title="Camera" priceCents={12500} compareAtCents={19900} />,
      SEED_LIGHT
    );
    expect(getByText('$125.00')).toBeTruthy();
    // The compare-at is announced rather than only struck through.
    expect(getByLabelText('Was $199.00')).toBeTruthy();
  });

  // ── the new props ──────────────────────────────────────────────────

  it('`aspect` names the same four ratios `ProductCardV4` does, and defaults per variant', () => {
    const ratioOf = (ui: React.ReactElement): unknown =>
      flat(renderThemed(ui, SEED_LIGHT).getByTestId('xen-v4-listing-media').props.style).aspectRatio;
    expect(ratioOf(<ListingCardV4 title="C" priceCents={1} />)).toBeCloseTo(4 / 5);
    expect(ratioOf(<ListingCardV4 title="C" priceCents={1} variant="featured" />)).toBeCloseTo(16 / 9);
    expect(ratioOf(<ListingCardV4 title="C" priceCents={1} variant="list" />)).toBeCloseTo(1);
    expect(ratioOf(<ListingCardV4 title="C" priceCents={1} aspect="3:4" />)).toBeCloseTo(3 / 4);
  });

  it('`raised` is on by default and can be turned off (§4.6)', () => {
    const shadowsOf = (root: ReactTestInstance): unknown[] =>
      root.findAll((n) => n.props?.style !== undefined).map((n) => flat(n.props.style).shadowOpacity);
    const on = renderThemed(<ListingCardV4 title="C" priceCents={1} />, SEED_LIGHT);
    const off = renderThemed(<ListingCardV4 title="C" priceCents={1} raised={false} />, SEED_LIGHT);
    expect(shadowsOf(on.UNSAFE_root).some((s) => typeof s === 'number')).toBe(true);
    expect(shadowsOf(off.UNSAFE_root).some((s) => typeof s === 'number')).toBe(false);
  });

  it('`formatMoney` reaches both the tag and the accessible name', () => {
    const money = (cents: number): string => `${cents} minor units`;
    const { getByText, getByLabelText } = renderThemed(
      <ListingCardV4 title="Camera" priceCents={12500} formatMoney={money} onPress={() => {}} />,
      SEED_LIGHT
    );
    expect(getByText('12500 minor units')).toBeTruthy();
    expect(getByLabelText('Camera, 12500 minor units')).toBeTruthy();
  });

  it('`badge` fills the one badge slot and REPLACES the condition chip', () => {
    const { getByText, queryByTestId } = renderThemed(
      <ListingCardV4
        title="C"
        priceCents={1}
        condition="used"
        badge={<BadgeV4>Sold</BadgeV4>}
      />,
      SEED_LIGHT
    );
    expect(getByText('Sold')).toBeTruthy();
    expect(queryByTestId('xen-v4-condition-badge-used')).toBeNull();
  });

  it('the default badge is a `ConditionBadgeV4`', () => {
    const { queryByTestId } = renderThemed(
      <ListingCardV4 title="C" priceCents={1} condition="refurb" />,
      SEED_LIGHT
    );
    expect(queryByTestId('xen-v4-condition-badge-refurb')).not.toBeNull();
  });

  // ── the empty case ─────────────────────────────────────────────────

  it('renders nothing without a title (§4.5)', () => {
    const { toJSON } = renderThemed(<ListingCardV4 title="" priceCents={100} />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('with no photo it draws the same generated plate `ProductCardV4` falls back to', () => {
    const { getByTestId } = renderThemed(
      <ListingCardV4 title="Vintage camera" priceCents={1} />,
      SEED_LIGHT
    );
    const media = getByTestId('xen-v4-listing-media');
    // The well is `muted`, not a neutral ramp step…
    expect(flat(media.props.style).backgroundColor).toBe(LIGHT.muted);
    // …and the plate is on it.
    // The plate has no testID of its own; it identifies itself by being the
    // element hidden from the accessibility tree (a placeholder, not a picture
    // of the item), which is exactly the contract `ProductCardV4` relies on.
    expect(
      media.findAll((n) => n.props?.importantForAccessibility === 'no-hide-descendants').length
    ).toBeGreaterThan(0);
  });

  it('`loading` is a skeleton at the card’s footprint, not the sentence "Loading listing…"', () => {
    const { queryByText } = renderThemed(
      <ListingCardV4 title="C" priceCents={100} loading />,
      SEED_LIGHT
    );
    expect(queryByText(/Loading/)).toBeNull();
    expect(queryByText('$1.00')).toBeNull();
  });

  // ── the watch chip ─────────────────────────────────────────────────

  it('the watch chip clears the 44 tap floor and never navigates', () => {
    const onPress = jest.fn();
    const onToggleWatch = jest.fn();
    const { getByLabelText } = renderThemed(
      <ListingCardV4
        title="Camera"
        priceCents={100}
        onPress={onPress}
        onToggleWatch={onToggleWatch}
      />,
      SEED_LIGHT
    );
    const chip = getByLabelText('Watch Camera');
    const box = flat(chip.props.style);
    // 44, composed as `2xl - xs` rather than typed.
    expect(box.width).toBe(SPACING['2xl'] - SPACING.xs);
    expect(box.height).toBe(SPACING['2xl'] - SPACING.xs);
    fireEvent.press(chip);
    expect(onToggleWatch).toHaveBeenCalledWith(true);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('a watched listing is emphasis, never `danger` (rule 3)', () => {
    const { getByLabelText, UNSAFE_root } = renderThemed(
      <ListingCardV4 title="Camera" priceCents={100} watched onToggleWatch={() => {}} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Unwatch Camera').props.accessibilityState.selected).toBe(true);
    const inks = UNSAFE_root
      .findAll((n) => n.props?.style !== undefined)
      .map((n) => flat(n.props.style).color);
    expect(inks).not.toContain(LIGHT.danger);
    expect(inks).toContain(LIGHT.primary);
  });

  // ── the accessible label ───────────────────────────────────────────

  it('announces the condition in words, not as the database slug', () => {
    const { getByLabelText } = renderThemed(
      <ListingCardV4 title="Camera" priceCents={12500} condition="like-new" onPress={() => {}} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Camera, $125.00, Like New')).toBeTruthy();
  });

  it('fires onPress from the card body', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ListingCardV4 title="Camera" priceCents={100} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Camera, $1.00'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
