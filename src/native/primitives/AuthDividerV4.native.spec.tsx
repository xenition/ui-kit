import * as React from 'react';
import { Text as RNText } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { AuthDividerV4 } from './AuthDividerV4';

const THEME = compileTheme(SEED_LIGHT);

/** Every style object in the tree, flattened one level out of arrays. */
function styles(root: ReactTestInstance): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') out.push(style as Record<string, unknown>);
  };
  // Host nodes only: a composite and the host it renders carry the *same*
  // style object, and counting both would double every hairline.
  root.findAll((n) => typeof n.type === 'string').forEach((node) => walk(node.props?.style));
  return out;
}

/** The hairline segments: 1 unit of `border`, stretching on a flex factor. */
function rules(root: ReactTestInstance): Record<string, unknown>[] {
  return styles(root).filter(
    (s) => s.height === 1 && s.backgroundColor === THEME.light.border && s.flex === 1
  );
}

describe('AuthDividerV4 (native)', () => {
  it('centres the label on the rule — a segment either side, not a knockout patch', () => {
    const { root, getByText } = renderThemed(
      <AuthDividerV4 label="or continue with" />,
      SEED_LIGHT
    );
    expect(getByText('or continue with')).toBeTruthy();
    // Two segments means the line is drawn *around* the label, so the divider
    // does not depend on sitting on `surface` to look right (§1 allows a
    // tinted ground).
    expect(rules(root)).toHaveLength(2);
  });

  it('draws a genuine hairline from the border token, never a heavy rule', () => {
    const { root } = renderThemed(<AuthDividerV4 label="or continue with" />, SEED_LIGHT);
    const [rule] = rules(root);
    expect(rule.height).toBe(1);
    expect(rule.backgroundColor).toBe(THEME.light.border);
  });

  it('composes the V4 text child (§10.5), muted and one step off the caption floor', () => {
    const { root, getByText } = renderThemed(<AuthDividerV4 label="or continue" />, SEED_LIGHT);
    const label = getByText('or continue');
    const flat = [label.props.style].flat(3).filter(Boolean) as Record<string, unknown>[];
    const color = flat.find((s) => s.color !== undefined)?.color;
    const fontSize = flat.find((s) => s.fontSize !== undefined)?.fontSize;
    expect(color).toBe(THEME.light.muted);
    expect(fontSize).toBe(THEME.typography.scale.sm);
    // Sanity: the label really is a Text node in the tree.
    expect(root.findAllByType(RNText).length).toBeGreaterThan(0);
  });

  it('EMPTY STATE — with no label it is one unbroken hairline, not two stubs', () => {
    const { root } = renderThemed(<AuthDividerV4 />, SEED_LIGHT);
    expect(rules(root)).toHaveLength(1);
    expect(root.findAllByType(RNText)).toHaveLength(0);
  });

  it('align moves the label to an end and drops the rule on that side', () => {
    const start = renderThemed(<AuthDividerV4 label="or" align="start" />, SEED_LIGHT);
    expect(rules(start.root)).toHaveLength(1);
    const end = renderThemed(<AuthDividerV4 label="or" align="end" />, SEED_LIGHT);
    expect(rules(end.root)).toHaveLength(1);
  });

  it('EMPTY STATE — §9: providers={[]} renders nothing at all, not an empty divider', () => {
    const providers: string[] = [];
    const { toJSON } = renderThemed(
      <AuthDividerV4 label="or continue with">
        {providers.map((p) => (
          <RNText key={p}>{p}</RNText>
        ))}
      </AuthDividerV4>,
      SEED_LIGHT
    );
    expect(toJSON()).toBeNull();
  });

  it('EMPTY STATE — a falsy or blank slot is just as empty as []', () => {
    expect(
      renderThemed(<AuthDividerV4 label="or">{null}</AuthDividerV4>, SEED_LIGHT).toJSON()
    ).toBeNull();
    expect(
      renderThemed(<AuthDividerV4 label="or">{false}</AuthDividerV4>, SEED_LIGHT).toJSON()
    ).toBeNull();
    expect(
      renderThemed(<AuthDividerV4 label="or">{[null, false, []]}</AuthDividerV4>, SEED_LIGHT).toJSON()
    ).toBeNull();
    expect(
      renderThemed(<AuthDividerV4 label="or">{<></>}</AuthDividerV4>, SEED_LIGHT).toJSON()
    ).toBeNull();
  });

  it('draws the rule AND the row when the slot has something in it', () => {
    const { root, getByText } = renderThemed(
      <AuthDividerV4 label="or continue with">
        <RNText>Continue with Google</RNText>
      </AuthDividerV4>,
      SEED_LIGHT
    );
    expect(rules(root)).toHaveLength(2);
    expect(getByText('Continue with Google')).toBeTruthy();
  });

  it('omitting the slot keeps the base behaviour — the divider always draws', () => {
    const { root, toJSON } = renderThemed(<AuthDividerV4 label="or continue with" />, SEED_LIGHT);
    expect(toJSON()).not.toBeNull();
    expect(rules(root)).toHaveLength(2);
  });

  it('spaces itself from the scale and accepts a style override', () => {
    const { root } = renderThemed(
      <AuthDividerV4 label="or" style={{ marginTop: 12 }}>
        <RNText>Google</RNText>
      </AuthDividerV4>,
      SEED_LIGHT
    );
    const all = styles(root);
    expect(all.some((s) => s.gap === THEME.spacing.md)).toBe(true);
    expect(all.some((s) => s.gap === THEME.spacing.sm)).toBe(true);
    expect(all.some((s) => s.marginTop === 12)).toBe(true);
  });

  it('every colour it paints traces to a token — no literal hex', () => {
    const { root } = renderThemed(
      <AuthDividerV4 label="or continue with">
        <RNText>Google</RNText>
      </AuthDividerV4>,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
