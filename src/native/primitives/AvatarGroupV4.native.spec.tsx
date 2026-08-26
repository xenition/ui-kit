import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { STACK_OVERLAP, avatarDiameters } from './internal/identity-v4';
import { monogramStep } from '../../primitives/internal/v4-depth';
import { AvatarGroupV4 } from './AvatarGroupV4';

const TEAM = [
  { name: 'Ada Lovelace' },
  { name: 'Grace Hopper' },
  { name: 'Alan Turing' },
  { name: 'Katherine Johnson' },
  { name: 'Barbara Liskov' },
  { name: 'Edsger Dijkstra' },
];

/**
 * Every flattened style object in the tree, outermost first.
 *
 * Host nodes only — `findAll` also returns the composite `View` wrapping each
 * host `View`, and counting a stack twice makes its z-order look interleaved.
 */
function styles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => {
      const merged: Record<string, unknown> = {};
      const walk = (style: unknown): void => {
        if (!style) return;
        if (Array.isArray(style)) {
          style.forEach(walk);
          return;
        }
        if (typeof style === 'object') Object.assign(merged, style as Record<string, unknown>);
      };
      walk(n.props.style);
      return merged;
    });
}

/** The per-face outline wrappers, in order. */
function slots(root: ReactTestInstance): Record<string, unknown>[] {
  return styles(root).filter((s) => s.zIndex !== undefined && s.width === undefined);
}

describe('AvatarGroupV4 (native)', () => {
  it('slides each face by a fraction of the diameter, not by a fixed 8px', () => {
    const theme = compileTheme(SEED_LIGHT);
    const d = avatarDiameters(theme.spacing);
    (['xs', 'xl'] as const).forEach((size) => {
      const { root } = renderThemed(
        <AvatarGroupV4 avatars={TEAM.slice(0, 3)} size={size} />,
        SEED_LIGHT
      );
      const second = slots(root)[1];
      expect(second.marginLeft).toBe(-Math.round(d[size] * STACK_OVERLAP));
    });
  });

  it('puts the LEADING face on top, so the stack reads left to right', () => {
    const { root } = renderThemed(<AvatarGroupV4 avatars={TEAM.slice(0, 3)} />, SEED_LIGHT);
    const z = slots(root).map((s) => s.zIndex as number);
    expect(z).toEqual([3, 2, 1]);
  });

  it('leaves the first face flush and separates every face with the page colour', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<AvatarGroupV4 avatars={TEAM.slice(0, 3)} />, SEED_LIGHT);
    const wrappers = slots(root);
    expect(wrappers[0].marginLeft).toBe(0);
    wrappers.forEach((w) => {
      expect(w.borderColor).toBe(theme.light.surface);
      expect(w.borderWidth).toBe(2);
    });
  });

  it('collapses a real overflow into a countable +N', () => {
    const { getByText, getByLabelText } = renderThemed(
      <AvatarGroupV4 avatars={TEAM} max={4} />,
      SEED_LIGHT
    );
    expect(getByText('+2')).toBeTruthy();
    // Countable for a screen reader too, not just for the eye.
    expect(getByLabelText('2 more')).toBeTruthy();
  });

  it('never renders a `+1` — it costs the same width and says less', () => {
    const { queryByText } = renderThemed(
      <AvatarGroupV4 avatars={TEAM.slice(0, 5)} max={4} />,
      SEED_LIGHT
    );
    expect(queryByText('+1')).toBeNull();
    // The fifth person is shown instead.
    expect(queryByText('ED')).toBeNull();
    expect(queryByText('BL')).toBeTruthy();
  });

  it('gives the +N chip the page surface, not another face', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getByText } = renderThemed(<AvatarGroupV4 avatars={TEAM} max={3} />, SEED_LIGHT);
    const chip = styles(root).find((s) => s.width !== undefined && s.zIndex === 0);
    expect(chip?.backgroundColor).toBe(theme.light.surface);
    // A face at the same size would be carrying a derived neutral ground.
    expect(chip?.backgroundColor).not.toBe(theme.ramps.neutral[monogramStep('Ada Lovelace')]);
    // The count still has to be readable — `muted` carries no such promise.
    const label = (getByText('+3').props.style as { color: string }).color;
    expect(contrastRatio(label, theme.light.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it('lines the chip up with the faces exactly', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<AvatarGroupV4 avatars={TEAM} max={3} size="lg" />, SEED_LIGHT);
    const chip = styles(root).find((s) => s.width !== undefined && s.zIndex === 0);
    expect(chip?.width).toBe(avatarDiameters(theme.spacing).lg);
    expect(chip?.height).toBe(chip?.width);
  });

  it('renders every avatar when there is no overflow at all', () => {
    const { getByText } = renderThemed(<AvatarGroupV4 avatars={TEAM.slice(0, 3)} />, SEED_LIGHT);
    ['AL', 'GH', 'AT'].forEach((mono) => expect(getByText(mono)).toBeTruthy());
  });
});
