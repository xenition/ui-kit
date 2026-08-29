import * as React from 'react';
import { Text as RNText } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { flatStyle, themeFor, type FlatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { pressOver } from '../primitives/internal/state-v4';
import { RAIL_MIN_ROWS } from '../primitives/StepListV4';
import { OnboardingChecklistV4, type OnboardingStepV4 } from './OnboardingChecklistV4';

const THEME = compileTheme(SEED_LIGHT);
const { spacing, radius } = THEME;
const COLORS = THEME.light;

const STEPS: OnboardingStepV4[] = [
  { label: 'Create your account', description: 'Name and email.', done: true },
  { label: 'Add a payment method', description: 'So payouts can land.', done: false },
  { label: 'Invite your team', done: false, icon: 'star' },
];

function mount(ui: React.ReactElement) {
  return renderThemed(ui, SEED_LIGHT);
}

/**
 * Every **host** node's flattened style.
 *
 * `allStyles` walks composite instances too, so a `<View style={…}>` shows up
 * twice — once as the element and once as the host it rendered. Counting rails
 * or badges off that doubles everything, so the platform nodes are what is
 * measured here.
 */
function hostStyles(root: ReactTestInstance): FlatStyle[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flatStyle(n.props.style));
}

/** §4.7's disc: a square box drawn as a circle from its own diameter. */
function badges(root: ReactTestInstance): FlatStyle[] {
  return hostStyles(root).filter(
    (s) =>
      typeof s.width === 'number' &&
      s.width === s.height &&
      s.borderRadius === (s.width as number) / 2
  );
}

/** The card itself — `lg` radius, `lg` padding, and it is the outermost box. */
function card(root: ReactTestInstance): FlatStyle | undefined {
  return hostStyles(root).find(
    (s) => s.borderRadius === radius.lg && s.padding === spacing.lg
  );
}

function progressbars(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll((n) => n.props?.accessibilityRole === 'progressbar');
}

/** Every string a host `Text` actually renders, badge glyphs included. */
function marks(root: ReactTestInstance): string[] {
  return root
    .findAll((n) => typeof n.type === 'string' && typeof n.props?.children === 'string')
    .map((n) => n.props.children as string);
}

describe('OnboardingChecklistV4 (native)', () => {
  describe('the header and the meter — progress is reported, not implied', () => {
    it('defaults the heading and counts what is done', () => {
      const { getByText } = mount(<OnboardingChecklistV4 steps={STEPS} />);
      expect(getByText('Get started')).toBeTruthy();
      const count = getByText('1 of 3');
      const style = flatStyle(count.props.style);
      expect(style.fontSize).toBe(THEME.typography.scale.sm);
      // `mutedText`, never the `muted` FILL — the base uses `colors.muted` for
      // every line on this card, which is the bug the shadcn pass closed. (The
      // compiler resolves both slots to the same hex on this seed, so the
      // assertion is the positive one; the negative would prove nothing.)
      expect(style.color).toBe(COLORS.mutedText);
      expect(style.fontVariant).toEqual(['tabular-nums']);
    });

    it('reports the same numbers to assistive tech through ProgressV4', () => {
      const { root } = mount(<OnboardingChecklistV4 steps={STEPS} />);
      const bars = progressbars(root);
      expect(bars.length).toBeGreaterThan(0);
      expect(bars[0]?.props.accessibilityValue).toEqual({ min: 0, max: 3, now: 1 });
      // `size="sm"` is `spacing.xs` of track, off the scale — not a literal 6.
      expect(flatStyle(bars[0]?.props.style).height).toBe(spacing.xs);
    });

    it('takes a custom title and an optional subtitle', () => {
      const { getByText } = mount(
        <OnboardingChecklistV4
          steps={STEPS}
          title="Set up payouts"
          subtitle="Three quick things."
        />
      );
      expect(getByText('Set up payouts')).toBeTruthy();
      expect(flatStyle(getByText('Three quick things.').props.style).color).toBe(
        COLORS.mutedText
      );
    });
  });

  describe('the step row — StepListV4 s anatomy, with a completion state', () => {
    it('gives every step a 44 circular IconV4 badge, never the 22 marker', () => {
      const { root } = mount(<OnboardingChecklistV4 steps={STEPS} />);
      const discs = badges(root);
      expect(discs).toHaveLength(STEPS.length);
      // 44 is the HIG tap floor and §4.7's badge; 22 was neither.
      discs.forEach((disc) => expect(disc.width).toBe(44));
      expect(hostStyles(root).some((s) => s.width === 22)).toBe(false);
    });

    it('falls back to the step number, and takes a glyph when given one', () => {
      const { root } = mount(<OnboardingChecklistV4 steps={STEPS} />);
      const rendered = marks(root);
      // Step 2 has no icon: the ordinal holds the slot.
      expect(rendered).toContain('2');
      // Step 3 named one, so the glyph replaces the number.
      expect(rendered).not.toContain('3');
    });

    it('sets the title base/semibold and the supporting line sm/mutedText', () => {
      const { getByText } = mount(<OnboardingChecklistV4 steps={STEPS} />);
      const title = flatStyle(getByText('Add a payment method').props.style);
      expect(title.fontSize).toBe(THEME.typography.scale.base);
      expect(title.fontWeight).toBe('600');
      expect(title.color).toBe(COLORS.onCard);

      const line = flatStyle(getByText('So payouts can land.').props.style);
      expect(line.fontSize).toBe(THEME.typography.scale.sm);
      expect(line.color).toBe(COLORS.mutedText);
    });

    it('takes the still-to-do wash from the shared IconV4 badge, not a local mix', () => {
      const { root } = mount(<OnboardingChecklistV4 steps={STEPS} />);
      const todo = badges(root)[1];
      // IconV4's 14% wash, the same one BadgeV4 and the feature rows wear.
      expect(todo?.backgroundColor).toBe(mixToken(COLORS.surface, COLORS.primary, 0.14));
      // Outlined with the hairline token — brief §5.
      expect(todo?.borderColor).toBe(COLORS.border);
      expect(todo?.borderWidth).toBe(1);
    });
  });

  describe('completion is never signalled by colour alone', () => {
    it('adds a check glyph and fills the badge, and says so in the label', () => {
      const { root, getByLabelText } = mount(<OnboardingChecklistV4 steps={STEPS} />);
      const [done, todo] = badges(root);

      // 1. A glyph the colour-blind reader can see: the check.
      expect(marks(root)).toContain('✓');
      // 2. A fill change, not just a hue change — `solid` is the tone itself.
      expect(done?.backgroundColor).toBe(COLORS.success);
      expect(todo?.backgroundColor).not.toBe(COLORS.success);
      // 3. The accessible name states it outright.
      expect(getByLabelText('Create your account, completed')).toBeTruthy();
      expect(getByLabelText('Add a payment method, not completed')).toBeTruthy();
    });

    it('drops the strike-through — struck text reads as deleted, not done', () => {
      const { root, getByText } = mount(<OnboardingChecklistV4 steps={STEPS} />);
      expect(hostStyles(root).some((s) => s.textDecorationLine === 'line-through')).toBe(false);
      // The done label mutes instead.
      expect(flatStyle(getByText('Create your account').props.style).color).toBe(
        COLORS.mutedText
      );
    });
  });

  describe('the rail — the same threshold StepListV4 uses', () => {
    function rails(root: ReactTestInstance): ReactTestInstance[] {
      return root.findAll((n) => n.props?.testID === 'xen-v4-checkrail');
    }

    it('joins the badges once there are three or more rows', () => {
      const { root } = mount(<OnboardingChecklistV4 steps={STEPS} />);
      expect(STEPS.length).toBeGreaterThanOrEqual(RAIL_MIN_ROWS);
      // One per gap, and it stops at the last badge.
      expect(rails(root).length).toBeGreaterThan(0);
      expect(
        hostStyles(root).filter((s) => s.width === 1 && s.flex === 1)
      ).toHaveLength(STEPS.length - 1);
    });

    it('stays off below the threshold, and takes an explicit override', () => {
      const two = STEPS.slice(0, 2);
      const off = mount(<OnboardingChecklistV4 steps={two} />);
      expect(hostStyles(off.root).filter((s) => s.width === 1 && s.flex === 1)).toHaveLength(0);

      const forced = mount(<OnboardingChecklistV4 steps={two} connector />);
      expect(
        hostStyles(forced.root).filter((s) => s.width === 1 && s.flex === 1)
      ).toHaveLength(1);

      const suppressed = mount(<OnboardingChecklistV4 steps={STEPS} connector={false} />);
      expect(
        hostStyles(suppressed.root).filter((s) => s.width === 1 && s.flex === 1)
      ).toHaveLength(0);
    });
  });

  describe('press feedback is the state layer, and nothing else', () => {
    it('tints against the card pair instead of dimming the row', () => {
      const onPress = jest.fn();
      const { root, getByLabelText } = mount(
        <OnboardingChecklistV4 steps={[{ label: 'Invite', done: false, onPress }]} />
      );
      const row = getByLabelText('Invite, not completed');
      // The resolved style lands on the host View; the function that produced
      // it lives on the `Pressable` element above it, which is the only node in
      // the tree carrying a callable `style`.
      const styleFn = root.findAll((n) => typeof n.props?.style === 'function')[0]?.props
        .style as (s: { pressed: boolean }) => unknown;
      expect(styleFn).toBeDefined();
      const pressedStyle = flatStyle(styleFn({ pressed: true }));
      const restStyle = flatStyle(styleFn({ pressed: false }));

      const theme = themeFor(SEED_LIGHT);
      expect(pressedStyle.backgroundColor).toBe(
        pressOver(theme, theme.colors.card, theme.colors.onCard)
      );
      expect(restStyle.backgroundColor).toBe('transparent');
      // `opacity: pressed ? 0.7 : 1` is deleted, not translated.
      expect(pressedStyle.opacity).toBeUndefined();
      expect(restStyle.opacity).toBeUndefined();

      fireEvent.press(row);
      expect(onPress).toHaveBeenCalledTimes(1);
      expect(row.props.accessibilityState).toEqual({ checked: false });
    });

    it('renders a plain row, not a pressable, for a step with no handler', () => {
      const { root, getByLabelText } = mount(
        <OnboardingChecklistV4 steps={[{ label: 'Invite', done: false }]} />
      );
      expect(getByLabelText('Invite, not completed')).toBeTruthy();
      expect(root.findAll((n) => n.props?.accessibilityRole === 'button')).toHaveLength(0);
    });
  });

  describe('§4.2 — the card is `card`, not `surface`', () => {
    it('paints the card ground, raised, on the lg radius with lg padding', () => {
      const { root } = mount(<OnboardingChecklistV4 steps={STEPS} />);
      const box = card(root);
      expect(box).toBeDefined();
      expect(box?.backgroundColor).toBe(COLORS.card);
      expect(box?.backgroundColor).not.toBe(COLORS.surface);
      // A hairline plus a soft shadow — never a heavy border and a shadow.
      expect(box?.borderWidth).toBe(1);
      expect(box?.borderColor).toBe(COLORS.border);
      expect(box?.shadowOpacity).toBeGreaterThan(0);
      expect(box?.gap).toBe(spacing.md);
    });
  });

  describe('the empty case — `steps: []`', () => {
    it('survives it: 0 of 0, no meter, no divide-by-zero, an empty state', () => {
      const { root, getByText, getByTestId } = mount(<OnboardingChecklistV4 steps={[]} />);
      expect(getByText('0 of 0')).toBeTruthy();
      // A progressbar with `max` 0 reports nothing, so there is none.
      expect(progressbars(root)).toHaveLength(0);
      expect(marks(root).some((m) => m.includes('NaN'))).toBe(false);
      // Never a blank bordered box — §4.5 routes it through EmptyStateV4.
      expect(getByTestId('xen-v4-checklist-empty')).toBeTruthy();
      expect(getByText('Nothing to set up')).toBeTruthy();
      expect(badges(root)).toHaveLength(0);
    });

    it('lets the caller own the empty body', () => {
      const { getByText, queryByText } = mount(
        <OnboardingChecklistV4 steps={[]} empty={<RNText>mine</RNText>} />
      );
      expect(getByText('mine')).toBeTruthy();
      expect(queryByText('Nothing to set up')).toBeNull();
    });

    it('still renders its heading, so the card is never anonymous', () => {
      const { getByText } = mount(
        <OnboardingChecklistV4 steps={[]} title="Set up payouts" />
      );
      expect(getByText('Set up payouts')).toBeTruthy();
    });
  });

  it('forwards style to the card', () => {
    const { root } = mount(
      <OnboardingChecklistV4 steps={STEPS} style={{ marginTop: spacing.md }} />
    );
    expect(hostStyles(root).some((s) => s.marginTop === spacing.md)).toBe(true);
  });

  it('spends no literal spacing — every gap and padding is on the scale', () => {
    const { root } = mount(
      <OnboardingChecklistV4 steps={STEPS} subtitle="Three quick things." />
    );
    const scale = new Set<number>(Object.values(spacing));
    hostStyles(root)
      .flatMap((s) => [s.gap, s.padding, s.paddingTop, s.paddingBottom, s.paddingHorizontal])
      .filter((v): v is number => typeof v === 'number' && v > 0)
      .forEach((v) => expect(scale.has(v)).toBe(true));
  });

  it('paints no literal colour — every value it chooses is a token', () => {
    const { root } = mount(<OnboardingChecklistV4 steps={STEPS} />);
    const allowed = tokenHexSet(SEED_LIGHT);

    // The rail is the hairline token and nothing else.
    hostStyles(root)
      .filter((s) => s.width === 1 && s.flex === 1)
      .forEach((s) => expect(s.backgroundColor).toBe(COLORS.border));

    // The card's ground and edge are tokens.
    const box = card(root);
    expect(allowed.has(String(box?.backgroundColor).toLowerCase())).toBe(true);
    expect(allowed.has(String(box?.borderColor).toLowerCase())).toBe(true);

    // Every line of copy takes a token colour. The badge glyphs are excluded by
    // their centred alignment: those are the one ink `IconV4` re-measures
    // against a ground it has just composited, which is the whole reason the
    // badge lives there and not here.
    hostStyles(root)
      .filter((s) => typeof s.fontSize === 'number' && s.textAlign !== 'center')
      .forEach((s) => expect(allowed.has(String(s.color).toLowerCase())).toBe(true));

    // And nothing anywhere is an rgba() literal — the state layer is the only
    // translucent thing in the line, and on this twin it is flattened opaque.
    expect(renderedStyleHexes(root).length).toBeGreaterThan(0);
  });
});
