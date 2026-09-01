import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { ICON_GLYPHS } from '../../primitives/icon-names';
import { ButtonV4 } from '../primitives/ButtonV4';
import { EmptyState } from './EmptyState';
import { EmptyState as PrimitiveEmptyState } from '../primitives/EmptyState';
import { COMMERCE_EMPTY_PRESETS, EmptyStateV4 } from './EmptyStateV4';
import type { CommerceEmptyKind } from './EmptyStateV4';

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

const KINDS = Object.keys(COMMERCE_EMPTY_PRESETS) as CommerceEmptyKind[];

describe('EmptyStateV4 (commerce, native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  // ── it composes the primitive, it does not redraw it ─────────────────

  it('renders the primitive EmptyStateV4 rather than a second empty state', () => {
    const { root, getByText } = renderThemed(<EmptyStateV4 kind="cart" />, SEED_LIGHT);
    expect(getByText(COMMERCE_EMPTY_PRESETS.cart.title)).toBeTruthy();
    // The primitive's V4 line: no dashed placeholder box (§11, §8)…
    styles(root).forEach((s) => expect(s.borderStyle).not.toBe('dashed'));
    // …the title on the heading face…
    expect(flat(getByText(COMMERCE_EMPTY_PRESETS.cart.title).props.style).fontFamily).toBe(
      theme.typography.fontHeading
    );
    // …and the copy in `mutedText` — the slot with a contrast promise —
    // rather than whatever the caller's ground happens to be.
    const copy = flat(getByText(COMMERCE_EMPTY_PRESETS.cart.description).props.style);
    expect(copy.color).toBe(theme.light.mutedText);
  });

  it('is a different component from `commerce/EmptyState`, which is the primitive re-exported', () => {
    expect(EmptyState).toBe(PrimitiveEmptyState);
    expect((EmptyStateV4 as unknown) === (PrimitiveEmptyState as unknown)).toBe(false);
  });

  // ── the new prop ────────────────────────────────────────────────────

  it('supplies a headline, a supporting line and a glyph for each of the five kinds', () => {
    KINDS.forEach((kind) => {
      const preset = COMMERCE_EMPTY_PRESETS[kind];
      const { getByText } = renderThemed(<EmptyStateV4 kind={kind} />, SEED_LIGHT);
      expect(getByText(preset.title)).toBeTruthy();
      expect(getByText(preset.description)).toBeTruthy();
      // The glyph lives inside the hidden subtree — that is the point of it.
      expect(getByText(ICON_GLYPHS[preset.icon], { includeHiddenElements: true })).toBeTruthy();
    });
  });

  it('gives the glyph the soft tinted circular badge §4.7 asks for', () => {
    const { root } = renderThemed(<EmptyStateV4 kind="cart" />, SEED_LIGHT);
    // A round, tinted, at-least-44 ground — the badge, not a bare glyph.
    const badge = styles(root).find(
      (s) => typeof s.borderRadius === 'number' && s.backgroundColor !== undefined
    );
    expect(badge).toBeDefined();
    expect(Number(badge?.minWidth ?? badge?.width ?? 0)).toBeGreaterThanOrEqual(44);
  });

  it('reads the shared preset table, so both twins say the same thing', () => {
    // The table is `commerce/internal/empty-v4.ts`, imported by both twins;
    // this asserts the native component actually renders it verbatim rather
    // than carrying a paraphrase of its own.
    KINDS.forEach((kind) => {
      const preset = COMMERCE_EMPTY_PRESETS[kind];
      const { getByText } = renderThemed(<EmptyStateV4 kind={kind} />, SEED_DARK);
      expect(getByText(preset.title).props.children).toBe(preset.title);
      expect(getByText(preset.description).props.children).toBe(preset.description);
    });
  });

  it('lets the caller beat every part of a preset', () => {
    const { getByText, queryByText } = renderThemed(
      <EmptyStateV4
        kind="cart"
        title="Nothing here yet"
        description="Have a browse."
        icon={<Text>▲</Text>}
      />,
      SEED_LIGHT
    );
    expect(getByText('Nothing here yet')).toBeTruthy();
    expect(getByText('Have a browse.')).toBeTruthy();
    expect(queryByText(COMMERCE_EMPTY_PRESETS.cart.title)).toBeNull();
    // A caller's illustration is passed through untouched — not re-badged.
    expect(getByText('▲', { includeHiddenElements: true })).toBeTruthy();
    expect(queryByText(ICON_GLYPHS.cart, { includeHiddenElements: true })).toBeNull();
  });

  it('is exactly the primitive when given no kind', () => {
    const { getByText, queryByText } = renderThemed(
      <EmptyStateV4 title="No results" description="Try again." />,
      SEED_LIGHT
    );
    expect(getByText('No results')).toBeTruthy();
    expect(queryByText(ICON_GLYPHS.search, { includeHiddenElements: true })).toBeNull();
  });

  it('gives the action the terminal slot §15 asks for', () => {
    const { getByText, root } = renderThemed(
      <EmptyStateV4 kind="cart" action={<ButtonV4>Browse products</ButtonV4>} />,
      SEED_DARK
    );
    expect(getByText('Browse products')).toBeTruthy();
    // Separated by the largest gap in the component.
    const gaps = styles(root)
      .map((s) => s.marginTop)
      .filter((v): v is number => typeof v === 'number');
    expect(Math.max(...gaps)).toBe(compileTheme(SEED_DARK).spacing.lg);
  });

  // ── the empty case (§4.5) ───────────────────────────────────────────

  it('renders nothing when it has nothing to say — no title and no kind', () => {
    const { toJSON } = renderThemed(<EmptyStateV4 />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('renders nothing for an empty-string title with no kind to fall back on', () => {
    const { toJSON } = renderThemed(
      <EmptyStateV4 title="" description="orphaned copy" />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeNull();
  });

  it('survives having no description, no icon and no action', () => {
    const { getByText, queryByText } = renderThemed(<EmptyStateV4 title="No orders" />, SEED_LIGHT);
    expect(getByText('No orders')).toBeTruthy();
    expect(queryByText('Browse products')).toBeNull();
  });

  // ── the accessible label ────────────────────────────────────────────

  it('hides the decorative glyph so the copy is the announcement', () => {
    const { root } = renderThemed(<EmptyStateV4 kind="orders" />, SEED_LIGHT);
    const hidden = root.findAll((n) => n.props?.accessibilityElementsHidden === true);
    expect(hidden.length).toBeGreaterThan(0);
    expect(hidden[0]?.props.importantForAccessibility).toBe('no-hide-descendants');
  });
});
