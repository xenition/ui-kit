/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import { formatMoney } from './money';
import type { OrderLine } from './OrderSummary';
import { CheckoutSummaryV4, OrderSummaryV4 } from './OrderSummaryV4';
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

const ITEMS: OrderLine[] = [
  { title: 'Ceramic Mug', variantTitle: 'Large / Cream', quantity: 2, unitPriceCents: 2400 },
  { title: 'Linen Napkin', quantity: 1, unitPriceCents: 1800 },
];

const card = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-order-summary]') as HTMLElement;
const lines = (c: HTMLElement): HTMLElement[] =>
  Array.from(c.querySelectorAll<HTMLElement>('[data-xen-order-line]'));
const rules = (c: HTMLElement): HTMLElement[] =>
  Array.from(c.querySelectorAll<HTMLElement>('[data-xen-summary-rule]'));
const total = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-order-total]') as HTMLElement;

describe('OrderSummaryV4 (web)', () => {
  it('formats every amount through formatMoney, never by hand', () => {
    const { container, getByText } = renderThemed(
      <OrderSummaryV4
        items={ITEMS}
        subtotalCents={6600}
        shippingCents={599}
        taxCents={520}
        totalCents={7719}
      />
    );
    // Per-line totals are unit × quantity.
    expect(getByText(formatMoney(4800))).toBeTruthy();
    expect(getByText(formatMoney(1800))).toBeTruthy();
    expect(total(container).textContent).toBe(formatMoney(7719));
  });

  it('honours a formatMoney override on the lines as well as the totals', () => {
    const { container } = renderThemed(
      <OrderSummaryV4
        items={[{ title: 'Mug', quantity: 2, unitPriceCents: 1000 }]}
        subtotalCents={2000}
        totalCents={2000}
        currency="EUR"
        formatMoney={(c, cur) => `${cur} ${c}`}
      />
    );
    expect(
      container.querySelector('[data-xen-order-line-total]')?.textContent
    ).toBe('EUR 2000');
    expect(total(container).textContent).toBe('EUR 2000');
  });

  it('keeps EXACTLY one rule — no divide-y between order lines', () => {
    const { container } = renderThemed(
      <OrderSummaryV4
        items={ITEMS}
        subtotalCents={6600}
        shippingCents={0}
        taxCents={520}
        totalCents={7120}
      />
    );
    expect(rules(container)).toHaveLength(1);
    const list = container.querySelector('[data-xen-order-lines]') as HTMLElement;
    expect(list.className).not.toContain('divide-y');
    lines(container).forEach((li) => {
      expect(li.className).not.toContain('border-t');
      expect(li.className).not.toContain('border-b');
    });
    const order = Array.from(card(container).children);
    const ruleIndex = order.indexOf(rules(container)[0] as HTMLElement);
    const totalIndex = order.findIndex((n) => n.getAttribute('data-xen-summary-row') === 'total');
    expect(totalIndex).toBe(ruleIndex + 1);
  });

  it('sets the total one step up the scale, and does NOT tint it', () => {
    const { container, getByText } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={6600} totalCents={6600} />
    );
    expect(total(container).className).toContain('text-lg');
    expect(getByText('Total').className).toContain('text-lg');
    expect(total(container).className).toContain('text-on-surface');
    expect(total(container).className).not.toMatch(/success|warn|danger|primary/);
  });

  it('sets every figure in tabular numerals — §1.2', () => {
    const { container } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={6600} totalCents={6600} />
    );
    expect(total(container).className).toContain('[font-variant-numeric:tabular-nums]');
    container
      .querySelectorAll<HTMLElement>('[data-xen-order-line-total]')
      .forEach((n) => expect(n.className).toContain('[font-variant-numeric:tabular-nums]'));
  });

  it('gives each line the row metric', () => {
    const { container } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={6600} totalCents={6600} />
    );
    lines(container).forEach((li) => {
      expect(li.className).toContain('min-h-[calc(var(--xen-space-2xl)_+_var(--xen-space-lg))]');
      expect(li.className).toContain('px-md');
    });
  });

  it('paints the card ground rather than the page — §1.4', () => {
    const { container } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={1} totalCents={1} />
    );
    expect(card(container).getAttribute(MONEY_V4_GROUND_ATTR)).toBe('card');
    expect(document.getElementById(MONEY_V4_STYLE_ID)?.textContent).toContain('var(--xen-card)');
  });

  it('composes StatusBadgeV4 — an icon AND a word, never colour alone (§1.6, §1.7)', () => {
    const { container } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={1} totalCents={1} status="paid" />
    );
    // The V4 badge's own marker, which the base `StatusBadge` does not carry.
    const badge = container.querySelector('[data-xen-v4-status-badge="paid"]') as HTMLElement;
    expect(badge).not.toBeNull();
    expect(badge.textContent).toContain('Paid');
    // A glyph beside the word, and the announcement that names it.
    expect(badge.children.length).toBeGreaterThan(1);
    expect(badge.textContent).toContain('Order status:');
  });

  it('NEW: statusLabel renames the badge without redrawing it', () => {
    const { container } = renderThemed(
      <OrderSummaryV4
        items={ITEMS}
        subtotalCents={1}
        totalCents={1}
        status="fulfilled"
        statusLabel="On its way"
      />
    );
    const badge = container.querySelector('[data-xen-v4-status-badge="fulfilled"]') as HTMLElement;
    expect(badge.textContent).toContain('On its way');
    expect(badge.textContent).not.toContain('Fulfilled');
  });

  it('a refund is not painted in the error tone — §1.3', () => {
    const { container } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={1} totalCents={1} status="refunded" />
    );
    const badge = container.querySelector('[data-xen-v4-status-badge="refunded"]') as HTMLElement;
    expect(badge.className).not.toContain('danger');
    expect(badge.className).not.toContain('warn');
  });

  it('hides the badge when there is no status', () => {
    const { container } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={1} totalCents={1} />
    );
    expect(container.querySelector('[data-xen-status-badge]')).toBeNull();
  });

  it('renders the heading, the order number, and accepts a node title', () => {
    const withDefault = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={1} totalCents={1} orderNumber="A-1042" />
    );
    expect(withDefault.getByText('Order summary')).toBeTruthy();
    expect(withDefault.getByText('#A-1042')).toBeTruthy();

    const withNode = renderThemed(
      <OrderSummaryV4
        items={ITEMS}
        subtotalCents={1}
        totalCents={1}
        title={<h2 data-testid="custom">Your order</h2>}
      />
    );
    expect(withNode.getByTestId('custom').textContent).toBe('Your order');
  });

  it('EMPTY: an order with no lines shows an empty state, not a hole', () => {
    const { container, getByText } = renderThemed(
      <OrderSummaryV4 items={[]} subtotalCents={0} totalCents={0} />
    );
    expect(lines(container)).toHaveLength(0);
    expect(container.querySelector('[data-xen-order-empty]')).not.toBeNull();
    expect(getByText('No items in this order')).toBeTruthy();
    // The totals block still reads, and still keeps its one rule.
    expect(total(container).textContent).toBe(formatMoney(0));
    expect(rules(container)).toHaveLength(1);
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
          action: <button type="button">Browse</button>,
        }}
      />
    );
    expect(getByText('Nothing here yet')).toBeTruthy();
    expect(getByText('Add something to see it listed.')).toBeTruthy();
    expect(getByText('Browse')).toBeTruthy();
  });

  it('shows Free rather than $0.00, and hides absent totals rows', () => {
    const { container, getByText } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={6600} shippingCents={0} totalCents={6600} />
    );
    expect(getByText('Free')).toBeTruthy();
    expect(container.querySelector('[data-xen-summary-row="tax"]')).toBeNull();
  });

  it('labels each line with its quantity in tabular figures', () => {
    const { getByText } = renderThemed(
      <OrderSummaryV4 items={ITEMS} subtotalCents={6600} totalCents={6600} />
    );
    expect(getByText('Qty 2').className).toContain('[font-variant-numeric:tabular-nums]');
    expect(getByText('Large / Cream')).toBeTruthy();
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const { container } = renderThemed(
      <OrderSummaryV4
        items={ITEMS}
        subtotalCents={1}
        totalCents={1}
        id="os"
        aria-label="Order totals"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(container.querySelector('#os'));
    expect(card(container).getAttribute('aria-label')).toBe('Order totals');
  });
});

describe('CheckoutSummaryV4 (web)', () => {
  it('is the same component under its checkout-time name — no second file', () => {
    expect(CheckoutSummaryV4).toBe(OrderSummaryV4);
  });

  it('renders the same surface', () => {
    const { container, getByText } = renderThemed(
      <CheckoutSummaryV4
        items={ITEMS}
        subtotalCents={6600}
        totalCents={6600}
        title="Checkout summary"
      />
    );
    expect(getByText('Checkout summary')).toBeTruthy();
    expect(card(container)).not.toBeNull();
    expect(rules(container)).toHaveLength(1);
    expect(total(container).textContent).toBe(formatMoney(6600));
  });

  it('EMPTY: an empty checkout shows the empty state too', () => {
    const { getByText } = renderThemed(
      <CheckoutSummaryV4 items={[]} subtotalCents={0} totalCents={0} />
    );
    expect(getByText('No items in this order')).toBeTruthy();
  });
});
