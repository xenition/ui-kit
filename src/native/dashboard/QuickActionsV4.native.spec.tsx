import * as React from 'react';
import { Pressable, Text as RNText, View } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  SEED_BOTH,
  renderThemed,
  tokenHexSet,
} from '../spec-support/render-native';
import { flatStyle, type FlatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { V4_STATE } from '../../primitives/internal/v4-state';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { QuickActionsV4, type QuickActionV4 } from './QuickActionsV4';

const THEME = compileTheme(SEED_LIGHT);

const ACTIONS: QuickActionV4[] = [
  { key: 'send', label: 'Send', iconName: 'send' },
  { key: 'scan', label: 'Scan', icon: '📷' },
  { key: 'top-up', label: 'Top up', iconName: 'add', tone: 'success' },
];

/** The tile `Pressable`s themselves, in source order. */
function tiles(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAllByType(Pressable);
}

/** One tile's style at rest, or under a press. */
function tileStyle(tile: ReactTestInstance, pressed = false): FlatStyle {
  return flatStyle((tile.props.style as (s: { pressed: boolean }) => unknown)({ pressed }));
}

/**
 * Every HOST node's flattened style, so a container can be found by what it
 * does. Host-only because `View` is a forwardRef over a host `View` and every
 * box would otherwise be counted twice.
 */
function styles(root: ReactTestInstance): FlatStyle[] {
  return root
    .findAll((node) => typeof node.type === 'string')
    .map((node) => flatStyle(node.props?.style));
}

/** Every string a tile actually renders — glyphs included. */
function marks(tile: ReactTestInstance): string[] {
  return tile
    .findAll((node) => typeof node.type === 'string' && node.type === 'Text')
    .flatMap((node) => node.children)
    .filter((child): child is string => typeof child === 'string');
}

/**
 * The badge inside a tile: §4.7's circle is the one box in the subtree that is
 * square, carries a fill and is drawn as a circle from its own diameter.
 */
function badge(tile: ReactTestInstance): FlatStyle | undefined {
  return tile
    .findAllByType(View)
    .map((node) => flatStyle(node.props.style))
    .find(
      (s) =>
        typeof s.width === 'number' &&
        s.width === s.height &&
        s.backgroundColor !== undefined
    );
}

describe('QuickActionsV4 (native)', () => {
  // ---------------------------------------------------------------- props --

  it('renders one tile per action, labelled and in source order', () => {
    const { root, getByText } = renderThemed(<QuickActionsV4 actions={ACTIONS} />, SEED_LIGHT);
    expect(tiles(root).map((t) => t.props.accessibilityLabel)).toEqual([
      'Send',
      'Scan',
      'Top up',
    ]);
    expect(getByText('Send')).toBeTruthy();
    expect(getByText('Top up')).toBeTruthy();
  });

  it('renders the optional title, typed from the scale', () => {
    const { getByText } = renderThemed(
      <QuickActionsV4 actions={ACTIONS} title="Shortcuts" />,
      SEED_LIGHT
    );
    const heading = flatStyle(getByText('Shortcuts').props.style);
    expect(heading.fontSize).toBe(THEME.typography.scale.lg);
    expect(heading.fontWeight).toBe('700');
    expect(heading.color).toBe(THEME.light.onSurface);

    const untitled = renderThemed(<QuickActionsV4 actions={ACTIONS} />, SEED_LIGHT);
    expect(untitled.queryByText('Shortcuts')).toBeNull();
  });

  it('fires onPress, and a disabled tile is inert and announced as such', () => {
    const seen: string[] = [];
    const { root, getByText } = renderThemed(
      <QuickActionsV4
        actions={[
          { key: 'a', label: 'Live', onPress: () => seen.push('a') },
          { key: 'b', label: 'Dead', onPress: () => seen.push('b'), disabled: true },
        ]}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Live'));
    fireEvent.press(getByText('Dead'));
    expect(seen).toEqual(['a']);
    expect((tiles(root)[1] as ReactTestInstance).props.disabled).toBe(true);
    expect(
      ((tiles(root)[1] as ReactTestInstance).props.accessibilityState as { disabled: boolean })
        .disabled
    ).toBe(true);
  });

  it('routes the grid through GridV4 — columns default 3, gutter spacing.md', () => {
    const { root } = renderThemed(<QuickActionsV4 actions={ACTIONS} />, SEED_LIGHT);
    // GridV4 splits its gutter: half cancelled on the container, half on each
    // cell. §4.1's grid gutter is `md` (16) — the base packed these at `sm`.
    const cells = styles(root).filter((s) => s.width === `${100 / 3}%`);
    expect(cells).toHaveLength(3);
    cells.forEach((cell) => {
      expect(cell.paddingHorizontal).toBe(THEME.spacing.md / 2);
      expect(cell.paddingVertical).toBe(THEME.spacing.md / 2);
    });
  });

  it('columns is still the caller’s, and minItemWidth is accepted for parity', () => {
    const two = renderThemed(<QuickActionsV4 actions={ACTIONS} columns={2} />, SEED_LIGHT);
    expect(styles(two.root).filter((s) => s.width === '50%')).toHaveLength(3);
    // Native has no CSS grid, so `minItemWidth` degrades to `columns` — the
    // divergence GridV4 documents. It must not throw or leak onto a View.
    const fluid = renderThemed(
      <QuickActionsV4 actions={ACTIONS} columns={2} minItemWidth={160} />,
      SEED_LIGHT
    );
    expect(styles(fluid.root).filter((s) => s.width === '50%')).toHaveLength(3);
  });

  // ------------------------------------------------------- the warm tile --

  it('§4.2 — the tile is the CARD ground, not the page ground the base painted', () => {
    const { root } = renderThemed(<QuickActionsV4 actions={ACTIONS} />, SEED_LIGHT);
    tiles(root).forEach((tile) => {
      expect(tileStyle(tile).backgroundColor).toBe(THEME.light.card);
      expect(tileStyle(tile).backgroundColor).not.toBe(THEME.light.surface);
    });
  });

  it('§4.2 — radius.lg, no border, and the seed’s elevation.card', () => {
    const { root } = renderThemed(<QuickActionsV4 actions={ACTIONS} />, SEED_LIGHT);
    const tile = tileStyle(tiles(root)[0] as ReactTestInstance);
    expect(tile.borderRadius).toBe(THEME.radius.lg);
    // Never a heavy border AND a shadow — the house look is one or the other.
    expect(tile.borderWidth).toBeUndefined();
    expect(tile.shadowColor).toBe(THEME.lightElevation.card.color);
    expect(tile.shadowOpacity).toBe(THEME.lightElevation.card.opacity);
    expect(tile.shadowRadius).toBe(THEME.lightElevation.card.radius);
    expect(tile.elevation).toBe(THEME.lightElevation.card.android);
  });

  it('a flat seed zeroes the shadow with no branch in the component', () => {
    const flatSeed = { ...SEED_LIGHT, depth: 'flat' as const };
    const flat = compileTheme(flatSeed);
    const { root } = renderThemed(<QuickActionsV4 actions={ACTIONS} />, flatSeed);
    expect(tileStyle(tiles(root)[0] as ReactTestInstance).shadowOpacity).toBe(
      flat.lightElevation.card.opacity
    );
    expect(flat.lightElevation.card.opacity).toBe(0);
  });

  it('§4.7 — the glyph moves into a tinted circular badge, primary by default', () => {
    const { root } = renderThemed(<QuickActionsV4 actions={ACTIONS} />, SEED_LIGHT);
    const mark = badge(tiles(root)[0] as ReactTestInstance);
    expect(mark?.width).toBe(44);
    expect(mark?.height).toBe(44);
    // A circle drawn from its own diameter — `radius.full` compiles to 0 on a
    // sharp seed, and §4.7's badge is a circle in every brand.
    expect(mark?.borderRadius).toBe(22);
    expect(mark?.backgroundColor).toBe(
      mixToken(THEME.light.surface, THEME.light.primary, 0.14)
    );
    // The named glyph is resolved through the kit's icon set.
    expect(marks(tiles(root)[0] as ReactTestInstance)).toContain(resolveIconGlyph('send'));
    // A string `icon` is a glyph, so it is badged too.
    expect(badge(tiles(root)[1] as ReactTestInstance)?.width).toBe(44);
    expect(marks(tiles(root)[1] as ReactTestInstance)).toContain('📷');
  });

  it('§4.7 — tone picks the semantic family the badge tints from', () => {
    const { root } = renderThemed(<QuickActionsV4 actions={ACTIONS} />, SEED_LIGHT);
    expect(badge(tiles(root)[2] as ReactTestInstance)?.backgroundColor).toBe(
      mixToken(THEME.light.surface, THEME.light.success, 0.14)
    );
  });

  it('an arbitrary React node icon still renders, unbadged', () => {
    const { root, getByText } = renderThemed(
      <QuickActionsV4
        actions={[{ key: 'x', label: 'Custom', icon: <RNText>node</RNText> }]}
      />,
      SEED_LIGHT
    );
    expect(getByText('node')).toBeTruthy();
    expect(badge(tiles(root)[0] as ReactTestInstance)).toBeUndefined();
  });

  // ------------------------------------------------------------ the floor --

  it('every tile clears the 44 tap floor, composed from the scale and never typed', () => {
    const { root } = renderThemed(<QuickActionsV4 actions={ACTIONS} />, SEED_LIGHT);
    const floor = THEME.spacing['2xl'] - THEME.spacing.xs;
    expect(floor).toBe(44);
    tiles(root).forEach((tile) => {
      expect(tileStyle(tile).minHeight).toBe(floor);
      expect(tileStyle(tile).padding).toBe(THEME.spacing.md);
      expect(tileStyle(tile).gap).toBe(THEME.spacing.sm);
    });
  });

  // -------------------------------------------------- state, not opacity --

  it('press is the STATE LAYER over the tile’s own fill — never an opacity dim', () => {
    const { root } = renderThemed(<QuickActionsV4 actions={ACTIONS} />, SEED_LIGHT);
    const tile = tiles(root)[0] as ReactTestInstance;
    expect(tileStyle(tile, true).backgroundColor).toBe(
      mixToken(THEME.light.card, THEME.light.onCard, V4_STATE.pressed)
    );
    // The base carried `opacity: pressed ? 0.8 : 1`, which fades the tile's
    // CONTENT — the signal M3 spends 0.38 on to mean disabled.
    expect(tileStyle(tile, true).opacity).toBe(1);
    expect(tileStyle(tile, false).opacity).toBe(1);
  });

  it('the layer is re-derived per scheme, not a fixed neutral', () => {
    const both = compileTheme(SEED_BOTH);
    const pressedIn = (scheme: 'light' | 'dark'): unknown => {
      const { root } = renderThemed(
        <QuickActionsV4 actions={ACTIONS} />,
        SEED_BOTH,
        scheme
      );
      return tileStyle(tiles(root)[0] as ReactTestInstance, true).backgroundColor;
    };
    expect(pressedIn('light')).toBe(
      mixToken(both.light.card, both.light.onCard, V4_STATE.pressed)
    );
    expect(pressedIn('dark')).toBe(mixToken(both.dark.card, both.dark.onCard, V4_STATE.pressed));
    // The wrong reach: ramps.neutral[50] is a near-white in BOTH schemes.
    expect(pressedIn('dark')).not.toBe(both.ramps.neutral[50]);
  });

  it('disabled is M3’s 0.38 content opacity, not the base’s round-number 0.5', () => {
    const { root } = renderThemed(
      <QuickActionsV4 actions={[{ key: 'a', label: 'A', disabled: true }]} />,
      SEED_LIGHT
    );
    const tile = tileStyle(tiles(root)[0] as ReactTestInstance);
    expect(tile.opacity).toBe(V4_STATE.disabledContent);
    expect(tile.opacity).not.toBe(0.5);
  });

  // ------------------------------------------------------------- purity --

  it('§1.1 — every colour it paints traces to a token, and no size is typed', () => {
    const { root } = renderThemed(
      <QuickActionsV4 actions={ACTIONS} title="Shortcuts" />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    // Everything this component paints itself: the tiles (at rest and pressed)
    // and the containers around them. The badge's ground and ink are
    // composited by `IconV4` from two token colours and re-measured with
    // `ensureContrast` — that is its own contract, asserted in its own spec.
    const painted: unknown[] = [
      ...tiles(root).flatMap((t) => [tileStyle(t), tileStyle(t, true)]),
      // Every box this component itself draws. `IconV4`'s badge (the 44 square)
      // and its glyph are excluded: their ground is composited from two token
      // colours and their ink is re-measured with `ensureContrast`, which is
      // that primitive's own contract and is asserted in its own spec.
      ...root
        .findAll((node) => node.type === 'View')
        .map((node) => flatStyle(node.props?.style))
        .filter((s) => s.width !== 44),
    ];
    const hexes: string[] = [];
    painted.forEach((style) => {
      Object.values(style as FlatStyle).forEach((value) => {
        if (typeof value !== 'string') return;
        (value.match(/#[0-9a-fA-F]{3,8}/g) ?? []).forEach((h) => hexes.push(h.toLowerCase()));
      });
    });
    expect(hexes.length).toBeGreaterThan(0);
    hexes.forEach((hex) => {
      // The pressed layer is a composite of two token colours, by design.
      if (hex === mixToken(THEME.light.card, THEME.light.onCard, V4_STATE.pressed).toLowerCase()) {
        return;
      }
      expect(allowed.has(hex)).toBe(true);
    });

    const spacings = new Set(Object.values(THEME.spacing));
    tiles(root).forEach((tile) => {
      expect(spacings.has(tileStyle(tile).padding as number)).toBe(true);
      expect(tileStyle(tile).borderRadius).toBe(THEME.radius.lg);
    });
  });

  it('text never takes the muted FILL', () => {
    const { getByText } = renderThemed(
      <QuickActionsV4 actions={ACTIONS} title="Shortcuts" />,
      SEED_LIGHT
    );
    ['Shortcuts', 'Send', 'Scan', 'Top up'].forEach((label) => {
      expect(flatStyle(getByText(label).props.style).color).not.toBe(THEME.light.muted);
    });
    expect(flatStyle(getByText('Send').props.style).color).toBe(THEME.light.onCard);
  });

  // -------------------------------------------------------- empty state --

  it('EMPTY STATE — actions: [] renders nothing at all, not a blank bordered box', () => {
    const { toJSON } = renderThemed(<QuickActionsV4 actions={[]} />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('EMPTY STATE — a title with no actions is still nothing: no heading over a void', () => {
    const { toJSON } = renderThemed(
      <QuickActionsV4 actions={[]} title="Shortcuts" />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeNull();
  });

  it('EMPTY STATE — an action with no icon at all renders its label and no badge', () => {
    const { root, getByText } = renderThemed(
      <QuickActionsV4 actions={[{ key: 'bare', label: 'Bare' }]} />,
      SEED_LIGHT
    );
    expect(getByText('Bare')).toBeTruthy();
    expect(badge(tiles(root)[0] as ReactTestInstance)).toBeUndefined();
    // Still a full tile: the ground, the radius and the floor are unconditional.
    expect(tileStyle(tiles(root)[0] as ReactTestInstance).backgroundColor).toBe(THEME.light.card);
  });

  // ---------------------------------------------------------- plumbing --

  it('passes the caller’s style through to the root', () => {
    const { root } = renderThemed(
      <QuickActionsV4 actions={ACTIONS} style={{ marginTop: 12 }} />,
      SEED_LIGHT
    );
    expect(styles(root).some((s) => s.marginTop === 12)).toBe(true);
    // §4.1: a header sits `spacing.md` from its body.
    expect(styles(root).some((s) => s.gap === THEME.spacing.md)).toBe(true);
  });
});
