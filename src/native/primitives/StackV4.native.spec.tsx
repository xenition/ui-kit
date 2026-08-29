import * as React from 'react';
import { Text } from 'react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { Stack, type StackProps } from './Stack';
import { StackV4 } from './StackV4';

describe('StackV4 (native)', () => {
  it('IS the base component — a pure layout primitive has nothing to restyle', () => {
    // Asserted rather than left as a comment, because the alias is a design
    // decision and not an accident: `Stack` paints no colour, draws no border,
    // has no radius and sets no type, so a V4 could only differ by changing
    // what `gap="md"` means — which would silently move every caller's layout.
    expect(StackV4).toBe(Stack);
  });

  it('takes exactly the base component’s props', () => {
    const same: StackProps = {
      direction: 'row',
      gap: 'lg',
      align: 'center',
      justify: 'between',
    };
    const asV4: React.ComponentProps<typeof StackV4> = same;
    expect(asV4).toBe(same);
  });

  it('already spends only tokens, which is why there was nothing to fix', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root } = renderThemed(
      <StackV4 direction="row" gap="lg" align="center" justify="between">
        <Text>a</Text>
        <Text>b</Text>
      </StackV4>,
      SEED_LIGHT
    );
    const style = UNSAFE_root
      .findAll(() => true)
      .map((n) => flatStyle(n.props?.style))
      .find((s) => s.flexDirection === 'row')!;
    expect(style.gap).toBe(theme.spacing.lg);
    expect(style.alignItems).toBe('center');
    expect(style.justifyContent).toBe('space-between');
    // No colour, no border, no radius, no type — nothing a design line owns.
    expect(style.backgroundColor).toBeUndefined();
    expect(style.borderWidth).toBeUndefined();
    expect(style.borderRadius).toBeUndefined();
  });
});
