/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { TreeV4 } from './TreeV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const DATA = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'a', label: 'app.ts' },
      { id: 'b', label: 'lib', children: [{ id: 'c', label: 'util.ts' }] },
    ],
  },
];

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

const rowFor = (c: HTMLElement, label: string): HTMLElement =>
  Array.from(c.querySelectorAll('[role="treeitem"]')).find(
    (n) => n.textContent?.includes(label)
  ) as HTMLElement;

describe('TreeV4 (web)', () => {
  it('tints the selected row instead of repainting it', () => {
    const { container } = renderThemed(
      <TreeV4 data={DATA} defaultExpanded={['src']} selectedId="a" />
    );
    const row = rowFor(container, 'app.ts');
    expect(row.getAttribute('data-selected')).toBe('true');
    // Not a solid brand bar.
    expect(row.className).not.toContain('bg-primary');
    expect(row.className).toContain('text-primary-text');
    expect(row.className).toContain('font-semibold');

    const css = document.getElementById('xen-v4-row-styles')?.textContent ?? '';
    expect(css).toContain('color-mix(in srgb, var(--xen-primary) 12%, var(--xen-surface))');
  });

  it('lets selection win over hover', () => {
    renderThemed(<TreeV4 data={DATA} selectedId="src" />);
    const css = document.getElementById('xen-v4-row-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-row][data-selected="true"]:hover');
    // …and the selected rule is written after the hover rule, so it wins.
    expect(css.indexOf('data-selected="true"')).toBeGreaterThan(
      css.indexOf('[data-interactive="true"]:hover')
    );
  });

  it('indents by the theme step, not a literal rem', () => {
    const { container } = renderThemed(<TreeV4 data={DATA} defaultExpanded={['src', 'b']} />);
    const depth = (label: string): string =>
      rowFor(container, label).style.getPropertyValue('--xen-v4-depth');
    expect(depth('src')).toBe('0');
    expect(depth('app.ts')).toBe('1');
    expect(depth('util.ts')).toBe('2');
    // …and the step it multiplies is the theme's, not a literal rem.
    const cls = rowFor(container, 'util.ts').className;
    expect(cls).toContain('pl-[calc(var(--xen-space-sm)_+_var(--xen-v4-depth,0)_*_var(--xen-space-lg))]');
    expect(cls).not.toContain('rem');
  });

  it('hovers from the two scheme-resolved neutral slots, never a ramp step', () => {
    const { container } = renderThemed(<TreeV4 data={DATA} />);
    expect(rowFor(container, 'src').className).not.toContain('bg-neutral-');
    const css = document.getElementById('xen-v4-row-styles')?.textContent ?? '';
    expect(css).toContain('color-mix(in srgb, var(--xen-on-surface) 8%, var(--xen-surface))');
    expect(css).not.toContain('--xen-neutral-');
  });

  it('rings focus with the semantic slot, not a ramp step', () => {
    const { container } = renderThemed(<TreeV4 data={DATA} />);
    const row = rowFor(container, 'src');
    expect(row.className).toContain('focus-visible:ring-ring');
    expect(row.className).not.toContain('ring-primary-300');
  });

  it('gives every row the data-display row height and no card', () => {
    const { container } = renderThemed(<TreeV4 data={DATA} defaultExpanded={['src']} />);
    container.querySelectorAll('[role="treeitem"]').forEach((row) => {
      expect(row.className).toContain('min-h-[calc(var(--xen-space-xl)_+_var(--xen-space-xs))]');
      expect(row.className).not.toContain('border');
      expect(row.className).not.toContain('shadow');
    });
  });

  it('draws no guide lines — indentation is the structure', () => {
    const { container } = renderThemed(<TreeV4 data={DATA} defaultExpanded={['src']} />);
    container.querySelectorAll('ul, li').forEach((el) => {
      expect(el.className).not.toContain('border-l');
      expect(el.className).not.toContain('divide');
    });
  });

  it('still expands, selects and answers the keyboard', () => {
    const picked: string[] = [];
    const { container, queryByText } = renderThemed(
      <TreeV4 data={DATA} onSelect={(n) => picked.push(n.id)} />
    );
    expect(queryByText('app.ts')).toBeNull();
    fireEvent.click(rowFor(container, 'src'));
    expect(queryByText('app.ts')).toBeTruthy();
    expect(picked).toEqual(['src']);

    fireEvent.keyDown(rowFor(container, 'src'), { key: 'ArrowLeft' });
    expect(queryByText('app.ts')).toBeNull();
    fireEvent.keyDown(rowFor(container, 'src'), { key: 'ArrowRight' });
    expect(queryByText('app.ts')).toBeTruthy();
    fireEvent.keyDown(rowFor(container, 'app.ts'), { key: 'Enter' });
    expect(picked).toEqual(['src', 'a']);
  });

  it('keeps the real ARIA tree roles', () => {
    const { container } = renderThemed(<TreeV4 data={DATA} defaultExpanded={['src']} />);
    expect(container.querySelector('[role="tree"]')).toBeTruthy();
    expect(container.querySelector('[role="group"]')).toBeTruthy();
    expect(rowFor(container, 'src').getAttribute('aria-expanded')).toBe('true');
    expect(rowFor(container, 'app.ts').getAttribute('aria-expanded')).toBeNull();
  });
});
