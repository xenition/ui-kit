/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import { formatMoney } from './money';
import { CartSummaryV4 } from './CartSummaryV4';
import { MONEY_V4_GROUND_ATTR, MONEY_V4_STYLE_ID } from './internal/money-v4';

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

const card = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-cart-summary]') as HTMLElement;
const rows = (c: HTMLElement): HTMLElement[] =>
  Array.from(c.querySelectorAll<HTMLElement>('[data-xen-summary-row]'));
const rules = (c: HTMLElement): HTMLElement[] =>
  Array.from(c.querySelectorAll<HTMLElement>('[data-xen-summary-rule]'));
const total = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-cart-total]') as HTMLElement;

describe('CartSummaryV4 (web)', () => {
  it('formats every amount through formatMoney, never by hand', () => {
    const { container, getByText } = renderThemed(
      <CartSummaryV4
        subtotalCents={120450}
        shippingCents={599}
        taxCents={1050}
        totalCents={132099}
      />
    );
    expect(getByText(formatMoney(120450))).toBeTruthy();
    expect(getByText(formatMoney(599))).toBeTruthy();
    expect(getByText(formatMoney(1050))).toBeTruthy();
    expect(total(container).textContent).toBe(formatMoney(132099));
  });

  it('honours a formatMoney override', () => {
    const { container } = renderThemed(
      <CartSummaryV4
        subtotalCents={1200}
        totalCents={1200}
        currency="EUR"
        formatMoney={(c, cur) => `${cur} ${c}`}
      />
    );
    expect(total(container).textContent).toBe('EUR 1200');
  });

  it('keeps EXACTLY one rule, and it sits above the total', () => {
    const { container } = renderThemed(
      <CartSummaryV4
        subtotalCents={1000}
        shippingCents={0}
        taxCents={100}
        discountCents={200}
        totalCents={900}
      />
    );
    expect(rules(container)).toHaveLength(1);
    const order = Array.from(card(container).children);
    const ruleIndex = order.indexOf(rules(container)[0] as HTMLElement);
    const totalIndex = order.findIndex((n) => n.getAttribute('data-xen-summary-row') === 'total');
    expect(ruleIndex).toBeGreaterThan(-1);
    expect(totalIndex).toBe(ruleIndex + 1);
    // Every row above the total is separated by spacing, not by ink.
    rows(container).forEach((r) => expect(r.className).not.toContain('border-t'));
  });

  it('sets the total one step up the scale, and does NOT tint it', () => {
    const { container, getByText } = renderThemed(
      <CartSummaryV4 subtotalCents={1000} taxCents={100} totalCents={1100} />
    );
    expect(total(container).className).toContain('text-lg');
    expect(getByText('Total').className).toContain('text-lg');
    // The rows it is derived from stay a step below it.
    expect(getByText(formatMoney(100)).className).toContain('text-base');
    // Not success, not warn, not danger — a total is none of the three.
    expect(total(container).className).toContain('text-on-surface');
    expect(total(container).className).not.toMatch(/success|warn|danger|primary/);
  });

  it('sets every figure in tabular numerals — §1.2', () => {
    const { container, getByText } = renderThemed(
      <CartSummaryV4 subtotalCents={999} shippingCents={1111} totalCents={2110} />
    );
    expect(total(container).className).toContain('[font-variant-numeric:tabular-nums]');
    expect(getByText(formatMoney(999)).className).toContain(
      '[font-variant-numeric:tabular-nums]'
    );
    expect(getByText(formatMoney(1111)).className).toContain(
      '[font-variant-numeric:tabular-nums]'
    );
  });

  it('takes the row metric on every line', () => {
    const { container } = renderThemed(
      <CartSummaryV4 subtotalCents={1000} taxCents={100} totalCents={1100} />
    );
    rows(container).forEach((r) => {
      expect(r.className).toContain('min-h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))]');
      expect(r.className).toContain('px-md');
      expect(r.className).toContain('items-baseline');
    });
  });

  it('paints the card ground rather than the page — §1.4', () => {
    const { container } = renderThemed(<CartSummaryV4 subtotalCents={0} totalCents={0} />);
    expect(card(container).getAttribute(MONEY_V4_GROUND_ATTR)).toBe('card');
    expect(document.getElementById(MONEY_V4_STYLE_ID)?.textContent).toContain('var(--xen-card)');
    // The card pays no padding — the rows do, so the rule can run flush.
    expect(card(container).className).toContain('p-0');
  });

  it('shows Free rather than $0.00 for free shipping, and hides absent rows', () => {
    const { container, getByText } = renderThemed(
      <CartSummaryV4 subtotalCents={1000} shippingCents={0} totalCents={1000} />
    );
    expect(getByText('Free')).toBeTruthy();
    expect(rows(container).map((r) => r.getAttribute('data-xen-summary-row'))).toEqual([
      'subtotal',
      'shipping',
      'total',
    ]);
  });

  it('a discount is emphasis, not status — no green, no red — §1.3', () => {
    const { container, getByText } = renderThemed(
      <CartSummaryV4 subtotalCents={2000} discountCents={500} totalCents={1500} />
    );
    const value = getByText(`−${formatMoney(500)}`);
    expect(value.className).toContain('text-on-surface');
    expect(value.className).not.toMatch(/success|danger|warn/);
    expect(container.querySelector('[data-xen-summary-row="discount"]')).not.toBeNull();
  });

  it('hides the discount row when there is nothing off', () => {
    const { container } = renderThemed(
      <CartSummaryV4 subtotalCents={2000} discountCents={0} totalCents={2000} />
    );
    expect(container.querySelector('[data-xen-summary-row="discount"]')).toBeNull();
  });

  it('NEW: itemCount pluralises the subtotal label', () => {
    const three = renderThemed(
      <CartSummaryV4 subtotalCents={100} totalCents={100} itemCount={3} />
    );
    expect(three.getByText('Subtotal (3 items)')).toBeTruthy();

    const one = renderThemed(<CartSummaryV4 subtotalCents={100} totalCents={100} itemCount={1} />);
    expect(one.getByText('Subtotal (1 item)')).toBeTruthy();

    const none = renderThemed(<CartSummaryV4 subtotalCents={100} totalCents={100} />);
    expect(none.getByText('Subtotal')).toBeTruthy();
  });

  it('NEW: note renders under the total, quietly', () => {
    const { container, getByText } = renderThemed(
      <CartSummaryV4
        subtotalCents={100}
        totalCents={100}
        note="Taxes and shipping calculated at checkout"
      />
    );
    const note = container.querySelector('[data-xen-summary-note]') as HTMLElement;
    expect(note).not.toBeNull();
    expect(getByText('Taxes and shipping calculated at checkout').className).toContain(
      'text-muted-text'
    );
    const order = Array.from(card(container).children);
    const totalIndex = order.findIndex((n) => n.getAttribute('data-xen-summary-row') === 'total');
    expect(order.indexOf(note)).toBeGreaterThan(totalIndex);
  });

  it('renders the checkout button only when it has somewhere to go', () => {
    const onCheckout = jest.fn();
    const { getByText } = renderThemed(
      <CartSummaryV4
        subtotalCents={100}
        totalCents={100}
        onCheckout={onCheckout}
        checkoutLabel="Pay now"
      />
    );
    fireEvent.click(getByText('Pay now'));
    expect(onCheckout).toHaveBeenCalled();

    const { queryByText } = renderThemed(<CartSummaryV4 subtotalCents={100} totalCents={100} />);
    expect(queryByText('Checkout')).toBeNull();
  });

  it('EMPTY: an empty cart still reads as a summary, at $0.00', () => {
    const { container } = renderThemed(
      <CartSummaryV4 subtotalCents={0} totalCents={0} itemCount={0} />
    );
    expect(container.querySelector('[data-xen-summary-row="subtotal"]')?.textContent).toBe(
      `Subtotal (0 items)${formatMoney(0)}`
    );
    expect(total(container).textContent).toBe(formatMoney(0));
    // No shipping, no tax, no discount — and still exactly one rule.
    expect(rows(container)).toHaveLength(2);
    expect(rules(container)).toHaveLength(1);
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const { container } = renderThemed(
      <CartSummaryV4
        subtotalCents={0}
        totalCents={0}
        id="cs"
        aria-label="Cart totals"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(container.querySelector('#cs'));
    expect(card(container).getAttribute('aria-label')).toBe('Cart totals');
  });
});
