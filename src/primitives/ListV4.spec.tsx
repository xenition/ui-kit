/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { ListV4 } from './ListV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const ITEMS = [
  { title: 'Ada Lovelace', description: 'Analytical engine' },
  { title: 'Grace Hopper', description: 'Compilers' },
];

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

describe('ListV4 (web)', () => {
  it('typesets the hierarchy instead of drawing it', () => {
    const { getByText, container } = renderThemed(<ListV4 items={ITEMS} />);
    expect(getByText('Ada Lovelace').className).toContain('text-base');
    expect(getByText('Ada Lovelace').className).toContain('font-semibold');
    expect(getByText('Analytical engine').className).toContain('text-xs');
    expect(getByText('Analytical engine').className).toContain('text-muted');
    // …so the row needs no line under it.
    expect((container.firstChild as HTMLElement).className).not.toContain('divide-y');
  });

  it('keeps the one border that a list earns, and no divider inside it', () => {
    const { container } = renderThemed(<ListV4 items={ITEMS} />);
    const ul = container.querySelector('ul') as HTMLElement;
    expect(ul.className).toContain('border border-border');
    container.querySelectorAll('[data-xen-v4-row]').forEach((row) => {
      expect(row.className).not.toContain('border');
    });
  });

  it('gives every row the V4 tap target', () => {
    const { container } = renderThemed(<ListV4 items={ITEMS} />);
    container.querySelectorAll('[data-xen-v4-row]').forEach((row) => {
      expect(row.className).toContain('min-h-[var(--xen-space-2xl)]');
    });
  });

  it('hovers from the two scheme-resolved slots, never from the ramp', () => {
    renderThemed(<ListV4 items={[{ ...ITEMS[0], onClick: () => {} } as never]} />);
    const css = document.getElementById('xen-v4-row-styles')?.textContent ?? '';
    expect(css).toContain('color-mix(in srgb, var(--xen-on-surface) 8%, var(--xen-surface))');
    expect(css).toContain(':focus-visible');
    // `bg-neutral-50` mirrors to a near-white slab in dark mode.
    expect(css).not.toContain('--xen-neutral-');
    // A tint, never a lift.
    expect(css).not.toContain('box-shadow');
  });

  it('makes only a clickable row interactive, and fires it', () => {
    const seen: string[] = [];
    const { container, getByText } = renderThemed(
      <ListV4
        items={[
          { title: 'Tap me', onClick: () => seen.push('tap') },
          { title: 'Static' },
        ]}
      />
    );
    const rows = Array.from(container.querySelectorAll('[data-xen-v4-row]'));
    expect(rows.map((r) => r.getAttribute('data-interactive'))).toEqual(['true', 'false']);
    expect(rows[0]?.tagName).toBe('BUTTON');
    fireEvent.click(getByText('Tap me'));
    expect(seen).toEqual(['tap']);
  });

  it('renders the leading and trailing slots without letting them shrink', () => {
    const { getByText } = renderThemed(
      <ListV4 items={[{ title: 'Row', leading: <i>L</i>, trailing: <b>T</b> }]} />
    );
    expect(getByText('L').parentElement?.className).toContain('shrink-0');
    expect(getByText('T').parentElement?.className).toContain('shrink-0');
  });

  it('names no literal colour', () => {
    const { container } = renderThemed(<ListV4 items={ITEMS} />);
    // The provider's own <style> carries the resolved tokens; the list itself
    // must not name a colour.
    const ul = container.querySelector('ul') as HTMLElement;
    expect(ul.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    const css = document.getElementById('xen-v4-row-styles')?.textContent ?? '';
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
