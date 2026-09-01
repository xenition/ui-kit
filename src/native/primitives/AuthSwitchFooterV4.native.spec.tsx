import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { minTap } from './internal/nav-v4';
import { pressFill } from './internal/state-v4';
import { AuthSwitchFooterV4 } from './AuthSwitchFooterV4';

function flatten(style: unknown): Record<string, unknown> {
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

/**
 * A `Pressable`'s state-dependent style lives on the **composite** node; the
 * host view below it carries only the already-resolved result. Reach for the
 * composite when the question is "what does it look like while pressed".
 */
function pressable(root: ReactTestInstance): ReactTestInstance {
  return root.findAll(
    (n) => n.props?.accessibilityRole === 'button' && typeof n.props?.style === 'function'
  )[0]!;
}

/** The pressable's style at a given press state. */
function pressableStyle(node: ReactTestInstance, pressed: boolean): Record<string, unknown> {
  const style = node.props.style as (s: { pressed: boolean }) => unknown;
  return flatten(style({ pressed }));
}

function labelStyle(node: ReactTestInstance): Record<string, unknown> {
  return flatten(node.props.style);
}

describe('AuthSwitchFooterV4 (native)', () => {
  it('draws one centred line: muted prompt, weighted action (§9)', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(
      <AuthSwitchFooterV4 prompt="Don't have an account?" label="Register" />,
      SEED_LIGHT
    );
    // The prompt takes the CORRECTED muted slot — `muted` is `neutral[600]`
    // and carries no contrast promise as text.
    expect(labelStyle(getByText("Don't have an account?")).color).toBe(theme.light.mutedText);
    expect(labelStyle(getByText('Register')).color).toBe(theme.light.primaryText);
    expect(labelStyle(getByText('Register')).fontWeight).toBe('600');
  });

  it('paints the action with the TEXT form of primary, so it clears AA on the page', () => {
    // `primary` is a FILL slot: the compiler promises `onPrimary` against it
    // and nothing about it against `surface`. `primaryText` is that hue walked
    // until it reads. A footer link is small type and cannot afford the guess.
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(<AuthSwitchFooterV4 label="Register" />, SEED_LIGHT);
    const ink = labelStyle(getByText('Register')).color as string;
    expect(ink).toBe(theme.light.primaryText);
    expect(contrastRatio(ink, theme.light.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it('tone="muted" steps down BOTH colour and weight so it cannot compete (§5)', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(
      <AuthSwitchFooterV4 tone="muted" label="No thanks" />,
      SEED_LIGHT
    );
    expect(labelStyle(getByText('No thanks')).color).toBe(theme.light.mutedText);
    expect(labelStyle(getByText('No thanks')).fontWeight).toBe('500');
  });

  it('makes the PRESSABLE the tap target, composed off the spacing scale', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<AuthSwitchFooterV4 label="Register" />, SEED_LIGHT);
    const style = pressableStyle(pressable(root), false);
    // 44, composed as `2xl - xs` — the same expression ButtonV4 and the V4 nav
    // line use, rather than the literal the base carried. The base put the
    // minimum on the ROW and left the pressable the size of the word.
    expect(style.minHeight).toBe(minTap(theme.spacing));
    expect(minTap(theme.spacing)).toBeGreaterThanOrEqual(44);
    expect(style.paddingHorizontal).toBe(theme.spacing.sm);
    expect(style.borderRadius).toBe(theme.radius.md);
  });

  it('answers a press by tinting the container, not by dimming the content', () => {
    const { root } = renderThemed(<AuthSwitchFooterV4 label="Register" />, SEED_LIGHT);
    const node = pressable(root);
    expect(pressableStyle(node, false).backgroundColor).toBe('transparent');
    // The base faded to `opacity: 0.6` — which is the signal 0.38 already
    // means (disabled). A state layer tints the ground and leaves ink alone.
    expect(pressableStyle(node, true).opacity).toBe(1);
    expect(pressableStyle(node, true).backgroundColor).not.toBe('transparent');
  });

  it('uses the M3 pressed layer flattened against the surface it owns', () => {
    const { root } = renderThemed(<AuthSwitchFooterV4 label="Register" />, SEED_LIGHT);
    const theme = compileTheme(SEED_LIGHT);
    // Opaque, not translucent: this label's contrast is measured against
    // `surface`, and a translucent layer would hand that promise to whatever
    // the caller happened to put behind the footer.
    const expected = pressFill({
      colors: theme.light,
      state: theme.state,
    } as Parameters<typeof pressFill>[0]);
    expect(pressableStyle(pressable(root), true).backgroundColor).toBe(expected);
  });

  it('reports the press and disables at M3 0.38, not a hand-picked 0.5', () => {
    const onPress = jest.fn();
    const { getByRole } = renderThemed(
      <AuthSwitchFooterV4 label="Register" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);

    const theme = compileTheme(SEED_LIGHT);
    const frozen = renderThemed(<AuthSwitchFooterV4 label="Register" disabled />, SEED_LIGHT);
    expect(frozen.getByRole('button').props.accessibilityState.disabled).toBe(true);
    const node = pressable(frozen.root);
    expect(pressableStyle(node, false).opacity).toBe(theme.state.disabledContent);
    expect(theme.state.disabledContent).toBeCloseTo(0.38, 2);
    // A disabled control must not also light up when touched.
    expect(pressableStyle(node, true).backgroundColor).toBe('transparent');
  });

  it('empty state: no prompt is fine — the action stands alone', () => {
    const { getByText, getAllByRole } = renderThemed(
      <AuthSwitchFooterV4 label="Register" />,
      SEED_LIGHT
    );
    expect(getByText('Register')).toBeTruthy();
    expect(getAllByRole('button')).toHaveLength(1);
  });

  it('empty state: no label, no line (§12)', () => {
    expect(renderThemed(<AuthSwitchFooterV4 label="" />, SEED_LIGHT).toJSON()).toBeNull();
    expect(
      renderThemed(<AuthSwitchFooterV4 prompt="New here?" label="" />, SEED_LIGHT).toJSON()
    ).toBeNull();
  });

  it('accepts a layout style override', () => {
    const { root } = renderThemed(
      <AuthSwitchFooterV4 label="Register" style={{ marginTop: 8 }} />,
      SEED_LIGHT
    );
    const rowStyle = root
      .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
      .map((n) => flatten(n.props.style))
      .find((s) => s.justifyContent === 'center');
    expect(rowStyle?.marginTop).toBe(8);
  });

  it('every colour it paints traces to a token (§10.1)', () => {
    const allowed = tokenHexSet(SEED_LIGHT);
    const { root } = renderThemed(
      <AuthSwitchFooterV4 prompt="Don't have an account?" label="Register" />,
      SEED_LIGHT
    );
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
