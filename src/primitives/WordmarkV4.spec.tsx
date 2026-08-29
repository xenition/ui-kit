/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import type { ThemeSeed } from '../theme/types';
import { WordmarkV4 } from './WordmarkV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return { scope: within(container), container };
}

function wordmark(ui: ReactElement): HTMLElement {
  return renderThemed(ui).container.querySelector('[data-xen-v4-wordmark]') as HTMLElement;
}

describe('WordmarkV4 (web)', () => {
  it('sets the brand initial in the mark instead of a blank swatch', () => {
    const theme = compileTheme(SEED);
    const mark = wordmark(<WordmarkV4 name="Xenition" />).querySelector(
      '[data-xen-v4-wordmark-mark]'
    );
    // "An icon inside a coloured rounded square" is §8's fourth tell, and the
    // base one did not even have the icon.
    expect(mark?.textContent).toBe('X');
    expect(mark?.className).toContain('bg-primary');
    expect(mark?.className).toContain('text-on-primary');
    expect(contrastRatio(theme.light.onPrimary, theme.light.primary)).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps the mark decorative — the name already says it', () => {
    const mark = wordmark(<WordmarkV4 name="Xenition" />).querySelector(
      '[data-xen-v4-wordmark-mark]'
    );
    expect(mark?.getAttribute('aria-hidden')).toBe('true');
  });

  it('honours a caller’s own mark, and `null` for none', () => {
    const custom = wordmark(<WordmarkV4 name="Xenition" mark={<svg data-testid="logo" />} />);
    expect(custom.querySelector('[data-xen-v4-wordmark-mark]')).toBeNull();
    expect(custom.querySelector('svg')).not.toBeNull();

    const none = wordmark(<WordmarkV4 name="Xenition" mark={null} />);
    expect(none.querySelector('[data-xen-v4-wordmark-mark]')).toBeNull();
    expect(none.textContent).toBe('Xenition');
  });

  it('reads its sizes off the scales, not off Tailwind’s rhythm', () => {
    const mark = (size: 'sm' | 'md' | 'lg'): string =>
      wordmark(<WordmarkV4 name="Xenition" size={size} />).querySelector(
        '[data-xen-v4-wordmark-mark]'
      )?.className ?? '';
    expect(mark('sm')).toContain('h-md');
    expect(mark('md')).toContain('--xen-space-md');
    expect(mark('lg')).toContain('--xen-space-lg');
    (['sm', 'md', 'lg'] as const).forEach((size) => {
      expect(mark(size)).not.toMatch(/\bh-[0-9]/);
    });
  });

  it('sets the name in the seed’s heading face', () => {
    expect(wordmark(<WordmarkV4 name="Xenition" />).className).toContain('font-heading');
  });

  it('gives a linked wordmark a 44px target and a focus ring', () => {
    const el = wordmark(<WordmarkV4 name="Xenition" as="a" href="/" />);
    expect(el.tagName).toBe('A');
    expect(el.getAttribute('href')).toBe('/');
    const sheet = document.getElementById('xen-v4-wordmark-styles')?.textContent ?? '';
    expect(sheet).toContain('a[data-xen-v4-wordmark]::after');
    expect(sheet).toContain('height: 44px');
    expect(sheet).toContain('a[data-xen-v4-wordmark]:focus-visible');
  });

  it('stays a span with no href when it is not a link', () => {
    const el = wordmark(<WordmarkV4 name="Xenition" href="/ignored" />);
    expect(el.tagName).toBe('SPAN');
    expect(el.hasAttribute('href')).toBe(false);
  });

  it('never carries a gradient — a logo that shimmers competes with the page', () => {
    const el = wordmark(<WordmarkV4 name="Xenition" />);
    expect(el.className).not.toContain('gradient');
    const sheet = document.getElementById('xen-v4-wordmark-styles')?.textContent ?? '';
    expect(sheet).not.toContain('gradient');
  });
});
