/** @jest-environment jsdom */
/**
 * Web survey components: render smoke, token-purity (a `--xen-*` token class is
 * present and no hex literal leaks into markup), a11y roles, and the behavioral
 * contracts (answer select single/multi, NPS pick, Likert pick, ranking move,
 * poll percentages, empty states). Parity mirror of `survey.native.spec.tsx`.
 */
import { fireEvent, render } from '@testing-library/react';
import { QuestionCard } from './QuestionCard';
import { LikertScale } from './LikertScale';
import { NPSScale } from './NPSScale';
import { MultipleChoice } from './MultipleChoice';
import { RankingQuestion } from './RankingQuestion';
import { SurveyProgress } from './SurveyProgress';
import { ResponseSummary } from './ResponseSummary';
import { PollResultBar } from './PollResultBar';
import type { SurveyChoice, PollOption, SurveyAnswer } from './types';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const CHOICES: SurveyChoice[] = [
  { id: 'a', label: 'Very satisfied' },
  { id: 'b', label: 'Neutral' },
  { id: 'c', label: 'Dissatisfied' },
];

const POLL: PollOption[] = [
  { id: 'react', label: 'React', votes: 60 },
  { id: 'flutter', label: 'Flutter', votes: 40 },
];

const ANSWERS: SurveyAnswer[] = [
  { id: 'q1', question: 'How likely to recommend?', answer: '9' },
  { id: 'q2', question: 'Favorite feature?', answer: '', skipped: true },
];

describe('QuestionCard (web)', () => {
  it('mounts a numbered prompt, token-pure, no hex', () => {
    const { getByText, getByLabelText, container } = render(
      <QuestionCard variant="numbered" number={2} total={10} title="Rate your experience" required helpText="Pick one." />
    );
    expect(getByLabelText('Rate your experience, required')).toBeTruthy();
    expect(getByText('2 / 10').className).toContain('text-primary');
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });
});

describe('MultipleChoice (web)', () => {
  it('selects an option (single) and reports its id', () => {
    const onChange = jest.fn();
    const { getByLabelText, getAllByRole } = render(
      <MultipleChoice options={CHOICES} value={null} onChange={onChange} selection="single" />
    );
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(3);
    expect(radios[0]?.className ?? '').toContain('border-border');
    fireEvent.click(getByLabelText('Neutral'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('accumulates selections in multiple mode (checkboxes)', () => {
    const onChange = jest.fn();
    const { getByLabelText, getAllByRole } = render(
      <MultipleChoice options={CHOICES} value={['a']} onChange={onChange} selection="multiple" />
    );
    expect(getAllByRole('checkbox')).toHaveLength(3);
    fireEvent.click(getByLabelText('Dissatisfied'));
    expect(onChange).toHaveBeenCalledWith(['a', 'c']);
  });

  it('renders the empty state for no options', () => {
    const { getByText } = render(<MultipleChoice options={[]} value={null} onChange={jest.fn()} />);
    expect(getByText('No options available.')).toBeTruthy();
  });
});

describe('NPSScale (web)', () => {
  it('exposes 11 cells, token-pure, reports the picked score', () => {
    const onChange = jest.fn();
    const { getAllByRole, getByLabelText, container } = render(
      <NPSScale value={null} onChange={onChange} colorByBucket />
    );
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(11);
    fireEvent.click(getByLabelText('9, promoter'));
    expect(onChange).toHaveBeenCalledWith(9);
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });
});

describe('LikertScale (web)', () => {
  it('picks a point on the agreement scale', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <LikertScale points={5} value={null} onChange={onChange} minLabel="Disagree" maxLabel="Agree" />
    );
    fireEvent.click(getByLabelText('Point 4 of 5'));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});

describe('RankingQuestion (web)', () => {
  it('reorders on move-down and emits the next order', () => {
    const onChange = jest.fn();
    const { getByLabelText, getByRole } = render(
      <RankingQuestion items={CHOICES} value={['a', 'b', 'c']} onChange={onChange} />
    );
    expect(getByRole('list')).toBeTruthy();
    fireEvent.click(getByLabelText('Move Very satisfied down'));
    expect(onChange).toHaveBeenCalledWith(['b', 'a', 'c']);
  });
});

describe('SurveyProgress (web)', () => {
  it('renders the fraction caption and clamps overflow', () => {
    const { getByText } = render(<SurveyProgress current={30} total={8} variant="fraction" />);
    expect(getByText('Question 8 of 8')).toBeTruthy();
  });
});

describe('ResponseSummary (web)', () => {
  it('renders skipped answers muted and fires edit', () => {
    const onEdit = jest.fn();
    const { getByLabelText, getByText } = render(<ResponseSummary answers={ANSWERS} onEdit={onEdit} />);
    expect(getByText('Skipped').className).toContain('text-muted');
    fireEvent.click(getByLabelText('Edit Favorite feature?'));
    expect(onEdit).toHaveBeenCalledWith('q2');
  });

  it('renders the empty state', () => {
    const { getByText } = render(<ResponseSummary answers={[]} />);
    expect(getByText('No answers to review yet.')).toBeTruthy();
  });
});

describe('PollResultBar (web)', () => {
  it('shows percentages of the total votes', () => {
    const { getByText } = render(<PollResultBar options={POLL} selectedId="react" />);
    expect(getByText('60%')).toBeTruthy();
    expect(getByText('40%')).toBeTruthy();
  });
});
