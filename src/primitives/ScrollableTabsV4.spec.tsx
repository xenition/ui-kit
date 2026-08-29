/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { ScrollableTabsV4 } from './ScrollableTabsV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const ITEMS = [
  { value: 'a', label: 'All' },
  { value: 'b', label: 'Unread', badge: 12 },
  { value: 'c', label: 'Archived' },
];

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

describe('ScrollableTabsV4 (web)', () => {
  it('renders a scrolling tablist and reports the selected tab', () => {
    const { getByRole, getAllByRole } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="b" onValueChange={() => {}} />
    );
    expect(getByRole('tablist').className).toContain('overflow-x-auto');
    const tabs = getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('true');
  });

  it('says "selected" in colour AND weight', () => {
    const { getAllByRole } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="b" onValueChange={() => {}} />
    );
    const [inactive, active] = getAllByRole('tab');
    expect(active!.className).toContain('font-semibold');
    expect(active!.className).toContain('text-primary-text');
    expect(inactive!.className).toContain('text-muted');
    // Never the bare fill slot, which carries no contrast promise as text.
    expect(active!.className).not.toMatch(/\btext-primary(?![-\w])/);
  });

  it('gives every tab a 44px target composed from the spacing scale', () => {
    const { getAllByRole } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="a" onValueChange={() => {}} />
    );
    getAllByRole('tab').forEach((tab) => {
      expect(tab.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
    });
  });

  it('scrolls the selected tab into view when the selection changes elsewhere', () => {
    const scrollIntoView = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;
    const { rerender } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="a" onValueChange={() => {}} />
    );
    scrollIntoView.mockClear();
    rerender(
      <XenitionUIProvider theme={SEED}>
        <ScrollableTabsV4 items={ITEMS} value="c" onValueChange={() => {}} />
      </XenitionUIProvider>
    );
    expect(scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ inline: 'nearest', behavior: 'smooth' })
    );
  });

  it('jumps instead of gliding when the user asked for reduced motion', () => {
    const scrollIntoView = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;
    window.matchMedia = ((query: string) => ({
      matches: query.includes('reduce'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;

    renderThemed(<ScrollableTabsV4 items={ITEMS} value="b" onValueChange={() => {}} />);
    expect(scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'auto' })
    );
    // @ts-expect-error — restore jsdom's default (absent) implementation.
    delete window.matchMedia;
  });

  it('gives the count chip a ground it owns, not one it borrows', () => {
    const { getAllByRole, container } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="b" onValueChange={() => {}} />
    );
    const chip = container.querySelector('[data-xen-v4-nav-badge]');
    expect(chip?.textContent).toBe('12');
    expect(chip?.getAttribute('data-xen-v4-nav-badge')).toBe('on');
    // The idle form is the same element with the attribute empty.
    fireEvent.click(getAllByRole('tab')[0]!);
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-nav-badge="on"]');
    // Opaque mix, not a translucent tint that borrows what is behind it.
    expect(css).toContain('color-mix(in srgb, var(--xen-on-surface) 12%, var(--xen-surface))');
    // The base bar labelled the chip `text-surface` on a `primary` fill.
    expect(chip?.className).not.toContain('text-surface');
  });

  it('emits the pressed tab value', () => {
    const onValueChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="a" onValueChange={onValueChange} />
    );
    fireEvent.click(getAllByRole('tab')[2]!);
    expect(onValueChange).toHaveBeenCalledWith('c');
  });

  it('names no literal colour — every value is a token', () => {
    const { getByRole } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="a" onValueChange={() => {}} />
    );
    expect(getByRole('tablist').outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const { getByRole } = renderThemed(
      <ScrollableTabsV4
        items={ITEMS}
        value="a"
        onValueChange={() => {}}
        ref={(n) => {
          node = n;
        }}
        id="filters"
      />
    );
    const el = getByRole('tablist');
    expect(node).toBe(el);
    expect(el.getAttribute('id')).toBe('filters');
  });
});
