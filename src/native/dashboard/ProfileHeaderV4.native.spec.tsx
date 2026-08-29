import * as React from 'react';
import { Text as RNText } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { stateMix } from '../../primitives/internal/v4-state';
import { ProfileHeaderV4 } from './ProfileHeaderV4';

const THEME = compileTheme(SEED_LIGHT);
/** Fraunces headings against Inter body — the seed that can tell the faces apart. */
const BRANDED = compileTheme(SEED_DARK);

/** The state-layer opacities the compiled theme carries, for the press fill. */
const STATE = toNativeTokens(THEME).state;

/** `AvatarV4`'s `xl` diameter, composed from the spacing scale (72 at stock). */
const AVATAR_XL = THEME.spacing['2xl'] + THEME.spacing.lg;

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

/** The outer block — the one box carrying §5's `spacing.lg` vertical padding. */
function block(root: ReactTestInstance): Record<string, unknown> {
  const hit = root.findAll((node) => {
    const style = flat((node.props as { style?: unknown } | undefined)?.style);
    return style.paddingVertical === THEME.spacing.lg;
  })[0];
  expect(hit).toBeDefined();
  return flat((hit.props as { style?: unknown }).style);
}

/** Every rendered `Text` host node, in document order. */
function texts(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAllByType(RNText);
}

/**
 * One line of the block, found by the words in it.
 *
 * Not `texts(root)[0]`: `AvatarV4`'s monogram fallback is a `Text` too, and it
 * comes first in document order, so an index would read the initials inside
 * the disc instead of the name beside it.
 */
function line(root: ReactTestInstance, text: string): ReactTestInstance {
  const hit = texts(root).filter((t) => t.props.children === text)[0];
  expect(hit).toBeDefined();
  return hit;
}

/** The `Pressable` around the identity, if there is one. */
function pressable(root: ReactTestInstance): ReactTestInstance | undefined {
  return root.findAll(
    (node) => node.props?.accessibilityRole === 'button' && typeof node.props?.style === 'function'
  )[0];
}

/** The identity region's style at a given press state. */
function pressStyle(root: ReactTestInstance, pressed: boolean): Record<string, unknown> {
  const hit = pressable(root);
  expect(hit).toBeDefined();
  const fn = hit?.props.style as (s: { pressed: boolean }) => unknown;
  return flat(fn({ pressed }));
}

/** Anything drawn at the `xl` avatar diameter. */
function faces(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll((node) => {
    const style = flat((node.props as { style?: unknown } | undefined)?.style);
    return style.width === AVATAR_XL && style.height === AVATAR_XL;
  });
}

describe('ProfileHeaderV4 (native)', () => {
  // ── the identity (§5, §3) ──────────────────────────────────────────

  it('composes `AvatarV4` at `xl` — a real avatar, not a row’s leading slot', () => {
    // `xl` is `2xl + lg` off the spacing scale (72 at the stock scale), so a
    // re-scaled seed re-scales the face. The base used `lg`.
    expect(AVATAR_XL).toBe(72);
    const { root } = renderThemed(<ProfileHeaderV4 name="Ada Lovelace" />, SEED_LIGHT);
    expect(faces(root).length).toBeGreaterThan(0);
  });

  it('sets the name at `2xl` bold `onSurface` in the seed’s heading face', () => {
    const { root } = renderThemed(<ProfileHeaderV4 name="Ada Lovelace" />, SEED_DARK);
    const style = flat(line(root, 'Ada Lovelace').props.style);
    expect(style.fontSize).toBe(BRANDED.typography.scale['2xl']);
    // The base set it at `xl`; §5 asks for the confident step.
    expect(style.fontSize).not.toBe(BRANDED.typography.scale.xl);
    expect(style.fontWeight).toBe('700');
    expect(style.color).toBe(BRANDED.dark.onSurface);
    // The base set no `fontFamily` at all, so a display seed lost its face.
    expect(style.fontFamily).toBe(BRANDED.typography.fontHeading);
  });

  it('sets the subtitle at `base` in `mutedText`, never the decorative `muted` FILL', () => {
    // `muted` carries no contrast promise against `surface`; a handle is a line
    // the user is meant to read. The base used `sm` + `colors.muted`.
    const { root } = renderThemed(
      <ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" />,
      SEED_DARK
    );
    const style = flat(line(root, '@ada').props.style);
    expect(style.fontSize).toBe(BRANDED.typography.scale.base);
    expect(style.fontSize).not.toBe(BRANDED.typography.scale.sm);
    expect(style.color).toBe(BRANDED.dark.mutedText);
    expect(style.fontFamily).toBe(BRANDED.typography.fontBody);
  });

  it('forwards `status` to the avatar, named for a screen reader', () => {
    const { getByLabelText } = renderThemed(
      <ProfileHeaderV4 name="Ada Lovelace" status="online" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Online')).toBeTruthy();
  });

  it('takes a caller’s own mark in place of the avatar', () => {
    const { root, getByText } = renderThemed(
      <ProfileHeaderV4 name="Acme Inc" avatar={<RNText>ACME</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('ACME')).toBeTruthy();
    expect(faces(root)).toHaveLength(0);
  });

  // ── rhythm (§4.1) ──────────────────────────────────────────────────

  it('gives the block `spacing.lg` vertically and `spacing.md` beside the avatar', () => {
    // §5: this block tops the account screen and should feel generous, not
    // like a row. The base had no vertical padding at all.
    const { root } = renderThemed(
      <ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" />,
      SEED_LIGHT
    );
    const style = block(root);
    expect(style.paddingVertical).toBe(THEME.spacing.lg);
    expect(style.gap).toBe(THEME.spacing.md);
    expect(style.alignItems).toBe('center');
  });

  it('sets `spacing.xs` between the name and its supporting line — not the base’s `gap: 2`', () => {
    const { root } = renderThemed(
      <ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" />,
      SEED_LIGHT
    );
    const lines = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.gap === THEME.spacing.xs;
    });
    expect(lines.length).toBeGreaterThan(0);
    // The literal the brief names as a violation.
    const twos = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.gap === 2;
    });
    expect(twos).toHaveLength(0);
  });

  // ── the border default (§4.4) ──────────────────────────────────────

  it('draws NO hairline by default — §4.4’s rule, stated', () => {
    const { root } = renderThemed(
      <ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" />,
      SEED_LIGHT
    );
    expect(block(root).borderBottomWidth).toBeUndefined();
  });

  it('puts a hairline in, verbatim, on `divided`', () => {
    const { root } = renderThemed(<ProfileHeaderV4 name="Ada Lovelace" divided />, SEED_LIGHT);
    const style = block(root);
    expect(style.borderBottomWidth).toBe(1);
    expect(style.borderBottomColor).toBe(THEME.light.border);
  });

  it('carries no card — no ground, no radius, no elevation (§4.6)', () => {
    const { root } = renderThemed(<ProfileHeaderV4 name="Ada Lovelace" />, SEED_LIGHT);
    const style = block(root);
    expect(style.backgroundColor).toBeUndefined();
    expect(style.borderRadius).toBeUndefined();
    expect(style.shadowOpacity).toBeUndefined();
    expect(style.elevation).toBeUndefined();
  });

  // ── press (§4.3) ───────────────────────────────────────────────────

  it('is inert with no `onPress` — no pressable, no state layer', () => {
    const { root } = renderThemed(
      <ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" />,
      SEED_LIGHT
    );
    expect(pressable(root)).toBeUndefined();
  });

  it('lights the identity with the OPAQUE state layer, never a dimmed opacity', () => {
    const { root } = renderThemed(
      <ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" onPress={() => {}} />,
      SEED_LIGHT
    );
    const idle = pressStyle(root, false);
    const down = pressStyle(root, true);
    expect(idle.backgroundColor).toBe('transparent');
    // §4.3: the opaque flavour, because the name carries a contrast promise
    // against the fill it is drawn on.
    expect(down.backgroundColor).toBe(
      stateMix(THEME.light.surface, THEME.light.onSurface, 'pressed', STATE)
    );
    // The literal the brief names as a violation, in both states.
    expect(idle.opacity).toBeUndefined();
    expect(down.opacity).toBeUndefined();
  });

  it('gives the layer room without moving the block — pad out, margin back', () => {
    const { root } = renderThemed(
      <ProfileHeaderV4 name="Ada Lovelace" onPress={() => {}} />,
      SEED_LIGHT
    );
    const style = pressStyle(root, false);
    expect(style.padding).toBe(THEME.spacing.sm);
    expect(style.margin).toBe(-THEME.spacing.sm);
    expect(style.borderRadius).toBe(THEME.radius.lg);
  });

  it('fires `onPress` for the whole identity', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Ada Lovelace'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('keeps `actions` OUTSIDE the pressable, so no pressable nests in another', () => {
    const onPress = jest.fn();
    const { root, getByText } = renderThemed(
      <ProfileHeaderV4
        name="Ada Lovelace"
        onPress={onPress}
        actions={<RNText>Edit</RNText>}
      />,
      SEED_LIGHT
    );
    expect(getByText('Edit')).toBeTruthy();
    const inside = pressable(root)?.findAllByType(RNText) ?? [];
    expect(inside.some((t) => t.props.children === 'Edit')).toBe(false);
  });

  // ── empty states (§4.5) ────────────────────────────────────────────

  it('renders NOTHING with no name, no subtitle, no avatar and no actions', () => {
    expect(renderThemed(<ProfileHeaderV4 />, SEED_LIGHT).toJSON()).toBeNull();
    expect(
      renderThemed(<ProfileHeaderV4 name="" subtitle="" avatarUrl="" divided />, SEED_LIGHT).toJSON()
    ).toBeNull();
  });

  it('still renders when it has only actions — and draws no empty identity beside them', () => {
    const { root, getByText } = renderThemed(
      <ProfileHeaderV4 actions={<RNText>Edit</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('Edit')).toBeTruthy();
    expect(faces(root)).toHaveLength(0);
    expect(texts(root)).toHaveLength(1);
  });

  it('renders a face for someone whose name has not loaded yet', () => {
    const { root } = renderThemed(
      <ProfileHeaderV4 avatarUrl="https://example.test/a.png" />,
      SEED_LIGHT
    );
    expect(faces(root).length).toBeGreaterThan(0);
    expect(texts(root)).toHaveLength(0);
  });

  it('renders a name with no subtitle, and a subtitle with no name', () => {
    const named = renderThemed(<ProfileHeaderV4 name="Ada Lovelace" />, SEED_LIGHT);
    // The name, plus whatever the monogram fallback draws inside the avatar.
    expect(named.getByText('Ada Lovelace')).toBeTruthy();

    const sub = renderThemed(<ProfileHeaderV4 subtitle="Signed out" />, SEED_LIGHT);
    expect(sub.getByText('Signed out')).toBeTruthy();
    expect(flat(line(sub.root, 'Signed out').props.style).color).toBe(THEME.light.mutedText);
  });

  // ── clamping ───────────────────────────────────────────────────────

  it('clamps both lines to one by default, as the base truncated', () => {
    const { root } = renderThemed(
      <ProfileHeaderV4 name="A very long display name" subtitle="@handle" />,
      SEED_LIGHT
    );
    expect(line(root, 'A very long display name').props.numberOfLines).toBe(1);
    expect(line(root, '@handle').props.numberOfLines).toBe(1);
  });

  it('lets a caller open either line up, independently', () => {
    const { root } = renderThemed(
      <ProfileHeaderV4 name="A very long display name" subtitle="@handle" nameLines={2} />,
      SEED_LIGHT
    );
    expect(line(root, 'A very long display name').props.numberOfLines).toBe(2);
    // Asking for one does not silently open the other.
    expect(line(root, '@handle').props.numberOfLines).toBe(1);
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('takes a style for layout and keeps the block’s own rhythm underneath', () => {
    const { root } = renderThemed(
      <ProfileHeaderV4 name="Ada Lovelace" style={{ marginTop: 12 }} testID="account-header" />,
      SEED_LIGHT
    );
    const hit = root.findAll((node) => node.props?.testID === 'account-header')[0];
    expect(hit).toBeDefined();
    const style = flat(hit?.props.style);
    expect(style.marginTop).toBe(12);
    expect(style.paddingVertical).toBe(THEME.spacing.lg);
    expect(hit?.props.accessibilityRole).toBe('header');
  });

  it('paints nothing with a literal — every colour traces to a compiled token', () => {
    // A caller's own mark stands in for `AvatarV4` here: the V4 avatar derives
    // its monogram ground from the compiled ramps, which is theme arithmetic
    // rather than a literal, and `AvatarV4`'s own spec is where that is
    // asserted.
    const { root } = renderThemed(
      <ProfileHeaderV4
        name="Ada Lovelace"
        subtitle="@ada"
        divided
        avatar={<RNText>AL</RNText>}
        actions={<RNText>Edit</RNText>}
      />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
