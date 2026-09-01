/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import { ProductCardV4 } from './ProductCardV4';
import { COLUMN_TIERS, ProductGridV4 } from './ProductGridV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'light',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container;
}

const grid = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-product-grid]') as HTMLElement;

const tile = (key: string): ReactElement => (
  <ProductCardV4 key={key} title={key} priceCents={2400} />
);

beforeEach(() => {
  installMatchMedia(false);
});

describe('ProductGridV4 (web)', () => {
  // ── layout only ─────────────────────────────────────────────────────

  it('renders its children exactly as handed over — no wrapper, no restyling', () => {
    const c = mount(<ProductGridV4>{[tile('Mug'), tile('Napkin')]}</ProductGridV4>);
    const cards = grid(c).querySelectorAll('[data-xen-product-card]');
    expect(cards).toHaveLength(2);
    // Each card is a direct child: nothing was wrapped around it.
    cards.forEach((card) => expect(card.parentElement).toBe(grid(c)));
  });

  it('adds no ground, no border and no padding of its own', () => {
    const className = grid(mount(<ProductGridV4>{tile('Mug')}</ProductGridV4>)).className;
    expect(className).toContain('grid');
    expect(className).not.toContain('bg-');
    expect(className).not.toContain('border');
    expect(className).not.toMatch(/\bp-/);
    // Nothing reaching into a child's styling.
    expect(className).not.toContain('[&>');
  });

  // ── the new props ───────────────────────────────────────────────────

  it('steps its columns the way COLUMN_TIERS says, at every ceiling', () => {
    ([
      [2, 'grid-cols-1 sm:grid-cols-2'],
      [3, 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'],
      [4, 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'],
    ] as const).forEach(([columns, expected]) => {
      const c = mount(<ProductGridV4 columns={columns}>{tile('Mug')}</ProductGridV4>);
      expected.split(' ').forEach((cls) => expect(grid(c).className).toContain(cls));
      // …and the classes really are the tier table, spelled as Tailwind.
      const [base, sm, lg] = COLUMN_TIERS[columns];
      expect(expected).toContain(`grid-cols-${base}`);
      expect(expected).toContain(`sm:grid-cols-${sm}`);
      if (lg !== sm) expect(expected).toContain(`lg:grid-cols-${lg}`);
    });
  });

  it('defaults to a ceiling of four — the same default as the native twin', () => {
    const c = mount(<ProductGridV4>{tile('Mug')}</ProductGridV4>);
    expect(grid(c).className).toContain('lg:grid-cols-4');
    expect(COLUMN_TIERS[4][2]).toBe(4);
  });

  it('takes its gutter off the spacing scale, defaulting to lg', () => {
    expect(grid(mount(<ProductGridV4>{tile('a')}</ProductGridV4>)).className).toContain('gap-lg');
    (['sm', 'md', 'lg'] as const).forEach((gap) => {
      const c = mount(<ProductGridV4 gap={gap}>{tile('a')}</ProductGridV4>);
      expect(grid(c).className).toContain(`gap-${gap}`);
    });
  });

  // ── the empty case (§4.5) ───────────────────────────────────────────

  it('renders nothing at all with no children and no empty state', () => {
    const c = mount(<ProductGridV4 />);
    expect(c.querySelector('[data-xen-product-grid]')).toBeNull();
  });

  it('renders the empty state instead of an empty grid, without the gutters', () => {
    const c = mount(<ProductGridV4 empty={<p>No products</p>} />);
    const el = grid(c);
    expect(el.hasAttribute('data-xen-product-grid-empty')).toBe(true);
    expect(el.textContent).toBe('No products');
    expect(el.className).not.toContain('grid-cols');
  });

  it('treats children that all render nothing as empty', () => {
    const show = false;
    const c = mount(<ProductGridV4 empty={<p>No products</p>}>{show && tile('Mug')}</ProductGridV4>);
    expect(grid(c).hasAttribute('data-xen-product-grid-empty')).toBe(true);
  });

  // ── the accessible label ────────────────────────────────────────────

  it('names the grid, in both the populated and the empty case', () => {
    const full = mount(<ProductGridV4 label="Featured products">{tile('Mug')}</ProductGridV4>);
    expect(grid(full).getAttribute('aria-label')).toBe('Featured products');
    const none = mount(<ProductGridV4 label="Search results" empty={<p>None</p>} />);
    expect(grid(none).getAttribute('aria-label')).toBe('Search results');
  });

  it('leaves the grid unnamed when it was given no label, rather than inventing one', () => {
    const c = mount(<ProductGridV4>{tile('Mug')}</ProductGridV4>);
    expect(grid(c).hasAttribute('aria-label')).toBe(false);
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const c = mount(
      <ProductGridV4
        id="pg"
        ref={(n) => {
          node = n;
        }}
      >
        {tile('Mug')}
      </ProductGridV4>
    );
    expect(node).toBe(c.querySelector('#pg'));
  });
});
