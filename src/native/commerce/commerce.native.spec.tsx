import * as React from 'react';
import { StyleSheet } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { formatMoney } from './money';
import { PriceTag } from './PriceTag';
import { ProductCard } from './ProductCard';
import { ProductGrid } from './ProductGrid';
import { QuantityStepper } from './QuantityStepper';
import { CartLineItem } from './CartLineItem';
import { CartSummary } from './CartSummary';
import { OrderSummary, CheckoutSummary } from './OrderSummary';
import { StatusBadge, type OrderStatus } from './StatusBadge';
import { GenerativeCover } from './GenerativeCover';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

describe('formatMoney (native re-export)', () => {
  it('formats cents as localized currency', () => {
    expect(formatMoney(1200)).toBe('$12.00');
    expect(formatMoney(0)).toBe('$0.00');
    expect(formatMoney(123456789)).toBe('$1,234,567.89');
    expect(formatMoney(1200, 'EUR', 'en-US')).toBe('€12.00');
    expect(formatMoney(Number.NaN)).toBe('$0.00');
  });
});

describe('PriceTag (native)', () => {
  it('renders the formatted price', () => {
    const { getByText } = renderThemed(<PriceTag cents={2400} />, SEED_LIGHT);
    expect(getByText('$24.00')).toBeTruthy();
  });

  it('shows a struck compare-at only when higher than the price', () => {
    const higher = renderThemed(<PriceTag cents={2400} compareAtCents={3200} />, SEED_LIGHT);
    const compare = higher.getByText('$32.00');
    expect(flatten(compare.props.style).textDecorationLine).toBe('line-through');

    // A compare-at at or below the price is not shown.
    const lower = renderThemed(<PriceTag cents={2400} compareAtCents={2000} />, SEED_LIGHT);
    expect(lower.queryByText('$20.00')).toBeNull();
  });
});

describe('QuantityStepper (native)', () => {
  it('increments and decrements through onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <QuantityStepper value={2} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Increase quantity'));
    fireEvent.press(getByLabelText('Decrease quantity'));
    expect(onChange).toHaveBeenNthCalledWith(1, 3);
    expect(onChange).toHaveBeenNthCalledWith(2, 1);
  });

  it('clamps at min and max (boundary buttons disabled, no onChange)', () => {
    const onChange = jest.fn();
    const atMin = renderThemed(
      <QuantityStepper value={1} min={1} max={5} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(atMin.getByLabelText('Decrease quantity'));
    expect(onChange).not.toHaveBeenCalled();
    expect(atMin.getByLabelText('Decrease quantity').props.accessibilityState.disabled).toBe(true);

    const atMax = renderThemed(
      <QuantityStepper value={5} min={1} max={5} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(atMax.getByLabelText('Increase quantity'));
    expect(onChange).not.toHaveBeenCalled();
    expect(atMax.getByLabelText('Increase quantity').props.accessibilityState.disabled).toBe(true);
  });

  it('honors a custom step', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <QuantityStepper value={4} step={5} max={20} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Increase quantity'));
    expect(onChange).toHaveBeenCalledWith(9);
  });
});

describe('StatusBadge (native)', () => {
  const statuses: OrderStatus[] = [
    'pending',
    'paid',
    'fulfilled',
    'shipped',
    'cancelled',
    'refunded',
  ];

  it('renders every status with a token background + on-token text', () => {
    statuses.forEach((status) => {
      const { getByText, root } = renderThemed(<StatusBadge status={status} />, SEED_DARK);
      const label = status.charAt(0).toUpperCase() + status.slice(1);
      expect(getByText(label)).toBeTruthy();
      const allowed = tokenHexSet(SEED_DARK);
      renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });

  it('accepts a custom label', () => {
    const { getByText } = renderThemed(
      <StatusBadge status="paid">Charged</StatusBadge>,
      SEED_LIGHT
    );
    expect(getByText('Charged')).toBeTruthy();
  });
});

describe('ProductCard (native)', () => {
  it('renders title, price, and fires onAdd', () => {
    const onAdd = jest.fn();
    const { getByText } = renderThemed(
      <ProductCard title="Ceramic Mug" priceCents={2400} onAdd={onAdd} addLabel="Add" />,
      SEED_LIGHT
    );
    expect(getByText('Ceramic Mug')).toBeTruthy();
    expect(getByText('$24.00')).toBeTruthy();
    fireEvent.press(getByText('Add'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('fires onPress on the whole card', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ProductCard title="Linen Napkin" priceCents={1800} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Linen Napkin'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('draws a GenerativeCover when no imageUrl is given', () => {
    const { getByText } = renderThemed(
      <ProductCard title="Cedar Candle" priceCents={1500} />,
      SEED_DARK
    );
    // Initials rendered by the cover placeholder.
    expect(getByText('CC')).toBeTruthy();
  });
});

describe('ProductGrid (native)', () => {
  it('renders N product cards through the FlatList', () => {
    const titles = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'];
    const { getByText } = renderThemed(
      <ProductGrid columns={2} scrollEnabled={false}>
        {titles.map((t) => (
          <ProductCard key={t} title={t} priceCents={1000} />
        ))}
      </ProductGrid>,
      SEED_LIGHT
    );
    titles.forEach((t) => expect(getByText(t)).toBeTruthy());
  });
});

describe('CartLineItem (native)', () => {
  it('shows the line total (unit × qty) and fires remove', () => {
    const onRemove = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <CartLineItem
        title="Ceramic Mug"
        variantTitle="Large / Cream"
        quantity={3}
        unitPriceCents={2400}
        onQuantityChange={() => undefined}
        onRemove={onRemove}
      />,
      SEED_LIGHT
    );
    expect(getByText('$72.00')).toBeTruthy();
    fireEvent.press(getByLabelText('Remove Ceramic Mug'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});

describe('CartSummary (native)', () => {
  it('formats totals, renders Free shipping at 0, and checks out', () => {
    const onCheckout = jest.fn();
    const { getByText } = renderThemed(
      <CartSummary
        subtotalCents={4800}
        shippingCents={0}
        taxCents={384}
        discountCents={500}
        totalCents={4684}
        onCheckout={onCheckout}
      />,
      SEED_LIGHT
    );
    expect(getByText('$48.00')).toBeTruthy();
    expect(getByText('Free')).toBeTruthy();
    expect(getByText('$3.84')).toBeTruthy();
    expect(getByText('−$5.00')).toBeTruthy();
    expect(getByText('$46.84')).toBeTruthy();
    fireEvent.press(getByText('Checkout'));
    expect(onCheckout).toHaveBeenCalledTimes(1);
  });
});

describe('OrderSummary / CheckoutSummary (native)', () => {
  it('renders line items, totals, and a status badge', () => {
    const { getByText } = renderThemed(
      <OrderSummary
        items={[
          { title: 'Ceramic Mug', variantTitle: 'Large', quantity: 2, unitPriceCents: 2400 },
          { title: 'Linen Napkin', quantity: 1, unitPriceCents: 1800 },
        ]}
        subtotalCents={6600}
        shippingCents={500}
        taxCents={528}
        totalCents={7628}
        status="paid"
        orderNumber="1042"
      />,
      SEED_DARK
    );
    expect(getByText('Ceramic Mug')).toBeTruthy();
    expect(getByText('$48.00')).toBeTruthy(); // 2400 * 2
    expect(getByText('$76.28')).toBeTruthy();
    expect(getByText('Paid')).toBeTruthy();
    expect(getByText('#1042')).toBeTruthy();
  });

  it('CheckoutSummary is the same component', () => {
    expect(CheckoutSummary).toBe(OrderSummary);
  });
});

describe('GenerativeCover (native)', () => {
  it('is deterministic for a given seed', () => {
    const a = renderThemed(<GenerativeCover seed="mug" label="Ceramic Mug" />, SEED_LIGHT);
    const b = renderThemed(<GenerativeCover seed="mug" label="Ceramic Mug" />, SEED_LIGHT);
    const hexesA = renderedStyleHexes(a.root);
    const hexesB = renderedStyleHexes(b.root);
    expect(hexesA).toEqual(hexesB);
  });
});

describe('token purity (native commerce, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ProductCard title="Mug" priceCents={2400} compareAtCents={3200} onAdd={() => undefined} />
          <QuantityStepper value={2} onChange={() => undefined} />
          <CartSummary subtotalCents={4800} shippingCents={0} taxCents={384} totalCents={5184} onCheckout={() => undefined} />
          <StatusBadge status="shipped" />
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
