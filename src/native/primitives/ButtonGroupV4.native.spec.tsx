import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { Button } from './Button';
import { ButtonGroupV4 } from './ButtonGroupV4';

function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

const shell = (root: ReactTestInstance): Record<string, unknown> =>
  flat(root.findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)[0]?.props.style);

const group = (
  <ButtonGroupV4>
    <Button variant="secondary">Day</Button>
    <Button variant="secondary">Week</Button>
    <Button variant="secondary">Month</Button>
  </ButtonGroupV4>
);

describe('ButtonGroupV4 (native)', () => {
  it('closes the seams by flattening each child’s own corner', () => {
    const { UNSAFE_getAllByType } = renderThemed(group, SEED_LIGHT);
    // `overflow: 'hidden'` clips the CONTAINER's corners and nothing else, so
    // each child kept its own `radius.md` and the group notched at every seam.
    // This is the native equivalent of the web twin's `[&>*]:rounded-none`.
    UNSAFE_getAllByType(Button).forEach((b) => {
      expect(flat(b.props.style).borderRadius).toBe(0);
    });
  });

  it('claims no role it cannot keep', () => {
    const { root } = renderThemed(group, SEED_LIGHT);
    const container = root.findAll((n) => typeof n.type === 'string')[0];
    // `toolbar` promises arrow-key navigation this component does not provide,
    // and React Native has no `group` to swap in.
    expect(container?.props.accessibilityRole).toBeUndefined();
  });

  it('stretches its cells to one height, with a 44pt floor', () => {
    const theme = compileTheme(SEED_LIGHT);
    const style = shell(renderThemed(group, SEED_LIGHT).root);
    expect(style.alignItems).toBe('stretch');
    expect(style.minHeight).toBe(44);
    expect(style.borderRadius).toBe(theme.radius.md);
    expect(style.borderColor).toBe(theme.light.border);
  });

  it('hugs its content, and fills when asked', () => {
    expect(shell(renderThemed(group, SEED_LIGHT).root).alignSelf).toBe('flex-start');
    const filled = renderThemed(
      <ButtonGroupV4 fill>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroupV4>,
      SEED_LIGHT
    );
    expect(shell(filled.root).alignSelf).toBe('stretch');
  });

  it('draws one hairline between every pair, and none at the ends', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(group, SEED_LIGHT);
    const dividers = root
      .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
      .map((n) => flat(n.props.style))
      .filter((s) => s.width === 1 && s.backgroundColor === theme.light.border);
    expect(dividers).toHaveLength(2);
  });

  it('adds no colour of its own beyond the hairline', () => {
    const style = shell(renderThemed(group, SEED_LIGHT).root);
    // A segmented control groups by adjacency and an edge; the buttons inside
    // are what carry colour (§9, §11).
    expect(style.backgroundColor).toBeUndefined();
  });

  it('renders every child, and survives a lone one', () => {
    const { getByText } = renderThemed(group, SEED_LIGHT);
    ['Day', 'Week', 'Month'].forEach((t) => expect(getByText(t)).toBeTruthy());

    const one = renderThemed(
      <ButtonGroupV4>
        <Button>Only</Button>
      </ButtonGroupV4>,
      SEED_LIGHT
    );
    expect(one.getByText('Only')).toBeTruthy();
  });
});
