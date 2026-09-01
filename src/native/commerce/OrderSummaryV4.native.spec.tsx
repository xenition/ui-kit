import * as React from 'react';
import { Text as RNText } from 'react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { formatMoney } from './money';
import type { OrderLine } from './OrderSummary';
import { CheckoutSummaryV4, OrderSummaryV4 } from './OrderSummaryV4';

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
const TWO_LINE = tokens.spacing['2xl'] + tokens.spacing.lg; // 72

const ITEMS: OrderLine[] = [
  { title: 'Ceramic Mug', variantTitle: 'Large / Cream', quantity: 2, unitPriceCents: 2400 },
  { title: 'Linen Napkin', quantity: 1, unitPriceCents: 1800 },
];

describe('OrderSummaryV4 (native)', () => {
  it('formats every amount through formatMoney, never by hand', () => {
    const { getByText, getByTestId } = renderThemed(
      <OrderSummaryV4
        items={ITEMS}
        subtotalCents={6600}
        shippingCents={599}
        taxCents={520}
        totalCents={7719}
      />,
      SEED_LIGHT
    );
    // Per-line totals are unit × quantity.
    expect(getByText(formatMoney(4800))).toBeTruthy();
    expect(getByText(formatMoney(1800))).toBeTruthy();
    expect(getByTestId('xen-order-total').props.children).toBe(formatMoney(7719));
  });

  it('honours a formatMoney override on the lines as well as the totals', () => {
    const { getAllByTestId, getByTestId } = renderThemed(
      <OrderSummaryV4
        items={[{ title: 'Mug', quantity: 2, unitPriceCents: 1000 }]}
        subtotalCents={2000}
        totalCents={2000}
        currency="EUR"
        formatMoney={(c, cur) => `${cur} ${c}`}
      />,
      SEED_LIGHT
    );
    expect(getAllByTestId('xen-order-line-total')[0]?.props.children).toBe('EUR 2000');
    expect(getByTestId('xen-order-total').props.children).toBe('EUR 2000');
  });

  it('keeps EXACTLY one rule — no hairline between order lines', () => {
    const { getAllByTestId, getByTestId } = renderThemed(
      <OrderSummaryV4
        items={ITEMS}
        subtotalCents={6600}
        shippingCents={0}
        taxCents={520}
        totalCents={7120}
      />,
      SEED_LIGHT
    );
    expect(getAllByTestId('xen-summary-rule')).toHaveLength(1);
    const rule = flat(getByTestId('xen-summary-rule').props.style);
    expect(rule.height).toBe(1);
    expect(rule.backgroundColor).toBe(theme.light.border);
    getAllByTestId('xen-order-line').forEach((li) => {
      const s = flat(li.props.style);
      expect(s.borderTopWidth).toBeUndefined();
      expect(s.borderBottomWidth).toBeUndefined();
    });
  });

  it('sets the total one step up the scale, and does NOT tint it', () => {
    const { getByText, getByTestId } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={6600} totalCents={6600} />,
      SEED_LIGHT
    );
    const total = flat(getByTestId('xen-order-total').props.style);
    expect(total.fontSize).toBe(theme.typography.scale.lg);
    expect(flat(getByText('Total').props.style).fontSize).toBe(theme.typography.scale.lg);
    expect(total.color).toBe(theme.light.onSurface);
    [theme.light.success, theme.light.warn, theme.light.danger, theme.light.primary].forEach(
      (c) => expect(total.color).not.toBe(c)
    );
  });

  it('sets every figure in tabular numerals — §1.2', () => {
    const { getAllByTestId, getByTestId } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={6600} totalCents={6600} />,
      SEED_LIGHT
    );
    expect(flat(getByTestId('xen-order-total').props.style).fontVariant).toEqual([
      'tabular-nums',
    ]);
    getAllByTestId('xen-order-line-total').forEach((n) =>
      expect(flat(n.props.style).fontVariant).toEqual(['tabular-nums'])
    );
  });

  it('gives each line the row metric, and each totals row the one-line height', () => {
    const { getAllByTestId, getByTestId } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={6600} taxCents={100} totalCents={6700} />,
      SEED_LIGHT
    );
    getAllByTestId('xen-order-line').forEach((li) => {
      const s = flat(li.props.style);
      expect(s.minHeight).toBe(TWO_LINE);
      expect(s.paddingHorizontal).toBe(tokens.spacing.md);
    });
    ['subtotal', 'tax', 'total'].forEach((k) => {
      expect(flat(getByTestId(`xen-summary-row-${k}`).props.style).minHeight).toBe(ONE_LINE);
    });
  });

  it('paints the card ground rather than the page — §1.4', () => {
    const { getByTestId } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={1} totalCents={1} />,
      SEED_LIGHT
    );
    const s = flat(getByTestId('xen-order-summary').props.style);
    expect(s.backgroundColor).toBe(theme.light.card);
    expect(s.backgroundColor).not.toBe(theme.light.surface);
  });

  it('composes StatusBadgeV4 — an icon AND a word, never colour alone (§1.6, §1.7)', () => {
    const { getByTestId, getByText } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={1} totalCents={1} status="paid" />,
      SEED_LIGHT
    );
    const badge = getByTestId('xen-status-badge-paid');
    expect(getByText('Paid')).toBeTruthy();
    // Two text nodes inside the badge — a glyph and a word — not one tinted
    // word doing the whole job. And the announcement that names it.
    const glyphs = badge.findAll((n) => n.type === RNText);
    expect(glyphs.length).toBeGreaterThan(1);
    expect(badge.findAll((n) => n.props?.accessibilityLabel === 'Order status: Paid').length)
      .toBeGreaterThan(0);
  });

  it('NEW: statusLabel renames the badge without redrawing it', () => {
    const { getByTestId, getByText, queryByText } = renderThemed(
      <OrderSummaryV4
        items={ITEMS}
        subtotalCents={1}
        totalCents={1}
        status="fulfilled"
        statusLabel="On its way"
      />,
      SEED_LIGHT
    );
    expect(getByText('On its way')).toBeTruthy();
    expect(queryByText('Fulfilled')).toBeNull();
    expect(getByTestId('xen-status-badge-fulfilled')).toBeTruthy();
  });

  it('a refund is not painted in the error tone — §1.3', () => {
    const { getByText } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={1} totalCents={1} status="refunded" />,
      SEED_LIGHT
    );
    const colour = flat(getByText('Refunded').props.style).color;
    expect(colour).not.toBe(theme.light.danger);
    expect(colour).not.toBe(theme.light.onDanger);
    expect(colour).not.toBe(theme.light.onWarn);
  });

  it('hides the badge when there is no status', () => {
    const { queryByTestId } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={1} totalCents={1} />,
      SEED_LIGHT
    );
    expect(queryByTestId('xen-status-badge-paid')).toBeNull();
  });

  it('renders the heading, the order number, and accepts a node title', () => {
    const withDefault = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={1} totalCents={1} orderNumber="A-1042" />,
      SEED_LIGHT
    );
    expect(withDefault.getByText('Order summary')).toBeTruthy();
    expect(withDefault.getByText('#A-1042')).toBeTruthy();

    const withNode = renderThemed(
      <OrderSummaryV4
        items={ITEMS}
        subtotalCents={1}
        totalCents={1}
        title={<RNText testID="custom">Your order</RNText>}
      />,
      SEED_LIGHT
    );
    expect(withNode.getByTestId('custom')).toBeTruthy();
  });

  it('EMPTY: an order with no lines shows an empty state, not a hole', () => {
    const { getAllByTestId, getByTestId, getByText, queryAllByTestId } = renderThemed(
      <OrderSummaryV4 items={[]} subtotalCents={0} totalCents={0} />,
      SEED_LIGHT
    );
    expect(queryAllByTestId('xen-order-line')).toHaveLength(0);
    expect(getByTestId('xen-order-empty')).toBeTruthy();
    expect(getByText('No items in this order')).toBeTruthy();
    // The totals block still reads, and still keeps its one rule.
    expect(getByTestId('xen-order-total').props.children).toBe(formatMoney(0));
    expect(getAllByTestId('xen-summary-rule')).toHaveLength(1);
  });

  it('EMPTY: the empty state is caller-supplied', () => {
    const { getByText } = renderThemed(
      <OrderSummaryV4
        items={[]}
        subtotalCents={0}
        totalCents={0}
        empty={{
          title: 'Nothing here yet',
          description: 'Add something to see it listed.',
          action: <RNText>Browse</RNText>,
        }}
      />,
      SEED_LIGHT
    );
    expect(getByText('Nothing here yet')).toBeTruthy();
    expect(getByText('Add something to see it listed.')).toBeTruthy();
    expect(getByText('Browse')).toBeTruthy();
  });

  it('shows Free rather than $0.00, and hides absent totals rows', () => {
    const { getByText, queryByTestId } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={6600} shippingCents={0} totalCents={6600} />,
      SEED_LIGHT
    );
    expect(getByText('Free')).toBeTruthy();
    expect(queryByTestId('xen-summary-row-tax')).toBeNull();
  });

  it('labels each line with its quantity in tabular figures', () => {
    const { getByText } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={6600} totalCents={6600} />,
      SEED_LIGHT
    );
    expect(flat(getByText('Qty 2').props.style).fontVariant).toEqual(['tabular-nums']);
    expect(getByText('Large / Cream')).toBeTruthy();
  });
});

describe('CheckoutSummaryV4 (native)', () => {
  it('is the same component under its checkout-time name — no second file', () => {
    expect(CheckoutSummaryV4).toBe(OrderSummaryV4);
  });

  it('renders the same surface', () => {
    const { getAllByTestId, getByTestId, getByText } = renderThemed(
      <CheckoutSummaryV4
        items={ITEMS}
        subtotalCents={6600}
        totalCents={6600}
        title="Checkout summary"
      />,
      SEED_LIGHT
    );
    expect(getByText('Checkout summary')).toBeTruthy();
    expect(getByTestId('xen-order-summary')).toBeTruthy();
    expect(getAllByTestId('xen-summary-rule')).toHaveLength(1);
    expect(getByTestId('xen-order-total').props.children).toBe(formatMoney(6600));
  });

  it('EMPTY: an empty checkout shows the empty state too', () => {
    const { getByText } = renderThemed(
      <CheckoutSummaryV4 items={[]} subtotalCents={0} totalCents={0} />,
      SEED_LIGHT
    );
    expect(getByText('No items in this order')).toBeTruthy();
  });
});
