/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import { resolveIconGlyph } from './icon-names';
import type { ThemeSeed } from '../theme/types';
import { SplitButtonV4 } from './SplitButtonV4';
import { transitionCss, V4_MOTION } from './internal/v4-motion';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};
const FLAT_SEED: ThemeSeed = { ...SEED, depth: 'flat' };

const ACTIONS = [
  { key: 'draft', label: 'Save as draft' },
  { key: 'delete', label: 'Delete', destructive: true },
  { key: 'archive', label: 'Archive', disabled: true },
];

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  const { container } = render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
  return { scope: within(container), container };
}

const shell = (container: HTMLElement): HTMLElement =>
  container.querySelector('[data-xen-v4-split]') as HTMLElement;

const sheet = (): string =>
  document.getElementById('xen-v4-split-button-styles')?.textContent ?? '';

const button = <SplitButtonV4 label="Publish" actions={ACTIONS} />;

describe('SplitButtonV4 (web)', () => {
  it('gives both halves the 44px a finger needs', () => {
    const { scope } = renderThemed(button);
    // `py-2` made a ~40px face and `px-2` a ~28px caret, on the control a
    // screen puts its PRIMARY action in.
    expect((scope.getByText('Publish').closest('button') as HTMLElement).className).toContain(
      'min-h-[44px]'
    );
    const caret = scope.getByLabelText('More actions');
    expect(caret.className).toContain('min-h-[44px]');
    expect(caret.className).toContain('min-w-[44px]');
  });

  it('gives every menu row 44px as well', () => {
    const { scope } = renderThemed(button);
    fireEvent.click(scope.getByLabelText('More actions'));
    scope.getAllByRole('menuitem').forEach((item) => {
      expect(item.className).toContain('min-h-[44px]');
    });
  });

  it('labels the outlined variant with the measured brand, on a real ground', () => {
    const theme = compileTheme(SEED);
    const { scope } = renderThemed(
      <SplitButtonV4 label="Publish" actions={ACTIONS} variant="secondary" />
    );
    const face = scope.getByText('Publish').closest('button') as HTMLElement;
    // `text-primary` is the FILL slot; `-text` is the form walked to AA.
    expect(face.className).toContain('text-primary-text');
    expect(face.className).not.toMatch(/text-primary(?![-\w])/);
    // …on `surface`, which is the ground that guarantee was measured against.
    expect(face.className).toContain('bg-surface');
    expect(contrastRatio(theme.light.primaryText, theme.light.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it('measures a destructive and a disabled row against the menu', () => {
    const theme = compileTheme(SEED);
    const { scope, container } = renderThemed(button);
    fireEvent.click(scope.getByLabelText('More actions'));
    expect(scope.getByText('Delete').className).toContain('text-danger-text');
    expect(scope.getByText('Delete').className).not.toMatch(/text-danger(?![-\w])/);
    // A disabled row was `text-muted`, which is `neutral[600]` and promises
    // nothing against `surface`. It is `mutedText` now — corrected once, by
    // the compiler, for every component at the same time.
    expect(shell(container)).not.toBeNull();
    expect(contrastRatio(theme.light.mutedText, theme.light.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(theme.dark.mutedText, theme.dark.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it('composites the seam into the face instead of floating it at 40%', () => {
    const { container } = renderThemed(button);
    // A translucent seam on the outlined variant was 40% of `primary` over
    // whatever happened to be behind the button.
    expect(shell(container).style.getPropertyValue('--xen-v4-seam')).toBe(
      'color-mix(in srgb, var(--xen-on-primary) 40%, var(--xen-primary))'
    );
    const seam = container.querySelector('[data-xen-v4-split-seam]') as HTMLElement;
    expect(seam.className).not.toContain('opacity-40');
  });

  it('follows the variant when it mixes the seam', () => {
    const { container } = renderThemed(
      <SplitButtonV4 label="Publish" actions={ACTIONS} variant="secondary" />
    );
    expect(shell(container).style.getPropertyValue('--xen-v4-seam')).toBe(
      'color-mix(in srgb, var(--xen-primary-text) 40%, var(--xen-surface))'
    );
  });

  it('floats the menu on `elevation.card`, not on a fixed `shadow-lg`', () => {
    const theme = compileTheme(SEED);
    const { scope, container } = renderThemed(button);
    fireEvent.click(scope.getByLabelText('More actions'));
    const menu = container.querySelector('[data-xen-v4-split-menu]') as HTMLElement;
    expect(menu.className).not.toContain('shadow-lg');
    expect(shell(container).style.getPropertyValue('--xen-v4-shadow-l')).toContain(
      String(theme.lightElevation.card.opacity)
    );
    // A shadow on a dark page needs MORE opacity, which a utility cannot know.
    expect(sheet()).toContain('[data-theme="dark"] [data-xen-v4-split-menu]');
  });

  it('zeroes that shadow on a flat seed, with no branch in the component', () => {
    const { container } = renderThemed(button, FLAT_SEED);
    expect(shell(container).style.getPropertyValue('--xen-v4-shadow-l')).toContain('/ 0)');
  });

  it('sizes the menu from the spacing scale, not from `10rem`', () => {
    const { scope, container } = renderThemed(button);
    fireEvent.click(scope.getByLabelText('More actions'));
    const menu = container.querySelector('[data-xen-v4-split-menu]') as HTMLElement;
    expect(menu.className).toContain('--xen-space-2xl');
    expect(menu.className).not.toContain('10rem');
  });

  it('turns the caret on a real clock, and stops under reduced motion', () => {
    const { scope, container } = renderThemed(button);
    const caret = container.querySelector('[data-xen-v4-split-caret]') as HTMLElement;
    expect(caret.textContent).toBe(resolveIconGlyph('chevron-down'));
    expect(caret.getAttribute('data-open')).toBe('false');
    fireEvent.click(scope.getByLabelText('More actions'));
    expect(
      (container.querySelector('[data-xen-v4-split-caret]') as HTMLElement).getAttribute('data-open')
    ).toBe('true');
    // The base's `transition-transform` had no duration, no curve and no guard.
    expect(sheet()).toContain(`transition: ${transitionCss(['transform'], V4_MOTION.quick)}`);
    expect(sheet()).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('rings with the brand, not with a pale ramp step', () => {
    const { scope } = renderThemed(button);
    expect((scope.getByText('Publish').closest('button') as HTMLElement).className).not.toContain(
      'ring-primary-300'
    );
    expect(sheet()).toContain('outline: 2px solid var(--xen-ring)');
  });

  it('opens, reports expansion, runs an action and closes', () => {
    const onClick = jest.fn();
    const { scope } = renderThemed(
      <SplitButtonV4
        label="Publish"
        actions={[{ key: 'draft', label: 'Save as draft', onClick }]}
      />
    );
    const caret = scope.getByLabelText('More actions');
    expect(caret.getAttribute('aria-expanded')).toBe('false');
    expect(caret.getAttribute('aria-haspopup')).toBe('menu');
    expect(scope.queryByRole('menu')).toBeNull();

    fireEvent.click(caret);
    expect(caret.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(scope.getByText('Save as draft'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(scope.queryByRole('menu')).toBeNull();
  });

  it('closes on Escape', () => {
    const { scope } = renderThemed(button);
    fireEvent.click(scope.getByLabelText('More actions'));
    expect(scope.getByRole('menu')).toBeTruthy();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(scope.queryByRole('menu')).toBeNull();
  });

  it('fires the primary action, and stops when disabled', () => {
    const onClick = jest.fn();
    const live = renderThemed(
      <SplitButtonV4 label="Publish" actions={ACTIONS} onClick={onClick} />
    );
    fireEvent.click(live.scope.getByText('Publish'));
    expect(onClick).toHaveBeenCalledTimes(1);

    const dead = renderThemed(
      <SplitButtonV4 label="Publish" actions={ACTIONS} onClick={onClick} disabled />
    );
    expect(
      (dead.scope.getByText('Publish').closest('button') as HTMLButtonElement).disabled
    ).toBe(true);
  });
});
