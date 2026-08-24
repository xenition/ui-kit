import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { ProductCardV2 } from './ProductCardV2';
import { ProductCardV3 } from './ProductCardV3';
import { CartLineItemV2 } from './CartLineItemV2';
import { CartLineItemV3 } from './CartLineItemV3';
import { CartSummaryV2 } from './CartSummaryV2';
import { CartSummaryV3 } from './CartSummaryV3';
import { OrderSummaryV2 } from './OrderSummaryV2';
import { OrderSummaryV3 } from './OrderSummaryV3';
import type { OrderLine } from './OrderSummary';

const SEEDS = [SEED_LIGHT, SEED_DARK] as const;

const ORDER_ITEMS: OrderLine[] = [
  { title: 'Ceramic Mug', variantTitle: 'Large / Cream', quantity: 2, unitPriceCents: 2400 },
  { title: 'Linen Napkin', quantity: 1, unitPriceCents: 1800 },
];

describe('commerce design variants — mount + core content', () => {
  it('ProductCardV2 / V3 render title and price', () => {
    const v2 = renderThemed(<ProductCardV2 title="Ceramic Mug" priceCents={2400} onAdd={() => undefined} addLabel="Add" />, SEED_LIGHT);
    expect(v2.getByText('Ceramic Mug')).toBeTruthy();
    expect(v2.getByText('$24.00')).toBeTruthy();

    const v3 = renderThemed(<ProductCardV3 title="Linen Napkin" priceCents={1800} onAdd={() => undefined} addLabel="Add" />, SEED_DARK);
    expect(v3.getByText('Linen Napkin')).toBeTruthy();
    expect(v3.getByText('$18.00')).toBeTruthy();
  });

  it('CartLineItemV2 / V3 show the line total (unit × qty)', () => {
    const v2 = renderThemed(
      <CartLineItemV2 title="Mug" quantity={3} unitPriceCents={2400} onQuantityChange={() => undefined} onRemove={() => undefined} />,
      SEED_LIGHT
    );
    expect(v2.getByText('$72.00')).toBeTruthy();

    const v3 = renderThemed(
      <CartLineItemV3 title="Napkin" quantity={2} unitPriceCents={1800} onQuantityChange={() => undefined} />,
      SEED_DARK
    );
    expect(v3.getByText('$36.00')).toBeTruthy();
  });

  it('CartSummaryV2 / V3 render totals (incl. an empty, all-zero summary)', () => {
    const v2 = renderThemed(
      <CartSummaryV2 subtotalCents={4800} shippingCents={0} taxCents={384} discountCents={500} totalCents={4684} onCheckout={() => undefined} />,
      SEED_LIGHT
    );
    expect(v2.getByText('Free')).toBeTruthy();
    expect(v2.getByText('−$5.00')).toBeTruthy();
    expect(v2.getByText('$46.84')).toBeTruthy();

    // Empty cart: everything zero, no optional lines.
    const empty = renderThemed(<CartSummaryV3 subtotalCents={0} totalCents={0} onCheckout={() => undefined} />, SEED_DARK);
    expect(empty.getAllByText('$0.00').length).toBeGreaterThan(0);
    expect(empty.getByText('Checkout')).toBeTruthy();
  });

  it('OrderSummaryV2 / V3 render items, totals, status — and an empty order', () => {
    const v2 = renderThemed(
      <OrderSummaryV2 items={ORDER_ITEMS} subtotalCents={6600} shippingCents={500} taxCents={528} totalCents={7628} status="paid" orderNumber="1042" />,
      SEED_LIGHT
    );
    expect(v2.getByText('Ceramic Mug')).toBeTruthy();
    expect(v2.getByText('$48.00')).toBeTruthy(); // 2400 * 2
    expect(v2.getByText('$76.28')).toBeTruthy();
    expect(v2.getByText('Paid')).toBeTruthy();
    expect(v2.getByText('#1042')).toBeTruthy();

    const v3 = renderThemed(
      <OrderSummaryV3 items={ORDER_ITEMS} subtotalCents={6600} shippingCents={500} taxCents={528} totalCents={7628} status="shipped" />,
      SEED_DARK
    );
    expect(v3.getByText('$76.28')).toBeTruthy();
    expect(v3.getByText('Shipped')).toBeTruthy();

    // Empty order: no line items → the "No items" placeholder, totals still render.
    const empty = renderThemed(<OrderSummaryV2 items={[]} subtotalCents={0} totalCents={0} />, SEED_LIGHT);
    expect(empty.getByText('No items')).toBeTruthy();
    const emptyV3 = renderThemed(<OrderSummaryV3 items={[]} subtotalCents={0} totalCents={0} />, SEED_DARK);
    expect(emptyV3.getByText('No items')).toBeTruthy();
  });
});

describe('commerce design variants — interaction', () => {
  it('ProductCardV2 fires onPress on the whole card and onAdd on its button', () => {
    const onPress = jest.fn();
    const onAdd = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <ProductCardV2 title="Cedar Candle" priceCents={1500} onPress={onPress} onAdd={onAdd} addLabel="Add" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Cedar Candle'));
    expect(onPress).toHaveBeenCalledTimes(1);
    fireEvent.press(getByText('Add'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('CartLineItemV2 drives its quantity stepper and remove control', () => {
    const onQuantityChange = jest.fn();
    const onRemove = jest.fn();
    const { getByLabelText } = renderThemed(
      <CartLineItemV2 title="Mug" quantity={2} unitPriceCents={2400} onQuantityChange={onQuantityChange} onRemove={onRemove} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Increase quantity'));
    expect(onQuantityChange).toHaveBeenCalledWith(3);
    fireEvent.press(getByLabelText('Remove Mug'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('CartSummaryV3 checks out; ProductCardV3 presses through', () => {
    const onCheckout = jest.fn();
    const summary = renderThemed(<CartSummaryV3 subtotalCents={4800} totalCents={4800} onCheckout={onCheckout} />, SEED_DARK);
    fireEvent.press(summary.getByText('Checkout'));
    expect(onCheckout).toHaveBeenCalledTimes(1);

    const onPress = jest.fn();
    const card = renderThemed(<ProductCardV3 title="Cedar Candle" priceCents={1500} onPress={onPress} />, SEED_LIGHT);
    fireEvent.press(card.getByLabelText('Cedar Candle'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('commerce design variants — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    SEEDS.forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ProductCardV2 title="Mug" priceCents={2400} compareAtCents={3200} onPress={() => undefined} onAdd={() => undefined} />
          <ProductCardV3 title="Napkin" priceCents={1800} compareAtCents={2200} onAdd={() => undefined} />
          <CartLineItemV2 title="Mug" variantTitle="Large" quantity={3} unitPriceCents={2400} onQuantityChange={() => undefined} onRemove={() => undefined} />
          <CartLineItemV3 title="Napkin" variantTitle="Cream" quantity={2} unitPriceCents={1800} onQuantityChange={() => undefined} onRemove={() => undefined} />
          <CartSummaryV2 subtotalCents={4800} shippingCents={0} taxCents={384} discountCents={500} totalCents={4684} onCheckout={() => undefined} />
          <CartSummaryV3 subtotalCents={4800} shippingCents={0} taxCents={384} totalCents={5184} onCheckout={() => undefined} />
          <OrderSummaryV2 items={ORDER_ITEMS} subtotalCents={6600} shippingCents={0} taxCents={528} totalCents={7128} status="paid" orderNumber="1042" />
          <OrderSummaryV3 items={ORDER_ITEMS} subtotalCents={6600} shippingCents={500} taxCents={528} totalCents={7628} status="shipped" orderNumber="1042" />
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
