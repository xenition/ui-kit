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
import { SettingsSectionV4, type SettingsSectionV4Props } from './SettingsSectionV4';

const THEME = compileTheme(SEED_LIGHT);

/** `44 + spacing.md` — the row label's leading edge (§4.3/§4.4). */
const LEADING = 44 + THEME.spacing.md;

function render(props: SettingsSectionV4Props = {}) {
  return renderThemed(<SettingsSectionV4 testID="s" {...props} />, SEED_LIGHT);
}

function cardStyle(props: SettingsSectionV4Props = {}): FlatStyle {
  return flatStyle(render(props).getByTestId('xen-v4-settings-card').props.style);
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

const ROWS = ['Notifications', 'Privacy', 'Language'].map((label) => (
  <View key={label}>
    <RNText>{label}</RNText>
  </View>
));

describe('SettingsSectionV4 (native)', () => {
  describe('§4.2 — the ground is `card`, not `surface`', () => {
    it('paints colors.card, the slot the shadcn pass added for exactly this', () => {
      const s = cardStyle({ title: 'Account', children: ROWS });
      expect(s.backgroundColor).toBe(THEME.light.card);
      // The bug this pass exists to remove: the base painted the page colour.
      expect(s.backgroundColor).not.toBe(THEME.light.surface);
    });

    it('reads as raised in DARK too, where a shadow alone does nothing', () => {
      const dark = compileTheme({ ...SEED_LIGHT, mode: 'both' });
      const { getByTestId } = renderThemed(
        <SettingsSectionV4 title="Account">{ROWS}</SettingsSectionV4>,
        { ...SEED_LIGHT, mode: 'both' },
        'dark'
      );
      const s = flatStyle(getByTestId('xen-v4-settings-card').props.style);
      expect(s.backgroundColor).toBe(dark.dark.card);
      expect(s.backgroundColor).not.toBe(dark.dark.surface);
    });

    it('is the hairline-plus-soft-shadow card: 1 unit of border, radius lg, elevation.card', () => {
      const s = cardStyle({ children: ROWS });
      expect(s.borderWidth).toBe(1);
      expect(s.borderColor).toBe(THEME.light.border);
      expect(s.borderRadius).toBe(THEME.radius.lg);
      expect(s.shadowRadius).toBe(THEME.lightElevation.card.radius);
      expect(s.elevation).toBe(THEME.lightElevation.card.android);
    });

    it('clips to the radius and pays NO padding — the rows own their gutters', () => {
      const s = cardStyle({ children: ROWS });
      expect(s.overflow).toBe('hidden');
      expect(s.padding).toBe(0);
    });

    it('variant is forwarded so a nested group can drop the shadow (§4.6)', () => {
      const s = cardStyle({ variant: 'flat', children: ROWS });
      expect(s.borderWidth).toBe(0);
      expect(s.shadowOpacity).toBeUndefined();
      expect(s.backgroundColor).toBe(THEME.light.card);
    });
  });

  describe('§4.3/§4.4 — one card with rows in it, and the rules between them', () => {
    it('draws a separator between the rows and none after the last', () => {
      expect(rules(render({ children: ROWS }).root)).toHaveLength(ROWS.length - 1);
    });

    it('one row and no rows draw no rule at all', () => {
      expect(rules(render({ children: ROWS[0] }).root)).toHaveLength(0);
      expect(rules(render({ empty: { title: 'Nothing to configure' } }).root)).toHaveLength(0);
    });

    it('insetSeparators clears the 44 leading slot, composed as 44 + spacing.md', () => {
      const found = rules(render({ insetSeparators: true, children: ROWS }).root);
      expect(found).toHaveLength(2);
      found.forEach((s) => {
        expect(s.marginLeft).toBe(LEADING);
        expect(s.marginLeft).toBe(44 + THEME.spacing.md);
      });
    });

    it('flush by default — rows with no leading slot get no invented inset', () => {
      rules(render({ children: ROWS }).root).forEach((s) => expect(s.marginLeft).toBe(0));
    });

    it('a separator is 1 unit of border and nothing else — never two weights', () => {
      rules(render({ insetSeparators: true, children: ROWS }).root).forEach((s) => {
        expect(s.height).toBe(1);
        expect(s.backgroundColor).toBe(THEME.light.border);
        expect(s.borderWidth).toBeUndefined();
        expect(s.opacity).toBeUndefined();
      });
    });

    it('the rows are the card own children — one card, not a stack of cards', () => {
      const { getByText, getByTestId } = render({ children: ROWS });
      const card = getByTestId('xen-v4-settings-card');
      // No row paints a ground of its own; the container is the only card.
      expect(rules(card).length).toBe(2);
      expect(getByText('Language')).toBeDefined();
    });
  });

  describe('the group heading and footnote', () => {
    it('heading is sentence-case sm/semibold/mutedText — the uppercase xs is gone', () => {
      const { getByText } = render({ title: 'Account', children: ROWS });
      const s = flatStyle(getByText('Account').props.style);
      expect(s.fontSize).toBe(THEME.typography.scale.sm);
      expect(s.fontWeight).toBe('600');
      expect(s.color).toBe(THEME.light.mutedText);
      expect(s.textTransform).toBeUndefined();
      expect(s.fontSize).not.toBe(THEME.typography.scale.xs);
    });

    it('footnote is sm/mutedText, never the muted FILL', () => {
      const { getByText } = render({ footnote: 'Changes apply to this device.', children: ROWS });
      const s = flatStyle(getByText('Changes apply to this device.').props.style);
      expect(s.fontSize).toBe(THEME.typography.scale.sm);
      expect(s.color).toBe(THEME.light.mutedText);
    });

    it('both pay the ROW gutter so they line up with the row labels, not spacing.sm', () => {
      const { getByTestId } = render({
        title: 'Account',
        footnote: 'A footnote.',
        children: ROWS,
      });
      // `rowMetrics().padX` — the row family's own horizontal padding (§5).
      expect(flatStyle(getByTestId('xen-v4-settings-heading').props.style).paddingHorizontal).toBe(
        THEME.spacing.md
      );
      expect(flatStyle(getByTestId('xen-v4-settings-footnote').props.style).paddingHorizontal).toBe(
        THEME.spacing.md
      );
    });

    it('each collapses on its own — no padded empty line above or below the card', () => {
      const bare = render({ children: ROWS });
      expect(bare.queryByTestId('xen-v4-settings-heading')).toBeNull();
      expect(bare.queryByTestId('xen-v4-settings-footnote')).toBeNull();
      expect(bare.queryByTestId('xen-v4-settings-card')).not.toBeNull();

      const titled = render({ title: 'Account', children: ROWS });
      expect(titled.queryByTestId('xen-v4-settings-heading')).not.toBeNull();
      expect(titled.queryByTestId('xen-v4-settings-footnote')).toBeNull();
    });

    it('the heading-to-card step is spacing.xs', () => {
      const { getByTestId } = render({ title: 'Account', children: ROWS });
      expect(flatStyle(getByTestId('s').props.style).gap).toBe(THEME.spacing.xs);
    });
  });

  describe('§4.5 — empty states', () => {
    it('routes an empty group through EmptyStateV4, not a second implementation', () => {
      const { getByText, root } = render({
        title: 'Account',
        empty: { title: 'Nothing to configure', description: 'Settings will appear here.' },
      });
      expect(getByText('Nothing to configure')).toBeDefined();
      expect(getByText('Settings will appear here.')).toBeDefined();
      // The primitive's own rhythm: §4.5's `2xl` vertical padding.
      expect(
        allStyles(root).find((s) => s.paddingVertical === THEME.spacing['2xl'])
      ).toBeDefined();
    });

    it('the empty state sits INSIDE the card, so the group still reads as one object', () => {
      const { getByTestId } = render({ empty: { title: 'Nothing to configure' } });
      const card = getByTestId('xen-v4-settings-card');
      expect(card.findAllByType(RNText).length).toBeGreaterThan(0);
    });

    it('carries the icon and the single action through to the primitive', () => {
      const { getByText, getByTestId } = render({
        empty: {
          icon: <View testID="badge" />,
          title: 'Nothing to configure',
          action: <RNText>Add a device</RNText>,
        },
      });
      // The icon slot is decorative, so it is hidden from the a11y tree — §4.5.
      expect(getByTestId('badge', { includeHiddenElements: true })).toBeDefined();
      expect(getByText('Add a device')).toBeDefined();
    });

    it('rows win over the empty state — an empty state is for an EMPTY group', () => {
      const { queryByText } = render({
        empty: { title: 'Nothing to configure' },
        children: ROWS,
      });
      expect(queryByText('Nothing to configure')).toBeNull();
    });

    it('renders NOTHING for zero rows — not a bordered box, not a floating heading', () => {
      expect(renderThemed(<SettingsSectionV4 />, SEED_LIGHT).toJSON()).toBeNull();
      expect(
        renderThemed(
          <SettingsSectionV4 title="Account" footnote="A footnote." />,
          SEED_LIGHT
        ).toJSON()
      ).toBeNull();
      expect(renderThemed(<SettingsSectionV4>{null}</SettingsSectionV4>, SEED_LIGHT).toJSON()).toBeNull();
      expect(renderThemed(<SettingsSectionV4>{[]}</SettingsSectionV4>, SEED_LIGHT).toJSON()).toBeNull();
    });
  });

  describe('token purity and parity', () => {
    it('every colour it paints traces to a token — no literal hex', () => {
      const { root } = renderThemed(
        <SettingsSectionV4 title="Account" footnote="A footnote." insetSeparators>
          {ROWS}
        </SettingsSectionV4>,
        SEED_LIGHT
      );
      const allowed = tokenHexSet(SEED_LIGHT);
      const used = renderedStyleHexes(root);
      expect(used.length).toBeGreaterThan(0);
      used.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });

    it('spends no literal spacing — every metric is a token or the named 44', () => {
      const { root } = render({
        title: 'Account',
        footnote: 'A footnote.',
        insetSeparators: true,
        children: ROWS,
      });
      const spacings = Object.values(THEME.spacing);
      allStyles(root).forEach((s) => {
        (['padding', 'paddingHorizontal', 'gap'] as const).forEach((key) => {
          const value = s[key];
          if (typeof value === 'number' && value !== 0) expect(spacings).toContain(value);
        });
        if (typeof s.marginLeft === 'number' && s.marginLeft !== 0) {
          expect(s.marginLeft).toBe(LEADING);
        }
      });
    });

    it('ADDITIVE — every base prop still means what it meant', () => {
      const { getByText, root } = render({
        title: 'Account',
        footnote: 'Changes apply to this device.',
        children: ROWS,
      });
      expect(getByText('Account')).toBeDefined();
      expect(getByText('Changes apply to this device.')).toBeDefined();
      expect(getByText('Privacy')).toBeDefined();
      expect(rules(root)).toHaveLength(2);
    });

    it('accepts a style override and forwards the rest of the View props', () => {
      const { getByTestId } = renderThemed(
        <SettingsSectionV4 testID="s" style={{ marginTop: 12 }} pointerEvents="none">
          {ROWS}
        </SettingsSectionV4>,
        SEED_LIGHT
      );
      const el = getByTestId('s');
      const s = flatStyle(el.props.style);
      expect(s.marginTop).toBe(12);
      expect(s.gap).toBe(THEME.spacing.xs);
      expect(el.props.pointerEvents).toBe('none');
    });
  });
});
