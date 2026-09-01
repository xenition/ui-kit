/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import { gradientInk } from './internal/v4-depth';
import { V4_STATE } from './internal/v4-state';
import type { ThemeSeed } from '../theme/types';
import { AUTH_SUBMIT_HEIGHT_V4, AuthSubmitButtonV4 } from './AuthSubmitButtonV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};
const FLAT_SEED: ThemeSeed = { ...SEED, depth: 'flat' };

function mount(ui: ReactElement, seed: ThemeSeed = SEED): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
  return container;
}

function cta(ui: ReactElement, seed: ThemeSeed = SEED): HTMLElement {
  return within(mount(ui, seed)).getByRole('button');
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
  document.getElementById('xen-v4-auth-submit-styles')?.textContent ?? '';

describe('AuthSubmitButtonV4 (web)', () => {
  // ───────────────────────────────────────────────────────────────────────────
  // §5 — the shape
  // ───────────────────────────────────────────────────────────────────────────

  it('is a full-width pill at §5’s 56, composed from the spacing scale', () => {
    const el = cta(<AuthSubmitButtonV4 label="Sign in" />);
    expect(AUTH_SUBMIT_HEIGHT_V4).toBe(56);
    expect(el.className).toContain('w-full');
    expect(sheet()).toContain('border-radius: var(--xen-radius-full)');
    // 48 + 8 = 56, so a re-scaled seed re-scales the CTA instead of leaving a
    // pinned literal behind. `min-height`, so a 200% text zoom grows the button
    // rather than clipping the label.
    expect(sheet()).toContain('min-height: calc(var(--xen-space-2xl) + var(--xen-space-sm))');
    expect(sheet()).not.toContain('56px');
  });

  it('keeps the Addendum’s 48/radius.md away from the sticky CTA', () => {
    // The 48 / `radius.md` ruling is anchored on `InputV4` and governs
    // FIELD-shaped controls. The one dominant action is not one of them.
    cta(<AuthSubmitButtonV4 label="Sign in" />);
    expect(sheet()).not.toContain('var(--xen-radius-md)');
    expect(sheet()).not.toContain('min-height: var(--xen-space-2xl)');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // §5 — disabled is the same shape at reduced opacity
  // ───────────────────────────────────────────────────────────────────────────

  it('disables to the SAME shape, only dimmer — never a shape that moves', () => {
    const live = cta(<AuthSubmitButtonV4 label="Sign in" />);
    const dead = cta(<AuthSubmitButtonV4 label="Sign in" disabled />);
    // Byte-for-byte the same class string: no height, radius, padding or width
    // is allowed to change with the state, or the button appears to move when
    // it enables.
    expect(dead.className).toBe(live.className);
    expect(dead.hasAttribute('disabled')).toBe(true);
    expect(live.hasAttribute('disabled')).toBe(false);
    // M3's 0.38 for disabled CONTENT, off the shared scale — not `opacity-50`.
    expect(sheet()).toContain(`opacity: ${V4_STATE.disabledContent}`);
    expect(sheet()).toContain('[data-xen-v4-auth-submit]:disabled { pointer-events: none; }');
  });

  it('does not fire when disabled', () => {
    const onClick = jest.fn();
    const dead = cta(<AuthSubmitButtonV4 label="Sign in" disabled onClick={onClick} />);
    fireEvent.click(dead);
    expect(onClick).not.toHaveBeenCalled();
  });

  // ───────────────────────────────────────────────────────────────────────────
  // §5 — the trailing arrow, on a forward action only
  // ───────────────────────────────────────────────────────────────────────────

  it('carries a trailing → on a forward action and none on a terminal one', () => {
    const forward = mount(<AuthSubmitButtonV4 label="Continue" />);
    const arrow = forward.querySelector('[data-xen-v4-auth-arrow]');
    expect(arrow).not.toBeNull();
    expect(arrow?.textContent).toBe('→');
    // A terminal action ("Done") points nowhere, so it gets no glyph at all.
    const terminal = mount(<AuthSubmitButtonV4 label="Done" trailingArrow={false} />);
    expect(terminal.querySelector('[data-xen-v4-auth-arrow]')).toBeNull();
  });

  it('takes a different trailing glyph without giving up the on/off rule', () => {
    const el = mount(<AuthSubmitButtonV4 label="Next" trailingIcon="chevron-right" />);
    expect(el.querySelector('[data-xen-v4-auth-arrow]')?.textContent).not.toBe('→');
    // `trailingArrow` still decides whether there is a glyph at all, so the two
    // props can never disagree.
    const none = mount(
      <AuthSubmitButtonV4 label="Next" trailingIcon="chevron-right" trailingArrow={false} />
    );
    expect(none.querySelector('[data-xen-v4-auth-arrow]')).toBeNull();
  });

  it('leans the arrow into a hover, and drops that under reduced motion', () => {
    cta(<AuthSubmitButtonV4 label="Continue" />);
    expect(sheet()).toContain('transform: translateX(calc(var(--xen-space-xs) / 2))');
    expect(sheet()).toContain('@media (prefers-reduced-motion: reduce)');
    expect(sheet()).toContain(
      '[data-xen-v4-auth-submit]:hover:not(:disabled) [data-xen-v4-auth-arrow] { transform: none; }'
    );
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The loading state
  // ───────────────────────────────────────────────────────────────────────────

  it('swaps the trailing glyph for the spinner instead of widening the button', () => {
    const busy = mount(<AuthSubmitButtonV4 label="Sign in" loading />);
    expect(busy.querySelector('[data-xen-v4-auth-busy]')).not.toBeNull();
    // One slot, one indicator: the base put the spinner BEFORE the label, which
    // reflows the button the moment it starts working.
    expect(busy.querySelector('[data-xen-v4-auth-arrow]')).toBeNull();
    const el = within(busy).getByRole('button');
    expect(el.getAttribute('aria-busy')).toBe('true');
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('stays at full strength while busy — 0.38 means unavailable, not working', () => {
    cta(<AuthSubmitButtonV4 label="Sign in" loading />);
    expect(sheet()).toContain('[data-xen-v4-auth-submit]:disabled:not([aria-busy="true"])');
  });

  it('announces the busy label, and falls back to the label', () => {
    const named = cta(<AuthSubmitButtonV4 label="Sign in" busyLabel="Signing in…" loading />);
    expect(named.getAttribute('aria-label')).toBe('Signing in…');
    expect(named.textContent).toContain('Signing in…');
    const bare = cta(<AuthSubmitButtonV4 label="Sign in" loading />);
    expect(bare.getAttribute('aria-label')).toBe('Sign in');
    // The busy label is only for the busy state.
    const idle = cta(<AuthSubmitButtonV4 label="Sign in" busyLabel="Signing in…" />);
    expect(idle.getAttribute('aria-label')).toBe('Sign in');
  });

  it('draws the busy ring in the button’s own ink, not in `primary`', () => {
    cta(<AuthSubmitButtonV4 label="Sign in" loading />);
    // `SpinnerV4`'s own track is a mix of `primary` into `surface` — invisible
    // on a `primary` fill. Same ratio, said in `currentColor`.
    expect(sheet()).toContain('border-top-color: currentColor');
    expect(sheet()).toContain('color-mix(in srgb, currentColor 20%, transparent)');
  });

  it('leaves the busy ring out of the accessibility tree — `aria-busy` says it', () => {
    const busy = mount(<AuthSubmitButtonV4 label="Sign in" loading />);
    const ring = busy.querySelector('[data-xen-v4-auth-busy]');
    expect(ring?.getAttribute('aria-hidden')).toBe('true');
    expect(ring?.hasAttribute('role')).toBe(false);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The fill — one gradient, and only for the brand tone
  // ───────────────────────────────────────────────────────────────────────────

  it('carries the brand gradient, the one place §35.11 allows one', () => {
    const theme = compileTheme(SEED);
    const el = cta(<AuthSubmitButtonV4 label="Sign in" />);
    const extremes = { darkest: theme.ramps.neutral[950], lightest: theme.ramps.neutral[50] };
    const light = gradientInk(theme.lightGradient.brand, theme.light.onPrimary, extremes);
    expect(stops(el.style.getPropertyValue('--xen-v4-image-l'))).toEqual([light.from, light.to]);
  });

  it('labels against BOTH stops, not against one flat colour', () => {
    const el = cta(<AuthSubmitButtonV4 label="Sign in" />);
    (['l', 'd'] as const).forEach((scheme) => {
      const ink = el.style.getPropertyValue(`--xen-v4-on-${scheme}`);
      stops(el.style.getPropertyValue(`--xen-v4-image-${scheme}`)).forEach((stop) => {
        expect(contrastRatio(ink, stop)).toBeGreaterThanOrEqual(4.5);
      });
    });
  });

  it('keeps a semantic tone SOLID — a destructive CTA is not a promotion', () => {
    const danger = cta(<AuthSubmitButtonV4 label="Delete account" tone="danger" />);
    expect(danger.className).toContain('bg-danger');
    expect(danger.style.getPropertyValue('--xen-v4-image-l')).toBe('');
    // The ink is still the tone's own `on` slot, which the compiler checked.
    expect(danger.style.getPropertyValue('--xen-v4-on-l')).toBe('var(--xen-on-danger)');
    const success = cta(<AuthSubmitButtonV4 label="Confirm" tone="success" />);
    expect(success.className).toContain('bg-success');
    expect(success.style.getPropertyValue('--xen-v4-image-l')).toBe('');
  });

  it('goes flat on a flat seed with no branch in the component', () => {
    const el = cta(<AuthSubmitButtonV4 label="Sign in" />, FLAT_SEED);
    const [from, to] = stops(el.style.getPropertyValue('--xen-v4-image-l'));
    expect(from).toBe(to);
    expect(el.style.getPropertyValue('--xen-v4-shadow-l')).toContain('/ 0)');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Depth and motion, off the shared scales
  // ───────────────────────────────────────────────────────────────────────────

  it('lifts on `elevation.action` and sits back down when held', () => {
    const theme = compileTheme(SEED);
    const el = cta(<AuthSubmitButtonV4 label="Sign in" />);
    expect(el.style.getPropertyValue('--xen-v4-shadow-l')).toContain(
      String(theme.lightElevation.action.opacity)
    );
    expect(el.style.getPropertyValue('--xen-v4-shadow-held-l')).toContain(
      String(Math.round(theme.lightElevation.action.opacity * 0.5 * 1000) / 1000)
    );
    expect(sheet()).toContain('[data-xen-v4-auth-submit]:active');
    expect(sheet()).toContain('[data-xen-v4-auth-submit]:active { transform: none; }');
  });

  it('rings with `--xen-ring`, the one focus slot in the kit', () => {
    const el = cta(<AuthSubmitButtonV4 label="Sign in" />);
    expect(sheet()).toContain('outline: 2px solid var(--xen-ring)');
    expect(el.className).not.toContain('ring-primary-300');
  });

  it('hands its own measured ink down to the label, arrow and ring', () => {
    cta(<AuthSubmitButtonV4 label="Sign in" />);
    // Two-part selectors, so the children's `text-*` token class stays a
    // correct fallback while the button's measured ink wins when it is there.
    expect(sheet()).toContain(
      '[data-xen-v4-auth-submit] [data-xen-v4-auth-arrow] { color: inherit; }'
    );
  });

  // ───────────────────────────────────────────────────────────────────────────
  // §12 — the empty state
  // ───────────────────────────────────────────────────────────────────────────

  it('survives an empty label: the pill keeps its shape and gains no empty name', () => {
    const empty = mount(<AuthSubmitButtonV4 label="" />);
    const el = within(empty).getByRole('button');
    const full = cta(<AuthSubmitButtonV4 label="Sign in" />);
    expect(el.className).toBe(full.className);
    // No empty text node, and no `aria-label=""` — an empty accessible name is
    // worse than none, because it hides the button from a screen reader.
    expect(empty.querySelector('[data-xen-v4-auth-label]')).toBeNull();
    expect(el.hasAttribute('aria-label')).toBe(false);
    // Whitespace is not a label either.
    const blank = mount(<AuthSubmitButtonV4 label="   " />);
    expect(blank.querySelector('[data-xen-v4-auth-label]')).toBeNull();
  });

  it('survives an empty label while busy, and while terminal', () => {
    const busy = mount(<AuthSubmitButtonV4 label="" loading />);
    expect(busy.querySelector('[data-xen-v4-auth-busy]')).not.toBeNull();
    const bare = mount(<AuthSubmitButtonV4 label="" trailingArrow={false} />);
    // Nothing inside at all — and still a 56 pill, not a collapsed sliver.
    expect(within(bare).getByRole('button').textContent).toBe('');
    expect(sheet()).toContain('min-height: calc(var(--xen-space-2xl) + var(--xen-space-sm))');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The base contract
  // ───────────────────────────────────────────────────────────────────────────

  it('keeps the base’s props: label, click, and the DOM attributes', () => {
    const onClick = jest.fn();
    const el = cta(
      <AuthSubmitButtonV4 label="Sign in" onClick={onClick} type="submit" name="submit" />
    );
    expect(el.getAttribute('type')).toBe('submit');
    expect(el.getAttribute('name')).toBe('submit');
    fireEvent.click(el);
    expect(onClick).toHaveBeenCalledTimes(1);
    // A caller-supplied name wins over the label-derived one.
    const named = cta(<AuthSubmitButtonV4 label="Sign in" aria-label="Sign in to Xenition" />);
    expect(named.getAttribute('aria-label')).toBe('Sign in to Xenition');
  });

  it('holds every colour in a token — no literal in the class string', () => {
    const el = cta(<AuthSubmitButtonV4 label="Sign in" />);
    expect(el.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
    expect(el.className).not.toMatch(/rgb\(/);
    // Every colour in the sheet is a custom property, never a literal.
    expect(sheet()).not.toMatch(/#[0-9a-fA-F]{3,8}/);
  });
});
