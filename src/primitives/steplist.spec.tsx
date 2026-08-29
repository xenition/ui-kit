/** @jest-environment jsdom */
/**
 * `StepList` (web) — twin of the native `StepList`, same props but `onStepClick`
 * for `onStepPress` (the house swap). Same invariants: every step keeps its
 * body, eight items read as well as three, and no literal colour is emitted.
 */
import { fireEvent, render } from '@testing-library/react';
import { StepList, type StepListItem } from './StepList';

const METHOD: StepListItem[] = [
  { id: 'a', title: 'Sear the onions', description: 'Medium heat, eight minutes, stir often.' },
  { id: 'b', title: 'Add the stock', description: 'Deglaze and scrape the fond off the base.' },
  { id: 'c', title: 'Simmer', description: 'Twenty minutes, lid ajar.' },
];

describe('StepList (web)', () => {
  it('renders every title AND its body against token classes only', () => {
    const { getByText, container } = render(<StepList steps={METHOD} />);
    expect(getByText('Sear the onions')).toBeTruthy();
    expect(getByText('Medium heat, eight minutes, stir often.')).toBeTruthy();
    expect(container.innerHTML).toContain('text-on-surface');
    expect(container.innerHTML).toContain('text-muted');
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{6}/);
  });

  it('numbers the steps 1..n when there is no `current`', () => {
    const { getByText, queryByText } = render(<StepList steps={METHOD} />);
    ['1', '2', '3'].forEach((n) => expect(getByText(n)).toBeTruthy());
    expect(queryByText('✓')).toBeNull();
  });

  it('checks off the steps before `current` and fills their marker', () => {
    const { getAllByText, getByText, container } = render(<StepList steps={METHOD} current={2} />);
    expect(getAllByText('✓')).toHaveLength(2);
    expect(getByText('3')).toBeTruthy();
    expect(container.innerHTML).toContain('bg-primary');
  });

  it('honours a per-item `done` for non-linear checklists', () => {
    const { getAllByText } = render(
      <StepList steps={[{ title: 'A', done: true }, { title: 'B' }, { title: 'C', done: true }]} />
    );
    expect(getAllByText('✓')).toHaveLength(2);
  });

  it('stays legible at eight items — every title and body still renders', () => {
    const eight: StepListItem[] = Array.from({ length: 8 }, (_, i) => ({
      id: String(i),
      title: `Step number ${i + 1}`,
      description: `Body copy for step ${i + 1} that would have nowhere to live in Steps.`,
    }));
    const { getByText } = render(<StepList steps={eight} current={3} />);
    expect(getByText('Step number 8')).toBeTruthy();
    expect(getByText('Body copy for step 8 that would have nowhere to live in Steps.')).toBeTruthy();
  });

  it('is inert without onStepClick', () => {
    const { queryAllByRole } = render(<StepList steps={METHOD} />);
    expect(queryAllByRole('button')).toHaveLength(0);
  });

  it('reports the index of the clicked step', () => {
    const onStepClick = jest.fn();
    const { getByText } = render(<StepList steps={METHOD} onStepClick={onStepClick} />);
    fireEvent.click(getByText('Add the stock'));
    expect(onStepClick).toHaveBeenCalledWith(1);
  });

  it('renders an empty list without crashing', () => {
    const { container } = render(<StepList steps={[]} />);
    expect(container.querySelectorAll('li')).toHaveLength(0);
  });
});
