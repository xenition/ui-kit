import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { SellerCardV4 } from './SellerCardV4';

const LIGHT = compileTheme(SEED_LIGHT).light;

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

describe('SellerCardV4 (native)', () => {
  // ── §4.2 ───────────────────────────────────────────────────────────

  it('paints `card`, not the page colour', () => {
    const { UNSAFE_root } = renderThemed(<SellerCardV4 name="Nadia Okonkwo" />, SEED_LIGHT);
    expect(fillsOf(UNSAFE_root)).toContain(LIGHT.card);
  });

  it('the `inline` variant keeps no container of its own (§4.3)', () => {
    const { queryByTestId } = renderThemed(
      <SellerCardV4 name="Nadia Okonkwo" variant="inline" />,
      SEED_LIGHT
    );
    expect(queryByTestId('xen-v4-seller-card')).toBeNull();
    expect(queryByTestId('xen-v4-seller-card-inline')).not.toBeNull();
  });

  // ── rule 6: a number AND stars AND a count ─────────────────────────

  it('shows the rating as a number, as stars, and as a count — never stars alone', () => {
    const { getByText, getByLabelText } = renderThemed(
      <SellerCardV4 name="Nadia Okonkwo" rating={4.83} reviewCount={1204} />,
      SEED_LIGHT
    );
    expect(getByText('4.8')).toBeTruthy();
    expect(getByLabelText('4.83 out of 5 stars')).toBeTruthy();
    expect(getByText('1,204 reviews')).toBeTruthy();
  });

  it('singularises one review', () => {
    const { getByText } = renderThemed(
      <SellerCardV4 name="Ari" rating={5} reviewCount={1} />,
      SEED_LIGHT
    );
    expect(getByText('1 review')).toBeTruthy();
  });

  it('a rating with no count still says something, rather than showing bare stars', () => {
    const { getByText } = renderThemed(<SellerCardV4 name="Ari" rating={4.2} />, SEED_LIGHT);
    expect(getByText('No ratings yet')).toBeTruthy();
  });

  // ── rule 6: verified is a mark AND a word ──────────────────────────

  it('verified ships a tick and a word, announces only the words, and is `primary`', () => {
    const { getByLabelText, getByText, UNSAFE_root } = renderThemed(
      <SellerCardV4 name="Ari" verified />,
      SEED_LIGHT
    );
    expect(getByLabelText('Verified seller')).toBeTruthy();
    expect(getByText('✓ Verified')).toBeTruthy();
    // The base painted the chip `accent`; the twins agree on `primary` now.
    expect(fillsOf(UNSAFE_root).some((f) => f === LIGHT.accent)).toBe(false);
  });

  it('`verifiedLabel` is translatable but cannot be emptied into a bare tick', () => {
    expect(
      renderThemed(
        <SellerCardV4 name="Ari" verified verifiedLabel="ID checked" />,
        SEED_LIGHT
      ).getByText('✓ ID checked')
    ).toBeTruthy();
    expect(
      renderThemed(<SellerCardV4 name="Ari" verified verifiedLabel="" />, SEED_LIGHT).getByText(
        '✓ Verified'
      )
    ).toBeTruthy();
  });

  // ── the new props ──────────────────────────────────────────────────

  it('`raised` is on by default for the on-page card and can be turned off (§4.6)', () => {
    const shadowsOf = (root: ReactTestInstance): unknown[] =>
      root.findAll((n) => n.props?.style !== undefined).map((n) => flat(n.props.style).shadowOpacity);
    const on = renderThemed(<SellerCardV4 name="Ari" />, SEED_LIGHT);
    const off = renderThemed(<SellerCardV4 name="Ari" raised={false} />, SEED_LIGHT);
    expect(shadowsOf(on.UNSAFE_root).some((s) => typeof s === 'number')).toBe(true);
    expect(shadowsOf(off.UNSAFE_root).some((s) => typeof s === 'number')).toBe(false);
  });

  it('`emptyRatingLabel` is the caller’s words', () => {
    const { getByText } = renderThemed(
      <SellerCardV4 name="Ari" emptyRatingLabel="New seller" />,
      SEED_LIGHT
    );
    expect(getByText('New seller')).toBeTruthy();
  });

  // ── the empty case ─────────────────────────────────────────────────

  it('renders nothing without a name (§4.5)', () => {
    const { toJSON } = renderThemed(<SellerCardV4 name="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('a seller with no sales and no location draws no empty meta line', () => {
    const { queryByText } = renderThemed(<SellerCardV4 name="Ari" />, SEED_LIGHT);
    expect(queryByText(/·/)).toBeNull();
  });

  // ── the accessible label ───────────────────────────────────────────

  it('names the press target with everything a buyer is deciding on', () => {
    const { getByLabelText } = renderThemed(
      <SellerCardV4 name="Nadia Okonkwo" verified rating={4.83} reviewCount={1204} onPress={() => {}} />,
      SEED_LIGHT
    );
    expect(
      getByLabelText('Nadia Okonkwo, verified seller, rated 4.8 of 5, 1,204 reviews')
    ).toBeTruthy();
  });

  it('contacting never also navigates', () => {
    const onPress = jest.fn();
    const onContact = jest.fn();
    const { getByText, getByTestId } = renderThemed(
      <SellerCardV4 name="Ari" onPress={onPress} onContact={onContact} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
    expect(onPress).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('xen-v4-seller-identity'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('press feedback is the state layer, not an opacity dimmer', () => {
    const { getByTestId, UNSAFE_root } = renderThemed(
      <SellerCardV4 name="Ari" onPress={() => {}} />,
      SEED_LIGHT
    );
    fireEvent(getByTestId('xen-v4-seller-identity'), 'pressIn');
    const opacities = UNSAFE_root
      .findAll((n) => n.props?.style !== undefined)
      .map((n) => flat(n.props.style).opacity)
      .filter((o) => o !== undefined);
    expect(opacities).toHaveLength(0);
  });
});
