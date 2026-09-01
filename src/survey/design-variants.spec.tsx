/** @jest-environment jsdom */
/**
 * Alternate survey designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of LikertScale, MultipleChoice, NPSScale, QuestionCard. Each variant keeps the
 * base props; these specs prove they (a) mount, (b) stay token-pure (no literal
 * hex in inline styles), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { LikertScaleV2 } from './LikertScaleV2';
import { LikertScaleV3 } from './LikertScaleV3';
import { MultipleChoiceV2 } from './MultipleChoiceV2';
import { MultipleChoiceV3 } from './MultipleChoiceV3';
import { NPSScaleV2 } from './NPSScaleV2';
import { NPSScaleV3 } from './NPSScaleV3';
import { QuestionCardV2 } from './QuestionCardV2';
import { QuestionCardV3 } from './QuestionCardV3';
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

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const OPTIONS = [
  { id: 'a', label: 'Alpha', description: 'first' },
  { id: 'b', label: 'Beta' },
];

describe('LikertScale alternates (web)', () => {
  it('V2 emits the point', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<LikertScaleV2 points={5} minLabel="Disagree" maxLabel="Agree" onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('4'));
    expect(onChange).toHaveBeenCalledWith(4);
  });
  it('V3 emits the point', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<LikertScaleV3 points={5} onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('2'));
    expect(onChange).toHaveBeenCalledWith(2);
  });
});

describe('MultipleChoice alternates (web)', () => {
  it('V2 selects a single option', () => {
    const onChange = jest.fn();
    const { getByText, container } = render(<MultipleChoiceV2 options={OPTIONS} value={null} onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Alpha'));
    expect(onChange).toHaveBeenCalledWith('a');
  });
  it('V3 toggles a multiple option', () => {
    const onChange = jest.fn();
    const { getByText, container } = render(<MultipleChoiceV3 options={OPTIONS} value={['a']} selection="multiple" onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Beta'));
    expect(onChange).toHaveBeenCalledWith(['a', 'b']);
  });
});

describe('NPSScale alternates (web)', () => {
  it('V2 emits the score', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<NPSScaleV2 colorByBucket onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('9'));
    expect(onChange).toHaveBeenCalledWith(9);
  });
  it('V3 emits the score', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<NPSScaleV3 onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('3'));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});

describe('QuestionCard alternates (web)', () => {
  it('V2 renders prompt + error', () => {
    const { getByText, container } = render(<QuestionCardV2 title="Your name?" number={1} total={5} required error="Required"><input aria-label="name" /></QuestionCardV2>);
    expect(getByText('Your name?')).toBeTruthy();
    expect(getByText('Required')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 renders prompt', () => {
    const { getByText, container } = render(<QuestionCardV3 title="Age?" number={2}><input aria-label="age" /></QuestionCardV3>);
    expect(getByText('Age?')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

const MATRIX_ROWS = [
  { id: 'r1', label: 'Speed' },
  { id: 'r2', label: 'Support' },
];
const MATRIX_COLS = [
  { id: 'c1', label: 'Poor' },
  { id: 'c2', label: 'Great' },
];
const POLL_OPTIONS = [
  { id: 'p1', label: 'Cats', votes: 8 },
  { id: 'p2', label: 'Dogs', votes: 12 },
];
const ANSWERS = [
  { id: 'q1', question: 'Your name?', answer: 'Ada' },
  { id: 'q2', question: 'Favourite color?', answer: 'Violet' },
];
const INTRO_META = [{ value: '5 min', label: 'Duration' }];

describe('survey V4 "focus" line (web)', () => {
  it('mounts all 12 V4 variants token-pure', () => {
    const { container } = render(
      <div>
        <QuestionCardV4 title="Rate us" number={1} total={5} required>
          <input aria-label="answer" />
        </QuestionCardV4>
        <LikertScaleV4 points={5} value={null} onChange={jest.fn()} minLabel="Disagree" maxLabel="Agree" />
        <MultipleChoiceV4 options={OPTIONS} value={null} onChange={jest.fn()} selection="single" />
        <NPSScaleV4 value={null} onChange={jest.fn()} colorByBucket />
        <MatrixQuestionV4 rows={MATRIX_ROWS} columns={MATRIX_COLS} value={{ r1: 'c1' }} onChange={jest.fn()} />
        <OpenTextResponseV4 value="hi" onChange={jest.fn()} label="Comments" maxLength={200} />
        <PollResultBarV4 options={POLL_OPTIONS} selectedId="p2" showResults />
        <RankingQuestionV4 items={OPTIONS} value={['a', 'b']} onChange={jest.fn()} />
        <RatingScaleInputV4 value={3} onChange={jest.fn()} max={5} variant="star" />
        <ResponseSummaryV4 answers={ANSWERS} onEdit={jest.fn()} />
        <SurveyIntroV4 title="Welcome" description="A quick survey" meta={INTRO_META} onStart={jest.fn()} />
        <SurveyProgressV4 current={3} total={10} />
      </div>
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('MultipleChoiceV4 emits the picked option id', () => {
    const onChange = jest.fn();
    const { getByText, container } = render(
      <MultipleChoiceV4 options={OPTIONS} value={null} onChange={onChange} selection="single" />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Alpha'));
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('NPSScaleV4 emits the picked score', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<NPSScaleV4 value={null} onChange={onChange} colorByBucket />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('9, promoter'));
    expect(onChange).toHaveBeenCalledWith(9);
  });
});

describe('survey V4 new blocks (web)', () => {
  it('mounts all 6 new components token-pure', () => {
    const { container } = render(
      <div>
        <SliderScale value={5} onChange={jest.fn()} min={0} max={10} minLabel="Low" maxLabel="High" />
        <EmojiScale value={null} onChange={jest.fn()} />
        <YesNoToggle value={null} onChange={jest.fn()} />
        <SurveyComplete title="All done!" message="Thanks" stat={{ label: 'Time', value: '2:14' }} onPrimary={jest.fn()} secondaryLabel="View" onSecondary={jest.fn()} />
        <NPSResultCard score={42} responses={120} promoters={72} passives={24} detractors={24} />
        <SurveyNavigator step={2} total={5} onBack={jest.fn()} onNext={jest.fn()} />
      </div>
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('SurveyNavigator advances via onNext', () => {
    const onNext = jest.fn();
    const { getByLabelText } = render(<SurveyNavigator step={2} total={5} onBack={jest.fn()} onNext={onNext} />);
    fireEvent.click(getByLabelText('Next'));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('YesNoToggle reports the picked side', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<YesNoToggle value={null} onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Yes'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('EmojiScale reports the picked index', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<EmojiScale value={null} onChange={onChange} />);
    fireEvent.click(getByLabelText('Great'));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
