import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { MIN_CONTRAST, compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import type { ThemeSeed } from '../../theme/types';
import type { ChatBubbleProps } from './ChatBubble';
import { ChatBubbleV4 } from './ChatBubbleV4';

function mount(props: Partial<ChatBubbleProps> = {}, seed: ThemeSeed = SEED_LIGHT, scheme?: 'light' | 'dark') {
  return renderThemed(
    <ChatBubbleV4 meta="Ada · 09:14" {...props}>
      {props.children ?? 'Shipping tonight.'}
    </ChatBubbleV4>,
    seed,
    scheme
  );
}

/** The bubble itself: the one node carrying the 75% cap. */
function bubbleOf(root: ReactTestInstance): Record<string, unknown> {
  return root
    .findAll(() => true)
    .map((n) => flatStyle(n.props?.style))
    .find((s) => s.maxWidth === '75%')!;
}

describe('ChatBubbleV4 (native)', () => {
  it('takes exactly the base component’s props', () => {
    const same: ChatBubbleProps = {
      side: 'me',
      meta: 'Ada · 09:14',
      children: 'Shipping tonight.',
    };
    const asV4: React.ComponentProps<typeof ChatBubbleV4> = same;
    expect(asV4).toBe(same);
  });

  it('spends only compiler-guaranteed pairs, in both directions', () => {
    const colors = compileTheme(SEED_LIGHT).light;
    const them = mount();
    expect(bubbleOf(them.UNSAFE_root).backgroundColor).toBe(colors.surface);
    expect(them.getByText('Shipping tonight.').props.style.color).toBe(colors.onSurface);
    expect(bubbleOf(them.UNSAFE_root).borderWidth).toBe(1);

    const me = mount({ side: 'me' });
    expect(bubbleOf(me.UNSAFE_root).backgroundColor).toBe(colors.primary);
    expect(me.getByText('Shipping tonight.').props.style.color).toBe(colors.onPrimary);
    expect(bubbleOf(me.UNSAFE_root).borderWidth).toBe(0);
  });

  it('never reaches for a ramp step, which is what breaks the web base in dark', () => {
    const theme = compileTheme(SEED_DARK);
    const { UNSAFE_root } = mount({}, SEED_DARK, 'dark');
    const fill = bubbleOf(UNSAFE_root).backgroundColor;
    expect(fill).toBe(theme.dark.surface);
    // `neutral-100` in dark is one of the LIGHTEST steps there is, and
    // `onSurface` in dark is near-white — the pair the web base ships.
    expect(fill).not.toBe(theme.ramps.neutral[100]);
  });

  it('both pairs clear AA in BOTH schemes', () => {
    for (const seed of [SEED_LIGHT, SEED_DARK]) {
      const theme = compileTheme(seed);
      for (const scheme of [theme.light, theme.dark]) {
        expect(contrastRatio(scheme.onPrimary, scheme.primary)).toBeGreaterThanOrEqual(
          MIN_CONTRAST
        );
        expect(contrastRatio(scheme.onSurface, scheme.surface)).toBeGreaterThanOrEqual(
          MIN_CONTRAST
        );
      }
    }
  });

  it('says direction three ways: alignment, fill and one tightened corner', () => {
    const radius = compileTheme(SEED_LIGHT).radius;
    const them = mount();
    const themBubble = bubbleOf(them.UNSAFE_root);
    expect(themBubble.borderBottomLeftRadius).toBe(radius.sm);
    expect(themBubble.borderBottomRightRadius).toBe(radius.lg);

    const me = mount({ side: 'me' });
    const meBubble = bubbleOf(me.UNSAFE_root);
    expect(meBubble.borderBottomRightRadius).toBe(radius.sm);
    expect(meBubble.borderBottomLeftRadius).toBe(radius.lg);

    const align = (r: ReactTestInstance): unknown =>
      r
        .findAll(() => true)
        .map((n) => flatStyle(n.props?.style))
        .find((s) => s.alignItems !== undefined)!.alignItems;
    expect(align(them.UNSAFE_root)).toBe('flex-start');
    expect(align(me.UNSAFE_root)).toBe('flex-end');
  });

  it('pads and sizes off the scale', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root, getByText } = mount();
    const b = bubbleOf(UNSAFE_root);
    expect(b.paddingHorizontal).toBe(theme.spacing.md);
    expect(b.paddingVertical).toBe(theme.spacing.sm);
    // The two base twins disagreed on the message's size; V4 settles on `base`.
    expect(getByText('Shipping tonight.').props.style.fontSize).toBe(
      theme.typography.scale.base
    );
  });

  it('writes the meta line in the AA-promising muted slot', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = mount();
    expect(getByText('Ada · 09:14').props.style.color).toBe(theme.light.mutedText);
  });

  it('survives its empty state: no meta at all, and a node child', () => {
    const { queryByText, getByText } = mount({
      meta: undefined,
      children: <Text>Custom node</Text>,
    });
    expect(queryByText('Ada · 09:14')).toBeNull();
    expect(getByText('Custom node')).toBeTruthy();
  });
});
