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
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { ActivityFeedV4, type ActivityItemV4 } from './ActivityFeedV4';

const theme = compileTheme(SEED_LIGHT);

/** The one-line and two-line floors, composed the way the row module composes them. */
const ONE_LINE = theme.spacing['2xl'] + theme.spacing.sm;
const TWO_LINE = theme.spacing['2xl'] + theme.spacing.lg;
/** The 44 leading slot — `2xl - xs`, the nav line's `minTap`. */
const LEADING = theme.spacing['2xl'] - theme.spacing.xs;
/** Where an inset rule starts: the row title's leading edge. */
const SEPARATOR_INSET = LEADING + theme.spacing.md;
const BOLT = resolveIconGlyph('bolt');

const ITEMS: ActivityItemV4[] = [
  { id: '1', title: 'Invoice paid', meta: 'by Ada · Billing', time: '2h ago' },
  { id: '2', title: 'Seat added', meta: 'by Grace · Team', time: '4h ago' },
  { id: '3', title: 'Plan upgraded', time: 'yesterday' },
];

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

/** Index into a list with the bounds check the strict config wants. */
function at<T>(list: T[], index: number): T {
  const item = list[index];
  expect(item).toBeDefined();
  return item as T;
}

/** Every host view in the tree, as flattened styles. */
function viewStyles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style));
}

/**
 * The feed's rows: the labelled host boxes, pressable or not.
 *
 * `typeof n.type === 'string'` keeps the composite element and the host view it
 * renders from both matching and doubling every count.
 */
function rowNodes(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll(
    (n) =>
      typeof n.type === 'string' &&
      typeof n.props?.accessibilityLabel === 'string' &&
      n.props?.style !== undefined
  );
}

/**
 * The `Pressable`s whose `style` is still a function of the press state.
 *
 * The host view underneath carries the already-resolved style, so the pressed
 * ground can only be read off the function itself.
 */
function pressableNodes(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll(
    (n) => typeof n.props?.style === 'function' && n.props?.onPress !== undefined
  );
}

/** One row's resolved box, pressed or at rest. */
function rowStyle(node: ReactTestInstance, pressed = false): Record<string, unknown> {
  const style = node.props.style as unknown;
  return typeof style === 'function'
    ? flat((style as (s: { pressed: boolean }) => unknown)({ pressed }))
    : flat(style);
}

/** Every 1-unit rule in the tree — `ListSeparatorV4`'s one and only spelling. */
function separators(root: ReactTestInstance): Record<string, unknown>[] {
  return viewStyles(root).filter((s) => s.height === 1 && s.backgroundColor === theme.light.border);
}

/**
 * Every glyph and label in the tree, hidden ones included — a decorative badge
 * carries `no-hide-descendants`, which the library's own queries skip.
 */
function renderedText(root: ReactTestInstance): string[] {
  return root
    .findAll((n) => n.type === 'Text' && typeof n.props?.children === 'string')
    .map((n) => n.props.children as string);
}

/** Every `TextV4` in the tree, by the props it was asked for. */
function toneProps(root: ReactTestInstance): { size?: string; tone?: string; weight?: string }[] {
  return root
    .findAll((n) => n.type === TextV4)
    .map((n) => n.props as { size?: string; tone?: string; weight?: string });
}

describe('ActivityFeedV4 (native) — props', () => {
  it('keeps every base prop working and adds only optional ones', () => {
    const { getByText } = renderThemed(
      <ActivityFeedV4 items={ITEMS} title="Recent activity" />,
      SEED_LIGHT
    );
    expect(getByText('Recent activity')).toBeTruthy();
    expect(getByText('Invoice paid')).toBeTruthy();
    expect(getByText('by Ada · Billing')).toBeTruthy();
    expect(getByText('2h ago')).toBeTruthy();
  });

  it('merges the caller’s `style` onto its own box, last', () => {
    const { UNSAFE_root: root } = renderThemed(
      <ActivityFeedV4 items={ITEMS} style={{ marginTop: 12 }} />,
      SEED_LIGHT
    );
    expect(at(viewStyles(root), 0).marginTop).toBe(12);
    // §4.1: `md` between a card header and its body — not the base's `sm`.
    expect(at(viewStyles(root), 0).gap).toBe(theme.spacing.md);
  });

  it('renders one row per item, in order', () => {
    const { UNSAFE_root: root } = renderThemed(<ActivityFeedV4 items={ITEMS} />, SEED_LIGHT);
    const rows = rowNodes(root);
    expect(rows).toHaveLength(3);
    expect(at(rows, 0).props.accessibilityLabel).toBe('Invoice paid, by Ada · Billing, 2h ago');
    expect(at(rows, 2).props.accessibilityLabel).toBe('Plan upgraded, yesterday');
  });

  it('sets the heading at the Section ramp and takes a §5 action beside it', () => {
    const { getByText, UNSAFE_root: root } = renderThemed(
      <ActivityFeedV4 items={ITEMS} title="Recent activity" action={<RNText>See all</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('See all')).toBeTruthy();
    const head = at(toneProps(root), 0);
    expect(head.size).toBe('lg');
    expect(head.weight).toBe('bold');
    expect(head.tone).toBe('onSurface');
  });
});

describe('ActivityFeedV4 (native) — every entry is a row of the family (§4.3)', () => {
  it('composes 56 / 72 from the scale rather than typing 56 or 48', () => {
    const { UNSAFE_root: root } = renderThemed(<ActivityFeedV4 items={ITEMS} />, SEED_LIGHT);
    const rows = rowNodes(root);
    expect(rowStyle(at(rows, 0)).minHeight).toBe(TWO_LINE);
    expect(rowStyle(at(rows, 2)).minHeight).toBe(ONE_LINE);
    rows.forEach((r) => {
      const box = rowStyle(r);
      expect(box.paddingHorizontal).toBe(theme.spacing.md);
      expect(box.gap).toBe(theme.spacing.md);
      expect(box.minHeight).not.toBe(48);
    });
  });

  it('keeps every row’s ground transparent and its corners square', () => {
    const { UNSAFE_root: root } = renderThemed(<ActivityFeedV4 items={ITEMS} />, SEED_LIGHT);
    rowNodes(root).forEach((r) => {
      expect(rowStyle(r).backgroundColor).toBe('transparent');
      expect(rowStyle(r).borderRadius).toBeUndefined();
    });
  });

  it('gives the text column the module’s `xs` gap, not a `gap: 2`', () => {
    const { UNSAFE_root: root } = renderThemed(<ActivityFeedV4 items={ITEMS} />, SEED_LIGHT);
    const column = viewStyles(root).find((s) => s.flex === 1 && s.gap !== undefined);
    expect(column?.gap).toBe(theme.spacing.xs);
    expect(column?.gap).not.toBe(2);
  });

  it('asks for `mutedText`, never the `muted` FILL — the bug the base shipped', () => {
    const { UNSAFE_root: root } = renderThemed(<ActivityFeedV4 items={ITEMS} />, SEED_LIGHT);
    const tones = toneProps(root);
    // Row one: title `base`/semibold, meta `sm`/mutedText, stamp `xs`/mutedText.
    expect(at(tones, 0).size).toBe('base');
    expect(at(tones, 0).weight).toBe('semibold');
    expect(at(tones, 0).tone).toBe('onSurface');
    expect(at(tones, 1).size).toBe('sm');
    expect(at(tones, 1).tone).toBe('mutedText');
    expect(at(tones, 2).size).toBe('xs');
    expect(at(tones, 2).tone).toBe('mutedText');
    tones.forEach((t) => expect(t.tone).not.toBe('muted'));
  });
});

describe('ActivityFeedV4 (native) — the badge replaces the dot (§4.3 / §4.7)', () => {
  it('gives every row a 44 slot with a tinted circular badge, never an 8×8 dot', () => {
    const { UNSAFE_root: root } = renderThemed(<ActivityFeedV4 items={ITEMS} />, SEED_LIGHT);
    // The slot: a fixed 44 square that never shrinks.
    const slots = viewStyles(root).filter(
      (s) => s.width === LEADING && s.height === LEADING && s.flexShrink === 0
    );
    expect(slots).toHaveLength(ITEMS.length);
    expect(LEADING).toBe(44);
    // What sits in it: a filled circle at least as wide as the slot — §4.7's
    // badge, which an 8×8 dot could never be.
    const badges = viewStyles(root).filter(
      (s) =>
        typeof s.width === 'number' &&
        s.width === s.height &&
        s.borderRadius === (s.width as number) / 2 &&
        typeof s.backgroundColor === 'string' &&
        s.backgroundColor !== 'transparent'
    );
    expect(badges).toHaveLength(ITEMS.length);
    badges.forEach((b) => expect(b.width).toBeGreaterThanOrEqual(LEADING));
    expect(renderedText(root).filter((t) => t === BOLT)).toHaveLength(ITEMS.length);
    // The base's two literals are gone with the dot.
    viewStyles(root).forEach((s) => {
      expect(s.marginTop).not.toBe(6);
      expect(s.width === 8 && s.height === 8).toBe(false);
    });
  });

  it('takes a per-item `icon` and §4.7 `tone`', () => {
    const { UNSAFE_root: root } = renderThemed(
      <ActivityFeedV4 items={[{ id: '1', title: 'Refund issued', icon: 'card', tone: 'warn' }]} />,
      SEED_LIGHT
    );
    expect(renderedText(root)).toContain(resolveIconGlyph('card'));
    expect(renderedText(root)).not.toContain(BOLT);
  });
});

describe('ActivityFeedV4 (native) — one grouped container, inset rules (§4.3 / §4.4)', () => {
  it('puts the rows in a single flush card rather than a stack of cards', () => {
    const { UNSAFE_root: root } = renderThemed(<ActivityFeedV4 items={ITEMS} />, SEED_LIGHT);
    const card = viewStyles(root).find(
      (s) => s.backgroundColor === theme.light.card && s.borderRadius === theme.radius.lg
    );
    expect(card).toBeDefined();
    // Flush: the rows pay the padding, the card pays none, and the corners clip.
    expect(card?.padding).toBe(0);
    expect(card?.overflow).toBe('hidden');
    // Exactly one card — the rows do not paint their own.
    expect(
      viewStyles(root).filter((s) => s.backgroundColor === theme.light.card)
    ).toHaveLength(1);
  });

  it('rules between rows only, inset to clear the 44 leading slot', () => {
    const { UNSAFE_root: root } = renderThemed(<ActivityFeedV4 items={ITEMS} />, SEED_LIGHT);
    const rules = separators(root);
    expect(rules).toHaveLength(ITEMS.length - 1);
    rules.forEach((r) => {
      expect(r.marginLeft).toBe(SEPARATOR_INSET);
      // §4.4: one weight, never a tinted rule.
      expect(r.borderWidth).toBeUndefined();
      expect(r.opacity).toBeUndefined();
    });
  });

  it('draws no rule at all for a list of one', () => {
    const { UNSAFE_root: root } = renderThemed(
      <ActivityFeedV4 items={[at(ITEMS, 0)]} />,
      SEED_LIGHT
    );
    expect(separators(root)).toHaveLength(0);
  });
});

describe('ActivityFeedV4 (native) — the timestamp (§4.3)', () => {
  it('top-aligns on a two-line row and centres on a one-line row', () => {
    const trailing = (items: ActivityItemV4[]): Record<string, unknown> | undefined => {
      const { UNSAFE_root: root } = renderThemed(<ActivityFeedV4 items={items} />, SEED_LIGHT);
      return viewStyles(root).find((s) => s.flexShrink === 0 && s.flexDirection === 'row');
    };
    expect(trailing([at(ITEMS, 0)])?.alignSelf).toBe('flex-start');
    expect(trailing([at(ITEMS, 2)])?.alignSelf).toBeUndefined();
  });

  it('draws no trailing column on a row with no stamp', () => {
    const { UNSAFE_root: root } = renderThemed(
      <ActivityFeedV4 items={[{ id: '1', title: 'Something happened' }]} />,
      SEED_LIGHT
    );
    expect(
      viewStyles(root).find((s) => s.flexShrink === 0 && s.flexDirection === 'row')
    ).toBeUndefined();
  });
});

describe('ActivityFeedV4 (native) — press is the state layer (§4.3)', () => {
  it('is inert by default: no pressable, no state layer', () => {
    const { UNSAFE_root: root } = renderThemed(<ActivityFeedV4 items={ITEMS} />, SEED_LIGHT);
    expect(pressableNodes(root)).toHaveLength(0);
  });

  it('tints the container with the opaque card pair and never dims the content', () => {
    const seen: string[] = [];
    const { UNSAFE_root: root, getByText } = renderThemed(
      <ActivityFeedV4 items={ITEMS} onItemPress={(item) => seen.push(item.id)} />,
      SEED_LIGHT
    );
    const first = at(pressableNodes(root), 0);
    expect(rowStyle(first, true).backgroundColor).toBe(
      stateMix(theme.light.card, theme.light.onCard, 'pressed', theme.state)
    );
    // `opacity: pressed ? 0.7 : 1` is deleted, not translated.
    expect(rowStyle(first, true).opacity).toBeUndefined();
    expect(rowStyle(first, false).backgroundColor).toBe('transparent');

    fireEvent.press(getByText('Invoice paid'));
    expect(seen).toEqual(['1']);
  });
});

describe('ActivityFeedV4 (native) — empty states (§4.5)', () => {
  it('routes zero items through EmptyStateV4, with no card and no rules', () => {
    const { getByText, UNSAFE_root: root } = renderThemed(
      <ActivityFeedV4 items={[]} />,
      SEED_LIGHT
    );
    expect(getByText('No activity yet')).toBeTruthy();
    expect(getByText('Activity will appear here as things happen.')).toBeTruthy();
    expect(rowNodes(root)).toHaveLength(0);
    expect(separators(root)).toHaveLength(0);
    expect(
      viewStyles(root).find((s) => s.backgroundColor === theme.light.card)
    ).toBeUndefined();
    // The V4 empty state dropped the dashed placeholder box; nothing re-adds it.
    expect(viewStyles(root).find((s) => s.borderStyle === 'dashed')).toBeUndefined();
  });

  it('takes the empty state’s headline, illustration and single CTA', () => {
    const { getByText, UNSAFE_root } = renderThemed(
      <ActivityFeedV4
        items={[]}
        emptyTitle="Nothing here yet"
        emptyMessage="Invite a teammate to get things moving."
        emptyIcon={<RNText>icon</RNText>}
        emptyAction={<RNText>Invite</RNText>}
      />,
      SEED_LIGHT
    );
    expect(getByText('Nothing here yet')).toBeTruthy();
    expect(getByText('Invite a teammate to get things moving.')).toBeTruthy();
    expect(renderedText(UNSAFE_root)).toContain('icon');
    expect(getByText('Invite')).toBeTruthy();
  });

  it('keeps the heading above an empty feed, and draws none when unasked', () => {
    const withTitle = renderThemed(
      <ActivityFeedV4 items={[]} title="Recent activity" />,
      SEED_LIGHT
    );
    expect(withTitle.getByText('Recent activity')).toBeTruthy();
    expect(withTitle.getByText('No activity yet')).toBeTruthy();

    const bare = renderThemed(<ActivityFeedV4 items={ITEMS} />, SEED_LIGHT);
    expect(
      bare.UNSAFE_root.findAll((n) => n.props?.accessibilityRole === 'header')
    ).toHaveLength(0);
  });

  it('survives an item with nothing but a title', () => {
    const { getByText, UNSAFE_root: root } = renderThemed(
      <ActivityFeedV4 items={[{ id: '1', title: 'Something happened' }]} />,
      SEED_LIGHT
    );
    expect(getByText('Something happened')).toBeTruthy();
    expect(toneProps(root)).toHaveLength(1);
  });
});

describe('ActivityFeedV4 (native) — token purity', () => {
  it('paints nothing that is not a compiled token or a badge derived from two', () => {
    ([SEED_LIGHT, SEED_BOTH] as const).forEach((seed) => {
      // A soft badge's ground is a `mixToken` of two tokens and its ink is
      // `ensureContrast`-walked — derivations OF tokens rather than tokens.
      // Rendering the badge alone under the same seed is what tells the two
      // apart without copying `IconV4`'s arithmetic into this file.
      const badgeOnly = renderThemed(
        <IconV4 name="bolt" color="primary" badge="soft" size="base" />,
        seed
      );
      const allowed = new Set([
        ...tokenHexSet(seed),
        ...renderedStyleHexes(badgeOnly.UNSAFE_root),
      ]);
      const { UNSAFE_root: root } = renderThemed(
        <ActivityFeedV4 items={ITEMS} title="Recent activity" onItemPress={() => undefined} />,
        seed
      );
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
