import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import type { ThemeSeed } from '../../theme/types';
import { QuestionCardV2 } from './QuestionCardV2';
import { QuestionCardV3 } from './QuestionCardV3';
import { LikertScaleV2 } from './LikertScaleV2';
import { LikertScaleV3 } from './LikertScaleV3';
import { NPSScaleV2 } from './NPSScaleV2';
import { NPSScaleV3 } from './NPSScaleV3';
import { MultipleChoiceV2 } from './MultipleChoiceV2';
import { MultipleChoiceV3 } from './MultipleChoiceV3';
import {
  QuestionCardV4,
  LikertScaleV4,
  MultipleChoiceV4,
  NPSScaleV4,
  MatrixQuestionV4,
  OpenTextResponseV4,
  PollResultBarV4,
  RankingQuestionV4,
  RatingScaleInputV4,
  ResponseSummaryV4,
  SurveyIntroV4,
  SurveyProgressV4,
  SliderScale,
  EmojiScale,
  YesNoToggle,
  SurveyComplete,
  NPSResultCard,
  SurveyNavigator,
} from './index';
import type { SurveyChoice, MatrixRow, PollOption, SurveyAnswer } from './types';

/** Assert every rendered hex traces to a compiled token for the given seed. */
function assertTokenPure(root: Parameters<typeof renderedStyleHexes>[0], seed: ThemeSeed): void {
  const allowed = tokenHexSet(seed);
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
}

/** Both seeds, so light/dark ramps are both exercised for token purity. */
const SEEDS: ReadonlyArray<[string, ThemeSeed]> = [
  ['light', SEED_LIGHT],
  ['dark', SEED_DARK],
];

const CHOICES: SurveyChoice[] = [
  { id: 'a', label: 'Very satisfied', description: 'Loved it' },
  { id: 'b', label: 'Neutral' },
  { id: 'c', label: 'Dissatisfied' },
];

describe('QuestionCard alternates (native)', () => {
  it.each(SEEDS)('V2 mounts a numbered elevated prompt — token-pure (%s)', (_name, seed) => {
    const { getByLabelText, getByText, root } = renderThemed(
      <QuestionCardV2 number={2} total={10} title="Rate your experience" required helpText="Pick one." />,
      seed
    );
    expect(getByLabelText('Rate your experience, required')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    assertTokenPure(root, seed);
  });

  it.each(SEEDS)('V3 mounts a minimal eyebrow prompt — token-pure (%s)', (_name, seed) => {
    const { getByLabelText, getByText, root } = renderThemed(
      <QuestionCardV3 number={3} total={8} title="How did it feel?" required />,
      seed
    );
    expect(getByLabelText('How did it feel?, required')).toBeTruthy();
    expect(getByText('Q 3 / 8')).toBeTruthy();
    assertTokenPure(root, seed);
  });
});

describe('LikertScale alternates (native)', () => {
  it.each(SEEDS)('V2 pills pick a point and report it — token-pure (%s)', (_name, seed) => {
    const onChange = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <LikertScaleV2 points={5} value={null} onChange={onChange} minLabel="Disagree" maxLabel="Agree" />,
      seed
    );
    assertTokenPure(root, seed);
    fireEvent.press(getByLabelText('Point 4 of 5'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it.each(SEEDS)('V3 segmented bar picks a point and reports it — token-pure (%s)', (_name, seed) => {
    const onChange = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <LikertScaleV3 points={7} value={3} onChange={onChange} />,
      seed
    );
    assertTokenPure(root, seed);
    fireEvent.press(getByLabelText('Point 6 of 7'));
    expect(onChange).toHaveBeenCalledWith(6);
  });
});

describe('NPSScale alternates (native)', () => {
  it.each(SEEDS)('V2 grid exposes 11 cells and reports the picked score — token-pure (%s)', (_name, seed) => {
    const onChange = jest.fn();
    const { getAllByRole, getByLabelText, root } = renderThemed(
      <NPSScaleV2 value={null} onChange={onChange} colorByBucket />,
      seed
    );
    assertTokenPure(root, seed);
    expect(getAllByRole('radio')).toHaveLength(11);
    fireEvent.press(getByLabelText('9, promoter'));
    expect(onChange).toHaveBeenCalledWith(9);
  });

  it.each(SEEDS)('V3 slider track exposes 11 ticks and reports the picked score — token-pure (%s)', (_name, seed) => {
    const onChange = jest.fn();
    const { getAllByRole, getByLabelText, root } = renderThemed(
      <NPSScaleV3 value={7} onChange={onChange} />,
      seed
    );
    assertTokenPure(root, seed);
    expect(getAllByRole('radio')).toHaveLength(11);
    fireEvent.press(getByLabelText('2, detractor'));
    expect(onChange).toHaveBeenCalledWith(2);
  });
});

describe('MultipleChoice alternates (native)', () => {
  it.each(SEEDS)('V2 cards select an option and report its id — token-pure (%s)', (_name, seed) => {
    const onChange = jest.fn();
    const { getByLabelText, getAllByRole, getByText, root } = renderThemed(
      <MultipleChoiceV2 options={CHOICES} value={null} onChange={onChange} selection="single" />,
      seed
    );
    assertTokenPure(root, seed);
    expect(getAllByRole('radio')).toHaveLength(3);
    expect(getByText('A')).toBeTruthy();
    fireEvent.press(getByLabelText('Neutral'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it.each(SEEDS)('V3 rows accumulate selections in multiple mode — token-pure (%s)', (_name, seed) => {
    const onChange = jest.fn();
    const { getByLabelText, getAllByRole, root } = renderThemed(
      <MultipleChoiceV3 options={CHOICES} value={['a']} onChange={onChange} selection="multiple" />,
      seed
    );
    assertTokenPure(root, seed);
    expect(getAllByRole('checkbox')).toHaveLength(3);
    fireEvent.press(getByLabelText('Dissatisfied'));
    expect(onChange).toHaveBeenCalledWith(['a', 'c']);
  });

  it('V2 renders the empty state for no options', () => {
    const { getByText } = renderThemed(
      <MultipleChoiceV2 options={[]} value={null} onChange={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByText('No options available.')).toBeTruthy();
  });

  it('V3 renders the empty state for no options', () => {
    const { getByText } = renderThemed(
      <MultipleChoiceV3 options={[]} value={null} onChange={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByText('No options available.')).toBeTruthy();
  });
});

const MATRIX_ROWS: MatrixRow[] = [
  { id: 'r1', label: 'Speed' },
  { id: 'r2', label: 'Support' },
];
const MATRIX_COLS: SurveyChoice[] = [
  { id: 'c1', label: 'Poor' },
  { id: 'c2', label: 'Great' },
];
const POLL_OPTIONS: PollOption[] = [
  { id: 'p1', label: 'Cats', votes: 8 },
  { id: 'p2', label: 'Dogs', votes: 12 },
];
const ANSWERS: SurveyAnswer[] = [
  { id: 'q1', question: 'Your name?', answer: 'Ada' },
  { id: 'q2', question: 'Favourite color?', answer: 'Violet' },
];

describe('survey V4 "focus" line (native)', () => {
  // The aggregate render mounts every V4 variant together under BOTH seeds so
  // the calm accents, focus bar and reserved gradients all trace to a compiled
  // token — no literal hex may reach a style.
  it.each(SEEDS)('all 12 V4 variants render token-pure (%s)', (_name, seed) => {
    const { root } = renderThemed(
      <>
        <QuestionCardV4 number={1} total={5} title="Rate us" required helpText="Pick one." />
        <LikertScaleV4 points={5} value={null} onChange={jest.fn()} minLabel="Disagree" maxLabel="Agree" />
        <MultipleChoiceV4 options={CHOICES} value={null} onChange={jest.fn()} selection="single" />
        <NPSScaleV4 value={null} onChange={jest.fn()} colorByBucket />
        <MatrixQuestionV4 rows={MATRIX_ROWS} columns={MATRIX_COLS} value={{ r1: 'c1' }} onChange={jest.fn()} />
        <OpenTextResponseV4 value="hi" onChange={jest.fn()} label="Comments" maxLength={200} />
        <PollResultBarV4 options={POLL_OPTIONS} selectedId="p2" showResults />
        <RankingQuestionV4 items={CHOICES} value={['a', 'b', 'c']} onChange={jest.fn()} />
        <RatingScaleInputV4 value={3} onChange={jest.fn()} max={5} variant="star" />
        <ResponseSummaryV4 answers={ANSWERS} onEdit={jest.fn()} />
        <SurveyIntroV4 title="Welcome" description="A quick survey" onStart={jest.fn()} />
        <SurveyProgressV4 current={3} total={10} />
      </>,
      seed
    );
    assertTokenPure(root, seed);
  });

  it.each(SEEDS)('MultipleChoiceV4 reports the picked option id — token-pure (%s)', (_name, seed) => {
    const onChange = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <MultipleChoiceV4 options={CHOICES} value={null} onChange={onChange} selection="single" />,
      seed
    );
    assertTokenPure(root, seed);
    fireEvent.press(getByLabelText('Neutral'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it.each(SEEDS)('NPSScaleV4 reports the picked score — token-pure (%s)', (_name, seed) => {
    const onChange = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <NPSScaleV4 value={null} onChange={onChange} colorByBucket />,
      seed
    );
    assertTokenPure(root, seed);
    fireEvent.press(getByLabelText('9, promoter'));
    expect(onChange).toHaveBeenCalledWith(9);
  });
});

describe('survey V4 new blocks (native)', () => {
  it.each(SEEDS)('all 6 new components render token-pure (%s)', (_name, seed) => {
    const { root } = renderThemed(
      <>
        <SliderScale value={5} onChange={jest.fn()} min={0} max={10} minLabel="Low" maxLabel="High" />
        <EmojiScale value={null} onChange={jest.fn()} />
        <YesNoToggle value={null} onChange={jest.fn()} />
        <SurveyComplete title="All done!" message="Thanks" stat={{ label: 'Time', value: '2:14' }} onPrimary={jest.fn()} secondaryLabel="View" onSecondary={jest.fn()} />
        <NPSResultCard score={42} responses={120} promoters={72} passives={24} detractors={24} />
        <SurveyNavigator step={2} total={5} onBack={jest.fn()} onNext={jest.fn()} />
      </>,
      seed
    );
    assertTokenPure(root, seed);
  });

  it.each(SEEDS)('SurveyNavigator advances via onNext — token-pure (%s)', (_name, seed) => {
    const onNext = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <SurveyNavigator step={2} total={5} onBack={jest.fn()} onNext={onNext} />,
      seed
    );
    assertTokenPure(root, seed);
    fireEvent.press(getByLabelText('Next'));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it.each(SEEDS)('YesNoToggle reports the picked side — token-pure (%s)', (_name, seed) => {
    const onChange = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <YesNoToggle value={null} onChange={onChange} />,
      seed
    );
    assertTokenPure(root, seed);
    fireEvent.press(getByLabelText('Yes'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it.each(SEEDS)('EmojiScale reports the picked index — token-pure (%s)', (_name, seed) => {
    const onChange = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <EmojiScale value={null} onChange={onChange} />,
      seed
    );
    assertTokenPure(root, seed);
    fireEvent.press(getByLabelText('Great'));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
