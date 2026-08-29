import * as React from 'react';
import { View } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { stateMix } from '../../primitives/internal/v4-state';
import { MetricTileV4 } from './MetricTileV4';

/** Flatten a possibly-nested RN `style` into one object. */
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

/** The tile's own box — the host node painting a ground and a radius. */
function tileNode(root: ReactTestInstance): ReactTestInstance {
  return root.findAll(
    (n) => typeof n.type === 'string' && flat(n.props?.style).borderRadius !== undefined
  )[0] as ReactTestInstance;
}

/** Every decorative node — the badge hides itself from the a11y tree. */
function hiddenNodes(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll(
    (n) => typeof n.type === 'string' && n.props?.accessibilityElementsHidden === true
  );
}

describe('MetricTileV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  // ── §4.2: the card ground ──────────────────────────────────────────

  it('paints `card`, not the page colour — the pass’s headline fix', () => {
    const { root } = renderThemed(<MetricTileV4 label="Open" value={12} />, SEED_LIGHT);
    const style = flat(tileNode(root).props.style);
    expect(style.backgroundColor).toBe(theme.light.card);
    expect(style.backgroundColor).not.toBe(theme.light.surface);
  });

  it('takes `radius.lg` (was `md`), `spacing.md` padding, and no visible edge', () => {
    const { root } = renderThemed(<MetricTileV4 label="Open" value={12} />, SEED_LIGHT);
    const style = flat(tileNode(root).props.style);
    expect(style.borderRadius).toBe(theme.radius.lg);
    expect(style.borderRadius).not.toBe(theme.radius.md);
    expect(style.padding).toBe(theme.spacing.md);
    // §5 drops the border — the tile lives inside a card, and a hairline box
    // inside a hairline box is the ruled look §3 rules out. The width stays so
    // a raised tile and a flat one are the same size to the pixel.
    expect(style.borderColor).toBe('transparent');
    expect(style.borderWidth).toBe(1);
  });

  // ── §5: the tone is a *Text slot, not a fill ───────────────────────

  it('inks the value with the contrast-corrected TEXT slot for every tone', () => {
    const cases = [
      ['neutral', theme.light.onCard],
      ['primary', theme.light.primaryText],
      ['success', theme.light.successText],
      ['warn', theme.light.warnText],
      ['danger', theme.light.dangerText],
    ] as const;
    for (const [tone, want] of cases) {
      const { getByText } = renderThemed(
        <MetricTileV4 label="Open" value="12" tone={tone} />,
        SEED_LIGHT
      );
      expect(flat(getByText('12').props.style).color).toBe(want);
    }
    // `neutral` is `onCard` and not `onSurface`: the contrast promise a text
    // slot makes is a promise about a NAMED ground, and this tile's ground
    // moved.
    const { getByText } = renderThemed(<MetricTileV4 label="a" value="1" />, SEED_LIGHT);
    expect(flat(getByText('1').props.style).color).toBe(theme.light.onCard);
  });

  // ── §3 / §4.1: the ramp and the anatomy ────────────────────────────

  it('puts a `sm` `mutedText` label above a `2xl` bold value', () => {
    const { getByText } = renderThemed(<MetricTileV4 label="Open" value={12} />, SEED_LIGHT);
    const label = flat(getByText('Open').props.style);
    const value = flat(getByText('12').props.style);
    expect(label.fontSize).toBe(theme.typography.scale.sm);
    // The base set this at `xs` in `colors.muted` — a FILL used as ink, which
    // is the bug the shadcn pass closed everywhere else (§4.3).
    expect(label.fontSize).not.toBe(theme.typography.scale.xs);
    expect(label.color).toBe(theme.light.mutedText);
    expect(value.fontSize).toBe(theme.typography.scale['2xl']);
    expect(value.fontWeight).toBe('700');
    expect(value.fontVariant).toEqual(['tabular-nums']);
  });

  it('renders `iconName` in a soft tinted 44 circle and `icon` in the same slot', () => {
    const named = renderThemed(
      <MetricTileV4 label="a" value="1" iconName="chart" />,
      SEED_LIGHT
    );
    const badge = flat(hiddenNodes(named.root)[0]?.props.style);
    expect(badge.width).toBe(44);
    expect(badge.borderRadius).toBe(22);
    expect(badge.backgroundColor).not.toBe(theme.light.card);

    const custom = renderThemed(
      <MetricTileV4 label="a" value="1" icon={<View testID="art" />} />,
      SEED_LIGHT
    );
    const slot = custom.root.findAll(
      (n) => typeof n.type === 'string' && flat(n.props?.style).width === 44
    )[0] as ReactTestInstance;
    expect(flat(slot.props.style).height).toBe(44);
    expect(flat(slot.props.style).backgroundColor).toBeUndefined();
  });

  it('tints the badge from the tile’s own tone, and falls to `primary` for neutral', () => {
    const ground = (tone: 'neutral' | 'success'): unknown => {
      const { root } = renderThemed(
        <MetricTileV4 label="a" value="1" iconName="chart" tone={tone} />,
        SEED_LIGHT
      );
      return flat(hiddenNodes(root)[0]?.props.style).backgroundColor;
    };
    expect(ground('success')).not.toBe(ground('neutral'));
  });

  // ── §4.3 / §1.7: press feedback is the state layer ─────────────────

  it('replaces `opacity: pressed ? 0.8 : 1` with the opaque state layer', () => {
    const onPress = jest.fn();
    const { root } = renderThemed(
      <MetricTileV4 label="Open" value={12} onPress={onPress} />,
      SEED_LIGHT
    );
    const pressable = root.findAll(
      (n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'button'
    )[0] as ReactTestInstance;

    // Nothing dims: dimming fades the tile's own CONTENT, which is the signal
    // M3 spends 0.38 on to mean disabled.
    root.findAll(() => true).forEach((n) => {
      expect(flat(n.props?.style).opacity).toBeUndefined();
    });

    // Pressed, the CONTAINER is tinted — with the opaque `card` / `onCard`
    // pair, because the value's contrast is a promise about that fill.
    fireEvent(pressable, 'pressIn');
    expect(flat(tileNode(root).props.style).backgroundColor).toBe(
      stateMix(theme.light.card, theme.light.onCard, 'pressed')
    );
    fireEvent(pressable, 'pressOut');
    expect(flat(tileNode(root).props.style).backgroundColor).toBe(theme.light.card);
  });

  it('is a button when `onPress` is set, and nothing but a tile without it', () => {
    const onPress = jest.fn();
    const pressable = renderThemed(
      <MetricTileV4 label="Open" value={12} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(pressable.getByLabelText('Open: 12'));
    expect(onPress).toHaveBeenCalledTimes(1);

    const plain = renderThemed(<MetricTileV4 label="Open" value={12} />, SEED_LIGHT);
    expect(
      plain.root.findAll(
        (n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'button'
      )
    ).toHaveLength(0);
  });

  // ── §4.6: elevation ────────────────────────────────────────────────

  it('is flat by default — it is the tile INSIDE a card — and raised on request', () => {
    const inCard = renderThemed(<MetricTileV4 label="a" value="1" />, SEED_LIGHT);
    expect(flat(tileNode(inCard.root).props.style).shadowOpacity).toBeUndefined();
    const onPage = renderThemed(<MetricTileV4 label="a" value="1" raised />, SEED_LIGHT);
    expect(flat(tileNode(onPage.root).props.style).shadowOpacity).toBe(
      theme.lightElevation.card.opacity
    );
  });

  // ── §4.5: the empty case ───────────────────────────────────────────

  it('renders NOTHING when it has neither a label nor a value', () => {
    expect(renderThemed(<MetricTileV4 label="" value="" />, SEED_LIGHT).toJSON()).toBeNull();
    expect(
      renderThemed(
        <MetricTileV4 label="" value={undefined as unknown as string} />,
        SEED_LIGHT
      ).toJSON()
    ).toBeNull();
  });

  it('survives a half-empty tile rather than drawing a blank box', () => {
    const labelOnly = renderThemed(<MetricTileV4 label="Open" value="" />, SEED_LIGHT);
    expect(labelOnly.queryByText('Open')).not.toBeNull();
    const valueOnly = renderThemed(<MetricTileV4 label="" value={12} />, SEED_LIGHT);
    expect(valueOnly.queryByText('12')).not.toBeNull();
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('announces the metric and takes a style override', () => {
    const { root, getByLabelText } = renderThemed(
      <MetricTileV4 label="Open" value={12} style={{ flexGrow: 1 }} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Open: 12')).toBeTruthy();
    expect(flat(tileNode(root).props.style).flexGrow).toBe(1);
    expect(flat(tileNode(root).props.style).backgroundColor).toBe(theme.light.card);
  });

  it('paints nothing with a literal — every colour traces to a token', () => {
    // No `iconName` here on purpose: `IconV4`'s soft badge composites its wash
    // from two tokens with `mixToken`, so the result is derived from the theme
    // rather than present in it.
    const { root } = renderThemed(
      <MetricTileV4 label="Open" value={12} tone="success" raised />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
