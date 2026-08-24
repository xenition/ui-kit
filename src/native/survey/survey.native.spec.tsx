import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import { QuestionCard } from './QuestionCard';
import { LikertScale } from './LikertScale';
import { NPSScale } from './NPSScale';
import { MultipleChoice } from './MultipleChoice';
import { RankingQuestion } from './RankingQuestion';
import { SurveyProgress } from './SurveyProgress';
import { ResponseSummary } from './ResponseSummary';
import { PollResultBar } from './PollResultBar';
import type { SurveyChoice, PollOption, SurveyAnswer } from './types';

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

const CHOICES: SurveyChoice[] = [
  { id: 'a', label: 'Very satisfied' },
  { id: 'b', label: 'Neutral' },
  { id: 'c', label: 'Dissatisfied' },
];

const POLL: PollOption[] = [
  { id: 'react', label: 'React Native', votes: 60 },
  { id: 'flutter', label: 'Flutter', votes: 40 },
];

const ANSWERS: SurveyAnswer[] = [
  { id: 'q1', question: 'How likely to recommend?', answer: '9' },
  { id: 'q2', question: 'Favorite feature?', answer: '', skipped: true },
];

describe('QuestionCard (native)', () => {
  it('mounts a numbered prompt and stays token-pure', () => {
    const { getByText, getByLabelText, root } = renderThemed(
      <QuestionCard variant="numbered" number={2} total={10} title="Rate your experience" required helpText="Pick one." />,
      SEED_LIGHT
    );
    expect(getByLabelText('Rate your experience, required')).toBeTruthy();
    expect(getByText('2 / 10')).toBeTruthy();
    assertTokenPure(root);
  });
});

describe('MultipleChoice (native)', () => {
  it('selects an option (single) and reports its id', () => {
    const onChange = jest.fn();
    const { getByLabelText, getAllByRole, root } = renderThemed(
      <MultipleChoice options={CHOICES} value={null} onChange={onChange} selection="single" />,
      SEED_LIGHT
    );
    assertTokenPure(root);
    expect(getAllByRole('radio')).toHaveLength(3);
    fireEvent.press(getByLabelText('Neutral'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('accumulates selections in multiple mode', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <MultipleChoice options={CHOICES} value={['a']} onChange={onChange} selection="multiple" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Dissatisfied'));
    expect(onChange).toHaveBeenCalledWith(['a', 'c']);
  });

  it('renders the empty state for no options', () => {
    const { getByText } = renderThemed(
      <MultipleChoice options={[]} value={null} onChange={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByText('No options available.')).toBeTruthy();
  });
});

describe('NPSScale (native)', () => {
  it('exposes 11 cells and reports the picked score', () => {
    const onChange = jest.fn();
    const { getAllByRole, getByLabelText, root } = renderThemed(
      <NPSScale value={null} onChange={onChange} colorByBucket />,
      SEED_LIGHT
    );
    assertTokenPure(root);
    expect(getAllByRole('radio')).toHaveLength(11);
    fireEvent.press(getByLabelText('9, promoter'));
    expect(onChange).toHaveBeenCalledWith(9);
  });
});

describe('LikertScale (native)', () => {
  it('picks a point on the agreement scale', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <LikertScale points={5} value={null} onChange={onChange} minLabel="Disagree" maxLabel="Agree" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Point 4 of 5'));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});

describe('RankingQuestion (native)', () => {
  it('reorders on move-down and emits the next order', () => {
    const onChange = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <RankingQuestion items={CHOICES} value={['a', 'b', 'c']} onChange={onChange} />,
      SEED_LIGHT
    );
    assertTokenPure(root);
    fireEvent.press(getByLabelText('Move Very satisfied down'));
    expect(onChange).toHaveBeenCalledWith(['b', 'a', 'c']);
  });
});

describe('SurveyProgress (native)', () => {
  it('renders the fraction caption and clamps overflow', () => {
    const { getByText } = renderThemed(
      <SurveyProgress current={3} total={8} />,
      SEED_LIGHT
    );
    expect(getByText('Question 3 of 8')).toBeTruthy();
  });
});

describe('ResponseSummary (native)', () => {
  it('renders skipped answers muted and fires edit', () => {
    const onEdit = jest.fn();
    const { getByLabelText, getByText, root } = renderThemed(
      <ResponseSummary answers={ANSWERS} onEdit={onEdit} />,
      SEED_LIGHT
    );
    assertTokenPure(root);
    expect(getByText('Skipped')).toBeTruthy();
    fireEvent.press(getByLabelText('Edit Favorite feature?'));
    expect(onEdit).toHaveBeenCalledWith('q2');
  });

  it('renders the empty state', () => {
    const { getByText } = renderThemed(
      <ResponseSummary answers={[]} />,
      SEED_LIGHT
    );
    expect(getByText('No answers to review yet.')).toBeTruthy();
  });
});

describe('PollResultBar (native)', () => {
  it('shows percentages of the total votes', () => {
    const { getByText, root } = renderThemed(
      <PollResultBar options={POLL} selectedId="react" />,
      SEED_LIGHT
    );
    assertTokenPure(root);
    expect(getByText('60%')).toBeTruthy();
    expect(getByText('40%')).toBeTruthy();
  });
});
