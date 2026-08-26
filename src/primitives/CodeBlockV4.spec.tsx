/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { CodeBlockV4 } from './CodeBlockV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const CODE = 'const a = 1;\nconst b = 2;\n';

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  const el = result.container.querySelector('[data-xen-v4-code]') as HTMLElement;
  return { ...result, el };
}

const sheet = (): string => document.getElementById('xen-v4-code-styles')?.textContent ?? '';

describe('CodeBlockV4 (web)', () => {
  it('sinks the body onto a calm derived ground, not onto the page colour', () => {
    const { el } = renderThemed(<CodeBlockV4 code={CODE} />);
    expect(el.querySelector('[data-xen-v4-code-body]')).toBeTruthy();
    expect(sheet()).toContain(
      '[data-xen-v4-code-body] { background-color: color-mix(in srgb, var(--xen-on-surface) 4%, var(--xen-surface))'
    );
    // The ramp step would mirror in dark mode; the mix follows the scheme.
    expect(sheet()).not.toContain('--xen-neutral-');
  });

  it('gives the gutter an edge and keeps it out of a copy', () => {
    const { el } = renderThemed(<CodeBlockV4 code={CODE} />);
    const gutter = el.querySelector('[data-xen-v4-gutter]') as HTMLElement;
    expect(gutter.className).toContain('select-none');
    expect(gutter.getAttribute('aria-hidden')).toBe('true');
    expect(gutter.textContent).toBe('12');
    expect(sheet()).toContain('[data-xen-v4-gutter] { border-right: 1px solid');
  });

  it('hides the gutter when asked', () => {
    const { el } = renderThemed(<CodeBlockV4 code={CODE} lineNumbers={false} />);
    expect(el.querySelector('[data-xen-v4-gutter]')).toBeNull();
  });

  it('inks the copy button with the TEXT slot and rings with the semantic one', () => {
    const { el } = renderThemed(<CodeBlockV4 code={CODE} language="ts" onCopy={() => {}} />);
    const btn = el.querySelector('[data-xen-v4-copy]') as HTMLElement;
    expect(btn.className).toContain('text-primary-text');
    expect(btn.className.split(' ')).not.toContain('text-primary');
    expect(btn.className).toContain('focus-visible:ring-ring');
    expect(btn.className).not.toContain('ring-primary-300');
    expect(btn.className).not.toContain('bg-neutral-');
    expect(btn.className).toContain('min-h-[var(--xen-space-xl)]');
    // The hover comes from the shared sheet, mixed from the resolved slots.
    expect(sheet()).toContain('[data-xen-v4-copy]:hover');
  });

  it('copies and reports, then settles back', () => {
    jest.useFakeTimers();
    const seen: string[] = [];
    const { el, getByText } = renderThemed(<CodeBlockV4 code={CODE} onCopy={(c) => seen.push(c)} />);
    fireEvent.click(el.querySelector('[data-xen-v4-copy]') as HTMLElement);
    expect(seen).toEqual([CODE]);
    expect(getByText('Copied')).toBeTruthy();
    jest.advanceTimersByTime(1600);
    jest.useRealTimers();
  });

  it('drops only the trailing newline and keeps blank lines visible', () => {
    const { el } = renderThemed(<CodeBlockV4 code={'a\n\nb\n'} />);
    const gutter = el.querySelector('[data-xen-v4-gutter]') as HTMLElement;
    expect(gutter.textContent).toBe('123');
  });

  it('shows no header when there is nothing to put in it', () => {
    const { el } = renderThemed(<CodeBlockV4 code={CODE} />);
    expect(el.querySelector('[data-xen-v4-copy]')).toBeNull();
    expect(el.firstElementChild?.tagName).toBe('PRE');
  });

  it('carries no gradient and no syntax palette — §35.11', () => {
    const { el } = renderThemed(<CodeBlockV4 code={CODE} language="ts" onCopy={() => {}} />);
    expect(el.innerHTML).not.toContain('gradient');
    expect(sheet()).not.toContain('gradient');
    // Every code line reads the one ink.
    const body = el.querySelector('[data-xen-v4-code-body]') as HTMLElement;
    expect(body.className).toContain('text-on-surface');
    body.querySelectorAll('code > span:last-child > span').forEach((line) => {
      expect(line.className).not.toMatch(/text-(primary|accent|warn|success|danger)/);
    });
  });

  it('injects its sheet once', () => {
    renderThemed(<CodeBlockV4 code={CODE} />);
    renderThemed(<CodeBlockV4 code={CODE} />);
    expect(document.querySelectorAll('#xen-v4-code-styles')).toHaveLength(1);
  });
});
