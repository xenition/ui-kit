import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_DARK,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { ICON_GLYPHS } from '../../primitives/icon-names';
import { STATUS_PREFIX } from '../../commerce/internal/status-v4';
import { STATUS_ANATOMY, StatusBadgeV4 } from './StatusBadgeV4';
import type { OrderStatus } from './StatusBadge';

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

function styles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style));
}

const STATUSES = Object.keys(STATUS_ANATOMY) as OrderStatus[];
const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

describe('StatusBadgeV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  // ── rule 6: never colour alone ──────────────────────────────────────

  it('gives every status an icon AND a word', () => {
    STATUSES.forEach((status) => {
      const { getByText } = renderThemed(<StatusBadgeV4 status={status} />, SEED_LIGHT);
      // The glyph is decorative, so it sits in the hidden subtree — that is
      // exactly the point of it.
      expect(
        getByText(ICON_GLYPHS[STATUS_ANATOMY[status].icon], { includeHiddenElements: true })
      ).toBeTruthy();
      expect(getByText(cap(status))).toBeTruthy();
    });
  });

  it('stays legible with the colour removed — the greyscale read', () => {
    // The claim rule 6 actually makes: strip the tone and the six statuses are
    // still six different badges, because the glyph and the word carry them.
    const marks = STATUSES.map((s) => `${ICON_GLYPHS[STATUS_ANATOMY[s].icon]}|${s}`);
    expect(new Set(marks).size).toBe(STATUSES.length);
  });

  it('reads the same anatomy table as the web twin', () => {
    // The table lives in `commerce/internal/status-v4.ts` and both twins
    // import it, so "shipped" cannot be one mark on a phone and another on
    // the web.
    expect(STATUS_ANATOMY.paid.tone).toBe('success');
    expect(STATUS_ANATOMY.fulfilled.tone).toBe('success');
    expect(STATUS_ANATOMY.cancelled.tone).toBe('danger');
    expect(STATUS_ANATOMY.pending.tone).toBe('warn');
    expect(STATUS_ANATOMY.shipped.tone).toBe('primary');
    expect(STATUS_ANATOMY.refunded.tone).toBe('neutral');
    // Never `muted`: the native BadgeTone has no such member, and picking from
    // the wider web union is how a shared table stops compiling on one twin.
    STATUSES.forEach((s) => expect(STATUS_ANATOMY[s].tone).not.toBe('muted'));
  });

  it('draws the glyph and the word in the badge’s own on-pair', () => {
    ([
      ['paid', 'onSuccess'],
      ['pending', 'onWarn'],
      ['shipped', 'onPrimary'],
      ['cancelled', 'onDanger'],
      ['refunded', 'onSurface'],
    ] as const).forEach(([status, ink]) => {
      const { getByText } = renderThemed(<StatusBadgeV4 status={status} />, SEED_LIGHT);
      expect(flat(getByText(cap(status)).props.style).color).toBe(theme.light[ink]);
      expect(
        flat(
          getByText(ICON_GLYPHS[STATUS_ANATOMY[status].icon], { includeHiddenElements: true })
            .props.style
        ).color
      ).toBe(theme.light[ink]);
    });
  });

  // ── it composes BadgeV4 ─────────────────────────────────────────────

  it('is a BadgeV4, so the shape follows the seed instead of defaulting to a pill', () => {
    const { root } = renderThemed(<StatusBadgeV4 status="paid" />, SEED_LIGHT);
    const pill = styles(root).find((s) => s.backgroundColor === theme.light.success);
    expect(pill).toBeDefined();
    // A word is a tag: `radius.sm`, not the capsule the base hard-coded.
    expect(pill?.borderRadius).toBe(theme.radius.sm);
    expect(pill?.borderRadius).not.toBe(theme.radius.full);
    // …and the base's literal `paddingVertical: 2` is gone with it.
    expect(pill?.paddingVertical).toBeUndefined();
    expect(pill?.minHeight).toBe(theme.spacing.lg);
  });

  it('takes the two badge sizes, defaulting to md', () => {
    const md = renderThemed(<StatusBadgeV4 status="paid" />, SEED_LIGHT);
    const sm = renderThemed(<StatusBadgeV4 status="paid" size="sm" />, SEED_LIGHT);
    const heightOf = (r: ReactTestInstance): unknown =>
      styles(r).find((s) => s.backgroundColor === theme.light.success)?.minHeight;
    expect(heightOf(md.root)).toBe(theme.spacing.lg);
    expect(heightOf(sm.root)).toBe(theme.spacing.md + theme.spacing.xs);
  });

  // ── the new props ───────────────────────────────────────────────────

  it('takes a glyph override without losing the word or the tone', () => {
    const { getByText, root } = renderThemed(
      <StatusBadgeV4 status="shipped" iconName="location" />,
      SEED_LIGHT
    );
    expect(getByText(ICON_GLYPHS.location, { includeHiddenElements: true })).toBeTruthy();
    expect(getByText('Shipped')).toBeTruthy();
    expect(styles(root).some((s) => s.backgroundColor === theme.light.primary)).toBe(true);
  });

  it('lets a caller replace the word', () => {
    const { getByText, queryByText } = renderThemed(
      <StatusBadgeV4 status="fulfilled">Ready for pickup</StatusBadgeV4>,
      SEED_LIGHT
    );
    expect(getByText('Ready for pickup')).toBeTruthy();
    expect(queryByText('Fulfilled')).toBeNull();
    expect(getByText(ICON_GLYPHS.tag, { includeHiddenElements: true })).toBeTruthy();
  });

  it('takes a node as its label without trying to typeset it', () => {
    const { getByText } = renderThemed(
      <StatusBadgeV4 status="paid">
        <Text>Paid in full</Text>
      </StatusBadgeV4>,
      SEED_LIGHT
    );
    expect(getByText('Paid in full')).toBeTruthy();
  });

  // ── the accessible label ────────────────────────────────────────────

  it('announces "Order status: X" as one element rather than a bare word', () => {
    const { getByLabelText } = renderThemed(<StatusBadgeV4 status="paid" />, SEED_LIGHT);
    const el = getByLabelText(`${STATUS_PREFIX}Paid`);
    // One element: the glyph is collapsed into it, so nothing reads out the
    // emoji's name before the status.
    expect(el.props.accessible).toBe(true);
    expect(el.props.accessibilityRole).toBe('text');
  });

  it('falls back to the status word when the label is a node it cannot read', () => {
    const { getByLabelText } = renderThemed(
      <StatusBadgeV4 status="refunded">
        <Text>Money returned</Text>
      </StatusBadgeV4>,
      SEED_LIGHT
    );
    expect(getByLabelText(`${STATUS_PREFIX}Refunded`)).toBeTruthy();
  });

  // ── the empty case ──────────────────────────────────────────────────

  it('has no empty case that renders a blank pill — a status is always a word', () => {
    // `status` is required and the label falls back to the status itself, so
    // the badge can never be an empty coloured rectangle.
    const { getByText, getByLabelText } = renderThemed(
      <StatusBadgeV4 status="refunded">{undefined}</StatusBadgeV4>,
      SEED_LIGHT
    );
    expect(getByText('Refunded')).toBeTruthy();
    expect(getByText(ICON_GLYPHS.refresh, { includeHiddenElements: true })).toBeTruthy();
    expect(getByLabelText(`${STATUS_PREFIX}Refunded`)).toBeTruthy();
  });

  // ── token purity ────────────────────────────────────────────────────

  it('every rendered hex traces to a compiled token, in both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const allowed = tokenHexSet(seed);
      STATUSES.forEach((status) => {
        const { root } = renderThemed(<StatusBadgeV4 status={status} />, seed);
        const found = renderedStyleHexes(root);
        expect(found.length).toBeGreaterThan(0);
        found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
      });
    });
  });
});
