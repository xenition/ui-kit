/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import { mixToken } from './internal/v4-depth';
import { V4_STATE } from './internal/v4-state';
import { ICON_GLYPHS } from './icon-names';
import type { ThemeSeed } from '../theme/types';
import { IconV4 } from './IconV4';
import type { IconColor } from './IconV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

/** A `sharp` seed — where `radius.full` compiles to 0 and a pill stops being one. */
const SHARP_SEED: ThemeSeed = { ...SEED, shape: 'sharp' };

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED): HTMLElement {
  const result = render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
  // Scoped to this render's own container: several of these tests render more
  // than once, and `document.body` keeps every one of them.
  return within(result.container).getByTestId('icon');
}

/** The injected V4 icon sheet, as text. */
function sheet(): string {
  const style = document.getElementById('xen-v4-icon-styles');
  return style?.textContent ?? '';
}

const TONES: IconColor[] = ['primary', 'success', 'warn', 'danger', 'onSurface', 'muted'];

describe('IconV4 (web)', () => {
  describe('the base rendering, unchanged', () => {
    it('resolves a name through the kit set and lets `glyph` win', () => {
      expect(renderThemed(<IconV4 data-testid="icon" name="close" />).textContent).toBe(
        ICON_GLYPHS.close
      );
      expect(
        renderThemed(<IconV4 data-testid="icon" name="close" glyph="🫐" />).textContent
      ).toBe('🫐');
      // An unrecognised name still renders as-is — the pre-named-set behaviour.
      expect(
        renderThemed(<IconV4 data-testid="icon" name={'🎈' as never} />).textContent
      ).toBe('🎈');
    });

    it('is decorative unless it is given a label', () => {
      const quiet = renderThemed(<IconV4 data-testid="icon" name="home" />);
      expect(quiet.getAttribute('aria-hidden')).toBe('true');
      expect(quiet.getAttribute('role')).toBeNull();

      const spoken = renderThemed(<IconV4 data-testid="icon" name="home" aria-label="Home" />);
      expect(spoken.getAttribute('role')).toBe('img');
      expect(spoken.getAttribute('aria-label')).toBe('Home');
      expect(spoken.getAttribute('aria-hidden')).toBeNull();
    });

    it('takes its size from the type scale, or a raw px number', () => {
      expect(renderThemed(<IconV4 data-testid="icon" name="home" size="2xl" />).className).toContain(
        'text-2xl'
      );
      const numeric = renderThemed(<IconV4 data-testid="icon" name="home" size={28} />);
      expect(numeric.style.fontSize).toBe('28px');
      expect(numeric.className).not.toContain('text-lg');
    });

    it('paints an unbadged glyph from a semantic token class, never a literal', () => {
      const el = renderThemed(<IconV4 data-testid="icon" name="check" color="success" />);
      expect(el.className).toContain('text-success');
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-f]{3,8}/i);
      expect(el.getAttribute('data-badge')).toBeNull();
    });
  });

  describe('the empty state (§12)', () => {
    it('holds the box with a ring rather than collapsing to nothing', () => {
      const el = renderThemed(<IconV4 data-testid="icon" />);
      expect(el.getAttribute('data-empty')).toBe('');
      const ring = el.querySelector('[data-xen-v4-icon-empty]');
      expect(ring).not.toBeNull();
      // Nothing to announce — an absent icon is not content.
      expect(ring?.getAttribute('aria-hidden')).toBe('true');
    });

    it('treats an empty `glyph` and an empty `name` as absent too', () => {
      expect(
        renderThemed(<IconV4 data-testid="icon" glyph="" />).getAttribute('data-empty')
      ).toBe('');
      expect(
        renderThemed(<IconV4 data-testid="icon" name={'' as never} />).getAttribute('data-empty')
      ).toBe('');
      expect(
        renderThemed(<IconV4 data-testid="icon" name="home" />).getAttribute('data-empty')
      ).toBeNull();
    });

    it('draws the ring from `currentColor` at M3 disabled-content opacity', () => {
      renderThemed(<IconV4 data-testid="icon" />);
      expect(sheet()).toContain('border: 1px solid currentColor');
      expect(sheet()).toContain(`opacity: ${V4_STATE.disabledContent}`);
    });

    it('still survives with a badge — a badge with no glyph is not a hole either', () => {
      const el = renderThemed(<IconV4 data-testid="icon" badge="soft" color="primary" />);
      expect(el.getAttribute('data-badge')).toBe('soft');
      expect(el.querySelector('[data-xen-v4-icon-empty]')).not.toBeNull();
    });
  });

  describe('the badge (§8 / §9)', () => {
    it('draws nothing extra by default — the additive rule', () => {
      const el = renderThemed(<IconV4 data-testid="icon" name="star" />);
      expect(el.getAttribute('data-badge')).toBeNull();
      expect(el.getAttribute('data-shape')).toBeNull();
      expect(el.style.getPropertyValue('--xen-v4-icon-ground-l')).toBe('');
    });

    it('composites a soft ground opaquely rather than reaching for `primary-50`', () => {
      const theme = compileTheme(SEED);
      const el = renderThemed(<IconV4 data-testid="icon" name="sparkle" color="primary" badge="soft" />);
      expect(el.style.getPropertyValue('--xen-v4-icon-ground-l')).toBe(
        mixToken(theme.light.surface, theme.light.primary, 0.14)
      );
      // Not the ramp step §8 names literally: it is a light-scheme colour whose
      // contrast against the glyph was never measured in dark.
      expect(el.style.getPropertyValue('--xen-v4-icon-ground-l')).not.toBe(
        theme.ramps.primary[50]
      );
      expect(el.className).not.toContain('bg-primary-50');
    });

    it('inverts with the scheme — one pair down, the sheet picks', () => {
      const theme = compileTheme(SEED);
      const el = renderThemed(<IconV4 data-testid="icon" name="sparkle" color="primary" badge="soft" />);
      expect(el.style.getPropertyValue('--xen-v4-icon-ground-d')).toBe(
        mixToken(theme.dark.surface, theme.dark.primary, 0.14)
      );
      expect(el.style.getPropertyValue('--xen-v4-icon-ground-d')).not.toBe(
        el.style.getPropertyValue('--xen-v4-icon-ground-l')
      );
      expect(sheet()).toContain('[data-theme="dark"] [data-xen-v4-icon][data-badge]');
    });

    it('fills solid with the tone and labels it with the guaranteed on-pair', () => {
      const theme = compileTheme(SEED);
      const el = renderThemed(<IconV4 data-testid="icon" name="lock" color="primary" badge="solid" />);
      expect(el.getAttribute('data-badge')).toBe('solid');
      expect(el.style.getPropertyValue('--xen-v4-icon-ground-l')).toBe(theme.light.primary);
      expect(
        contrastRatio(
          el.style.getPropertyValue('--xen-v4-icon-ink-l'),
          theme.light.primary
        )
      ).toBeGreaterThanOrEqual(4.5);
    });

    it('re-measures the glyph against the ground it derived, every tone, both schemes', () => {
      TONES.forEach((color) => {
        (['soft', 'solid'] as const).forEach((badge) => {
          const el = renderThemed(
            <IconV4 data-testid="icon" name="check" color={color} badge={badge} />
          );
          (['l', 'd'] as const).forEach((scheme) => {
            const ground = el.style.getPropertyValue(`--xen-v4-icon-ground-${scheme}`);
            const ink = el.style.getPropertyValue(`--xen-v4-icon-ink-${scheme}`);
            expect(contrastRatio(ink, ground)).toBeGreaterThanOrEqual(4.5);
          });
        });
      });
    });

    it('drops the utility colour class when badged, so the scheme can switch the ink', () => {
      const el = renderThemed(<IconV4 data-testid="icon" name="check" color="primary" badge="soft" />);
      expect(el.className).not.toContain('text-primary');
      expect(el.style.getPropertyValue('--xen-v4-icon-ink-l')).not.toBe('');
    });

    it('is a circle by geometry, not by `radius.full` — which a sharp seed zeroes', () => {
      const el = renderThemed(
        <IconV4 data-testid="icon" name="check" badge="soft" />,
        SHARP_SEED
      );
      expect(el.getAttribute('data-shape')).toBe('circle');
      expect(sheet()).toContain('[data-xen-v4-icon][data-shape="circle"] { border-radius: 50%; }');
      expect(sheet()).not.toContain('data-shape="circle"] { border-radius: var(--xen-radius-full)');
    });

    it('takes `radius.lg` for the §9 rounded tile', () => {
      const el = renderThemed(
        <IconV4 data-testid="icon" name="lock" badge="solid" badgeShape="rounded" />
      );
      expect(el.getAttribute('data-shape')).toBe('rounded');
      expect(sheet()).toContain(
        '[data-xen-v4-icon][data-shape="rounded"] { border-radius: var(--xen-radius-lg); }'
      );
    });

    it('sizes from the spacing scale with the 44 control floor, never a picked px', () => {
      renderThemed(<IconV4 data-testid="icon" name="check" badge="soft" />);
      expect(sheet()).toContain('max(44px, calc(1em + var(--xen-space-sm) * 2))');
      // 44 is the only bare number, and it is the named control metric.
      const diameterRule = sheet().match(/--xen-v4-icon-d:[^;]+;/)?.[0] ?? '';
      expect(diameterRule.match(/\d+px/g)).toEqual(['44px']);
    });

    it('moves on the M3 scale and stands still under reduced motion', () => {
      renderThemed(<IconV4 data-testid="icon" name="check" badge="soft" />);
      expect(sheet()).toContain('background-color 200ms cubic-bezier(0.2, 0, 0, 1)');
      expect(sheet()).toContain('@media (prefers-reduced-motion: reduce)');
    });

    it('never carries a gradient — an icon is not the hero (§35.11)', () => {
      const el = renderThemed(<IconV4 data-testid="icon" name="star" badge="solid" />);
      expect(el.getAttribute('style')).not.toContain('gradient');
    });
  });

  describe('with no provider above it', () => {
    it('falls back to a token `color-mix()` rather than guessing a hex', () => {
      const { container } = render(
        <IconV4 data-testid="icon" name="sparkle" color="primary" badge="soft" />
      );
      const el = within(container).getByTestId('icon');
      expect(el.style.getPropertyValue('--xen-v4-icon-ground-l')).toBe(
        'color-mix(in srgb, var(--xen-primary) 14%, var(--xen-surface))'
      );
      expect(el.style.getPropertyValue('--xen-v4-icon-ink-l')).toBe('var(--xen-primary)');
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-f]{3,8}/i);
    });

    it('kebabs the counter-slot for the solid fallback ink', () => {
      const { container } = render(
        <IconV4 data-testid="icon" name="lock" color="primary" badge="solid" />
      );
      const el = within(container).getByTestId('icon');
      expect(el.style.getPropertyValue('--xen-v4-icon-ground-l')).toBe('var(--xen-primary)');
      expect(el.style.getPropertyValue('--xen-v4-icon-ink-l')).toBe('var(--xen-on-primary)');
    });
  });

  it('forwards its ref and passes DOM props through', () => {
    let node: HTMLSpanElement | null = null;
    const { container } = render(
      <XenitionUIProvider theme={SEED}>
        <IconV4
          data-testid="icon"
          name="home"
          title="Home"
          ref={(el) => {
            node = el;
          }}
        />
      </XenitionUIProvider>
    );
    expect(node).not.toBeNull();
    expect(within(container).getByTestId('icon').getAttribute('title')).toBe('Home');
  });
});
