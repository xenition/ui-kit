/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import { resolveIconGlyph } from './icon-names';
import type { ThemeSeed } from '../theme/types';
import { AccordionV4 } from './AccordionV4';
import { transitionCss } from './internal/v4-motion';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const ITEMS = [
  { value: 'a', title: 'Shipping', content: 'Two to four working days.' },
  { value: 'b', title: 'Returns', content: 'Thirty days, no questions.' },
];

function renderThemed(ui: ReactElement) {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return { scope: within(container), container };
}

const sheet = (): string => document.getElementById('xen-v4-accordion-styles')?.textContent ?? '';

const panels = (container: HTMLElement): string[] =>
  Array.from(container.querySelectorAll('[data-xen-v4-accordion-panel]')).map(
    (p) => p.getAttribute('data-open') ?? ''
  );

describe('AccordionV4 (web)', () => {
  it('opens and closes, one panel at a time by default', () => {
    const { scope, container } = renderThemed(<AccordionV4 items={ITEMS} />);
    expect(panels(container)).toEqual(['false', 'false']);
    fireEvent.click(scope.getByText('Shipping'));
    expect(panels(container)).toEqual(['true', 'false']);
    fireEvent.click(scope.getByText('Returns'));
    expect(panels(container)).toEqual(['false', 'true']);
  });

  it('keeps several open when asked', () => {
    const { scope, container } = renderThemed(<AccordionV4 items={ITEMS} type="multiple" />);
    fireEvent.click(scope.getByText('Shipping'));
    fireEvent.click(scope.getByText('Returns'));
    expect(panels(container)).toEqual(['true', 'true']);
  });

  it('animates the HEIGHT, so the marker and the content move together', () => {
    renderThemed(<AccordionV4 items={ITEMS} />);
    // The base mounted and unmounted the body, so the only animated thing on
    // the control was a chevron turning next to content that had already
    // popped into place. `0fr -> 1fr` needs no measurement and no max-height.
    expect(sheet()).toContain('grid-template-rows: 0fr');
    expect(sheet()).toContain(`transition: ${transitionCss(['grid-template-rows'])}`);
    expect(sheet()).toContain('[data-xen-v4-accordion-panel][data-open="true"]');
  });

  it('runs the marker on the same clock and curve as the panel', () => {
    renderThemed(<AccordionV4 items={ITEMS} />);
    const css = sheet();
    expect(css).toContain(`transition: ${transitionCss(['transform'])}`);
    expect(css).toContain(`transition: ${transitionCss(['grid-template-rows'])}`);
    expect(css).toContain('transform: rotate(180deg)');
  });

  it('drops both transitions under reduced motion', () => {
    renderThemed(<AccordionV4 items={ITEMS} />);
    expect(sheet()).toContain('@media (prefers-reduced-motion: reduce)');
    expect(sheet()).toMatch(/prefers-reduced-motion[\s\S]*accordion-panel[\s\S]*transition: none/);
  });

  it('points each header at its panel, and the panel back at the header', () => {
    const { scope, container } = renderThemed(<AccordionV4 items={ITEMS} />);
    const header = scope.getByText('Shipping').closest('button') as HTMLButtonElement;
    const panelId = header.getAttribute('aria-controls') as string;
    // The base had no `aria-controls`, no id and no region: a screen reader
    // heard a button that expanded something unnamed.
    expect(panelId).toBeTruthy();
    const panel = Array.from(
      container.querySelectorAll<HTMLElement>('[data-xen-v4-accordion-panel]')
    ).find((p) => p.id === panelId) as HTMLElement;
    expect(panel.getAttribute('role')).toBe('region');
    expect(panel.getAttribute('aria-labelledby')).toBe(header.id);
    expect(header.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(header);
    expect(header.getAttribute('aria-expanded')).toBe('true');
  });

  it('makes a collapsed panel inert, not merely invisible', () => {
    const { scope, container } = renderThemed(<AccordionV4 items={ITEMS} />);
    const body = (): HTMLElement =>
      container.querySelector('[data-xen-v4-accordion-body]') as HTMLElement;
    expect(body().hasAttribute('inert')).toBe(true);
    fireEvent.click(scope.getByText('Shipping'));
    expect(body().hasAttribute('inert')).toBe(false);
  });

  it('takes the chevron from the named icon set, decoratively', () => {
    const { container } = renderThemed(<AccordionV4 items={ITEMS} />);
    const marks = Array.from(container.querySelectorAll('[data-xen-v4-accordion-mark]'));
    expect(marks).toHaveLength(2);
    marks.forEach((m) => {
      expect(m.textContent).toBe(resolveIconGlyph('chevron-down'));
      expect(m.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('gives every header 44px and a visible focus ring', () => {
    const { scope } = renderThemed(<AccordionV4 items={ITEMS} />);
    const header = scope.getByText('Shipping').closest('button') as HTMLButtonElement;
    // `py-3` made a roughly 40px row.
    expect(header.className).toContain('min-h-[44px]');
    expect(sheet()).toContain('[data-xen-v4-accordion-header]:focus-visible');
  });

  it('pads on the spacing scale, so both twins are the same shape', () => {
    const { scope } = renderThemed(<AccordionV4 items={ITEMS} />);
    const header = scope.getByText('Shipping').closest('button') as HTMLButtonElement;
    // `px-4 py-3` was 16/12 against native's 24/16.
    expect(header.className).toContain('px-lg');
    expect(header.className).toContain('py-md');
  });

  it('measures the body and the chevron against the page, in both schemes', () => {
    const theme = compileTheme(SEED);
    const { container } = renderThemed(<AccordionV4 items={ITEMS} />);
    const root = container.querySelector('[data-xen-v4-accordion]') as HTMLElement;
    // The body is `mutedText` now, not this component's own correction of
    // `muted` — the promise is the compiler's, so measure the compiler's slot.
    expect(contrastRatio(theme.light.mutedText, theme.light.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(theme.dark.mutedText, theme.dark.surface)).toBeGreaterThanOrEqual(4.5);
    // A chevron is a UI mark, judged at 3:1.
    expect(
      contrastRatio(root.style.getPropertyValue('--xen-v4-mark-l'), theme.light.surface)
    ).toBeGreaterThanOrEqual(3);
  });

  it('honours `defaultValue`', () => {
    const { container } = renderThemed(<AccordionV4 items={ITEMS} defaultValue={['b']} />);
    expect(panels(container)).toEqual(['false', 'true']);
  });
});
