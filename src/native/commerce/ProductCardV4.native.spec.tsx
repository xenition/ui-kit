import * as React from 'react';
import { Pressable } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_DARK,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { stateMix } from '../../primitives/internal/v4-state';
import { BadgeV4 } from '../primitives/BadgeV4';
import { formatMoney } from './money';
import { ProductCardV4 } from './ProductCardV4';

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

/** Every host view in the tree, flattest style first. */
function styles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style));
}

/** The outermost view painting a background — the card's own ground. */
function ground(root: ReactTestInstance): string | undefined {
  const painted = styles(root).find((s) => s.backgroundColor !== undefined && s.borderRadius);
  return painted?.backgroundColor as string | undefined;
}

describe('ProductCardV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  // ── §4.2: the card ground, the pass's headline fix ──────────────────

  it('paints `card`, not the page colour', () => {
    const { root } = renderThemed(
      <ProductCardV4 title="Ceramic Mug" priceCents={2400} />,
      SEED_LIGHT
    );
    expect(ground(root)).toBe(theme.light.card);
    expect(ground(root)).not.toBe(theme.light.surface);
  });

  it('raises by default and goes flat inside another card', () => {
    const raised = renderThemed(<ProductCardV4 title="Mug" priceCents={1} />, SEED_LIGHT);
    expect(styles(raised.root).some((s) => s.shadowOpacity !== undefined)).toBe(true);

    const flatCard = renderThemed(
      <ProductCardV4 title="Mug" priceCents={1} raised={false} />,
      SEED_LIGHT
    );
    expect(styles(flatCard.root).some((s) => s.shadowOpacity !== undefined)).toBe(false);
  });

  // ── the anatomy ─────────────────────────────────────────────────────

  it('composes PriceTagV4, never a hand-rolled price', () => {
    const { getByText } = renderThemed(
      <ProductCardV4 title="Ceramic Mug" priceCents={120450} compareAtCents={150000} />,
      SEED_LIGHT
    );
    const price = getByText(formatMoney(120450));
    expect(flat(price.props.style).fontVariant).toEqual(['tabular-nums']);
    expect(flat(price.props.style).fontFamily).toBe(theme.typography.fontHeading);
    expect(getByText(formatMoney(150000)).props.accessibilityLabel).toBe(
      `Was ${formatMoney(150000)}`
    );
  });

  it('routes every amount through formatMoney, including an override', () => {
    const { getByText } = renderThemed(
      <ProductCardV4
        title="Mug"
        priceCents={1200}
        currency="EUR"
        formatMoney={(cents, cur) => `${cur} ${cents}`}
      />,
      SEED_LIGHT
    );
    expect(getByText('EUR 1200')).toBeTruthy();
  });

  it('caps the title at two lines and draws it in the card ink', () => {
    const { getByText } = renderThemed(
      <ProductCardV4 title="A hand-thrown stoneware mug" priceCents={2400} />,
      SEED_LIGHT
    );
    const title = getByText('A hand-thrown stoneware mug');
    expect(title.props.numberOfLines).toBe(2);
    expect(flat(title.props.style).color).toBe(theme.light.onCard);
  });

  it('holds the media at the ratio it was given, and 4:5 by default', () => {
    const def = renderThemed(<ProductCardV4 title="Mug" priceCents={1} />, SEED_LIGHT);
    expect(styles(def.root).some((s) => s.aspectRatio === 4 / 5)).toBe(true);

    ([
      ['1:1', 1],
      ['3:4', 3 / 4],
      ['16:9', 16 / 9],
    ] as const).forEach(([aspect, value]) => {
      const { root } = renderThemed(
        <ProductCardV4 title="Mug" priceCents={1} aspect={aspect} />,
        SEED_LIGHT
      );
      expect(styles(root).some((s) => s.aspectRatio === value)).toBe(true);
    });
  });

  it('gives the media a semantic placeholder, not a light-only ramp step', () => {
    const { root } = renderThemed(<ProductCardV4 title="Mug" priceCents={1} />, SEED_DARK);
    const dark = compileTheme(SEED_DARK);
    const media = styles(root).find((s) => s.aspectRatio !== undefined);
    expect(media?.backgroundColor).toBe(dark.dark.muted);
    expect(media?.backgroundColor).not.toBe(dark.ramps.neutral[100]);
  });

  // ── the new props ───────────────────────────────────────────────────

  it('takes exactly one badge, positioned over the media', () => {
    const { root, getByText } = renderThemed(
      <ProductCardV4 title="Mug" priceCents={2400} badge={<BadgeV4 tone="danger">Sale</BadgeV4>} />,
      SEED_LIGHT
    );
    expect(getByText('Sale')).toBeTruthy();
    expect(styles(root).some((s) => s.position === 'absolute')).toBe(true);
  });

  it('draws no badge slot at all when it was given no badge', () => {
    const { root } = renderThemed(<ProductCardV4 title="Mug" priceCents={2400} />, SEED_LIGHT);
    expect(styles(root).some((s) => s.position === 'absolute')).toBe(false);
  });

  it('falls back to a GenerativeCoverV4 when there is no image', () => {
    const drawn = renderThemed(
      <ProductCardV4 title="Mug" slug="mug" priceCents={2400} />,
      SEED_LIGHT
    );
    expect(drawn.root.findAll((n) => n.props?.colors !== undefined).length).toBeGreaterThan(0);

    const shot = renderThemed(
      <ProductCardV4 title="Mug" priceCents={2400} imageUrl="https://x/mug.jpg" />,
      SEED_LIGHT
    );
    expect(shot.root.findAll((n) => n.props?.colors !== undefined)).toHaveLength(0);
  });

  it('fires onAdd from a ButtonV4, and renders no button without a handler', () => {
    const onAdd = jest.fn();
    const { getByText } = renderThemed(
      <ProductCardV4 title="Mug" priceCents={2400} onAdd={onAdd} addLabel="Add" />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Add'));
    expect(onAdd).toHaveBeenCalledTimes(1);

    const bare = renderThemed(<ProductCardV4 title="Mug" priceCents={2400} />, SEED_LIGHT);
    expect(bare.queryByText('Add to cart')).toBeNull();
  });

  // ── §4.3: press is a state layer, not a dimmer ──────────────────────

  it('presses through, and tints rather than dims', () => {
    const onPress = jest.fn();
    const { getByLabelText, root, UNSAFE_getByType } = renderThemed(
      <ProductCardV4 title="Cedar Candle" priceCents={1500} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Cedar Candle'));
    expect(onPress).toHaveBeenCalledTimes(1);

    // Idle: the card ground, at full strength. No `opacity` anywhere.
    expect(ground(root)).toBe(theme.light.card);
    styles(root).forEach((s) => expect(s.opacity).toBeUndefined());

    // Pressed: the opaque M3 layer — the card's ink over the card's ground —
    // read off the render prop, which is where the pressed branch lives.
    const render = UNSAFE_getByType(Pressable).props.children as (s: {
      pressed: boolean;
    }) => React.ReactElement;
    const layered = flat((render({ pressed: true }).props as { style?: unknown }).style)
      .backgroundColor;
    expect(layered).toBe(stateMix(theme.light.card, theme.light.onCard, 'pressed'));
    expect(layered).not.toBe(theme.light.card);
  });

  // ── the empty case (§4.5) ───────────────────────────────────────────

  it('renders nothing for a product with no name — never a blank bordered box', () => {
    const { toJSON } = renderThemed(
      <ProductCardV4 title="" priceCents={2400} onAdd={() => undefined} />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeNull();
  });

  it('survives a product with no image, no compare-at, no badge and no handlers', () => {
    const { getByText, root } = renderThemed(
      <ProductCardV4 title="Mug" priceCents={0} />,
      SEED_LIGHT
    );
    expect(getByText(formatMoney(0))).toBeTruthy();
    expect(ground(root)).toBe(theme.light.card);
  });

  // ── the accessible label ────────────────────────────────────────────

  it('names the pressable card with the product title', () => {
    const { getByLabelText } = renderThemed(
      <ProductCardV4 title="Ceramic Mug" priceCents={2400} onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Ceramic Mug').props.accessibilityRole).toBe('button');
  });

  it('names a real photo with imageAlt and leaves the generated cover decorative', () => {
    const shot = renderThemed(
      <ProductCardV4
        title="Mug"
        priceCents={1}
        imageUrl="https://x/m.jpg"
        imageAlt="Cream mug, side on"
      />,
      SEED_LIGHT
    );
    expect(shot.getByLabelText('Cream mug, side on')).toBeTruthy();

    const drawn = renderThemed(<ProductCardV4 title="Mug" priceCents={1} />, SEED_LIGHT);
    // The plate is hidden from the tree, so "Mug" is announced once.
    expect(
      drawn.root.findAll((n) => n.props?.accessibilityElementsHidden === true).length
    ).toBeGreaterThan(0);
    expect(drawn.queryAllByLabelText('Mug')).toHaveLength(0);
  });

  // ── token purity ────────────────────────────────────────────────────

  it('every rendered hex traces to a compiled token, in both seeds', () => {
    // No `onAdd`: `ButtonV4` runs its label through `ensureContrast`, which by
    // design emits a corrected colour that is not itself a compiled token.
    // That is the primitive's promise to keep and its own spec's to assert;
    // what this one claims is that the CARD paints nothing but tokens.
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <ProductCardV4
          title="Ceramic Mug"
          priceCents={2400}
          compareAtCents={3200}
          badge={<BadgeV4 tone="danger">Sale</BadgeV4>}
        />,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
