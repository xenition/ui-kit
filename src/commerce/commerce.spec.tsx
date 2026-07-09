/** @jest-environment jsdom */
/**
 * Commerce components: render smoke under BOTH compiled seeds (violet/light +
 * ember/dark), token-purity (no hex in inline styles, SVG paint, or injected
 * sheets), and the behavioral contracts (PriceTag strikethrough,
 * QuantityStepper clamping, ProductCard cover fallback, cart/order totals,
 * status badge, empty state).
 */
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import { PriceTag } from './PriceTag';
import { ProductCard } from './ProductCard';
import { ProductGrid } from './ProductGrid';
import { QuantityStepper } from './QuantityStepper';
import { CartLineItem } from './CartLineItem';
import { CartSummary } from './CartSummary';
import { OrderSummary, CheckoutSummary } from './OrderSummary';
import { StatusBadge } from './StatusBadge';
import { EmptyState } from './EmptyState';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const SEED_LIGHT: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'light',
};
const SEED_DARK: ThemeSeed = {
  primary: '#EA580C',
  accent: '#D4A24E',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'sharp',
  mode: 'dark',
};

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const paintAttrs = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<SVGElement>('[fill], [stroke]'))
    .flatMap((el) => [el.getAttribute('fill') ?? '', el.getAttribute('stroke') ?? ''])
    .join('\n');

const injectedSheets = (): string =>
  Array.from(document.querySelectorAll<HTMLStyleElement>('style[id^="xen-"]'))
    .map((el) => el.textContent ?? '')
    .join('\n');

beforeEach(() => {
  installMatchMedia(false);
});

function Showcase(): React.ReactElement {
  return (
    <main>
      <ProductGrid>
        <ProductCard title="Ceramic Mug" priceCents={2400} compareAtCents={3200} slug="mug" onAdd={() => undefined} />
        <ProductCard title="Linen Napkin" priceCents={1800} imageUrl="/napkin.jpg" />
      </ProductGrid>
      <CartLineItem
        title="Ceramic Mug"
        variantTitle="Large / Cream"
        quantity={2}
        unitPriceCents={2400}
        slug="mug"
        onQuantityChange={() => undefined}
        onRemove={() => undefined}
      />
      <CartSummary subtotalCents={4800} shippingCents={0} taxCents={384} totalCents={5184} onCheckout={() => undefined} />
      <OrderSummary
        items={[{ title: 'Ceramic Mug', variantTitle: 'Large', quantity: 2, unitPriceCents: 2400 }]}
        subtotalCents={4800}
        shippingCents={500}
        taxCents={384}
        totalCents={5684}
        status="paid"
        orderNumber="1042"
      />
      <EmptyState title="Your cart is empty" description="Browse the shop to get started." />
    </main>
  );
}

describe.each([
  ['light seed', SEED_LIGHT, 'light'],
  ['dark seed', SEED_DARK, 'dark'],
])('commerce under the %s', (_name, seed, mode) => {
  it('renders the full storefront composition with the compiled theme', () => {
    const { container, getAllByText, getByText } = render(
      <XenitionUIProvider theme={seed}>
        <Showcase />
      </XenitionUIProvider>
    );
    expect(container.querySelector(`[data-theme="${mode}"]`)).not.toBeNull();
    expect(container.querySelector('[data-xen-product-grid]')).not.toBeNull();
    expect(container.querySelectorAll('[data-xen-product-card]')).toHaveLength(2);
    expect(container.querySelector('[data-xen-cart-summary]')).not.toBeNull();
    expect(container.querySelector('[data-xen-order-summary]')).not.toBeNull();
    // $24.00 appears in product card, cart line unit? and order line
    expect(getAllByText('$24.00').length).toBeGreaterThan(0);
    expect(getByText('Your cart is empty')).toBeTruthy();
    expect(getByText('Paid')).toBeTruthy();
  });

  it('stays token-pure: no hex in inline styles, SVG paint, or injected sheets', () => {
    const { container } = render(
      <XenitionUIProvider theme={seed}>
        <Showcase />
      </XenitionUIProvider>
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    expect(paintAttrs(container)).not.toMatch(HEX_LITERAL);
    expect(injectedSheets()).not.toMatch(HEX_LITERAL);
  });
});

describe('PriceTag', () => {
  it('formats the price and shows a struck compare-at when higher', () => {
    const { container, getByText } = render(<PriceTag cents={1800} compareAtCents={2500} />);
    expect(getByText('$18.00')).toBeTruthy();
    const compare = container.querySelector('[data-xen-compare-at]');
    expect(compare?.textContent).toBe('$25.00');
    expect(compare?.className).toContain('line-through');
  });

  it('omits the compare-at when it is not higher than the price', () => {
    const { container } = render(<PriceTag cents={2500} compareAtCents={2500} />);
    expect(container.querySelector('[data-xen-compare-at]')).toBeNull();
  });

  it('accepts a formatMoney override', () => {
    const { getByText } = render(
      <PriceTag cents={1000} formatMoney={(c) => `${c / 100} credits`} />
    );
    expect(getByText('10 credits')).toBeTruthy();
  });
});

describe('QuantityStepper', () => {
  it('clamps at the minimum and disables the − button', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <QuantityStepper value={1} min={1} max={5} onChange={onChange} />
    );
    const dec = getByLabelText('Decrease quantity') as HTMLButtonElement;
    expect(dec.disabled).toBe(true);
    fireEvent.click(dec);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('clamps at the maximum and disables the + button', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <QuantityStepper value={5} min={1} max={5} onChange={onChange} />
    );
    const inc = getByLabelText('Increase quantity') as HTMLButtonElement;
    expect(inc.disabled).toBe(true);
    fireEvent.click(inc);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('emits the next value within bounds', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <QuantityStepper value={2} min={1} max={5} onChange={onChange} />
    );
    fireEvent.click(getByLabelText('Increase quantity'));
    expect(onChange).toHaveBeenCalledWith(3);
    fireEvent.click(getByLabelText('Decrease quantity'));
    expect(onChange).toHaveBeenCalledWith(1);
  });
});

describe('ProductCard', () => {
  it('draws a GenerativeCover fallback when no imageUrl is given', () => {
    const { container } = render(<ProductCard title="Mug" slug="mug" priceCents={2400} />);
    expect(container.querySelector('[data-xen-cover]')).not.toBeNull();
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders a lazy image when imageUrl is given (no cover)', () => {
    const { container } = render(
      <ProductCard title="Mug" priceCents={2400} imageUrl="/mug.jpg" />
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('loading')).toBe('lazy');
    expect(container.querySelector('[data-xen-cover]')).toBeNull();
  });

  it('fires onAdd', () => {
    const onAdd = jest.fn();
    const { getByText } = render(
      <ProductCard title="Mug" priceCents={2400} onAdd={onAdd} addLabel="Add" />
    );
    fireEvent.click(getByText('Add'));
    expect(onAdd).toHaveBeenCalled();
  });
});

describe('CartLineItem', () => {
  it('computes the line total (unit × quantity) and can remove', () => {
    const onRemove = jest.fn();
    const { container, getByLabelText } = render(
      <CartLineItem title="Mug" quantity={3} unitPriceCents={2400} slug="mug" onRemove={onRemove} />
    );
    expect(container.querySelector('[data-xen-line-total]')?.textContent).toBe('$72.00');
    fireEvent.click(getByLabelText('Remove Mug'));
    expect(onRemove).toHaveBeenCalled();
  });
});

describe('CartSummary', () => {
  it('renders totals and free shipping, and fires onCheckout', () => {
    const onCheckout = jest.fn();
    const { container, getByText } = render(
      <CartSummary subtotalCents={4800} shippingCents={0} taxCents={384} totalCents={5184} onCheckout={onCheckout} />
    );
    expect(getByText('Free')).toBeTruthy();
    expect(container.querySelector('[data-xen-cart-total]')?.textContent).toBe('$51.84');
    fireEvent.click(getByText('Checkout'));
    expect(onCheckout).toHaveBeenCalled();
  });
});

describe('OrderSummary / CheckoutSummary', () => {
  it('is read-only with line totals, order total, and a status badge', () => {
    const { container, getByText } = render(
      <OrderSummary
        items={[
          { title: 'Mug', quantity: 2, unitPriceCents: 2400 },
          { title: 'Napkin', quantity: 1, unitPriceCents: 1800 },
        ]}
        subtotalCents={6600}
        totalCents={6600}
        status="pending"
      />
    );
    expect(container.querySelectorAll('[data-xen-order-line]')).toHaveLength(2);
    expect(container.querySelector('[data-xen-order-total]')?.textContent).toBe('$66.00');
    const badge = container.querySelector('[data-xen-status-badge="pending"]');
    expect(badge?.textContent).toBe('Pending');
    expect(getByText('Mug')).toBeTruthy();
  });

  it('exports CheckoutSummary as an alias', () => {
    expect(CheckoutSummary).toBe(OrderSummary);
  });
});

describe('StatusBadge', () => {
  it('maps statuses to contrast-checked semantic pairs', () => {
    const { container, rerender } = render(<StatusBadge status="paid" />);
    expect(container.querySelector('[data-xen-status-badge]')?.className).toContain('bg-success');
    rerender(<StatusBadge status="cancelled" />);
    expect(container.querySelector('[data-xen-status-badge]')?.className).toContain('bg-danger');
    rerender(<StatusBadge status="pending" />);
    expect(container.querySelector('[data-xen-status-badge]')?.className).toContain('bg-warn');
  });
});

describe('EmptyState', () => {
  it('renders icon, title, description, and action slots', () => {
    const { container, getByText } = render(
      <EmptyState
        icon={<svg data-testid="cart-icon" />}
        title="Nothing here"
        description="Add something."
        action={<button>Shop</button>}
      />
    );
    expect(container.querySelector('[data-xen-empty-icon]')).not.toBeNull();
    expect(getByText('Nothing here')).toBeTruthy();
    expect(getByText('Add something.')).toBeTruthy();
    expect(getByText('Shop')).toBeTruthy();
  });
});
