/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { JsonViewerV4 } from './JsonViewerV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const VALUE = {
  name: 'Ada',
  count: 42,
  active: true,
  missing: null,
  nested: { deep: { deeper: 1 } },
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  const el = result.container.querySelector('[data-xen-v4-code]') as HTMLElement;
  return { ...result, el };
}

const sheet = (): string => document.getElementById('xen-v4-code-styles')?.textContent ?? '';

describe('JsonViewerV4 (web)', () => {
  it('inks every syntax role with a contrast-safe TEXT slot, never a fill', () => {
    const { getByText } = renderThemed(<JsonViewerV4 value={VALUE} defaultExpandDepth={3} />);
    expect(getByText('name:').className).toBe('text-accent-text');
    expect(getByText('"Ada"').className).toBe('text-on-surface');
    expect(getByText('42').className).toBe('text-primary-text');
    expect(getByText('true').className).toBe('text-warn-text');
    expect(getByText('null').className).toBe('text-muted-text');

    // The fill classes the base used carry no promise as ink on `surface`.
    ['text-accent', 'text-primary', 'text-warn'].forEach((fill) => {
      expect(getByText('name:').className.split(' ')).not.toContain(fill);
      expect(getByText('42').className.split(' ')).not.toContain(fill);
      expect(getByText('true').className.split(' ')).not.toContain(fill);
    });
  });

  it('sinks the tree onto the same recessed ground as the code block', () => {
    const { el } = renderThemed(<JsonViewerV4 value={VALUE} />);
    expect(el.getAttribute('data-xen-v4-code-body')).toBe('');
    expect(sheet()).toContain(
      '[data-xen-v4-code-body] { background-color: color-mix(in srgb, var(--xen-on-surface) 4%, var(--xen-surface))'
    );
    expect(el.className).not.toContain('bg-surface');
    expect(sheet()).not.toContain('--xen-neutral-');
  });

  it('guides each nesting level and steps by a token, not a literal rem', () => {
    const { el } = renderThemed(<JsonViewerV4 value={VALUE} defaultExpandDepth={3} />);
    const levels = Array.from(el.querySelectorAll('[data-xen-v4-json-level]'));
    expect(levels.length).toBeGreaterThan(0);
    levels.forEach((l) => {
      expect(l.className).toContain('ml-[var(--xen-space-sm)]');
      expect(l.className).toContain('pl-[var(--xen-space-sm)]');
      expect(l.className).not.toContain('rem');
    });
    expect(sheet()).toContain('[data-xen-v4-json-level] { border-left: 1px solid');
    // The root level draws no guide — there is no parent to point at.
    expect(el.firstElementChild?.hasAttribute('data-xen-v4-json-level')).toBe(false);
  });

  it('rings focus with the semantic slot and tints a branch on hover', () => {
    const { el } = renderThemed(<JsonViewerV4 value={VALUE} />);
    const branch = el.querySelector('[data-xen-v4-json-branch]') as HTMLElement;
    expect(branch.className).toContain('focus-visible:ring-ring');
    expect(branch.className).not.toContain('ring-primary-300');
    expect(sheet()).toContain('[data-xen-v4-json-branch]:hover');
  });

  it('collapses and expands a branch, and reports it to AT', () => {
    const { el, queryByText, getByText } = renderThemed(
      <JsonViewerV4 value={VALUE} defaultExpandDepth={1} />
    );
    expect(queryByText('deep:')).toBeNull();
    const nested = Array.from(el.querySelectorAll('[data-xen-v4-json-branch]')).find((b) =>
      b.textContent?.startsWith('▸nested:')
    ) as HTMLElement;
    expect(nested.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(nested);
    expect(getByText('deep:')).toBeTruthy();
    expect(nested.getAttribute('aria-expanded')).toBe('true');
  });

  it('summarises a branch by its size and hides the caret from AT', () => {
    const { el, getByText } = renderThemed(<JsonViewerV4 value={{ a: [1, 2, 3] }} />);
    expect(getByText('[3]')).toBeTruthy();
    const caret = el.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(caret.textContent).toBe('▾');
  });

  it('honours rootLabel', () => {
    const { getByText } = renderThemed(<JsonViewerV4 value={VALUE} rootLabel="payload" />);
    expect(getByText('payload:')).toBeTruthy();
  });

  it('carries no gradient and no sixth colour — §35.5, §35.11', () => {
    const { el } = renderThemed(<JsonViewerV4 value={VALUE} defaultExpandDepth={3} />);
    expect(el.innerHTML).not.toContain('gradient');
    expect(sheet()).not.toContain('gradient');
    // Five roles, five inks, all from the seed — nothing invented locally.
    const SIZES = new Set(['text-xs', 'text-sm', 'text-base']);
    const inks = new Set(
      Array.from(el.querySelectorAll('span'))
        .flatMap((s) => s.className.split(' '))
        .filter((c) => c.startsWith('text-') && !SIZES.has(c))
    );
    expect([...inks].sort()).toEqual([
      'text-accent-text',
      'text-muted-text',
      'text-on-surface',
      'text-primary-text',
      'text-warn-text',
    ]);
  });
});
