/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { AuthProviderButtonV4 } from './AuthProviderButtonV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return { ...result, q: within(result.container) };
}

const GOOGLE = 'Continue with Google';

/**
 * The provider renders its `<style>` block and a `data-theme` wrapper into the
 * container; the component's own markup is inside the wrapper.
 */
function page(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-theme]') as HTMLElement;
}

describe('AuthProviderButtonV4 (web)', () => {
  it('takes the field metric, so the auth stack shares an edge (Addendum §1)', () => {
    const { q } = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" />);
    const el = q.getByRole('button', { name: GOOGLE });
    // The same two strings `InputV4` carries — 48 / radius.md, off the scales,
    // NOT §9's literal 56 / radius.lg.
    expect(el.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(el.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(el.className).toContain('px-lg');
    // No named 56 anywhere: the metric is a token reference, not a literal.
    expect(el.className).not.toContain('h-14');
    expect(el.className).not.toContain('radius-full');
  });

  it('is outlined, not filled — the CTA keeps the only dominant fill (§5)', () => {
    const { q } = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" />);
    const el = q.getByRole('button', { name: GOOGLE });
    expect(el.className).toContain('bg-surface');
    expect(el.className).toContain('border');
    expect(el.className).toContain('border-border');
    expect(el.className).not.toContain('bg-primary');
  });

  it('composes the V4 children (§10.5): IconV4 leads, TextV4 labels', () => {
    const { q, container } = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" />);
    const icon = container.querySelector('[data-xen-v4-icon]');
    expect(icon).toBeTruthy();
    expect(icon?.textContent).toBe('G');
    const text = q.getByText(GOOGLE);
    expect(text.getAttribute('data-xen-v4-text')).toBe('base');
    expect(text.className).toContain('font-semibold');
    // The mark leads the label.
    const order = icon!.compareDocumentPosition(text) & Node.DOCUMENT_POSITION_FOLLOWING;
    expect(order).toBeTruthy();
  });

  it('accepts a named icon as well as a one-off glyph', () => {
    const { container } = renderThemed(<AuthProviderButtonV4 label="Continue with email" name="mail" />);
    expect(container.querySelector('[data-xen-v4-icon]')).toBeTruthy();
  });

  it('EMPTY STATE — no glyph and no name renders the label alone, not a hole', () => {
    const { q, container } = renderThemed(<AuthProviderButtonV4 label="Single sign-on" />);
    expect(container.querySelector('[data-xen-v4-icon]')).toBeNull();
    const el = q.getByRole('button', { name: 'Single sign-on' });
    expect(el.textContent).toBe('Single sign-on');
  });

  it('wears the shared M3 state layer, grounded on the fill it owns', () => {
    const { q } = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" />);
    const el = q.getByRole('button', { name: GOOGLE });
    expect(el.hasAttribute('data-xen-v4-state')).toBe(true);
    expect(el.style.getPropertyValue('--xen-v4-state-ground')).toBe('var(--xen-surface)');
    expect(el.style.getPropertyValue('--xen-v4-state-ink')).toBe('var(--xen-on-surface)');
    // The layer sheet is present, so hover/focus/press tint rather than dim.
    expect(document.getElementById('xen-v4-state-styles')?.textContent ?? '').toContain(
      '[data-xen-v4-state]:active'
    );
  });

  it('presses like the CTA and drops the motion under reduced motion (§36.10)', () => {
    renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" />);
    const css = document.getElementById('xen-v4-auth-provider-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-provider]:active:not(:disabled) { transform: scale(0.985); }');
    expect(css).toContain('outline: 2px solid var(--xen-ring)');
    expect(css).toContain('prefers-reduced-motion');
    // Durations and easings come off the M3 scale, never picked here.
    expect(css).toContain('cubic-bezier(0.2, 0, 0, 1)');
    // No literal colour in the sheet.
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('disables at M3 0.38, not at a round number', () => {
    const onClick = jest.fn();
    const { q } = renderThemed(
      <AuthProviderButtonV4 label={GOOGLE} glyph="G" disabled onClick={onClick} />
    );
    const el = q.getByRole('button', { name: GOOGLE }) as HTMLButtonElement;
    expect(el.className).toContain('disabled:opacity-[0.38]');
    expect(el.className).not.toContain('opacity-50');
    expect(el.disabled).toBe(true);
    fireEvent.click(el);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('loading swaps the mark for a spinner, blocks the press and announces busy', () => {
    const onClick = jest.fn();
    const { q, container } = renderThemed(
      <AuthProviderButtonV4 label={GOOGLE} glyph="G" loading onClick={onClick} />
    );
    const el = q.getByRole('button', { name: GOOGLE }) as HTMLButtonElement;
    expect(el.getAttribute('aria-busy')).toBe('true');
    expect(el.disabled).toBe(true);
    expect(container.querySelector('[data-xen-v4-spinner]')).toBeTruthy();
    expect(container.querySelector('[data-xen-v4-icon]')).toBeNull();
    fireEvent.click(el);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('compact hides the label but keeps it as the accessible name', () => {
    const { q } = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" compact />);
    // Still findable by name — a screen reader hears the whole thing.
    const el = q.getByRole('button', { name: GOOGLE });
    expect(el.textContent).toBe('G');
    expect(q.queryByText(GOOGLE)).toBeNull();
    // A square footprint at the field height, so a row of them lines up.
    expect(el.className).toContain('min-w-[var(--xen-space-2xl)]');
    expect(el.className).toContain('px-md');
  });

  it('fills its container by default and can step out of it for a row', () => {
    const full = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" />);
    expect(full.q.getByRole('button', { name: GOOGLE }).className).toContain('w-full');

    const row = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" fullWidth={false} />);
    const el = row.q.getByRole('button', { name: GOOGLE });
    expect(el.className).toContain('w-auto');
    expect(el.className).not.toContain('w-full');
  });

  it('fires on click and forwards className, ref and the rest of the button props', () => {
    const onClick = jest.fn();
    const ref = React.createRef<HTMLButtonElement>();
    const { q } = renderThemed(
      <AuthProviderButtonV4
        ref={ref}
        label={GOOGLE}
        glyph="G"
        className="mt-sm"
        data-testid="google"
        onClick={onClick}
      />
    );
    const el = q.getByTestId('google');
    expect(el.className).toContain('mt-sm');
    expect(ref.current).toBe(el);
    fireEvent.click(el);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('paints no literal colour — everything resolves through --xen-*', () => {
    const { container } = renderThemed(<AuthProviderButtonV4 label={GOOGLE} glyph="G" />);
    expect(page(container).innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(page(container).innerHTML).not.toMatch(/rgba?\(/);
  });
});
