/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import type { ThemeSeed } from '../theme/types';
import { CardV4 } from './CardV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};
const FLAT_SEED: ThemeSeed = { ...SEED, depth: 'flat' };
const GLASS_SEED: ThemeSeed = { ...SEED, depth: 'glass' };

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  const result = render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
  const el = within(result.container).getByTestId('card');
  return { ...result, el };
}

describe('CardV4 (web)', () => {
  it('renders a token surface with a hairline and the historical padding', () => {
    const { el, getByText } = renderThemed(<CardV4 data-testid="card">inside</CardV4>);
    expect(getByText('inside')).toBeTruthy();
    expect(el.className).toContain('bg-surface');
    expect(el.className).toContain('border border-border');
    expect(el.className).toContain('p-[var(--xen-space-lg)]');
    expect(el.className).toContain('rounded-[var(--xen-radius-lg)]');
  });

  it('raises with elevation.card — the seed decision, not a Tailwind step', () => {
    const theme = compileTheme(SEED);
    const { el } = renderThemed(<CardV4 data-testid="card" variant="elevated" />);
    expect(el.getAttribute('data-raised')).toBe('true');
    expect(el.style.getPropertyValue('--xen-v4-shadow-l')).toContain(
      `${theme.lightElevation.card.offsetY}px`
    );
    // A dark page needs MORE shadow, not less — a fixed utility cannot say that.
    expect(el.style.getPropertyValue('--xen-v4-shadow-d')).not.toBe(
      el.style.getPropertyValue('--xen-v4-shadow-l')
    );
    expect(theme.darkElevation.card.opacity).toBeGreaterThan(theme.lightElevation.card.opacity);
  });

  it('keeps the hairline on a raised card so it cannot dissolve', () => {
    const { el } = renderThemed(<CardV4 data-testid="card" variant="elevated" />);
    expect(el.className).toContain('border border-border');
  });

  it('drops the edge and the shadow only for `flat`', () => {
    (['outlined', 'elevated', 'interactive'] as const).forEach((variant) => {
      const { el } = renderThemed(<CardV4 data-testid="card" variant={variant} />);
      expect(el.className).toContain('border border-border');
    });
    const { el } = renderThemed(<CardV4 data-testid="card" variant="flat" />);
    expect(el.className).not.toContain('border-border');
    expect(el.getAttribute('data-raised')).toBe('false');
    expect(el.style.getPropertyValue('--xen-v4-shadow-l')).toBe('');
  });

  it("falls flat for a depth:'flat' seed without branching on depth", () => {
    const { el } = renderThemed(<CardV4 data-testid="card" variant="elevated" />, FLAT_SEED);
    // The card still asks for elevation.card; the compiler already zeroed it.
    expect(el.style.getPropertyValue('--xen-v4-shadow-l')).toContain('/ 0)');
  });

  it("wears the translucent pair only when the seed says depth:'glass'", () => {
    const theme = compileTheme(GLASS_SEED);
    const { el } = renderThemed(<CardV4 data-testid="card" />, GLASS_SEED);
    expect(el.getAttribute('data-glass')).toBe('true');
    expect(el.style.getPropertyValue('--xen-v4-tint-l')).toBe(theme.lightGlass.tint);
    expect(el.style.getPropertyValue('--xen-v4-tint-d')).toBe(theme.darkGlass.tint);
    expect(el.style.getPropertyValue('--xen-v4-edge-l')).toBe(theme.lightGlass.border);
    expect(el.style.getPropertyValue('--xen-v4-blur')).toBe(`${theme.lightGlass.blur}px`);

    // A soft seed stays opaque — §8, no glassmorphism without purpose.
    const soft = renderThemed(<CardV4 data-testid="card" />);
    expect(soft.el.getAttribute('data-glass')).toBe('false');
    expect(soft.el.style.getPropertyValue('--xen-v4-tint-l')).toBe('');
  });

  it('honours the padding and radius scales', () => {
    const { el } = renderThemed(<CardV4 data-testid="card" padding="sm" radius="md" />);
    expect(el.className).toContain('p-[var(--xen-space-sm)]');
    expect(el.className).toContain('rounded-[var(--xen-radius-md)]');
    const none = renderThemed(<CardV4 data-testid="card" padding="none" />);
    expect(none.el.className).toContain('p-0');
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const { el } = renderThemed(
      <CardV4 data-testid="card" ref={(n) => { node = n; }} id="panel" role="group" />
    );
    expect(node).toBe(el);
    expect(el.getAttribute('id')).toBe('panel');
    expect(el.getAttribute('role')).toBe('group');
  });

  it('degrades to the flat token look with no provider rather than throwing', () => {
    const { getByTestId } = render(<CardV4 data-testid="card" variant="elevated" />);
    const el = getByTestId('card');
    expect(el.className).toContain('bg-surface');
    expect(el.style.getPropertyValue('--xen-v4-shadow-l')).toBe('');
  });

  it('names no literal colour in its classes — every value is a token', () => {
    const { el } = renderThemed(<CardV4 data-testid="card" variant="elevated" />);
    expect(el.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('injects the depth sheet once, with the glass and dark rules', () => {
    renderThemed(<CardV4 data-testid="card" />);
    renderThemed(<CardV4 data-testid="card" />);
    expect(document.querySelectorAll('#xen-v4-card-styles')).toHaveLength(1);
    const css = document.getElementById('xen-v4-card-styles')?.textContent ?? '';
    expect(css).toContain('backdrop-filter');
    expect(css).toContain('[data-theme="dark"] [data-xen-v4-card][data-raised="true"]');
  });
});
