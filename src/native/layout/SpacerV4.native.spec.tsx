import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { SEED_LIGHT, renderThemed, renderedStyleHexes } from '../spec-support/render-native';
import { Spacer } from './Spacer';
import { SpacerV4, type SpacerV4Props } from './SpacerV4';

const spacing = toNativeTokens(compileTheme(SEED_LIGHT)).spacing;

/**
 * A spacer is hidden from the accessibility tree on purpose, and RNTL's
 * queries skip hidden elements by default — so every lookup here has to opt
 * back in. That the option is *needed* is itself the proof the component is
 * correctly invisible to assistive tech.
 */
const HIDDEN = { includeHiddenElements: true } as const;

/** Flatten the `style` array RN components compose into one object. */
function flatStyle(node: ReactTestInstance): Record<string, unknown> {
  const style = node.props.style as unknown;
  const parts = (Array.isArray(style) ? style : [style]).filter(Boolean);
  return Object.assign({}, ...parts) as Record<string, unknown>;
}

describe('SpacerV4 (native)', () => {
  it('IS the base component — a token-pure spacer has nothing for a design line to restyle', () => {
    expect(SpacerV4).toBe(Spacer);
  });

  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Spacer> = { size: 'lg' };
    const asV4: SpacerV4Props = same;
    expect(asV4).toBe(same);
  });

  it('sizes every square from the compiled spacing scale', () => {
    (['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).forEach((size) => {
      const { getByTestId, unmount } = renderThemed(
        <SpacerV4 testID="s" size={size} />,
        SEED_LIGHT
      );
      const flat = flatStyle(getByTestId('s', HIDDEN));
      expect(flat.width).toBe(spacing[size]);
      expect(flat.height).toBe(spacing[size]);
      unmount();
    });
  });

  it('defaults to the md square when no size is given', () => {
    const { getByTestId } = renderThemed(<SpacerV4 testID="s" />, SEED_LIGHT);
    const flat = flatStyle(getByTestId('s', HIDDEN));
    expect(flat.width).toBe(spacing.md);
    expect(flat.height).toBe(spacing.md);
  });

  it('grows instead of measuring at size="flex" — flex factors, not spacing values', () => {
    const { getByTestId } = renderThemed(<SpacerV4 testID="s" size="flex" />, SEED_LIGHT);
    const flat = flatStyle(getByTestId('s', HIDDEN));
    expect(flat.flexGrow).toBe(1);
    expect(flat.flexShrink).toBe(1);
    expect(flat.width).toBeUndefined();
    expect(flat.height).toBeUndefined();
  });

  it('is hidden from the accessibility tree and holds nothing — the empty state IS the component', () => {
    const { getByTestId } = renderThemed(<SpacerV4 testID="s" />, SEED_LIGHT);
    const el = getByTestId('s', HIDDEN);
    expect(el.props.accessibilityElementsHidden).toBe(true);
    expect(el.props.importantForAccessibility).toBe('no-hide-descendants');
    expect(React.Children.count(el.props.children)).toBe(0);
  });

  it('merges a caller style after its own', () => {
    const { getByTestId } = renderThemed(
      <SpacerV4 testID="s" size="sm" style={{ alignSelf: 'flex-end' }} />,
      SEED_LIGHT
    );
    const flat = flatStyle(getByTestId('s', HIDDEN));
    expect(flat.alignSelf).toBe('flex-end');
    expect(flat.width).toBe(spacing.sm);
  });

  it('paints no colour at all — nothing for the token-purity rule to catch', () => {
    const { root } = renderThemed(<SpacerV4 size="xl" />, SEED_LIGHT);
    expect(renderedStyleHexes(root)).toEqual([]);
  });
});
