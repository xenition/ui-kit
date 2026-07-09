/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { ProductMock } from './ProductMock';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const sheet = (): string =>
  document.getElementById('xen-product-mock-styles')?.textContent ?? '';

describe('ProductMock', () => {
  it('is fully decorative (aria-hidden) with an entrance tilt by default', () => {
    const { container } = render(<ProductMock />);
    const root = container.querySelector('[data-xen-product-mock]');
    expect(root?.getAttribute('aria-hidden')).toBe('true');
    expect(root?.getAttribute('data-tilt')).toBe('true');
    expect(sheet()).toContain('@keyframes xen-pm-enter');
  });

  it('renders variant defaults: analytics = KPI tiles + equalizer bars + feed', () => {
    const { container, getByText } = render(<ProductMock />);
    expect(container.querySelector('[data-xen-product-mock="analytics"]')).not.toBeNull();
    expect(getByText('Active now')).toBeTruthy();
    expect(getByText('8,412')).toBeTruthy();
    expect(container.querySelectorAll('[data-xen-pm-bar]')).toHaveLength(28);
    expect(container.querySelectorAll('[data-xen-pm-feed-row]').length).toBeGreaterThan(0);
    expect(getByText('LIVE')).toBeTruthy();
  });

  it('renders each variant scene: chat bubbles, commerce sparkline, calendar grid', () => {
    const chat = render(<ProductMock variant="chat" />);
    expect(chat.container.querySelectorAll('[data-xen-pm-bubble]')).toHaveLength(5);
    expect(
      chat.container.querySelectorAll('[data-xen-pm-bubble][data-mine="true"]').length
    ).toBeGreaterThan(0);

    const commerce = render(<ProductMock variant="commerce" />);
    expect(commerce.container.querySelector('[data-xen-pm-spark]')).not.toBeNull();

    const calendar = render(<ProductMock variant="calendar" />);
    expect(calendar.container.querySelectorAll('[data-xen-pm-cell]')).toHaveLength(35);
    expect(
      calendar.container.querySelectorAll('[data-xen-pm-cell][data-booked="true"]').length
    ).toBeGreaterThan(0);
  });

  it('lets the chart prop override the variant scene (rings anywhere)', () => {
    const { container } = render(<ProductMock variant="chat" chart="rings" />);
    expect(container.querySelectorAll('[data-xen-pm-ring]')).toHaveLength(3);
    expect(container.querySelector('[data-xen-pm-bubble]')).toBeNull();
    expect(sheet()).toContain('[data-xen-pm-ring][data-ring="0"] { stroke: var(--xen-primary-500); }');
  });

  it('accepts custom kpis, title, feed, and footnote', () => {
    const { getByText, container } = render(
      <ProductMock
        title="acme / staging"
        kpis={[{ label: 'MRR', value: '$4,200' }]}
        feed={['deploy.finished · ci']}
        footnote="42 deploys today"
      />
    );
    expect(getByText('acme / staging')).toBeTruthy();
    expect(getByText('MRR')).toBeTruthy();
    expect(getByText('$4,200')).toBeTruthy();
    expect(getByText('deploy.finished · ci')).toBeTruthy();
    expect(getByText('42 deploys today')).toBeTruthy();
    expect(container.querySelectorAll('[data-xen-pm-tile]')).toHaveLength(1);
  });

  it('hides the KPI row, feed pane, and badge when emptied', () => {
    const { container, queryByText } = render(
      <ProductMock kpis={[]} feed={[]} live={false} />
    );
    expect(container.querySelector('[data-xen-pm-tile]')).toBeNull();
    expect(container.querySelector('[data-xen-pm-feed]')).toBeNull();
    expect(queryByText('LIVE')).toBeNull();
    expect(container.querySelector('[data-xen-pm-badge]')).toBeNull();
  });

  it('can disable the entrance tilt', () => {
    const { container } = render(<ProductMock tilt={false} />);
    expect(
      container.querySelector('[data-xen-product-mock]')?.getAttribute('data-tilt')
    ).toBe('false');
  });

  it('is deterministic: two renders produce identical markup', () => {
    const a = render(<ProductMock variant="analytics" />);
    const b = render(<ProductMock variant="analytics" />);
    expect(a.container.innerHTML).toBe(b.container.innerHTML);
  });

  it('freezes every animation under prefers-reduced-motion (CSS kill switch)', () => {
    render(<ProductMock />);
    const css = sheet();
    expect(css).toContain('prefers-reduced-motion');
    expect(css).toContain('animation: none !important');
    expect(css).toContain('stroke-dashoffset: 0');
  });

  it('emits no hex literals in inline styles or the injected sheet', () => {
    for (const variant of ['analytics', 'chat', 'commerce', 'calendar'] as const) {
      const { container } = render(<ProductMock variant={variant} footnote="f" />);
      expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    }
    expect(sheet().length).toBeGreaterThan(0);
    expect(sheet()).not.toMatch(HEX_LITERAL);
  });
});
