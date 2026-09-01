import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { SEED_LIGHT, renderThemed, renderedStyleHexes } from '../spec-support/render-native';
import { Inset } from './Inset';
import { InsetV4, type InsetV4Props } from './InsetV4';

const spacing = toNativeTokens(compileTheme(SEED_LIGHT)).spacing;

/** Flatten the `style` array RN components compose into one object. */
function flatStyle(node: ReactTestInstance): Record<string, unknown> {
  const style = node.props.style as unknown;
  const parts = (Array.isArray(style) ? style : [style]).filter(Boolean);
  return Object.assign({}, ...parts) as Record<string, unknown>;
}

describe('InsetV4 (native)', () => {
  it('IS the base component — two token-bound padding values leave nothing to restyle', () => {
    expect(InsetV4).toBe(Inset);
  });

  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Inset> = {
      space: 'lg',
      horizontal: 'sm',
      vertical: 'xl',
    };
    const asV4: InsetV4Props = same;
    expect(asV4).toBe(same);
  });

  it('pads uniformly from the compiled spacing scale', () => {
    (['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).forEach((space) => {
      const { getByTestId, unmount } = renderThemed(
        <InsetV4 testID="i" space={space} />,
        SEED_LIGHT
      );
      const flat = flatStyle(getByTestId('i'));
      expect(flat.paddingHorizontal).toBe(spacing[space]);
      expect(flat.paddingVertical).toBe(spacing[space]);
      unmount();
    });
  });

  it('defaults to md, which the caller overrides per §4.1 at the call site', () => {
    const { getByTestId } = renderThemed(<InsetV4 testID="i" />, SEED_LIGHT);
    const flat = flatStyle(getByTestId('i'));
    expect(flat.paddingHorizontal).toBe(spacing.md);
    expect(flat.paddingVertical).toBe(spacing.md);
  });

  it('lets horizontal and vertical override the uniform space independently', () => {
    const { getByTestId } = renderThemed(
      <InsetV4 testID="i" space="md" horizontal="lg" vertical="xs" />,
      SEED_LIGHT
    );
    const flat = flatStyle(getByTestId('i'));
    expect(flat.paddingHorizontal).toBe(spacing.lg);
    expect(flat.paddingVertical).toBe(spacing.xs);
  });

  it('wraps its children', () => {
    const { getByText } = renderThemed(
      <InsetV4 space="lg">
        <Text>content</Text>
      </InsetV4>,
      SEED_LIGHT
    );
    expect(getByText('content')).toBeTruthy();
  });

  it('still pads with no children — an empty padded box is a valid spacer block', () => {
    const { getByTestId } = renderThemed(<InsetV4 testID="i" space="lg" />, SEED_LIGHT);
    const el = getByTestId('i');
    expect(React.Children.count(el.props.children)).toBe(0);
    expect(flatStyle(el).paddingHorizontal).toBe(spacing.lg);
  });

  it('merges a caller style after its own', () => {
    const { getByTestId } = renderThemed(
      <InsetV4 testID="i" space="md" style={{ paddingVertical: 0 }} />,
      SEED_LIGHT
    );
    const flat = flatStyle(getByTestId('i'));
    expect(flat.paddingVertical).toBe(0);
    expect(flat.paddingHorizontal).toBe(spacing.md);
  });

  it('paints no colour at all — nothing for the token-purity rule to catch', () => {
    const { root } = renderThemed(
      <InsetV4 space="lg">
        <Text>content</Text>
      </InsetV4>,
      SEED_LIGHT
    );
    expect(renderedStyleHexes(root)).toEqual([]);
  });
});
