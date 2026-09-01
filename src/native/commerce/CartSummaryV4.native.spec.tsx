import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { formatMoney } from './money';
import { CartSummaryV4 } from './CartSummaryV4';

/** Flatten an RN style prop (array / nested arrays / objects) into one object. */
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

const theme = compileTheme(SEED_LIGHT);
const tokens = toNativeTokens(theme);
const ONE_LINE = tokens.spacing['2xl'] + tokens.spacing.sm; // 56

describe('CartSummaryV4 (native)', () => {
  it('formats every amount through formatMoney, never by hand', () => {
    const { getByText, getByTestId } = renderThemed(
      <CartSummaryV4
        subtotalCents={120450}
        shippingCents={599}
        taxCents={1050}
        totalCents={132099}
      />,
      SEED_LIGHT
    );
    expect(getByText(formatMoney(120450))).toBeTruthy();
    expect(getByText(formatMoney(599))).toBeTruthy();
    expect(getByText(formatMoney(1050))).toBeTruthy();
    expect(getByTestId('xen-cart-total').props.children).toBe(formatMoney(132099));
  });

  it('honours a formatMoney override', () => {
    const { getByTestId } = renderThemed(
      <CartSummaryV4
        subtotalCents={1200}
        totalCents={1200}
        currency="EUR"
        formatMoney={(c, cur) => `${cur} ${c}`}
      />,
      SEED_LIGHT
    );
    expect(getByTestId('xen-cart-total').props.children).toBe('EUR 1200');
  });

  it('keeps EXACTLY one rule, and it sits above the total', () => {
    const { getAllByTestId, getByTestId } = renderThemed(
      <CartSummaryV4
        subtotalCents={1000}
        shippingCents={0}
        taxCents={100}
        discountCents={200}
        totalCents={900}
      />,
      SEED_LIGHT
    );
    expect(getAllByTestId('xen-summary-rule')).toHaveLength(1);
    const rule = flat(getByTestId('xen-summary-rule').props.style);
    expect(rule.height).toBe(1);
    expect(rule.backgroundColor).toBe(theme.light.border);
    // Every row above the total is separated by spacing, not by ink.
    ['subtotal', 'shipping', 'tax', 'discount'].forEach((k) => {
      const s = flat(getByTestId(`xen-summary-row-${k}`).props.style);
      expect(s.borderTopWidth).toBeUndefined();
      expect(s.borderBottomWidth).toBeUndefined();
    });
  });

  it('sets the total one step up the scale, and does NOT tint it', () => {
    const { getByText, getByTestId } = renderThemed(
      <CartSummaryV4 subtotalCents={1000} taxCents={100} totalCents={1100} />,
      SEED_LIGHT
    );
    const total = flat(getByTestId('xen-cart-total').props.style);
    expect(total.fontSize).toBe(theme.typography.scale.lg);
    expect(flat(getByText('Total').props.style).fontSize).toBe(theme.typography.scale.lg);
    // The rows it is derived from stay a step below it.
    expect(flat(getByText(formatMoney(100)).props.style).fontSize).toBe(
      theme.typography.scale.base
    );
    // Not success, not warn, not danger — a total is none of the three.
    expect(total.color).toBe(theme.light.onSurface);
    [theme.light.success, theme.light.warn, theme.light.danger, theme.light.primary].forEach(
      (c) => expect(total.color).not.toBe(c)
    );
  });

  it('sets every figure in tabular numerals — the base did not on this twin', () => {
    const { getByText, getByTestId } = renderThemed(
      <CartSummaryV4 subtotalCents={999} shippingCents={1111} totalCents={2110} />,
      SEED_LIGHT
    );
    expect(flat(getByTestId('xen-cart-total').props.style).fontVariant).toEqual(['tabular-nums']);
    expect(flat(getByText(formatMoney(999)).props.style).fontVariant).toEqual(['tabular-nums']);
    expect(flat(getByText(formatMoney(1111)).props.style).fontVariant).toEqual(['tabular-nums']);
  });

  it('takes the row metric on every line', () => {
    const { getByTestId } = renderThemed(
      <CartSummaryV4 subtotalCents={1000} taxCents={100} totalCents={1100} />,
      SEED_LIGHT
    );
    ['subtotal', 'tax', 'total'].forEach((k) => {
      const s = flat(getByTestId(`xen-summary-row-${k}`).props.style);
      expect(s.minHeight).toBe(ONE_LINE);
      expect(s.paddingHorizontal).toBe(tokens.spacing.md);
      expect(s.alignItems).toBe('baseline');
    });
  });

  it('paints the card ground rather than the page — §1.4', () => {
    const { getByTestId } = renderThemed(
      <CartSummaryV4 subtotalCents={0} totalCents={0} />,
      SEED_LIGHT
    );
    const s = flat(getByTestId('xen-cart-summary').props.style);
    expect(s.backgroundColor).toBe(theme.light.card);
    expect(s.backgroundColor).not.toBe(theme.light.surface);
    // The card pays no horizontal padding — the rows do, so the rule runs flush.
    expect(s.padding).toBe(0);
  });

  it('shows Free rather than $0.00 for free shipping, and hides absent rows', () => {
    const { getByText, queryByTestId } = renderThemed(
      <CartSummaryV4 subtotalCents={1000} shippingCents={0} totalCents={1000} />,
      SEED_LIGHT
    );
    expect(getByText('Free')).toBeTruthy();
    expect(queryByTestId('xen-summary-row-tax')).toBeNull();
    expect(queryByTestId('xen-summary-row-discount')).toBeNull();
  });

  it('a discount is emphasis, not status — no green, no red — §1.3', () => {
    const { getByText } = renderThemed(
      <CartSummaryV4 subtotalCents={2000} discountCents={500} totalCents={1500} />,
      SEED_LIGHT
    );
    const colour = flat(getByText(`−${formatMoney(500)}`).props.style).color;
    expect(colour).toBe(theme.light.onSurface);
    [
      theme.light.success,
      theme.light.successText,
      theme.light.danger,
      theme.light.dangerText,
    ].forEach((c) => expect(colour).not.toBe(c));
  });

  it('hides the discount row when there is nothing off', () => {
    const { queryByTestId } = renderThemed(
      <CartSummaryV4 subtotalCents={2000} discountCents={0} totalCents={2000} />,
      SEED_LIGHT
    );
    expect(queryByTestId('xen-summary-row-discount')).toBeNull();
  });

  it('NEW: itemCount pluralises the subtotal label', () => {
    const three = renderThemed(
      <CartSummaryV4 subtotalCents={100} totalCents={100} itemCount={3} />,
      SEED_LIGHT
    );
    expect(three.getByText('Subtotal (3 items)')).toBeTruthy();

    const one = renderThemed(
      <CartSummaryV4 subtotalCents={100} totalCents={100} itemCount={1} />,
      SEED_LIGHT
    );
    expect(one.getByText('Subtotal (1 item)')).toBeTruthy();

    const none = renderThemed(
      <CartSummaryV4 subtotalCents={100} totalCents={100} />,
      SEED_LIGHT
    );
    expect(none.getByText('Subtotal')).toBeTruthy();
  });

  it('NEW: note renders under the total, quietly', () => {
    const { getByText, getByTestId } = renderThemed(
      <CartSummaryV4
        subtotalCents={100}
        totalCents={100}
        note="Taxes and shipping calculated at checkout"
      />,
      SEED_LIGHT
    );
    expect(getByTestId('xen-summary-note')).toBeTruthy();
    expect(flat(getByText('Taxes and shipping calculated at checkout').props.style).color).toBe(
      theme.light.mutedText
    );
  });

  it('renders the checkout button only when it has somewhere to go', () => {
    const onCheckout = jest.fn();
    const { getByText } = renderThemed(
      <CartSummaryV4
        subtotalCents={100}
        totalCents={100}
        onCheckout={onCheckout}
        checkoutLabel="Pay now"
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Pay now'));
    expect(onCheckout).toHaveBeenCalled();

    const { queryByText } = renderThemed(
      <CartSummaryV4 subtotalCents={100} totalCents={100} />,
      SEED_LIGHT
    );
    expect(queryByText('Checkout')).toBeNull();
  });

  it('EMPTY: an empty cart still reads as a summary, at $0.00', () => {
    const { getAllByTestId, getByTestId, getByText, queryByTestId } = renderThemed(
      <CartSummaryV4 subtotalCents={0} totalCents={0} itemCount={0} />,
      SEED_LIGHT
    );
    expect(getByText('Subtotal (0 items)')).toBeTruthy();
    expect(getByTestId('xen-cart-total').props.children).toBe(formatMoney(0));
    expect(queryByTestId('xen-summary-row-shipping')).toBeNull();
    expect(queryByTestId('xen-summary-row-tax')).toBeNull();
    // Still exactly one rule.
    expect(getAllByTestId('xen-summary-rule')).toHaveLength(1);
  });
});
