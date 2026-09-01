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
import { flatStyle, type FlatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { EmptyDashboardV4 } from './EmptyDashboardV4';

const THEME = compileTheme(SEED_LIGHT);
const { spacing, radius } = THEME;

/**
 * `EmptyStateV4`'s own root, identified by the signature no other View in this
 * tree carries: centred on both axes, `xs` gap, `lg` gutter, `2xl` of vertical
 * padding. Finding it is how the native twin asserts §4.5's "routes through
 * `EmptyStateV4`" — there is no data attribute to look for on this platform.
 */
function emptyState(root: ReactTestInstance): FlatStyle | undefined {
  return hostStyles(root).find(
    (s) =>
      s.alignItems === 'center' &&
      s.justifyContent === 'center' &&
      s.gap === spacing.xs &&
      s.paddingHorizontal === spacing.lg &&
      s.paddingVertical === spacing['2xl']
  );
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

/** The one full-width pill. */
function ctaStyle(root: ReactTestInstance): FlatStyle | undefined {
  return hostStyles(root).find(
    (s) => s.alignSelf === 'stretch' && s.borderRadius === radius.full
  );
}

describe('EmptyDashboardV4 (native)', () => {
  describe('§4.5 — every empty state routes through EmptyStateV4', () => {
    it('draws no empty state of its own; the primitive draws it', () => {
      const { root, getByText } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" message="Add your first project." />,
        SEED_LIGHT
      );
      expect(emptyState(root)).toBeDefined();
      expect(getByText('Nothing here yet')).toBeTruthy();
      expect(getByText('Add your first project.')).toBeTruthy();
    });

    it('keeps the primitive type ramp and its mutedText body', () => {
      const { getByText } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" message="Add your first project." />,
        SEED_LIGHT
      );
      const headline = flatStyle(getByText('Nothing here yet').props.style);
      expect(headline.fontSize).toBe(THEME.typography.scale.lg);
      expect(headline.fontWeight).toBe('600');

      const body = flatStyle(getByText('Add your first project.').props.style);
      expect(body.fontSize).toBe(THEME.typography.scale.sm);
      // `mutedText`, never the `muted` FILL. (The compiler happens to resolve
      // both slots to the same hex on this seed, so the assertion is the
      // positive one — the negative would prove nothing.)
      expect(body.color).toBe(THEME.light.mutedText);
    });

    it('drops the base maxWidth: 340 literal — the measure is the primitive s', () => {
      const { root, getByText } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" message="Add your first project." />,
        SEED_LIGHT
      );
      expect(hostStyles(root).some((s) => s.maxWidth === 340)).toBe(false);
      // The primitive's measure instead: `2xl × 7`, off the spacing scale.
      expect(flatStyle(getByText('Add your first project.').props.style).maxWidth).toBe(
        spacing['2xl'] * 7
      );
    });

    it('renders with nothing but a title — no message, no icon, no action', () => {
      const { root, getByText } = renderThemed(
        <EmptyDashboardV4 title="All clear" />,
        SEED_LIGHT
      );
      expect(getByText('All clear')).toBeTruthy();
      expect(emptyState(root)).toBeDefined();
      expect(badges(root)).toHaveLength(0);
      expect(ctaStyle(root)).toBeUndefined();
    });
  });

  describe('§4.5 / §4.7 — the illustration is a 64 tinted circular badge', () => {
    it('builds it from IconV4 at the empty-state diameter', () => {
      const { root } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" iconName="sparkle" />,
        SEED_LIGHT
      );
      const disc = badges(root)[0];
      expect(disc).toBeDefined();
      // 64, composed off the spacing scale: `2xl + md`. Never a literal.
      expect(disc?.width).toBe(spacing['2xl'] + spacing.md);
      expect(disc?.height).toBe(spacing['2xl'] + spacing.md);
      // Tinted, not filled: `soft` is a wash of the tone over `surface`.
      expect(disc?.backgroundColor).not.toBe(THEME.light.primary);
      expect(typeof disc?.backgroundColor).toBe('string');
    });

    it('takes its tone from the semantic family, primary by default', () => {
      const primary = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" iconName="sparkle" />,
        SEED_LIGHT
      );
      const success = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" iconName="sparkle" tone="success" />,
        SEED_LIGHT
      );
      expect(badges(primary.root)[0]?.backgroundColor).not.toBe(
        badges(success.root)[0]?.backgroundColor
      );
    });

    it('lets a caller-supplied icon node win over iconName — the additive rule', () => {
      const { root } = renderThemed(
        <EmptyDashboardV4
          title="Nothing here yet"
          iconName="sparkle"
          icon={<RNText>own art</RNText>}
        />,
        SEED_LIGHT
      );
      // `EmptyStateV4` hides its icon slot from the accessibility tree, so the
      // node is found on the host tree rather than through a text query.
      expect(
        root.findAll((n) => typeof n.type === 'string' && n.props?.children === 'own art')
      ).toHaveLength(1);
      expect(badges(root)).toHaveLength(0);
    });
  });

  describe('the action — one full-width pill, inset from the edge', () => {
    it('renders it stretched, pill-radiused and inset by lg', () => {
      const onAction = jest.fn();
      const { root, getByTestId } = renderThemed(
        <EmptyDashboardV4
          title="Nothing here yet"
          actionLabel="Add a project"
          onAction={onAction}
        />,
        SEED_LIGHT
      );

      const pill = ctaStyle(root);
      expect(pill).toBeDefined();
      // HIG: a full-width button is inset from the screen edge. `lg` is the
      // page gutter (§4.1), and it belongs to the container.
      expect(
        hostStyles(root).some(
          (s) =>
            s.paddingHorizontal === spacing.lg && s.paddingBottom === spacing['2xl']
        )
      ).toBe(true);

      fireEvent.press(getByTestId('xen-v4-empty-cta'));
      expect(onAction).toHaveBeenCalledTimes(1);
    });

    it('is exactly one action — a label with no handler renders nothing', () => {
      const { root, queryByTestId } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" actionLabel="Add a project" />,
        SEED_LIGHT
      );
      expect(queryByTestId('xen-v4-empty-cta')).toBeNull();
      expect(ctaStyle(root)).toBeUndefined();
    });

    it('closes the state s own bottom padding down so the gap stays one step', () => {
      const withCta = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" actionLabel="Go" onAction={() => {}} />,
        SEED_LIGHT
      );
      expect(emptyState(withCta.root)?.paddingBottom).toBe(spacing.lg);

      const without = renderThemed(<EmptyDashboardV4 title="Nothing here yet" />, SEED_LIGHT);
      expect(emptyState(without.root)?.paddingBottom).toBeUndefined();
    });
  });

  it('keeps the accessible label and forwards style', () => {
    const { getByLabelText } = renderThemed(
      <EmptyDashboardV4 title="Nothing here yet" style={{ marginTop: spacing.md }} />,
      SEED_LIGHT
    );
    const el = getByLabelText('Nothing here yet');
    expect(flatStyle(el.props.style).marginTop).toBe(spacing.md);
  });

  it('paints no literal colour — every hex it renders traces to a token', () => {
    // The empty-state block on its own: nothing here is composited, so every
    // hex must be a value that exists in the compiled theme.
    const { root } = renderThemed(
      <EmptyDashboardV4 title="Nothing here yet" message="Add your first project." />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });

  it('takes the badge ground from the shared IconV4 wash, not a local mix', () => {
    const { root } = renderThemed(
      <EmptyDashboardV4 title="Nothing here yet" iconName="sparkle" />,
      SEED_LIGHT
    );
    // `SOFT_MIX` is IconV4's 14%, the same wash BadgeV4 and the feature rows
    // wear. Matching it exactly is the proof this component did not roll its
    // own tint — §10.2 / §10.5.
    expect(badges(root)[0]?.backgroundColor).toBe(
      mixToken(THEME.light.surface, THEME.light.primary, 0.14)
    );
  });

  it('spends no literal spacing — every gutter it sets is on the scale', () => {
    const { root } = renderThemed(
      <EmptyDashboardV4
        title="Nothing here yet"
        message="Add your first project."
        iconName="sparkle"
        actionLabel="Add a project"
        onAction={() => {}}
      />,
      SEED_LIGHT
    );
    const scale = new Set<number>(Object.values(spacing));
    hostStyles(root)
      .flatMap((s) => [s.paddingHorizontal, s.paddingBottom])
      .filter((v): v is number => typeof v === 'number' && v > 0)
      .forEach((v) => expect(scale.has(v)).toBe(true));
  });
});
