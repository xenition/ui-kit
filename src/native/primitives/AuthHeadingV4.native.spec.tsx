import * as React from 'react';
import { Text as RNText } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { AuthHeadingV4 } from './AuthHeadingV4';

const THEME = compileTheme(SEED_LIGHT);

/** Fraunces headings against Inter body — the seed that can tell the two apart. */
const BRANDED = compileTheme(SEED_DARK);

/** One style object, arrays flattened in order so later entries win. */
function flat(style: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(out, s as Record<string, unknown>);
  };
  walk(style);
  return out;
}

/** The block itself — the one box that carries the §4 gap. */
function block(root: ReactTestInstance): Record<string, unknown> {
  const hit = root.findAll((node) => {
    const style = flat((node.props as { style?: unknown } | undefined)?.style);
    return typeof style.gap === 'number';
  })[0];
  expect(hit).toBeDefined();
  return flat((hit.props as { style?: unknown }).style);
}

/** Every rendered `Text` host node, in document order. */
function texts(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAllByType(RNText);
}

describe('AuthHeadingV4 (native)', () => {
  it('renders NOTHING when there is neither a title nor a subtitle — §12', () => {
    // An opening block with no words in it must not leave a gap where two
    // lines would be: no column, no `spacing.sm`, nothing.
    expect(renderThemed(<AuthHeadingV4 />, SEED_LIGHT).toJSON()).toBeNull();
    expect(
      renderThemed(
        <AuthHeadingV4 align="center" size="3xl" measure={false} titleLines={2} />,
        SEED_LIGHT
      ).toJSON()
    ).toBeNull();
  });

  it('renders a title with no subtitle cleanly', () => {
    const { root, getByText } = renderThemed(<AuthHeadingV4 title="Welcome back" />, SEED_LIGHT);
    expect(getByText('Welcome back')).toBeTruthy();
    expect(texts(root)).toHaveLength(1);
  });

  it('renders a subtitle with no title cleanly', () => {
    const { root, getByText } = renderThemed(
      <AuthHeadingV4 subtitle="Sign in to continue" />,
      SEED_LIGHT
    );
    expect(getByText('Sign in to continue')).toBeTruthy();
    const only = texts(root);
    expect(only).toHaveLength(1);
    // The one line present is the subhead, not a headline wearing its colour.
    expect(only[0].props.accessibilityRole).toBeUndefined();
    expect(flat(only[0].props.style).color).toBe(THEME.light.mutedText);
  });

  it('sets §9’s headline: bold, announced as a header, at the step it is given', () => {
    const { getByText } = renderThemed(<AuthHeadingV4 title="Create your account" />, SEED_LIGHT);
    const title = getByText('Create your account');
    expect(title.props.accessibilityRole).toBe('header');
    const style = flat(title.props.style);
    expect(style.fontWeight).toBe('700');
    expect(style.fontSize).toBe(THEME.typography.scale.xl);

    // §9's auth screens pass `3xl`.
    const big = renderThemed(<AuthHeadingV4 title="Welcome" size="3xl" />, SEED_LIGHT);
    expect(flat(big.getByText('Welcome').props.style).fontSize).toBe(
      THEME.typography.scale['3xl']
    );
  });

  it('sets the headline in the seed’s HEADING face and the subhead in its body', () => {
    // The native `Text` binds no family of its own, so a seed that chose
    // Fraunces rendered its sign-in headline in San Francisco / Roboto.
    expect(BRANDED.typography.fontHeading).not.toBe(BRANDED.typography.fontBody);
    const { getByText } = renderThemed(
      <AuthHeadingV4 title="Welcome" subtitle="Sign in" />,
      SEED_DARK
    );
    expect(flat(getByText('Welcome').props.style).fontFamily).toBe(BRANDED.typography.fontHeading);
    expect(flat(getByText('Sign in').props.style).fontFamily).toBe(BRANDED.typography.fontBody);
  });

  it('sets the subhead in `mutedText`, not the decorative `muted` slot', () => {
    // `muted` carries no contrast promise against `surface`; `mutedText` is
    // the same quietness walked until it clears AA (§46), and a subhead is a
    // sentence the user is meant to read.
    const { getByText } = renderThemed(
      <AuthHeadingV4 title="Welcome" subtitle="Sign in to continue" />,
      SEED_LIGHT
    );
    const style = flat(getByText('Sign in to continue').props.style);
    // (On this seed the compiler happens to land `muted` and `mutedText` on
    // the same hex, so the claim that survives every seed is the slot itself:
    // the subhead reads from `mutedText`, which carries the AA promise.)
    expect(style.color).toBe(THEME.light.mutedText);
    expect(style.fontSize).toBe(THEME.typography.scale.base);
  });

  it('uses §4’s `sm` step between the two lines, not the base’s `xs`', () => {
    const { root } = renderThemed(<AuthHeadingV4 title="Welcome" subtitle="Sign in" />, SEED_LIGHT);
    expect(block(root).gap).toBe(THEME.spacing.sm);
    expect(block(root).gap).not.toBe(THEME.spacing.xs);
  });

  it('styles a string but passes any other node through exactly as given', () => {
    const { root, getByTestId, queryByText } = renderThemed(
      <AuthHeadingV4
        title={<RNText testID="custom-title">Welcome, Ada</RNText>}
        subtitle={<RNText testID="custom-sub">with a link</RNText>}
      />,
      SEED_LIGHT
    );
    // The caller's markup, untouched: no header role, no styled run.
    expect(getByTestId('custom-title').props.accessibilityRole).toBeUndefined();
    expect(getByTestId('custom-sub')).toBeTruthy();
    expect(queryByText('Welcome, Ada')).toBeTruthy();
    texts(root).forEach((node) => expect(flat(node.props.style).fontWeight).toBeUndefined());
  });

  it('mixes the two: a string title beside a node subtitle', () => {
    const { getByText, getByTestId } = renderThemed(
      <AuthHeadingV4 title="Welcome" subtitle={<RNText testID="custom-sub">now</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('Welcome').props.accessibilityRole).toBe('header');
    expect(getByTestId('custom-sub')).toBeTruthy();
  });

  it('left-aligns by default — §9 is explicit that auth opens left', () => {
    const { root, getByText } = renderThemed(
      <AuthHeadingV4 title="Welcome" subtitle="Sign in" />,
      SEED_LIGHT
    );
    const style = block(root);
    expect(style.alignItems).toBe('flex-start');
    expect(style.alignSelf).toBeUndefined();
    expect(flat(getByText('Welcome').props.style).textAlign).toBe('left');
    expect(flat(getByText('Sign in').props.style).textAlign).toBe('left');
  });

  it('centres the block as well as the text when asked', () => {
    const { root, getByText } = renderThemed(
      <AuthHeadingV4 title="Welcome" subtitle="Sign in" align="center" />,
      SEED_LIGHT
    );
    const style = block(root);
    expect(style.alignItems).toBe('center');
    // A capped block that is meant to be centred has to be centred as a block,
    // not only as text — otherwise it sits left inside its own column.
    expect(style.alignSelf).toBe('center');
    expect(flat(getByText('Welcome').props.style).textAlign).toBe('center');
    expect(flat(getByText('Sign in').props.style).textAlign).toBe('center');
  });

  it('caps at §4’s comfortable measure, composed from the spacing scale', () => {
    // `2xl × 10` is 480 at the default scale — ~60 characters at the base
    // step, inside the 45–75 band, and it re-scales with a re-scaled seed.
    expect(THEME.spacing['2xl'] * 10).toBe(480);
    const { root } = renderThemed(<AuthHeadingV4 title="Welcome" subtitle="Sign in" />, SEED_LIGHT);
    expect(block(root).maxWidth).toBe(480);
  });

  it('drops the measure — and the block centring with it — on measure={false}', () => {
    const { root, getByText } = renderThemed(
      <AuthHeadingV4 title="Welcome" align="center" measure={false} />,
      SEED_LIGHT
    );
    const style = block(root);
    expect(style.maxWidth).toBeUndefined();
    // No cap, no column to centre inside; the text is still centred.
    expect(style.alignSelf).toBeUndefined();
    expect(style.alignItems).toBe('center');
    expect(flat(getByText('Welcome').props.style).textAlign).toBe('center');
  });

  it('never clamps unasked — §4’s line caps are a brief, not a truncation', () => {
    const { root } = renderThemed(
      <AuthHeadingV4 title="A headline long enough to wrap" subtitle="And a subhead" />,
      SEED_LIGHT
    );
    texts(root).forEach((node) => expect(node.props.numberOfLines).toBeUndefined());
  });

  it('clamps each line independently when the caller does ask', () => {
    const { getByText } = renderThemed(
      <AuthHeadingV4 title="Headline" subtitle="Subhead" titleLines={2} subtitleLines={3} />,
      SEED_LIGHT
    );
    expect(getByText('Headline').props.numberOfLines).toBe(2);
    expect(getByText('Subhead').props.numberOfLines).toBe(3);

    // Asking for one does not silently clamp the other.
    const one = renderThemed(
      <AuthHeadingV4 title="Headline" subtitle="Subhead" titleLines={2} />,
      SEED_LIGHT
    );
    expect(one.getByText('Headline').props.numberOfLines).toBe(2);
    expect(one.getByText('Subhead').props.numberOfLines).toBeUndefined();
  });

  it('takes a style for layout without losing its own', () => {
    const { root } = renderThemed(
      <AuthHeadingV4 title="Welcome" style={{ marginBottom: 24 }} />,
      SEED_LIGHT
    );
    const style = block(root);
    expect(style.marginBottom).toBe(24);
    expect(style.gap).toBe(THEME.spacing.sm);
    expect(style.maxWidth).toBe(480);
  });

  it('paints only from the theme — every colour traces to a token', () => {
    const { root } = renderThemed(
      <AuthHeadingV4 title="Welcome" subtitle="Sign in" size="3xl" align="center" />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
