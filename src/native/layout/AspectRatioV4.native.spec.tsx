import * as React from 'react';
import { Text, View } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { AspectRatioV4 } from './AspectRatioV4';

/** The frame itself — the outermost view the component draws. */
function frameStyle(root: ReactTestInstance): Record<string, unknown> {
  return flatStyle(root.findAllByType(View)[0]!.props.style);
}

describe('AspectRatioV4 (native)', () => {
  it('locks the box to the ratio it was given', () => {
    const { UNSAFE_root: root } = renderThemed(<AspectRatioV4 ratio={16 / 9} />, SEED_LIGHT);
    const style = frameStyle(root);
    expect(style.aspectRatio).toBe(16 / 9);
    expect(style.width).toBe('100%');
  });

  it('takes any ratio, including a square', () => {
    expect(frameStyle(renderThemed(<AspectRatioV4 ratio={1} />, SEED_LIGHT).UNSAFE_root).aspectRatio).toBe(
      1
    );
    expect(
      frameStyle(renderThemed(<AspectRatioV4 ratio={4 / 3} />, SEED_LIGHT).UNSAFE_root).aspectRatio
    ).toBe(4 / 3);
  });

  it('hides its overflow, so Android clips media to the corner too (§5)', () => {
    // Android will not clip a child to the parent's borderRadius without this;
    // a rounded frame was square on Android and round on iOS.
    const { UNSAFE_root: root } = renderThemed(<AspectRatioV4 ratio={1} rounded />, SEED_LIGHT);
    expect(frameStyle(root).overflow).toBe('hidden');
    // …and it is unconditional, not a side effect of `rounded`.
    const plain = renderThemed(<AspectRatioV4 ratio={1} />, SEED_LIGHT);
    expect(frameStyle(plain.UNSAFE_root).overflow).toBe('hidden');
  });

  it('is square-cornered by default — unchanged from the base (§1.4)', () => {
    const { UNSAFE_root: root } = renderThemed(<AspectRatioV4 ratio={1} />, SEED_LIGHT);
    expect(frameStyle(root).borderRadius).toBeUndefined();
  });

  it('rounded={true} still means the card radius, exactly as the base did', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root: root } = renderThemed(<AspectRatioV4 ratio={1} rounded />, SEED_LIGHT);
    // §4.2's card corner, so a hero panel matches the cards around it.
    expect(frameStyle(root).borderRadius).toBe(theme.radius.lg);
  });

  it('rounded takes a step, so a thumbnail need not wear the hero corner', () => {
    const theme = compileTheme(SEED_LIGHT);
    const small = renderThemed(<AspectRatioV4 ratio={1} rounded="sm" />, SEED_LIGHT);
    const medium = renderThemed(<AspectRatioV4 ratio={1} rounded="md" />, SEED_LIGHT);
    const large = renderThemed(<AspectRatioV4 ratio={1} rounded="lg" />, SEED_LIGHT);
    expect(frameStyle(small.UNSAFE_root).borderRadius).toBe(theme.radius.sm);
    expect(frameStyle(medium.UNSAFE_root).borderRadius).toBe(theme.radius.md);
    expect(frameStyle(large.UNSAFE_root).borderRadius).toBe(theme.radius.lg);
  });

  it('rounded={false} clips square', () => {
    const { UNSAFE_root: root } = renderThemed(<AspectRatioV4 ratio={1} rounded={false} />, SEED_LIGHT);
    expect(frameStyle(root).borderRadius).toBeUndefined();
  });

  it('renders the media it is handed, untouched', () => {
    const { getByText } = renderThemed(
      <AspectRatioV4 ratio={16 / 9}>
        <Text>Cover</Text>
      </AspectRatioV4>,
      SEED_LIGHT
    );
    expect(getByText('Cover')).toBeTruthy();
  });

  it('empty state: an empty frame keeps its geometry rather than collapsing', () => {
    // The whole job is reserving the space before the media arrives; rendering
    // null here would reflow the screen around the gap it was preventing.
    const { UNSAFE_root: root, toJSON } = renderThemed(<AspectRatioV4 ratio={16 / 9} rounded />, SEED_LIGHT);
    expect(toJSON()).toBeTruthy();
    expect(frameStyle(root).aspectRatio).toBe(16 / 9);
  });

  it('empty state: paints no ground and no border to leave behind', () => {
    const { UNSAFE_root: root } = renderThemed(<AspectRatioV4 ratio={1} />, SEED_LIGHT);
    const style = frameStyle(root);
    expect(style.backgroundColor).toBeUndefined();
    expect(style.borderWidth).toBeUndefined();
  });

  it('carries no shadow — §4.6 gives one to a card, a sheet and the one action', () => {
    const { UNSAFE_root: root } = renderThemed(<AspectRatioV4 ratio={1} rounded />, SEED_LIGHT);
    const style = frameStyle(root);
    expect(style.shadowOpacity).toBeUndefined();
    expect(style.elevation).toBeUndefined();
  });

  it('merges a caller’s style rather than losing its own geometry', () => {
    const { UNSAFE_root: root } = renderThemed(
      <AspectRatioV4 ratio={1} style={{ marginTop: 8 }} />,
      SEED_LIGHT
    );
    const style = frameStyle(root);
    expect(style.marginTop).toBe(8);
    expect(style.aspectRatio).toBe(1);
    expect(style.overflow).toBe('hidden');
  });

  it('passes view props through', () => {
    const { getByTestId } = renderThemed(
      <AspectRatioV4 ratio={1} testID="hero" accessibilityLabel="Cover" />,
      SEED_LIGHT
    );
    expect(getByTestId('hero').props.accessibilityLabel).toBe('Cover');
  });

  it('every colour it paints traces to a token — there are none (§1.1)', () => {
    const allowed = tokenHexSet(SEED_LIGHT);
    const { UNSAFE_root: root } = renderThemed(<AspectRatioV4 ratio={16 / 9} rounded="md" />, SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
