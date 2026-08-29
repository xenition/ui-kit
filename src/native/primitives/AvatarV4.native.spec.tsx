import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { mirrorStep, monogramStep } from '../../primitives/internal/v4-depth';
import type { AvatarSize, AvatarStatus } from './Avatar';
import { AvatarV4 } from './AvatarV4';

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const STATUSES: AvatarStatus[] = ['online', 'away', 'busy', 'offline'];

/** Every flattened style object in the tree, outermost first. */
function styles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => n.props?.style !== undefined)
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

/** The face — the box that carries the derived monogram ground. */
function face(root: ReactTestInstance): Record<string, unknown> {
  const found = styles(root).find((s) => s.overflow === 'hidden');
  expect(found).toBeDefined();
  return found as Record<string, unknown>;
}

describe('AvatarV4 (native)', () => {
  it('derives the monogram ground from the NAME, not from `primary`', () => {
    const theme = compileTheme(SEED_LIGHT);
    const ada = face(renderThemed(<AvatarV4 name="Ada Lovelace" />, SEED_LIGHT).root);
    expect(ada.backgroundColor).toBe(theme.ramps.neutral[monogramStep('Ada Lovelace')]);
    // The base avatar painted every fallback `colors.primary`, so a roster of
    // twelve people was twelve identical brand discs.
    expect(ada.backgroundColor).not.toBe(theme.light.primary);
  });

  it('gives the same person the same ground every time, and neighbours different ones', () => {
    const ground = (name: string): unknown =>
      face(renderThemed(<AvatarV4 name={name} />, SEED_LIGHT).root).backgroundColor;
    expect(ground('Ada Lovelace')).toBe(ground('ada lovelace'));
    expect(ground('Ada Lovelace')).toBe(ground('  Ada Lovelace '));
    // Not a claim that any two names differ — a claim that the derivation
    // spreads. Across a handful of names it must use more than one step.
    const spread = new Set(['Ada', 'Grace', 'Alan', 'Katherine', 'Barbara', 'Edsger'].map(ground));
    expect(spread.size).toBeGreaterThan(1);
  });

  it('mirrors the ramp step on a dark page — `tokens.ramps` does not resolve per scheme', () => {
    const theme = compileTheme(SEED_LIGHT);
    const step = monogramStep('Ada Lovelace');
    const dark = face(renderThemed(<AvatarV4 name="Ada Lovelace" />, SEED_LIGHT, 'dark').root);
    expect(dark.backgroundColor).toBe(theme.ramps.neutral[mirrorStep(step)]);
    expect(dark.backgroundColor).not.toBe(theme.ramps.neutral[step]);
  });

  it('clears AA for the monogram against the ground it derived — every scheme', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson'].forEach((name) => {
          const { root, getByText } = renderThemed(<AvatarV4 name={name} />, seed, scheme);
          const bg = face(root).backgroundColor as string;
          const initials = name
            .split(' ')
            .map((w) => w[0])
            .join('');
          const fg = (getByText(initials).props.style as { color: string }).color;
          expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5);
        });
      });
    });
  });

  it('draws a silhouette rather than a question mark when there is no name', () => {
    const { root, queryByText } = renderThemed(<AvatarV4 />, SEED_LIGHT);
    expect(queryByText('?')).toBeNull();
    // Two shapes, held back so a placeholder never outshouts a real face.
    const faded = styles(root).filter((s) => s.opacity === 0.4);
    expect(faded.length).toBeGreaterThan(0);
  });

  it('rings as a halo — the portrait insets and a `surface` gap sits between', () => {
    const theme = compileTheme(SEED_LIGHT);
    const plain = renderThemed(<AvatarV4 name="Ada" size="lg" />, SEED_LIGHT).root;
    const ringed = renderThemed(<AvatarV4 name="Ada" size="lg" ring />, SEED_LIGHT).root;

    const gapBox = styles(ringed).find((s) => s.borderWidth === 2 && s.padding !== undefined);
    expect(gapBox).toBeDefined();
    expect(gapBox?.backgroundColor).toBe(theme.light.surface);
    // A ring is a UI boundary, judged at 3:1 — not text.
    expect(contrastRatio(gapBox?.borderColor as string, theme.light.surface)).toBeGreaterThanOrEqual(3);
    // The face gives up room to the halo instead of the halo cropping the face.
    expect(face(ringed).width as number).toBeLessThan(face(plain).width as number);
  });

  it('takes the ring from the status when there is one', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<AvatarV4 name="Ada" ring status="busy" />, SEED_LIGHT);
    const gapBox = styles(root).find((s) => s.borderWidth === 2 && s.padding !== undefined);
    expect(gapBox?.borderColor).toBe(theme.light.danger);
  });

  it('lands the status dot on the arc for a circle, in the corner for a square', () => {
    const dot = (props: Partial<Parameters<typeof AvatarV4>[0]>): Record<string, unknown> => {
      const found = styles(
        renderThemed(<AvatarV4 name="Ada" status="online" {...props} />, SEED_LIGHT).root
      ).find((s) => s.position === 'absolute');
      expect(found).toBeDefined();
      return found as Record<string, unknown>;
    };

    // xl: 72px across, a 16px dot. The 45° point of the arc is 10.54px in from
    // the box edge, so the dot's centre lands there rather than in the corner.
    const xl = dot({ size: 'xl' });
    const box = styles(renderThemed(<AvatarV4 name="Ada" size="xl" />, SEED_LIGHT).root)[0]
      .width as number;
    const centre = box - (xl.right as number) - (xl.width as number) / 2;
    expect(centre).toBeCloseTo((box / 2) * (1 + Math.SQRT1_2), 5);

    // A square has no arc to follow: the corner IS the edge.
    expect(dot({ shape: 'square' }).right).toBe(0);
  });

  it('names the presence state so it is never carried by hue alone', () => {
    const LABEL: Record<AvatarStatus, string> = {
      online: 'Online',
      away: 'Away',
      busy: 'Busy',
      offline: 'Offline',
    };
    STATUSES.forEach((status) => {
      const { getByLabelText } = renderThemed(<AvatarV4 name="Ada" status={status} />, SEED_LIGHT);
      expect(getByLabelText(LABEL[status])).toBeTruthy();
    });
  });

  it('composes its diameters from the spacing scale', () => {
    const theme = compileTheme(SEED_LIGHT);
    const box = (size: AvatarSize): number =>
      styles(renderThemed(<AvatarV4 name="Ada" size={size} />, SEED_LIGHT).root)[0].width as number;
    expect(box('xs')).toBe(theme.spacing.lg);
    expect(box('sm')).toBe(theme.spacing.xl);
    expect(box('md')).toBe(theme.spacing.xl + theme.spacing.sm);
    expect(box('lg')).toBe(theme.spacing['2xl'] + theme.spacing.sm);
    expect(box('xl')).toBe(theme.spacing['2xl'] + theme.spacing.lg);
    SIZES.forEach((size) => expect(box(size)).toBeGreaterThan(0));
  });

  it('paints every colour from a token, and never a gradient', () => {
    const allowed = tokenHexSet(SEED_DARK);
    const { root, queryByLabelText } = renderThemed(
      <AvatarV4 name="Grace Hopper" size="xl" status="away" />,
      SEED_DARK,
      'dark'
    );
    // No ring here: the ring colour is `ensureContrast`-walked, which is a
    // derivation OF a token rather than a token, and would fail a set check.
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
    // A gradient behind a face is decoration on a data point (§35.11).
    expect(queryByLabelText('linear-gradient')).toBeNull();
  });
});
