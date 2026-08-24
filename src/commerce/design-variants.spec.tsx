/** @jest-environment jsdom */
/**
 * Web v2/v3 alternate designs for the commerce module: each drop-in variant
 * renders (smoke), stays token-pure (no hex in inline styles), and honours one
 * key interaction / state contract. Base props unchanged — these are additive.
 */
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import { CartLineItemV2 } from './CartLineItemV2';
import { CartLineItemV3 } from './CartLineItemV3';
import { CartSummaryV2 } from './CartSummaryV2';
import { CartSummaryV3 } from './CartSummaryV3';
import { OrderSummaryV2 } from './OrderSummaryV2';
import { OrderSummaryV3 } from './OrderSummaryV3';
import { ProductCardV2 } from './ProductCardV2';
import { ProductCardV3 } from './ProductCardV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'light',
};

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

function renderWithTheme(node: React.ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{node}</XenitionUIProvider>);
}

beforeEach(() => {
  installMatchMedia(false);
});

const ORDER_ITEMS = [
  { title: 'Ceramic Mug', variantTitle: 'Large', quantity: 2, unitPriceCents: 2400 },
  { title: 'Linen Napkin', quantity: 1, unitPriceCents: 1800 },
];

describe('CartLineItem V2/V3', () => {
  it('V2 renders, is token-pure, and computes the line total + removes', () => {
    const onRemove = jest.fn();
    const { container, getByLabelText } = renderWithTheme(
      <CartLineItemV2 title="Mug" quantity={3} unitPriceCents={2400} slug="mug" onRemove={onRemove} />
    );
    expect(container.querySelector('[data-xen-cart-line-item]')).not.toBeNull();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    expect(container.querySelector('[data-xen-line-total]')?.textContent).toBe('$72.00');
    fireEvent.click(getByLabelText('Remove Mug'));
    expect(onRemove).toHaveBeenCalled();
  });

  it('V3 renders, is token-pure, and shows a read-only ×qty when no handler', () => {
    const { container, getByText } = renderWithTheme(
      <CartLineItemV3 title="Mug" variantTitle="Large" quantity={4} unitPriceCents={1500} slug="mug" />
    );
    expect(container.querySelector('[data-xen-cart-line-item]')).not.toBeNull();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    expect(getByText('×4')).toBeTruthy();
    expect(container.querySelector('[data-xen-line-total]')?.textContent).toBe('$60.00');
  });
});

describe('CartSummary V2/V3', () => {
  it('V2 renders, is token-pure, and fires onCheckout', () => {
    const onCheckout = jest.fn();
    const { container, getByText } = renderWithTheme(
      <CartSummaryV2 subtotalCents={4800} shippingCents={0} taxCents={384} totalCents={5184} onCheckout={onCheckout} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    expect(container.querySelector('[data-xen-cart-total]')?.textContent).toBe('$51.84');
    fireEvent.click(getByText('Checkout'));
    expect(onCheckout).toHaveBeenCalled();
  });

  it('V3 renders total-first, is token-pure, and lists the breakdown', () => {
    const { container, getByText } = renderWithTheme(
      <CartSummaryV3 subtotalCents={4800} shippingCents={0} taxCents={384} totalCents={5184} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    expect(container.querySelector('[data-xen-cart-total]')?.textContent).toBe('$51.84');
    expect(getByText('Free')).toBeTruthy();
  });
});

describe('OrderSummary V2/V3', () => {
  it('V2 renders line items with a status badge and is token-pure', () => {
    const { container } = renderWithTheme(
      <OrderSummaryV2 items={ORDER_ITEMS} subtotalCents={6600} totalCents={6600} status="paid" orderNumber="1042" />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    expect(container.querySelectorAll('[data-xen-order-line]')).toHaveLength(2);
    expect(container.querySelector('[data-xen-order-total]')?.textContent).toBe('$66.00');
    expect(container.querySelector('[data-xen-status-badge="paid"]')?.textContent).toBe('Paid');
  });

  it('V3 renders total-first, is token-pure, and keeps the line items', () => {
    const { container, getByText } = renderWithTheme(
      <OrderSummaryV3 items={ORDER_ITEMS} subtotalCents={6600} totalCents={6600} status="pending" />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    expect(container.querySelectorAll('[data-xen-order-line]')).toHaveLength(2);
    expect(container.querySelector('[data-xen-order-total]')?.textContent).toBe('$66.00');
    expect(getByText('Ceramic Mug · Large ×2')).toBeTruthy();
  });
});

describe('ProductCard V2/V3', () => {
  it('V2 renders a lazy image, is token-pure, and fires onAdd', () => {
    const onAdd = jest.fn();
    const { container, getByText } = renderWithTheme(
      <ProductCardV2 title="Mug" priceCents={2400} imageUrl="/mug.jpg" onAdd={onAdd} addLabel="Add" />
    );
    expect(container.querySelector('[data-xen-product-card]')).not.toBeNull();
    expect(container.querySelector('img')?.getAttribute('loading')).toBe('lazy');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Add'));
    expect(onAdd).toHaveBeenCalled();
  });

  it('V3 draws a cover fallback, is token-pure, and fires onAdd', () => {
    const onAdd = jest.fn();
    const { container, getByText } = renderWithTheme(
      <ProductCardV3 title="Mug" slug="mug" priceCents={2400} compareAtCents={3200} onAdd={onAdd} addLabel="Add" />
    );
    expect(container.querySelector('[data-xen-cover]')).not.toBeNull();
    expect(container.querySelector('img')).toBeNull();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Add'));
    expect(onAdd).toHaveBeenCalled();
  });
});
