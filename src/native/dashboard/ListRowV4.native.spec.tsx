import * as React from 'react';
import { Text as RNText } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_BOTH,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { stateMix } from '../../primitives/internal/v4-state';
import { ListRowV4 } from './ListRowV4';

const theme = compileTheme(SEED_LIGHT);
const CHEVRON = resolveIconGlyph('chevron-right');

/** The one-line and two-line floors, composed the way the row module composes them. */
const ONE_LINE = theme.spacing['2xl'] + theme.spacing.sm;
const TWO_LINE = theme.spacing['2xl'] + theme.spacing.lg;
/** The 44 leading slot — `2xl - xs`, the nav line's `minTap`. */
const LEADING = theme.spacing['2xl'] - theme.spacing.xs;

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

/** The `Pressable` whose `style` is still a function of the press state. */
function pressableNode(root: ReactTestInstance): ReactTestInstance | undefined {
  return root.findAll(
    (n) => typeof n.props?.style === 'function' && n.props?.onPress !== undefined
  )[0];
}

/** The row's own resolved box, pressed or at rest. */
function rowStyle(root: ReactTestInstance, pressed = false): Record<string, unknown> {
  const fn = pressableNode(root);
  if (fn !== undefined) {
    return flat((fn.props.style as (s: { pressed: boolean }) => unknown)({ pressed }));
  }
  const node = root.findAll(
    (n) => n.props?.accessibilityLabel !== undefined && n.props?.style !== undefined
  )[0];
  return flat(node?.props?.style);
}

/** Every host view in the tree, as flattened styles. */
function viewStyles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style));
}

describe('ListRowV4 (native) — props', () => {
  it('keeps every base prop working and adds only optional ones', () => {
    const seen: string[] = [];
    const { getByText } = renderThemed(
      <ListRowV4
        title="Ada Lovelace"
        meta="Analytical engine"
        avatarUrl="https://example.test/a.png"
        action={<RNText>3</RNText>}
        onPress={() => seen.push('tap')}
      />,
      SEED_LIGHT
    );
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(getByText('Analytical engine')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    fireEvent.press(getByText('Ada Lovelace'));
    expect(seen).toEqual(['tap']);
  });

  it('is a plain view until it is given something to do', () => {
    const still = renderThemed(<ListRowV4 title="Static" />, SEED_LIGHT);
    expect(pressableNode(still.UNSAFE_root)).toBeUndefined();

    const tappable = renderThemed(
      <ListRowV4 title="Tap" onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(pressableNode(tappable.UNSAFE_root)).toBeDefined();
  });

  it('accepts a caller style override on top of the shared box', () => {
    const { UNSAFE_root: root } = renderThemed(
      <ListRowV4 title="Ada" style={{ opacity: 0.5 }} />,
      SEED_LIGHT
    );
    expect(rowStyle(root).opacity).toBe(0.5);
    // …without losing the metric it overrode nothing of.
    expect(rowStyle(root).paddingHorizontal).toBe(theme.spacing.md);
  });

  it('typesets the two lines from the V4 scale, and never inks with a fill', () => {
    const { getByText } = renderThemed(<ListRowV4 title="Ada" meta="Engines" />, SEED_LIGHT);
    const title = flat(getByText('Ada').props.style);
    const meta = flat(getByText('Engines').props.style);
    expect(title.fontSize).toBe(theme.typography.scale.base);
    expect(title.fontWeight).toBe('600');
    expect(title.color).toBe(theme.light.onSurface);
    expect(meta.fontSize).toBe(theme.typography.scale.sm);
    // `mutedText`, not `colors.muted` — §4.3 names the base row's use of the
    // *fill* as an ink as the exact bug the shadcn pass closed.
    expect(meta.color).toBe(theme.light.mutedText);
    // One line each, so a long name ellipsises rather than pushing the trailing
    // readout off the row.
    expect(getByText('Ada').props.numberOfLines).toBe(1);
    expect(getByText('Engines').props.numberOfLines).toBe(1);
  });
});

describe('ListRowV4 (native) — the family metric', () => {
  it('takes the one-line floor with a title alone', () => {
    const { UNSAFE_root: root } = renderThemed(<ListRowV4 title="Ada" showAvatar={false} />, SEED_LIGHT);
    expect(rowStyle(root).minHeight).toBe(ONE_LINE);
  });

  it('takes the two-line floor once it carries a supporting line', () => {
    const { UNSAFE_root: root } = renderThemed(
      <ListRowV4 title="Ada" meta="Engines" showAvatar={false} />,
      SEED_LIGHT
    );
    expect(rowStyle(root).minHeight).toBe(TWO_LINE);
    // 16 taller, not 20 or 24 — one `md` step, so both kinds of row stay on one
    // vertical rhythm.
    expect(TWO_LINE - ONE_LINE).toBe(theme.spacing.md);
  });

  it('treats an empty supporting line as no supporting line', () => {
    const { UNSAFE_root: root } = renderThemed(
      <ListRowV4 title="Ada" meta="" showAvatar={false} />,
      SEED_LIGHT
    );
    expect(rowStyle(root).minHeight).toBe(ONE_LINE);
  });

  it('wears the shared row box rather than one of its own', () => {
    const { UNSAFE_root: root } = renderThemed(<ListRowV4 title="Ada" />, SEED_LIGHT);
    const box = rowStyle(root);
    expect(box.flexDirection).toBe('row');
    expect(box.alignItems).toBe('center');
    // §4.1 row padding and leading gap, both `md`.
    expect(box.paddingHorizontal).toBe(theme.spacing.md);
    expect(box.gap).toBe(theme.spacing.md);
    // §4.3: the container owns the card. §4.6: a row carries no depth.
    expect(box.backgroundColor).toBe('transparent');
    expect(box.borderRadius).toBeUndefined();
    expect(box.shadowOpacity).toBeUndefined();
    expect(box.elevation).toBeUndefined();
    // A floor, not a size — a wrapping title grows the row instead of clipping.
    expect(box.height).toBeUndefined();
  });

  it('holds the leading slot at the 44 tap floor and lets it never shrink', () => {
    const { UNSAFE_root: root } = renderThemed(<ListRowV4 title="Ada Lovelace" />, SEED_LIGHT);
    const slot = viewStyles(root).find((s) => s.width === LEADING && s.height === LEADING);
    expect(slot).toBeDefined();
    expect(slot?.flexShrink).toBe(0);
    expect(LEADING).toBe(44);
  });

  it('gives the text column the shrink it needs for the clamp to work', () => {
    const { UNSAFE_root: root } = renderThemed(<ListRowV4 title="Ada" meta="Engines" />, SEED_LIGHT);
    const column = viewStyles(root).find((s) => s.flex === 1 && s.minWidth === 0);
    expect(column).toBeDefined();
    expect(column?.gap).toBe(theme.spacing.xs);
  });
});

describe('ListRowV4 (native) — the leading slot', () => {
  it('shows a person as an avatar, with initials rather than a dot', () => {
    const { getByText } = renderThemed(<ListRowV4 title="Ada Lovelace" />, SEED_LIGHT);
    expect(getByText('AL')).toBeTruthy();
  });

  it('shows a kind of thing as a tinted circular badge, never a bare dot', () => {
    const { UNSAFE_root: root } = renderThemed(
      <ListRowV4 title="Billing" icon="star" iconTone="success" showAvatar={false} />,
      SEED_LIGHT
    );
    const badge = viewStyles(root).find(
      (s) =>
        typeof s.width === 'number' &&
        s.width === s.height &&
        s.borderRadius === (s.width as number) / 2 &&
        typeof s.backgroundColor === 'string' &&
        s.backgroundColor !== 'transparent'
    );
    expect(badge).toBeDefined();
    // The 8×8 dot the sibling rows draw could never be one.
    expect(badge?.width).toBeGreaterThanOrEqual(LEADING);
  });

  it('lets an explicit leading slot win over both', () => {
    const { getByText, queryByText } = renderThemed(
      <ListRowV4 title="Ada Lovelace" icon="star" leading={<RNText>own</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('own')).toBeTruthy();
    expect(queryByText('AL')).toBeNull();
  });

  it('omits the slot entirely when the row is plain text', () => {
    const { UNSAFE_root: root } = renderThemed(<ListRowV4 title="Ada" showAvatar={false} />, SEED_LIGHT);
    expect(viewStyles(root).find((s) => s.width === LEADING && s.height === LEADING)).toBeUndefined();
  });
});

describe('ListRowV4 (native) — the chevron means navigation', () => {
  it('draws no chevron on a row that does nothing', () => {
    const { queryAllByText } = renderThemed(<ListRowV4 title="Ada" />, SEED_LIGHT);
    expect(queryAllByText(CHEVRON, { includeHiddenElements: true })).toHaveLength(0);
  });

  it('draws one on a row that navigates', () => {
    const { queryAllByText } = renderThemed(
      <ListRowV4 title="Ada" onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(queryAllByText(CHEVRON, { includeHiddenElements: true })).toHaveLength(1);
  });

  it('lets a row that selects rather than navigates opt out', () => {
    const { queryAllByText } = renderThemed(
      <ListRowV4 title="Ada" onPress={() => undefined} chevron={false} />,
      SEED_LIGHT
    );
    expect(queryAllByText(CHEVRON, { includeHiddenElements: true })).toHaveLength(0);
  });

  it('lets a row whose navigation the component cannot see opt in', () => {
    const { queryAllByText } = renderThemed(<ListRowV4 title="Ada" chevron />, SEED_LIGHT);
    expect(queryAllByText(CHEVRON, { includeHiddenElements: true })).toHaveLength(1);
  });

  it('draws it as an icon on the type scale, in a slot that cannot be squeezed out', () => {
    const { getByText, UNSAFE_root: root } = renderThemed(
      <ListRowV4 title="Ada" onPress={() => undefined} />,
      SEED_LIGHT
    );
    const mark = flat(getByText(CHEVRON, { includeHiddenElements: true }).props.style);
    expect(mark.fontSize).toBe(theme.typography.scale.base);
    // A UI mark takes the `muted` slot, not `mutedText`: it is judged at 3:1
    // rather than as a run of text, and it is the one slot the web twin's
    // closed `IconColor` union can spell too.
    expect(mark.color).toBe(theme.light.muted);
    const trailing = viewStyles(root).find(
      (s) => s.flexDirection === 'row' && s.flexShrink === 0 && s.gap === theme.spacing.sm
    );
    expect(trailing).toBeDefined();
  });
});

describe('ListRowV4 (native) — press is the state layer', () => {
  it('tints the container instead of dimming the row', () => {
    const both = compileTheme(SEED_BOTH);
    const pressed = (scheme: 'light' | 'dark'): Record<string, unknown> => {
      const { UNSAFE_root: root } = renderThemed(
        <ListRowV4 title="Ada" onPress={() => undefined} />,
        SEED_BOTH,
        scheme
      );
      return rowStyle(root, true);
    };
    // `stateMix(card, onCard, 'pressed')` — the opaque flavour, because the
    // row's text carries a measured contrast promise against the fill it wears.
    expect(pressed('light').backgroundColor).toBe(
      stateMix(both.light.card, both.light.onCard, 'pressed', both.state)
    );
    expect(pressed('dark').backgroundColor).toBe(
      stateMix(both.dark.card, both.dark.onCard, 'pressed', both.state)
    );
    // `opacity: pressed ? 0.7 : 1` is deleted, not translated — dimming the
    // content is M3's *disabled* signal, so a pressed row looked dead.
    expect(pressed('light').opacity).toBeUndefined();
  });

  it('goes back to transparent at rest', () => {
    const { UNSAFE_root: root } = renderThemed(
      <ListRowV4 title="Ada" onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(rowStyle(root, false).backgroundColor).toBe('transparent');
  });

  it('paints the selected ground from the one token that ships a contrast pair', () => {
    const { UNSAFE_root: root } = renderThemed(<ListRowV4 title="Ada" selected />, SEED_LIGHT);
    expect(rowStyle(root).backgroundColor).toBe(theme.light.selected);
  });

  it('lets the press win over the selection while the finger is down', () => {
    const { UNSAFE_root: root } = renderThemed(
      <ListRowV4 title="Ada" selected onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(rowStyle(root, true).backgroundColor).toBe(
      stateMix(theme.light.selected, theme.light.onSelected, 'pressed', theme.state)
    );
  });
});

describe('ListRowV4 (native) — token purity', () => {
  it('paints nothing that is not a compiled token', () => {
    ([SEED_LIGHT, SEED_BOTH] as const).forEach((seed) => {
      const { UNSAFE_root: root } = renderThemed(
        <ListRowV4 title="Ada" meta="Engines" showAvatar={false} onPress={() => undefined} />,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });

  it('composes every metric from the spacing scale rather than typing it', () => {
    const { UNSAFE_root: root } = renderThemed(<ListRowV4 title="Ada" meta="Engines" />, SEED_LIGHT);
    const box = rowStyle(root);
    // The literals brief §1 names in this very file.
    expect(box.minHeight).not.toBe(48);
    expect(box.minHeight).toBe(theme.spacing['2xl'] + theme.spacing.lg);
    expect(box.paddingVertical).toBe(theme.spacing.sm);
  });
});

describe('ListRowV4 (native) — the empty state', () => {
  it('renders nothing rather than a blank band when it has nothing to show', () => {
    const { toJSON } = renderThemed(<ListRowV4 title="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('treats whitespace as empty', () => {
    const { toJSON } = renderThemed(<ListRowV4 title="   " meta="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('does not count the default avatar as content', () => {
    const { toJSON } = renderThemed(<ListRowV4 title="" showAvatar />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('still renders when only a slot has something to say', () => {
    const { getByText } = renderThemed(
      <ListRowV4 title="" action={<RNText>7</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('7')).toBeTruthy();
  });
});
