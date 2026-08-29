/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import { mirrorStep, monogramStep } from './internal/v4-depth';
import type { ThemeSeed } from '../theme/types';
import { AvatarV4 } from './AvatarV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED): HTMLElement {
  const result = render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
  // Scoped to this render's own container: several of these tests render more
  // than once, and `document.body` keeps every one of them.
  return within(result.container).getByTestId('avatar');
}

const NAMES = ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson'];

describe('AvatarV4 (web)', () => {
  it('derives the monogram ground from the NAME, not from `primary-50`', () => {
    const theme = compileTheme(SEED);
    const el = renderThemed(<AvatarV4 data-testid="avatar" name="Ada Lovelace" />);
    expect(el.style.getPropertyValue('--xen-v4-ground-l')).toBe(
      theme.ramps.neutral[monogramStep('Ada Lovelace')]
    );
    // The base avatar painted every fallback `bg-primary-50 text-primary`.
    expect(el.className).not.toContain('bg-primary-50');
  });

  it('mirrors the ramp step for dark, the same inversion the compiler applies', () => {
    const theme = compileTheme(SEED);
    const step = monogramStep('Ada Lovelace');
    const el = renderThemed(<AvatarV4 data-testid="avatar" name="Ada Lovelace" />);
    expect(el.style.getPropertyValue('--xen-v4-ground-d')).toBe(
      theme.ramps.neutral[mirrorStep(step)]
    );
    expect(el.style.getPropertyValue('--xen-v4-ground-d')).not.toBe(
      el.style.getPropertyValue('--xen-v4-ground-l')
    );
  });

  it('gives the same person the same ground, and spreads across a roster', () => {
    const ground = (name: string): string =>
      renderThemed(<AvatarV4 data-testid="avatar" name={name} />).style.getPropertyValue(
        '--xen-v4-ground-l'
      );
    expect(ground('Ada Lovelace')).toBe(ground('  ada lovelace '));
    expect(new Set(NAMES.concat(['Barbara Liskov', 'Edsger Dijkstra']).map(ground)).size)
      .toBeGreaterThan(1);
  });

  it('clears AA for the monogram against the ground it derived, in both schemes', () => {
    NAMES.forEach((name) => {
      const el = renderThemed(<AvatarV4 data-testid="avatar" name={name} />);
      (['l', 'd'] as const).forEach((scheme) => {
        const ground = el.style.getPropertyValue(`--xen-v4-ground-${scheme}`);
        const ink = el.style.getPropertyValue(`--xen-v4-ink-${scheme}`);
        expect(contrastRatio(ink, ground)).toBeGreaterThanOrEqual(4.5);
      });
    });
  });

  it('agrees with the native twin: the same name picks the same step', () => {
    // Both twins call `monogramStep`, so a person cannot be two colours across
    // a product. This is the assertion that keeps that true.
    NAMES.forEach((name) => {
      const theme = compileTheme(SEED);
      const el = renderThemed(<AvatarV4 data-testid="avatar" name={name} />);
      expect(el.style.getPropertyValue('--xen-v4-ground-l')).toBe(
        theme.ramps.neutral[monogramStep(name)]
      );
    });
  });

  it('draws a silhouette rather than a question mark when there is no name', () => {
    const el = renderThemed(<AvatarV4 data-testid="avatar" />);
    expect(el.textContent).toBe('');
    expect(el.querySelector('[aria-hidden]')).not.toBeNull();
    // Two shapes taking the face's own ink through `currentColor`.
    expect(el.querySelectorAll('.bg-current').length).toBe(2);
  });

  it('renders the monogram when a name is present and the image when a src is', () => {
    expect(renderThemed(<AvatarV4 data-testid="avatar" name="Ada Lovelace" />).textContent).toBe(
      'AL'
    );
    const withImage = renderThemed(
      <AvatarV4 data-testid="avatar" name="Ada Lovelace" src="/ada.png" />
    );
    const img = withImage.querySelector('img');
    expect(img?.getAttribute('src')).toBe('/ada.png');
    expect(img?.getAttribute('alt')).toBe('Ada Lovelace');
  });

  it('rings as a halo, contrast-checked at 3:1 — a ring is a boundary, not text', () => {
    const theme = compileTheme(SEED);
    const plain = renderThemed(<AvatarV4 data-testid="avatar" name="Ada" />);
    expect(plain.getAttribute('data-ring')).toBe('false');
    expect(plain.style.getPropertyValue('--xen-v4-ring-l')).toBe('');

    const ringed = renderThemed(<AvatarV4 data-testid="avatar" name="Ada" ring />);
    expect(ringed.getAttribute('data-ring')).toBe('true');
    expect(
      contrastRatio(ringed.style.getPropertyValue('--xen-v4-ring-l'), theme.light.surface)
    ).toBeGreaterThanOrEqual(3);
    expect(
      contrastRatio(ringed.style.getPropertyValue('--xen-v4-ring-d'), theme.dark.surface)
    ).toBeGreaterThanOrEqual(3);
  });

  it('takes the ring from the status when there is one', () => {
    const theme = compileTheme(SEED);
    const el = renderThemed(<AvatarV4 data-testid="avatar" name="Ada" ring status="busy" />);
    expect(el.style.getPropertyValue('--xen-v4-ring-l')).toBe(theme.light.danger);
  });

  it('names the presence state so it is never carried by hue alone', () => {
    (['online', 'away', 'busy', 'offline'] as const).forEach((status) => {
      const el = renderThemed(<AvatarV4 data-testid="avatar" name="Ada" status={status} />);
      const dot = el.querySelector('[data-xen-v4-avatar-dot]');
      expect(dot?.getAttribute('role')).toBe('img');
      expect(dot?.getAttribute('aria-label')?.toLowerCase()).toBe(status);
    });
  });

  it('follows the arc for a circle and the corner for anything else', () => {
    const circle = renderThemed(<AvatarV4 data-testid="avatar" name="Ada" status="online" />);
    expect(circle.style.getPropertyValue('--xen-v4-dot-inset')).toContain('max(0px');
    const square = renderThemed(
      <AvatarV4 data-testid="avatar" name="Ada" shape="square" status="online" />
    );
    expect(square.style.getPropertyValue('--xen-v4-dot-inset')).toBe('0px');
  });

  it('composes its diameters from the spacing scale, never a raw px', () => {
    const d = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string =>
      renderThemed(<AvatarV4 data-testid="avatar" name="Ada" size={size} />).style.getPropertyValue(
        '--xen-v4-d'
      );
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
      expect(d(size)).toContain('--xen-space-');
      expect(d(size)).not.toMatch(/\d+px/);
    });
  });

  it('never carries a gradient — a face is a data point, not a hero (§35.11)', () => {
    const el = renderThemed(<AvatarV4 data-testid="avatar" name="Ada" ring status="online" />);
    expect(el.getAttribute('style')).not.toContain('gradient');
  });
});
