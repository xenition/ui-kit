/** @jest-environment jsdom */
import * as React from 'react';
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { AuthDividerV4 } from './AuthDividerV4';

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

/**
 * The provider renders its `<style>` block and a `data-theme` wrapper into the
 * container, so "renders nothing" has to be asserted against the wrapper's own
 * content rather than the container's.
 */
function page(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-theme]') as HTMLElement;
}

/** Every hairline segment in the tree. */
function rules(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('.h-px'));
}

describe('AuthDividerV4 (web)', () => {
  it('centres the label on the rule — a segment either side, not a knockout patch', () => {
    const { container, q } = renderThemed(<AuthDividerV4 label="or continue with" />);
    expect(q.getByText('or continue with')).toBeTruthy();
    // Two segments means the line is drawn *around* the label, so the divider
    // does not depend on sitting on `surface` to look right (§1 allows a
    // tinted ground).
    expect(rules(container)).toHaveLength(2);
  });

  it('draws the hairline from tokens only — 1px of `border`, never a heavy rule', () => {
    const { container } = renderThemed(<AuthDividerV4 label="or continue with" />);
    rules(container).forEach((rule) => {
      expect(rule.className).toContain('h-px');
      expect(rule.className).toContain('bg-border');
      expect(rule.getAttribute('aria-hidden')).toBe('true');
    });
    // No literal colour anywhere in the rendered markup.
    expect(page(container).innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('composes the V4 text child (§10.5), muted and one step off the caption floor', () => {
    const { q } = renderThemed(<AuthDividerV4 label="or continue with" />);
    const label = q.getByText('or continue with');
    expect(label.getAttribute('data-xen-v4-text')).toBe('sm');
    expect(label.className).toContain('text-muted');
  });

  it('EMPTY STATE — with no label it is one unbroken hairline, not two stubs', () => {
    const { container } = renderThemed(<AuthDividerV4 />);
    expect(rules(container)).toHaveLength(1);
    expect(page(container).textContent).toBe('');
  });

  it('align moves the label to an end and drops the rule on that side', () => {
    const start = renderThemed(<AuthDividerV4 label="or" align="start" />);
    expect(rules(start.container)).toHaveLength(1);
    const row = start.container.querySelector('.items-center') as HTMLElement;
    // Label first, then the rule.
    expect(row.firstElementChild?.textContent).toBe('or');

    const end = renderThemed(<AuthDividerV4 label="or" align="end" />);
    expect(rules(end.container)).toHaveLength(1);
    const endRow = end.container.querySelector('.items-center') as HTMLElement;
    expect(endRow.lastElementChild?.textContent).toBe('or');
  });

  it('EMPTY STATE — §9: providers={[]} renders nothing at all, not an empty divider', () => {
    const providers: string[] = [];
    const { container } = renderThemed(
      <AuthDividerV4 label="or continue with">
        {providers.map((p) => (
          <button key={p}>{p}</button>
        ))}
      </AuthDividerV4>
    );
    expect(page(container).innerHTML).toBe('');
  });

  it('EMPTY STATE — a falsy or blank slot is just as empty as []', () => {
    const blank = (children: React.ReactNode): string =>
      page(renderThemed(<AuthDividerV4 label="or">{children}</AuthDividerV4>).container).innerHTML;
    expect(blank(null)).toBe('');
    expect(blank(false)).toBe('');
    expect(blank([null, false, []])).toBe('');
    expect(blank(<></>)).toBe('');
  });

  it('draws the rule AND the row when the slot has something in it', () => {
    const { container, q } = renderThemed(
      <AuthDividerV4 label="or continue with">
        <button>Continue with Google</button>
      </AuthDividerV4>
    );
    expect(rules(container)).toHaveLength(2);
    expect(q.getByRole('button', { name: 'Continue with Google' })).toBeTruthy();
  });

  it('omitting the slot keeps the base behaviour — the divider always draws', () => {
    const { container } = renderThemed(<AuthDividerV4 label="or continue with" />);
    expect(page(container).innerHTML).not.toBe('');
    expect(rules(container)).toHaveLength(2);
  });

  it('forwards className and the rest of the div props', () => {
    const { q } = renderThemed(
      <AuthDividerV4 label="or" className="mt-lg" data-testid="divider" role="group" />
    );
    const el = q.getByTestId('divider');
    expect(el.className).toContain('mt-lg');
    expect(el.getAttribute('role')).toBe('group');
  });

  it('spaces itself from the scale, never from a picked number', () => {
    const { q } = renderThemed(
      <AuthDividerV4 label="or" data-testid="divider">
        <button>Google</button>
      </AuthDividerV4>
    );
    const el = q.getByTestId('divider');
    expect(el.className).toContain('gap-md');
    expect(el.className).toContain('flex-col');
    // No arbitrary-value spacing snuck in.
    expect(el.className).not.toMatch(/gap-\[/);
  });
});
