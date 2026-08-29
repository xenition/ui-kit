/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { Stack } from './Stack';
import { StackV4 } from './StackV4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

describe('StackV4', () => {
  it('IS the base component — a pure layout primitive has nothing to restyle', () => {
    // Asserted rather than left as a comment, because the alias is a design
    // decision and not an accident: `Stack` paints no colour, draws no border,
    // has no radius and sets no type, so a V4 could only differ by changing
    // what `gap="md"` means — which would silently move every caller's layout.
    expect(StackV4).toBe(Stack);
  });

  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Stack> = {
      direction: 'row',
      gap: 'lg',
      align: 'center',
      justify: 'between',
      className: 'extra',
    };
    const asV4: React.ComponentProps<typeof StackV4> = same;
    expect(asV4).toBe(same);
  });

  it('already spends only tokens, which is why there was nothing to fix', () => {
    const { getByText } = render(
      <XenitionUIProvider theme={seed}>
        <StackV4 direction="row" gap="lg" align="center" justify="between">
          <span>a</span>
          <span>b</span>
        </StackV4>
      </XenitionUIProvider>
    );
    const el = getByText('a').parentElement as HTMLElement;
    expect(el.className).toContain('gap-[var(--xen-space-lg)]');
    expect(el.className).toContain('flex-row');
    expect(el.className).toContain('items-center');
    expect(el.className).toContain('justify-between');
    // No colour, no border, no radius, no type — nothing a design line owns.
    expect(el.className).not.toMatch(/\b(bg|text|border|rounded|shadow)-/);
  });
});
