import * as React from 'react';
import { Text as RNText, View } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { AuthCardV4 } from './AuthCardV4';

const THEME = compileTheme(SEED_LIGHT);

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

/** Every `View` in the tree whose flattened style matches a predicate. */
function viewsWhere(
  root: ReactTestInstance,
  match: (style: Record<string, unknown>) => boolean
): ReactTestInstance[] {
  return root
    .findAllByType(View)
    .filter((node) => match(flat((node.props as { style?: unknown }).style)));
}

/**
 * The shell's outer column.
 *
 * It is the tree's root host node — RNTL's `root` — so it is the one box
 * `findAll` from `root` cannot reach: a search starting at a host element sees
 * its descendants, not itself.
 */
function column(root: ReactTestInstance): Record<string, unknown> {
  expect(String(root.type)).toBe('View');
  const style = flat((root.props as { style?: unknown }).style);
  expect(style.alignSelf).toBe('center');
  return style;
}

/** The `CardV4` surface — the one box carrying a padding AND a border radius. */
function card(root: ReactTestInstance): Record<string, unknown> {
  const hit = viewsWhere(
    root,
    (s) => typeof s.borderRadius === 'number' && typeof s.padding === 'number'
  )[0];
  expect(hit).toBeDefined();
  return flat((hit.props as { style?: unknown }).style);
}

/** The brand tile — a square in `primary`. */
function tile(root: ReactTestInstance): ReactTestInstance | undefined {
  return viewsWhere(root, (s) => s.backgroundColor === THEME.light.primary)[0];
}

/** The headline block — the one box carrying the §4 `sm` gap. */
function heading(root: ReactTestInstance): ReactTestInstance | undefined {
  return viewsWhere(root, (s) => s.gap === THEME.spacing.sm)[0];
}

/** The footer wrapper — centred content, and nothing else styled on it. */
function footer(root: ReactTestInstance): ReactTestInstance | undefined {
  return viewsWhere(root, (s) => s.alignItems === 'center' && s.gap === undefined)[0];
}

/** Every rendered `Text` host node, in document order. */
function texts(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAllByType(RNText);
}

describe('AuthCardV4 (native)', () => {
  // ───────────────────────────────────────────────────────────────────────────
  // §12 — the empty states
  // ───────────────────────────────────────────────────────────────────────────

  it('renders children alone: no brand, no headline, no footer, no holes', () => {
    const { root, getByTestId } = renderThemed(
      <AuthCardV4>
        <RNText testID="form">fields</RNText>
      </AuthCardV4>,
      SEED_LIGHT
    );
    expect(getByTestId('form')).toBeTruthy();
    // The tile, the headline block and the footer each render NOTHING rather
    // than an empty box.
    expect(tile(root)).toBeUndefined();
    expect(heading(root)).toBeUndefined();
    expect(footer(root)).toBeUndefined();
    // Only the shell's own text — no headline, no subhead, no footer line.
    expect(texts(root)).toHaveLength(1);
  });

  it('drops the brand tile when the app supplies neither a glyph nor a name', () => {
    const { root } = renderThemed(<AuthCardV4 title="Welcome back">fields</AuthCardV4>, SEED_LIGHT);
    expect(tile(root)).toBeUndefined();
    expect(heading(root)).toBeDefined();
  });

  it('drops the whole headline block when there is no title and no subtitle', () => {
    const { root } = renderThemed(
      <AuthCardV4 brandIcon="lock" footer="Need help?">
        fields
      </AuthCardV4>,
      SEED_LIGHT
    );
    expect(heading(root)).toBeUndefined();
    // The tile and the footer are still there — only the missing band is gone.
    expect(tile(root)).toBeDefined();
    expect(footer(root)).toBeDefined();
  });

  it('renders a title with no subtitle, and a subtitle with no title', () => {
    const titleOnly = renderThemed(<AuthCardV4 title="Welcome back">f</AuthCardV4>, SEED_LIGHT);
    expect(titleOnly.getByText('Welcome back').props.accessibilityRole).toBe('header');

    const subOnly = renderThemed(
      <AuthCardV4 subtitle="Sign in to continue">f</AuthCardV4>,
      SEED_LIGHT
    );
    const line = subOnly.getByText('Sign in to continue');
    expect(line.props.accessibilityRole).toBeUndefined();
    expect(flat(line.props.style).color).toBe(THEME.light.mutedText);
  });

  it('renders no footer wrapper when there is no footer', () => {
    const { root } = renderThemed(
      <AuthCardV4 title="Welcome" footerDivider>
        fields
      </AuthCardV4>,
      SEED_LIGHT
    );
    // Asking for the divider does not conjure a rule with nothing under it.
    expect(footer(root)).toBeUndefined();
    expect(viewsWhere(root, (s) => s.borderTopWidth === 1)).toHaveLength(0);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // §10.5 — a V4 composite composes V4 children
  // ───────────────────────────────────────────────────────────────────────────

  it('composes the V4 parts, not the base ones', () => {
    const { root } = renderThemed(
      <AuthCardV4 brandGlyph="◆" title="Welcome back" subtitle="Sign in" footer="Register">
        fields
      </AuthCardV4>,
      SEED_LIGHT
    );
    // AuthBrandTileV4's square is composed (`2xl + sm`), not the base's literal
    // 56 — the tell that the V4 tile is the one that rendered.
    const box = flat((tile(root)?.props as { style?: unknown }).style);
    expect(box.width).toBe(THEME.spacing['2xl'] + THEME.spacing.sm);
    // AuthHeadingV4's `sm` gap, not the base AuthHeading's `xs`.
    expect(flat((heading(root)?.props as { style?: unknown }).style).gap).toBe(THEME.spacing.sm);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The rhythm — §4
  // ───────────────────────────────────────────────────────────────────────────

  it('uses §4’s `lg` between the bands, not the base’s flat `md`', () => {
    // 24 against 16: the difference between four bands and five things stacked
    // at equal pitch.
    const { root } = renderThemed(<AuthCardV4 title="Welcome">f</AuthCardV4>, SEED_LIGHT);
    expect(card(root).gap).toBe(THEME.spacing.lg);
    expect(card(root).gap).not.toBe(THEME.spacing.md);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // width
  // ───────────────────────────────────────────────────────────────────────────

  it('composes the column from the spacing scale, defaulting to the base’s 384', () => {
    // `2xl × 8` is 384 at the default scale — the base's literal to the pixel,
    // now derived from the seed rather than typed.
    expect(THEME.spacing['2xl'] * 8).toBe(384);
    const { root } = renderThemed(<AuthCardV4 title="Welcome">f</AuthCardV4>, SEED_LIGHT);
    const style = column(root);
    expect(style.maxWidth).toBe(384);
    expect(style.alignSelf).toBe('center');
    expect(style.width).toBe('100%');
  });

  it('widens to the headline’s own measure at width="md"', () => {
    // Deliberately the same 480 `AuthHeadingV4` caps at, so a wide card and a
    // headline measure agree rather than nearly agreeing.
    expect(THEME.spacing['2xl'] * 10).toBe(480);
    const { root } = renderThemed(
      <AuthCardV4 title="Welcome" width="md">
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    expect(column(root).maxWidth).toBe(480);
  });

  it('gives up the cap at width="full" and hands the measure back to the heading', () => {
    const capped = renderThemed(
      <AuthCardV4 title="Welcome" subtitle="Sign in">
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    // The card is the column, so the heading must not cap a second time inside
    // it — that would be a 480 measure inside a 384 card.
    expect(flat((heading(capped.root)?.props as { style?: unknown }).style).maxWidth).toBeUndefined();

    const full = renderThemed(
      <AuthCardV4 title="Welcome" subtitle="Sign in" width="full">
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    expect(column(full.root).maxWidth).toBeUndefined();
    // §4's measure is now the only thing stopping the subhead running the
    // width of a tablet, so it comes back on.
    expect(flat((heading(full.root)?.props as { style?: unknown }).style).maxWidth).toBe(480);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The subtitle decision
  // ───────────────────────────────────────────────────────────────────────────

  it('hands a string subtitle to AuthHeadingV4’s own step, not the base’s sm/muted', () => {
    // §4 sets the subhead at `base`, and `mutedText` is the AA-safe slot
    // `muted` is not. Re-wrapping here would reach around both.
    const { getByText } = renderThemed(
      <AuthCardV4 title="Welcome" subtitle="Sign in to continue">
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    const style = flat(getByText('Sign in to continue').props.style);
    expect(style.fontSize).toBe(THEME.typography.scale.base);
    expect(style.fontSize).not.toBe(THEME.typography.scale.sm);
    expect(style.color).toBe(THEME.light.mutedText);
  });

  it('passes a non-string subtitle through untouched', () => {
    const { getByTestId, root } = renderThemed(
      <AuthCardV4 title="Welcome" subtitle={<RNText testID="custom-sub">with a link</RNText>}>
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    expect(getByTestId('custom-sub')).toBeTruthy();
    // The caller's node was not re-wrapped in a styled run.
    expect(flat(getByTestId('custom-sub').props.style).color).toBeUndefined();
    expect(heading(root)).toBeDefined();
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The footer
  // ───────────────────────────────────────────────────────────────────────────

  it('styles a string footer as a centred sm/mutedText line — the twins agreed', () => {
    // The base twins disagreed here: web left the node unstyled, native drew
    // `sm`/`muted`. V4 says it once, and says `mutedText`.
    const { root, getByText } = renderThemed(
      <AuthCardV4 title="Welcome" footer="Already have an account?">
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    expect(flat((footer(root)?.props as { style?: unknown }).style).alignItems).toBe('center');
    const style = flat(getByText('Already have an account?').props.style);
    expect(style.fontSize).toBe(THEME.typography.scale.sm);
    expect(style.color).toBe(THEME.light.mutedText);
    expect(style.textAlign).toBe('center');
  });

  it('renders any other footer node as given — §9’s footer carries a pressable', () => {
    const { getByTestId } = renderThemed(
      <AuthCardV4 title="Welcome" footer={<RNText testID="link">Register</RNText>}>
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    expect(getByTestId('link')).toBeTruthy();
    expect(flat(getByTestId('link').props.style).fontSize).toBeUndefined();
  });

  it('draws §5’s hairline above the footer only when asked', () => {
    const plain = renderThemed(<AuthCardV4 footer="Register">f</AuthCardV4>, SEED_LIGHT);
    expect(flat((footer(plain.root)?.props as { style?: unknown }).style).borderTopWidth).toBeUndefined();

    const ruled = renderThemed(
      <AuthCardV4 footer="Register" footerDivider>
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    const style = flat((footer(ruled.root)?.props as { style?: unknown }).style);
    expect(style.borderTopWidth).toBe(1);
    expect(style.borderTopColor).toBe(THEME.light.border);
    expect(style.paddingTop).toBe(THEME.spacing.lg);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The brand tile pass-through
  // ───────────────────────────────────────────────────────────────────────────

  it('forwards the tile’s size, shape and label', () => {
    const { root, getByLabelText } = renderThemed(
      <AuthCardV4 brandIcon="lock" brandSize="lg" brandShape="circle" brandLabel="Acme">
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    const box = flat((tile(root)?.props as { style?: unknown }).style);
    // §3's hero medallion: `2xl + lg` (72 at the default scale), and round.
    expect(box.width).toBe(THEME.spacing['2xl'] + THEME.spacing.lg);
    expect(box.borderRadius).toBe((THEME.spacing['2xl'] + THEME.spacing.lg) / 2);
    expect(getByLabelText('Acme')).toBeTruthy();
  });

  it('defaults the tile to §9’s rounded md square', () => {
    const { root } = renderThemed(<AuthCardV4 brandGlyph="◆">f</AuthCardV4>, SEED_LIGHT);
    const box = flat((tile(root)?.props as { style?: unknown }).style);
    expect(box.width).toBe(THEME.spacing['2xl'] + THEME.spacing.sm);
    expect(box.borderRadius).toBe(THEME.radius.lg);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Alignment and the headline step
  // ───────────────────────────────────────────────────────────────────────────

  it('opens LEFT by default — §9 is explicit the tile is not centred', () => {
    const { root, getByText } = renderThemed(
      <AuthCardV4 brandGlyph="◆" title="Welcome" subtitle="Sign in">
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    expect(flat((tile(root)?.props as { style?: unknown }).style).alignSelf).toBe('flex-start');
    expect(flat((heading(root)?.props as { style?: unknown }).style).alignItems).toBe('flex-start');
    expect(flat(getByText('Welcome').props.style).textAlign).toBe('left');
  });

  it('centres the tile and the headline together on align="center"', () => {
    const { root, getByText } = renderThemed(
      <AuthCardV4 brandGlyph="◆" title="Welcome" align="center">
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    expect(flat((tile(root)?.props as { style?: unknown }).style).alignSelf).toBe('center');
    expect(flat((heading(root)?.props as { style?: unknown }).style).alignItems).toBe('center');
    expect(flat(getByText('Welcome').props.style).textAlign).toBe('center');
  });

  it('keeps `xl` as the headline default and forwards §9’s 3xl when asked', () => {
    // The step is the screen's decision; a shell that forced `3xl` could not be
    // embedded in a sheet.
    const base = renderThemed(<AuthCardV4 title="Welcome">f</AuthCardV4>, SEED_LIGHT);
    expect(flat(base.getByText('Welcome').props.style).fontSize).toBe(THEME.typography.scale.xl);

    const big = renderThemed(
      <AuthCardV4 title="Welcome" titleSize="3xl">
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    expect(flat(big.getByText('Welcome').props.style).fontSize).toBe(THEME.typography.scale['3xl']);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The surface
  // ───────────────────────────────────────────────────────────────────────────

  it('raises the card by default, and forwards variant + padding to CardV4', () => {
    // The auth card is the only container on its page, so the shadow is layer
    // order made visible — and it is the SEED's shadow, not this file's.
    const raised = renderThemed(<AuthCardV4 title="Welcome">f</AuthCardV4>, SEED_LIGHT);
    expect(card(raised.root).shadowColor).toBe(THEME.lightElevation.card.color);
    expect(card(raised.root).padding).toBe(THEME.spacing.lg);
    expect(card(raised.root).borderRadius).toBe(THEME.radius.lg);

    const outlined = renderThemed(
      <AuthCardV4 title="Welcome" variant="outlined" padding="md">
        f
      </AuthCardV4>,
      SEED_LIGHT
    );
    expect(card(outlined.root).shadowColor).toBeUndefined();
    expect(card(outlined.root).padding).toBe(THEME.spacing.md);
  });

  it('takes a style override for layout without losing its own', () => {
    const { root } = renderThemed(
      <AuthCardV4 style={{ marginTop: 24 }}>f</AuthCardV4>,
      SEED_LIGHT
    );
    const style = column(root);
    expect(style.marginTop).toBe(24);
    expect(style.maxWidth).toBe(384);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // §10.1
  // ───────────────────────────────────────────────────────────────────────────

  it('paints nothing with a literal — every hex traces to a compiled token', () => {
    const { root } = renderThemed(
      <AuthCardV4
        brandGlyph="◆"
        title="Welcome back"
        subtitle="Sign in to continue"
        footer="Register"
        footerDivider
        align="center"
        width="md"
        titleSize="3xl"
      >
        <RNText>fields</RNText>
      </AuthCardV4>,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    const used = renderedStyleHexes(root);
    expect(used.length).toBeGreaterThan(0);
    used.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
