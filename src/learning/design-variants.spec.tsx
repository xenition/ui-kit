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
import {
  CourseCardV4,
  LessonRowV4,
  VideoLessonRowV4,
  LeaderboardRowV4,
  CertificateCardV4,
  ProgressTrackerV4,
  QuizQuestionV4,
  QuizOptionV4,
  FlashCardV4,
  ModuleAccordionV4,
  EnrollButtonV4,
  StreakBadgeV4,
  AchievementBadgeV4,
} from './index';

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

describe('learning V4 "campus" line (web)', () => {
  it('mounts all 13 V4 blocks (variants + gradient hero) with no inline hex', () => {
    const { getByText, container } = render(
      <div>
        <CourseCardV4 title="Intro to TS" instructor="Ada" level="beginner" lessonCount={12} durationLabel="4h" rating={4.5} progress={40} price="$49" onCtaClick={() => {}} />
        <CourseCardV4 title="Go Deep" level="advanced" variant="compact" onCtaClick={() => {}} />
        <LessonRowV4 title="Variables" index={1} status="available" kind="Video" durationLabel="12 min" onSelect={() => {}} />
        <LessonRowV4 title="Locked" status="locked" variant="compact" />
        <VideoLessonRowV4 title="Lecture 1" durationLabel="12:30" watchProgress={30} playing meta="3.2" onPlay={() => {}} />
        <VideoLessonRowV4 title="Lecture 2" watched variant="compact" onPlay={() => {}} />
        <LeaderboardRowV4 rank={1} name="Ada" score={980} trend="▲2" highlighted onSelect={() => {}} />
        <LeaderboardRowV4 rank={4} empty variant="compact" />
        <CertificateCardV4 courseTitle="React 101" recipient="Ada Lovelace" issuer="Xen Academy" issuedOn="May 2026" credentialId="XA-2026-001" variant="honors" onAction={() => {}} />
        <ProgressTrackerV4 steps={[{ id: '1', label: 'A', completed: true }, { id: '2', label: 'B' }]} showList />
        <QuizQuestionV4 prompt="2 + 2 = ?" questionNumber={1} totalQuestions={3} choices={[{ id: 'a', label: '3' }, { id: 'b', label: '4', correct: true }]} onSelect={() => {}} />
        <QuizOptionV4 label="4" marker="B" state="correct" />
        <FlashCardV4 front="Photosynthesis" back="Light to energy" />
        <ModuleAccordionV4 modules={[{ id: 'm1', title: 'Basics', lessons: [{ id: 'l1', title: 'Intro', status: 'completed' }] }]} onLessonSelect={() => {}} />
        <EnrollButtonV4 state="enrolled" />
        <StreakBadgeV4 count={5} tone="primary" />
        <AchievementBadgeV4 title="First Step" tier="gold" unlocked />
      </div>
    );
    expect(getByText('Intro to TS')).toBeTruthy();
    // Gradient award hero surfaces the recipient.
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('CourseCardV4 (compact) fires the CTA', () => {
    const onCtaClick = jest.fn();
    const { getByText } = render(<CourseCardV4 title="React 101" level="beginner" variant="compact" onCtaClick={onCtaClick} />);
    fireEvent.click(getByText('Enroll'));
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  it('LessonRowV4 is a keyboard-activable button when available, inert when locked', () => {
    const onSelect = jest.fn();
    const { getByRole, rerender, queryByRole } = render(<LessonRowV4 title="Variables" status="available" onSelect={onSelect} />);
    fireEvent.keyDown(getByRole('button'), { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledTimes(1);
    rerender(<LessonRowV4 title="Advanced" status="locked" onSelect={onSelect} />);
    expect(queryByRole('button')).toBeNull();
  });

  it('QuizQuestionV4 renders a radiogroup and selects a choice', () => {
    const onSelect = jest.fn();
    const { getAllByRole } = render(
      <QuizQuestionV4 prompt="2 + 2 = ?" choices={[{ id: 'a', label: '3' }, { id: 'b', label: '4' }]} onSelect={onSelect} />
    );
    const options = getAllByRole('radio');
    expect(options).toHaveLength(2);
    fireEvent.click(options[1] as HTMLElement);
    expect(onSelect).toHaveBeenCalledWith('b');
  });

  it('EnrollButtonV4 enrolled reads as a success confirmation with a token class', () => {
    const { getByLabelText } = render(<EnrollButtonV4 state="enrolled" />);
    expect(getByLabelText('Enrolled').firstElementChild?.className).toContain('bg-success/10');
  });

  it('LeaderboardRowV4 shows a medal glyph for rank 1 and fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(<LeaderboardRowV4 rank={1} name="Ada" score={99} onSelect={onSelect} />);
    const row = getByRole('button');
    expect(row.textContent).toContain('🥇');
    fireEvent.click(row);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
