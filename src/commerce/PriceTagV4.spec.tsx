/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { formatMoney } from './money';
import { PriceTagV4 } from './PriceTagV4';

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

const tag = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-price-tag]') as HTMLElement;
const price = (c: HTMLElement): HTMLElement => c.querySelector('[data-xen-price]') as HTMLElement;
const was = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-compare-at]') as HTMLElement;

describe('PriceTagV4 (web)', () => {
  it('formats every amount through formatMoney, never by hand', () => {
    const { container } = renderThemed(<PriceTagV4 cents={120450} compareAtCents={150000} />);
    expect(price(container).textContent).toBe(formatMoney(120450));
    expect(was(container).textContent).toBe(formatMoney(150000));
  });

  it('honours a formatMoney override', () => {
    const { container } = renderThemed(
      <PriceTagV4 cents={1200} formatMoney={(c, cur) => `${cur} ${c}`} currency="EUR" />
    );
    expect(price(container).textContent).toBe('EUR 1200');
  });

  it('sets both figures in tabular numerals so a column of prices lines up', () => {
    const { container } = renderThemed(<PriceTagV4 cents={999} compareAtCents={1111} />);
    expect(price(container).className).toContain('[font-variant-numeric:tabular-nums]');
    expect(was(container).className).toContain('[font-variant-numeric:tabular-nums]');
  });

  it('wears the display face and sits on one baseline', () => {
    const { container } = renderThemed(<PriceTagV4 cents={1200} compareAtCents={2000} />);
    expect(price(container).className).toContain('font-heading');
    expect(tag(container).className).toContain('items-baseline');
  });

  it('steps the price up and keeps the struck price one step under it', () => {
    const sizes = [
      ['sm', 'text-base', 'text-xs'],
      ['md', 'text-lg', 'text-sm'],
      ['lg', 'text-2xl', 'text-base'],
    ] as const;
    sizes.forEach(([size, priceCls, wasCls]) => {
      const { container } = renderThemed(
        <PriceTagV4 cents={1200} compareAtCents={2000} size={size} />
      );
      expect(price(container).className).toContain(priceCls);
      expect(was(container).className).toContain(wasCls);
    });
  });

  it('announces the struck price instead of leaving two bare numbers', () => {
    const { container } = renderThemed(<PriceTagV4 cents={1400} compareAtCents={2000} />);
    expect(was(container).tagName).toBe('S');
    expect(was(container).getAttribute('aria-label')).toBe(`Was ${formatMoney(2000)}`);
  });

  it('does not paint a discounted price in the danger tone — §35.4', () => {
    const { container } = renderThemed(<PriceTagV4 cents={1400} compareAtCents={2000} />);
    expect(price(container).className).toContain('text-on-surface');
    expect(price(container).className).not.toContain('danger');
  });

  it('draws no discount badge and no container — §7, §11', () => {
    const { container } = renderThemed(<PriceTagV4 cents={1400} compareAtCents={2000} />);
    const root = tag(container);
    expect(root.children).toHaveLength(2);
    expect(root.className).not.toContain('border');
    expect(root.className).not.toContain('bg-');
    expect(root.className).not.toContain('rounded');
    expect(root.textContent).not.toContain('%');
  });

  it('hides the compare-at when it is not actually higher', () => {
    const { container } = renderThemed(<PriceTagV4 cents={2000} compareAtCents={2000} />);
    expect(was(container)).toBeNull();
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLSpanElement | null = null;
    const { container } = renderThemed(
      <PriceTagV4
        cents={1200}
        id="p"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(container.querySelector('#p'));
  });
});
