import * as React from 'react';
import { View } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { StatCardV4 } from './StatCardV4';

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

/** The card itself — the one host node carrying the stat's spoken label. */
function cardNode(root: ReactTestInstance, label: string): ReactTestInstance {
  return root.findAll(
    (n) => typeof n.type === 'string' && n.props?.accessibilityLabel === label
  )[0] as ReactTestInstance;
}

/** Every decorative node — the trend glyph and the badge both hide themselves. */
function hiddenNodes(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll(
    (n) => typeof n.type === 'string' && n.props?.accessibilityElementsHidden === true
  );
}

describe('StatCardV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  // ── §4.2: the card ground ──────────────────────────────────────────

  it('paints `card`, not the page colour — the pass’s headline fix', () => {
    const { root } = renderThemed(<StatCardV4 label="Revenue" value="$12.4k" />, SEED_LIGHT);
    const style = flat(cardNode(root, 'Revenue: $12.4k').props.style);
    expect(style.backgroundColor).toBe(theme.light.card);
    // The bug this pass exists to fix: the card must not be painted the same
    // colour as the page it sits on.
    expect(style.backgroundColor).not.toBe(theme.light.surface);
    // …and the two really are different colours for this seed, which open
    // question 2 asked someone to confirm before 16 components depend on it.
    expect(theme.light.card).not.toBe(theme.light.surface);
  });

  it('takes the rest of the card recipe from `CardV4` rather than re-rolling it', () => {
    const { root } = renderThemed(<StatCardV4 label="a" value="1" />, SEED_LIGHT);
    const style = flat(cardNode(root, 'a: 1').props.style);
    expect(style.borderRadius).toBe(theme.radius.lg);
    expect(style.padding).toBe(theme.spacing.lg);
    expect(style.borderWidth).toBe(1);
    expect(style.borderColor).toBe(theme.light.border);
    expect(style.gap).toBe(theme.spacing.md);
  });

  // ── §3: the type ramp ──────────────────────────────────────────────

  it('sets the value as the loudest thing in the block, in tabular figures', () => {
    const { getByText } = renderThemed(<StatCardV4 label="Revenue" value="1,204" />, SEED_LIGHT);
    const value = flat(getByText('1,204').props.style);
    expect(value.fontSize).toBe(theme.typography.scale['3xl']);
    expect(value.fontWeight).toBe('700');
    expect(value.fontVariant).toEqual(['tabular-nums']);
    // Inked on the card's own pair, never the page's.
    expect(value.color).toBe(theme.light.onCard);
    // `2xl` ties the page title; §5 moves the value up a step.
    expect(value.fontSize).not.toBe(theme.typography.scale['2xl']);
  });

  it('puts a small calm label above it, in `mutedText` and not the `muted` FILL', () => {
    const { getByText } = renderThemed(<StatCardV4 label="Revenue" value="1,204" />, SEED_LIGHT);
    const label = flat(getByText('Revenue').props.style);
    expect(label.fontSize).toBe(theme.typography.scale.sm);
    // The base drew this line in `colors.muted` — a fill with no contrast
    // promise as ink, and the exact bug the shadcn pass closed (§4.3). Note
    // the compiler leaves `mutedText` EQUAL to `muted` on a seed whose fill
    // already clears AA, so "reads the corrected slot" is the claim that holds
    // on every seed; "differs from the fill" is only true on some.
    expect(label.color).toBe(theme.light.mutedText);
  });

  it('renders `caption` as the quiet "vs last month" line', () => {
    const { getByText } = renderThemed(
      <StatCardV4 label="a" value="1" delta="+12%" trend="up" caption="vs last month" />,
      SEED_LIGHT
    );
    const caption = flat(getByText('vs last month').props.style);
    expect(caption.fontSize).toBe(theme.typography.scale.xs);
    expect(caption.color).toBe(theme.light.mutedText);
  });

  // ── the trend indicator is not colour alone ────────────────────────

  it('pairs the trend colour with a direction glyph, so colour is never the only signal', () => {
    const up = renderThemed(
      <StatCardV4 label="a" value="1" delta="+12%" trend="up" />,
      SEED_LIGHT
    );
    expect(flat(up.getByText('+12%').props.style).color).toBe(theme.light.successText);
    const upGlyph = hiddenNodes(up.root)[0]?.children;

    const down = renderThemed(
      <StatCardV4 label="a" value="1" delta="-3%" trend="down" />,
      SEED_LIGHT
    );
    expect(flat(down.getByText('-3%').props.style).color).toBe(theme.light.dangerText);
    const downGlyph = hiddenNodes(down.root)[0]?.children;

    // A mark is drawn for each direction…
    expect(upGlyph).toBeDefined();
    expect(downGlyph).toBeDefined();
    // …and the two are different, or the glyph adds nothing and the indicator
    // is colour-only after all.
    expect(upGlyph).not.toEqual(downGlyph);
    // The literal ▲ / ▼ characters the base typed into itself are gone; the
    // mark comes from the kit's named icon set through `IconV4`.
    expect(upGlyph).not.toEqual(['▲']);
    expect(downGlyph).not.toEqual(['▼']);
  });

  it('reads the contrast-corrected `*Text` slots, never the fills', () => {
    // The corrected slot is the same hue walked until it clears AA, and the
    // compiler leaves it EQUAL to the fill wherever the fill already did — so
    // the assertion that holds on every seed is "it read the corrected slot",
    // which is where a fill would diverge the moment a seed needed it to.
    const up = renderThemed(<StatCardV4 label="a" value="1" delta="+1" trend="up" />, SEED_LIGHT);
    expect(flat(up.getByText('+1').props.style).color).toBe(theme.light.successText);
    const down = renderThemed(
      <StatCardV4 label="a" value="1" delta="-1" trend="down" />,
      SEED_LIGHT
    );
    expect(flat(down.getByText('-1').props.style).color).toBe(theme.light.dangerText);
  });

  it('falls to a flat, muted delta when no direction was given', () => {
    const { getByText, root } = renderThemed(
      <StatCardV4 label="a" value="1" delta="0%" />,
      SEED_LIGHT
    );
    expect(flat(getByText('0%').props.style).color).toBe(theme.light.mutedText);
    // Still marked, so "no change" reads as a decision rather than as an
    // unstyled string.
    expect(hiddenNodes(root)[0]?.children).toBeDefined();
  });

  it('omits the delta line entirely when there is no delta', () => {
    const { root } = renderThemed(<StatCardV4 label="a" value="1" />, SEED_LIGHT);
    expect(hiddenNodes(root)).toHaveLength(0);
  });

  // ── §4.7: the badge ────────────────────────────────────────────────

  it('renders `iconName` in a soft tinted 44 circle', () => {
    const { root } = renderThemed(
      <StatCardV4 label="a" value="1" iconName="chart" />,
      SEED_LIGHT
    );
    const badge = flat(hiddenNodes(root)[0]?.props.style);
    expect(badge.width).toBe(44);
    expect(badge.height).toBe(44);
    // A circle drawn from its own diameter — geometry, not `radius.full`,
    // which compiles to 0 on a `sharp` seed.
    expect(badge.borderRadius).toBe(22);
    // Tinted: a wash of the tone, not the card it sits on.
    expect(badge.backgroundColor).not.toBe(theme.light.card);
  });

  it('tints the badge from the stat’s semantic family', () => {
    const ground = (tone?: 'success'): unknown => {
      const { root } = renderThemed(
        <StatCardV4 label="a" value="1" iconName="chart" tone={tone} />,
        SEED_LIGHT
      );
      return flat(hiddenNodes(root)[0]?.props.style).backgroundColor;
    };
    expect(ground('success')).not.toBe(ground());
  });

  it('keeps `icon` for parity, in the same 44 slot and drawn untinted', () => {
    const { root } = renderThemed(
      <StatCardV4 label="a" value="1" icon={<View testID="art" />} />,
      SEED_LIGHT
    );
    const slot = root.findAll(
      (n) => typeof n.type === 'string' && flat(n.props?.style).width === 44
    )[0] as ReactTestInstance;
    expect(flat(slot.props.style).height).toBe(44);
    expect(flat(slot.props.style).backgroundColor).toBeUndefined();
    expect(root.findAllByProps({ testID: 'art' }).length).toBeGreaterThan(0);
  });

  // ── §4.6: elevation ────────────────────────────────────────────────

  it('is raised on the page by default and flat inside another card', () => {
    const onPage = renderThemed(<StatCardV4 label="a" value="1" />, SEED_LIGHT);
    expect(flat(cardNode(onPage.root, 'a: 1').props.style).shadowOpacity).toBe(
      theme.lightElevation.card.opacity
    );
    const inCard = renderThemed(<StatCardV4 label="a" value="1" raised={false} />, SEED_LIGHT);
    expect(flat(cardNode(inCard.root, 'a: 1').props.style).shadowOpacity).toBeUndefined();
  });

  // ── §4.5: the empty case ───────────────────────────────────────────

  it('renders NOTHING when it has neither a label nor a value', () => {
    expect(renderThemed(<StatCardV4 label="" value="" />, SEED_LIGHT).toJSON()).toBeNull();
    expect(
      renderThemed(
        <StatCardV4 label="" value={undefined as unknown as string} />,
        SEED_LIGHT
      ).toJSON()
    ).toBeNull();
  });

  it('survives a half-empty stat rather than drawing a blank box', () => {
    const labelOnly = renderThemed(<StatCardV4 label="Revenue" value="" />, SEED_LIGHT);
    expect(labelOnly.queryByText('Revenue')).not.toBeNull();
    const valueOnly = renderThemed(<StatCardV4 label="" value="1,204" />, SEED_LIGHT);
    expect(valueOnly.queryByText('1,204')).not.toBeNull();
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('announces the stat and takes a style override', () => {
    const { root } = renderThemed(
      <StatCardV4 label="Revenue" value="$12.4k" delta="+12%" trend="up" style={{ flexGrow: 1 }} />,
      SEED_LIGHT
    );
    const node = cardNode(root, 'Revenue: $12.4k, +12%');
    expect(flat(node.props.style).flexGrow).toBe(1);
    // A caller's style still cannot silently undo the ground.
    expect(flat(node.props.style).backgroundColor).toBe(theme.light.card);
  });

  it('paints nothing with a literal — every colour traces to a token', () => {
    // No `iconName` here on purpose: `IconV4`'s soft badge composites its wash
    // from two tokens with `mixToken`, so the result is derived from the theme
    // rather than present in it.
    const { root } = renderThemed(
      <StatCardV4
        label="Revenue"
        value="$12.4k"
        delta="+12%"
        trend="up"
        caption="vs last month"
      />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
