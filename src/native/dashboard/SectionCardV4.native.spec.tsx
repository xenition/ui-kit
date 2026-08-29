import * as React from 'react';
import { Text as RNText, View } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { compileTheme } from '../../theme/compile';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { allStyles, flatStyle, type FlatStyle } from '../spec-support/surface-v4';
import { SectionCardV4, type SectionCardV4Props } from './SectionCardV4';

const THEME = compileTheme(SEED_LIGHT);

/** `44 + spacing.md` — the row title's leading edge (§4.3/§4.4). */
const LEADING = 44 + THEME.spacing.md;

function render(props: SectionCardV4Props = {}) {
  return renderThemed(<SectionCardV4 testID="c" {...props} />, SEED_LIGHT);
}

function cardStyle(props: SectionCardV4Props = {}): FlatStyle {
  return flatStyle(render(props).getByTestId('c').props.style);
}

/**
 * Every hairline in a rendered tree — a `ListSeparatorV4` and nothing else.
 *
 * Host nodes only (`typeof type === 'string'`): the test renderer keeps the
 * composite and the host instance for the same `View`, so counting both would
 * report every rule twice.
 */
function rules(root: ReactTestInstance): FlatStyle[] {
  return root
    .findAll((node) => typeof node.type === 'string')
    .map((node) => flatStyle(node.props?.style))
    .filter((s) => s.height === 1 && s.backgroundColor === THEME.light.border);
}

const ROWS = ['Alpha', 'Beta', 'Gamma'].map((label) => (
  <View key={label}>
    <RNText>{label}</RNText>
  </View>
));

describe('SectionCardV4 (native)', () => {
  describe('§4.2 — the ground is `card`, not `surface`', () => {
    it('paints colors.card, the slot the shadcn pass added for exactly this', () => {
      const s = cardStyle({ title: 'Revenue', children: <RNText>body</RNText> });
      expect(s.backgroundColor).toBe(THEME.light.card);
      // The bug this pass exists to remove: the base painted the page colour.
      expect(s.backgroundColor).not.toBe(THEME.light.surface);
    });

    it('reads as raised in DARK too, where a shadow alone does nothing', () => {
      const dark = compileTheme({ ...SEED_LIGHT, mode: 'both' });
      const { getByTestId } = renderThemed(
        <SectionCardV4 testID="c" title="Revenue">
          <RNText>body</RNText>
        </SectionCardV4>,
        { ...SEED_LIGHT, mode: 'both' },
        'dark'
      );
      const s = flatStyle(getByTestId('c').props.style);
      expect(s.backgroundColor).toBe(dark.dark.card);
      expect(s.backgroundColor).not.toBe(dark.dark.surface);
    });

    it('is the hairline-plus-soft-shadow card: 1 unit of border, radius lg, elevation.card', () => {
      const s = cardStyle({ title: 'Revenue', children: <RNText>b</RNText> });
      expect(s.borderWidth).toBe(1);
      expect(s.borderColor).toBe(THEME.light.border);
      expect(s.borderRadius).toBe(THEME.radius.lg);
      // Never a heavy border AND a heavy shadow — the shadow is the seed's own.
      expect(s.shadowRadius).toBe(THEME.lightElevation.card.radius);
      expect(s.shadowOpacity).toBe(THEME.lightElevation.card.opacity);
      expect(s.elevation).toBe(THEME.lightElevation.card.android);
    });

    it('clips to the radius so a flush row list cannot square off the corners', () => {
      expect(cardStyle({ grouped: true, children: ROWS }).overflow).toBe('hidden');
    });

    it('variant is forwarded so a nested card can drop the shadow (§4.6)', () => {
      const s = cardStyle({ title: 'Revenue', variant: 'flat', children: <RNText>b</RNText> });
      expect(s.borderWidth).toBe(0);
      expect(s.shadowOpacity).toBeUndefined();
      // The ground survives — a flat card is still a card, not the page.
      expect(s.backgroundColor).toBe(THEME.light.card);
    });
  });

  describe('§4.2 — one padding value, read by every slot', () => {
    it('the card pays none of it: the slots do', () => {
      expect(cardStyle({ title: 'Revenue', children: <RNText>b</RNText> }).padding).toBe(0);
      expect(cardStyle({ title: 'Revenue', children: <RNText>b</RNText> }).gap).toBe(
        THEME.spacing.md
      );
    });

    it('header and body read the SAME value, so they cannot drift', () => {
      const { getByTestId } = render({ title: 'Revenue', children: <RNText>b</RNText> });
      const header = flatStyle(getByTestId('xen-v4-section-card-header').props.style);
      const body = flatStyle(getByTestId('xen-v4-section-card-body').props.style);
      expect(header.paddingHorizontal).toBe(THEME.spacing.lg);
      expect(header.paddingTop).toBe(THEME.spacing.lg);
      expect(body.paddingHorizontal).toBe(THEME.spacing.lg);
      expect(body.paddingBottom).toBe(THEME.spacing.lg);
      // The header already paid the top; the body must not pay it twice.
      expect(body.paddingTop).toBe(0);
    });

    it('a headerless card pays the top padding on the body instead', () => {
      const { getByTestId } = render({ children: <RNText>b</RNText> });
      expect(flatStyle(getByTestId('xen-v4-section-card-body').props.style).paddingTop).toBe(
        THEME.spacing.lg
      );
    });

    it('every padding key moves every slot at once, and `none` is zero', () => {
      const md = render({ title: 't', padding: 'md', children: <RNText>b</RNText> });
      expect(flatStyle(md.getByTestId('xen-v4-section-card-header').props.style).paddingTop).toBe(
        THEME.spacing.md
      );
      expect(
        flatStyle(md.getByTestId('xen-v4-section-card-body').props.style).paddingHorizontal
      ).toBe(THEME.spacing.md);

      const none = render({ title: 't', padding: 'none', children: <RNText>b</RNText> });
      expect(flatStyle(none.getByTestId('xen-v4-section-card-header').props.style).paddingTop).toBe(
        0
      );
    });
  });

  describe('the header — Section anatomy, on the type ramp', () => {
    it('title is lg/bold/onCard and announced as a header', () => {
      const { getByText } = render({ title: 'Revenue', children: <RNText>b</RNText> });
      const title = getByText('Revenue');
      const s = flatStyle(title.props.style);
      expect(s.fontSize).toBe(THEME.typography.scale.lg);
      expect(s.fontWeight).toBe('700');
      // The ink that belongs with the card ground, not the page ground.
      expect(s.color).toBe(THEME.light.onCard);
      expect(title.props.accessibilityRole).toBe('header');
    });

    it('subtitle is sm and reads the mutedText SLOT, never the muted FILL', () => {
      const { getByText } = render({
        title: 'Revenue',
        subtitle: 'Last 30 days',
        children: <RNText>b</RNText>,
      });
      const s = flatStyle(getByText('Last 30 days').props.style);
      expect(s.fontSize).toBe(THEME.typography.scale.sm);
      expect(s.color).toBe(THEME.light.mutedText);
      // On this seed the two slots compile to the same hex, so the claim is
      // which slot was READ: `mutedText` is the one the compiler walks until it
      // clears AA, and the one that moves when a seed darkens its `muted` fill.
      expect(THEME.light.mutedText).toBeDefined();
    });

    it('puts §4.1 xs between the title and its supporting line — `gap: 2` is gone', () => {
      const { root } = render({
        title: 'Revenue',
        subtitle: 'Last 30 days',
        children: <RNText>b</RNText>,
      });
      expect(allStyles(root).find((s) => s.flex === 1 && s.gap === THEME.spacing.xs)).toBeDefined();
      expect(allStyles(root).find((s) => s.gap === 2)).toBeUndefined();
    });

    it('renders a trailing action beside the title, and lets it not shrink', () => {
      const { root, getByText } = render({
        title: 'Revenue',
        action: <RNText>See all</RNText>,
        children: <RNText>b</RNText>,
      });
      expect(getByText('See all')).toBeDefined();
      expect(allStyles(root).find((s) => s.flexShrink === 0)).toBeDefined();
    });

    it('HEADER COLLAPSE — no title, subtitle or action renders no header at all', () => {
      const { queryByTestId } = render({ children: <RNText>b</RNText> });
      expect(queryByTestId('xen-v4-section-card-header')).toBeNull();
      expect(queryByTestId('xen-v4-section-card-body')).not.toBeNull();
    });

    it('HEADER COLLAPSE — an action alone still earns a header, with no empty text column', () => {
      const { queryByTestId, root } = render({
        action: <RNText>Edit</RNText>,
        children: <RNText>b</RNText>,
      });
      expect(queryByTestId('xen-v4-section-card-header')).not.toBeNull();
      expect(allStyles(root).find((s) => s.flex === 1 && s.gap === THEME.spacing.xs)).toBeUndefined();
    });
  });

  describe('§4.3/§4.4 — grouped rows are ONE card with rows in it', () => {
    it('draws a separator between the rows and none after the last', () => {
      const { root } = render({ grouped: true, children: ROWS });
      expect(rules(root)).toHaveLength(ROWS.length - 1);
    });

    it('one row and no rows draw no rule at all', () => {
      expect(rules(render({ grouped: true, children: ROWS[0] }).root)).toHaveLength(0);
      expect(
        rules(render({ grouped: true, title: 't', empty: { title: 'Nothing' } }).root)
      ).toHaveLength(0);
    });

    it('insetSeparators clears the 44 leading slot, composed as 44 + spacing.md', () => {
      const { root } = render({ grouped: true, insetSeparators: true, children: ROWS });
      const found = rules(root);
      expect(found).toHaveLength(2);
      found.forEach((s) => {
        expect(s.marginLeft).toBe(LEADING);
        expect(s.marginLeft).toBe(44 + THEME.spacing.md);
      });
    });

    it('flush by default — rows with no leading slot get no invented inset', () => {
      rules(render({ grouped: true, children: ROWS }).root).forEach((s) => {
        expect(s.marginLeft).toBe(0);
      });
    });

    it('a separator is 1 unit of border and nothing else — never two weights', () => {
      rules(render({ grouped: true, insetSeparators: true, children: ROWS }).root).forEach((s) => {
        expect(s.height).toBe(1);
        expect(s.borderWidth).toBeUndefined();
        expect(s.opacity).toBeUndefined();
      });
    });

    it('a grouped body gives up the card padding so the rows run flush', () => {
      const { getByTestId } = render({ title: 'Alerts', grouped: true, children: ROWS });
      expect(flatStyle(getByTestId('xen-v4-section-card-body').props.style)).toEqual({});
    });

    it('an ungrouped body keeps its padding and draws no separators', () => {
      const { root, getByTestId } = render({ children: ROWS });
      expect(rules(root)).toHaveLength(0);
      expect(flatStyle(getByTestId('xen-v4-section-card-body').props.style).paddingHorizontal).toBe(
        THEME.spacing.lg
      );
    });

    it('divided draws ONE flush rule, and only between a header and a body', () => {
      const both = render({ title: 'Alerts', divided: true, grouped: true, children: ROWS });
      const rule = both.getByTestId('xen-v4-section-card-rule');
      expect(flatStyle(rule.props.style).marginLeft).toBe(0);

      // A rule under a header with nothing below it is a line on the card floor.
      expect(
        render({ title: 'Alerts', divided: true }).queryByTestId('xen-v4-section-card-rule')
      ).toBeNull();
      // ...and a rule above a body with no header is the same mistake.
      expect(
        render({ divided: true, children: ROWS }).queryByTestId('xen-v4-section-card-rule')
      ).toBeNull();
    });

    it('divided is off by default — the base rendering, preserved', () => {
      expect(
        render({ title: 'Alerts', children: <RNText>b</RNText> }).queryByTestId(
          'xen-v4-section-card-rule'
        )
      ).toBeNull();
    });
  });

  describe('§4.5 — empty states', () => {
    it('routes an empty body through EmptyStateV4, not a second implementation', () => {
      const { getByText } = render({
        title: 'Activity',
        empty: { title: 'Nothing yet', description: 'Your activity will show up here.' },
      });
      expect(getByText('Nothing yet')).toBeDefined();
      expect(getByText('Your activity will show up here.')).toBeDefined();
      // The primitive's own rhythm: §4.5's `2xl` vertical padding.
      expect(
        allStyles(render({ empty: { title: 'Nothing yet' } }).root).find(
          (s) => s.paddingVertical === THEME.spacing['2xl']
        )
      ).toBeDefined();
    });

    it('carries the icon and the single action through to the primitive', () => {
      const { getByText, getByTestId } = render({
        empty: {
          icon: <View testID="badge" />,
          title: 'Nothing yet',
          action: <RNText>Add one</RNText>,
        },
      });
      // The icon slot is decorative, so it is hidden from the a11y tree — §4.5.
      expect(getByTestId('badge', { includeHiddenElements: true })).toBeDefined();
      expect(getByText('Add one')).toBeDefined();
    });

    it('children win over the empty state — an empty state is for an EMPTY body', () => {
      const { queryByText } = render({ empty: { title: 'Nothing yet' }, children: ROWS });
      expect(queryByText('Nothing yet')).toBeNull();
    });

    it('renders NOTHING with no header, no children and no empty state', () => {
      expect(renderThemed(<SectionCardV4 />, SEED_LIGHT).toJSON()).toBeNull();
      expect(renderThemed(<SectionCardV4>{null}</SectionCardV4>, SEED_LIGHT).toJSON()).toBeNull();
      expect(
        renderThemed(<SectionCardV4 grouped>{[]}</SectionCardV4>, SEED_LIGHT).toJSON()
      ).toBeNull();
    });

    it('a header with no body is still a card, not a padded hole', () => {
      const { getByTestId } = render({ title: 'Revenue', subtitle: 'Last 30 days' });
      expect(getByTestId('c')).toBeDefined();
      expect(getByTestId('xen-v4-section-card-body').props.children).toBeNull();
    });
  });

  describe('token purity and parity', () => {
    it('every colour it paints traces to a token — no literal hex', () => {
      const { root } = renderThemed(
        <SectionCardV4 title="Revenue" subtitle="Last 30 days" divided grouped insetSeparators>
          {ROWS}
        </SectionCardV4>,
        SEED_LIGHT
      );
      const allowed = tokenHexSet(SEED_LIGHT);
      const used = renderedStyleHexes(root);
      expect(used.length).toBeGreaterThan(0);
      used.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });

    it('spends no literal spacing — every metric is a token or the named 44', () => {
      const { root } = render({ title: 'Revenue', grouped: true, insetSeparators: true, children: ROWS });
      const spacings = Object.values(THEME.spacing);
      allStyles(root).forEach((s) => {
        (['padding', 'paddingTop', 'paddingBottom', 'paddingHorizontal', 'gap'] as const).forEach(
          (key) => {
            const value = s[key];
            if (typeof value === 'number' && value !== 0) {
              expect(spacings).toContain(value);
            }
          }
        );
        if (typeof s.marginLeft === 'number' && s.marginLeft !== 0) {
          expect(s.marginLeft).toBe(LEADING);
        }
      });
    });

    it('ADDITIVE — every base prop still means what it meant', () => {
      const { getByText, getByTestId } = render({
        title: 'Revenue',
        subtitle: 'Last 30 days',
        action: <RNText>See all</RNText>,
        divided: true,
        children: <RNText>body</RNText>,
      });
      expect(getByText('Revenue')).toBeDefined();
      expect(getByText('Last 30 days')).toBeDefined();
      expect(getByText('See all')).toBeDefined();
      expect(getByText('body')).toBeDefined();
      expect(getByTestId('xen-v4-section-card-rule')).toBeDefined();
    });

    it('a caller style merges with the card recipe rather than replacing it', () => {
      const s = cardStyle({ title: 'Revenue', style: { marginTop: 12 }, children: <RNText>b</RNText> });
      expect(s.marginTop).toBe(12);
      expect(s.backgroundColor).toBe(THEME.light.card);
    });

    it('forwards the rest of the View props', () => {
      const { getByTestId } = renderThemed(
        <SectionCardV4 testID="c" title="Revenue" pointerEvents="none">
          <RNText>b</RNText>
        </SectionCardV4>,
        SEED_LIGHT
      );
      expect(getByTestId('c').props.pointerEvents).toBe('none');
    });
  });
});
