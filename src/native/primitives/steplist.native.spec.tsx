/**
 * `StepList` (native) — the vertical, content-bearing sibling of `Steps`. The
 * specs pin the two things that make it a different component: it carries a
 * body per step, and it reads the same at eight items as at three.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { StepList, type StepListItem } from './StepList';

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

const METHOD: StepListItem[] = [
  { id: 'a', title: 'Sear the onions', description: 'Medium heat, eight minutes, stir often.' },
  { id: 'b', title: 'Add the stock', description: 'Deglaze and scrape the fond off the base.' },
  { id: 'c', title: 'Simmer', description: 'Twenty minutes, lid ajar.' },
];

describe('StepList (native)', () => {
  it('renders every title AND its body, and is token-pure', () => {
    const { getByText, root } = renderThemed(<StepList steps={METHOD} />, SEED_LIGHT);
    expect(getByText('Sear the onions')).toBeTruthy();
    expect(getByText('Medium heat, eight minutes, stir often.')).toBeTruthy();
    expect(getByText('Simmer')).toBeTruthy();
    assertTokenPure(root);
  });

  it('numbers the steps 1..n when there is no `current`', () => {
    const { getByText, queryByText } = renderThemed(<StepList steps={METHOD} />, SEED_LIGHT);
    ['1', '2', '3'].forEach((n) => expect(getByText(n)).toBeTruthy());
    // Nothing is done without a current step — a recipe method is not a wizard.
    expect(queryByText('✓')).toBeNull();
  });

  it('checks off the steps before `current` and leaves the rest numbered', () => {
    const { getAllByText, getByText } = renderThemed(
      <StepList steps={METHOD} current={2} />,
      SEED_LIGHT
    );
    expect(getAllByText('✓')).toHaveLength(2);
    expect(getByText('3')).toBeTruthy();
  });

  it('honours a per-item `done` for non-linear checklists', () => {
    const { getAllByText } = renderThemed(
      <StepList steps={[{ title: 'A', done: true }, { title: 'B' }, { title: 'C', done: true }]} />,
      SEED_LIGHT
    );
    expect(getAllByText('✓')).toHaveLength(2);
  });

  it('stays legible at eight items — every title and body still renders', () => {
    const eight: StepListItem[] = Array.from({ length: 8 }, (_, i) => ({
      id: String(i),
      title: `Step number ${i + 1}`,
      description: `Body copy for step ${i + 1} that would have nowhere to live in Steps.`,
    }));
    const { getByText } = renderThemed(<StepList steps={eight} current={3} />, SEED_LIGHT);
    expect(getByText('Step number 8')).toBeTruthy();
    expect(getByText('Body copy for step 8 that would have nowhere to live in Steps.')).toBeTruthy();
  });

  it('is inert without onStepPress and tappable with it', () => {
    const inert = renderThemed(<StepList steps={METHOD} />, SEED_LIGHT);
    expect(inert.queryAllByRole('button')).toHaveLength(0);

    const onStepPress = jest.fn();
    const { getByText } = renderThemed(
      <StepList steps={METHOD} onStepPress={onStepPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Add the stock'));
    expect(onStepPress).toHaveBeenCalledWith(1);
  });

  it('renders an empty list without crashing', () => {
    const { root } = renderThemed(<StepList steps={[]} />, SEED_LIGHT);
    expect(root).toBeTruthy();
  });
});
