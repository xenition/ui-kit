/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import { gradientInk } from './internal/v4-depth';
import type { ThemeSeed } from '../theme/types';
import { FloatButtonV4 } from './FloatButtonV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};
const FLAT_SEED: ThemeSeed = { ...SEED, depth: 'flat' };

function fab(ui: ReactElement, seed: ThemeSeed = SEED): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
  return within(container).getByRole('button');
}

/** The stop list out of a `linear-gradient(45deg, #a, #b)` custom property. */
function stops(value: string): string[] {
  return value
    .replace(/^linear-gradient\(/, '')
    .replace(/\)$/, '')
    .split(',')
    .map((part) => part.trim())
    .slice(1);
}

const sheet = (): string =>
  document.getElementById('xen-v4-float-button-styles')?.textContent ?? '';

describe('FloatButtonV4 (web)', () => {
  it('carries the brand gradient — the one place §35.11 allows it', () => {
    const theme = compileTheme(SEED);
    const el = fab(<FloatButtonV4 label="New" />);
    const extremes = { darkest: theme.ramps.neutral[950], lightest: theme.ramps.neutral[50] };
    const light = gradientInk(theme.lightGradient.brand, theme.light.onPrimary, extremes);
    expect(stops(el.style.getPropertyValue('--xen-v4-image-l'))).toEqual([light.from, light.to]);
  });

  it('labels against BOTH stops, not against one flat colour', () => {
    const el = fab(<FloatButtonV4 label="New" />);
    (['l', 'd'] as const).forEach((scheme) => {
      const ink = el.style.getPropertyValue(`--xen-v4-on-${scheme}`);
      stops(el.style.getPropertyValue(`--xen-v4-image-${scheme}`)).forEach((stop) => {
        expect(contrastRatio(ink, stop)).toBeGreaterThanOrEqual(4.5);
      });
    });
  });

  it('lifts on `elevation.action`, whose opacity is HIGHER in dark', () => {
    const theme = compileTheme(SEED);
    const el = fab(<FloatButtonV4 label="New" />);
    // Tailwind's `shadow-lg` cannot know that a shadow on a dark page needs
    // MORE opacity, not less.
    expect(el.className).not.toContain('shadow-lg');
    expect(el.style.getPropertyValue('--xen-v4-shadow-l')).toContain(
      String(theme.lightElevation.action.opacity)
    );
    expect(el.style.getPropertyValue('--xen-v4-shadow-d')).toContain(
      String(Math.round(theme.darkElevation.action.opacity * 1000) / 1000)
    );
  });

  it('sits back down when held, in both schemes', () => {
    const theme = compileTheme(SEED);
    const el = fab(<FloatButtonV4 label="New" />);
    expect(el.style.getPropertyValue('--xen-v4-shadow-held-l')).toContain(
      String(Math.round(theme.lightElevation.action.opacity * 0.5 * 1000) / 1000)
    );
    expect(sheet()).toContain('[data-xen-v4-fab]:active');
  });

  it('drops the transform under reduced motion — §36.10', () => {
    fab(<FloatButtonV4 label="New" />);
    expect(sheet()).toContain('@media (prefers-reduced-motion: reduce)');
    expect(sheet()).toContain('[data-xen-v4-fab]:active { transform: none; }');
  });

  it('goes flat on a flat seed with no branch in the component', () => {
    const el = fab(<FloatButtonV4 label="New" />, FLAT_SEED);
    const [from, to] = stops(el.style.getPropertyValue('--xen-v4-image-l'));
    expect(from).toBe(to);
    expect(el.style.getPropertyValue('--xen-v4-shadow-l')).toContain('/ 0)');
  });

  it('rings with the brand, not with a pale ramp step', () => {
    fab(<FloatButtonV4 label="New" />);
    // `ring-primary-300` is a tint whose contrast against the page nobody
    // measured; `--xen-primary` is resolved per scheme by the compiler.
    expect(sheet()).toContain('outline: 2px solid var(--xen-ring)');
    expect(fab(<FloatButtonV4 label="New" />).className).not.toContain('ring-primary-300');
  });

  it('clears the home indicator, which the base never did', () => {
    fab(<FloatButtonV4 label="New" />);
    expect(sheet()).toContain('env(safe-area-inset-bottom, 0px)');
  });

  it('sizes and anchors from the spacing scale', () => {
    expect(fab(<FloatButtonV4 label="New" />).className).toContain('--xen-space-2xl');
    expect(fab(<FloatButtonV4 label="New" />).className).toContain('right-lg');
    expect(fab(<FloatButtonV4 label="New" placement="bottom-left" />).className).toContain('left-lg');
    expect(fab(<FloatButtonV4 label="New" placement="bottom-center" />).className).toContain(
      'left-1/2'
    );
    // `right-6` / `bottom-8` were Tailwind's rhythm, not the seed's.
    expect(fab(<FloatButtonV4 label="New" />).className).not.toContain('right-6');
  });

  it('is a circle without a label and a pill with one', () => {
    expect(fab(<FloatButtonV4 aria-label="Add" />).className).toContain('w-[calc(');
    const pill = fab(<FloatButtonV4 label="New note" />);
    expect(pill.className).toContain('px-lg');
    expect(pill.className).not.toContain('w-[calc(');
  });

  it('clicks, names itself from the label, and stops when disabled', () => {
    const onClick = jest.fn();
    const live = fab(<FloatButtonV4 label="New" onClick={onClick} />);
    expect(live.getAttribute('aria-label')).toBe('New');
    expect(live.getAttribute('type')).toBe('button');
    fireEvent.click(live);
    expect(onClick).toHaveBeenCalledTimes(1);

    const dead = fab(<FloatButtonV4 label="New" onClick={onClick} disabled />);
    expect(dead.hasAttribute('disabled')).toBe(true);
    expect(dead.className).toContain('disabled:opacity-[0.38]');
  });
});
