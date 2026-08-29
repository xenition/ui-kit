import * as React from 'react';
import { Text as RNText } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { V4_STATE } from '../../primitives/internal/v4-state';
import { RAIL_MIN_ROWS, StepListV4, type StepListV4Item } from './StepListV4';

/** The paywall case §8 is written for: parallel promises, no step state. */
const FEATURES: StepListV4Item[] = [
  { icon: 'bolt', title: 'Instant sync', description: 'Every device, every second.' },
  { icon: 'lock', title: 'Private by default', description: 'Nothing leaves your account.' },
  { icon: 'star', title: 'Unlimited history', description: 'Nothing is ever trimmed.' },
];

function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

function styled(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style));
}

/** §8's disc: a square box drawn as a circle from its own diameter. */
function badges(root: ReactTestInstance): Record<string, unknown>[] {
  return styled(root).filter(
    (s) =>
      typeof s.width === 'number' &&
      s.width === s.height &&
      s.borderRadius === (s.width as number) / 2
  );
}

/** The hairline joining them. */
function rails(root: ReactTestInstance): Record<string, unknown>[] {
  return styled(root).filter((s) => s.width === 1 && s.flex === 1);
}

/**
 * Every string a host `Text` actually renders. `getByText` skips the badge,
 * because a decorative glyph is correctly hidden from the screen reader.
 */
function marks(root: ReactTestInstance): string[] {
  return root
    .findAll((n) => typeof n.type === 'string' && typeof n.props?.children === 'string')
    .map((n) => n.props.children as string);
}

/** The row boxes — badge column beside the copy column. */
function rows(root: ReactTestInstance): Record<string, unknown>[] {
  return styled(root).filter(
    (s) => s.flexDirection === 'row' && s.paddingBottom !== undefined
  );
}

describe('StepListV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);
  const light = theme.light;

  it('builds §8 anatomy: a circular tinted badge, a bold title, a muted line', () => {
    const { root, getByText } = renderThemed(<StepListV4 steps={FEATURES} />, SEED_LIGHT);

    const discs = badges(root);
    expect(discs).toHaveLength(FEATURES.length);
    discs.forEach((disc) => {
      // §8's 44, and a circle rather than a rounded square — the escape from
      // "icon in a coloured box on every row".
      expect(disc.width).toBeGreaterThanOrEqual(44);
      expect(disc.borderRadius).toBe((disc.width as number) / 2);
      // A wash of the brand, not the brand itself and not a ramp step —
      // `ramps.primary[50]` keeps the light orientation in BOTH schemes.
      expect(disc.backgroundColor).not.toBe(light.primary);
      expect(disc.backgroundColor).not.toBe(light.surface);
      expect(disc.backgroundColor).not.toBe(theme.ramps.primary[50]);
    });

    const title = flat(getByText('Instant sync').props.style);
    expect(title.fontSize).toBe(theme.typography.scale.base);
    expect(title.fontWeight).toBe('600');
    expect(title.color).toBe(light.onSurface);

    const description = flat(getByText('Every device, every second.').props.style);
    expect(description.fontSize).toBe(theme.typography.scale.sm);
    expect(description.color).toBe(light.muted);
    // The description is genuinely smaller, not just paler.
    expect(description.fontSize as number).toBeLessThan(title.fontSize as number);
  });

  it('keeps the rows one `md` apart, and does not pad the last one', () => {
    const { root } = renderThemed(<StepListV4 steps={FEATURES} />, SEED_LIGHT);
    const found = rows(root);
    expect(found).toHaveLength(3);
    expect(found.map((r) => r.paddingBottom)).toEqual([
      theme.spacing.md,
      theme.spacing.md,
      0,
    ]);
    // The gap between badge and copy is the same `md`.
    found.forEach((r) => expect(r.gap).toBe(theme.spacing.md));
  });

  describe('the rail — §8, on by default at three rows', () => {
    it('draws none for zero rows', () => {
      const { root } = renderThemed(<StepListV4 steps={[]} />, SEED_LIGHT);
      expect(rails(root)).toHaveLength(0);
    });

    it('draws none for one row — a single badge connects to nothing', () => {
      const { root } = renderThemed(<StepListV4 steps={FEATURES.slice(0, 1)} />, SEED_LIGHT);
      expect(badges(root)).toHaveLength(1);
      expect(rails(root)).toHaveLength(0);
    });

    it('still draws none for two rows — a pair needs no help', () => {
      const { root } = renderThemed(<StepListV4 steps={FEATURES.slice(0, 2)} />, SEED_LIGHT);
      expect(rails(root)).toHaveLength(0);
    });

    it('turns itself on at three, and stops at the last badge', () => {
      const { root } = renderThemed(<StepListV4 steps={FEATURES} />, SEED_LIGHT);
      expect(FEATURES).toHaveLength(RAIL_MIN_ROWS);
      // n − 1 segments: three fragments become one list.
      const found = rails(root);
      expect(found).toHaveLength(FEATURES.length - 1);
      found.forEach((r) => expect(r.backgroundColor).toBe(light.border));
    });

    it('lets `connector` overrule the count in both directions', () => {
      const off = renderThemed(<StepListV4 steps={FEATURES} connector={false} />, SEED_LIGHT);
      expect(rails(off.root)).toHaveLength(0);

      const on = renderThemed(<StepListV4 steps={FEATURES.slice(0, 2)} connector />, SEED_LIGHT);
      expect(rails(on.root)).toHaveLength(1);
    });
  });

  describe('the empty state — §12', () => {
    it('renders nothing at all for zero rows', () => {
      const { root } = renderThemed(<StepListV4 steps={[]} />, SEED_LIGHT);
      expect(badges(root)).toHaveLength(0);
      expect(rows(root)).toHaveLength(0);
      expect(marks(root)).toEqual([]);
    });

    it('renders `empty` when the caller owns the region', () => {
      const { getByText, root } = renderThemed(
        <StepListV4 steps={[]} empty={<RNText>Nothing to set up yet</RNText>} />,
        SEED_LIGHT
      );
      expect(getByText('Nothing to set up yet')).toBeTruthy();
      expect(rows(root)).toHaveLength(0);
    });

    it('keeps the caller’s style on the empty box, so layout holds', () => {
      const { root } = renderThemed(
        <StepListV4 steps={[]} style={{ marginTop: theme.spacing.lg }} />,
        SEED_LIGHT
      );
      expect(styled(root).some((s) => s.marginTop === theme.spacing.lg)).toBe(true);
    });
  });

  describe('the badge contents', () => {
    it('carries the row’s glyph when it has one, and no ordinal', () => {
      const { root } = renderThemed(<StepListV4 steps={FEATURES} />, SEED_LIGHT);
      // `bolt`, `lock` and `star` resolve through the kit's named set, and no
      // disc falls back to an ordinal.
      const rendered = marks(root);
      expect(rendered).toContain('⚡');
      expect(rendered).toContain('🔒');
      expect(rendered).toContain('★');
      expect(rendered).not.toContain('1');
    });

    it('falls back to the step number when the row has no glyph', () => {
      const { root } = renderThemed(
        <StepListV4 steps={[{ title: 'Sear the onions' }, { title: 'Deglaze' }]} />,
        SEED_LIGHT
      );
      expect(marks(root)).toEqual(expect.arrayContaining(['1', '2']));
    });
  });

  describe('the state ladder', () => {
    it('is flat with no `current` — the paywall case', () => {
      const { root } = renderThemed(<StepListV4 steps={FEATURES} />, SEED_LIGHT);
      badges(root).forEach((disc) => {
        expect(disc.backgroundColor).not.toBe(light.primary);
        expect(disc.borderColor).toBe('transparent');
      });
    });

    it('fills what is done, rings what is current, washes what is ahead', () => {
      const { root, getByText } = renderThemed(
        <StepListV4 steps={FEATURES} current={1} />,
        SEED_LIGHT
      );
      const discs = badges(root);
      // Done: the disc becomes the brand itself.
      expect(discs[0]?.backgroundColor).toBe(light.primary);
      expect(discs[1]?.backgroundColor).not.toBe(light.primary);
      expect(discs[2]?.backgroundColor).not.toBe(light.primary);
      // Only the current badge gains the hairline ring; the others reserve the
      // same 1px in `transparent` so nothing shifts when the step advances.
      expect(discs.map((d) => d.borderColor)).toEqual([
        'transparent',
        light.primary,
        'transparent',
      ]);
      discs.forEach((d) => expect(d.borderWidth).toBe(1));
      // A title never mutes, whatever the step state.
      FEATURES.forEach((f) => {
        expect(flat(getByText(f.title as string).props.style).color).toBe(light.onSurface);
      });
    });

    it('honours a per-row `done` outside any linear order', () => {
      const { root } = renderThemed(
        <StepListV4 steps={[{ title: 'A' }, { title: 'B', done: true }, { title: 'C' }]} />,
        SEED_LIGHT
      );
      expect(badges(root).map((d) => d.backgroundColor === light.primary)).toEqual([
        false,
        true,
        false,
      ]);
    });
  });

  describe('interaction', () => {
    it('is inert without a handler', () => {
      const { root } = renderThemed(<StepListV4 steps={FEATURES} />, SEED_LIGHT);
      expect(
        root.findAll((n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'button')
      ).toHaveLength(0);
    });

    it('makes every row pressable, announces completion, and fires the index', () => {
      const seen: number[] = [];
      const { root, getByText } = renderThemed(
        <StepListV4 steps={FEATURES} current={1} onStepPress={(i) => seen.push(i)} />,
        SEED_LIGHT
      );
      const pressables = root.findAll(
        (n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'button'
      );
      expect(pressables).toHaveLength(3);
      expect(pressables.map((p) => p.props.accessibilityState?.checked)).toEqual([
        true,
        false,
        false,
      ]);

      fireEvent.press(getByText('Unlimited history'));
      expect(seen).toEqual([2]);
    });

    it('tints a press from the two scheme-resolved slots, in both schemes', () => {
      const both = compileTheme(SEED_BOTH);
      const pressedStyle = (scheme: 'light' | 'dark'): Record<string, unknown> => {
        const { root } = renderThemed(
          <StepListV4 steps={FEATURES} onStepPress={() => {}} />,
          SEED_BOTH,
          scheme
        );
        const node = root.findAll(
          (n) => typeof n.props?.style === 'function' && n.props?.onPress !== undefined
        )[0];
        return flat((node?.props.style as (s: { pressed: boolean }) => unknown)({ pressed: true }));
      };
      expect(pressedStyle('light').backgroundColor).toBe(
        mixToken(both.light.surface, both.light.onSurface, V4_STATE.pressed)
      );
      expect(pressedStyle('dark').backgroundColor).toBe(
        mixToken(both.dark.surface, both.dark.onSurface, V4_STATE.pressed)
      );
      // The wrong reach: `ramps.neutral[50]` is a near-white in BOTH schemes.
      expect(pressedStyle('dark').backgroundColor).not.toBe(both.ramps.neutral[50]);
    });

    it('never lifts a row', () => {
      const { root } = renderThemed(
        <StepListV4 steps={FEATURES} onStepPress={() => {}} />,
        SEED_LIGHT
      );
      styled(root).forEach((s) => {
        expect(s.shadowOpacity).toBeUndefined();
        expect(s.elevation).toBeUndefined();
      });
    });
  });

  it('reaches the dark scheme through the semantic slots, not a ramp step', () => {
    const both = compileTheme(SEED_BOTH);
    const { root } = renderThemed(<StepListV4 steps={FEATURES} current={1} />, SEED_BOTH, 'dark');
    rails(root).forEach((r) => expect(r.backgroundColor).toBe(both.dark.border));
    const discs = badges(root);
    expect(discs[0]?.backgroundColor).toBe(both.dark.primary);
    expect(discs[1]?.borderColor).toBe(both.dark.primary);
    // A ramp step would have painted a near-white disc on a near-black page.
    discs.forEach((d) => expect(d.backgroundColor).not.toBe(both.ramps.primary[50]));
  });
});
