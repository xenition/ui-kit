import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { SEED_LIGHT, renderThemed, renderedStyleHexes } from '../spec-support/render-native';
import { Bleed } from './Bleed';
import { BleedV4, type BleedV4Props } from './BleedV4';

const spacing = toNativeTokens(compileTheme(SEED_LIGHT)).spacing;

/** Flatten the `style` array RN components compose into one object. */
function flatStyle(node: ReactTestInstance): Record<string, unknown> {
  const style = node.props.style as unknown;
  const parts = (Array.isArray(style) ? style : [style]).filter(Boolean);
  return Object.assign({}, ...parts) as Record<string, unknown>;
}

describe('BleedV4 (native)', () => {
  it('renders today’s Bleed by default — the new prop cannot move an existing caller', () => {
    const { getByTestId } = renderThemed(<BleedV4 testID="v4" space="lg" />, SEED_LIGHT);
    const { getByTestId: getBase } = renderThemed(<Bleed testID="base" space="lg" />, SEED_LIGHT);
    expect(flatStyle(getByTestId('v4'))).toEqual(flatStyle(getBase('base')));
  });

  it('keeps the base props with the same names and defaults', () => {
    const same: React.ComponentProps<typeof Bleed> = {
      space: 'lg',
      horizontal: 'sm',
      vertical: 'xl',
    };
    // Additive: every base prop is still accepted, unchanged.
    const asV4: BleedV4Props = same;
    expect(asV4).toBe(same);
  });

  it('negates the compiled spacing scale on both axes', () => {
    (['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).forEach((space) => {
      const { getByTestId, unmount } = renderThemed(
        <BleedV4 testID="b" space={space} />,
        SEED_LIGHT
      );
      const flat = flatStyle(getByTestId('b'));
      expect(flat.marginHorizontal).toBe(-spacing[space]);
      expect(flat.marginVertical).toBe(-spacing[space]);
      unmount();
    });
  });

  it('defaults to md on both axes', () => {
    const { getByTestId } = renderThemed(<BleedV4 testID="b" />, SEED_LIGHT);
    const flat = flatStyle(getByTestId('b'));
    expect(flat.marginHorizontal).toBe(-spacing.md);
    expect(flat.marginVertical).toBe(-spacing.md);
  });

  it('lets horizontal and vertical override the uniform space independently', () => {
    const { getByTestId } = renderThemed(
      <BleedV4 testID="b" space="md" horizontal="lg" vertical="xs" />,
      SEED_LIGHT
    );
    const flat = flatStyle(getByTestId('b'));
    expect(flat.marginHorizontal).toBe(-spacing.lg);
    expect(flat.marginVertical).toBe(-spacing.xs);
  });

  it('edge="start" bleeds only the leading side, leaving the other on the gutter', () => {
    const { getByTestId } = renderThemed(
      <BleedV4 testID="b" space="lg" edge="start" />,
      SEED_LIGHT
    );
    const flat = flatStyle(getByTestId('b'));
    // `marginStart` is RTL-aware, matching the web twin's logical `-ms-` class.
    expect(flat.marginStart).toBe(-spacing.lg);
    expect(flat.marginEnd).toBeUndefined();
    expect(flat.marginHorizontal).toBeUndefined();
  });

  it('edge="end" bleeds only the trailing side — the scrolling-chip-strip case', () => {
    const { getByTestId } = renderThemed(<BleedV4 testID="b" space="lg" edge="end" />, SEED_LIGHT);
    const flat = flatStyle(getByTestId('b'));
    expect(flat.marginEnd).toBe(-spacing.lg);
    expect(flat.marginStart).toBeUndefined();
    expect(flat.marginHorizontal).toBeUndefined();
  });

  it('edge="both" is the default and is the only value that bleeds both sides', () => {
    const { getByTestId } = renderThemed(<BleedV4 testID="b" space="sm" edge="both" />, SEED_LIGHT);
    const { getByTestId: getDefault } = renderThemed(<BleedV4 testID="d" space="sm" />, SEED_LIGHT);
    expect(flatStyle(getByTestId('b'))).toEqual(flatStyle(getDefault('d')));
    expect(flatStyle(getByTestId('b')).marginHorizontal).toBe(-spacing.sm);
  });

  it('edge governs the horizontal axis only — the vertical bleed is untouched', () => {
    const { getByTestId } = renderThemed(
      <BleedV4 testID="b" space="md" vertical="xl" edge="end" />,
      SEED_LIGHT
    );
    expect(flatStyle(getByTestId('b')).marginVertical).toBe(-spacing.xl);
  });

  it('takes the one-sided margin from `horizontal` when it is set', () => {
    const { getByTestId } = renderThemed(
      <BleedV4 testID="b" space="xs" horizontal="2xl" edge="start" />,
      SEED_LIGHT
    );
    expect(flatStyle(getByTestId('b')).marginStart).toBe(-spacing['2xl']);
  });

  it('wraps its children', () => {
    const { getByText } = renderThemed(
      <BleedV4 edge="end">
        <Text>content</Text>
      </BleedV4>,
      SEED_LIGHT
    );
    expect(getByText('content')).toBeTruthy();
  });

  it('renders an empty view with no children — an edge-to-edge slot with nothing in it', () => {
    const { getByTestId } = renderThemed(<BleedV4 testID="b" edge="end" />, SEED_LIGHT);
    const el = getByTestId('b');
    expect(React.Children.count(el.props.children)).toBe(0);
    expect(flatStyle(el).marginEnd).toBe(-spacing.md);
  });

  it('merges a caller style after its own', () => {
    const { getByTestId } = renderThemed(
      <BleedV4 testID="b" space="md" edge="end" style={{ marginVertical: 0 }} />,
      SEED_LIGHT
    );
    const flat = flatStyle(getByTestId('b'));
    expect(flat.marginVertical).toBe(0);
    expect(flat.marginEnd).toBe(-spacing.md);
  });

  it('paints no colour at all — nothing for the token-purity rule to catch', () => {
    const { root } = renderThemed(
      <BleedV4 space="lg" edge="end">
        <Text>content</Text>
      </BleedV4>,
      SEED_LIGHT
    );
    expect(renderedStyleHexes(root)).toEqual([]);
  });
});
