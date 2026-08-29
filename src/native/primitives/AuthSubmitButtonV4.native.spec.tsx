import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { fireEvent } from '@testing-library/react-native';
import { SEED_BOTH, SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { gradientInk } from '../../primitives/internal/v4-depth';
import { V4_STATE } from '../../primitives/internal/v4-state';
import type { ThemeSeed } from '../../theme/types';
import { AUTH_SUBMIT_HEIGHT_V4, AuthSubmitButtonV4 } from './AuthSubmitButtonV4';

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

function styles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style));
}

/** The animated shell — the node carrying the fill, the radius and the lift. */
function shell(root: ReactTestInstance): Record<string, unknown> {
  const found = styles(root).find((s) => s.alignSelf === 'stretch' && s.shadowOpacity !== undefined);
  expect(found).toBeDefined();
  return found as Record<string, unknown>;
}

/** The pressable itself — the node carrying the 56 and the pill. */
function target(root: ReactTestInstance): Record<string, unknown> {
  const found = styles(root).find((s) => s.minHeight !== undefined && s.flexDirection === 'row');
  expect(found).toBeDefined();
  return found as Record<string, unknown>;
}

/**
 * The trailing glyph nodes bearing `mark`.
 *
 * `queryByText` cannot see them: `IconV4` marks a decorative glyph
 * `accessibilityElementsHidden`, and RNTL's queries skip hidden elements by
 * default. That the arrow is hidden from a screen reader is correct — the
 * button already carries the name — so the spec looks at the tree instead of
 * relaxing the component.
 */
function glyph(root: ReactTestInstance, mark: string): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && n.props?.children === mark);
}

/** The busy ring, likewise hidden from the accessibility tree on purpose. */
function ring(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && n.props?.testID === 'xen-v4-spinner');
}

/** The gradient overlay's stop list, or `null` when there is no overlay. */
function stops(root: ReactTestInstance): string[] | null {
  const node = root.findAll((n) => n.props?.colors !== undefined)[0];
  return node === undefined ? null : (node.props.colors as string[]);
}

describe('AuthSubmitButtonV4 (native)', () => {
  // ───────────────────────────────────────────────────────────────────────────
  // §5 — the shape
  // ───────────────────────────────────────────────────────────────────────────

  it('is a full-width pill at §5’s 56, composed from the spacing scale', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<AuthSubmitButtonV4 label="Sign in" />, SEED_LIGHT);
    // 48 + 8, so a re-scaled seed re-scales the CTA rather than leaving a
    // pinned literal behind — and it lands on exactly §5's 56.
    expect(target(root).minHeight).toBe(theme.spacing['2xl'] + theme.spacing.sm);
    expect(target(root).minHeight).toBe(AUTH_SUBMIT_HEIGHT_V4);
    expect(target(root).borderRadius).toBe(theme.radius.full);
    expect(shell(root).borderRadius).toBe(theme.radius.full);
    expect(shell(root).alignSelf).toBe('stretch');
    expect(target(root).paddingHorizontal).toBe(theme.spacing.lg);
  });

  it('keeps the Addendum’s 48/radius.md away from the sticky CTA', () => {
    // That ruling is anchored on `InputV4` and governs FIELD-shaped controls.
    // The one dominant action is not one of them.
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<AuthSubmitButtonV4 label="Sign in" />, SEED_LIGHT);
    expect(target(root).borderRadius).not.toBe(theme.radius.md);
    expect(target(root).minHeight).not.toBe(theme.spacing['2xl']);
  });

  it('stays a pill even on a `sharp` seed, where `radius.full` compiles to 0', () => {
    const theme = compileTheme(SEED_DARK);
    const { root } = renderThemed(<AuthSubmitButtonV4 label="Sign in" />, SEED_DARK);
    // The seed decides the corner, not the component. `sharp` means square.
    expect(target(root).borderRadius).toBe(theme.radius.full);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // §5 — disabled is the same shape at reduced opacity
  // ───────────────────────────────────────────────────────────────────────────

  it('disables to the SAME shape, only dimmer — never a shape that moves', () => {
    const live = renderThemed(<AuthSubmitButtonV4 label="Sign in" />, SEED_LIGHT).root;
    const dead = renderThemed(<AuthSubmitButtonV4 label="Sign in" disabled />, SEED_LIGHT).root;
    expect(target(dead).minHeight).toBe(target(live).minHeight);
    expect(target(dead).borderRadius).toBe(target(live).borderRadius);
    expect(target(dead).paddingHorizontal).toBe(target(live).paddingHorizontal);
    // M3's 0.38 for disabled CONTENT, off the shared scale — not a round 0.5.
    expect(shell(live).opacity).toBe(1);
    expect(shell(dead).opacity).toBe(V4_STATE.disabledContent);
  });

  it('does not fire when disabled', () => {
    const onPress = jest.fn();
    const dead = renderThemed(
      <AuthSubmitButtonV4 label="Sign in" disabled onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(dead.getByLabelText('Sign in'));
    expect(onPress).not.toHaveBeenCalled();
    expect(dead.getByLabelText('Sign in').props.accessibilityState.disabled).toBe(true);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // §5 — the trailing arrow, on a forward action only
  // ───────────────────────────────────────────────────────────────────────────

  it('carries a trailing → on a forward action and none on a terminal one', () => {
    const forward = renderThemed(<AuthSubmitButtonV4 label="Continue" />, SEED_LIGHT);
    expect(glyph(forward.root, '→')).toHaveLength(1);
    // A terminal action ("Done") points nowhere, so it gets no glyph at all.
    const terminal = renderThemed(
      <AuthSubmitButtonV4 label="Done" trailingArrow={false} />,
      SEED_LIGHT
    );
    expect(glyph(terminal.root, '→')).toHaveLength(0);
  });

  it('takes a different trailing glyph without giving up the on/off rule', () => {
    const swapped = renderThemed(
      <AuthSubmitButtonV4 label="Next" trailingIcon="chevron-right" />,
      SEED_LIGHT
    );
    expect(glyph(swapped.root, '→')).toHaveLength(0);
    // `trailingArrow` still decides whether there is a glyph at all.
    const none = renderThemed(
      <AuthSubmitButtonV4 label="Next" trailingIcon="chevron-right" trailingArrow={false} />,
      SEED_LIGHT
    );
    expect(none.queryByText('Next')).not.toBeNull();
    expect(glyph(none.root, '→')).toHaveLength(0);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The loading state
  // ───────────────────────────────────────────────────────────────────────────

  it('swaps the trailing glyph for the spinner instead of widening the button', () => {
    const busy = renderThemed(<AuthSubmitButtonV4 label="Sign in" loading />, SEED_LIGHT);
    expect(ring(busy.root)).toHaveLength(1);
    // One slot, one indicator: the base put the spinner BEFORE the label, which
    // reflows the button the moment it starts working.
    expect(glyph(busy.root, '→')).toHaveLength(0);
    const pressable = busy.getByLabelText('Sign in');
    expect(pressable.props.accessibilityState.busy).toBe(true);
    expect(pressable.props.accessibilityState.disabled).toBe(true);
  });

  it('blocks the second press while busy', () => {
    const onPress = jest.fn();
    const busy = renderThemed(
      <AuthSubmitButtonV4 label="Sign in" loading onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(busy.getByLabelText('Sign in'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('stays at full strength while busy — 0.38 means unavailable, not working', () => {
    const busy = renderThemed(<AuthSubmitButtonV4 label="Sign in" loading />, SEED_LIGHT);
    expect(shell(busy.root).opacity).toBe(1);
    // Even when both flags are on: it is working, and a spinner at 38% is a
    // spinner nobody can see.
    const both = renderThemed(<AuthSubmitButtonV4 label="Sign in" loading disabled />, SEED_LIGHT);
    expect(shell(both.root).opacity).toBe(1);
  });

  it('announces the busy label, and falls back to the label', () => {
    const named = renderThemed(
      <AuthSubmitButtonV4 label="Sign in" busyLabel="Signing in…" loading />,
      SEED_LIGHT
    );
    expect(named.queryByText('Signing in…')).not.toBeNull();
    expect(named.getByLabelText('Signing in…')).toBeDefined();
    const bare = renderThemed(<AuthSubmitButtonV4 label="Sign in" loading />, SEED_LIGHT);
    expect(bare.queryByText('Sign in')).not.toBeNull();
    // The busy label is only for the busy state.
    const idle = renderThemed(
      <AuthSubmitButtonV4 label="Sign in" busyLabel="Signing in…" />,
      SEED_LIGHT
    );
    expect(idle.queryByText('Signing in…')).toBeNull();
  });

  it('draws the busy ring in the button’s own ink, not in `primary`', () => {
    const theme = compileTheme(SEED_LIGHT);
    const busy = renderThemed(<AuthSubmitButtonV4 label="Sign in" loading />, SEED_LIGHT);
    const track = flat(ring(busy.root)[0]!.props.style);
    const ink = gradientInk(theme.lightGradient.brand, theme.light.onPrimary, {
      darkest: theme.ramps.neutral[950],
      lightest: theme.ramps.neutral[50],
    }).ink;
    // `SpinnerV4`'s own track is a mix of `primary` into `surface` — invisible
    // on a `primary` fill. Same ratio, said in the button's ink.
    expect(track.borderTopColor).toBe(ink);
    expect(track.borderColor).not.toBe(theme.light.primary);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The fill — one gradient, and only for the brand tone
  // ───────────────────────────────────────────────────────────────────────────

  it('carries the brand gradient, the one place §35.11 allows one', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<AuthSubmitButtonV4 label="Sign in" />, SEED_LIGHT);
    const legible = gradientInk(theme.lightGradient.brand, theme.light.onPrimary, {
      darkest: theme.ramps.neutral[950],
      lightest: theme.ramps.neutral[50],
    });
    expect(stops(root)).toEqual([legible.from, legible.to]);
    // The near stop doubles as the opaque layer the shadow falls from.
    expect(shell(root).backgroundColor).toBe(legible.from);
  });

  it('labels against BOTH stops, not against one flat colour', () => {
    ([SEED_LIGHT, SEED_DARK, SEED_BOTH] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const { root, getByText } = renderThemed(
          <AuthSubmitButtonV4 label="Sign in" />,
          seed,
          scheme
        );
        const ink = flat(getByText('Sign in').props.style).color as string;
        (stops(root) ?? []).forEach((stop) => {
          expect(contrastRatio(ink, stop)).toBeGreaterThanOrEqual(4.5);
        });
      });
    });
  });

  it('keeps a semantic tone SOLID — a destructive CTA is not a promotion', () => {
    const theme = compileTheme(SEED_LIGHT);
    const danger = renderThemed(
      <AuthSubmitButtonV4 label="Delete account" tone="danger" />,
      SEED_LIGHT
    );
    expect(stops(danger.root)).toBeNull();
    expect(shell(danger.root).backgroundColor).toBe(theme.light.danger);
    expect(flat(danger.getByText('Delete account').props.style).color).toBe(theme.light.onDanger);

    const success = renderThemed(<AuthSubmitButtonV4 label="Confirm" tone="success" />, SEED_LIGHT);
    expect(stops(success.root)).toBeNull();
    expect(shell(success.root).backgroundColor).toBe(theme.light.success);
  });

  it('goes flat on a flat seed with no branch — the tokens are already inert', () => {
    const flatSeed: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };
    const { root } = renderThemed(<AuthSubmitButtonV4 label="Sign in" />, flatSeed);
    const pair = stops(root) ?? [];
    expect(pair[0]).toBe(pair[1]);
    expect(shell(root).shadowOpacity).toBe(0);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Depth and motion
  // ───────────────────────────────────────────────────────────────────────────

  it('lifts on `elevation.action` and sits back down when held', () => {
    const theme = compileTheme(SEED_LIGHT);
    const view = renderThemed(<AuthSubmitButtonV4 label="Sign in" />, SEED_LIGHT);
    expect(shell(view.root).shadowOpacity).toBe(theme.lightElevation.action.opacity);
    fireEvent(view.getByLabelText('Sign in'), 'pressIn');
    expect(shell(view.root).shadowOpacity).toBe(theme.lightElevation.action.opacity * 0.5);
    fireEvent(view.getByLabelText('Sign in'), 'pressOut');
    expect(shell(view.root).shadowOpacity).toBe(theme.lightElevation.action.opacity);
    // A press that depresses, not an opacity dip that reads as "disabled".
    expect(shell(view.root).opacity).toBe(1);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // §12 — the empty state
  // ───────────────────────────────────────────────────────────────────────────

  it('survives an empty label: the pill keeps its shape and gains no empty name', () => {
    const theme = compileTheme(SEED_LIGHT);
    const empty = renderThemed(<AuthSubmitButtonV4 label="" />, SEED_LIGHT);
    expect(target(empty.root).minHeight).toBe(theme.spacing['2xl'] + theme.spacing.sm);
    expect(target(empty.root).borderRadius).toBe(theme.radius.full);
    // No empty text node, and no empty accessible name — an empty name is worse
    // than none, because it hides the button from a screen reader.
    expect(empty.queryByText('')).toBeNull();
    const pressable = empty.root.findAll((n) => n.props?.accessibilityRole === 'button')[0];
    expect(pressable?.props.accessibilityLabel).toBeUndefined();
    // Whitespace is not a label either.
    const blank = renderThemed(<AuthSubmitButtonV4 label="   " />, SEED_LIGHT);
    expect(blank.queryByText('   ')).toBeNull();
  });

  it('survives an empty label while busy, and while terminal', () => {
    const theme = compileTheme(SEED_LIGHT);
    const busy = renderThemed(<AuthSubmitButtonV4 label="" loading />, SEED_LIGHT);
    expect(ring(busy.root)).toHaveLength(1);
    const bare = renderThemed(<AuthSubmitButtonV4 label="" trailingArrow={false} />, SEED_LIGHT);
    // Nothing inside at all — and still a 56 pill, not a collapsed sliver.
    expect(glyph(bare.root, '→')).toHaveLength(0);
    expect(target(bare.root).minHeight).toBe(theme.spacing['2xl'] + theme.spacing.sm);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The base contract
  // ───────────────────────────────────────────────────────────────────────────

  it('keeps the base’s props: label, press, and an overridable announced name', () => {
    const onPress = jest.fn();
    const view = renderThemed(
      <AuthSubmitButtonV4 label="Sign in" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(view.getByLabelText('Sign in'));
    expect(onPress).toHaveBeenCalledTimes(1);

    const named = renderThemed(
      <AuthSubmitButtonV4 label="Sign in" accessibilityLabel="Sign in to Xenition" />,
      SEED_LIGHT
    );
    expect(named.getByLabelText('Sign in to Xenition')).toBeDefined();
  });

  it('takes a style override without losing the shape it owns', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <AuthSubmitButtonV4 label="Sign in" style={{ marginTop: 12 }} />,
      SEED_LIGHT
    );
    expect(shell(root).marginTop).toBe(12);
    expect(target(root).minHeight).toBe(theme.spacing['2xl'] + theme.spacing.sm);
  });
});
