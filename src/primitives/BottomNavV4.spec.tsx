/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { BottomNavV4 } from './BottomNavV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};
const GLASS_SEED: ThemeSeed = { ...SEED, depth: 'glass' };

const ITEMS = [
  { key: 'home', label: 'Home', icon: <span data-testid="icon-home">H</span> },
  { key: 'search', label: 'Search', icon: <span>S</span> },
  { key: 'me', label: 'Me' },
];

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  return render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
}

describe('BottomNavV4 (web)', () => {
  it('renders a tablist of tabs and reports the active one', () => {
    const { getAllByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="search" onChange={() => {}} />
    );
    const tabs = getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('true');
    expect(tabs[0]!.getAttribute('aria-selected')).toBe('false');
  });

  it('says "you are here" in three independent channels', () => {
    const { getAllByRole, container } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />
    );
    const [live, idle] = getAllByRole('tab');
    // 1. weight, 2. a contrast-safe text colour, 3. a contained fill.
    expect(live!.className).toContain('font-semibold');
    expect(live!.className).toContain('text-primary-text');
    expect(idle!.className).toContain('font-medium');
    expect(idle!.className).toContain('text-muted');
    expect(container.querySelectorAll('[data-xen-v4-nav-pill]')).toHaveLength(1);
    expect(live!.querySelector('[data-xen-v4-nav-pill]')).not.toBeNull();
  });

  it('never colours the label with the bare fill slot', () => {
    const { getAllByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />
    );
    expect(getAllByRole('tab')[0]!.className).not.toMatch(/\btext-primary(?![-\w])/);
  });

  it('composites the indicator opaquely rather than tinting through the bar', () => {
    renderThemed(<BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />);
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('color-mix(in srgb, var(--xen-primary) 14%, var(--xen-surface))');
  });

  it('gives every cell a 44px target and clears the home indicator', () => {
    const { getAllByRole, getByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />
    );
    getAllByRole('tab').forEach((tab) => {
      expect(tab.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
    });
    expect(getByRole('tablist').className).toContain('env(safe-area-inset-bottom)');
  });

  it('floats on `elevation.sheet`, whose offset already points the right way', () => {
    const { getByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />
    );
    expect(getByRole('tablist').getAttribute('data-xen-v4-nav-bar')).toBe('');
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-nav-bar]');
    expect(css).toContain('box-shadow: var(--xen-elevation-sheet)');
  });

  it("frosts only when the seed said depth:'glass'", () => {
    const { getByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />,
      GLASS_SEED
    );
    expect(getByRole('tablist').getAttribute('data-xen-v4-nav-bar')).toBe('glass');
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-nav-bar="glass"]');
    expect(css).toContain('backdrop-filter');

    // A soft seed stays opaque — §8, no glassmorphism without purpose.
    const soft = renderThemed(<BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />);
    expect(
      within(soft.container).getByRole('tablist').getAttribute('data-xen-v4-nav-bar')
    ).toBe('');
  });

  it('renders an item with no icon without an empty indicator', () => {
    const { getAllByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="me" onChange={() => {}} />
    );
    expect(getAllByRole('tab')[2]!.querySelector('[data-xen-v4-nav-pill]')).toBeNull();
    expect(getAllByRole('tab')[2]!.className).toContain('font-semibold');
  });

  it('emits the clicked key', () => {
    const onChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={onChange} />
    );
    fireEvent.click(getAllByRole('tab')[1]!);
    expect(onChange).toHaveBeenCalledWith('search');
  });

  it('names no literal colour — every value is a token', () => {
    const { getByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />
    );
    expect(getByRole('tablist').outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('degrades without a provider rather than throwing', () => {
    const { getAllByRole, getByRole } = render(
      <BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />
    );
    expect(getAllByRole('tab')).toHaveLength(3);
    expect(getByRole('tablist').getAttribute('data-xen-v4-nav-bar')).toBe('');
  });
});
