/** @jest-environment jsdom */
/**
 * Alternate learning designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of CourseCard, LeaderboardRow, LessonRow, QuizQuestion. Each variant
 * keeps the base props, so these specs prove they (a) mount, (b) stay token-pure
 * (no literal hex in inline styles), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { CourseCardV2 } from './CourseCardV2';
import { CourseCardV3 } from './CourseCardV3';
import { LeaderboardRowV2 } from './LeaderboardRowV2';
import { LeaderboardRowV3 } from './LeaderboardRowV3';
import { LessonRowV2 } from './LessonRowV2';
import { LessonRowV3 } from './LessonRowV3';
import { QuizQuestionV2 } from './QuizQuestionV2';
import { QuizQuestionV3 } from './QuizQuestionV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const CHOICES = [
  { id: 'a', label: 'Paris', correct: true },
  { id: 'b', label: 'Rome' },
];

describe('CourseCard alternates (web)', () => {
  it('V2 renders a hero card and fires the CTA', () => {
    const onCtaClick = jest.fn();
    const { getByText, container } = render(
      <CourseCardV2 title="React 101" instructor="Ada" level="beginner" progress={40} onCtaClick={onCtaClick} />
    );
    expect(getByText('React 101')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Continue'));
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact row and fires the CTA', () => {
    const onCtaClick = jest.fn();
    const { getByText, container } = render(
      <CourseCardV3 title="Go Deep" price="$49" onCtaClick={onCtaClick} />
    );
    expect(getByText('Go Deep')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Enroll'));
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });
});

describe('LeaderboardRow alternates (web)', () => {
  it('V2 renders a podium card and fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByText, container } = render(
      <LeaderboardRowV2 rank={1} name="Ada" score={980} highlighted onSelect={onSelect} />
    );
    expect(getByText('Ada')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Ada'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line', () => {
    const { getByText, container } = render(<LeaderboardRowV3 rank={4} name="Leo" score={640} trend="▲2" />);
    expect(getByText('Leo')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('LessonRow alternates (web)', () => {
  it('V2 fires onSelect when available', () => {
    const onSelect = jest.fn();
    const { getByText, container } = render(
      <LessonRowV2 title="Intro" index={1} status="available" kind="Video" durationLabel="12 min" onSelect={onSelect} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Intro'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('V3 does not fire when locked', () => {
    const onSelect = jest.fn();
    const { getByText, container } = render(<LessonRowV3 title="Locked" index={2} status="locked" onSelect={onSelect} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Locked'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe('QuizQuestion alternates (web)', () => {
  it('V2 emits the chosen id', () => {
    const onSelect = jest.fn();
    const { getByText, container } = render(
      <QuizQuestionV2 prompt="Capital of France?" choices={CHOICES} questionNumber={2} totalQuestions={5} onSelect={onSelect} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Paris'));
    expect(onSelect).toHaveBeenCalledWith('a');
  });

  it('V3 emits the chosen id', () => {
    const onSelect = jest.fn();
    const { getByText, container } = render(<QuizQuestionV3 prompt="Capital of France?" choices={CHOICES} onSelect={onSelect} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Rome'));
    expect(onSelect).toHaveBeenCalledWith('b');
  });
});
