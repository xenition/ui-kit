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
import { PageContainerV4 } from './PageContainerV4';

const THEME = compileTheme(SEED_LIGHT);

/** The mocked device insets — see `spec-support/react-native-safe-area-context`. */
const INSETS = { top: 24, bottom: 16, left: 0, right: 0 };

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

/**
 * The scrolling page.
 *
 * Read off the host node rather than through `findAllByType(ScrollView)`: the
 * `react-native` jest preset replaces `ScrollView` with a mock component, so
 * the constructor a spec imports is not the one the tree holds, and the host
 * element it renders is what actually carries `style` and
 * `contentContainerStyle`.
 */
function scroller(root: ReactTestInstance): ReactTestInstance {
  const hit = root.findAll((node) => node.type === 'RCTScrollView')[0];
  expect(hit).toBeDefined();
  return hit;
}

/** The padding the content actually pays, scrolling or not. */
function pad(root: ReactTestInstance, scroll = true): Record<string, unknown> {
  if (scroll) return flat(scroller(root).props.contentContainerStyle);
  const hit = root.findAll((node) => {
    const style = flat((node.props as { style?: unknown } | undefined)?.style);
    return style.flex === 1 && typeof style.paddingTop === 'number';
  })[0];
  expect(hit).toBeDefined();
  return flat((hit.props as { style?: unknown }).style);
}

/** The page's own ground. */
function ground(root: ReactTestInstance): Record<string, unknown> {
  const hit = root.findAll((node) => {
    const style = flat((node.props as { style?: unknown } | undefined)?.style);
    return style.backgroundColor === THEME.light.surface && style.flex === 1;
  })[0];
  expect(hit).toBeDefined();
  return flat((hit.props as { style?: unknown }).style);
}

/** Every rendered `Text` host node, in document order. */
function texts(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAllByType(RNText);
}

describe('PageContainerV4 (native)', () => {
  // ── the ground (§4.2) ──────────────────────────────────────────────

  it('paints the warm page ground — `surface`, not `card`', () => {
    // §4.2's split is page = surface, cards = card. This is the page.
    const { root } = renderThemed(
      <PageContainerV4 title="Today">
        <RNText>body</RNText>
      </PageContainerV4>,
      SEED_LIGHT
    );
    const style = ground(root);
    expect(style.backgroundColor).toBe(THEME.light.surface);
    expect(style.backgroundColor).not.toBe(THEME.light.card);
    expect(style.flex).toBe(1);
  });

  it('carries no shadow, no radius and no border — a page is not a card', () => {
    // §4.6: a card, a sheet and the one dominant action. A page is none.
    const { root } = renderThemed(<PageContainerV4 title="Today" />, SEED_LIGHT);
    const style = ground(root);
    expect(style.shadowOpacity).toBeUndefined();
    expect(style.elevation).toBeUndefined();
    expect(style.borderRadius).toBeUndefined();
    expect(style.borderWidth).toBeUndefined();
  });

  // ── the screen header is `PageHeaderV4` (§5) ───────────────────────

  it('sets the title at `3xl` bold in the heading face — up from the base’s `2xl`', () => {
    // §5: the same screen header existed twice at two type ramps. One now.
    const { root } = renderThemed(<PageContainerV4 title="Good morning" />, SEED_LIGHT);
    const title = texts(root)[0];
    const style = flat(title.props.style);
    expect(title.props.accessibilityRole).toBe('header');
    expect(style.fontSize).toBe(THEME.typography.scale['3xl']);
    expect(style.fontSize).not.toBe(THEME.typography.scale['2xl']);
    expect(style.fontWeight).toBe('700');
    expect(style.color).toBe(THEME.light.onSurface);
    expect(style.fontFamily).toBe(THEME.typography.fontHeading);
  });

  it('sets the subtitle at `base` in `mutedText`, never the decorative `muted` fill', () => {
    // The base painted it `colors.muted` — a fill used as a text colour.
    const { root } = renderThemed(
      <PageContainerV4 title="Today" subtitle="Tuesday, 29 August" />,
      SEED_LIGHT
    );
    const style = flat(texts(root)[1].props.style);
    expect(style.fontSize).toBe(THEME.typography.scale.base);
    expect(style.color).toBe(THEME.light.mutedText);
    // `mutedText` is the slot a sentence is allowed to take; whether the seed
    // happened to walk it away from `muted` is the compiler's business.
    expect(style.color).not.toBe(THEME.light.onSurface);
  });

  it('takes a smaller headline step through `headerSize`', () => {
    const { root } = renderThemed(
      <PageContainerV4 title="Settings" headerSize="xl" />,
      SEED_LIGHT
    );
    expect(flat(texts(root)[0].props.style).fontSize).toBe(THEME.typography.scale.xl);
  });

  it('renders `headerAction` and forwards a named `icon` to the header’s §4.7 badge', () => {
    const { root, getByText } = renderThemed(
      <PageContainerV4 title="Notifications" icon="bell" headerAction={<RNText>New</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('New')).toBeTruthy();
    const badges = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.width === 44 && style.height === 44;
    });
    expect(badges.length).toBeGreaterThan(0);
  });

  // ── the border default (§4.4) ──────────────────────────────────────

  it('draws NO hairline under the title by default — §4.4', () => {
    const { root } = renderThemed(
      <PageContainerV4 title="Today" subtitle="Tuesday" />,
      SEED_LIGHT
    );
    const ruled = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.borderBottomWidth === 1;
    });
    expect(ruled).toHaveLength(0);
  });

  it('puts the hairline back, verbatim, on `divided`', () => {
    const { root } = renderThemed(<PageContainerV4 title="Today" divided />, SEED_LIGHT);
    const ruled = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.borderBottomWidth === 1 && style.borderBottomColor === THEME.light.border;
    });
    expect(ruled.length).toBeGreaterThan(0);
  });

  // ── scrolling ──────────────────────────────────────────────────────

  it('scrolls its content by default and keeps taps working through the keyboard', () => {
    const { root } = renderThemed(<PageContainerV4 title="Today" />, SEED_LIGHT);
    expect(scroller(root).props.keyboardShouldPersistTaps).toBe('handled');
  });

  it('renders a plain `View` when `scroll` is off', () => {
    const { root } = renderThemed(<PageContainerV4 title="Today" scroll={false} />, SEED_LIGHT);
    expect(root.findAll((node) => node.type === 'RCTScrollView')).toHaveLength(0);
    expect(root.findAllByType(View).length).toBeGreaterThan(0);
    // …and the padding moves onto the view itself.
    expect(pad(root, false).paddingTop).toBe(THEME.spacing.lg + INSETS.top);
  });

  // ── safe areas (§5, HIG) ───────────────────────────────────────────

  it('pays every safe-area inset ON TOP OF the gutter by default', () => {
    // `ContainerV4`'s arithmetic exactly: gutter + inset, never max().
    const { root } = renderThemed(<PageContainerV4 title="Today" />, SEED_LIGHT);
    const style = pad(root);
    expect(style.paddingTop).toBe(THEME.spacing.lg + INSETS.top);
    expect(style.paddingBottom).toBe(THEME.spacing.lg + INSETS.bottom);
    expect(style.paddingLeft).toBe(THEME.spacing.lg + INSETS.left);
    expect(style.paddingRight).toBe(THEME.spacing.lg + INSETS.right);
  });

  it('gives the insets back to an ancestor with `safeArea={false}`', () => {
    const { root } = renderThemed(<PageContainerV4 title="Today" safeArea={false} />, SEED_LIGHT);
    const style = pad(root);
    expect(style.paddingTop).toBe(THEME.spacing.lg);
    expect(style.paddingBottom).toBe(THEME.spacing.lg);
    expect(style.paddingLeft).toBe(THEME.spacing.lg);
  });

  it('takes the gutter off the spacing scale — §4.1’s page gutter, and nothing else', () => {
    const { root } = renderThemed(
      <PageContainerV4 title="Today" padding="md" safeArea={false} />,
      SEED_LIGHT
    );
    expect(pad(root).paddingLeft).toBe(THEME.spacing.md);
  });

  // ── bottomInset ────────────────────────────────────────────────────

  it('adds `bottomInset` to the bottom padding rather than replacing it', () => {
    const { root } = renderThemed(
      <PageContainerV4 title="Today" bottomInset={64} />,
      SEED_LIGHT
    );
    const style = pad(root);
    expect(style.paddingBottom).toBe(THEME.spacing.lg + INSETS.bottom + 64);
    // It is bottom-only: nothing else moves.
    expect(style.paddingTop).toBe(THEME.spacing.lg + INSETS.top);
  });

  // ── empty states (§4.5) ────────────────────────────────────────────

  it('renders the ground and the gutter with NOTHING to show — a page never collapses', () => {
    const { root, toJSON } = renderThemed(<PageContainerV4 />, SEED_LIGHT);
    expect(toJSON()).not.toBeNull();
    expect(ground(root).backgroundColor).toBe(THEME.light.surface);
    expect(pad(root).paddingTop).toBe(THEME.spacing.lg + INSETS.top);
    // …but it holds no empty header block open above the content.
    expect(texts(root)).toHaveLength(0);
  });

  it('renders children with no title, and a title with no children', () => {
    const withChildren = renderThemed(
      <PageContainerV4>
        <RNText>just content</RNText>
      </PageContainerV4>,
      SEED_LIGHT
    );
    expect(withChildren.getByText('just content')).toBeTruthy();
    expect(texts(withChildren.root)).toHaveLength(1);

    const withTitle = renderThemed(<PageContainerV4 title="Empty screen" />, SEED_LIGHT);
    expect(withTitle.getByText('Empty screen')).toBeTruthy();
  });

  it('drops the header for an empty-string title, as `PageHeaderV4` does', () => {
    const { root, getByText } = renderThemed(
      <PageContainerV4 title="" subtitle="">
        <RNText>body</RNText>
      </PageContainerV4>,
      SEED_LIGHT
    );
    expect(getByText('body')).toBeTruthy();
    expect(texts(root)).toHaveLength(1);
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('takes a style for layout and keeps its own ground underneath', () => {
    const { root } = renderThemed(
      <PageContainerV4 title="Today" style={{ marginTop: 12 }} testID="screen" />,
      SEED_LIGHT
    );
    const hit = root.findAll((node) => node.props?.testID === 'screen')[0];
    expect(hit).toBeDefined();
    const style = flat(hit?.props.style);
    expect(style.marginTop).toBe(12);
    expect(style.backgroundColor).toBe(THEME.light.surface);
  });

  it('paints nothing with a literal — every colour traces to a compiled token', () => {
    const { root } = renderThemed(
      <PageContainerV4 title="Today" subtitle="Tuesday, 29 August" divided>
        <RNText>body</RNText>
      </PageContainerV4>,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
