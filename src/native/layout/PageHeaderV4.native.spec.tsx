import * as React from 'react';
import { Text as RNText } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { PageHeaderV4 } from './PageHeaderV4';

const THEME = compileTheme(SEED_LIGHT);

/** Fraunces headings against Inter body — the seed that can tell the two apart. */
const BRANDED = compileTheme(SEED_DARK);

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

/** The outer block — the one box carrying §5's `spacing.lg` bottom padding. */
function block(root: ReactTestInstance): Record<string, unknown> {
  const hit = root.findAll((node) => {
    const style = flat((node.props as { style?: unknown } | undefined)?.style);
    return style.paddingBottom === THEME.spacing.lg && style.flexWrap === 'wrap';
  })[0];
  expect(hit).toBeDefined();
  return flat((hit.props as { style?: unknown }).style);
}

/** The title column — the one that carries the wrap basis. */
function titleColumn(root: ReactTestInstance): Record<string, unknown> {
  const hit = root.findAll((node) => {
    const style = flat((node.props as { style?: unknown } | undefined)?.style);
    return typeof style.flexBasis === 'number';
  })[0];
  expect(hit).toBeDefined();
  return flat((hit.props as { style?: unknown }).style);
}

/** Every rendered `Text` host node, in document order. */
function texts(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAllByType(RNText);
}

describe('PageHeaderV4 (native)', () => {
  // ── the headline decision: the hairline is gone ─────────────────────

  it('draws NO bottom border by default — §4.4’s change to the base', () => {
    // The base sets `borderBottomWidth: 1` unconditionally. §4.4: between
    // free-standing blocks the structuring device is space, not a rule.
    const { root } = renderThemed(
      <PageHeaderV4 title="Today" subtitle="Tuesday, 29 August" />,
      SEED_LIGHT
    );
    const style = block(root);
    expect(style.borderBottomWidth).toBeUndefined();
    expect(style.borderBottomColor).toBeUndefined();
  });

  it('puts the hairline back, verbatim, on `divided`', () => {
    const { root } = renderThemed(<PageHeaderV4 title="Today" divided />, SEED_LIGHT);
    const style = block(root);
    expect(style.borderBottomWidth).toBe(1);
    expect(style.borderBottomColor).toBe(THEME.light.border);
  });

  it('takes `divided={false}` explicitly and still draws nothing', () => {
    const { root } = renderThemed(<PageHeaderV4 title="Today" divided={false} />, SEED_LIGHT);
    expect(block(root).borderBottomWidth).toBeUndefined();
  });

  // ── empty states (§4.5) ────────────────────────────────────────────

  it('renders NOTHING with no title, no subtitle, no actions and no icon', () => {
    expect(renderThemed(<PageHeaderV4 title="" />, SEED_LIGHT).toJSON()).toBeNull();
    expect(
      renderThemed(<PageHeaderV4 title="" size="2xl" divided titleLines={2} />, SEED_LIGHT).toJSON()
    ).toBeNull();
  });

  it('renders a title on its own cleanly — no empty supporting line', () => {
    const { root, getByText } = renderThemed(<PageHeaderV4 title="Dashboard" />, SEED_LIGHT);
    expect(getByText('Dashboard')).toBeTruthy();
    expect(texts(root)).toHaveLength(1);
  });

  it('still renders when it has only actions to show', () => {
    const { root, getByText } = renderThemed(
      <PageHeaderV4 title="" actions={<RNText>New</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('New')).toBeTruthy();
    // The action's own text, and nothing the header set itself.
    expect(texts(root)).toHaveLength(1);
    expect(texts(root)[0].props.accessibilityRole).toBeUndefined();
  });

  it('renders a subtitle with no title, and no header role for a headline it lacks', () => {
    const { root, getByText } = renderThemed(
      <PageHeaderV4 title="" subtitle="Nothing scheduled" />,
      SEED_LIGHT
    );
    expect(getByText('Nothing scheduled')).toBeTruthy();
    const only = texts(root);
    expect(only).toHaveLength(1);
    expect(only[0].props.accessibilityRole).toBeUndefined();
    expect(flat(only[0].props.style).color).toBe(THEME.light.mutedText);
  });

  // ── typography (§5, matching `AuthHeadingV4`) ──────────────────────

  it('sets the title at `3xl`, bold, `onSurface`, and keeps the header role', () => {
    const { root } = renderThemed(<PageHeaderV4 title="Good morning" />, SEED_LIGHT);
    const title = texts(root)[0];
    const style = flat(title.props.style);
    expect(title.props.accessibilityRole).toBe('header');
    expect(style.fontSize).toBe(THEME.typography.scale['3xl']);
    expect(style.fontWeight).toBe('700');
    expect(style.color).toBe(THEME.light.onSurface);
  });

  it('asks `TextV4` for the seed’s HEADING face by prop, as `AuthHeadingV4` does', () => {
    const { root } = renderThemed(
      <PageHeaderV4 title="Good morning" subtitle="Tuesday" />,
      SEED_DARK
    );
    const [title, subtitle] = texts(root);
    expect(flat(title.props.style).fontFamily).toBe(BRANDED.typography.fontHeading);
    // …and the pairing is stated, not inherited: the subtitle is the body face.
    expect(flat(subtitle.props.style).fontFamily).toBe(BRANDED.typography.fontBody);
    expect(BRANDED.typography.fontHeading).not.toBe(BRANDED.typography.fontBody);
  });

  it('takes a smaller headline step when asked', () => {
    const { root } = renderThemed(<PageHeaderV4 title="Settings" size="2xl" />, SEED_LIGHT);
    expect(flat(texts(root)[0].props.style).fontSize).toBe(THEME.typography.scale['2xl']);
  });

  it('sets the subtitle at `base` in `mutedText`, not the decorative `muted` slot', () => {
    // `muted` carries no contrast promise against `surface`; `mutedText` is
    // the same quietness walked until it clears AA. The base used `sm` +
    // `colors.muted` — a fill used as a text colour.
    const { root } = renderThemed(
      <PageHeaderV4 title="Today" subtitle="Tuesday, 29 August" />,
      SEED_LIGHT
    );
    const style = flat(texts(root)[1].props.style);
    expect(style.fontSize).toBe(THEME.typography.scale.base);
    expect(style.color).toBe(THEME.light.mutedText);
  });

  // ── rhythm (§4.1) ──────────────────────────────────────────────────

  it('pads the block by `spacing.lg` below and sits `spacing.md` from its actions', () => {
    const { root } = renderThemed(
      <PageHeaderV4 title="Today" actions={<RNText>New</RNText>} />,
      SEED_LIGHT
    );
    const style = block(root);
    // The base padded by `md`; §5 asks for `lg`.
    expect(style.paddingBottom).toBe(THEME.spacing.lg);
    expect(style.paddingBottom).not.toBe(THEME.spacing.md);
    expect(style.gap).toBe(THEME.spacing.md);
    expect(style.alignItems).toBe('flex-start');
  });

  it('sets `spacing.xs` between the title and its supporting line — §4.1', () => {
    const { root } = renderThemed(<PageHeaderV4 title="Today" subtitle="Tuesday" />, SEED_LIGHT);
    const column = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.gap === THEME.spacing.xs;
    });
    expect(column.length).toBeGreaterThan(0);
  });

  // ── actions (§5) ───────────────────────────────────────────────────

  it('lets a wide actions node wrap below the title instead of crushing it', () => {
    // §5. The row wraps, and the title column asks for a basis composed from
    // the spacing scale — `2xl × 4` is 192 at the default scale.
    expect(THEME.spacing['2xl'] * 4).toBe(192);
    const { root } = renderThemed(
      <PageHeaderV4 title="Today" actions={<RNText>New</RNText>} />,
      SEED_LIGHT
    );
    expect(block(root).flexWrap).toBe('wrap');
    const column = titleColumn(root);
    expect(column.flexBasis).toBe(THEME.spacing['2xl'] * 4);
    expect(column.flexGrow).toBe(1);
  });

  it('renders actions in a slot that does not shrink', () => {
    const { root, getByText } = renderThemed(
      <PageHeaderV4 title="Today" actions={<RNText>New</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('New')).toBeTruthy();
    const slots = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.flexShrink === 0;
    });
    expect(slots.length).toBeGreaterThan(0);
  });

  // ── the leading badge (§4.7) ───────────────────────────────────────

  it('renders a named `icon` as §4.7’s 44 soft circular badge', () => {
    const { root } = renderThemed(<PageHeaderV4 title="Notifications" icon="bell" />, SEED_LIGHT);
    // The kit's named set resolves `bell`. The glyph is hidden from the screen
    // reader — the title already says what the screen is — so it is read off
    // the tree rather than through a query that skips hidden nodes.
    const glyphs = texts(root).filter((t) => t.props.children === '🔔');
    expect(glyphs).toHaveLength(1);
    const badges = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.width === 44 && style.height === 44;
    });
    expect(badges.length).toBeGreaterThan(0);
  });

  it('passes any other icon node through exactly as given', () => {
    const { root, getByText } = renderThemed(
      <PageHeaderV4 title="Team" icon={<RNText>AB</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('AB')).toBeTruthy();
    const badges = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.width === 44;
    });
    expect(badges).toHaveLength(0);
  });

  it('draws no badge at all when there is no icon', () => {
    const { root } = renderThemed(<PageHeaderV4 title="Team" />, SEED_LIGHT);
    const badges = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.width === 44;
    });
    expect(badges).toHaveLength(0);
  });

  // ── clamping ───────────────────────────────────────────────────────

  it('never clamps unasked, and clamps each line independently when asked', () => {
    const bare = renderThemed(
      <PageHeaderV4 title="A screen title long enough to wrap" subtitle="And a subtitle" />,
      SEED_LIGHT
    );
    texts(bare.root).forEach((t) => expect(t.props.numberOfLines).toBeUndefined());

    const clamped = renderThemed(
      <PageHeaderV4
        title="A screen title long enough to wrap"
        subtitle="And a subtitle long enough to wrap too"
        titleLines={2}
      />,
      SEED_LIGHT
    );
    const [title, subtitle] = texts(clamped.root);
    expect(title.props.numberOfLines).toBe(2);
    // Asking for one does not silently clamp the other.
    expect(subtitle.props.numberOfLines).toBeUndefined();
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('takes a style for layout and forwards the rest of its props', () => {
    const { root } = renderThemed(
      <PageHeaderV4 title="Today" style={{ marginBottom: 12 }} testID="screen-header" />,
      SEED_LIGHT
    );
    const hit = root.findAll((node) => node.props?.testID === 'screen-header')[0];
    expect(hit).toBeDefined();
    const style = flat(hit?.props.style);
    expect(style.marginBottom).toBe(12);
    // The caller's style rides on top without taking the block's own rhythm.
    expect(style.paddingBottom).toBe(THEME.spacing.lg);
  });

  it('paints nothing with a literal — every colour traces to a compiled token', () => {
    const { root } = renderThemed(
      // No `icon` here on purpose: a badged `IconV4` composites its own ground
      // with `mixToken`, which is the theme arithmetic rather than a literal,
      // and `IconV4`'s own spec is where that is asserted.
      <PageHeaderV4
        title="Today"
        subtitle="Tuesday, 29 August"
        divided
        actions={<RNText>New</RNText>}
      />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
