/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import { formatMoney } from './money';
import { CartLineItemV4 } from './CartLineItemV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

beforeEach(() => {
  installMatchMedia(false);
});

const row = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-cart-line-item]') as HTMLElement;
const total = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-line-total]') as HTMLElement;

describe('CartLineItemV4 (web)', () => {
  it('composes PriceTagV4 for the line total rather than drawing one — §1.7', () => {
    const { container } = renderThemed(
      <CartLineItemV4 title="Ceramic Mug" quantity={3} unitPriceCents={2400} />
    );
    // The price tag's own marker, not a span this component invented.
    expect(total(container).querySelector('[data-xen-price-tag]')).not.toBeNull();
    expect(total(container).querySelector('[data-xen-price]')?.textContent).toBe(
      formatMoney(7200)
    );
  });

  it('composes QuantityStepperV4, never the base stepper', () => {
    const onQuantityChange = jest.fn();
    const { container } = renderThemed(
      <CartLineItemV4
        title="Ceramic Mug"
        quantity={2}
        unitPriceCents={2400}
        onQuantityChange={onQuantityChange}
      />
    );
    const stepper = container.querySelector('[data-xen-quantity-stepper]') as HTMLElement;
    expect(stepper).not.toBeNull();
    // The V4 marker the base stepper does not carry.
    expect(stepper.hasAttribute('data-xen-v4-stepper')).toBe(true);
    fireEvent.click(container.querySelector('[data-xen-quantity-increment]') as HTMLElement);
    expect(onQuantityChange).toHaveBeenCalledWith(3);
  });

  it('labels the stepper with the product it belongs to', () => {
    const { getByLabelText } = renderThemed(
      <CartLineItemV4
        title="Ceramic Mug"
        quantity={2}
        unitPriceCents={2400}
        onQuantityChange={() => undefined}
      />
    );
    expect(getByLabelText('Quantity for Ceramic Mug')).not.toBeNull();
  });

  it('NEW: compareAtUnitPriceCents strikes the original, scaled by quantity', () => {
    const { container } = renderThemed(
      <CartLineItemV4
        title="Ceramic Mug"
        quantity={2}
        unitPriceCents={1400}
        compareAtUnitPriceCents={2000}
      />
    );
    const struck = total(container).querySelector('[data-xen-compare-at]') as HTMLElement;
    expect(struck.textContent).toBe(formatMoney(4000));
    expect(struck.getAttribute('aria-label')).toBe(`Was ${formatMoney(4000)}`);
    expect(total(container).querySelector('[data-xen-price]')?.textContent).toBe(
      formatMoney(2800)
    );
  });

  it('a discounted line does not turn red — §1.3', () => {
    const { container } = renderThemed(
      <CartLineItemV4
        title="Ceramic Mug"
        quantity={1}
        unitPriceCents={1400}
        compareAtUnitPriceCents={2000}
      />
    );
    expect(total(container).innerHTML).not.toContain('danger');
    expect(row(container).className).not.toContain('danger');
  });

  it('ignores a compare-at that is not actually higher', () => {
    const { container } = renderThemed(
      <CartLineItemV4
        title="Mug"
        quantity={1}
        unitPriceCents={2000}
        compareAtUnitPriceCents={2000}
      />
    );
    expect(total(container).querySelector('[data-xen-compare-at]')).toBeNull();
  });

  it('takes the row metric — two-line height, md gutters, a 44 leading slot', () => {
    const { container } = renderThemed(
      <CartLineItemV4 title="Ceramic Mug" variantTitle="Large" quantity={1} unitPriceCents={100} />
    );
    const cls = row(container).className;
    expect(cls).toContain('min-h-[calc(var(--xen-space-2xl)_+_var(--xen-space-lg))]');
    expect(cls).toContain('px-md');
    expect(cls).toContain('gap-md');
    // No literal 64 thumbnail; the leading slot is the family's 44.
    const leading = row(container).firstElementChild as HTMLElement;
    expect(leading.className).toContain('h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
    expect(leading.className).not.toContain('h-16');
  });

  it('the row is transparent — the container owns the card (§4.3)', () => {
    const { container } = renderThemed(
      <CartLineItemV4 title="Mug" quantity={1} unitPriceCents={100} />
    );
    expect(row(container).className).toContain('bg-transparent');
    expect(row(container).className).not.toContain('bg-surface');
  });

  it('renders the image when given one, and the seeded cover otherwise', () => {
    const withImage = renderThemed(
      <CartLineItemV4
        title="Mug"
        quantity={1}
        unitPriceCents={100}
        imageUrl="https://example.test/mug.png"
        imageAlt="A mug"
      />
    );
    expect(withImage.container.querySelector('img')?.getAttribute('alt')).toBe('A mug');

    const withCover = renderThemed(
      <CartLineItemV4 title="Mug" quantity={1} unitPriceCents={100} slug="mug" />
    );
    expect(withCover.container.querySelector('svg')).not.toBeNull();
  });

  it('falls back to the title for the image alt', () => {
    const { container } = renderThemed(
      <CartLineItemV4
        title="Ceramic Mug"
        quantity={1}
        unitPriceCents={100}
        imageUrl="https://example.test/mug.png"
      />
    );
    expect(container.querySelector('img')?.getAttribute('alt')).toBe('Ceramic Mug');
  });

  it('reads Qty n in tabular figures when the line is read-only', () => {
    const { container, getByText } = renderThemed(
      <CartLineItemV4 title="Mug" quantity={4} unitPriceCents={100} />
    );
    expect(container.querySelector('[data-xen-quantity-stepper]')).toBeNull();
    expect(getByText('Qty 4').className).toContain('[font-variant-numeric:tabular-nums]');
  });

  it('gives the remove control a real label and the 44 tap floor', () => {
    const onRemove = jest.fn();
    const { container, getByLabelText } = renderThemed(
      <CartLineItemV4 title="Ceramic Mug" quantity={1} unitPriceCents={100} onRemove={onRemove} />
    );
    const button = getByLabelText('Remove Ceramic Mug');
    expect(button.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
    // Removing a line is routine and reversible — it does not get the error tone.
    expect(button.className).not.toContain('danger');
    expect(button.textContent).toBe('Remove');
    fireEvent.click(button);
    expect(onRemove).toHaveBeenCalled();
    expect(container.querySelector('[data-xen-cart-remove]')).toBe(button);
  });

  it('honours a removeLabel override', () => {
    const { getByLabelText } = renderThemed(
      <CartLineItemV4
        title="Mug"
        quantity={1}
        unitPriceCents={100}
        onRemove={() => undefined}
        removeLabel="Take the mug out of my cart"
      />
    );
    expect(getByLabelText('Take the mug out of my cart')).not.toBeNull();
  });

  it('hides the remove control when there is no handler', () => {
    const { container } = renderThemed(
      <CartLineItemV4 title="Mug" quantity={1} unitPriceCents={100} />
    );
    expect(container.querySelector('[data-xen-cart-remove]')).toBeNull();
  });

  it('EMPTY: a line with nothing to name renders nothing at all — §4.5', () => {
    const { container } = renderThemed(
      <CartLineItemV4 title="   " quantity={1} unitPriceCents={0} onRemove={() => undefined} />
    );
    expect(row(container)).toBeNull();
    // Not an empty 72-point box with a thumbnail in it, and not a stepper
    // attached to no product.
    expect(container.querySelector('[data-xen-quantity-stepper]')).toBeNull();
    expect(container.querySelector('[data-xen-price-tag]')).toBeNull();
  });

  it('EMPTY: a variant with no title still draws the row', () => {
    const { container } = renderThemed(
      <CartLineItemV4 title="" variantTitle="Large / Black" quantity={1} unitPriceCents={100} />
    );
    expect(row(container)).not.toBeNull();
  });

  it('routes every amount through the formatMoney override', () => {
    const { container } = renderThemed(
      <CartLineItemV4
        title="Mug"
        quantity={2}
        unitPriceCents={1000}
        currency="EUR"
        formatMoney={(c, cur) => `${cur} ${c}`}
      />
    );
    expect(total(container).textContent).toBe('EUR 2000');
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const { container } = renderThemed(
      <CartLineItemV4
        title="Mug"
        quantity={1}
        unitPriceCents={100}
        id="line"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(container.querySelector('#line'));
  });
});
