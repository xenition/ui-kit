/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { ResultV4 } from './ResultV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(result.container).getByTestId('result');
}

describe('ResultV4 (web)', () => {
  it('makes the action the kit button, not a local <button> — §15', () => {
    const onAction = jest.fn();
    const el = renderThemed(
      <ResultV4
        data-testid="result"
        title="Nothing yet"
        actionLabel="Create habit"
        onAction={onAction}
      />
    );
    const button = el.querySelector('button');
    expect(button).not.toBeNull();
    // ButtonV4 marks itself; a hand-rolled button would not.
    expect(button?.hasAttribute('data-xen-v4-btn')).toBe(true);
    fireEvent.click(button as HTMLButtonElement);
    expect(onAction).toHaveBeenCalled();
  });

  it('shrinks the glyph into a seal instead of leading with an illustration', () => {
    const el = renderThemed(<ResultV4 data-testid="result" title="Done" />);
    const seal = el.querySelector('[aria-hidden="true"]');
    expect(seal?.className).toContain('rounded-full');
    expect(seal?.className).toContain('h-[var(--xen-space-2xl)]');
    // `text-xl`, not the base's `text-3xl`.
    expect(seal?.className).toContain('text-xl');
    expect(seal?.className).not.toContain('text-3xl');
  });

  it('gives `empty` and `404` NO semantic colour — they are not failures', () => {
    (['empty', '404'] as const).forEach((status) => {
      const el = renderThemed(
        <ResultV4 data-testid="result" status={status} title="Nothing" />
      );
      const seal = el.querySelector('[aria-hidden="true"]');
      expect(seal?.className).toContain(
        'bg-[color-mix(in_srgb,var(--xen-on-surface)_10%,var(--xen-surface))]'
      );
      expect(seal?.className).not.toMatch(/danger|warn|success/);
    });
  });

  it('marks the seal with the contrast-safe TEXT form, never the fill', () => {
    const ok = renderThemed(<ResultV4 data-testid="result" status="success" title="Done" />);
    expect(ok.querySelector('[aria-hidden="true"]')?.className).toContain('text-success-text');
    const bad = renderThemed(<ResultV4 data-testid="result" status="error" title="Failed" />);
    expect(bad.querySelector('[aria-hidden="true"]')?.className).toContain('text-danger-text');
  });

  it('caps the description to a reading measure — §33', () => {
    const el = renderThemed(
      <ResultV4 data-testid="result" title="Heading" description="A sentence." />
    );
    expect(el.querySelector('p')?.className).toContain('max-w-[calc(var(--xen-space-2xl)*8)]');
  });

  it('respects a caller-supplied icon over the seal', () => {
    const el = renderThemed(
      <ResultV4 data-testid="result" title="Heading" icon={<i data-testid="mark" />} />
    );
    expect(el.textContent).not.toContain('✓');
    expect(el.querySelector('[data-testid="mark"]')).not.toBeNull();
  });

  it('names no literal colour — every value is a token', () => {
    (['success', 'error', 'empty', '404'] as const).forEach((status) => {
      const el = renderThemed(
        <ResultV4 data-testid="result" status={status} title="Heading" description="Copy" />
      );
      expect(el.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    });
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const el = renderThemed(
      <ResultV4
        data-testid="result"
        title="Heading"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(el);
  });
});
