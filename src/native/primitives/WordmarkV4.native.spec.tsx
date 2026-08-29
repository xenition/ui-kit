import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import type { WordmarkSize } from './Wordmark';
import { WordmarkV4 } from './WordmarkV4';

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

function styles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style));
}

describe('WordmarkV4 (native)', () => {
  it('sets the brand initial in the mark instead of a blank swatch', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(<WordmarkV4 name="Xenition" />, SEED_LIGHT);
    // "An icon inside a coloured rounded square" is §8's fourth tell, and the
    // base one did not even have the icon.
    const monogram = getByText('X', { includeHiddenElements: true });
    const style = flat(monogram.props.style);
    expect(style.color).toBe(theme.light.onPrimary);
    expect(contrastRatio(style.color as string, theme.light.primary)).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps the mark decorative — the name already says it', () => {
    const { root } = renderThemed(<WordmarkV4 name="Xenition" />, SEED_LIGHT);
    const hidden = root.findAll(
      (n) => n.props?.importantForAccessibility === 'no-hide-descendants'
    );
    expect(hidden.length).toBeGreaterThan(0);
  });

  it('honours a caller’s own mark, and `null` for none', () => {
    const custom = renderThemed(
      <WordmarkV4 name="Xenition" mark={<Text>LOGO</Text>} />,
      SEED_LIGHT
    );
    expect(custom.getByText('LOGO')).toBeTruthy();
    expect(custom.queryByText('X', { includeHiddenElements: true })).toBeNull();

    const none = renderThemed(<WordmarkV4 name="Xenition" mark={null} />, SEED_LIGHT);
    expect(none.queryByText('X', { includeHiddenElements: true })).toBeNull();
    expect(none.getByText('Xenition')).toBeTruthy();
  });

  it('sets the name in the seed’s heading face — not the system font', () => {
    const theme = compileTheme(SEED_DARK);
    const { getByText } = renderThemed(<WordmarkV4 name="Xenition" />, SEED_DARK);
    // The base explicitly set none, so the brand name was the display face on
    // the web and whatever the phone happened to use on a phone.
    expect(flat(getByText('Xenition').props.style).fontFamily).toBe(theme.typography.fontHeading);
  });

  it('reads its sizes off the scales, matching the web twin exactly', () => {
    const theme = compileTheme(SEED_LIGHT);
    const nameSize = (size: WordmarkSize): unknown =>
      flat(
        renderThemed(<WordmarkV4 name="Xenition" size={size} />, SEED_LIGHT).getByText('Xenition')
          .props.style
      ).fontSize;
    // The same values `text-base` / `text-lg` / `text-2xl` resolve to.
    expect(nameSize('sm')).toBe(theme.typography.scale.base);
    expect(nameSize('md')).toBe(theme.typography.scale.lg);
    expect(nameSize('lg')).toBe(theme.typography.scale['2xl']);

    const markSize = (size: WordmarkSize): unknown => {
      const { root } = renderThemed(<WordmarkV4 name="Xenition" size={size} />, SEED_LIGHT);
      return styles(root).find((s) => s.width !== undefined)?.width;
    };
    expect(markSize('sm')).toBe(theme.spacing.md);
    expect(markSize('md')).toBe(theme.spacing.md + theme.spacing.xs);
    expect(markSize('lg')).toBe(theme.spacing.lg + theme.spacing.xs);
  });

  it('gives a tappable wordmark a 44px target without inflating the mark', () => {
    const onPress = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <WordmarkV4 name="Xenition" size="sm" onPress={onPress} />,
      SEED_LIGHT
    );
    const link = getByLabelText('Xenition');
    const slop = link.props.hitSlop as { top: number; left: number };
    const theme = compileTheme(SEED_LIGHT);
    expect(theme.spacing.md + slop.top * 2).toBeGreaterThanOrEqual(44);
    // …and the mark is still mark-sized.
    expect(styles(root).find((s) => s.width !== undefined)?.width).toBe(theme.spacing.md);

    fireEvent.press(link);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('stays a plain row when it is not a link', () => {
    const { queryByLabelText, getByText } = renderThemed(
      <WordmarkV4 name="Xenition" />,
      SEED_LIGHT
    );
    expect(queryByLabelText('Xenition')).toBeNull();
    expect(getByText('Xenition')).toBeTruthy();
  });

  it('never carries a gradient — a logo that shimmers competes with the page', () => {
    const { queryByLabelText } = renderThemed(<WordmarkV4 name="Xenition" />, SEED_LIGHT);
    expect(queryByLabelText('linear-gradient')).toBeNull();
  });
});
