import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_BOTH,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { TagInputV4 } from './TagInputV4';

const THEME = compileTheme(SEED_LIGHT);
const TARGET = THEME.spacing['2xl'];
const RING = THEME.spacing.xs;
const GLYPH = THEME.spacing.md;

function styles(root: ReactTestInstance): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') out.push(style as Record<string, unknown>);
  };
  root.findAll(() => true).forEach((node) => walk(node.props?.style));
  return out;
}

function halo(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.padding === RING && s.margin === -RING);
}

describe('TagInputV4 (native)', () => {
  it('wears InputV4 s field treatment and wraps as tags accumulate', () => {
    const { root } = renderThemed(<TagInputV4 value={['a', 'b']} />, SEED_LIGHT);
    const field = styles(root).find((s) => s.borderWidth === 1 && s.minHeight === TARGET);
    expect(field?.borderRadius).toBe(THEME.radius.md);
    // The wrap sits in the override object layered over the shared field skin.
    expect(styles(root).some((s) => s.flexWrap === 'wrap')).toBe(true);
  });

  it('reserves the focus halo whether or not it is showing', () => {
    const { root, getByLabelText } = renderThemed(<TagInputV4 />, SEED_LIGHT);
    expect(halo(root)?.backgroundColor).toBe('transparent');
    fireEvent(getByLabelText('Add a tag'), 'focus');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
  });

  it('adds a tag on submit', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <TagInputV4 value={['React']} onChange={onChange} />,
      SEED_LIGHT
    );
    const input = getByLabelText('Add a tag');
    fireEvent.changeText(input, 'Vue');
    fireEvent(input, 'submitEditing');
    expect(onChange).toHaveBeenCalledWith(['React', 'Vue']);
  });

  it('keeps the draft and says so on a duplicate — §38, help recovery', () => {
    const onChange = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <TagInputV4 value={['React']} onChange={onChange} />,
      SEED_LIGHT
    );
    const input = getByLabelText('Add a tag');
    fireEvent.changeText(input, 'react');
    fireEvent(input, 'submitEditing');

    expect(onChange).not.toHaveBeenCalled();
    // What you typed is still there…
    expect(input.props.value).toBe('react');
    // …and the reason is on screen.
    const message = getByText('“react” is already added');
    expect(message.props.accessibilityLiveRegion).toBe('polite');
  });

  it('clears the message on the next keystroke', () => {
    const { getByLabelText, queryByText } = renderThemed(
      <TagInputV4 value={['React']} />,
      SEED_LIGHT
    );
    const input = getByLabelText('Add a tag');
    fireEvent.changeText(input, 'React');
    fireEvent(input, 'submitEditing');
    expect(queryByText('“React” is already added')).not.toBeNull();
    fireEvent.changeText(input, 'Reactx');
    expect(queryByText('“React” is already added')).toBeNull();
  });

  it('lets dedupe={false} through', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <TagInputV4 value={['React']} dedupe={false} onChange={onChange} />,
      SEED_LIGHT
    );
    const input = getByLabelText('Add a tag');
    fireEvent.changeText(input, 'React');
    fireEvent(input, 'submitEditing');
    expect(onChange).toHaveBeenCalledWith(['React', 'React']);
  });

  it('grows the remove target to the floor without growing the chip', () => {
    const { root, getByLabelText } = renderThemed(<TagInputV4 value={['React']} />, SEED_LIGHT);
    const remove = getByLabelText('Remove React');
    expect(remove.props.hitSlop).toBe(Math.round((TARGET - GLYPH) / 2));
    expect(GLYPH + remove.props.hitSlop * 2).toBeGreaterThanOrEqual(44);
    // The chip stays chip-sized.
    const chip = styles(root).find((s) => s.height === THEME.spacing.xl);
    expect(chip?.height).toBe(THEME.spacing.xl);
  });

  it('removes a tag by its ✕ and by backspace on an empty field', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <TagInputV4 value={['React', 'Vue']} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Remove React'));
    expect(onChange).toHaveBeenLastCalledWith(['Vue']);

    fireEvent(getByLabelText('Add a tag'), 'keyPress', { nativeEvent: { key: 'Backspace' } });
    expect(onChange).toHaveBeenLastCalledWith(['React']);
  });

  it('draws chips with the contrast-checked accent pair, readable at sm', () => {
    const { root, getByText } = renderThemed(<TagInputV4 value={['React']} />, SEED_LIGHT);
    const chip = styles(root).find((s) => s.backgroundColor === THEME.light.accent);
    expect(chip?.borderRadius).toBe(THEME.radius.full);
    const label = getByText('React');
    expect((label.props.style as { color: string }).color).toBe(THEME.light.onAccent);
    expect((label.props.style as { fontSize: number }).fontSize).toBe(
      THEME.typography.scale.sm
    );
  });

  it('turns the field danger when invalid', () => {
    const { root } = renderThemed(<TagInputV4 invalid />, SEED_LIGHT);
    const field = styles(root).find((s) => s.borderWidth === 1 && s.minHeight === TARGET);
    expect(field?.borderColor).toBe(THEME.light.danger);
  });

  it('renders token-pure in both schemes', () => {
    for (const scheme of ['light', 'dark'] as const) {
      const { root } = renderThemed(<TagInputV4 value={['React']} />, SEED_BOTH, scheme);
      const allowed = tokenHexSet(SEED_BOTH);
      for (const hex of renderedStyleHexes(root)) {
        expect(allowed.has(hex)).toBe(true);
      }
    }
  });
});
