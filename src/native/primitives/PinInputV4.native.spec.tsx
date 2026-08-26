import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { TextInput } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { PinInputV4 } from './PinInputV4';

const THEME = compileTheme(SEED_LIGHT);
const RING = THEME.spacing.xs;
const HEIGHT = THEME.spacing['2xl'];

/**
 * Every distinct style object in the tree. Deduped by identity: RN renders a
 * host node inside each composite one and hands the same object to both, so a
 * plain walk counts every box twice.
 */
function styles(root: ReactTestInstance): Record<string, unknown>[] {
  const seen = new Set<unknown>();
  const out: Record<string, unknown>[] = [];
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object' && !seen.has(style)) {
      seen.add(style);
      out.push(style as Record<string, unknown>);
    }
  };
  root.findAll(() => true).forEach((node) => walk(node.props?.style));
  return out;
}

describe('PinInputV4 (native)', () => {
  it('renders one box per character at the form control height', () => {
    const { UNSAFE_getAllByType, root } = renderThemed(
      <PinInputV4 value="" onChange={() => {}} />,
      SEED_LIGHT
    );
    expect(UNSAFE_getAllByType(TextInput)).toHaveLength(6);
    const box = styles(root).find((s) => s.height === HEIGHT && s.borderWidth === 1);
    expect(box?.width).toBe(HEIGHT - THEME.spacing.sm);
    expect(box?.borderRadius).toBe(THEME.radius.md);
    expect(box?.fontVariant).toEqual(['tabular-nums']);
    expect(box?.textAlign).toBe('center');
  });

  it('spreads a pasted code across the boxes instead of dropping five of six', () => {
    const onChange = jest.fn();
    const { UNSAFE_getAllByType } = renderThemed(
      <PinInputV4 value="" onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.changeText(UNSAFE_getAllByType(TextInput)[0]!, '123456');
    expect(onChange).toHaveBeenCalledWith('123456');
  });

  it('pastes forward from the box that received it, and stops at the end', () => {
    const onChange = jest.fn();
    const { UNSAFE_getAllByType } = renderThemed(
      <PinInputV4 value="12" onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.changeText(UNSAFE_getAllByType(TextInput)[2]!, '9876543');
    expect(onChange).toHaveBeenCalledWith('129876');
  });

  it('asks the OS for the code once, not six times', () => {
    const { UNSAFE_getAllByType } = renderThemed(
      <PinInputV4 value="" onChange={() => {}} />,
      SEED_LIGHT
    );
    const all = UNSAFE_getAllByType(TextInput);
    expect(all[0]!.props.textContentType).toBe('oneTimeCode');
    expect(all[1]!.props.textContentType).toBe('none');
    expect(all[0]!.props.keyboardType).toBe('numeric');
  });

  it('reports a single character into its own box', () => {
    const onChange = jest.fn();
    const { UNSAFE_getAllByType } = renderThemed(
      <PinInputV4 value="" onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.changeText(UNSAFE_getAllByType(TextInput)[1]!, '7');
    expect(onChange).toHaveBeenCalledWith('7');
  });

  it('clears a box when it is emptied', () => {
    const onChange = jest.fn();
    const { UNSAFE_getAllByType } = renderThemed(
      <PinInputV4 value="12" onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.changeText(UNSAFE_getAllByType(TextInput)[1]!, '');
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('shows its own progress: a filled box keeps the brand edge', () => {
    const { root } = renderThemed(<PinInputV4 value="12" onChange={() => {}} />, SEED_LIGHT);
    const borders = styles(root)
      .filter((s) => s.height === HEIGHT && s.borderWidth === 1)
      .map((s) => s.borderColor);
    expect(borders.filter((c) => c === THEME.light.primary)).toHaveLength(2);
    expect(borders.filter((c) => c === THEME.light.border)).toHaveLength(4);
  });

  it('reserves a halo per box and lights the focused one', () => {
    const { root, UNSAFE_getAllByType } = renderThemed(
      <PinInputV4 value="" onChange={() => {}} />,
      SEED_LIGHT
    );
    const halos = (): Record<string, unknown>[] =>
      styles(root).filter((s) => s.padding === RING && s.margin === -RING);
    expect(halos()).toHaveLength(6);
    expect(halos().every((s) => s.backgroundColor === 'transparent')).toBe(true);

    fireEvent(UNSAFE_getAllByType(TextInput)[2]!, 'focus');
    expect(halos().filter((s) => s.backgroundColor !== 'transparent')).toHaveLength(1);
  });

  it('honours a custom length', () => {
    const { UNSAFE_getAllByType } = renderThemed(
      <PinInputV4 length={4} value="" onChange={() => {}} />,
      SEED_LIGHT
    );
    expect(UNSAFE_getAllByType(TextInput)).toHaveLength(4);
  });

  it('spends no depth on a form control — no gradient, no shadow', () => {
    const { root, queryByLabelText } = renderThemed(
      <PinInputV4 value="" onChange={() => {}} />,
      SEED_LIGHT
    );
    expect(queryByLabelText('linear-gradient')).toBeNull();
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });
});
