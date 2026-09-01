/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import { ButtonV4 } from '../primitives/ButtonV4';
import { COMMERCE_EMPTY_PRESETS, EmptyStateV4 } from './EmptyStateV4';
import type { CommerceEmptyKind } from './EmptyStateV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container;
}

const root = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-empty-state]') as HTMLElement;

const KINDS = Object.keys(COMMERCE_EMPTY_PRESETS) as CommerceEmptyKind[];

beforeEach(() => {
  installMatchMedia(false);
});

describe('EmptyStateV4 (commerce, web)', () => {
  // ── it composes the primitive, it does not redraw it ─────────────────

  it('renders the primitive EmptyStateV4 rather than a second empty state', () => {
    const c = mount(<EmptyStateV4 kind="cart" />);
    const el = root(c);
    expect(el).not.toBeNull();
    // The primitive's V4 line: no dashed placeholder box (§11, §8), heading
    // face on the title, the largest gap under the action.
    expect(el.className).not.toContain('border-dashed');
    expect(el.className).not.toContain('rounded');
    expect(el.querySelector('.font-heading')).not.toBeNull();
  });

  it('is a different component from `commerce/EmptyState`, which is the primitive re-exported', async () => {
    const { EmptyState } = await import('./EmptyState');
    const { EmptyState: Primitive } = await import('../primitives/EmptyState');
    expect(EmptyState).toBe(Primitive);
    expect((EmptyStateV4 as unknown) === (Primitive as unknown)).toBe(false);
  });

  // ── the new prop ────────────────────────────────────────────────────

  it('supplies a headline, a supporting line and a glyph for each of the five kinds', () => {
    KINDS.forEach((kind) => {
      const preset = COMMERCE_EMPTY_PRESETS[kind];
      const c = mount(<EmptyStateV4 kind={kind} />);
      expect(root(c).textContent).toContain(preset.title);
      expect(root(c).textContent).toContain(preset.description);
      expect(root(c).getAttribute('data-xen-commerce-empty')).toBe(kind);
      // A categorical mark, in the soft tinted circular badge §4.7 asks for.
      const icon = root(c).querySelector('[data-xen-v4-icon]') as HTMLElement;
      expect(icon).not.toBeNull();
      expect(icon.getAttribute('data-badge')).toBe('soft');
    });
  });

  it('lets the caller beat every part of a preset', () => {
    const c = mount(
      <EmptyStateV4
        kind="cart"
        title="Nothing here yet"
        description="Have a browse."
        icon={<span data-testid="own-art">▲</span>}
      />
    );
    expect(root(c).textContent).toContain('Nothing here yet');
    expect(root(c).textContent).toContain('Have a browse.');
    expect(root(c).textContent).not.toContain(COMMERCE_EMPTY_PRESETS.cart.title);
    // A caller's illustration is passed through untouched — not re-badged.
    expect(root(c).querySelector('[data-testid="own-art"]')).not.toBeNull();
    expect(root(c).querySelector('[data-xen-v4-icon]')).toBeNull();
  });

  it('is exactly the primitive when given no kind', () => {
    const c = mount(<EmptyStateV4 title="No results" description="Try again." />);
    expect(root(c).textContent).toContain('No results');
    expect(root(c).querySelector('[data-xen-v4-icon]')).toBeNull();
    expect(root(c).getAttribute('data-xen-commerce-empty')).toBe('');
  });

  it('gives the action the terminal slot §15 asks for', () => {
    const c = mount(<EmptyStateV4 kind="cart" action={<ButtonV4>Browse products</ButtonV4>} />);
    expect(root(c).textContent).toContain('Browse products');
    // One action, and it is last.
    expect(root(c).querySelectorAll('button')).toHaveLength(1);
    expect(root(c).lastElementChild?.textContent).toBe('Browse products');
  });

  // ── the empty case (§4.5) ───────────────────────────────────────────

  it('renders nothing when it has nothing to say — no title and no kind', () => {
    const c = mount(<EmptyStateV4 />);
    expect(c.querySelector('[data-xen-empty-state]')).toBeNull();
  });

  it('renders nothing for an empty-string title with no kind to fall back on', () => {
    const c = mount(<EmptyStateV4 title="" description="orphaned copy" />);
    expect(c.querySelector('[data-xen-empty-state]')).toBeNull();
  });

  it('survives having no description, no icon and no action', () => {
    const c = mount(<EmptyStateV4 title="No orders" />);
    expect(root(c).textContent).toBe('No orders');
    expect(root(c).querySelector('button')).toBeNull();
  });

  // ── the accessible label ────────────────────────────────────────────

  it('hides the decorative glyph and lets the copy be the announcement', () => {
    const c = mount(<EmptyStateV4 kind="orders" />);
    const iconSlot = root(c).querySelector('[data-xen-empty-icon]') as HTMLElement;
    expect(iconSlot.getAttribute('aria-hidden')).toBe('true');
  });

  it('takes an aria-label and passes the rest of its DOM props through', () => {
    const c = mount(<EmptyStateV4 kind="search" aria-label="No matching products" id="es" />);
    expect(root(c).getAttribute('aria-label')).toBe('No matching products');
    expect(root(c).id).toBe('es');
  });

  it('forwards its ref', () => {
    let node: HTMLDivElement | null = null;
    const c = mount(
      <EmptyStateV4
        kind="cart"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(root(c));
  });
});
